---
title: Tokens
id: tokens
sidebar-position: 1
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

All value in a ledger is represented as tokens. Each token is an indivisible, single unit of a [flavor](flavors.md), which denotes a specific type of value - for example, `USD` or `points`.

To create new value in a ledger, you issue tokens into an [account](accounts.md) with a [transaction](transactions.md). To transfer value in a ledger, you transfer tokens from one account to another. To remove value from a ledger, you retire tokens from an account.

### Token Tags

When issuing or transferring tokens into an account,
you may wish to tag them for later distinction by providing token tags.

You can then specify a filter when transferring or retiring tokens
from the account to target the tokens with specific tags.

Unlike the tags on other objects in the ledger, token tags only exist on
the current state of the tokens in an account. Once those tokens are transferred
in a transaction, the tags are removed and new tags can be added as they land
in the destination account.

#### Updating tags

Since tokens are the fundamental state of the ledger,
in order to update the tags on a group of tokens, you must create a transaction.
In the future we will provide a special method for building a transaction that
updates tags on tokens, but for now, you transfer them to and from the same
account.

### Data Structure

The ledger does not store individual token objects, but rather **token group** objects, which each represent an `amount` of identical tokens.

If every token is unique, each token group will have an `amount` of `1`.

#### Field Descriptions

| Field        | Type        | Description                                                |
|:-------------|:------------|:-----------------------------------------------------------|
| amount       | integer     | Amount of tokens.                                          |
| tags         | JSON object | Arbitrary, user-supplied, key-value data about the tokens. |
| flavor id    | string      | The id of the flavor of the tokens.                        |
| flavor tags  | JSON object | The tags of the flavor of the tokens.                      |
| account id   | string      | The id of the account that holds the tokens.               |
| account tags | string      | The tags of the account that holds the tokens.             |


#### Example Object

<Tabs>
<TabItem value='java' label='Java'>

```java
{
  amount: 10,
  tags: {},
  flavorId: ""
  flavorTags: {},
  accountId: "",
  accountTags: {},
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
{
  amount: 10,
  tags: {},
  flavorId: ""
  flavorTags: {},
  accountId: "",
  accountTags: {},
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
{
  amount: 10,
  tags: {},
  flavor_id: ""
  flavor_tags: {},
  account_id: "",
  account_tags: {},
}
```

</TabItem>
</Tabs>


### Queries

There are two different types of queries that you can perform on tokens:

1. A **[list query](../ledger-queries/list-queries.md)**  lists tokens in the ledger
2. A **[sum query](../ledger-queries/sum-queries.md)** is an aggregate over the `amount` fields in a filtered list of tokens.

Both queries accept a [filter](../ledger-queries/filters.md) to narrow the results.

#### List tokens
The list tokens query is useful when you use token tags to differentiate tokens of the same flavor in an account.

For example, if your application tracks stock certificates by tagging Acme stock tokens with a cost basis and purchase date in the token tags, you can list the tokens in Alice's account to see all her certificates.

#### Sum tokens
The sum tokens query is how you calculate balances in the ledger.

For example, to calculate all the USD balance in Alice's account, you sum all the USD tokens in her account. Or to calculate the total amount of USD in the ledger, you sum all the USD tokens across all accounts.

### Examples

#### Issue tokens

Issue 100 USD tokens to Alice's account.

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction tx = new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("usd")
    .setAmount(100)
    .setDestinationAccountId("alice")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
await ledger.transactions.transact(b => {
  b.issue({
    amount: 100,
    flavorId: 'usd',
    destinationAccountId: 'alice',
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
tx = ledger.transactions.transact do |builder|
  builder.issue(
    flavor_id: 'usd',
    amount: 100,
    destination_account_id: 'alice'
  )
end
```

</TabItem>
</Tabs>

#### Issue tokens with tags

Issue 100 debt tokens to Alice's account that are due December, 2018:

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction tx = new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("debt")
    .setAmount(100)
    .setDestinationAccountId("alice")
    .addTokenTagsField("due", "Dec2018")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
await ledger.transactions.transact(b => {
  b.issue({
    amount: 100,
    flavorId: 'debt',
    destinationAccountId: 'alice',
    tokenTags: { due: 'Dec2018' },
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
tx = ledger.transactions.transact do |builder|
  builder.issue(
    flavor_id: 'debt',
    amount: 100,
    destination_account_id: 'alice',
    token_tags: {due: 'Dec2018'}
  )
end
```

</TabItem>
</Tabs>

#### Transfer tokens

Transfer 20 USD tokens from Alice's account to Bob's account.

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction tx = new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(20)
    .setSourceAccountId("alice")
    .setDestinationAccountId("bob")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
await ledger.transactions.transact(b => {
  b.transfer({
    amount: 20,
    flavorId: 'usd',
    sourceAccountId: 'alice',
    destinationAccountId: 'bob',
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
tx = ledger.transactions.transact do |builder|
  builder.transfer(
    flavor_id: 'usd',
    amount: 100,
    source_account_id: 'alice',
    destination_account_id: 'bob'
  )
end
```

</TabItem>
</Tabs>

#### Update tags by transferring tokens to same account

Update the due date from `Dec2018` to `Feb2019` on 20 debt tokens
in Alice's account:

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction tx = new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("debt")
    .setAmount(20)
    .setSourceAccountId("alice")
    .setDestinationAccountId("alice")
    .setFilter("tags.due=$1")
    .addFilterParameter("Dec2018")
    .addTokenTagsField("due", "Feb2019")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
await ledger.transactions.transact(b => {
  b.transfer({
    amount: 20,
    flavorId: 'debt',
    sourceAccountId: 'alice',
    destinationAccountId: 'alice',
    filter: 'tags.due=$1',
    filterParams: ['Dec2018'],
    tokenTags: { due: 'Feb2019' },
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
tx = ledger.transactions.transact do |builder|
  builder.transfer(
    flavor_id: 'debt',
    amount: 20,
    source_account_id: 'alice',
    destination_account_id: 'alice',
    filter: 'tags.due=$1',
    filter_params: ['Dec2018'],
    token_tags: {due: 'Feb2019'}
  )
end
```

</TabItem>
</Tabs>

#### Retire tokens

Retire 5 USD tokens from Bob's account.

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction tx = new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("usd")
    .setAmount(5)
    .setSourceAccountId("bob")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
await ledger.transactions.transact(b => {
  b.retire({
    amount: 5,
    flavorId: 'usd',
    sourceAccountId: 'bob'
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
tx = ledger.transactions.transact do |builder|
  builder.retire(
    flavor_id: 'usd',
    amount: 5,
    source_account_id: 'bob'
  )
end
```

</TabItem>
</Tabs>

#### Retire tokens filtered by tags

Retire 80 of Alice's debt tokens due December 2018:

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction tx = new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("debt")
    .setAmount(80)
    .setSourceAccountId("alice")
    .setFilter("tags.due=$1")
    .addFilterParameter("Dec2018")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
await ledger.transactions.transact(b => {
  b.retire({
    flavorId: 'debt',
    amount: 80,
    sourceAccountId: 'alice',
    filter: 'tags.due=$1',
    filterParams: ['Dec2018']
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
tx = ledger.transactions.transact do |builder|
  builder.retire(
    flavor_id: 'debt',
    amount: 80,
    source_account_id: 'alice',
    filter: 'tags.due=$1',
    filter_params: ['Dec2018']
  )
end
```

</TabItem>
</Tabs>

#### Sum tokens in an account

Query the first two pages of "balances" in Alice's account.

<Tabs>
<TabItem value='java' label='Java'>

```java
TokenSum.Page page1 = new Token.SumBuilder()
  .setFilter("accountId=$1")
  .addFilterParameter("alice")
  .addGroupByField("flavorId")
  .setPageSize(10)
  .getPage(ledger);
for (TokenSum balance : page1.items) {
  System.out.println("amount: " + balance.amount);
  System.out.println("flavor: " + balance.flavorId);
}

String cursor = page1.cursor;

TokenSum.Page page2 = new Token.SumBuilder()
  .getPage(ledger, cursor);
for (TokenSum balance : page2.items) {
  System.out.println("amount: " + balance.amount);
  System.out.println("flavor: " + balance.flavorId);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let page1 = await ledger.tokens
  .sum({
    filter: 'accountId=$1',
    filterParams: ['alice'],
    groupBy: ['flavorId'],
  })
  .page({ size: 10 })
page1.items.forEach(balance => {
  // console.log(balance)
})

let page2 = await ledger.tokens
  .sum()
  .page({ cursor: page1.cursor })
page2.items.forEach(balance => {
  // console.log(balance)
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.tokens.sum(
  filter: 'account_id=$1',
  filter_params: ['alice'],
  group_by: ['flavor_id'],
).page(size: 10)

page1.each do |balance|
  puts 'amount: ', balance.amount
  puts 'flavor: ', balance.flavor_id
end

cursor = page1.cursor

page2 = ledger.tokens.sum.page(cursor: cursor)

page2.each do |balance|
  puts 'amount: ', balance.amount
  puts 'flavor: ', balance.flavor_id
end
```

</TabItem>
</Tabs>

#### List tokens in an account

Query the first two pages of tokens in Alice's account.

<Tabs>
<TabItem value='java' label='Java'>

```java
TokenGroup.Page page1 = new Token.ListBuilder()
  .setFilter("accountId=$1")
  .addFilterParameter("alice")
  .getPage(ledger);
for (TokenGroup group : page1.items) {
  ...
}

String cursor = page1.cursor;

TokenGroup.Page page2 = new Token.ListBuilder()
  .getPage(ledger, cursor);
for (TokenGroup group : page2.items) {
  ...
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
page1 = await ledger.tokens
  .list({
    filter: 'accountId=$1',
    filterParams: ['alice'],
  })
  .page({ size: 10 })
page1.items.forEach(group => {
  // console.log(group)
})

page2 = await ledger.tokens
  .list()
  .page({ cursor: page1.cursor })
page2.items.forEach(group => {
  // console.log(group)
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.tokens.list(
  filter: 'account_id=$1',
  filter_params: ['alice'],
).page(size: 10)

page1.each do |group|
  puts group.to_json
end

cursor = page1.cursor

page2 = ledger.tokens.list.page(cursor: cursor)

page2.each do |group|
  puts group.to_json
end
```

</TabItem>
</Tabs>
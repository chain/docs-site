---
title: Sum Queries
id: sum-queries
sidebar-position: 5
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A sum query returns an aggregate over the `amount` fields in a list of
objects. As with list queries, you can add a [filter](filters.md) to narrow the set of results that are
summed.

Only **actions** and **tokens** support the sum query, because they
are the only objects that contain an `amount` field.

#### Sum tokens
Tokens represent the current state of the ledger - all amounts that have been issued, but not retired.

The sum tokens query is how you retrieve aggregate totals of the current state (e.g the balance of `USD` in an account).

#### Sum actions
Actions represent the historical state of the ledger - all amounts that have been issued, transferred, or retired.

The sum actions query is how you retrieve aggregate totals of the historical state (e.g total amount of `USD` ever issued).

#### Group By

The **group-by** query parameter indicates how amounts of a set of actions or tokens should be summed.

The query will break the results into groups where all values of each group-by field are identical. This is analogous to the "GROUP BY" clause in SQL.

If no group-by parameter is specified, all results will be summed to a single amount.


#### Data Structure
The sum actions query returns **action sum** objects. The sum tokens query returns **token sum** objects.

In both cases, the results contain a subset of the parent object being summed (**action** and **token group** object, respectively).

The `amount` field is always present, but other fields are only present if they are included in the group-by parameter in the request.

For example, when summing tokens grouped by **flavor id** and **account id**, the results might be:

<Tabs>
<TabItem value='java' label='Java'>

```java
{
  amount: 10,
  flavorId: "usd",
  accountId: "alice"
},
{
  amount: 20,
  flavorId: "eur",
  accountId: "bob"
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
{
  amount: 10,
  flavorId: "usd",
  accountId: "alice"
},
{
  amount: 20,
  flavorId: "eur",
  accountId: "bob"
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
{
  amount: 10,
  flavor_id: "usd",
  account_id: "alice"
},
{
  amount: 20,
  flavor_id: "eur",
  account_id: "bob"
}
```

</TabItem>
</Tabs>

Or when summing actions grouped by **type** and **flavor id**, one of the results might be:

<Tabs>
<TabItem value='java' label='Java'>

```java
{
  amount: 10,
  type: "issue",
  flavorId: "usd",
},
{
  amount: 20,
  type: "issue",
  flavorId: "eur",
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
{
  amount: 10,
  type: "issue",
  flavorId: "usd",
},
{
  amount: 20,
  type: "issue",
  flavorId: "eur",
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
{
  amount: 10,
  type: "issue",
  flavor_id: "usd",
},
{
  amount: 20,
  type: "issue",
  flavor_id: "eur",
}
```

</TabItem>
</Tabs>


### Examples

The following examples each retrieve the first two pages of results, with 10 results per page. For details on iterating through all results, see [iterating results](pagination.md#iterating-results).

#### Sum Tokens
##### Query "balances" in an account
To query the current "balances" of Alice's account, we sum all the tokens in that account, grouped by **flavor id**.

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
const page1 = await ledger.tokens.sum({
  filter: 'accountId=$1',
  filterParams: ['alice'],
  groupBy: ['flavorId']
}).page({size: 10})

page1.items.forEach(balance => {
  console.log('amount: ', balance.amount)
  console.log('flavor: ', balance.flavorId)
})

const cursor = page1.cursor

const page2 = await ledger.tokens.sum().page({cursor: cursor})

page2.items.forEach(balance => {
  console.log('amount: ', balance.amount)
  console.log('flavor: ', balance.flavorId)
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.tokens.sum(
  filter: 'account_id=$1',
  filter_params: ['alice'],
  group_by: ['flavor_id']
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

Which might output:

```
amount: 10
flavor: usd

amount: 200
flavor: points
```

##### Query "circulation" of a flavor
If we want to know the total amount of USD in the ledger across all accounts, we sum all tokens of that flavor across all accounts.

Since we are looking for a single value, we do not need to provide a group-by parameter or request a second page of results.

<Tabs>
<TabItem value='java' label='Java'>

```java
TokenSum.Page page1 = new Token.SumBuilder()
  .setFilter("flavorId=$1")
  .addFilterParameter("usd")
  .setPageSize(10)
  .getPage(ledger);
for (TokenSum circulation : page1.items) {
  System.out.println("circulation: " + circulation.amount);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
const page1 = await ledger.tokens.sum({
  filter: 'flavorId=$1',
  filterParams: ['usd']
}).page({size: 10})

page1.items.forEach(circulation => {
  console.log('circulation: ', circulation.amount)
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.tokens.sum(
  filter: 'flavor_id=$1',
  filter_params: ['usd']
).page(size: 10)

page1.each do |circulation|
  puts 'circulation: ', circulation.amount
end
```

</TabItem>
</Tabs>

Which will output:

```
circulation: x
```

##### Query "balance" of one flavor across several related accounts

Query the total amount of USD in all accounts with `checking` as the value for the `type` field in the account tags.

Since we are looking for a single value, we do not need to provide a group-by parameter or request a second page of results.

<Tabs>
<TabItem value='java' label='Java'>

```java
TokenSum.page page1 = new Token.SumBuilder()
  .setFilter("flavorId=$1 AND accountTags.type=$2")
  .addFilterParameter("usd")
  .addFilterParameter("checking")
  .setPageSize(10)
  .getPage(ledger);
for (TokenSum balance : page1.items) {
  ...
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
const page1 = await ledger.tokens.sum({
  filter: 'flavorId=$1 AND accountTags.type=$2',
  filterParams: ['usd', 'checking']
}).page({size: 10})

page1.items.forEach(balance => {
  console.log('balance: ', balance.amount)
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.tokens.sum(
  filter: 'flavor_id=$1 AND account_tags.type=$2',
  filter_params: ['usd', 'checking']
).page(size: 10)

page1.each do |balance|
  puts 'balance: ', balance.amount
end
```

</TabItem>
</Tabs>

Which will output:

```
balance: x
```

##### Query total balance of several related flavors in an account

Query the total balance of all USD denominated gift cards in Alice's account.

Since we are looking for a single value, we do not need to provide a group-by parameter or request a second page of results.

<Tabs>
<TabItem value='java' label='Java'>

```java
TokenSum.page page1 = new Token.SumBuilder()
  .setFilter("accountId=$1 AND flavorTags.currency=$2 AND flavorTags.type=$3")
  .addFilterParameter("alice")
  .addFilterParameter("usd")
  .addFilterParameter("giftCard")
  .setPageSize(10)
  .getPage(ledger);
for (TokenSum balance : page1.items) {
  ...
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
const page1 = await ledger.tokens.sum({
  filter: 'accountId=$1 AND flavorTags.currency=$2 AND flavorTags.type=$3',
  filterParams: ['alice', 'usd', 'giftCard']
}).page({size: 10})

page1.items.forEach(balance => {
  console.log('balance: ', balance.amount)
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.tokens.sum(
  filter: 'account_id=$1 AND flavor_tags.currency=$2 AND flavor_tags.type=$3',
  filter_params: ['alice', 'usd', 'gift_card']
).page(size: 10)

page1.each do |balance|
  puts 'balance: ', balance.amount
end
```

</TabItem>
</Tabs>

Which will output:

```
balance: x
```

#### Sum Actions

##### Query total amount issued of a flavor
To query the total amount of USD ever issued, you sum all the actions that issue tokens of that flavor.

This is distinct from summing all the tokens of the flavor, because it will include amounts that have been retired (and are therefore no longer in the ledger).

Since we are looking for a single value, we do not need to provide a group-by parameter or request a second page of results.

<Tabs>
<TabItem value='java' label='Java'>

```java
ActionsSum.Page page1 = new Action.SumBuilder()
  .setFilter("type=$1 AND flavorId=$2")
  .addFilterParameter("issue")
  .addFilterParameter("usd")
  .setPageSize(10)
  .getPage(ledger);
for (ActionSum total : page1.items) {
  System.out.println("amount: " + total.amount);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
const page1 = await ledger.actions.sum({
  filter: 'type=$1 AND flavorId=$2',
  filterParams: ['issue', 'usd']
}).page({size: 10})

page1.items.forEach(total => {
  console.log("total: ", total.amount)
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.actions.sum(
  filter: 'type=$1 AND flavor_id=$2',
  filter_params: ['issue', 'usd']
).page(size: 10)

page1.each do |total|
  puts 'total: ', total.amount
end
```

</TabItem>
</Tabs>

Which will output:

```
total: x
```

##### Query total amount of a flavor deposited into each account for a time period

Assuming a deposit is modeled as an issuance, to query the total amount of USD deposited into every account in the ledger today, you sum all the actions that issue `usd` since time `t`, grouped by **account id**.

<Tabs>
<TabItem value='java' label='Java'>

```java
ActionsSum.Page page1 = new Action.SumBuilder()
  .setFilter("type=$1 AND flavorId=$2" AND timestamp > $3 )
  .addFilterParameter("issue")
  .addFilterParameter("usd")
  .addFilterParameter(t)
  .addGroupByParameter("destinationAccountId")
  .setPageSize(10)
  .getIterable(ledger);
for (ActionSum deposit : page1.items) {
  System.out.println("amount: " + deposit.amount);
  System.out.println("account: " + deposit.destinationAccountId);
}

String cursor = page1.cursor;

TokenSum.Page page2 = new Action.SumBuilder()
  .getPage(ledger, cursor);
for (ActionSum deposit : page2.items) {
  System.out.println("amount: " + deposit.amount);
  System.out.println("account: " + deposit.destinationAccountId);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
const page1 = await ledger.actions.sum({
  filter: 'type=$1 AND flavorId=$2 AND timestamp > $3',
  filterParams: ['issue', 'usd', t],
  groupBy: ['destinationAccountId']
}).page({size: 10})

page1.items.forEach(deposit => {
  console.log("account: ", deposit.destinationAccountId)
  console.log("amount: ", deposit.amount)
})

const cursor = page1.cursor

const page2 = await ledger.tokens.actions.sum().page({cursor: cursor})

page2.items.forEach(deposit => {
  console.log("account: ", deposit.destinationAccountId)
  console.log("amount: ", deposit.amount)
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.actions.sum(
  filter: 'type=$1 AND flavor_id=$2 AND timestamp > $3',
  filter_params: ['issue', 'usd', t],
  group_by: ['destination_account_id']
).page(size: 10)

page1.each do |deposit|
  puts 'account: ', deposit.destination_account_id
  puts 'amount: ', deposit.amount
end

cursor = page1.cursor

page2 = ledger.actions.sum.page(cursor: cursor)

page2.each do |deposit|
  puts 'account: ', deposit.destination_account_id
  puts 'amount: ', deposit.amount
end
```
</TabItem>
</Tabs>

Which will output:

```
account: alice
amount: x

account: bob
amount: y

account: carol
amount: z

...
```

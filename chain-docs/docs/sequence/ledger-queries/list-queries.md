---
title: List Queries
id: list-queries
sidebar-position: 4
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A list query targets a single type of object - keys, accounts, flavors, transactions, actions, or tokens - and returns a [paginated](pagination.md) set of results.

You can add a [filter](filters.md) to narrow the results.

### Examples

The following examples each retrieve the first two pages of results, with 10 results per page. For details on iterating through all results, see [iterating results](pagination.md#iterating-results).

#### Accounts
List accounts with `checking` as the value for `type` in the `tags`.

<Tabs>
<TabItem value='java' label='Java'>

```java
Account.Page page1 = new Account.ListBuilder()
  .setFilter("tags.type=$1")
  .addFilterParameter("checking")
  .setPageSize(10)
  .getPage(ledger);
for (Account account : page1.items) {
  ...
}

String cursor = page1.cursor;

Account.Page page2 = new Account.ListBuilder()
  .getPage(ledger, cursor);
for (Account account : page2.items) {
  ...
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
const page1 = await ledger.account.list({
  filter: 'tags.type=$1',
  filterParams: ['checking']
}).page({size: 10})

page1.items.forEach(account => {
  ...
})

const cursor = page1.cursor

const page2 = await ledger.accounts.list().page({cursor: cursor})

page2.items.forEach(action => {
  ...
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.accounts.list(
  filter: 'tags.type=$1',
  filter_params: ['checking']
).page(size: 10)

page1.each do |account|
  puts account.to_json
end

cursor = page1.cursor

page2 = ledger.accounts.list.page(cursor: cursor)

page2.each do |account|
  puts account.to_json
end
```

</TabItem>
</Tabs>

#### Transactions
List transactions for Alice's account.

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction.Page page1 = new Transaction.ListBuilder()
  .setFilter("actions(sourceAccountId=$1 OR destinationAccountId=$1)")
  .addFilterParameter("alice")
  .setPageSize(10)
  .getPage(ledger);
for (Transaction tx : page1.items) {
  ...
}

String cursor = page1.cursor;

Transaction.Page page2 = new Transaction.ListBuilder()
  .getPage(ledger, cursor);
for (Transaction tx : page2.items) {
  ...
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
const page1 = await ledger.transactions.list({
  filter: 'actions(sourceAccountId=$1 OR destinationAccountId=$1)',
  filterParams: ['alice']
}).page({size: 10})

page1.items.forEach(tx => {
  ...
})

const cursor = page1.cursor

const page2 = await ledger.transactions.list().page({cursor: cursor})

page2.items.forEach(tx => {
  ...
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.transactions.list(
  filter: 'actions(source_account_id=$1 OR destination_account_id=$1)',
  filter_params: ['alice']
).page(size: 10)

page1.each do |tx|
  puts tx.to_json
end

cursor = page1.cursor

page2 = ledger.transactions.list.page(cursor: cursor)

page2.each do |tx|
  puts tx.to_json
end
```

</TabItem>
</Tabs>

#### Actions
List actions that issued USD to Alice's account.

<Tabs>
<TabItem value='java' label='Java'>

```java
Action.Page page1 = new Action.ListBuilder()
  .setFilter("destinationAccountId=$1 AND flavorId=$2 AND type=$3")
  .addFilterParameter("alice")
  .addFilterParameter("usd")
  .addFilterParameter("issue")
  .setPageSize(10)
  .getPage(ledger);
for (Action action : page1.items) {
  ...
}

String cursor = page1.cursor;

Action.Page page2 = new Action.ListBuilder()
  .getPage(ledger, cursor);
for (Action action : page2.items) {
  ...
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
const page1 = await ledger.actions.list({
  filter: 'destinationAccountId=$1 AND flavorId=$2 AND type=$3',
  filterParams: ['alice', 'usd', 'issue']
}).page({size: 10})

page1.items.forEach(action => {
  ...
})

const cursor = page1.cursor

const page2 = await ledger.actions.list().page({cursor: cursor})

page2.items.forEach(action => {
  ...
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.actions.list(
  filter: 'destination_account_id=$1 AND flavor_id=$2 AND type=$3',
  filter_params: ['alice', 'usd', 'issue']
).page(size: 10)

page1.each do |action|
  puts action.to_json
end

cursor = page1.cursor

page2 = ledger.actions.list.page(cursor: cursor)

page2.each do |action|
  puts action.to_json
end
```

</TabItem>
</Tabs>

#### Tokens
List tokens with `date` as the value for `due` in the `tags`.

**Note**: This endpoint does not return individual token objects, but rather **token group** objects, which each represent an `amount` of identical tokens.

<Tabs>
<TabItem value='java' label='Java'>

```java
TokenGroup.Page page1 = new Token.ListBuilder()
  .setFilter("tags.due=$1")
  .addFilterParameter("date")
  .setPageSize(10)
  .getPage(ledger);
for (TokenGroup tokenGroup : page1.items) {
  ...
}

String cursor = page1.cursor;

TokenGroup.Page page2 = new Token.ListBuilder()
  .getPage(ledger, cursor);
for (TokenGroup tokenGroup : page2.items) {
  ...
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
const page1 = await ledger.tokens.list({
  filter: 'tags.due=$1',
  filterParams: ['date']
}).page({size: 10})

page1.items.forEach(tokenGroup => {
  ...
})

const cursor = page1.cursor

const page2 = await ledger.tokens.list().page({cursor: cursor})

page2.items.forEach(tokenGroup => {
  ...
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.tokens.list(
  filter: 'tags.due=$1',
  filter_params: ['date']
).page(size: 10)

page1.each do |token_group|
  puts token_group.to_json
end

cursor = page1.cursor

page2 = ledger.tokens.list.page(cursor: cursor)

page2.each do |token_group|
  puts token_group.to_json
end
```

</TabItem>
</Tabs>

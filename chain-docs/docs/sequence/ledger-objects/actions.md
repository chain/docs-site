---
title: Actions
id: actions
sidebar-position: 5
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An action is an individual component of a [transaction](transactions.md) that **issues**, **transfers**, or
**retires** tokens of a single flavor.

In this document, we will examine action queries, which are useful for retrieving historical state of the ledger.

For more information about creating actions, see [Transactions](transactions.md).

### Queries

There are two different types of queries that you can perform on actions:

1. A **[list query](../ledger-queries/list-queries.md)** returns a time-ordered set of actions beginning with the most recent.
2. A **[sum query](../ledger-queries/sum-queries.md)** is an aggregate over the `amount` fields in a set of actions.

Both queries accept a [filter](../ledger-queries/filters.md) to narrow the results.

#### Group By

The **group-by** query parameter on the sum actions query indicates how amounts of a set of actions should be summed.

The query will break the results into groups where all values of the each group-by field are identical. This is analogous to the "GROUP BY" clause in SQL.

If no group-by parameter is specified, all results will be summed to a single amount.

#### List actions
If your transaction structure has more than one action, you may wish to query a list of only one type.

For example, you could query all the actions where `usd` is issued:

<Tabs>
<TabItem value='java' label='Java'>

```java
Action.ItemIterable actions = new Action.ListBuilder()
  .setFilter("type=$1 AND flavorId=$2")
  .addFilterParameter("issue")
  .addFilterParameter("usd")
  .getIterable(ledger);
for (Action action : actions) {
  System.out.println("amount: " + action.amount);
  System.out.println("issued at: " + action.timestamp);
}
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
let all = ledger.actions.list({
  filter: 'type=$1 AND flavorId=$2',
  filterParams: ['issue', 'usd']
}).all()

while (true) {
  let { value: action, done: done } = await all.next()
  if (done) { break }
  console.log('amount: ', action.amount)
  console.log('issued at: ', action.timestamp)
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.actions.list(
  filter: 'type=$1 AND flavor_id=$2',
  filter_params: ['issue', 'usd']
).each do |action|
  puts 'amount: ', action.amount
  puts 'issued at: ', action.timestamp
end
```

</TabItem>
</Tabs>

#### Sum actions

If you want to calculate historical totals of specific actions, you can perform a sum query using a [filter](../ledger-queries/filters.md).

For example, imagine a mobile wallet ledger where every transaction has two actions - one that transfers a payment amount of cash from a user to a merchant and one that transfers a fee amount of cash from the merchant to a company fee account.


<Tabs>
<TabItem value='java' label='Java'>

```java
{
  actions: [
    {
      type: "transfer",
      flavorId: "cash",
      amount: 10000,
      sourceAccountId: "alice",
      destinationAccountId: "merchant1",
    },
    {
      type: "transfer",
      flavorId: "cash",
      amount: 200,
      sourceAccountId: "merchant1",
      destinationAccountId: "feeAccount",
    }
  ]
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
{
  actions [
    {
      type: "transfer",
      flavorId: "cash",
      amount: 10000,
      sourceAccountId: "alice",
      destinationAccountId: "merchant1",
    },
    {
      type: "transfer",
      flavorId: "cash",
      amount: 200,
      sourceAccountId: "merchant1",
      destinationAccountId: "feeAccount",
    }
  ]
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
{
  actions [
    {
      type: "transfer",
      flavor_id: "cash",
      amount: 10000,
      source_account_id: "alice",
      destination_account_id: "merchant1",
    },
    {
      type: "transfer",
      flavor_id: "cash",
      amount: 200,
      source_account_id: "merchant1",
      destination_account_id: "fee_account",
    }
  ]
}
```

</TabItem>
</Tabs>

You could use a sum query to calculate the amount of fees earned since timestamp `t`.

Since we are looking for a single value, we do not need to provide a group-by parameter.

<Tabs>
<TabItem value='java' label='Java'>

```java
ActionSum.ItemIterable totals = new Action.SumBuilder()
  .setFilter("destinationAccountId=$1 AND timestamp > $2")
  .addFilterParameter("feeAccount")
  .addFilterParameter(t)
  .getIterable(ledger);
for (ActionSum total : totals) {
  System.out.println("amount: " + total.amount);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let all = ledger.actions.sum({
  filter: 'destinationAccountId=$1 AND timestamp > $2',
  filterParams: ['feeAccount', t]
}).all()

while (true) {
  let { value: total, done: done } = await all.next()
  if (done) { break }
  console.log('total fees: ', total.amount)
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.actions.sum(
  filter: 'destination_account_id=$1 AND timestamp > $2',
  filter_params: ['fee_account', t]
).each do |total|
  puts 'total fees: ', total.amount
end
```

</TabItem>
</Tabs>

### Data Structure

#### Field Descriptions

| Field                     | Type             | Description                                                                       |
|:--------------------------|:-----------------|:----------------------------------------------------------------------------------|
| id                        | string           | Unique identifier of the action.                                                  |
| timestamp                 | string           | Time (in RFC3339 format) that the action was committed to the ledger.             |
| type                      | string           | Type of action – either `issue`, `transfer`, or  `retire`.                        |
| amount                    | integer          | Amount of tokens issued, transferred, or retired.                                 |
| flavor id                 | string           | The id of the flavor.                                                             |
| source account id         | string           | The id of the source account.                                                     |
| filter                    | string           | The filter provided at the time of transaction to select tokens.                  |
| filter params             | array of strings | The ordered set of values for any placeholders (e.g `$1`) included in the filter. |
| destination account id    | string           | The id of the destination account.                                                |
| snapshot                  | object           | A snapshot of all associated tags at the time of the transaction.                 |
| tags                      | JSON object      | The current tags on the action.                                                   |

##### Snapshot Object

| Field                    | Type        | Description                                                                                       |
|:-------------------------|:------------|:--------------------------------------------------------------------------------------------------|
| action tags              | JSON object | The tags of the action (at time of transaction).                                                  |
| flavor tags              | JSON object | The tags of the flavor (at time of transaction).                                                  |
| source account tags      | JSON object | The tags of the source account (at time of transaction).                                          |
| destination account tags | JSON object | The tags of the destination account (at time of transaction).                                     |
| token tags               | JSON object | The tags added to the tokens as they arrived in the destination account (at time of transaction). |
| transaction tags         | JSON object | The tags added to the transaction (at time of transaction). |

#### Example Objects

##### Issue Action

<Tabs>
<TabItem value='java' label='Java'>

```java
{
  type: "issue",
  id: "",
  timestamp: "",
  flavorId: "",
  amount: 1,
  destinationAccountId: "",
  tags: {},
  snapshot: {
    actionTags: {},
    flavorTags: {},
    destinationAccountTags: {},
    tokenTags: {},
    transactionTags: {}
  }
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
{
  type: "issue",
  id: "",
  timestamp: "",
  flavorId: "",
  amount: 1,
  destinationAccountId: "",
  tags: {},
  snapshot: {
    actionTags: {},
    flavorTags: {},
    destinationAccountTags: {},
    tokenTags: {},
    transactionTags: {}
  }
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
{
  type: "issue",
  id: "",
  timestamp: "",
  flavor_id: "",
  amount: 1,
  destination_account_id: "",
  tags: {},
  snapshot: {
    action_tags: {},
    flavor_tags: {},
    destination_account_tags: {},
    token_tags: {},
    transaction_tags: {}
  }
}
```

</TabItem>
</Tabs>

##### Transfer Action

<Tabs>
<TabItem value='java' label='Java'>

```java
{
  type: "issue",
  id: "",
  timestamp: "",
  flavorId: "",
  amount: 1,
  sourceAccountId: "",
  filter: "",
  filterParams: [""],
  destinationAccountId: "",
  tags: {},
  snapshot: {
    actionTags: {},
    flavorTags: {},
    sourceAccountTags: {},
    destinationAccountTags: {},
    tokenTags: {},
    transactionTags: {}
  }
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
{
  type: "issue",
  id: "",
  timestamp: "",
  flavorId: "",
  amount: 1,
  sourceAccountId: "",
  filter: "",
  filterParams: [""],
  destinationAccountId: "",
  tags: {},
  snapshot: {
    actionTags: {},
    flavorTags: {},
    sourceAccountTags: {},
    destinationAccountTags: {},
    tokenTags: {},
    transactionTags: {}
  }
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
{
  type: "transfer",
  id: "",
  timestamp: "",
  flavor_id: "",
  amount: 1,
  source_account_id: "",
  filter: "",
  filter_params: [""],
  destination_account_id: "",
  tags: {},
  snapshot: {
    action_tags: {},
    flavor_tags: {},
    source_account_tags: {},
    destination_account_tags: {},
    token_tags: {},
    transaction_tags: {}
  }
}
```

</TabItem>
</Tabs>

##### Retire Action

<Tabs>
<TabItem value='java' label='Java'>

```java
{
  type: "retire",
  id: "",
  timestamp: "",
  flavorId: "",
  amount: 1,
  sourceAccountId: "",
  filter: "",
  filterParams: [""],
  tags: {},
  snapshot: {
    actionTags: {},
    flavorTags: {},
    sourceAccountTags: {},
    transactionTags: {}
  }
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
{
  type: "retire",
  id: "",
  timestamp: "",
  flavorId: "",
  amount: 1,
  sourceAccountId: "",
  filter: "",
  filterParams: [""],
  tags: {},
  snapshot: {
    actionTags: {},
    flavorTags: {},
    sourceAccountTags: {},
    transactionTags: {}
  }
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
{
  type: "retire",
  id: "",
  timestamp: "",
  flavor_id: "",
  amount: 1,
  source_account_id: "",
  filter: "",
  filter_params: [""],
  tags: {},
  snapshot: {
    action_tags: {},
    flavor_tags: {},
    source_account_tags: {},
    transaction_tags: {}
  }
}
```

</TabItem>
</Tabs>

### SDK Examples

#### List query by flavor

List all actions that transferred USD.

<Tabs>
<TabItem value='java' label='Java'>

```java
Action.ItemIterable actions = new Action.ListBuilder()
  .setFilter("type=$1 AND flavorId=$2")
  .addFilterParameter("transfer")
  .addFilterParameter("usd")
  .getIterable(ledger);
for (Action action : actions) {
  System.out.println("amount: " + action.amount);
  System.out.println("transferred at: " + action.timestamp);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let all = ledger.actions.list({
  filter: 'type=$1 AND flavorId=$2',
  filterParams: ['transfer', 'usd']
}).all()

while (true) {
  let { value: action, done: done } = await all.next()
  if (done) { break }
  console.log('amount: ', action.amount)
  console.log('transferred at: ',action.timestamp)
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.actions.list(
  filter: 'type=$1 AND flavorId=$2',
  filter_params: ['transfer', 'usd']
).each do |action|
  puts 'amount: ', action.amount
  puts 'transferred at: ', action.timestamp
end
```

</TabItem>
</Tabs>

#### List query by account

List all actions where Alice transferred tokens (of any flavor) to Bob

<Tabs>
<TabItem value='java' label='Java'>

```java
Action.ItemIterable actions = new Action.ListBuilder()
  .setFilter("sourceAccountId=$1 AND destinationAccountId=$2")
  .addFilterParameter("alice")
  .addFilterParameter("bob")
  .getIterable(ledger);
for (Action action : actions) {
  System.out.println("amount: " + action.amount);
  System.out.println("flavor: " + action.flavorId);
  System.out.println("transferred at: " + action.timestamp);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let all = ledger.actions.list({
  filter: 'sourceAccountId=$1 AND destinationAccountId=$2',
  filterParams: ['alice', 'bob']
}).all()

while (true) {
  let { value: action, done: done } = await all.next()
  if (done) { break }
  console.log('amount: ', action.amount)
  console.log('flavor: ', action.flavorId)
  console.log('transferred at: ', action.timestamp)
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.actions.list(
  filter: 'source_account_id=$1 AND destination_account_id=$2',
  filter_params: ['alice', 'bob']
).each do |action|
  puts 'amount: ', action.amount
  puts 'flavor: ', action.flavor_id
  puts 'transferred at: ', action.timestamp
end
```

</TabItem>
</Tabs>

#### List query by action tags

Assuming that tokens are issued when a deposit occurs in some external system and the `source` of the deposit is recorded as a field in the action tags, list all issue actions where deposit source was wire transfer.

<Tabs>
<TabItem value='java' label='Java'>

```java
Action.ItemIterable actions = new Action.ListBuilder()
  .setFilter("type=$1 AND tags.source=$2")
  .addFilterParameter("issue")
  .addFilterParameter("wire")
  .getIterable(ledger);
for (Action action : actions) {
  System.out.println("amount: " + action.amount);
  System.out.println("flavor: " + action.flavorId);
  System.out.println("deposited at: " + action.timestamp);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let all = ledger.actions.list({
  filter: 'type=$1 AND tags.source=$2',
  filterParams: ['issue', 'wire']
}).all()

while (true) {
  let { value: action, done: done } = await all.next()
  if (done) { break }
  console.log('amount: ', action.amount)
  console.log('flavor: ', action.flavorId)
  console.log('deposited at: ', action.timestamp)
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.actions.list(
  filter: 'type=$1 AND tags.source=$2',
  filter_params: ['issue', 'wire']
).each do |action|
  puts 'currency: ', action.flavor_id
  puts 'amount: ', action.amount
  puts 'deposited at: ', action.timestamp
end
```

</TabItem>
</Tabs>

#### List query by flavor tags snapshot

Assuming each currency flavor is tagged with `"type": "currency"`, list all actions where any type of "currency" was issued.

<Tabs>
<TabItem value='java' label='Java'>

```java
Action.ItemIterable actions = new Action.ListBuilder()
  .setFilter("type=$1 AND snapshot.flavorTags.type=$2")
  .addFilterParameter("issue")
  .addFilterParameter("currency")
  .getIterable(ledger);
for (Action action : actions) {
  System.out.println("type: " + action.snapshot.flavorTags.get("type"));
  System.out.println("currency: " + action.flavorId);
  System.out.println("amount: " + action.amount);
  System.out.println("issued at: " + action.timestamp);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let all = client.actions.list(
  filter: 'type=$1 AND snapshot.flavorTags.type=$2',
  filterParams: ['issue', 'currency']
).all()

while (true) {
  let { value: action, done: done } = await all.next()
  if (done) { break }
  console.log('type: ', action.snapshot.flavorTags.type)
  console.log('currency: ', action.flavorId)
  console.log('amount: ', action.amount)
  console.log('issued at: ', action.timestamp)
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.actions.list(
  filter: 'type=$1 AND snapshot.flavor_tags.type=$2',
  filter_params: ['issue', 'currency']
).each do |action|
  puts 'type: ', action.snapshot.flavor_tags['type']
  puts 'currency: ', action.flavor_id
  puts 'amount: ', action.amount
  puts 'issued at: ', action.timestamp
end
```

</TabItem>
</Tabs>

#### Sum query by type over a time range

Assuming each currency flavor is tagged with `"type": "currency"`, calculate the amount of each "currency" issued between timestamp `t1` and `t2`.

<Tabs>
<TabItem value='java' label='Java'>

```java
ActionSum.ItemIterable sums = new Action.SumBuilder()
  .setFilter("type = $1 AND snapshot.flavorTags.type = $2 AND timestamp >= $3 AND timestamp =< $4")
  .addFilterParameter("issue")
  .addFilterParameter("currency")
  .addFilterParameter(t1)
  .addFilterParameter(t2)
  .addGroupByField("flavorId")
  .getIterable(ledger);
for (ActionSum sum : sums) {
  System.out.println("currency: " + sum.flavorId);
  System.out.println("amount issued: " + sum.amount);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let all = client.actions.sum(
  filter: 'type = $1 AND snapshot.flavorTags.type = $2 AND timestamp >= $3 AND timestamp <= $4',
  filterParams: ['issue', 'currency', t1, t2],
  groupBy: ['flavorId']
).all()

while (true) {
  let { value: sum, done: done } = await all.next()
  if (done) { break }
  console.log('currency: ', sum.flavorId);
  console.log('amount issued: ', sum.amount);
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.actions.sum(
  filter: 'type = $1 AND snapshot.flavor_tags.type = $2 AND timestamp >= $3 AND timestamp <= $4',
  filter_params: ['issue', 'currency', t1, t2],
  group_by: ['flavor_id']
).each do |sum|
  puts 'currency: ', sum.flavor_id
  puts 'amount issued: ', sum.amount
end
```

</TabItem>
</Tabs>
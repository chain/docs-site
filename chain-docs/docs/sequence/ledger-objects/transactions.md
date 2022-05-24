---
title: Transactions
id: transactions
sidebar-position: 4
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Transactions are atomic ledger updates that **issue**, **transfer**, and/or
**retire** tokens in the ledger. A transaction is comprised of one or more
[actions](actions.md).

All actions in a transaction occur simultaneously. Each action operates on tokens
of a single flavor, but you can use multiple actions in a single transaction
to atomically operate on multiple flavors.

* **Issue** – The issue action issues new tokens into an account.
  It accepts a flavor id, an amount, and a destination account id. *The
  transaction must be signed with the flavor's key(s)*.
* **Transfer** – The transfer action transfers tokens from one
  account to another. It accepts a flavor id, an amount, a source account id,
  a destination account id, and an optional filter. *The transaction must be
  signed with the source account's key(s)*.
* **Retire** – The retire action retires tokens from an account.
  It accepts a flavor id, an amount, a source account id, and an optional filter.
  *The transaction must be signed with the source account's key(s)*.

### Data Structure

#### Field Descriptions

| Field           | Type        | Description                                                                                          |
|:----------------|:------------|:-----------------------------------------------------------------------------------------------------|
| id              | string      | Cryptographic, globally unique identifier of the transaction.                                        |
| timestamp       | string      | Time (in RFC3339 format) that the transaction was committed to the ledger.                           |
| sequence number | integer     | Absolute position in the ledger.                                                                     |
| actions         | array       | A sequential list of [actions](actions.md) affecting the ledger in the transaction. |
| tags            | JSON object | User-specified key-value data about the transaction. |

#### Example object

<Tabs>
<TabItem value='java' label='Java'>

```java
{
  id: "",
  sequenceNumber: 1,
  timestamp: "",
  actions: [
    {
      type: "issue",
      flavorId: "",
      amount: 1,
      destinationAccountId: "",
      tags: {}
    },
    {
      type: "transfer",
      flavorId: "",
      amount: 1,
      sourceAccountId: "",
      sourceAccountTags: {},
      destinationAccountId: "",
      destinationAccountTags: {},
      tags: {}
    },
    {
      type: "retire",
      flavorId: "",
      amount: 1,
      sourceAccountId: "",
      sourceAccountTags: {},
      tags: {}
    }
  ],
  tags: {}
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
{
  id: "",
  sequenceNumber: 1,
  timestamp: "",
  actions: [
    {
      type: "issue",
      flavorId: "",
      amount: 1,
      destinationAccountId: "",
      tags: {}
    },
    {
      type: "transfer",
      flavorId: "",
      amount: 1,
      sourceAccountId: "",
      sourceAccountTags: {},
      destinationAccountId: "",
      destinationAccountTags: {},
      tags: {}
    },
    {
      type: "retire",
      flavorId: "",
      amount: 1,
      sourceAccountId: "",
      sourceAccountTags: {},
      tags: {}
    }
  ],
  tags: {}
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
{
  id: "",
  sequence_number: 1,
  timestamp: "",
  actions: [
    {
      type: "issue",
      flavor_id: "",
      amount: 1,
      destination_account_id: "",
      tags: {},
    },
    {
      type: "transfer",
      flavor_id: "",
      amount: 1,
      source_account_id: "",
      source_account_tags: {},
      destination_account_id: "",
      destination_account_tags: {},
      tags: {}
    },
    {
      type: "retire",
      flavor_id: "",
      amount: 1,
      source_account_id: "",
      source_account_tags: {},
      tags: {}
    }
  ],
  tags: {}
```

</TabItem>
</Tabs>

### Examples

#### Issue

Issue USD to Alice.

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
ledger.transactions.transact(builder => {
  builder.issue({
    flavorId: 'usd',
    amount: 100,
    destinationAccountId: 'alice'
  })
}).then(tx => ...)
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

#### Transfer

Transfer USD from Alice to Bob.

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction tx = new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(10)
    .setSourceAccountId("alice")
    .setDestinationAccountId("bob")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.transfer({
    flavorId: 'usd',
    amount: 10,
    sourceAccountId: 'alice',
    destinationAccountId: 'bob'
  })
}).then(tx => ...)
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
tx = ledger.transactions.transact do |builder|
  builder.transfer(
    flavor_id: 'usd',
    amount: 10,
    source_account_id: 'alice',
    destination_account_id: 'bob'
  )
end
```

</TabItem>
</Tabs>

#### Retire

Retire USD from Bob.

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
ledger.transactions.transact(builder => {
  builder.retire({
    flavorId: 'usd',
    amount: 5,
    sourceAccountId: 'bob'
  })
}).then(tx => ...)
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

#### Multi-asset transfer

Transfer USD and EUR from Alice to Bob.

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction tx = new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(10)
    .setSourceAccountId("alice")
    .setDestinationAccountId("bob")
  ).addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("eur")
    .setAmount(20)
    .setSourceAccountId("alice")
    .setDestinationAccountId("bob")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.transfer({
    flavorId: 'usd',
    amount: 10,
    sourceAccountId: 'alice',
    destinationAccountId: 'bob'
  })
  builder.transfer({
    flavorId: 'eur',
    amount: 20,
    sourceAccountId: 'alice',
    destinationAccountId: 'bob'
  })
}).then(tx => ...)
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
tx = ledger.transactions.transact do |builder|
  builder.transfer(
    flavor_id: 'usd',
    amount: 10,
    source_account_id: 'alice',
    destination_account_id: 'bob'
  )
  builder.transfer(
    flavor_id: 'eur',
    amount: 20,
    source_account_id: 'alice',
    destination_account_id: 'bob'
  )
end
```

</TabItem>
</Tabs>

#### Multi-account transfer

Transfer USD from Alice to Bob and transfer EUR from Bob to Carol.

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction tx = new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(10)
    .setSourceAccountId("alice")
    .setDestinationAccountId("bob")
  ).addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("eur")
    .setAmount(20)
    .setSourceAccountId("bob")
    .setDestinationAccountId("carol")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.transfer({
    flavorId: 'usd',
    amount: 10,
    sourceAccountId: 'alice',
    destinationAccountId: 'bob'
  })
  builder.transfer({
    flavorId: 'eur',
    amount: 20,
    sourceAccountId: 'bob',
    destinationAccountId: 'carol'
  })
}).then(tx => ...)
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
tx = ledger.transactions.transact do |builder|
  builder.transfer(
    flavor_id: 'usd',
    amount: 10,
    source_account_id: 'alice',
    destination_account_id: 'bob'
  )
  builder.transfer(
    flavor_id: 'eur',
    amount: 20,
    source_account_id: 'bob',
    destination_account_id: 'carol'
  )
end
```

</TabItem>
</Tabs>

#### Add action tags

Add action tags to the issue action to denote the source of the deposit.

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction tx = new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("usd")
    .setAmount(100)
    .setDestinationAccountId("alice")
    .addActionTagsField("source", "wire")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.issue({
    flavorId: 'usd',
    amount: 100,
    destinationAccountId: 'alice',
    actionTags: {source: 'wire'}
  })
}).then(tx => ...)
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
tx = ledger.transactions.transact do |builder|
  builder.issue(
    flavor_id: 'usd',
    amount: 100,
    destination_account_id: 'alice',
    action_tags: {source: 'wire'}
  )
end
```

</TabItem>
</Tabs>

#### Add transaction tags

Add transaction tags to record store location and invoice number.

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction tx = new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(10)
    .setSourceAccountId("alice")
    .setDestinationAccountId("merchant")
  )
  .addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("merchantpoints")
    .setAmount(10)
    .setDestinationAccountId("alice")
  )
  .addTransactionTagsField("invoice", "123")
  .addTransactionTagsField("storeId", "456")
  .transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.transfer({
    flavorId: 'usd',
    amount: 10,
    sourceAccountId: 'alice',
    destinationAccountId: 'merchant'
  })
  builder.issue({
    flavorId: 'merchantpoints',
    amount: 10,
    destinationAccountId: 'alice'
  })
  builder.transactionTags: {
    invoice: '123',
    storeId: '456'
  }
}).then(tx => ...)
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
tx = ledger.transactions.transact do |builder|
  builder.transfer(
    flavor_id: 'usd',
    amount: 10,
    source_account_id: 'alice',
    destination_account_id: 'merchant'
  )
  builder.issue(
    flavor_id: 'merchantpoints',
    amount: 10,
    destination_account_id: 'alice'
  )
  builder.transaction_tags = {
    invoice: '123',
    store_id: '456',
  }
end
```

</TabItem>
</Tabs>

### Querying Examples

#### By flavor

Query all transactions that transferred USD.

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction.ItemIterable txs = new Transaction.ListBuilder()
  .setFilter("actions(type=$1 AND flavorId=$2)")
  .addFilterParameter("transfer")
  .addFilterParameter("usd")
  .getIterable(ledger);
for (Transaction tx : txs) {
  System.out.println("transaction id: " + tx.id);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let all = client.transactions.list(
  filter: 'actions(type=$1 AND flavorId=$2)',
  filterParams: ['transfer', 'usd']
).all()

while (true) {
  let { value: tx, done: done } = await all.next()
  if (done) { break }
  console.log(tx)
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.list(
  filter: 'actions(type=$1 AND flavor_id=$2)',
  filter_params: ['transfer', 'usd']
).each do |tx|
  puts tx.to_json
end
```

</TabItem>
</Tabs>

#### By account

Query all transactions where Alice transferred any tokens to Bob

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction.ItemIterable txs = new Transaction.ListBuilder()
  .setFilter("actions(sourceAccountId=$1 AND destinationAccountId=$2)")
  .addFilterParameter("alice")
  .addFilterParameter("bob")
  .getIterable(ledger);
for (Transaction tx : txs) {
  System.out.println("transaction id: " + tx.id);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let all = ledger.transactions.list({
  filter: 'actions(sourceAccountId=$1 AND destinationAccountId=$2)',
  filterParams: ['alice', 'bob']
}).all()

while (true) {
  let { value: tx, done: done } = await all.next()
  if (done) { break }
  console.log(tx)
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.list(
  filter: 'actions(source_account_id=$1 AND destination_account_id=$2)',
  filter_params: ['alice', 'bob']
).each do |tx|
  puts tx.to_json
end
```

</TabItem>
</Tabs>

#### By action tags

Query all issuances where deposit source was wire transfer.

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction.ItemIterable txs = new Transaction.ListBuilder()
  .setFilter("actions(type=$1 AND tags.source=$2)")
  .addFilterParameter("issue")
  .addFilterParameter("wire")
  .getIterable(ledger);
for (Transaction tx : txs) {
  System.out.println("transaction id: " + tx.id);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let all = ledger.transactions.list({
  filter: 'actions(type=$1 AND tags.source=$2)',
  filterParams: ['issue', 'wire']
}).all()

while (true) {
  let { value: tx, done: done } = await all.next()
  if (done) { break }
  console.log(tx)
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.list(
  filter: 'actions(type=$1 AND tags.source=$2)',
  filter_params: ['issue', 'wire']
).each do |tx|
  puts tx.to_json
end
```

</TabItem>
</Tabs>

#### By flavor tag

Query all transactions where any type of currency was issued.

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction.ItemIterable txs = new Transaction.ListBuilder()
  .setFilter("actions(type=$1 AND snapshot.flavorTags.type=$2)")
  .addFilterParameter("issue")
  .addFilterParameter("currency")
  .getIterable(ledger);
for (Transaction tx : txs) {
  System.out.println("transaction id: " + tx.id);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.list({
  filter: 'actions(type=$1 AND snapshot.flavorTags.type=$2)',
  filterParams: ['issue', 'currency']
}).all(tx => {
  console.log(tx)
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.list(
  filter: 'actions(type=$1 AND snapshot.flavor_tags.type=$2)',
  filter_params: ['issue', 'currency']
).each do |tx|
  puts tx.to_json
end
```

</TabItem>
</Tabs>

#### By transaction tags

Query all transactions for a store.

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction.ItemIterable txs = new Transaction.ListBuilder()
  .setFilter("actions(snapshot.transactionTags.storeId=$1)")
  .addFilterParameter("456")
  .getIterable(ledger);
for (Transaction tx : txs) {
  System.out.println(tx.tags);
  System.out.println(tx.actions.get(0).snapshot.transactionTags);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let all = ledger.transactions.list({
  filter: 'actions(snapshot.transactionTags.storeId=$1)',
  filterParams: ['456']
}).all()

while (true) {
  let { value: tx, done: done } = await all.next()
  if (done) { break }
  console.log(tx.tags)
  console.log(tx.actions[0].snapshot.transactionTags)
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.list(
  filter: 'actions(snapshot.transaction_tags.store_id=$1)',
  filter_params: ['456']
).each do |tx|
  puts tx.tags
  puts tx.actions.first.snapshot.transaction_tags
end
```

</TabItem>
</Tabs>

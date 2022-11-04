---
title: Crypto Exchange
id: crypto-exchange
sidebar_position: 2
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Sequence provides crypto asset exchanges with an easy-to-use, powerful ledger infrastructure for securely tracking client funds. Exchanges can use Sequence to easily record deposits, withdrawals, and transfers of fiat currencies and crypto assets on their platform.

In this guide, we explore how to build a crypto asset exchange application on top of Sequence.

- [Overview](#overview)
- [Setup](#setup)
  - [Keys](#keys)
  - [Flavors](#flavors)
  - [Accounts](#accounts)
- [Transaction Types](#transaction-types)
  - [Deposit](#deposit)
  - [Buy Crypto Assets with Fiat Currency](#buy-crypto-assets-with-fiat-currency)
  - [Settle Trade Match](#settle-trade-match)
  - [External Sale](#external-sale)
  - [Withdraw](#withdraw)
- [Queries](#queries)
  - [User Balances](#user-balances)
  - [Crypto Asset Totals](#crypto-asset-totals)
  - [Total Fees](#total-fees)
  - [User Activity](#user-activity)

### Overview
In our example crypto asset exchange, users will be represented as **accounts** in the ledger.

There are two currencies, USD and EUR, as well as two crypto assets, BTC (Bitcoin) and ETH (Ethereum ether). These will each be represented as **flavors** in the ledger. (This can be extended to any number of different currencies and assets.)

Currencies and crypto assets can be deposited, withdrawn, and transferred to other users in exchange for currencies or other crypto assets. The company charges a 1% fee on all withdrawals of fiat currency. All of these interactions will be represented as **transactions** in the ledger.

### Setup
To set up our ledger, we will create several keys, flavors, and accounts.

#### Keys
Authority to create transactions in the ledger is assigned to two distinct systems:

1. **Treasury** - responsible for deposits
2. **Exchange** - responsible for exchange transactions that transfer tokens between users and withdrawals

Each system will have a key that will be used to perform their actions in the ledger. To create these keys, we run the following:

<Tabs>
<TabItem value='java' label='Java'>

```java
new Key.Builder()
  .setId("treasury")
  .create(ledger);

new Key.Builder()
  .setId("exchange")
  .create(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.keys.create({id: 'treasury'})
ledger.keys.create({id: 'exchange'})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.keys.create(id: 'treasury')
ledger.keys.create(id: 'exchange')
```

</TabItem>
</Tabs>


#### Flavors
Flavors represent the different types of balances in user accounts. We will create flavors for USD, EUR, BTC, and ETH, all using the `treasury` key:

<Tabs>
<TabItem value='java' label='Java'>

```java
new Flavor.Builder()
  .setId("usd")
  .addKeyId("treasury")
  .addTag("type", "currency")
  .create(ledger);

new Flavor.Builder()
  .setId("eur")
  .addKeyId("treasury")
  .addTag("type", "currency")
  .create(ledger);

new Flavor.Builder()
  .setId("btc")
  .addKeyId("treasury")
  .addTag("type", "crypto_Flavor")
  .create(ledger);

new Flavor.Builder()
  .setId("eth")
  .addKeyId("treasury")
  .addTag("type", "crypto_Flavor")
  .create(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.flavors.create({
  id: 'usd',
  keyIds: ['treasury'],
  tags: {type: 'currency'}
})

ledger.flavors.create({
  id: 'eur',
  keyIds: ['treasury'],
  tags: {type: 'currency'}
})

ledger.flavors.create({
  id: 'btc',
  keyIds: ['treasury'],
  tags: {type: 'crypto_asset'}
})

ledger.flavors.create({
  id: 'eth',
  keyIds: ['treasury'],
  tags: {type: 'crypto_asset'}
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.flavors.create(
  id: 'usd',
  key_ids: ['treasury'],
  tags: {type: 'currency'}
)

ledger.flavors.create(
  id: 'eur',
  key_ids: ['treasury'],
  tags: {type: 'currency'}
)

ledger.flavors.create(
  id: 'btc',
  key_ids: ['treasury'],
  tags: {type: 'crypto_asset'}
)

ledger.flavors.create(
  id: 'eth',
  key_ids: ['treasury'],
  tags: {type: 'crypto_asset'}
)
```

</TabItem>
</Tabs>


#### Accounts
We will need an account in the ledger for each user. Although these accounts would actually be created by the exchange application in real-time, for this example we'll assume we have two users (Alice and Bob) and create them as part of the setup.

We will use **tags** to differentiate between the types of accounts.

We use the `exchange` key to create all accounts.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Account.Builder()
  .setId("alice")
  .addKeyId("exchange")
  .addTag("type", "user")
  .create(ledger);

new Account.Builder()
  .setId("bob")
  .addKeyId("exchange")
  .addTag("type", "user")
  .create(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.accounts.create({
  id: 'alice',
  keyIds: ['exchange'],
  tags: {type: 'user'}
})

ledger.accounts.create({
  id: 'bob',
  keyIds: ['exchange'],
  tags: {type: 'user'}
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.accounts.create(
  id: 'alice',
  key_ids: ['exchange'],
  tags: {type: 'user'}
)

ledger.accounts.create(
  id: 'bob',
  key_ids: ['exchange'],
  tags: {type: 'user'}
)
```

</TabItem>
</Tabs>

### Transaction Types
Now that we have created our flavors and accounts, we can track events with **transactions**. A single transaction can include multiple **actions**, involving any number of flavors and accounts. The actions in a transaction occur simultaneously, as a single, atomic operation. A transaction can never be partially applied.

#### Deposit
When a user deposits fiat currency or a crypto asset, we create a transaction containing an **issue** action to issue the amount of the deposited currency or crypto asset into their account. This will create a number of **tokens** of the corresponding flavor and put them in the account.

We can use **action tags** to record details about the deposit, such as the deposit method and associated transaction ID in an external system.

For this example, we assume that Alice deposits $1,000.00 via ACH and 5 BTC, and that Bob deposits 50 ETH. Note that the amount of issuance of USD is 10000, because the fundamental unit of the USD asset is a cent. (In a real application, our BTC asset would be denominated in Satoshi. We don't do that here so the amounts are easier to read.) We can do all three of these actions in a single transaction:

<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("usd")
    .setAmount(10000)
    .setDestinationAccountId("alice")
    .addActionTagsField("type", "deposit")
    .addActionTagsField("system", "ach")
    .addActionTagsField("ach_transaction_id", "11111")
  ).addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("btc")
    .setAmount(5)
    .setDestinationAccountId("alice")
    .addActionTagsField("type", "deposit")
  ).addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("eth")
    .setAmount(50)
    .setDestinationAccountId("bob")
    .addActionTagsField("type", "deposit")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.issue({
    flavorId: 'usd',
    amount: 100000,
    destinationAccountId: 'alice',
    actionTags: {
      type: 'deposit',
      system: 'ach',
      ach_transaction_id: '11111'
    }
  })
  builder.issue({
    flavorId: 'btc',
    amount: 5,
    destinationAccountId: 'alice',
    actionTags: {
      type: 'deposit'
    }
  })
  builder.issue({
    flavorId: 'eth',
    amount: 50,
    destinationAccountId: 'bob',
    actionTags: {
      type: 'deposit'
    }
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.transact do |builder|
  builder.issue(
    flavor_id: 'usd',
    amount: 100000,
    destination_account_id: 'alice',
    action_tags: {
      type: 'deposit',
      system: 'ach',
      ach_transaction_id: '11111'
    }
  )
  builder.issue(
    flavor_id: 'btc',
    amount: 5,
    destination_account_id: 'alice',
    action_tags: {
      type: 'deposit'
    }
  )
  builder.issue(
    flavor_id: 'eth',
    amount: 50,
    destination_account_id: 'bob',
    action_tags: {
      type: 'deposit'
    }
  )
end
```

</TabItem>
</Tabs>

Because this transaction issues tokens of the USD flavor, it must be signed by the `treasury` key. This is handled automatically by the `transact` SDK method.

#### Buy Crypto Assets with Fiat Currency
When a user purchases a crypto asset using a fiat currency, we model the purchase as an atomic transaction with two actions:

1. **Transfer** - purchase price from the buyer to the seller
2. **Transfer** - purchased crypto asset from the seller to the buyer

In this example, we assume that Alice buys 1 ETH from Bob for $500.00.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(50000)
    .setSourceAccountId("alice")
    .setDestinationAccountId("bob")
    .addActionTagsField("type", "crypto_for_fiat")
    .addActionTagsField("tx_id", "1234")
  ).addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("eth")
    .setAmount(1)
    .setSourceAccountId("bob")
    .setDestinationAccountId("alice")
    .addActionTagsField("type", "crypto_for_fiat")
    .addActionTagsField("tx_id", "1234")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.transfer({
    flavorId: 'usd',
    amount: 50000,
    sourceAccountId: 'alice',
    destinationAccountId: 'bob',
    actionTags: {
      type: 'crypto_for_fiat',
      tx_id: '1234'
    }
  })
  builder.transfer({
    flavorId: 'eth',
    amount: 1,
    sourceAccountId: 'bob',
    destinationAccountId: 'alice',
    actionTags: {
      type: 'crypto_for_fiat',
      tx_id: '1234'
    }
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.transact do |builder|
  builder.transfer(
    flavor_id: 'usd',
    amount: 50000,
    source_account_id: 'alice',
    destination_account_id: 'bob',
    action_tags: {
      type: 'crypto_for_fiat',
      tx_id: '1234'
    }
  )
  builder.transfer(
    flavor_id: 'eth',
    amount: 1,
    source_account_id: 'bob',
    destination_account_id: 'alice',
    action_tags: {
      type: 'crypto_for_fiat',
      tx_id: '1234'
    }
  )
end
```

</TabItem>
</Tabs>


#### Settle Trade Match
When two users match on a trade of crypto assets, the transaction is similar to the previous one, except in this case both actions will involve crypto assets.

1. **Transfer** - trade amount of first crypto asset from the first user to the second user
2. **Transfer** - trade amount of second crypto asset from the second user to the first user

The exchange rate would be determined by the company before the transaction is submitted to the ledger.

In this example, we assume that Alice transfers 1 BTC to Bob in exchange for 15 ETH.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("btc")
    .setAmount(1)
    .setSourceAccountId("alice")
    .setDestinationAccountId("bob")
    .addActionTagsField("type", "exchange")
    .addActionTagsField("subtype", "crypto_exchange")
  ).addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("eth")
    .setAmount(16)
    .setSourceAccountId("bob")
    .setDestinationAccountId("alice")
    .addActionTagsField("type", "exchange")
    .addActionTagsField("subtype", "crypto_exchange")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.transfer({
    flavorId: 'btc',
    amount: 1,
    sourceAccountId: 'alice',
    destinationAccountId: 'bob',
    actionTags: {
      type: 'crypto_exchange',
      tx_id: '5678'
    }
  })
  builder.transfer({
    flavorId: 'eth',
    amount: 15,
    sourceAccountId: 'bob',
    destinationAccountId: 'alice',
    actionTags: {
      type: 'crypto_exchange',
      tx_id: '5678'
    }
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.transact do |builder|
  builder.transfer(
    flavor_id: 'btc',
    amount: 1,
    source_account_id: 'alice',
    destination_account_id: 'bob',
    action_tags: {
      type: 'crypto_exchange',
      tx_id: '5678'
    }
  )
  builder.transfer(
    flavor_id: 'eth',
    amount: 15,
    source_account_id: 'bob',
    destination_account_id: 'alice',
    action_tags: {
      type: 'crypto_exchange',
      tx_id: '5678'
    }
  )
end
```

</TabItem>
</Tabs>

#### External Sale
If a user sells a crypto asset to a party that is not a user of the exchange, instead of transferring tokens in the ledger we will retire the crypto asset being sold (because it will no longer be under the control of the exchange) and issue the amounts that the user is receiving in return (because those amounts are coming in from outside of the exchange).

1. **Retire** - the amount of the crypto asset being sold from the user's account
2. **Issue** - the amount of crypto asset or fiat currency received by the user to that user's account

We can use action tags to record details about the transaction, such as a transaction id or information about any incoming wire.

For this example, assume Bob sells 1 BTC to an external purchaser for $9,000.00.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("btc")
    .setAmount(1)
    .setSourceAccountId("bob")
    .addActionTagsField("type", "external_sale")
  ).addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("usd")
    .setAmount(900000)
    .setDestinationAccountId("bob")
    .addActionTagsField("type", "external_sale")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.retire({
    flavorId: 'btc',
    amount: 1,
    sourceAccountId: 'bob',
    actionTags: {
      type: 'external_sale'
    }
  })
  builder.issue({
    flavorId: 'usd',
    amount: 900000,
    destinationAccountId: 'bob',
    actionTags: {
      type: 'external_sale'
    }
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.transact do |builder|
  builder.retire(
    flavor_id: 'btc',
    amount: 1,
    source_account_id: 'bob',
    action_tags: {
      type: 'external_sale'
    }
  )
  builder.issue(
    flavor_id: 'usd',
    amount: 900000,
    destination_account_id: 'bob',
    action_tags: {
      type: 'external_sale'
    }
  )
end
```

</TabItem>
</Tabs>

#### Withdraw
When a user withdraws fiat currency, the company takes a 1% fee and remits the remainder to the user. We model this as a single atomic transaction with two actions:

1. **Retire** - the fee amount of the currency asset from the user's account to the company account
2. **Retire** - the remaining amount of the currency asset from the user's account

We can use action tags to record details about the withdrawal, such as the withdrawal method and associated transaction ID in that external system. Note that we do two retire actions instead of a single one for the full amount so that we can query for fee amounts in the future. See the Queries section for an example of this query.

For this example, we'll assume that Alice withdraws $200.00 via ACH.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("usd")
    .setAmount(200)
    .setSourceAccountId("alice")
    .addActionTagsField("type", "withdrawal_fee")
  ).addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("usd")
    .setAmount(19800)
    .setSourceAccountId("alice")
    .addActionTagsField("type", "withdrawal")
    .addActionTagsField("system", "ACH")
    .addActionTagsField("ach_transaction_id", "22222")
    ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.retire({
    flavorId: 'usd',
    amount: 200,
    sourceAccountId: 'alice',
    actionTags: {
      type: 'withdrawal_fee'
    }
  })
  builder.retire({
    flavorId: 'usd',
    amount: 19800,
    sourceAccountId: 'alice',
    actionTags: {
      type: 'withdrawal',
      system: 'ach',
      ach_transaction_id: '22222'
    }
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.transact do |builder|
  builder.retire(
    flavor_id: 'usd',
    amount: 200,
    source_account_id: 'alice',
    action_tags: {
      type: 'withdrawal_fee'
    }
  )
  builder.retire(
    flavor_id: 'usd',
    amount: 19800,
    source_account_id: 'alice',
    action_tags: {
      type: 'withdrawal',
      system: 'ach',
      ach_transaction_id: '22222'
    }
  )
end
```

</TabItem>
</Tabs>

Since this transaction retires from a user account, it must be signed by the `exchange` key. This is handled automatically by the `transact` SDK method.

Note that instead of retiring the amount corresponding to the company fee, we could have transferred it to a company account. That design, however, would result in those tokens for the company fee sitting in the company account indefinitely. In general, you should only use tokens for amounts that will be needed later. In other words, you should use balances of tokens for *current state*, and query actions for *historical state*. With our design, we can still determine the total amount of fees collected by querying actions with the type of `withdrawal_fee`.

### Queries
Now that we have created several transactions, we can query the ledger in various ways.

#### User Balances
If we want to know the the balances in every account, we perform a sum tokens query with no filter (so we count every token) and group the results by flavor id.

For example, let's list the balances in Alice's account.

<Tabs>
<TabItem value='java' label='Java'>

```java
TokenSum.ItemIterable balances = new Token.SumBuilder()
  .addGroupByField("accountId")
  .addGroupByField("flavorId")
  .getIterable(ledger);

for (Balance balance : balances) {
  System.out.println("account: " + balance.accountId);
  System.out.println("amount: " + balance.amount );
  System.out.println("flavor: " + balance.flavorId);
  System.out.println("");
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
var page1 = ledger.tokens.sum({
  groupBy: ['accountId', 'flavorId']
}).page()

page1.items.forEach(balance => {
  console.log('account: ' + balance.accountId)
  console.log('amount: ' + balance.amount)
  console.log('flavor: ' + balance.flavorId)
  console.log('')
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.tokens.sum(
  # filter: 'account_id=$1',
  # filter_params: ['alice'],
  group_by: ['account_id', 'flavor_id']
).each do |balance|
  puts 'account: ' + balance.account_id
  puts 'amount: ' + balance.amount.to_s
  puts 'flavor: ' + balance.flavor_id
  puts ''
end
```

</TabItem>
</Tabs>

which will output:

```
account: alice
amount: 16
flavor: eth

(etc.)
```

#### Crypto Asset Totals
If we want to know the total amount of each crypto asset on the exchange across all accounts, we perform a sum tokens query, filtering to the `crypto_asset` type in flavor tags and grouping the results by flavor id.

<Tabs>
<TabItem value='java' label='Java'>

```java
TokenSum.ItemIterable balances = new Token.SumBuilder()
  .setFilter("FlavorTags.type=$1")
  .addFilterParameter("crypto_asset")
  .addGroupByField("flavorId")
  .getIterable(ledger);

for (Balance balance : balances) {
  System.out.println("amount: " + balance.amount);
  System.out.println("flavor: " + balance.flavorId);
  System.out.println("");
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
page1 = ledger.tokens.sum({
  filter: 'flavorTags.type=$1',
  filterParams: ['crypto_asset'],
  groupBy: ['flavorId']
}).page()

page1.items.forEach(balance => {
  console.log('amount: ' + balance.amount)
  console.log('flavor: ' + balance.flavorId)
  console.log('')
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.tokens.sum(
  filter: 'flavor_tags.type=$1',
  filter_params: ['crypto_asset'],
  group_by: ['flavor_id']
).each do |balance|
  puts 'amount: ' + balance.amount.to_s
  puts 'flavor: ' + balance.flavor_id
  puts ''
end
```

</TabItem>
</Tabs>

which will output:

```
amount: 100
flavor: usd
```

#### Total Fees
If we want to know the total fees that have been collected, we perform a sum actions query, filtering to actions with the `withdrawal_fee` type in action tags.

<Tabs>
<TabItem value='java' label='Java'>

```java
ActionSum.ItemIterable sums = new Action.SumBuilder()
  .setFilter("Tags.type")
  .addFilterParameter("withdrawal_fee")
  .getIterable(ledger);

for (ActionSum sum : sums) {
  System.out.println("total fees: " + sum.amount);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
page1 = ledger.actions.sum({
  filter: 'tags.type=$1',
  filterParams: ['withdrawal_fee']
}).page()

page1.items.forEach(sum => {
  console.log('total fees: ' + sum.amount)
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.actions.sum(
  filter: 'tags.type=$1',
  filter_params: ['withdrawal_fee']
).each do |sum|
  puts 'total fees: ' + sum.amount.to_s
end
```

</TabItem>
</Tabs>

#### User Activity
If we want to retrieve historical transactions, we use the list transactions query. We can specify the number of transactions we want to retrieve at a time by setting a page size. If we only care about transactions on a specific account, we can filter to those that have an action with that account as the source or destination by using `actions()` in a filter.

The below will return the 10 most recent transactions that involved Alice's account.

<Tabs>
<TabItem value='java' label='Java'>

```java
Transaction.Page txs = new Transaction.ListBuilder()
  .setFilter("actions(SourceAccountId=$1 OR DestinationAccountId=$1)")
  .addFilterParameter("alice")
  .setPageSize(10)
  .getPage(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
page1 = ledger.transactions.list({
  filter: 'actions(sourceAccountId=$1 OR destinationAccountId=$1)',
  filterParams: ['alice']
}).page({size: 10})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.transactions.list(
  filter: 'actions(source_account_id=$1 OR destination_account_id=$1)',
  filter_params: ['alice']
).page(size: 10)
```

</TabItem>
</Tabs>

If we only cared about the specific actions involving the account (as opposed to the entire transaction), we could use the list actions query instead. This will return Action objects, whereas the above query will return Transaction objects.

<Tabs>
<TabItem value='java' label='Java'>

```java
Action.Page txs = new Action.ListBuilder()
  .setFilter("SourceAccountId=$1 OR DestinationAccountId=$1")
  .addFilterParameter("alice")
  .setPageSize(10)
  .getPage(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
page1 = ledger.actions.list({
  filter: 'sourceAccountId=$1 OR destinationAccountId=$1',
  filterParams: ['alice']
}).page({size: 10})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.actions.list(
  filter: 'source_account_id=$1 OR destination_account_id=$1',
  filter_params: ['alice']
).page(size: 10)
```

</TabItem>
</Tabs>
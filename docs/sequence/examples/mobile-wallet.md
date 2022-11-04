---
title: Mobile Wallet
id: mobile-wallet
sidebar_position: 1
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Mobile wallets, reward wallets, and other types of wallet applications are easy to build on top of Sequence.
These applications tend to have a few things in common &mdash; consumers accumulate balances (which they use to pay other consumers or checkout at merchants), the company offering the wallet often provides a currency exchange function, and consumers and merchants periodically withdraw currencies from their accounts.

In this guide, we explore how to build a mobile wallet application on top of Sequence.

- [Overview](#overview)
- [Setup](#setup)
  - [Keys](#keys)
  - [Flavors](#flavors)
  - [Accounts](#accounts)
- [Transaction Types](#transaction-types)
  - [Deposit](#deposit)
  - [P2P Payment (consumer-to-consumer)](#p2p-payment-consumer-to-consumer)
  - [Merchant Payment](#merchant-payment)
  - [Merchant FX (foreign exchange) Payment](#merchant-fx-foreign-exchange-payment)
  - [Withdrawal](#withdrawal)
- [Queries](#queries)
  - [Balances in an Account](#balances-in-an-account)
  - [Total Amount of Tokens in the Ledger](#total-amount-of-tokens-in-the-ledger)
  - [Amount of USD in Each Type of Account](#amount-of-usd-in-each-type-of-account)
  - [Total Fees](#total-fees)
  - [Recent Actions in an Account](#recent-actions-in-an-account)

### Overview
In our example mobile wallet system, there are two types of users: consumers and merchants. These will each be represented as **accounts** in the ledger.

There are two currencies, USD and EUR, as well as loyalty points. These will each be represented as **flavors** in the ledger. (This can be extended to any number of different currencies.)

Currencies can be deposited by consumers, transferred between consumers, paid to merchants by consumers, and withdrawn by merchants and consumers. Additionally, loyalty points are earned by consumers when making purchases at merchants. All of these interactions will be represented as **transactions** in Sequence.

### Setup
To set up our ledger, we will create several keys, flavors, and accounts.

#### Keys
Authority to create transactions in the ledger is assigned to four distinct systems:

1. **Treasury** - responsible for processing deposits and withdrawals, collecting fees from merchants, and performing currency exchange
2. **Consumer** - responsible for managing withdrawals and transfers from consumer accounts
3. **Merchant** - responsible for managing withdrawals from merchant accounts
4. **Loyalty** - responsible for distributing loyalty points

Each system will have a key that will be used to perform its actions in the ledger. To create those keys, we run the following:

<Tabs>
<TabItem value='java' label='Java'>

```java
new Key.Builder()
  .setId("treasury")
  .create(ledger);

new Key.Builder()
  .setId("consumer")
  .create(ledger);

new Key.Builder()
  .setId("merchant")
  .create(ledger);

new Key.Builder()
  .setId("loyalty")
  .create(ledger);
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
ledger.keys.create({id: 'treasury'})
ledger.keys.create({id: 'consumer'})
ledger.keys.create({id: 'merchant'})
ledger.keys.create({id: 'loyalty'})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.keys.create(id: 'treasury')
ledger.keys.create(id: 'consumer')
ledger.keys.create(id: 'merchant')
ledger.keys.create(id: 'loyalty')
```

</TabItem>
</Tabs>

#### Flavors
Flavors represent the different types of balances in merchant and consumer accounts. Our ledger will have flavors for USD, EUR, and points.

First, we create the currency flavors using the `treasury` key:

<Tabs>
<TabItem value='java' label='Java'>

```java
new Flavor.Builder()
  .setId("usd")
  .addKeyId("treasury")
  .create(ledger);

new Flavor.Builder()
  .setId("eur")
  .addKeyId("treasury")
  .create(ledger);
```

</TabItem>
<TabItem value='js' label='Node.js'>

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
```

</TabItem>
</Tabs>

Next, we create the points flavor using the `loyalty` key:

<Tabs>
<TabItem value='java' label='Java'>

```java
new Flavor.Builder()
  .setId("points")
  .addKeyId("loyalty")
  .create(ledger);
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
ledger.flavors.create({
  id: 'points',
  keyIds: ['loyalty']
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.flavors.create(
  id: 'points',
  key_ids: ['loyalty']
)
```

</TabItem>
</Tabs>

#### Accounts
For each user or merchant that signs up for the wallet application, we will need an account in the ledger. Although these accounts would actually be created by the wallet application in real-time, for this example we'll assume we have two consumers and two merchants and create them as part of the setup. We also need the company account where we will collect fees.

We will use **tags** to differentiate between the types of accounts.

First, we create the consumer accounts using the `consumer` key:

<Tabs>
<TabItem value='java' label='Java'>

```java
new Account.Builder()
  .setId("alice")
  .addKeyId("consumer")
  .addTag("type", "consumer")
  .create(ledger);

new Account.Builder()
  .setId("bob")
  .addKeyId("consumer")
  .addTag("type", "consumer")
  .create(ledger);
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
ledger.accounts.create({
  id: 'alice',
  keyIds: ['consumer'],
  tags: {type: 'consumer'}
})

ledger.accounts.create({
  id: 'bob',
  keyIds: ['consumer'],
  tags: {type: 'consumer'}
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.accounts.create(
  id: 'alice',
  key_ids: ['consumer'],
  tags: {type: 'consumer'}
)

ledger.accounts.create(
  id: 'bob',
  key_ids: ['consumer'],
  tags: {type: 'consumer'}
)
```

</TabItem>
</Tabs>

Next, we create the merchant accounts using the `merchant` key:

<Tabs>
<TabItem value='java' label='Java'>

```java
new Account.Builder()
  .setId("merchant1")
  .addKeyId("merchant")
  .addTag("type", "merchant")
  .create(ledger);

new Account.Builder()
  .setId("merchant2")
  .addKeyId("merchant")
  .addTag("type", "merchant")
  .create(ledger);
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
ledger.accounts.create({
  id: 'merchant1',
  keyIds: ['merchant'],
  tags: {type: 'merchant'}
})

ledger.accounts.create({
  id: 'merchant2',
  keyIds: ['merchant'],
  tags: {type: 'merchant'}
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.accounts.create(
  id: 'merchant1',
  key_ids: ['merchant'],
  tags: {type: 'merchant'}
)

ledger.accounts.create(
  id: 'merchant2',
  key_ids: ['merchant'],
  tags: {type: 'merchant'}
)
```

</TabItem>
</Tabs>

Finally, we create the company account using the `treasury` key:

<Tabs>
<TabItem value='java' label='Java'>

```java
new Account.Builder()
  .setId("company")
  .addKeyId("treasury")
  .addTag("type", "company")
  .create(ledger);
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
ledger.accounts.create({
  id: 'company',
  keyIds: ['treasury'],
  tags: {type: 'company'}
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.accounts.create(
  id: 'company',
  key_ids: ['treasury'],
  tags: {type: 'company'}
)
```

</TabItem>
</Tabs>

### Transaction Types
Now that we have created our assets and accounts, we can model the different types of transactions.

#### Deposit
When a consumer deposits money, we create a transaction containing an **issue action** to issue the amount of the deposited currency into their account. This will create a number of **tokens** of the corresponding flavor and put them in the account.

We can use **action tags** to record details about the deposit, such as the deposit method and associated transaction ID in an external system.

For this example, we assume that Alice deposits $100.00 via ACH. Note that the amount of issuance is 10000, because the fundamental unit of the USD flavor is a cent.

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
  ).transact(ledger);
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.issue({
    flavorId: 'usd',
    amount: 10000,
    destinationAccountId: 'alice',
    actionTags: {
      type: 'deposit',
      system: 'ach',
      ach_transaction_id: '11111'
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
    amount: 10000,
    destination_account_id: 'alice',
    action_tags: {
      type: 'deposit',
      system: 'ach',
      ach_transaction_id: '11111'
    }
  )
end
```

</TabItem>
</Tabs>

Since this transaction issues USD tokens, it must be signed by the `treasury` key. This is handled automatically by the `transact` SDK method (because we associated that key with the USD flavor).

#### P2P Payment (consumer-to-consumer)
When a consumer transfers money to another consumer, we create a transaction containing a **transfer action** to transfer the amount of the requested currency from the sender to the recipient.

We can use action tags to record the reason for the transfer.

For this example, we assume that Alice transfers $25.50 to Bob.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(2550)
    .setSourceAccountId("alice")
    .setDestinationAccountId("bob")
    .addActionTagsField("type", "p2p_payment")
  ).transact(ledger);
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.transfer({
    flavorId: 'usd',
    amount: 2550,
    sourceAccountId: 'alice',
    destinationAccountId: 'bob',
    actionTags: {type: 'p2p_payment'}
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.transact do |builder|
  builder.transfer(
    flavor_id: 'usd',
    amount: 2550,
    source_account_id: 'alice',
    destination_account_id: 'bob',
    action_tags: {type: 'p2p_payment'}
  )
end
```

</TabItem>
</Tabs>

Because this transaction transfers from Alice's account, it must be signed by the `consumer` key. This is handled automatically by the `transact` SDK method.

#### Merchant Payment
When a consumer pays a merchant, the company keeps a portion as a fee, and the consumer accrues loyalty points.

We model this as a single atomic transaction with three actions:

* **Transfer** - payment amount of currency from consumer to merchant
* **Transfer** - fee amount of currency from merchant to company
* **Issue** - amount of loyalty points earned to consumer

For this example, we will assume a $10 payment from Alice to Merchant 1, with a fee rate of 2%, and a loyalty point earning rate of 1 point per cent spent.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(1000)
    .setSourceAccountId("alice")
    .setDestinationAccountId("merchant1")
    .addActionTagsField("type", "merchant_payment")
  ).addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("usd")
    .setAmount(20)
    .setSourceAccountId("merchant1")
    .addActionTagsField("type", "company_fee")
  ).addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("points")
    .setAmount(1000)
    .setDestinationAccountId("alice")
    .addActionTagsField("type", "points_earned")
  ).transact(ledger);
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.transfer({
    flavorId: 'usd',
    amount: 1000,
    sourceAccountId: 'alice',
    destinationAccountId: 'merchant1',
    actionTags: {type: 'merchant_payment'}
  })
  builder.retire({
    flavorId: 'usd',
    amount: 20,
    sourceAccountId: 'merchant1',
    actionTags: {type: 'company_fee'}
  })
  builder.issue({
    flavorId: 'points',
    amount: 1000,
    destinationAccountId: 'alice',
    actionTags: {type: 'points_earned'}
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.transact do |builder|
  builder.transfer(
    flavor_id: 'usd',
    amount: 1000,
    source_account_id: 'alice',
    destination_account_id: 'merchant1',
    action_tags: {type: 'merchant_payment'}
  )
  builder.retire(
    flavor_id: 'usd',
    amount: 20,
    source_account_id: 'merchant1',
    action_tags: {type: 'company_fee'}
  )
  builder.issue(
    flavor_id: 'points',
    amount: 1000,
    destination_account_id: 'alice',
    action_tags: {type: 'points_earned'}
  )
end
```

</TabItem>
</Tabs>

Because this transaction transfers from Alice's account, transfers from Merchant 1's account, and issues points, it must be signed by the `consumer` key, the `merchant` key, and the `loyalty` key. This is handled automatically by the `transact` SDK method.

Note that instead of retiring the amount corresponding to the company fee, we could have transferred it to a company account. That design, however, would result in those tokens for the company fee sitting in the company account indefinitely. In general, you should only use tokens for amounts that will be needed later. In other words, you should use balances of tokens for *current state*, and query actions for *historical state*. With our design, we can still determine the total amount of fees collected by querying actions with the type of `company_fee`. See the Queries section for an example of this query.

#### Merchant FX (foreign exchange) Payment
If a user holds one currency, but a merchant accepts a different currency, we need to have a process by which currency is exchanged. To facilitate this, the company will act as a currency exchange within the transaction.

We model this currency exchange as a single atomic transaction with two actions:

* **Transfer** - payment amount of consumer currency from consumer to company
* **Transfer** - converted amount (based on company fx rate) of merchant currency from company to merchant

The currency exchange rate would be determined by the company at the time of transaction, and the consumer would be presented with the amount of their currency required to pay the amount of the merchant's currency.

Once the currency is exchanged, we finish the transaction the same way as the previous example.

* **Transfer** - fee amount of merchant's currency from merchant to company
* **Issue** - amount of loyalty points earned to consumer

In this example, we assume that Alice needs to pay 20.00 EUR to Merchant 2, which the company can provide for 26.50 USD. Additionally, the company will take a fee of 0.40 EUR as a fee from Merchant 2 (2% of the payment amount in EUR) and Alice will earn 1 loyalty point per cent spent in USD.

The company will need to have enough EUR in it's account to facilitate the payment, so we first issue some EUR to the company account.


<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("eur")
    .setAmount(50000)
    .setDestinationAccountId("company")
    .addActionTagsField("type", "fx_deposit")
  ).transact(ledger);
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.issue({
    flavorId: 'eur',
    amount: 50000,
    destinationAccountId: 'company',
    actionTags: {type: 'fx_deposit'}
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.transact do |builder|
  builder.issue(
    flavor_id: 'eur',
    amount: 50000,
    destination_account_id: 'company',
    action_tags: {type: 'fx_deposit'}
  )
end
```

</TabItem>
</Tabs>

Now that the company account has enough EUR, we can proceed with our FX payment.


<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(2650)
    .setSourceAccountId("alice")
    .setDestinationAccountId("company")
    .addActionTagsField("type", "merchant_payment")
    .addActionTagsField("sub_type", "fx_payment")
  ).addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("eur")
    .setAmount(2000)
    .setSourceAccountId("company")
    .setDestinationAccountId("merchant2")
    .addActionTagsField("type", "fx_payment")
  ).addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("eur")
    .setAmount(40)
    .setSourceAccountId("merchant2")
    .addActionTagsField("type", "company_fee")
  ).addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("points")
    .setAmount(2650)
    .setDestinationAccountId("alice")
    .addActionTagsField("type", "points_earned")
  ).transact(ledger);
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.transfer({
    flavorId: 'usd',
    amount: 2650,
    sourceAccountId: 'alice',
    destinationAccountId: 'company',
    actionTags: {
      type: 'merchant_payment',
      sub_type: 'fx_payment'
    }
  })
  builder.transfer({
    flavorId: 'eur',
    amount: 2000,
    sourceAccountId: 'company',
    destinationAccountId: 'merchant2',
    actionTags: {type: 'fx_payment'}
  })
  builder.retire({
    flavorId: 'eur',
    amount: 40,
    sourceAccountId: 'merchant2',
    actionTags: {type: 'company_fee'}
  })
  builder.issue({
    flavorId: 'points',
    amount: 2000,
    destinationAccountId: 'alice',
    actionTags: {type: 'points_earned'}
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.transact do |builder|
  builder.transfer(
    flavor_id: 'usd',
    amount: 2650,
    source_account_id: 'alice',
    destination_account_id: 'company',
    action_tags: {
      type: 'merchant_payment',
      sub_type: 'fx_payment'
    }
  )
  builder.transfer(
    flavor_id: 'eur',
    amount: 2000,
    source_account_id: 'company',
    destination_account_id: 'merchant2',
    action_tags: {type: 'fx_payment'}
  )
  builder.retire(
    flavor_id: 'eur',
    amount: 40,
    source_account_id: 'merchant2',
    action_tags: {type: 'company_fee'}
  )
  builder.issue(
    flavor_id: 'points',
    amount: 2000,
    destination_account_id: 'alice',
    action_tags: {type: 'points_earned'}
  )
end
```

</TabItem>
</Tabs>

Since this transaction transfers from Alice's account, transfers from the company account, transfers from Merchant 2's account, and issues points, it must be signed by the `consumer` key, the `treasury` key, the `merchant` key, and the `loyalty` key. This is handled automatically by the `transact` SDK method.

#### Withdrawal
When a consumer or merchant withdraws money, we create a transaction containing a retire action to retire the withdrawal amount of the currency asset from their account.

We can use action tags to record details about the withdrawal, such as the withdrawal method and associated transaction ID in an external system.

For this example, we'll assume that Merchant1 withdraws $5 via ACH.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("usd")
    .setAmount(500)
    .setSourceAccountId("merchant1")
    .addActionTagsField("type", "withdrawal")
    .addActionTagsField("system", "ach")
    .addActionTagsField("ach_transaction_id", "22222")
  ).transact(ledger);
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.retire({
    flavorId: 'usd',
    amount: 500,
    sourceAccountId: 'merchant1',
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
    amount: 500,
    source_account_id: 'merchant1',
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

Since this transaction retires from a merchant account, it must be signed by the `merchant` key. This is handled automatically by the `transact` SDK method.

### Queries
Now that we have created several transactions, we can query the ledger in various ways.

#### Balances in an Account
If we want to know the balances of different flavors in an account, we perform a **sum tokens query**, filtering to the account id and summing the results by flavor id.

For example, let's list the balances in Alice's account.

<Tabs>
<TabItem value='java' label='Java'>

```java
TokenSum.ItemIterable sums = new Token.SumBuilder()
  .setFilter("AccountId=$1")
  .addFilterParameter("alice")
  .addGroupByField("flavorId")
  .getIterable(ledger);

for (TokenSum sum : sums) {
  System.out.println("amount: " + sum.amount );
  System.out.println("Flavor: " + sum.flavorId);
  System.out.println("");
}
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
var page1 = ledger.tokens.sum({
  filter: 'accountId=$1',
  filterParams: ['alice'],
  groupBy: ['flavorId']
}).page()

page1.items.forEach(sum => {
  console.log('amount: ' + sum.amount)
  console.log('flavor: ' + sum.flavorId)
  console.log('')
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.tokens.sum(
  filter: 'account_id=$1',
  filter_params: ['alice'],
  group_by: ['flavor_id']
).each do |sum|
  puts 'amount: ' + sum.amount.to_s
  puts 'flavor: ' + sum.flavor_id
  puts ''
end
```

</TabItem>
</Tabs>

which will output:

```
amount: x
flavor: usd

amount: y
flavor: points
```

#### Total Amount of Tokens in the Ledger
If we want to know the total amount of each flavor in the ledger across all accounts (merchants, consumers, and company), we perform a sum tokens query (with no filter) and group by flavor id.

<Tabs>
<TabItem value='java' label='Java'>

```java
sums = new Token.SumBuilder()
  .addGroupByField("flavorId")
  .getIterable(ledger);

for (TokenSum sum : sums) {
  System.out.println("amount: " + sum.amount);
  System.out.println("Flavor: " + sum.flavorId);
  System.out.println("");
}
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
page1 = ledger.tokens.sum({
  groupBy: ['flavorId']
}).page()

page1.items.forEach(sum => {
  console.log('amount: ' + sum.amount)
  console.log('flavor: ' + sum.flavorId)
  console.log('')
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.tokens.sum(
  group_by: ['flavor_id']
).each do |sum|
  puts 'amount: ' + sum.amount.to_s
  puts 'flavor: ' + sum.flavor_id
  puts ''
end
```

</TabItem>
</Tabs>

which will output:

```
amount: 100
asset: usd
```

#### Amount of USD in Each Type of Account
If we want to know the amount of USD in each type of account (merchants, consumers, and company), we perform a sum tokens query, filtering to the USD flavor and group the results by `type` account tag.

<Tabs>
<TabItem value='java' label='Java'>

```java
TokenSum.ItemIterable sums = new Token.SumBuilder()
  .setFilter("FlavorId=$1")
  .addFilterParameter("usd")
  .addGroupByField("accountTags.type")
  .getIterable(ledger);

for (TokenSum sum : sums) {
  System.out.println("amount: " + sum.amount);
  System.out.println("account type: " + sum.accountTags.get("type"));
  System.out.println("");
}
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
page1 = ledger.tokens.sum({
  filter: 'flavorId=$1',
  filterParams: ['usd'],
  groupBy: ['accountTags.type']
}).page()

page1.items.forEach(sum => {
  console.log('amount: ' + sum.amount)
  console.log('account type: ' + sum.accountTags.type)
  console.log('')
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.tokens.sum(
  filter: 'flavor_id=$1',
  filter_params: ['usd'],
  group_by: ['account_tags.type']
).each do |sum|
  puts 'amount: ' + sum.amount.to_s
  puts 'account type: ' + sum.account_tags['type']
  puts ''
end
```

</TabItem>
</Tabs>

which will output:

```
amount: x
account type: consumer

amount: y
account type: merchant

amount: z
account type: company
```

#### Total Fees
If we want to know the total fees that have been collected, we perform a sum actions query, filtering to actions with the `company_fee` type in tags.

<Tabs>
<TabItem value='java' label='Java'>

```java
ActionSum.ItemIterable sums = new Action.SumBuilder()
  .setFilter("Tags.type")
  .addFilterParameter("company_fee")
  .getIterable(ledger);

for (ActionSum sum : sums) {
  System.out.println("total fees: " + sum.amount);
  System.out.println("");
}
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
page1 = ledger.actions.sum({
  filter: 'tags.type=$1',
  filterParams: ['company_fee']
}).page()

page1.items.forEach(sum => {
  console.log('total fees: ' + sum.amount)
  console.log('')
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.actions.sum(
  filter: 'tags.type=$1',
  filter_params: ['company_fee']
).each do |sum|
  puts 'total fees: ' + sum.amount.to_s
  puts ''
end
```

</TabItem>
</Tabs>

which will output:
```
total fees: ...
```

#### Recent Actions in an Account
If we want to display the latest actions for a specific account, we perform a list actions query, filtering to actions in which the account was the source or destination.

Let's query for actions that involved Alice's account and display the type of action by accessing the `type` field in the action tags. Note that we can set the page size to control how many actions are returned (e.g., receive the 10 most recent).

<Tabs>
<TabItem value='java' label='Java'>

```java
Action.Page actions = new Action.ListBuilder()
  .setFilter("SourceAccountId=$1 OR DestinationAccountId=$2")
  .addFilterParameter("alice")
  .addFilterParameter("alice")
  .setPageSize(10)
  .getPage(ledger);

for (Action action : actions.items) {
  String source = "n/a";
  String destination = "n/a";
  if (action.sourceAccountId != null) {
    source = action.sourceAccountId;
  }
  if (action.destinationAccountId != null) {
    destination = action.destinationAccountId;
  }

  System.out.println("type: " + action.tags.get("type"));
  System.out.println("flavor: " + action.flavorId);
  System.out.println("amount: " + action.amount);
  System.out.println("from: " + source);
  System.out.println("to: " + destination);
  System.out.println("");
}
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
page1 = ledger.actions.list({
  filter: 'sourceAccountId=$1 OR destinationAccountId=$1',
  filterParams: ['alice']
}).page({size: 10})

page1.items.forEach(action => {
  const source = action.sourceAccountId ? action.sourceAccountId : 'n/a'
  const destination = action.destinationAccountId ? action.destinationAccountId : 'n/a'

  console.log('type: ' + action.tags.type)
  console.log('flavor: ' + action.flavorId)
  console.log('amount: ' + action.amount)
  console.log('from: ' + source)
  console.log('to: ' + destination)
  console.log('')
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.actions.list(
  filter: 'source_account_id=$1 OR destination_account_id=$1',
  filter_params: ['alice']
).page(size: 10)

page1.each do |action|
  source = 'n/a'
  destination = 'n/a'
  source = action.source_account_id if action.source_account_id
  destination = action.destination_account_id if action.destination_account_id

  puts 'type: ' + action.tags['type']
  puts 'asset: ' + action.flavor_id
  puts 'amount: ' + action.amount.to_s
  puts 'from: ' + source
  puts 'to: ' + destination
  puts ''
end
```

</TabItem>
</Tabs>

which will output:

```
type: merchant_payment
asset: usd
amount: ...
from: ...
to: ...

type: p2p_transfer
asset: eur
amount: ...
from: ...
to: ...
```
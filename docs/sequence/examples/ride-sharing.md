---
title: Ride-Sharing
id: ride-sharing
sidebar_position: 4
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Two-sided marketplace applications &mdash; such as ride-sharing or vacation rental apps &mdash; are easy to build on top of Sequence. These applications tend to have a few things in common — buyers pay providers, the company takes a cut, and the providers get paid out periodically.

In this guide, we explore how to build a ride-sharing application on top of Sequence.

- [Overview](#overview)
- [Setup](#setup)
  - [Keys](#keys)
  - [Flavors](#flavors)
  - [Accounts](#accounts)
- [Transaction Types](#transaction-types)
  - [Ride Payment](#ride-payment)
  - [Refund Rider](#refund-rider)
  - [Distribute Promotional Credits](#distribute-promotional-credits)
  - [Ride Payment - with credits](#ride-payment---with-credits)
  - [Payout Driver](#payout-driver)
- [Queries](#queries)
  - [Driver Balance](#driver-balance)
  - [Driver earning history](#driver-earning-history)
  - [Rider Credits Balances](#rider-credits-balances)
  - [Rider fare history](#rider-fare-history)

### Overview
There are two types of users: riders and drivers. These will each be represented as **accounts** in the ledger.

We will also create a platform processing account. Every time a user takes a ride, the amount of the fare will be transferred into the processing account and then divided between the driver and the company.

For each country or region in which the marketplace operates, we will represent fares, refunds, and promotional credits as **tokens** in the ledger, with a **flavor** for each type of balance. Each one of these will be denominated in a single currency. So, for example, if there were two different regions with distinct currencies, we would have two fare flavors, one for each currency.

### Setup
To set up our ledger, we will create several keys, flavors, and accounts.

#### Keys
Authority to create transactions in the ledger is assigned to two distinct systems:

1. **Operations** - responsible for processing ride payments, issuing refunds to users, paying out drivers, and collecting the company portion of the fares
2. **Promotions** - responsible for issuing promotional credit to users

Each system will have a key that will be used to perform its actions in the ledger. To create these keys, we run the following:

<Tabs>
<TabItem value='java' label='Java'>

```java
new Key.Builder()
  .setId("operations")
  .create(ledger);

new Key.Builder()
  .setId("promotions")
  .create(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.keys.create({id: 'operations'})
ledger.keys.create({id: 'promotions'})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.keys.create(id: 'operations')
ledger.keys.create(id: 'promotions')
```

</TabItem>
</Tabs>

#### Flavors
For each currency supported by the platform, the ledger will need two flavors. For this example, we will assume the platform only supports USD. Therefore, the two flavors will be:

* **usd** - represents amounts deposited or earned
* **promo_credit_usd** - promotional credit distributed to riders for future rides

We will use **tags** to record details like denomination currency and type (e.g., "promotional_credit") to make querying easier later.

We will create `usd` and `promo_credit_usd` with the `operations` key and `promotions` key, respectively:

<Tabs>
<TabItem value='java' label='Java'> 

```java
new Flavor.Builder()
  .setId("usd")
  .addKeyId("operations")
  .addTag("currency", "usd")
  .addTag("type", "cash")
  .create(ledger);

new Flavor.Builder()
  .setId("promo_credit_usd")
  .addKeyId("promotions")
  .addTag("currency", "usd")
  .addTag("type", "promotion")
  .create(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.flavors.create({
  id: 'usd',
  keyIds: ['operations'],
  tags: {
    currency: 'usd',
    type: 'cash'
  }
})

ledger.flavors.create({
  id: 'promo_credit_usd',
  keyIds: ['promotions'],
  tags: {
    currency: 'usd',
    type: 'promotion'
  }
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.flavors.create(
  id: 'usd',
  key_ids: ['operations'],
  tags: {
    currency: 'usd',
    type: 'cash'
  }
)

ledger.flavors.create(
  id: 'promo_credit_usd',
  key_ids: ['promotions'],
  tags: {
    currency: 'usd',
    type: 'promotion'
  }
)
```

</TabItem>
</Tabs>

#### Accounts
Each rider and driver will need an account in the ledger. Although these accounts would actually be created by the ride-sharing application in real-time, for this example we'll assume we have one rider and one driver, and we'll create their accounts as part of the setup.

We also need a processing account, which will process payments.

We will use **tags** to differentiate between the types of accounts.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Account.Builder()
  .setId("driver1")
  .addKeyId("operations")
  .addTag("type", "driver")
  .create(ledger);

new Account.Builder()
  .setId("rider1")
  .addKeyId("operations")
  .addTag("type", "rider")
  .create(ledger);

  new Account.Builder()
    .setId("processing")
    .addKeyId("operations")
    .addTag("type", "processing")
    .create(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.accounts.create({
  id: 'driver1',
  keyIds: ['operations'],
  tags: {type: 'driver'}
})

ledger.accounts.create({
  id: 'rider1',
  keyIds: ['operations'],
  tags: {type: 'rider'}
})

ledger.accounts.create({
  id: 'processing',
  keyIds: ['operations'],
  tags: {type: 'processing'}
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.accounts.create(
  id: 'driver1',
  key_ids: ['operations'],
  tags: {type: 'driver'}
)

ledger.accounts.create(
  id: 'rider1',
  key_ids: ['operations'],
  tags: {type: 'rider'}
)

ledger.accounts.create(
  id: 'processing',
  key_ids: ['operations'],
  tags: {type: 'processing'}
)
```

</TabItem>
</Tabs>

### Transaction Types
Now that we have created our flavors and accounts, we can model the different types of transactions.

#### Ride Payment
When a rider pays a ride with credit card, we create an atomic transaction containing four **actions**:

1. **Issue** - an amount of `usd` tokens equal to the total fare into the rider's account to represent the credit card charge
2. **Transfer** - the same amount of `usd` tokens from the rider's account to the processing account
3. **Transfer** - an amount of the `usd` tokens equal to the driver's portion from the processing account to the driver's account
4. **Retire** - the remaining `usd` tokens from the processing account for the company portion

We use **action tags** to record details about each action and distinguish between the different types.

For this example, assume that Rider1 pays a $20.00 fare for a ride with Driver1, and the company takes 10% of the fare ($2.00). Note that the amount of issuance is 2000, because the fundamental unit of the USD flavor is a cent.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("usd")
    .setAmount(2000)
    .setDestinationAccountId("rider1")
    .addActionTagsField("type", "credit_charge")
    .addActionTagsField("credit_charge_id", "123")
    .addActionTagsField("rider_profile", "personal")
  ).addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(2000)
    .setSourceAccountId("rider1")
    .setDestinationAccountId("processing")
    .addActionTagsField("type", "fare_payment")
  ).addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(1800)
    .setSourceAccountId("processing")
    .setDestinationAccountId("driver1")
    .addActionTagsField("type", "driver_fare_share")
  ).addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("usd")
    .setAmount(200)
    .setSourceAccountId("processing")
    .addActionTagsField("type", "company_fee")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.issue({
    flavorId: 'usd',
    amount: 2000,
    destinationAccountId: 'rider1',
    actionTags: {
      type: 'credit_charge',
      credit_chargeId: '123',
      rider_profile: 'personal'
    }
  })
  builder.transfer({
    flavorId: 'usd',
    amount: 2000,
    sourceAccountId: 'rider1',
    destinationAccountId: 'processing',
    actionTags: {type: 'fare_payment'}
  })
  builder.transfer({
    flavorId: 'usd',
    amount: 1800,
    sourceAccountId: 'processing',
    destinationAccountId: 'driver1',
    actionTags: {type: 'driver_fare_share'}
  })
  builder.retire({
    flavorId: 'usd',
    amount: 200,
    sourceAccountId: 'processing',
    actionTags: {type: 'company_fee'}
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.transact do |builder|
  builder.issue(
    flavor_id: 'usd',
    amount: 2000,
    destination_account_id: 'rider1',
    action_tags: {
      type: 'credit_charge',
      credit_charge_id: '123',
      rider_profile: 'personal'
    }
  )
  builder.transfer(
    flavor_id: 'usd',
    amount: 2000,
    source_account_id: 'rider1',
    destination_account_id: 'processing',
    action_tags: {type: 'fare_payment'}
  )
  builder.transfer(
    flavor_id: 'usd',
    amount: 1800,
    source_account_id: 'processing',
    destination_account_id: 'driver1',
    action_tags: {type: 'driver_fare_share'}
  )
  builder.retire(
    flavor_id: 'usd',
    amount: 200,
    source_account_id: 'processing',
    action_tags: {type: 'company_fee'}
  )
end
```

</TabItem>
</Tabs>

Since this transaction issues `usd` and transfers between accounts, it must be signed by the `operations` key. This is handled automatically by the `transact` SDK method.

#### Refund Rider
When the company refunds a rider, we create a transaction with a single action, issuing `usd` tokens into the rider's account.

We can use action tags to record the reason for the refund.

Assume that Rider1 is refunded $5.00 because the driver took a poor route, and the company covers the cost with no impact to the driver's portion of the previously collected fare.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("usd")
    .setAmount(500)
    .setDestinationAccountId("rider1")
    .addActionTagsField("type", "refund")
    .addActionTagsField("reason", "poor_route")
    .addActionTagsField("ride_id", "123")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.issue({
    flavorId: 'usd',
    amount: 500,
    destinationAccountId: 'rider1',
    actionTags: {
      type: 'refund',
      reason: 'poor_route',
      rideId: '123'
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
    amount: 500,
    destination_account_id: 'rider1',
    action_tags: {
      type: 'refund',
      reason: 'poor_route',
      ride_id: '123'
    }
  )
end
```

</TabItem>
</Tabs>

Because this transaction issues `usd`, it must be signed by the `operations` key. This is handled automatically by the `transact` SDK method.

#### Distribute Promotional Credits
When the company decides to issue promotional credits to a rider, we create a **transaction** with a single **action**, issuing the promotional USD flavor into the rider's account.

Assume that Rider1 is distributed $3.00 worth of promotional credits because they referred a friend.

<Tabs>
<TabItem value='java' label='Java'> 

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("promo_credit_usd")
    .setAmount(300)
    .setDestinationAccountId("rider1")
    .addActionTagsField("type", "promotion")
    .addActionTagsField("campaign", "referral")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.issue({
    flavorId: 'promo_credit_usd',
    amount: 300,
    destinationAccountId: 'rider1',
    actionTags: {
      type: 'promotion',
      campaign: 'referral'
    }
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.transact do |builder|
  builder.issue(
    flavor_id: 'promo_credit_usd',
    amount: 300,
    destination_account_id: 'rider1',
    action_tags: {
      type: 'promotion',
      campaign: 'referral'
    }
  )
end
```

</TabItem>
</Tabs>

Because this transaction issues `promo_credit_usd`, it must be signed by the `promotions` key. This is handled automatically by the `transact` SDK method.

#### Ride Payment - with credits
When a rider has promotional credits in their account, they can choose to apply them to a fare. We model this as a single atomic **transaction** with five actions:

1. **Retire** - the amount of credits that will be used from the rider's account
2. **Issue** - the same amount of `usd` into the rider's account
3. **Transfer** - the total amount of the fare in `usd` from the rider's account to the processing account to represent the fare payment
4. **Transfer** - an amount of `usd` equal to the driver's portion from the processing account to the driver's account
5. **Retire** - an amount of `usd` tokens equal to the company fee from the rider's account

Note that we effectively exchange `promo_credit_usd` for `usd` so that there is a single transfer of `usd` in the amount of the full ride. This will make it easy to query for ride fares later. See the Queries section below.

Assume that Rider1 pays a $5.00 fare for a ride with Driver1, using $3.00 of promotional credits. The company fee is 10% of the fare ($0.50).

<Tabs>
<TabItem value='java' label='Java'> 

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("promo_credit_usd")
    .setAmount(300)
    .setSourceAccountId("rider1")
    .addActionTagsField("type", "redeem_credits")
  ).addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("usd")
    .setAmount(300)
    .setDestinationAccountId("rider1")
    .addActionTagsField("type", "cash_value_of_credits")
  ).addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(500)
    .setSourceAccountId("rider1")
    .setDestinationAccountId("processing")
    .addActionTagsField("type", "fare_payment")
  ).addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(450)
    .setSourceAccountId("processing")
    .setDestinationAccountId("driver1")
    .addActionTagsField("type", "driver_fare_share")
  ).addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("usd")
    .setAmount(50)
    .setSourceAccountId("processing")
    .addActionTagsField("type", "company_fee")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.retire({
    flavorId: 'promo_credit_usd',
    amount: 300,
    sourceAccountId: 'rider1',
    actionTags: {type: 'redeem_credits'}
  })
  builder.issue({
    flavorId: 'usd',
    amount: 300,
    destinationAccountId: 'rider1',
    actionTags: {type: 'cash_value_of_credits'}
  })
  builder.transfer({
    flavorId: 'usd',
    amount: 500,
    sourceAccountId: 'rider1',
    destinationAccountId: 'processing',
    actionTags: {type: 'fare_payment'}
  })
  builder.transfer({
    flavorId: 'usd',
    amount: 450,
    sourceAccountId: 'processing',
    destinationAccountId: 'driver1',
    actionTags: {type: 'driver_fare_share'}
  })
  builder.retire({
    flavorId: 'usd',
    amount: 50,
    sourceAccountId: 'processing',
    actionTags: {type: 'company_fee'}
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.transactions.transact do |builder|
  builder.retire(
    flavor_id: 'promo_credit_usd',
    amount: 300,
    source_account_id: 'rider1',
    action_tags: {type: 'redeem_credits'}
  )
  builder.issue(
    flavor_id: 'usd',
    amount: 300,
    destination_account_id: 'rider1',
    action_tags: {type: 'cash_value_of_credits'}
  )
  builder.transfer(
    flavor_id: 'usd',
    amount: 500,
    source_account_id: 'rider1',
    destination_account_id: 'processing',
    action_tags: {type: 'fare_payment'}
  )
  builder.transfer(
    flavor_id: 'usd',
    amount: 450,
    source_account_id: 'processing',
    destination_account_id: 'driver1',
    action_tags: {type: 'driver_fare_share'}
  )
  builder.retire(
    flavor_id: 'usd',
    amount: 50,
    source_account_id: 'processing',
    action_tags: {type: 'company_fee'}
  )
end
```

</TabItem>
</Tabs>

#### Payout Driver
When the company pays out a driver balance, we create a transaction with a single action retiring `usd` from the driver's account in an amount equal to the payout.

We can use action tags to record details about the withdrawal, such as the withdrawal method and associated transaction ID in an external system.

Assume that the company pays Driver1 the balance of $20 via ACH.

<Tabs>
<TabItem value='java' label='Java'>  

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("usd")
    .setAmount(2000)
    .setSourceAccountId("driver1")
    .addActionTagsField("type", "driver_payout")
    .addActionTagsField("system", "ach")
    .addActionTagsField("ach_transaction_id", "11111")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.retire({
    flavorId: 'usd',
    amount: 2000,
    sourceAccountId: 'driver1',
    actionTags: {
      type: 'driver_payout',
      system: 'ach',
      ach_transactionId: '11111'
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
    amount: 2000,
    source_account_id: 'driver1',
    action_tags: {
      type: 'driver_payout',
      system: 'ach',
      ach_transaction_id: '11111'
    }
  )
end
```

</TabItem>
</Tabs>

### Queries
Now that we have created several transactions, we can query the ledger in various ways.

#### Driver Balance
If we want to know the balance that a driver has earned but has not yet been paid out, we perform a sum tokens query, filtering to the driver's account id and the USD flavor.

For example, let's query the balance in Driver1's account.

<Tabs>
<TabItem value='java' label='Java'>  

```java
TokenSum.ItemIterable balances = new Token.SumBuilder()
  .setFilter("AccountId=$1 AND FlavorId=$2")
  .addFilterParameter("driver1")
  .addFilterParameter("usd")
  .getIterable(ledger);

for (TokenSum balance : balances) {
  System.out.println("amount: " + balance.amount);
  System.out.println("");
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
var page1 = ledger.tokens.sum({
  filter: 'accountId=$1 AND flavorId=$2',
  filterParams: ['driver1', 'usd']
}).page()

page1.items.forEach(balance => {
  console.log('amount: ' + balance.amount)
  console.log('')
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.tokens.sum(
  filter: 'account_id=$1 AND flavor_id=$2',
  filter_params: ['driver1', 'usd']
).each do |balance|
  puts 'amount: ' + balance.amount.to_s
  puts ''
end
```

</TabItem>
</Tabs>

which will output:

```
amount: x
```

#### Driver earning history
If we want to know the amounts a driver earned for their rides, we create a list actions query, filtering to actions with type `driver_fare_share` and a destination of the drivers's account. In the below, we set page size to 10 to return the 10 most recent rides only. This will return the 10 most recent rides for that driver.

<Tabs>
<TabItem value='java' label='Java'>  

```java
Action.Page actions = new Action.ListBuilder()
  .setFilter("tags.type=$1 AND destinationAccountId=$2")
  .addFilterParameter("driver_fare_share")
  .addFilterParameter("driver1")
  .setPageSize(10)
  .getPage(ledger);

for (Action action : actions.items) {
  System.out.println("amount: " + action.amount);
  System.out.println("");
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
page1 = ledger.actions.list({
  filter: 'tags.type=$1 AND destinationAccountId=$2',
  filterParams: ['driver_fare_share', 'driver1']
}).page({size: 10})

page1.items.forEach(action => {
  console.log('amount: ' + action.amount)
  console.log('')
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.actions.list(
  filter: 'tags.type=$1 AND destination_account_id=$2',
  filter_params: ['driver_fare_share', 'driver1']
).page(size: 10)

page1.each do |action|
  puts 'amount: ' + action.amount.to_s
  puts ''
end
```

</TabItem>
</Tabs>

which will output:

```
amount: x

amount: y

(etc.)
```

#### Rider Credits Balances
If we want to know the amount of credits each rider has available to spend on rides, we need to perform a sum tokens query filtering to the promotional credits flavor and accounts with type 'rider', and grouping by account id.

<Tabs>
<TabItem value='java' label='Java'>  

```java
TokenSum.ItemIterable balances = new Token.SumBuilder()
  .setFilter("FlavorId=$1 AND AccountTags.type=$2")
  .addFilterParameter("promo_credit_usd")
  .addFilterParameter("rider")
  .addGroupByField("accountId")
  .getIterable(ledger);

for (TokenSum balance : balances) {
  System.out.println("account: " + balance.accountId);
  System.out.println("amount: " + balance.amount);
  System.out.println("");
}
```


</TabItem>
<TabItem value='node' label='Node.js'>

```js
page1 = ledger.tokens.sum({
  filter: 'flavorId=$1 AND accountTags.type=$2',
  filterParams: ['promo_credit_usd','rider'],
  groupBy: ['accountId']
}).page()

page1.items.forEach(balance => {
  console.log('account: ' + balance.accountId)
  console.log('amount: ' + balance.amount)
  console.log('')
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.tokens.sum(
  filter: 'flavor_id=$1 AND account_tags.type=$2',
  filter_params: ['promo_credit_usd','rider'],
  group_by: ['account_id']
).each do |balance|
  puts 'account: ' + balance.account_id
  puts 'amount: ' + balance.amount.to_s
  puts ''
end
```

</TabItem>
</Tabs>

which will output:

```
account: ...
amount: ...

(etc.)
```

#### Rider fare history
If we want to know the total amount that a rider paid for each of their recent rides, we create a list actions query, filtering to actions with a type of `fare_payment` and a source account of 'rider1'.

<Tabs>
<TabItem value='java' label='Java'>  


```java
Action.Page actions = new Action.ListBuilder()
  .setFilter("tags.type=$1 AND SourceAccountId=$2")
  .addFilterParameter("fare_payment")
  .addFilterParameter("rider1")
  .setPageSize(10)
  .getPage(ledger);

for (Action action : actions.items) {
  System.out.println("amount: " + action.amount);
  System.out.println("");
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
page1 = ledger.actions.list({
  filter: 'tags.type=$1 AND sourceAccountId=$2',
  filterParams: ['fare_payment', 'rider1']
}).page({size: 10})

page1.items.forEach(action => {
  console.log('amount: ' + action.amount)
  console.log('')
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.actions.list(
  filter: 'tags.type=$1 AND source_account_id=$2',
  filter_params: ['fare_payment', 'rider1']
).page(size: 10)

page1.each do |action|
  puts 'amount: ' + action.amount.to_s
  puts ''
end
```

</TabItem>
</Tabs>

which will output:

```bash
fare: x

fare: y

...
```
---
title: Lending Platform
id: lending-platform
sidebar_position: 3
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Lending platforms are easy to build on top of Sequence. These applications need to track how much borrowers owe as well as facilitate the packaging and sale of loans to investors.

In this guide, we explore how to build a platform for making installment loans to individual borrowers and selling them to investors on top of Sequence.

* [Overview](#overview)
* [Setup](#setup)
  * [Keys](#keys)
  * [Accounts](#accounts)
  * [Flavors](#flavors)
* [Transaction Types](#transaction-types)
  * [Issue Loan](#issue-loan)
  * [Sell Loans](#sell-loans)
  * [Borrower Payment](#borrower-payment)
  * [Investor Withdrawal](#investor-withdrawal)
* [Queries](#queries)
  * [Investor Portfolio](#investor-portfolio)
  * [Borrower Loans](#borrower-loans)
  * [Investor Cash Balance](#investor-cash-balance)
  * [Total Fees](#total-fees)

### Overview
The platform has two types of users, borrowers and investors, each of which will have an **account** in the ledger. There will also be two company accounts: a processing account for accepting and splitting payments, and a lending account for tracking loans owned by the company.

Each loan will be represented by its own **flavor**, which will be tagged with details about the borrower. **Token tags** will be used to record due dates of individual installments. There will also be a flavor for each currency that the platform supports.

This example assumes a platform that originates installment loans where the exact amount and timing of each installment is determined at the time the loan is made. These loans can be sold to investors, who then receive a proportional share of any amounts received on the loan (minus a 1% servicing fee charged by the platform). We will assume USD is the only currency supported.

### Setup
To set up our ledger, we will create several keys, flavors, and accounts.

#### Keys
The platform will have a single key, called `operations`.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Key.Builder()
  .setId("operations")
  .create(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.keys.create({id: 'operations'})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.keys.create(id: 'operations')
```
 
</TabItem>
</Tabs>

#### Accounts
For each borrower and investor that joins the platform, we will need an account in the ledger. Although these accounts would actually be created by the platform in real-time, for this example we'll assume we have one borrower (Alice) and two investors (Investor1 and Investor2) and create their accounts as part of the setup. We also need the company processing and revenue accounts.

We use **account tags** to differentiate between the types of accounts.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Account.Builder()
  .setId("alice")
  .addKeyId("operations")
  .addTag("type", "borrower")
  .create(ledger);

new Account.Builder()
  .setId("investor1")
  .addKeyId("operations")
  .addTag("type", "investor")
  .create(ledger);

new Account.Builder()
  .setId("investor2")
  .addKeyId("operations")
  .addTag("type", "investor")
  .create(ledger);

new Account.Builder()
  .setId("processing")
  .addKeyId("operations")
  .addTag("type", "company")
  .create(ledger);

new Account.Builder()
  .setId("lending")
  .addKeyId("operations")
  .addTag("type", "company")
  .create(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.accounts.create({
  id: 'alice',
  keyIds: ['operations'],
  tags: {type: 'borrower'}
})

ledger.accounts.create({
  id: 'investor1',
  keyIds: ['operations'],
  tags: {type: 'investor'}
})

ledger.accounts.create({
  id: 'investor2',
  keyIds: ['operations'],
  tags: {type: 'investor'}
})

ledger.accounts.create({
  id: 'processing',
  keyIds: ['operations'],
  tags: {type: 'company'}
})

ledger.accounts.create({
  id: 'lending',
  keyIds: ['operations'],
  tags: {type: 'company'}
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.accounts.create(
  id: 'alice',
  key_ids: ['operations'],
  tags: {type: 'borrower'}
)

ledger.accounts.create(
  id: 'investor1',
  key_ids: ['operations'],
  tags: {type: 'investor'}
)

ledger.accounts.create(
  id: 'investor2',
  key_ids: ['operations'],
  tags: {type: 'investor'}
)

ledger.accounts.create(
  id: 'processing',
  key_ids: ['operations'],
  tags: {type: 'company'}
)

ledger.accounts.create(
  id: 'lending',
  key_ids: ['operations'],
  tags: {type: 'company'}
)
```

</TabItem>
</Tabs> 

#### Flavors
We will need a USD asset to represent cash. It is denominated in cents, meaning 100 tokens represent $1.00.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Flavor.Builder()
  .setId("usd")
  .addKeyId("operations")
  .addTag("type", "currency")
  .create(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.flavors.create({
  id: 'usd',
  keyIds: ['operations'],
  tags: {
    type: 'currency'
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
    type: 'currency'
  }
)
```

</TabItem>
</Tabs> 

We will also need a flavor for each loan originated. Although these assets would actually be created by the platform in real-time, for this example we'll assume we have one loan and create it as part of the setup. We use **tags** to include static details about the loan, such as loan id, borrower id, and loan type. In practice, you would likely store additional information about the economic terms of the loan here as well, but we leave that out for now for simplicity.

For this example, assume the following terms of the loan:

* the platform loans Alice $300
* she will repay the loan in three installments of $110
* the installments will be payable on 1/1/2018, 2/1/2018, and 3/1/2018

<Tabs>
<TabItem value='java' label='Java'>

```java
new Flavor.Builder()
  .setId("loan1")
  .addKeyId("operations")
  .addTag("type", "loan")
  .addTag("loan_id", "1")
  .addTag("borrower_id", "alice")
  .addTag("issue_date", "2017-12-01T00:00:00Z")
  .create(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.flavors.create({
  id: 'loan1',
  keyIds: ['operations'],
  tags: {
    type: 'loan',
    loan_id: '1',
    borrower_id: 'alice',
    issue_date: '2017-12-01T00:00:00Z',
  }
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.flavors.create(
  id: 'loan1',
  key_ids: ['operations'],
  tags: {
    type: 'loan',
    loan_id: '1',
    borrower_id: 'alice',
    issue_date: '2017-12-01T00:00:00Z',
  }
)
```

</TabItem>
</Tabs> 

### Transaction Types
Now that we have created our assets and accounts, we can model the different types of transactions.

#### Issue Loan
When the company makes a loan, we need to track two key aspects of the event: (1) distributing the loan amount to the borrower and (2) recording each of the installments for the loan (i.e., the repayment obligations). We will record #1 by issuing and then immediately retiring the loan amount to/from the borrower's account. Doing this will give us an easy way to look up loan amounts in the future (by querying for these actions). We will record #2 by issuing tokens of the loan's flavor into the lending account. We will issue each installment separately, and include each installment's due date in **token tags**. We do all this in a single, atomic transaction, with five **actions**:

1. **Issue** - the loan amount in `usd` to the borrower's account
2. **Retire** - the loan amount in `usd` from the borrower's account
3. **Issue** - the amount of the first installment, in `loan1`, to the lending account, including the due date in token tags
4. **Issue** - the amount of the second installment, in `loan1`, to the lending account, including the due date in token tags
5. **Issue** - the amount of the third installment, in `loan1`, to the lending account, including the due date in token tags

<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("usd")
    .setAmount(30000)
    .setDestinationAccountId("alice")
    .addActionTagsField("type", "distribute_loan_amount")
  ).addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("usd")
    .setAmount(30000)
    .setSourceAccountId("alice")
    .addActionTagsField("type", "receive_loan_amount")
    .addActionTagsField("system", "wire")
    .addActionTagsField("wire_transaction_id", "11111")
  ).addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("loan1")
    .setAmount(11000)
    .setDestinationAccountId("lending")
    .addActionTagsField("type", "create_installment")
    .addTokenTagsField("installment", 1)
    .addTokenTagsField("due_date", "2018-01-01T00:00:00Z")
  ).addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("loan1")
    .setAmount(11000)
    .setDestinationAccountId("lending")
    .addActionTagsField("type", "create_installment")
    .addTokenTagsField("installment", 2)
    .addTokenTagsField("due_date", "2018-02-01T00:00:00Z")
  ).addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("loan1")
    .setAmount(11000)
    .setDestinationAccountId("lending")
    .addActionTagsField("type", "create_installment")
    .addTokenTagsField("installment", 3)
    .addTokenTagsField("due_date", "2018-03-01T00:00:00Z")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.issue({
    flavorId: 'usd',
    amount: 30000,
    destination_accountId: 'alice',
    actionTags: {
      type: 'distribute_loan_amount'
    }
  })
  builder.retire({
    flavorId: 'usd',
    amount: 30000,
    source_accountId: 'alice',
    actionTags: {
      type: 'receive_loan_amount',
      system: 'wire',
      wire_transactionId: '11111'
    }
  })
  builder.issue({
    flavorId: 'loan1',
    amount: 11000,
    destination_accountId: 'lending',
    actionTags: {
      type: 'create_installment'
    },
    tokenTags: {
      installment: 1,
      due_date: '2018-01-01T00:00:00Z'
    }
  })
  builder.issue({
    flavorId: 'loan1',
    amount: 11000,
    destination_accountId: 'lending',
    actionTags: {
      type: 'create_installment'
    },
    tokenTags: {
      installment: 2,
      due_date: '2018-02-01T00:00:00Z'
    }
  })
  builder.issue({
    flavorId: 'loan1',
    amount: 11000,
    destination_accountId: 'lending',
    actionTags: {
      type: 'create_installment'
    },
    tokenTags: {
      installment: 3,
      due_date: '2018-03-01T00:00:00Z'
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
    amount: 30000,
    destination_account_id: 'alice',
    action_tags: {
      type: 'distribute_loan_amount'
    }
  )
  builder.retire(
    flavor_id: 'usd',
    amount: 30000,
    source_account_id: 'alice',
    action_tags: {
      type: 'receive_loan_amount',
      system: 'wire',
      wire_transaction_id: '11111'
    }
  )
  builder.issue(
    flavor_id: 'loan1',
    amount: 11000,
    destination_account_id: 'lending',
    action_tags: {
      type: 'create_installment'
    },
    token_tags: {
      installment: 1,
      due_date: '2018-01-01T00:00:00Z'
    }
  )
  builder.issue(
    flavor_id: 'loan1',
    amount: 11000,
    destination_account_id: 'lending',
    action_tags: {
      type: 'create_installment'
    },
    token_tags: {
      installment: 2,
      due_date: '2018-02-01T00:00:00Z'
    }
  )
  builder.issue(
    flavor_id: 'loan1',
    amount: 11000,
    destination_account_id: 'lending',
    action_tags: {
      type: 'create_installment'
    },
    token_tags: {
      installment: 3,
      due_date: '2018-03-01T00:00:00Z'
    }
  )
end
```

</TabItem>
</Tabs> 

#### Investor Deposit
Investors can deposit cash into the platform for the purpose of purchasing loans. We model this as an **issue** action into the investor's account.

1. **Issue** - USD equal to the deposit

Suppose Investor1 and Investor2 each deposit $1,000 onto the platform.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("usd")
    .setAmount(100000)
    .setDestinationAccountId("investor1")
    .addActionTagsField("type", "deposit")
    .addActionTagsField("system", "wire")
    .addActionTagsField("wire_transaction_id", "22222")
  ).transact(ledger);

  new Transaction.Builder()
    .addAction(new Transaction.Builder.Action.Issue()
      .setFlavorId("usd")
      .setAmount(100000)
      .setDestinationAccountId("investor2")
      .addActionTagsField("type", "deposit")
      .addActionTagsField("system", "wire")
      .addActionTagsField("wire_transaction_id", "33333")
    ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
await ledger.transactions.transact(builder => {
  builder.issue({
    flavorId: 'usd',
    amount: 100000,
    destination_accountId: 'investor1',
    actionTags: {
      type: 'deposit',
      system: 'wire',
      wire_transactionId: '22222'
    }
  })
})

await ledger.transactions.transact(builder => {
  builder.issue({
    flavorId: 'usd',
    amount: 100000,
    destination_accountId: 'investor2',
    actionTags: {
      type: 'deposit',
      system: 'wire',
      wire_transactionId: '33333'
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
    destination_account_id: 'investor1',
    action_tags: {
      type: 'deposit',
      system: 'wire',
      wire_transaction_id: '22222'
    }
  )
end

ledger.transactions.transact do |builder|
  builder.issue(
    flavor_id: 'usd',
    amount: 100000,
    destination_account_id: 'investor2',
    action_tags: {
      type: 'deposit',
      system: 'wire',
      wire_transaction_id: '33333'
    }
  )
end
```

</TabItem>
</Tabs>

#### Sell Loans
When the company sells one or more loans to an investor, the investor pays the company an amount of cash and the company transfers all or a portion of one or more installments to the investor.

1. **Retire** - USD equal to the purchase price from investor's account
2. **Transfer** - for each loan installment being purchased, the portion of the loan tokens representing that installment from the lending account to the investor's account

For this example, we will assume Investor1 purchases one third of each installment of loan1 for $101, and Investor2 purchases two thirds of each installment of loan1 for $202. We show these as two different transactions (as opposed to all in a single transaction). The actual structure should follow the business deal (i.e., if the business deal is for the the sales to occur simultaneously, we would do it in one ledger transaction instead of two).

<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("usd")
    .setAmount(10100)
    .setSourceAccountId("investor1")
    .addActionTagsField("type", "loan_purchase_proceeds")
  ).addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("loan1")
    .setAmount(3666)
    .setFilter("tags.due_date=$1")
    .addFilterParameter("2018-01-01T00:00:00Z")
    .setSourceAccountId("lending")
    .setDestinationAccountId("investor1")
    .addActionTagsField("type", "loan_purchase")
    .addTokenTagsField("due_date", "2018-01-01T00:00:00Z")
    .addTokenTagsField("installment", 1)
  ).addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("loan1")
    .setAmount(3666)
    .setFilter("tags.due_date=$1")
    .addFilterParameter("2018-02-01T00:00:00Z")
    .setSourceAccountId("lending")
    .setDestinationAccountId("investor1")
    .addActionTagsField("type", "loan_purchase")
    .addTokenTagsField("due_date", "2018-02-01T00:00:00Z")
    .addTokenTagsField("installment", 2)
  ).addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("loan1")
    .setAmount(3666)
    .setFilter("tags.due_date=$1")
    .addFilterParameter("2018-03-01T00:00:00Z")
    .setSourceAccountId("lending")
    .setDestinationAccountId("investor1")
    .addActionTagsField("type", "loan_purchase")
    .addTokenTagsField("due_date", "2018-03-01T00:00:00Z")
    .addTokenTagsField("installment", 3)
  ).transact(ledger);

  new Transaction.Builder()
    .addAction(new Transaction.Builder.Action.Retire()
      .setFlavorId("usd")
      .setAmount(20200)
      .setSourceAccountId("investor2")
      .addActionTagsField("type", "loan_purchase_proceeds")
    ).addAction(new Transaction.Builder.Action.Transfer()
      .setFlavorId("loan1")
      .setAmount(7334)
      .setFilter("tags.due_date=$1")
      .addFilterParameter("2018-01-01T00:00:00Z")
      .setSourceAccountId("lending")
      .setDestinationAccountId("investor2")
      .addActionTagsField("type", "loan_purchase")
      .addTokenTagsField("due_date", "2018-01-01T00:00:00Z")
      .addTokenTagsField("installment", 1)
    ).addAction(new Transaction.Builder.Action.Transfer()
      .setFlavorId("loan1")
      .setAmount(7334)
      .setFilter("tags.due_date=$1")
      .addFilterParameter("2018-02-01T00:00:00Z")
      .setSourceAccountId("lending")
      .setDestinationAccountId("investor2")
      .addActionTagsField("type", "loan_purchase")
      .addTokenTagsField("due_date", "2018-02-01T00:00:00Z")
      .addTokenTagsField("installment", 2)
    ).addAction(new Transaction.Builder.Action.Transfer()
      .setFlavorId("loan1")
      .setAmount(7334)
      .setFilter("tags.due_date=$1")
      .addFilterParameter("2018-03-01T00:00:00Z")
      .setSourceAccountId("lending")
      .setDestinationAccountId("investor2")
      .addActionTagsField("type", "loan_purchase")
      .addTokenTagsField("due_date", "2018-03-01T00:00:00Z")
      .addTokenTagsField("installment", 3)
    ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.retire({
    flavorId: 'usd',
    amount: 10100,
    source_accountId: 'investor1',
    actionTags: {type: 'loan_purchase_proceeds'}
  })
  builder.transfer({
    flavorId: 'loan1',
    amount: 3666,
    filter: 'tags.due_date=$1',
    filterParams: ['2018-01-01T00:00:00Z'],
    source_accountId: 'lending',
    destination_accountId: 'investor1',
    actionTags: {type: 'loan_purchase'},
    tokenTags: {
      due_date: '2018-01-01T00:00:00Z',
      installment: 1
    }
  })
  builder.transfer({
    flavorId: 'loan1',
    amount: 3666,
    filter: 'tags.due_date=$1',
    filterParams: ['2018-02-01T00:00:00Z'],
    source_accountId: 'lending',
    destination_accountId: 'investor1',
    actionTags: {type: 'loan_purchase'},
    tokenTags: {
      due_date: '2018-02-01T00:00:00Z',
      installment: 2
    }
  })
  builder.transfer({
    flavorId: 'loan1',
    amount: 3666,
    filter: 'tags.due_date=$1',
    filterParams: ['2018-03-01T00:00:00Z'],
    source_accountId: 'lending',
    destination_accountId: 'investor1',
    actionTags: {type: 'loan_purchase'},
    tokenTags: {
      due_date: '2018-03-01T00:00:00Z',
      installment: 3
    }
  })
})

ledger.transactions.transact(builder => {
  builder.retire({
    flavorId: 'usd',
    amount: 20200,
    source_accountId: 'investor2',
    actionTags: {type: 'loan_purchase_proceeds'}
  })
  builder.transfer({
    flavorId: 'loan1',
    amount: 7334,
    filter: 'tags.due_date=$1',
    filterParams: ['2018-01-01T00:00:00Z'],
    source_accountId: 'lending',
    destination_accountId: 'investor2',
    actionTags: {type: 'loan_purchase'},
    tokenTags: {
      due_date: '2018-01-01T00:00:00Z',
      installment: 1
    }
  })
  builder.transfer({
    flavorId: 'loan1',
    amount: 7334,
    filter: 'tags.due_date=$1',
    filterParams: ['2018-02-01T00:00:00Z'],
    source_accountId: 'lending',
    destination_accountId: 'investor2',
    actionTags: {type: 'loan_purchase'},
    tokenTags: {
      due_date: '2018-02-01T00:00:00Z',
      installment: 2
    }
  })
  builder.transfer({
    flavorId: 'loan1',
    amount: 7334,
    filter: 'tags.due_date=$1',
    filterParams: ['2018-03-01T00:00:00Z'],
    source_accountId: 'lending',
    destination_accountId: 'investor2',
    actionTags: {type: 'loan_purchase'},
    tokenTags: {
      due_date: '2018-03-01T00:00:00Z',
      installment: 3
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
    amount: 10100,
    source_account_id: 'investor1',
    action_tags: {type: 'loan_purchase_proceeds'}
  )
  builder.transfer(
    flavor_id: 'loan1',
    amount: 3666,
    filter: 'tags.due_date=$1',
    filter_params: ['2018-01-01T00:00:00Z'],
    source_account_id: 'lending',
    destination_account_id: 'investor1',
    action_tags: {type: 'loan_purchase'},
    token_tags: {
      due_date: '2018-01-01T00:00:00Z',
      installment: 1
    }
  )
  builder.transfer(
    flavor_id: 'loan1',
    amount: 3666,
    filter: 'tags.due_date=$1',
    filter_params: ['2018-02-01T00:00:00Z'],
    source_account_id: 'lending',
    destination_account_id: 'investor1',
    action_tags: {type: 'loan_purchase'},
    token_tags: {
      due_date: '2018-02-01T00:00:00Z',
      installment: 2
    }
  )
  builder.transfer(
    flavor_id: 'loan1',
    amount: 3666,
    filter: 'tags.due_date=$1',
    filter_params: ['2018-03-01T00:00:00Z'],
    source_account_id: 'lending',
    destination_account_id: 'investor1',
    action_tags: {type: 'loan_purchase'},
    token_tags: {
      due_date: '2018-03-01T00:00:00Z',
      installment: 3
    }
  )
end

ledger.transactions.transact do |builder|
  builder.retire(
    flavor_id: 'usd',
    amount: 20200,
    source_account_id: 'investor2',
    action_tags: {type: 'loan_purchase_proceeds'}
  )
  builder.transfer(
    flavor_id: 'loan1',
    amount: 7334,
    filter: 'tags.due_date=$1',
    filter_params: ['2018-01-01T00:00:00Z'],
    source_account_id: 'lending',
    destination_account_id: 'investor2',
    action_tags: {type: 'loan_purchase'},
    token_tags: {
      due_date: '2018-01-01T00:00:00Z',
      installment: 1
    }
  )
  builder.transfer(
    flavor_id: 'loan1',
    amount: 7334,
    filter: 'tags.due_date=$1',
    filter_params: ['2018-02-01T00:00:00Z'],
    source_account_id: 'lending',
    destination_account_id: 'investor2',
    action_tags: {type: 'loan_purchase'},
    token_tags: {
      due_date: '2018-02-01T00:00:00Z',
      installment: 2
    }
  )
  builder.transfer(
    flavor_id: 'loan1',
    amount: 7334,
    filter: 'tags.due_date=$1',
    filter_params: ['2018-03-01T00:00:00Z'],
    source_account_id: 'lending',
    destination_account_id: 'investor2',
    action_tags: {type: 'loan_purchase'},
    token_tags: {
      due_date: '2018-03-01T00:00:00Z',
      installment: 3
    }
  )
end
```

</TabItem>
</Tabs>

Note that when we transfer the `loan1` tokens to the investor accounts, we have to specify the token tags to ensure that the due date information is tagged to the tokens that are transferred.
 

#### Borrower Payment
When a borrower makes a payment, the platform first takes a 1% fee. The remaining proceeds are distributed to the investors, proportional to their loan ownership. The payment from the borrower first flows into the processing account, where it is then split among the various parties.

To determine the amounts owed to each investor, we must first query the ledger to retrieve the total amount of the loan each investor owns. With that information, we can calculate each investor's pro rata share.

Once the pro rata shares are calculated, the eventual transaction is:

1. **Issue** - USD equal to the payment to the borrower's account
2. **Transfer** - USD equal to the payment from the borrower's account to the processing account
3. **Retire** - USD equal to the company fee from the processing account
4. **Retire** - For each owner of a portion of the loan, retire the loan tokens from their account in an amount equal to their pro rata share of the total payment (i.e., pre-company fee)
5. **Transfer** - For each investor who owns a portion of the loan (if any), transfer USD to their account from the processing account in an amount equal to their pro rata share of the net payment (i.e., post-company fee)

If the platform still owns any portion of the loan, we would also include two more actions:

6. **Retire** - loan tokens from the company lending account in an amount equal to the share still owned by the platform
7. **Retire** - USD from the processing account in an amount equal to the payment attributable to the share still owned by the platform

The below shows Alice paying the first installment on loan1.


<Tabs>
<TabItem value='java' label='Java'>

```java
Token.SumBuilder builder = new Token.SumBuilder()
  .setFilter("flavorId=$1 AND tags.installment=$2")
  .addFilterParameter("loan1")
  .addFilterParameter(1)
  .addGroupByField("accountId");

int total = 0;
for (TokenSum sum : builder.getIterable(ledger)) {
  total += sum.amount;
}

Transaction.Builder tx = new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Issue()
    .setFlavorId("usd")
    .setAmount(11000)
    .setDestinationAccountId("alice")
    .addActionTagsField("type", "loan_payment_funds")
  ).addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(11000)
    .setSourceAccountId("alice")
    .setDestinationAccountId("processing")
    .addActionTagsField("type", "loan_payment")
  );

int fee_amt = 11000;                       // Start at payment amount; deduct amounts paid to investors
for (TokenSum sum : builder.getIterable(ledger)) {
  double percentage = (double) sum.amount / total;
  int pre_fee_share = (int) Math.floor(percentage * 11000);
  int post_fee_share = (int) Math.floor(percentage * 0.99 * 11000);
  fee_amt -= post_fee_share;

  tx.addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("loan1")
    .setAmount(pre_fee_share)
    .setFilter("tags.installment=$1")
    .addFilterParameter(1)
    .setSourceAccountId(sum.accountId)
    .addActionTagsField("type", "loan_repayment")
  ).addAction(new Transaction.Builder.Action.Transfer()
    .setFlavorId("usd")
    .setAmount(post_fee_share)
    .setSourceAccountId("processing")
    .setDestinationAccountId(sum.accountId)
    .addActionTagsField("type", "loan_repayment")
  );
}

tx.addAction(new Transaction.Builder.Action.Retire()
  .setFlavorId("usd")
  .setAmount(fee_amt)
  .setSourceAccountId("processing")
  .addActionTagsField("type", "company)fee")
  ).transact(ledger);
```


</TabItem>
<TabItem value='node' label='Node.js'>

```js
var page1 = ledger.tokens.sum({
  filter: 'flavorId=$1 AND tags.installment=$2',
  filterParams: ['loan1', 1],
  groupBy: ['accountId']
}).page()

total = 0
page1.items.forEach(sum => {
  total += sum.amount
})

ledger.transactions.transact(builder => {
  builder.issue({
    flavorId: 'usd',
    amount: 11000,
    destination_accountId: 'alice',
    actionTags: {
      type: 'loan_payment_funds'
    }
  })
  builder.transfer({
    flavorId: 'usd',
    amount: 11000,
    source_accountId: 'alice',
    destination_accountId: 'processing',
    actionTags: {
      type: 'loan_payment'
    }
  })
  fee_amt = 11000                   // Start at full amount; will deduct amounts paid to investors
  page1.items.forEach(sum => {
    percentage = sum.amount / total
    pre_fee_share = Math.floor(percentage * 11000)
    post_fee_share = Math.floor(percentage * 0.99 * 11000)
    fee_amt -= post_fee_share

    builder.retire({
      flavorId: 'loan1',
      amount: pre_fee_share,
      filter: 'tags.installment=$1',
      filterParams: [1],
      source_accountId: sum.accountId,
      actionTags: {
        type: 'loan_repayment'
      }
    })
    builder.transfer({
      flavorId: 'usd',
      amount: post_fee_share,
      source_accountId: 'processing',
      destination_accountId: sum.accountId,
      actionTags: {
        type: 'loan_payment_owner_share'
      }
    })
  })
  builder.retire({
    flavorId: 'usd',
    amount: fee_amt,
    source_accountId: 'processing',
    actionTags: {
      type: 'company_fee'
    }
  })
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.tokens.sum(
  filter: 'flavor_id=$1 AND tags.installment=$2',
  filter_params: ['loan1', 1],
  group_by: ['account_id']
).page()

owners = []
total = 0
page1.each do |sum|
  owners << [sum.account_id, sum.amount]
  total += sum.amount
end

ledger.transactions.transact do |builder|
  builder.issue(
    flavor_id: 'usd',
    amount: 11000,
    destination_account_id: 'alice',
    action_tags: {
      type: 'loan_payment_funds'
    }
  )
  builder.transfer(
    flavor_id: 'usd',
    amount: 11000,
    source_account_id: 'alice',
    destination_account_id: 'processing',
    action_tags: {
      type: 'loan_payment'
    }
  )
  fee_amt = 11000
  owners.each do |owner|
    percentage = owner[1] / total.to_f
    pre_fee_share = (percentage * 11000).floor
    post_fee_share = (percentage * 0.99 * 11000).floor
    fee_amt -= post_fee_share

    builder.retire(
      flavor_id: 'loan1',
      amount: pre_fee_share,
      filter: 'tags.installment=$1',
      filter_params: [1],
      source_account_id: owner[0],
      action_tags: {
        type: 'loan_repayment'
      }
    )
    builder.transfer(
      flavor_id: 'usd',
      amount: post_fee_share,
      source_account_id: 'processing',
      destination_account_id: owner[0],
      action_tags: {
        type: 'loan_payment_owner_share'
      }
    )
  end
  builder.retire(
    flavor_id: 'usd',
    amount: fee_amt,
    source_account_id: 'processing',
    action_tags: {
      type: 'company_fee'
    }
  )
end
```

</TabItem>
</Tabs>

Note that the way the above code is written, each investor's share is rounded down to the nearest cent and the company keeps any remaining cents due to rounding (as a result, in the above, the company will take a fee of $1.11, even though 10% of the payment is $1.10).
 

#### Investor Withdrawal
When an investor withdraws cash from their account on the platform, we retire an amount of USD equal to the withdrawal amount from their account.

Assume that Investor1 withdraws $50 from their account.

<Tabs>
<TabItem value='java' label='Java'>

```java
new Transaction.Builder()
  .addAction(new Transaction.Builder.Action.Retire()
    .setFlavorId("usd")
    .setAmount(5000)
    .setSourceAccountId("investor1")
    .addActionTagsField("type", "investor_withdrawal")
  ).transact(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.retire({
    flavorId: 'usd',
    amount: 5000,
    source_accountId: 'investor1',
    actionTags: {
      type: 'investor_withdrawal'
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
    amount: 5000,
    source_account_id: 'investor1',
    action_tags: {
      type: 'investor_withdrawal'
    }
  )
end
```

</TabItem>
</Tabs> 

### Queries
Now that we have created several transactions, we can query the ledger in various ways.

#### Investor Portfolio
If we want to know all of the loans an investor currenly owns, we perform a sum tokens query, filtering to the investor's account and the `loan` type in flavor tags, and grouping by flavor id.

<Tabs>
<TabItem value='java' label='Java'>

```java
TokenSum.ItemIterable sums = new Token.SumBuilder()
  .setFilter("AccountId=$1 AND FlavorTags.type=$2")
  .addFilterParameter("investor1")
  .addFilterParameter("loan")
  .addGroupByField("flavorId")
  .getIterable(ledger);

for (TokenSum sum : sums) {
  System.out.println("amount: " + sum.amount );
  System.out.println("loan: " + sum.flavorId);
  System.out.println("");
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
page1 = ledger.tokens.sum({
  filter: 'accountId=$1 AND flavorTags.type=$2',
  filterParams: ['investor1', 'loan'],
  groupBy: ['flavorId']
}).page()

page1.items.forEach(sum => {
  console.log('amount: ' + sum.amount)
  console.log('loan: ' + sum.flavorId)
  console.log('')
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.tokens.sum(
  filter: 'account_id=$1 AND flavor_tags.type=$2',
  filter_params: ['investor1', 'loan'],
  group_by: ['flavor_id']
).each do |sum|
  puts 'amount: ' + sum.amount.to_s
  puts 'loan: ' + sum.flavor_id.to_s
  puts ''
end
```

</TabItem>
</Tabs> 

which will output:

```
amount: x
loan: y

amount: w
loan: u
```

#### Borrower Loans
If we want to know all the amounts that a particular borrower has outstanding, we perform a sum tokens query and group the results by due date.

<Tabs>
<TabItem value='java' label='Java'>

```java
sums = new Token.SumBuilder()
  .setFilter("FlavorTags.borrower_id=$1")
  .addFilterParameter("alice")
  .addGroupByField("flavorId")
  .addGroupByField("tags.due_date")
  .getIterable(ledger);

for (TokenSum sum : sums) {
  System.out.println("amount: " + sum.amount );
  System.out.println("loan: " + sum.flavorId);
  System.out.println("due date: " + sum.tags.get("due_date"));
  System.out.println("");
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
page1 = ledger.tokens.sum({
  filter: 'flavorTags.borrower_id=$1',
  filterParams: ['alice'],
  groupBy: ['flavorId', 'tags.due_date']
}).page()

page1.items.forEach(sum => {
  console.log('amount: ' + sum.amount)
  console.log('loan: ' + sum.flavorId)
  console.log('due date: ' + sum.tags['due_date'])
  console.log('')
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.tokens.sum(
  filter: 'flavor_tags.borrower_id=$1',
  filter_params: ['alice'],
  group_by: ['flavor_id', 'tags.due_date']
).each do |sum|
  puts 'amount: ' + sum.amount.to_s
  puts 'loan: ' + sum.flavor_id
  puts 'due date: ' + sum.tags['due_date']
  puts ''
end
```

</TabItem>
</Tabs> 

which will output:

```
amount: ...
loan: ...
due date: ...

(etc.)
```

#### Investor Cash Balance
If we want to know the amount of cash in each investor account (i.e., the amounts they could withdraw), we perform a sum tokens query, filtering to accounts with type 'investor' and flavors with type 'currency'.

<Tabs>
<TabItem value='java' label='Java'>

```java
sums = new Token.SumBuilder()
  .setFilter("AccountTags.type=$1 AND FlavorTags.type=$2")
  .addFilterParameter("investor")
  .addFilterParameter("currency")
  .addGroupByField("accountId")
  .addGroupByField("flavorId")
  .getIterable(ledger);

for (TokenSum sum : sums) {
  System.out.println("account: " + sum.accountId );
  System.out.println("amount: " + sum.amount );
  System.out.println("currency: " + sum.flavorId );
  System.out.println("");
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
page1 = ledger.tokens.sum({
  filter: 'accountTags.type=$1 AND flavorTags.type=$2',
  filterParams: ['investor', 'currency'],
  groupBy: ['accountId', 'flavorId']
}).page()

page1.items.forEach(sum => {
  console.log('account: ' + sum.accountId)
  console.log('amount: ' + sum.amount)
  console.log('currency: ' + sum.flavorId)
  console.log('')
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.tokens.sum(
  filter: 'account_tags.type=$1 AND flavor_tags.type=$2',
  filter_params: ['investor', 'currency'],
  group_by: ['account_id', 'flavor_id']
).each do |sum|
  puts 'account: ' + sum.account_id
  puts 'amount: ' + sum.amount.to_s
  puts 'currency: ' + sum.flavor_id
  puts ''
end
```

</TabItem>
</Tabs> 

which will output:

```
amount: x

amount: y
```
#### Total Fees
If we want to know the total amount of fees collected, we perform a sum actions query, filtering to actions with a type of `company_fee`. We can also supply a time window, if we want.

For example, the below calculates total fees collected in the February 2018.

<Tabs>
<TabItem value='java' label='Java'>
 
```java
ActionSum.ItemIterable actionSums = new Action.SumBuilder()
  .setFilter("tags.type=$1 AND timestamp >= $2 AND $3 >= timestamp")
  .addFilterParameter("company_fee")
  .addFilterParameter("2018-02-01T00:00:00Z")
  .addFilterParameter("2018-03-01T00:00:00Z")
  .getIterable(ledger);

for (ActionSum actionSum : actionSums) {
  System.out.println("total fees in February: " + actionSum.amount);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
page1 = ledger.actions.sum({
  filter: 'tags.type=$1 AND timestamp >= $2 AND timestamp < $3',
  filterParams: ['company_fee', '2018-02-01T00:00:00Z', '2018-03-01T00:00:00Z']
}).page()

page1.items.forEach(sum => {
  console.log('total fees in February: ' + sum.amount)
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.actions.sum(
  filter: 'tags.type=$1 AND timestamp >= $2 AND timestamp < $3',
  filter_params: ['company_fee', '2018-02-01T00:00:00Z', '2018-03-01T00:00:00Z']
).each do |sum|
  puts 'total fees in February: ' + sum.amount.to_s
end
```

</TabItem>
</Tabs>

Note that to define the time window, instead of using the Sequence-generated timestamp (the `timestamp` field on Action objects), we could have included custom fields when building the actions in tags. When using these fields in the filter, we would simply add `:time` to indicate it is a timestamp field. See [Filters](https://dashboard.sequence.chain.com/docs/filters) for more information on custom time fields.

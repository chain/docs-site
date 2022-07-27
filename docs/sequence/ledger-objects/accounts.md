---
title: Accounts
id: accounts
sidebar-position: 3
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Accounts represent entities in the ledger. Each account can hold many different
flavors of tokens. Tokens can be issued into an account, transferred
from one account to another, or retired from an account using a transaction.

### ID

An account id is a user-defined, unique identifier. If you do not provide one, one will be created for you automatically.

### Keys &amp; Quorum

When creating an account, you provide one or more keys and a quorum. The quorum
is the number of keys that must sign a transaction in order to transfer or
retire tokens from the account. By default, the quorum is equal to
the number of keys provided, but you can choose to require only a subset of keys
– for example, 2-of-3.

### Tags

Account tags are a set of user-defined key-value pairs associated with an
account. Account tags are useful for grouping different accounts together for
the purpose of querying balances.

For example, if one user has three different
types of accounts, they could all have a tag containing the same user ID.

Then, when you want to query the balance of each flavor across all of the
user's accounts, you would provide the following filter to the sum tokens query:

<Tabs>
<TabItem value='java' label='Java'>

```java
accountTags.userId='123'
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
accountTags.userId='123'
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
account_tags.user_id='123'
```

</TabItem>
</Tabs>

and set the sum-by parameter as:

<Tabs>
<TabItem value='java' label='Java'>

```java
accountTags.userId
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
accountTags.userId
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
account_tags.user_id
```

</TabItem>
</Tabs>

This would return a list of token "balances" across all the accounts for that user.

#### Tags snapshot
When a new [action](actions.md) is added to a ledger via a [transaction](transactions.md), a snapshot of the source account tags and destination account tags as they exist at that time are added to the `snapshot` object in the [action object](actions.md#data-structure).

You can then provide a filter to access the tags snapshot when querying actions. For example:

<Tabs>
<TabItem value='java' label='Java'>

```java
snapshot.sourceAccountTags.userId='123'
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
snapshot.sourceAccountTags.userId='123'
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
snapshot.source_account_tags.user_id='123'
```

</TabItem>
</Tabs>

#### Updating tags
You can update account tags at any time. These new tags will be added to the snapshot on any new actions going forward. Snapshots on existing actions will not be affected.

### Data Structure

#### Field Descriptions

| Field   | Type        | Description                                                                                   |
|:--------|:------------|:----------------------------------------------------------------------------------------------|
| id      | string      | User-supplied or system-assigned unique identifier of the account.                            |
| tags    | JSON object | Arbitrary, user-supplied, key-value data about the account.                                   |
| key ids | array       | A list of ids of keys that control tokens in the account.                           |
| quorum  | integer     | The number of keys from which signatures are required to transfer or retire from the account. |

#### Example Object

<Tabs>
<TabItem value='java' label='Java'>

```java
{
  id: "...",
  tags: {},
  keyIds: [],
  quorum: 1
}
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
{
  id: "...",
  tags: {},
  keyIds: [],
  quorum: 1
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
{
  id: "...",
  tags: {},
  key_ids: [],
  quorum: 1
}
```

</TabItem>
</Tabs>

### Examples

#### Create an account

Create a checking account for Alice.

<Tabs>
<TabItem value='java' label='Java'>

```java
Account alice = new Account.Builder()
  .setId("alice")
  .addKeyId(key.id)
  .addTag("type", "checking")
  .create(ledger);
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
ledger.accounts.create({
  id: 'alice',
  keyIds: [key.id],
  tags: {type: 'checking'}
}).then(alice => ...)
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
alice = ledger.accounts.create(
  id: 'alice',
  key_ids: [key.id],
  tags: {type: 'checking'}
)
```

</TabItem>
</Tabs>

#### Query accounts

Query all checking accounts.

<Tabs>
<TabItem value='java' label='Java'>

```java
Account.ItemIterable accounts = new Account.ListBuilder()
  .setFilter("tags.type=$1")
  .addFilterParameter("checking")
  .getIterable(ledger);
for (Account account : accounts) {
  System.out.println("account: " + account.id);
}
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
let all = ledger.accounts.list({
  filter: 'tags.type=$1',
  filterParams: ['checking']
}).all()

while (true) {
  let { value: account, done: done } = await all.next()
  if (done) { break }
  console.log(account)
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.accounts.list(
  filter: 'tags.type=$1',
  filter_params: ['checking']
).each do |account|
  puts account.to_json
end
```

</TabItem>
</Tabs>

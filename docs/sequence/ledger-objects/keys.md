---
title: Keys
id: keys
sidebar-position: 6
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Cryptographic keys control all transactions in a Sequence ledger. When creating
a flavor or account, you can specify one or more keys that must sign
transactions before submitting to the ledger. To issue tokens of a flavor,
the transaction must be signed with the correct flavor key(s). To transfer or
retire tokens from an account, the transaction must be signed
with the correct account key(s).

The simplest configuration is to use a single key to create all accounts and
flavors. This allows one system to control the entire ledger. However, if you
have different systems responsible for different operations, you may want to
create more than one key. For example, the system that issues tokens into
accounts in response to external deposits may be different from the system that
transfers tokens between accounts. In this case, you may want to create all the flavors
from one key (controlled by the first system) and all the accounts from another
key (controlled by the second system).

### Data Structure

#### Field Descriptions

| Field | Type   | Description                                                          |
|:------|:-------|:---------------------------------------------------------------------|
| id    | string | User-supplied or system-generated unique identifier of the key.      |

#### Example Object

```
{
  id: "...",
}

```

### Examples

#### Create a key

<Tabs>
<TabItem value='java' label='Java'>

```java
Key key = new Key.Builder()
  .setId("myKey")
  .create(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.keys.create({id: 'myKey'}).then(key => ...)
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
key = ledger.keys.create(id: 'my_key')
```

</TabItem>
</Tabs>

#### Query Keys

You can retrieve keys that are managed by the ledger using a query. Results are
sorted in descending order of creation time.

<Tabs>
<TabItem value='java' label='Java'>

```java
Key.ItemIterable keys = new Key.ListBuilder().getIterable(ledger);
for (Key key : keys) {
  System.out.println("key: " + key.id);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let all = ledger.keys.list().all()

while (true) {
  let { value: key, done: done } = await all.next()
  if (done) { break }
  console.log(key)
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.keys.list.each do |key|
  puts key.to_json
end
```

</TabItem>
</Tabs>

---
title: Flavors
id: flavors
sidebar-position: 2
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Each type of value in the ledger is called a **flavor**. For example, if your
application manages multiple currencies, you might create a `USD` flavor,
an `EUR` flavor, and a `CNY` flavor.

Once a flavor is created, you can issue tokens of that flavor into an account.

Sequence represents amounts as integers in the range 0 to 2^63 - 1
(9,223,372,036,854,775,807).

It you want to represent an amount outside this range,
such as Ethereum's `wei`, which has amounts in the range 0 to 2^256
we recommend using a smaller unit, such as `gwei` (aka `shannon`, `nanoether`).

### ID

A flavor ID is a user-defined, unique identifier. If you do not provide one, one will be automatically generated for you.

### Keys &amp; Quorum

When creating a flavor, you provide one or more keys and a quorum. The quorum is the number of keys that must sign a transaction in order to issue tokens of the flavor into the ledger. By default, the quorum is equal to the number of keys provided, but you can choose to require only a subset of keys – for example, 2-of-3.

### Flavor Tags

Flavor tags are user-defined key-value pairs associated with the flavor. Flavor tags are useful for grouping different flavors together for the purpose of querying tokens or actions.

For example, if you have three different flavors that all represent points – **points earned**, **points gifted**, and **points promo**, they could all have the tag `"type": "point"`. Then, when you want to query the total amount of all "points" issued, you would provide the following filter to the sum actions query:

<Tabs>
<TabItem value='java' label='Java'>

```java
type='issue' AND snapshot.flavorTags.type='point'
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
type='issue' AND snapshot.flavorTags.type='point'
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
type='issue' AND snapshot.flavor_tags.type='point'
```

</TabItem>
</Tabs>

This would return a single aggregate sum of all actions issuing tokens across all three flavors.

#### Tags snapshot
When a new [action](actions.md) is added to a ledger via a [transaction](transactions.md), a snapshot of the flavor tags as they exist at that time are added to the `snapshot` object in the [action object](actions.md).

You can then provide a filter to access the tags snapshot when querying actions. For example:

<Tabs>
<TabItem value='java' label='Java'>

```java
snapshot.flavorTags.type='point'
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
snapshot.flavorTags.type='point'
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
snapshot.flavor_tags.type='point'
```

</TabItem>
</Tabs>


#### Updating tags
You can update flavor tags at any time. These new tags will be added to the snapshot on any new actions going forward. Snapshots on existing actions will not be affected.

### Data Structure

#### Field Descriptions

| Field   | Type        | Description                                                                         |
|:--------|:------------|:------------------------------------------------------------------------------------|
| id      | string      | Unique identifier of the flavor, user-supplied or system-generated.                 |
| tags    | JSON object | Arbitrary, user-supplied, key-value data about the flavor.                          |
| key ids | array       | A list of ids of the keys that control issuance of the flavor.                      |
| quorum  | integer     | The number of keys from which signatures are required to issue units of the flavor. |

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
<TabItem value='node' label='Node.js'>

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

### SDK Examples

#### Create a flavor

<Tabs>
<TabItem value='java' label='Java'>

```java
Flavor usd = new Flavor.Builder()
  .setId("usd")
  .addKeyId(key.id)
  .addTag("type", "currency")
  .create(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.flavors.create({
  id: 'usd',
  keyIds: [key.id],
  tags: {type: 'currency'}
}).then(usd => ...)
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
usd = ledger.flavors.create(
  id: 'usd',
  key_ids: [key.id],
  tags: {type: 'currency'}
)
```

</TabItem>
</Tabs>

#### Update flavor tags

<Tabs>
<TabItem value='java' label='Java'>

```java
new Flavor.TagUpdateBuilder()
  .setId("usd")
  .addTag("type", "fiat")
  .update(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.flavors.updateTags({
  id: 'usd',
  tags: {type: 'fiat'}
}).then(usd => ...)
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.flavors.update_tags(
  id: 'usd',
  tags: {type: 'fiat'}
)
```

</TabItem>
</Tabs>

#### Query flavors

Query all "currency" flavors.

<Tabs>
<TabItem value='java' label='Java'>

```java
Flavor.ItemIterable flavors = new Flavor.ListBuilder()
  .setFilter("tags.type=$1")
  .addFilterParameter("fiat")
  .getIterable(ledger);
for (Flavor flavor : flavors) {
  System.out.println("flavor": " + flavor.id);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let all = ledger.flavors.list({
  filter: 'tags.type=$1',
  filterParams: ['fiat']
}).all()

while (true) {
  let { value: flavor, done: done } = await all.next()
  if (done) { break }
  console.log(flavor)
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.flavors.list(
  filter: 'tags.type=$1',
  filter_params: ['fiat']
).each do |flavor|
  puts flavor.to_json
end
```

</TabItem>
</Tabs>

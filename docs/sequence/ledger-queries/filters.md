---
title: Query Filters
id: filters
sidebar-position: 2
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**Filters** allow:

1. narrowing results of a query to those containing specific values.
2. narrowing the selection of tokens when building a transaction to those with
tags.

A filter is composed of one or more **terms**, with multiple terms joined with
`AND` and `OR`. Each term contains a **property**, **operator**, and **value**.
Each term targets a specific field in the key-value (JSON) object. Terms can be
grouped together in a **scope** to target a specific array of sub-objects within
an object.

For example, to list transactions where Alice transferred USD, you would create
a filter with three terms, scoped to the actions array:

<Tabs>
<TabItem value='java' label='Java'>

```java
actions(type='transfer' AND sourceAccountId='alice' AND flavorId='USD')
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
actions(type='transfer' AND sourceAccountId='alice' AND flavorId='USD')
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
actions(type='transfer' AND source_account_id='alice' AND flavor_id='USD')
```

</TabItem>
</Tabs>


### Properties

Any field in a JSON object can be used as a filter property. To use a field that
is nested within another field, provide the path to it, starting with the
outermost parent object. For example:

<Tabs>
<TabItem value='java' label='Java'>

```java
snapshot.flavorTags.type
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
snapshot.flavorTags.type
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
snapshot.flavor_tags.type
```

</TabItem>
</Tabs>

Note: although you can create tags with any valid JSON object,
you can only query fieldnames that contain **letters**, **numbers**, and
**underscores**.

### Operators

For all fields, filters currently support the `=` operator, which allows you to search for
exact matches of **string** and **integer** values. Other data types, such as
booleans, are not supported.

#### Inequalities on timestamps fields
Inequality operators (&lt;, &gt;, &lt;=, &gt;=) are supported on timestamp fields – both the built-in `timestamp` fields in the action and transaction objects, and arbitrary user-provided timestamps in any tags field.

The value of all timestamp field inequalities must be a string in RFC3339 timestamp format with the `Z` time zone:

```
2018-05-02T20:43:57.917Z
```

The property must also be appending with a `:time` type indicator:

```
tags.expiration:time > 2018-05-02T20:43:57.917Z
```

#### Inline and parameterized values
There are two methods of providing search values to the operator. First, you
can include them inline, surrounded by single quotes:

```
id='alice'
```

Alternatively, you can specify a parameterized filter, without single quotes:

```
id=$1 OR id=$2
```

When using parameterized filters, you should also provide an ordered set of
values for the parameters:

```
["bob-checking", "bob-savings"]
```

The SDKs support both parameterized and non-parameterized filters. The explorer
does **not** support parameterized filters.

### Scope

The transaction object contains an `actions` array. The `actions()` filter scope allows
targeting a specific action within that array.

For example, the following will return transactions where Alice received gold:

<Tabs>
<TabItem value='java' label='Java'>

```java
actions(destinationAccountId=alice' AND flavorId='gold')
```

</TabItem>
<TabItem value='js' label='Node.js'>

```js
actions(destinationAccountId=alice' AND flavorId='gold')
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
actions(destination_account_id=alice' AND flavor_id='gold')
```

</TabItem>
</Tabs>

### Example
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
<TabItem value='js' label='Node.js'>

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
page1 = ledger.actions.list({
  filter: 'destination_account_id=$1 AND flavor_id=$2 AND type=$3',
  filter_params: ['alice', 'usd', 'issue']
}).page(size: 10)

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

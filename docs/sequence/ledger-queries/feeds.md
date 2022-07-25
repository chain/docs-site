---
title: Feeds
id: feeds
sidebar-position: 6
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Feeds allow you to sequentially process [actions](../ledger-objects/actions.md) and [transactions](../ledger-objects/transactions.md) as they are added to a ledger, without the need for polling or keeping state in your application. This is helpful for:

* Real-time applications, such as notifications or live-updating interfaces
* Microservice architectures, where one service creates transactions and another service performs some operation in response


### Order of items
A feed provides items in chronological order, starting at the time the feed is created. (This is different from listing actions and transactions, which provides items in reverse chronological order.)

### Efficiency
Under the hood, the SDK reads data from a feed using a long-polling mechanism. This ensures that network round trips between your application and Sequence are kept to a minimum.

### At-least-once-delivery

Transaction feeds provide at-least-once delivery of items; occasionally, an item may be delivered multiple times. Regardless of how frequently you acknowledge, it’s a good idea to design your feed processing to be idempotent, so that your application can process a given item twice or more without adverse effects.

### Concurrency
Reading from a transaction feed may block your active process, so if your application does more than just consume a transaction feed, you should run the processing loop in its own thread.

In general, you should consume a transaction feed in one and only one thread. In particular, you’ll want to make sure that next and ack are called serially, within a single thread.

### Data Structure

#### Field Descriptions

| Field         | Type                     | Description                                                                       |
|:--------------|:-------------------------|:----------------------------------------------------------------------------------|
| type          | string                   | The type of feed – `action` or `transaction`.                                     |
| id            | string                   | User-supplied or system-assigned unique identifier of the feed.                   |
| filter        | string                   | The filter that determines which items get returned in the feed.                  |
| filter params | array of strings or ints | The ordered set of values for any placeholders (e.g `$1`) included in the filter. |
| cursor        | string                   | A pointer to the the last item acknowledged in the feed.                          |

#### Example Object

<Tabs>
<TabItem value='java' label='Java'>

```java
{
  type: "",
  id: "",
  filter: "",
  filterParams: [],
  cursor: ""
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
{
  type: "",
  id: "",
  filter: "",
  filterParams: [],
  cursor: ""
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
{
  type: "",
  id: "",
  filter: "",
  filter_params: [""],
  cursor: ""
}
```

</TabItem>
</Tabs>

### Examples

#### Create a feed

Feeds can be created either in the dashboard, or from your application. When creating a feed, you can provide a **filter** so that the feed only returns items matching the filter. If you don’t supply a filter, the feed will return all new items (transactions or actions) as they are added to the ledger.

<Tabs>
<TabItem value='java' label='Java'>

```java
Feed<Action> feed = new Feed<Action>.Builder()
  .setId("issuances")
  .setFilter("type=$1")
  .addFilterParameter("issue")
  .create(ledger);
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let feed = await ledger.feeds.create({
  type: 'action',
  id: 'issuances',
  filter: 'type=$1',
  filterParams: ['issue']
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
feed = ledger.feeds.create(
  type: 'action',
  id: 'issuances',
  filter: 'type=$1',
  filterParams: ['issue']
)
```

</TabItem>
</Tabs>

#### Process a feed

<Tabs>
<TabItem value='java' label='Java'>

```java
// Get feed
Feed<Action> feed = Feed.Action.get("issuances", ledger);

//Process feed item
for (Action action : feed) {
  // do something here to process the action in your application
  feed.ack();
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
// Get feed
let feed = await ledger.feeds.get(id: 'issuances')

// Process feed item
while (true) {
  let { value: action } = await feed.next()
  // do something here to process the action in your application
  await feed.ack()
}
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
# Get feed
feed = ledger.feeds.get(id: 'issuances')

# Process feed item
feed.consume do |action|
  # do something here to process the action in your application
  feed.ack
end
```

</TabItem>
</Tabs>
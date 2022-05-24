---
title: Pagination
id: pagination
sidebar-position: 3
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Results of both [list queries](list-queries.md) and [sum queries](sum-queries.md) are paginated.

There are two methods for handling paginated results:

1. **Retrieve a page of results at a time** – useful for implementing pagination in an end-user application, such as infinite scroll.
2. **Iterate though individual results** - useful for processing results in an application, such as generating a report (where pages are incidental).

### Retrieving pages
Each page contains a **cursor**. To retrieve the next page, you perform another query, providing the cursor from the previous page.

The cursor contains all details about the query (e.g. filter, group by, and page size parameters), so you do not need to provide those when retrieving a subsequent page.

The default page size for all page queries is `100`. You can optionally provide a different page size when making the request.

<Tabs>
<TabItem value='java' label='Java'>

```java
Action.Page page1 = new Action.ListBuilder()
  .setFilter("destinationAccountId=$1")
  .addFilterParameter("alice")
  .setPageSize(10)
  .getPage(ledger);
for (Action action : page1.items) {
  System.out.println("action: " + action.type);
  System.out.println("flavor: " + action.flavorId);
  System.out.println("amount: " + action.amount);
}

String cursor = page1.cursor;

Action.Page page2 = new Action.ListBuilder()
  .getPage(ledger, cursor);
for (Action action : page2.items) {
  System.out.println("action: " + action.type);
  System.out.println("flavor: " + action.flavorId);
  System.out.println("amount: " + action.amount);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
const page1 = await ledger.actions.list({
  filter: 'destinationAccountId=$1',
  filterParams: ['alice']
}).page({size: 10})

page1.items.forEach(action => {
  console.log("action: ", action.type)
  console.log("flavor: ", action.flavorId)
  console.log("amount: ", action.amount)
})

const cursor = page1.cursor

const page2 = await ledger.actions.list().page({cursor: cursor})

page2.items.forEach(action => {
  console.log("action: ", action.type)
  console.log("flavor: ", action.flavorId)
  console.log("amount: ", action.amount)
})
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
page1 = ledger.actions.list({
  filter: 'destination_account_id=$1',
  filter_params: ['alice']
}).page(size: 10)

page1.each do |action|
  puts "action: ", action.type
  puts "flavor: ", action.flavor_id
  puts "amount: ", action.amount
end

cursor = page1.cursor

page2 = ledger.actions.list.page(cursor: cursor)

page2.each do |action|
  puts "action: ", action.type
  puts "flavor: ", action.flavor_id
  puts "amount: ", action.amount
end
```

</TabItem>
</Tabs>

### Iterating results
When iterating results, you do not need to interact with the underlying pages, which will be fetched automatically by the SDK when necessary.

<Tabs>
<TabItem value='java' label='Java'>

```java
Action.Iterable actions = new Action.ListBuilder()
  .setFilter("destinationAccountId=$1")
  .addFilterParameter("alice")
  .getIterable(ledger);
for (Action action : actions) {
  System.out.println("action: " + action.type);
  System.out.println("flavor: " + action.flavorId);
  System.out.println("amount: " + action.amount);
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
let all = ledger.actions.list({
  filter: 'destinationAccountId=$1',
  filterParams: ['alice']
}).all()

while (true) {
  let { value: action, done: done } = await all.next()
  if (done) { break }
  console.log("action: ", action.type)
  console.log("flavor: ", action.flavorId)
  console.log("amount: ", action.amount)
}
```
</TabItem>
<TabItem value='ruby' label='Ruby'>

```ruby
ledger.actions.list(
  filter: 'destination_account_id=$1',
  filter_params: ['alice']
).each do |action|
  puts "action: ", action.type
  puts "flavor: ", action.flavor_id
  puts "amount: ", action.amount
end
```

</TabItem>
</Tabs>
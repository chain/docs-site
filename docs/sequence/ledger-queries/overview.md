---
title: Overview
id: overview
sidebar-position: 1
displayed_sidebar: sequence
---
Ledger objects in Sequence are represented as key-value JSON objects. To retrieve data, you perform a query with optional parameters.

### Query Types
There are two types of queries: **list queries** and **sum queries**.

#### List Query
A list query returns a time-ordered set of objects beginning with the most recent. All objects support the list query.

For details and examples, see [List Queries](list-queries.md).

#### Sum Query
A sum query is an aggregate over the **amount** fields in a list of objects. Only **actions** and **tokens** support the sum query.

For details and examples, see [Sum Queries](sum-queries.md).

### Query Parameters

#### Filters
The primary query parameter is a **filter**, which allows targeting specific fields in a set of objects.

For details and examples, see [Filters](filters.md).


#### Group By
Sum queries on **actions** and **tokens** also accept a **group by** query parameter that indicates how amounts should be summed.

The query will sum the amounts in the resulting set of actions or tokens where the values of the "group" field are identical. This is analogous to the "GROUP BY" clause in SQL.

For details and examples, see [Group By](sum-queries.md) in [Sum Queries](sum-queries.md).

### Pagination
Results of all queries are paginated. There are two methods for handling these:

1. **Retrieving a page of results at a time** – useful for implementing pagination in an end-user application, such as infinite scroll.
2. **Iterating though individual results** - useful for processing results in an application, such as generating a report (where pages are incidental).

For details and examples, see [Pagination](pagination.md).
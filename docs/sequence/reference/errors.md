---
title: Errors
id: errors
sidebar-position: 5
displayed_sidebar: sequence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Errors

When the Sequence service encounters an error processing an SDK request, it will respond with:

1. an HTTP status code
2. a Sequence error code
3. a Sequence error message
4. a data object containing extra information (optional)

Some errors (as denoted in the table below) will instruct the SDK to
auto-retry with an exponential backoff until a timeout. If it succeeds,
it will not return the error, but if it reaches the timeout, it will
return the error.

The SDKs manage idempotency of requests and retries.
In most cases, it should not be necessary to implement
your own retry logic in addition to what the SDKs provide.

If your application has an operation with multiple Sequence requests
that fails partway through, it is safe to retry the step that failed
and continue from there, but not necessarily safe to start over.

| HTTP Status Code | Sequence Error Code | Sequence Error Message                                                      | Auto-retry                                   |
|:-----------------|:--------------------|:----------------------------------------------------------------------------|:---------------------------------------------|
| 400              | SEQ008              | One or more fields are missing                                              | No                                           |
| 400              | SEQ050              | Alias already exists                                                        | No                                           |
| 400              | SEQ051              | Provided fields are exclusive in respect to each other                      | No                                           |
| 400              | SEQ052              | Invalid key ID                                                              | No                                           |
| 400              | SEQ200              | Quorum must be greater than 1 and less than or equal to the length of xpubs | No                                           |
| 400              | SEQ201              | Invalid xpub format                                                         | No                                           |
| 400              | SEQ203              | Retrieved type does not match expected type                                 | No                                           |
| 400              | SEQ204              | Root XPubs cannot contain the same key more than once                       | No                                           |
| 400              | SEQ600              | Malformed pagination parameter `after`                                      | No                                           |
| 400              | SEQ601              | Incorrect number of arguments to filter                                     | No                                           |
| 400              | SEQ602              | Malformed query filter                                                      | No                                           |
| 400              | SEQ610              | Invalid interval                                                            | No                                           |
| 400              | SEQ706*             | One or more actions had an error: see attached data                         | Depends on the error contained in the action |
| 400              | SEQ707              | No actions specified for transaction builder                                | No                                           |
| 500              | SEQ708              | Unexpected item in transaction                                              | No                                           |
| 400              | SEQ709              | Wrong number of signatures                                                  | No                                           |
| 400              | SEQ710              | Transaction unbalanced                                                      | No                                           |
| 400              | SEQ711              | Transaction exceeds allowed runlimit. Use fewer actions.                    | No                                           |
| 400              | SEQ735              | Transaction rejected                                                        | No                                           |
| 500              | SEQ739              | Error retrieving transaction after submission                               | Yes                                          |

### Nested Errors

When making a transaction, errors will be returned for individual actions
to make it easier to identify what went wrong. The following errors are
returned as sub-errors of `SEQ706` in the optional `data` field:

| HTTP Status Code | Sequence Error Code | Sequence Error Message                                                      | Auto-retry                                   |
|:-----------------|:--------------------|:----------------------------------------------------------------------------|:---------------------------------------------|
| 400              | SEQ701              | Invalid action type                                                         | No                                           |
| 400              | SEQ702              | Invalid ID on action                                                        | No                                           |
| 400              | SEQ703              | Invalid action object                                                       | No                                           |
| 400              | SEQ704              | Invalid amount in action                                                    | No                                           |
| 400              | SEQ760              | Insufficient funds for transaction                                          | No                                           |
| 400              | SEQ761              | Some outputs are reserved; try again                                        | Yes                                          |
| 400              | SEQ762              | Specified asset ID does not match asset ID in output                        | No                                           |

Here's an example of accessing action errors in the SDK:

<Tabs>
<TabItem value='java' label='Java'>

```java
try {
  new Transaction.Builder()
    .addAction(
      new Transaction.Builder.Action.Issue()
        .setFlavorId("fake")
        .setAmount(1)
        .setDestinationAccountId("alice")
    ).transact(ledger);
} catch (APIException e) {
  APIException actionError = e.data.actions.get(0);

  System.out.println(actionError.getMessage());
  // Code: SEQ702 Message: Invalid id on action

  System.out.println(actionError.seqCode);
  // SEQ702

  System.out.println(actionError.data.index);
  // 0, index of action that failed
}
```

</TabItem>
<TabItem value='node' label='Node.js'>

```js
ledger.transactions.transact(builder => {
  builder.issue({
    flavorId: 'fake',
    amount: 1,
    destinationAccountId: 'alice',
  })
}).then(
  () => { /* success */},
  err => {
    let actionError = err.data.actions[0]

    console.log(actionError.message)
    // Invalid id on action

    console.log(actionError.seqCode)
    // SEQ702

    console.log(actionError.data.index)
    // 0, index of action that failed
  }
)
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

begin
  ledger.transactions.transact do |builder|
    builder.issue(
      flavor_id: 'fake',
      amount: 1,
      destination_account_id: 'alice',
    )
  end
rescue Sequence::APIError => e
  action_error = JSON.parse(e.response.body)['data']['actions'][0]

  p action_error['message']
  // Invalid id on action

  p action_error['seq_code']
  // SEQ702

  p action_error['data']['index']
  // 0, index of action that failed
end

</TabItem>
</Tabs>
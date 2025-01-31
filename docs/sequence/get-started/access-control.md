---
title: Access Control
id: access-control
sidebar-position: 4
displayed_sidebar: sequence
---
Access control is defined at the team level.

Within a team, you can create **people** and **systems** and control their access with **roles**.

Roles apply to two areas of access:

* **Team dashboard** - available to people via a **web browser** with an **email** and **password**.
* **Ledger API** - available to people and systems via an **SDK** with an **API credential**.

### People
People are human users on your team that can access the team dashboard and Ledger API.

#### Invite people

You can invite people to your team by visiting the team dashboard and selecting the "People" tab in the team navigation bar.

You will be asked to provide an email address and assign a [role](#roles).

The person will receive an email asking them to create an account on your team with an **email address** and **password**. They will use these to login to your **team dashboard** at `https://<team>.sequence.chain.com`.

#### Personal API Credentials
People who are developing applications on top of a ledger can also access the **Ledger API** from their local machines using **Personal API Credentials**, which are created in the team dashboard:

1. Click the user account menu in the top right of the navigation bar
2. Select "Settings"
3. Scroll down to the "Personal API Credentials" section
4. Click the "New" button



### Systems
##### <label>Coming soon</label>

Systems are non-human users on your team &mdash; such as your staging and production environments &mdash; that can access the Ledger API.

### Roles

A role is an access control policy that can be assigned to people or systems. A role defines what each can do when accessing the team dashboard or Ledger API.

A role applies to all API credentials created for a person or system.

There are currently three roles:

* **Admin**

  * *Everything in readwrite and readonly, plus*
  * Can create and edit access controls (people, systems, and roles)

* **Readwrite**

  * *Everything in readonly, plus*
  * Can create and edit ledgers
  * Can create and edit objects inside ledgers (keys, accounts, flavors, and feeds)
  * Can sign transactions (to transfer and issue tokens)

* **Readonly**

  * Can view access controls (people, systems, and roles)
  * Can view ledgers
  * Can view objects inside ledgers (keys, accounts, flavors, and feeds)
  * Can query ledger data (transactions, actions, and tokens)

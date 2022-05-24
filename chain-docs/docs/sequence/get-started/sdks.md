---
title: SDKs
id: sdks
sidebar_position: 5
displayed_sidebar: sequence
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To interact with a ledger from your application, you'll need an SDK. SDKs are
available for **Java**, **Node**, and **Ruby**.

Use the language dropdown in the left-hand navigation of this page
to switch the programming language displayed for all documentation.

<Tabs>
<TabItem value='java' label='Java'>

The Java SDK is available via the <a
  href='https://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.seq%22%20AND%20a%3A%22sequence-sdk%22'
  target='_blank'>Maven Central Repository</a>.
Java 8, 9, and 10 are supported.

Maven users should add the following to `pom.xml`:

```xml
<dependencies>
  <dependency>
    <groupId>com.seq</groupId>
    <artifactId>sequence-sdk</artifactId>
    <version>[2.2,3)</version>
  </dependency>
</dependencies>
```

Gradle users should add the following to `build.gradle`:

```java
compile 'com.seq:sequence-sdk:2.2'
```

Then use the following `import` statements in your code:

```java
import com.seq.api.*;
import com.seq.http.*;
import com.seq.exception.*;
```
</TabItem>
<TabItem value='node' label='Node.js'>

The Node.js SDK is available via <a href='https://www.npmjs.com/package/sequence-sdk' target='_blank'>NPM</a>. Node 4 or greater is required.

To install, add the following to your `package.json`:

```js
{
  "dependencies": {
    "sequence-sdk": "~2.2.0"
  }
}
```

Then use the following `import` statement in your code:

```js
const sequence = require('sequence-sdk')
```

</TabItem>
<TabItem value='ruby' label='Ruby'>

The Ruby SDK is available via
<a href='https://rubygems.org/gems/sequence-sdk' target='_blank'>RubyGems</a>.
Ruby 2.3 or greater is required.

To install, add the following to your `Gemfile`:

```ruby
gem 'sequence-sdk', '~> 2.2', require: 'sequence'
```

</TabItem>
</Tabs>
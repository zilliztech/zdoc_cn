---
displayed_sidbar: javaSidebar
title: "clientIsReady() | Java | v2"
slug: /java/java/v2-Client-clientIsReady
sidebar_label: "clientIsReady()"
added_since: v2.6.x
last_modified: v2.6.x
deprecate_since: false
beta: false
notebook: false
description: "This operation checks whether the client connection to the server is ready. | Java | v2"
type: docx
token: I1sMd0t6qoNuIWx3mjecEfjwnyc
sidebar_position: 3
keywords: 
  - Video similarity search
  - Vector retrieval
  - Audio similarity search
  - Elastic vector database
  - zilliz
  - zilliz cloud
  - cloud
  - clientIsReady()
  - javaV226
displayed_sidebar: javaSidebar

---

import Admonition from '@theme/Admonition';


# clientIsReady()

This operation checks whether the client connection to the server is ready.

```java
public boolean clientIsReady()
```

**RETURNS:**

*boolean*

Returns **true** if the client is connected and ready, **false** otherwise.

## Example

```java
boolean ready = client.clientIsReady();
System.out.println("Client ready: " + ready);
```

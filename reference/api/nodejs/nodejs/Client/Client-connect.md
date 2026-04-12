---
displayed_sidbar: nodeSidebar
title: "connect() | Node.js"
slug: /node/node/Client-connect
sidebar_label: "connect()"
added_since: v2.3.x
last_modified: false
deprecate_since: false
beta: false
notebook: false
description: "This method connects to the Zilliz Cloud cluster using the optionally specified SDK version. | Node.js"
type: docx
token: SkLsdMpB7oiZLMx8T04cCd9Knqf
sidebar_position: 4
keywords: 
  - milvus vector database
  - milvus db
  - milvus vector db
  - Zilliz Cloud
  - zilliz
  - zilliz cloud
  - cloud
  - connect()
  - nodejs26
displayed_sidebar: nodeSidebar

---

import Admonition from '@theme/Admonition';


# connect()

This method connects to the Zilliz Cloud cluster using the optionally specified SDK version.

```javascript
connect(sdkVersion): void
```

## Request Syntax

```javascript
connect({
    sdkVersion: string
})
```

**PARAMETERS:**

- **sdkVersion** (*string*) -

    **[REQUIRED]**

    The version of your Node.js SDK.

**RETURNS** *void*

This method returns nothing.

## Example

```java
connect(2.3.5)
```


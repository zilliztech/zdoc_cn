---
displayed_sidbar: pythonSidebar
title: "close() | Python | MilvusClient"
slug: /python/python/Client-close
sidebar_label: "close()"
beta: false
notebook: false
description: "This operation closes the current Milvus client. | Python | MilvusClient"
type: docx
token: CWZGd48FJoFHXYx40NMcTd2FnKc
sidebar_position: 1
keywords: 
  - vector database example
  - rag vector database
  - what is vector db
  - what are vector databases
  - zilliz
  - zilliz cloud
  - cloud
  - close()
  - pymilvus25
displayed_sidebar: pythonSidebar

---

import Admonition from '@theme/Admonition';


# close()

This operation closes the current Milvus client.

## Request syntax

```python
close() -> None
```

**PARAMETERS:**

None

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**Exceptions:**

None

## Examples

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="https://inxx-xxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com:19530",
    token="user:password"
)

# 2. Close the client
client.close()
```


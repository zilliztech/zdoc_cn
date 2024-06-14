---
displayed_sidbar: pythonSidebar
slug: /python/python/Client-close
beta: FALSE
notebook: FALSE
type: docx
token: CWZGd48FJoFHXYx40NMcTd2FnKc
sidebar_position: 1
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
    uri="https://inxx-xxxxxxxxxxxx.api.gcp-us-west1.cloud.zilliz.com.cn:19530",
    token="user:password"
)

# 2. Close the client
client.close()
```


---
title: "create_user() | Python | MilvusClient"
slug: /python/python/Authentication-create_user
sidebar_label: "create_user()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "Adds optional description. Async variant shares the sync method parameter and response contract. | Python | MilvusClient"
type: docx
token: EglSdm1jkozDSlxq6SEc4CRonVe
sidebar_position: 4
keywords: 
  - sentence transformers
  - Recommender systems
  - information retrieval
  - dimension reduction
  - zilliz
  - zilliz cloud
  - cloud
  - create_user()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# create_user()

Adds optional description. Async variant shares the sync method parameter and response contract.

## Request Syntax\{#request-syntax}

```python
create_user(
    user_name: str,
    password: str,
    timeout: Optional[float] = None,
    description: Optional[str] = None,
    **kwargs,
) -> None
```

**PARAMETERS:**

- **user_name** (*str*) -
**[REQUIRED]**
The name of the user account to create.

- **password** (*str*) -
**[REQUIRED]**
The password for the new user account.

- **timeout** (*Optional[float]*) -
Default: `None`
The maximum time, in seconds, to wait for the RPC to complete.

- **description** (*Optional[str]*) -
Default: `None`
The optional description of the user account.

- **kwargs** (*Any*) -
The additional request context options.

**RETURN TYPE:**

*None*

**RETURNS:**

Returns no value after the user is created successfully.

**EXCEPTIONS:**

- **MilvusException**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples\{#examples}

Demonstrates create user usage.

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT", token="YOUR_CLUSTER_TOKEN")
client.create_user("analyst", "Milvus123", description="Analytics account")
client.update_user("analyst", description="Updated analytics account")
client.create_role("read_only", description="Read-only role")
client.alter_role("read_only", description="Updated read-only role")
print(client.describe_user("analyst"))
print(client.describe_role("read_only"))
```

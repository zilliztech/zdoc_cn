---
displayed_sidbar: javaSidebar
title: "listRoles() | Java | v2"
slug: /java/java/v2-Authentication-listRoles
sidebar_label: "listRoles()"
beta: false
notebook: false
description: "This operation lists all custom roles. | Java | v2"
type: docx
token: XIIyd3bMzoAVx3xVsoLcnQ2pnKh
sidebar_position: 9
keywords: 
  - Chroma vs Milvus
  - Annoy vector search
  - milvus
  - Zilliz
  - zilliz
  - zilliz cloud
  - cloud
  - listRoles()
  - javaV225
displayed_sidebar: javaSidebar

---

import Admonition from '@theme/Admonition';


# listRoles()

This operation lists all custom roles.

```java
public List<String> listRoles()
```

## Request Syntax

```java
MilvusClientV2 client = new MilvusClientV2(connectConfig);

List<String> roles = client.listRoles();
```

**RETURN TYPE:**

*List\<String\>*

**RETURNS:**

A list of strings containing the role names.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
List<String> roles = client.listRoles();
```


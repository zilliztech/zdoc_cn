---
displayed_sidbar: javaSidebar
title: "commit() | Java | v2"
slug: /java/java/v2-LocalBulkWriter-commit
sidebar_label: "commit()"
beta: false
notebook: false
description: "This operation commits the appended data. | Java | v2"
type: docx
token: OUhTdWnXBoHqKdxTA0HcdMY5n4b
sidebar_position: 3
keywords: 
  - Zilliz Cloud
  - what is milvus
  - milvus database
  - milvus lite
  - zilliz
  - zilliz cloud
  - cloud
  - commit()
  - javaV225
displayed_sidebar: javaSidebar

---

import Admonition from '@theme/Admonition';


# commit()

This operation commits the appended data.

```java
 public void commit(boolean async)
```

## Request Syntax

```java
localBulkWriter.commit(
    boolean async
)
```

**PARAMETERS:**

- **async** (*boolean*) -

    Whether the commit operation returns immediately after being called.

**RETURN TYPE:**

*void*

## Examples

```java
localBulkWriter.commit(false);
```

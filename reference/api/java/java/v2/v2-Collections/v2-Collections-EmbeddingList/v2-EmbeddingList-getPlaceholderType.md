---
displayed_sidbar: javaSidebar
title: "getPlaceholderType() | Java | v2"
slug: /java/java/v2-EmbeddingList-getPlaceholderType
sidebar_label: "getPlaceholderType()"
added_since: v2.6.x
last_modified: v2.6.x
deprecate_since: false
beta: false
notebook: false
description: "This getter returns the placeholder type of the embedding list, which indicates the vector data format. | Java | v2"
type: docx
token: D0UGdkudVo5vtLxlZw3c6cdqnmc
sidebar_position: 4
keywords: 
  - Unstructured Data
  - vector database
  - IVF
  - knn
  - zilliz
  - zilliz cloud
  - cloud
  - getPlaceholderType()
  - javaV226
displayed_sidebar: javaSidebar

---

import Admonition from '@theme/Admonition';


# getPlaceholderType()

This getter returns the placeholder type of the embedding list, which indicates the vector data format.

```java
public PlaceholderType getPlaceholderType()
```

**RETURNS:**

*PlaceholderType*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
EmbeddingList embeddingList = new EmbeddingList();
PlaceholderType type = embeddingList.getPlaceholderType();
```

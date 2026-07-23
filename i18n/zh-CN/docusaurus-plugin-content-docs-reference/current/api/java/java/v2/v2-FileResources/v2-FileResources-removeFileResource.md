---
title: "removeFileResource() | Java | v2"
slug: /java/java/v2-FileResources-removeFileResource
sidebar_label: "removeFileResource()"
beta: false
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "按名称删除之前上传的文件资源。如果删除的资源仍被活动 function 或 analyzer 引用，则会因错误而失败。 | Java | v2"
type: docx
token: I5yTdfJXNoHDICxSwWXcNjwxnoc
sidebar_position: 3
keywords: 
  - Dense vector
  - Hierarchical Navigable Small Worlds
  - Dense embedding
  - Faiss vector database
  - zilliz
  - zilliz cloud
  - cloud
  - removeFileResource()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# removeFileResource()

按名称删除之前上传的文件资源。如果删除的资源仍被活动 function 或 analyzer 引用，则会因错误而失败。

```java
public void removeFileResource(RemoveFileResourceReq request)
```

## 请求语法\{#request-syntax}

```java
removeFileResource(RemoveFileResourceReq.builder()
    .name(String name)
    .build()
);
```

**BUILDER 方法：**

- `name(String name)` -

    **[必需]**

    要删除的文件资源的名称。

**返回：**

*void*

**异常：**

- **MilvusClientException**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.service.utility.request.RemoveFileResourceReq;

client.removeFileResource(RemoveFileResourceReq.builder()
    .name("stopwords")
    .build());
```

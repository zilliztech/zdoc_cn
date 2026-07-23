---
title: "alterAlias() | Java | v2"
slug: /java/java/v2-Collections-alterAlias
sidebar_label: "alterAlias()"
beta: false
added_since: v2.3.x
last_modified: v2.5.x
deprecate_since: false
notebook: false
description: "此操作将一个 collection 的别名重新分配给另一个 collection。 | Java | v2"
type: docx
token: Fv8EdYIt4oThstxgpzqcm7C0nug
sidebar_position: 1
keywords: 
  - Vector index
  - vector database 开源
  - 开源 vector db
  - vector database 示例
  - zilliz
  - zilliz cloud
  - cloud
  - alterAlias()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# alterAlias()

此操作将一个 collection 的别名重新分配给另一个 collection。

```java
public void alterAlias(AlterAliasReq request)
```

## 请求语法\{#request-syntax}

```java
alterAlias(AlterAliasReq.builder()
    .alias(String alias)
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER 方法：**

- `alias(String alias)`

    collection 的别名。请注意，该别名应事先存在。

    <Admonition type="info" icon="📘" title="注意">

    什么是 collection 别名？
    
        collection 别名是 collection 的附加名称。当你希望在不修改代码的情况下将应用程序切换到新的 collection 时，collection 别名非常有用。
    
        在 Zilliz Cloud 上，collection 别名是全局唯一标识符。一个别名只能分配给一个 collection。反过来，一个 collection 可以有多个别名。
    
        以下是将一个 collection 的别名重新分配给另一个 collection 的示例：
    
        假设有两个 collection：`collection_1` 和 `collection_2`。还有一个名为 `bob` 的 collection 别名，该别名最初分配给 `collection_1`：
    
        - `collection_1` 的别名 = ["bob"]
    
        - `collection_2` 的别名 = []
    
        使用参数 `collection_2` 和 `bob` 调用 `alterAlias` 函数后：
    
        - `collection_1` 的别名 = []
    
        - `collection_2` 的别名 = ["bob"]

    </Admonition>

- `databaseName(String databaseName)`

    目标 collection 所属的 database 的名称。

- `collectionName(String collectionName)`

    要重新分配别名的目标 collection 的名称。

**返回：**

*void*

**异常：**

- **MilvusClientExceptions**

    在此操作期间发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.AlterAliasReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Alter the alias for collection "test"
AlterAliasReq alterAliasReq = AlterAliasReq.builder()
        .collectionName("test")
        .alias("test_alias2")
        .build();
client.alterAlias(alterAliasReq);
```


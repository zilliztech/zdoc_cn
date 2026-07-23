---
title: "LocalBulkWriter | Java | v2"
slug: /java/java/v2-DataImport-LocalBulkWriter
sidebar_label: "LocalBulkWriter"
beta: false
added_since: v2.5.x
last_modified: false
deprecate_since: false
notebook: false
description: "LocalBulkWriter 实例会在本地将你的原始数据重写为 Milvus 可理解的格式。| Java | v2"
type: docx
token: G7F9dQ8DwoZsaVxExdnc7K6an3g
sidebar_position: 5
keywords: 
  - 什么是 vector database
  - vectordb
  - 多模态 vector database 检索
  - 检索增强生成
  - zilliz
  - Zilliz Cloud
  - 云
  - LocalBulkWriter
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# LocalBulkWriter

**LocalBulkWriter** 实例会在本地将你的原始数据重写为 Milvus 可理解的格式。

```java
io.milvus.bulkwriter.LocalBulkWriter
```

## 构造函数\{#constructor}

通过 schema、输出路径、segment 大小和文件类型构造 **LocalBulkWriter** 实例。

<Admonition type="info" icon="📘" title="Notes">

**LocalBulkWriter** 对象用于在本地将你的原始数据重写为 Milvus 可理解的格式。

</Admonition>

```java
LocalBulkWriter(LocalBulkWriterParam bulkWriterParam)
```

**参数：**

- **bulkWriterParam** (*LocalBulkWriterParam*) -

    一个 [LocalBulkWriterParam](./v2-DataImport-LocalBulkWriter#localbulkwriterparam) 实例。

## LocalBulkWriterParam\{#localbulkwriterparam}

**LocalBulkWriterParam** 允许你在一个位置配置 **LocalBulkWriter** 实例的属性，以便实例化 **LocalBulkWriter** 类。

```java
LocalBulkWriterParam.newBuilder()
    .withCollectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)
    .withLocalPath(String localPath)
    .withChunkSize(long chunkSize)
    .withFileType(BulkFileType fileType)
    .withConfig(String key, Object val)
    .build()
```

**BUILDER 方法：**

- `withCollectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)`

    目标 collection 的 schema，通过实例化 **CreateCollectionReq.CollectionSchema** 定义。

- `withLocalPath(String localPath)`

    用于存放重写后数据的目录路径。

- `withChunkSize(long chunkSize)`

    文件 segment 的最大大小。重写原始数据时，Milvus 会将其拆分为多个 segment。

    该值默认为 **536,870,912** 字节，即 **512 MB**。

    <Admonition type="info" icon="📘" title="**How does BulkWriter segment my data?**">

    BulkWriter 对数据进行 segment 切分的方式会随目标文件类型而变化。
    
    如果生成的文件超过指定的 segment 大小，BulkWriter 会创建多个文件，并按序号命名，每个文件都不大于该 segment 大小。

    </Admonition>

- `withFileType(BulkFileType fileType)`

    输出文件的类型。可选项列在 [BulkFileType](./v2-DataImport-BulkFileType) 中。

- `withConfig(String key, Object val)`

    一个字典，用于指定处理 CSV 文件的可选配置。仅当你在 `withFileType()` 中将 `fileType` 设置为 `CSV` 时，此参数才适用。该字典包含以下字段：

    - **sep** (*string*) -

        CSV 文件的分隔符。该值必须是长度为 1 的字符串，默认为 `","`。不允许使用以下字符串：`"\0"`、`"\n"`、`"\r"`、`"""`。

    - **nullkey** (*string*) -

        表示 null 值的特殊字符串。该值默认为空字符串：`""`。

## 示例\{#example}

```java
import com.google.gson.JsonObject;
import io.milvus.bulkwriter.LocalBulkWriter;
import io.milvus.bulkwriter.LocalBulkWriterParam;
import io.milvus.bulkwriter.common.clientenum.BulkFileType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

private static void localWriter(CreateCollectionReq.CollectionSchema collectionSchema) throws Exception {
    LocalBulkWriterParam bulkWriterParam = LocalBulkWriterParam.newBuilder()
            .withCollectionSchema(collectionSchema)
            .withLocalPath("/tmp/bulk_writer")
            .withFileType(BulkFileType.PARQUET)
            .withChunkSize(128 * 1024 * 1024)
            .build();

    try (LocalBulkWriter localBulkWriter = new LocalBulkWriter(bulkWriterParam)) {
        // append rows
        Gson GSON_INSTANCE = new Gson();
        for (int i = 0; i < 10000; i++) {
            JsonObject row = new JsonObject();
            row.addProperty("path", "path_" + i);
            row.add("vector", GSON_INSTANCE.toJsonTree(GeneratorUtils.genFloatVector(DIM)));
            row.addProperty("label", "label_" + i);

            localBulkWriter.appendRow(row);
        }

        localBulkWriter.commit(false);
        List<List<String>> batchFiles = localBulkWriter.getBatchFiles();
        System.out.printf("Local writer done! output local files: %s%n", batchFiles);
    } catch (Exception e) {
        System.out.println("Local writer catch exception: " + e);
        throw e;
    }
}
```


---
title: "RemoteBulkWriter | Java | v2"
slug: /java/java/v2-DataImport-RemoteBulkWriter
sidebar_label: "RemoteBulkWriter"
beta: false
added_since: v2.5.x
last_modified: false
deprecate_since: false
notebook: false
description: "RemoteBulkWriter 实例会将您的原始数据以 Milvus 可理解的格式写入 AWS-S3-compatible bucket。 | Java | v2"
type: docx
token: XAIndF6XWoQzvRxDvpLcgEE1nEb
sidebar_position: 5
keywords: 
  - Zilliz database
  - 非结构化数据
  - vector database
  - IVF
  - zilliz
  - Zilliz Cloud
  - cloud
  - RemoteBulkWriter
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# RemoteBulkWriter

**RemoteBulkWriter** 实例会将您的原始数据以 Milvus 可理解的格式写入 AWS-S3-compatible bucket。

```java
io.milvus.bulkwriter.RemoteBulkWriter
```

## Constructor\{#constructor}

使用一组参数（例如 **schema**、**remote_path**、**connect_param,** 等）构造 **RemoteBulkWriter** 实例。

<Admonition type="info" icon="📘" title="Notes">

**RemoteBulkWriter** 对象用于将您的原始数据以 Milvus 可理解的格式重写到 AWS-S3-compatible 或 Microsoft Azure Blob Storage bucket 中。

</Admonition>

```java
public RemoteBulkWriter(RemoteBulkWriterParam bulkWriterParam)
```

**参数：**

- **bulkWriterParam** (*RemoteBulkWriterParam*) -

    一个 [RemoteBulkWriterParam](./v2-DataImport-RemoteBulkWriter#remotebulkwriterparam) 实例。

## RemoteBulkWriterParam\{#remotebulkwriterparam}

**RemoteBulkWriterParam** 允许您在一个位置为 **RemoteBulkWriter** 实例配置属性，以便您可以实例化 **RemoteBulkWriter** 类。

```java
RemoteBulkWriterParam.newBuilder()
    .withCollectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)
    .withConnectParam(StorageConnectParam connectParam)
    .withRemotePath(String remotePath)
    .withChunkSize(long chunkSize)
    .withFileType(BulkFileType fileType)
    .withConfig(String key, Object val)
    .build()
```

**构建器方法：**

- `withCollectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)`

    目标 collection 的 schema，通过实例化 CreateCollectionReq.CollectionSchema 定义。

- `withConnectParam(StorageConnectParam connectParam)`

    用于连接到远程 bucket 的参数，通过实例化 [StorageConnectParam](./v2-DataImport-RemoteBulkWriter#storageconnectparam) 定义。

- `withRemotePath(String remotePath)`

    用于保存重写后数据的目录路径。

- `withChunkSize(long chunkSize)`

    文件段的最大大小。在重写您的原始数据时，Milvus 会将其拆分为多个段。

    默认值为 **536,870,912** 字节，即 **512 MB**。

    <Admonition type="info" icon="📘" title="**How does BulkWriter segment my data?**">

    BulkWriter 对您的数据进行分段的方式因目标文件类型而异。
    
    如果生成的文件超过指定的段大小，BulkWriter 会创建多个文件，并按序号命名，每个文件都不大于段大小。

    </Admonition>

- `withFileType(BulkFileType fileType)`

    输出文件的类型。可用选项列在 [BulkFileType](./v2-DataImport-BulkFileType) 中。

- `withConfig(String key, Object val)`

    一个字典，用于指定处理 CSV 文件的可选配置。此参数仅在您在 `withFileType()` 中将 `fileType` 设置为 `CSV` 时适用。该字典包含以下字段：

    - **sep** (*string*) -

        CSV 文件的分隔符。该值必须是长度为 1 的字符串，默认值为 `","`。不允许使用以下字符串：`"\0"`、`"\n"`、`"\r"`、`"""`。

    - **nullkey** (*string*) -

        表示 null 值的特殊字符串。默认值为空字符串：`""`。

## StorageConnectParam\{#storageconnectparam}

**StorageConnectParam** 在 **AzureConnectParam** 和 **S3ConnectParam** 中实现。

### AzureConnectParam\{#azureconnectparam}

**AzureConnectParam** 准备用于连接到 Microsoft Azure Blob Storage container 的参数。

```java
AzureConnectParam.newBuilder()
    .withContainerName(String containerName)
    .withConnStr(String connStr)
    .withAccountUrl(String accountUrl)
    .withCredential(TokenCrendtial credential)
    .build()
```

**构建器方法：**

- `withContainerName(String containerName)`

    要连接的远程 Azure blob storage container 的名称。

- `withConnStr(String connStr)`

    Azure Storage account 的连接字符串，可解析为 account_url 和 credential。要生成连接字符串，请阅读[此链接](https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string)。

- `withAccountUrl(String accountUrl)`

    格式类似于 `https://<storage-account>.blob.core.windows.net` 的字符串。更多信息请阅读[此链接](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview)。

- `withCredential(TokenCrendtial credential)`

    该 account 的 account access key。更多信息请阅读[此链接](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys)。

### S3ConnectParam\{#s3connectparam}

S3ConnectParam 准备用于连接到 S3-compatible object storage bucket 的参数

```java
S3ConnectParam.newBuilder()
    .withCloudName(String cloudName)
    .withBucketName(String bucketName)
    .withEndpoint(String endpoint)
    .withAccessKey(String accessKey)
    .withSecretKey(String secretKey)
    .withSessionToken(String sessionToken)
    .withRegion(String region)
    .withHttpClient(OkHttpClient httpClient)
    .build()
```

**构建器方法：**

- `withCloudName(String cloudName)`

    提供 S3-compatible object storage 服务的云服务提供商。可用选项如下：

    - **MINIO** (MinIO)

    - **AWS** (AWS S3)

    - **GCP** (GCP Cloud Storage)

    - **ALI** (Alibaba Cloud OSS)

    - **TC** (Tencent Cloud COS)

- `withBucketName(String bucketName)`

    要连接的远程 bucket 的名称。

- `withEndpoint(String endpoint)`

    AWS-S3-compatible 服务的 URL。

    该值可以是 MinIO 服务的 URL，也可以是任何 AWS S3-compatible 公共服务的 URL。

- `withAccessKey(String accessKey)`

    用于验证对指定 bucket 的访问权限的 access key（用户 ID）。

- `withSecretKey(String secretKey)`

    用于验证对指定 bucket 的访问权限的 secret_key（密码）。

- `withSessionToken(String sessionToken)`

    您在 AWS S3 compatible 服务中的 account 的 session token。

- `withRegion(String region)`

    bucket 所在 region 的名称或 ID。

- `withHttpClient(OkHttpClient httpClient)`

    是否使用 OkHttp client 来建立到 AWS S3 compatible 服务的安全（TLS）连接。

## Example\{#example}

```java
import com.google.gson.JsonObject;

import io.milvus.bulkwriter.RemoteBulkWriter;
import io.milvus.bulkwriter.RemoteBulkWriterParam;
import io.milvus.bulkwriter.common.clientenum.BulkFileType;
import io.milvus.bulkwriter.common.clientenum.CloudStorage;
import io.milvus.bulkwriter.connect.S3ConnectParam;
import io.milvus.bulkwriter.connect.StorageConnectParam;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

private static List<List<String>> callRemoteWriter(CreateCollectionReq.CollectionSchema collectionSchema,
                                                   List<JsonObject> data) throws Exception {
    StorageConnectParam connectParam = S3ConnectParam.newBuilder()
                .withEndpoint(STORAGE_ENDPOINT)
                .withCloudName(CloudStorage.MINIO.getCloudName())
                .withBucketName(STORAGE_BUCKET)
                .withAccessKey(STORAGE_ACCESS_KEY)
                .withSecretKey(STORAGE_SECRET_KEY)
                .withRegion(STORAGE_REGION)
                .build();
    
    RemoteBulkWriterParam bulkWriterParam = RemoteBulkWriterParam.newBuilder()
            .withCollectionSchema(collectionSchema)
            .withRemotePath("bulk_data")
            .withFileType(BulkFileType.CSV)
            .withChunkSize(512 * 1024 * 1024)
            .withConnectParam(connectParam)
            .withConfig("sep", "|") // only take effect for CSV file
            .build();
    
    try (RemoteBulkWriter remoteBulkWriter = new RemoteBulkWriter(bulkWriterParam)) {
        for (JsonObject rowObject : data) {
            remoteBulkWriter.appendRow(rowObject);
        }
        remoteBulkWriter.commit(false);

        return remoteBulkWriter.getBatchFiles();
    } catch (Exception e) {
        throw e;
    }
}
```

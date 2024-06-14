---
slug: /import-data-via-sdks
sidebar_label: SDK
beta: FALSE
notebook: FALSE
type: origin
token: Xv4awWJZpiKoJjkPTlic98Mindc
sidebar_position: 3

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 通过 SDK 导入

本节将帮助你了解如何使用 SDK 的 BulkWriter 和 BulkImport API 向 Collection 中导入数据。

另外，您还可以参考我们的[快速入门指南](./data-import-zero-to-hero)。其中包含了数据准备和数据导入两个部分的内容。

## 安装依赖{#install-denpendencies}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>

<TabItem value='python'>

在终端中运行以下命令安装 **pymilvus** 和 **minio** 或将它们升级到最新的版本。

```shell
python3 -m pip install --upgrade pymilvus minio
```

</TabItem>

<TabItem value='java'>

- 如您使用 Apache Maven 管理项目, 在项目的 **pom.xml** 文件中添加如下内容：

```java
<dependency>
  <groupId>io.milvus</groupId>
  <artifactId>milvus-sdk-java</artifactId>
  <version>2.4.0</version>
</dependency>
```

- 如您使用 Gradle/Grails 管理项目, 执行如下命令：

```shell
compile 'io.milvus:milvus-sdk-java:2.4.0'
```

</TabItem>

</Tabs>

### 检查已准备数据{#check-prepared-data}

在您[使用 BulkWriter](./use-bulkwriter) 完成数据准备工作后，你会获得一个路径，指向准备好的数据文件。您可以使用如下代码来检查这些数据文件。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
from minio import Minio

# Third-party constants
YOUR_ACCESS_KEY = "YOUR_ACCESS_KEY"
YOUR_SECRET_KEY = "YOUR_SECRET_KEY"
YOUR_BUCKET_NAME = "YOUR_BUCKET_NAME"
YOUR_REMOTE_PATH = "YOUR_REMOTE_PATH"

client = Minio(
    endpoint="oss-cn-hangzhou.aliyuncs.com", 
    # 腾讯云请使用 "cos.ap-beijing-1.myqcloud.com"
    access_key=YOUR_ACCESS_KEY,
    secret_key=YOUR_SECRET_KEY,
    secure=True
)

objects = client.list_objects(
    bucket_name=YOUR_BUCKET_NAME,
    prefix=YOUR_REMOTE_PATH,
    recursive=True
)

print([obj.object_name for obj in objects])

# Output
#
# [
#     "folder/1/claps.npy",
#     "folder/1/id.npy",
#     "folder/1/link.npy",
#     "folder/1/publication.npy",
#     "folder/1/reading_time.npy",
#     "folder/1/responses.npy",
#     "folder/1/title.npy",
#     "folder/1/vector.npy"
# ]

```

</TabItem>

<TabItem value='java'>

```java
import io.minio.MinioClient;
import io.minio.Result;
import io.minio.messages.Item;

import java.util.Iterator;

// Third-party constants
String ACCESS_KEY = "YOUR_ACCESS_KEY";
String SECRET_KEY = "YOUR_SECRET_KEY";
String BUCKET_NAME = "YOUR_BUCKET_NAME";
String REMOTE_PATH = "YOUR_REMOTE_PATH";

MinioClient minioClient = MinioClient.builder()
        .withEndpoint("oss-cn-hangzhou.aliyuncs.com") 
        // 腾讯云请使用 "cos.ap-beijing-1.myqcloud.com"
        .credentials(ACCESS_KEY, SECRET_KEY)
        .build();
        
Iterable<Result<Item>> results = minioClient.listObjects(
    ListObjectsArgs.builder().bucket(BUCKET_NAME).prefix(REMOTE_PATH).build();
);

while (results.hasNext()) {
    Result<Item> result = results.next();
    System.out.println(result.get().objectName());
}

// Output
// [[1.parquet]]
```

</TabItem>
</Tabs>

### 创建 Collection 并导入数据{#create-collection-and-import-data}

准备好数据文件后，您需要先连接到 Zilliz Cloud 集群，根据数据集的格式创建相应的 Collection，并从存储桶中导入数据文件。

对于如何在 Zilliz Cloud 控制台上获取相关信息，可以参考 [Zilliz Cloud 控制台](./on-zilliz-cloud-console)。

<Admonition type="info" icon="📘" title="说明">

<p>为了成功导入数据，请确保目标 Collection 中的正在运行或待运行的导入任务不超过 10 个。</p>

</Admonition>

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

# set up your collection

## Zilliz Cloud constants
CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
CLUSTER_TOKEN = "YOUR_CLUSTER_TOKEN"
COLLECTION_NAME = "medium_articles"
API_KEY = "YOUR_CLUSTER_TOKEN"
CLUSTER_ID = "YOUR_CLUSTER_ID" # Zilliz Cloud 集群 ID，如 "in01-xxxxxxxxxxxxxxx"

## Third-party constants
YOUR_OBJECT_URL = "YOUR_OBJECT_URL"

# create a milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=CLUSTER_TOKEN
)

# prepare schema
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_schema=False
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="title", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=768)
schema.add_field(field_name="link", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="reading_time", datatype=DataType.INT64)
schema.add_field(field_name="publication", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="claps", datatype=DataType.INT64)
schema.add_field(field_name="responses", datatype=DataType.INT64)

schema.verify()

# prepare index parameters
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="vector",
    index_type="AUTOINDEX",
    metric_type="L2"
)

client.create_collection(
    collection_name="customized_setup",
    schema=schema,
    index_params=index_params
)# }
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.param.collection.CollectionSchemaParam;
import io.milvus.param.collection.FieldType;
import io.milvus.grpc.DataType;
import io.milvus.client.MilvusServiceClient;
import io.milvus.param.ConnectParam;
import io.milvus.param.IndexType;
import io.milvus.param.MetricType;
import io.milvus.param.collection.CreateCollectionParam;
import io.milvus.param.collection.LoadCollectionParam;
import io.milvus.param.index.CreateIndexParam;

// Configs for Zilliz Cloud cluster
String CLUSTER_ENDPOINT = "";
String TOKEN = "";
String API_KEY = "";
String CLUSTER_ID = ""; // Zilliz Cloud 集群 ID，如 "in01-xxxxxxxxxxxxxxx"
String CLOUD_REGION = "";
String COLLECTION_NAME = "";

// Third-party constants 
String OBJECT_URL = ""

// Define schema for the target collection
FieldType id = FieldType.newBuilder()
        .withName("id")
        .withDataType(DataType.Int64)
        .withPrimaryKey(true)
        .withAutoID(false)
        .build();

FieldType titleVector = FieldType.newBuilder()
        .withName("vector")
        .withDataType(DataType.FloatVector)
        .withDimension(768)
        .build();

FieldType title = FieldType.newBuilder()
        .withName("title")
        .withDataType(DataType.VarChar)
        .withMaxLength(512)
        .build();

FieldType link = FieldType.newBuilder()
        .withName("link")
        .withDataType(DataType.VarChar)
        .withMaxLength(512)
        .build();
        
FieldType readingTime = FieldType.newBuilder()
        .withName("reading_time")
        .withDataType(DataType.Int64)
        .build();
        
FieldType publication = FieldType.newBuilder()
        .withName("publication")
        .withDataType(DataType.VarChar)
        .withMaxLength(512)
        .build();

FieldType claps = FieldType.newBuilder()
        .withName("claps")
        .withDataType(DataType.Int64)
        .build();     
        
FieldType responses = FieldType.newBuilder()
        .withName("responses")
        .withDataType(DataType.Int64)
        .build();

CollectionSchemaParam schema = CollectionSchemaParam.newBuilder()
        .withEnableDynamicField(false)
        .addFieldType(id)
        .addFieldType(titleVector)
        .addFieldType(title)
        .addFieldType(link)
        .addFieldType(readingTime)
        .addFieldType(publication)
        .addFieldType(claps)
        .addFieldType(responses)
        .build();
        
// Create a collection with the given schema
ConnectParam connectParam = ConnectParam.newBuilder()
        .withUri(CLUSTER_ENDPOINT)
        .withToken(TOKEN)
        .build();

MilvusServiceClient milvusClient = new MilvusServiceClient(connectParam);

CreateCollectionParam collectionParam = CreateCollectionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withSchema(schema)
        .build();

milvusClient.createCollection(collectionParam);

CreateIndexParam indexParam = CreateIndexParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withFieldName("title_vector")
        .withIndexType(IndexType.AUTOINDEX)
        .withMetricType(MetricType.L2)
        .build();

milvusClient.createIndex(indexParam);

LoadCollectionParam loadCollectionParam = LoadCollectionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .build();

milvusClient.loadCollection(loadCollectionParam);
```

</TabItem>
</Tabs>

在上述代码中，`CLOUD_REGION` 代表您集群所在的云地域的 ID，`TOKEN` 是用于授权 API 请求的集群用户名和密码，`CLUSTER_ID` 是您的集群的 ID。在调用 API 时，请确保将这些占位符替换为您的实际值。您可以从集群的公共访问端点获取 `CLOUD_REGION` 和 `CLUSTER_ID`。例如，在公共访问端点 **https://in03-3bf3c31f4248e22.api.ali-hangzhou.cloud.zilliz.com.cn** 中，`CLOUD_REGION_ID` 是 **gcp-us-west1**，`CLUSTER_ID` 是 **in03-3bf3c31f4248e22**。有关更多信息，请参见[Zilliz Cloud 控制台](./on-zilliz-cloud-console)。

## 导入数据{#import-data}

在待导入数据和 Collection 都准备就绪后，可以使用如下脚本将数据导入 Collection。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
from pymilvus import bulk_import

# Bulk-import your data from the prepared data files

res = bulk_import(
    url=f"controller.api.{CLOUD_REGION}.cloud.zilliz.com.cn",
    api_key=API_KEY,
    object_url=OBJECT_URL,
    access_key=ACCESS_KEY,
    secret_key=SECRET_KEY,
    cluster_id=CLUSTER_ID, # Zilliz Cloud 集群 ID，如 "in01-xxxxxxxxxxxxxxx"
    collection_name=COLLECTION_NAME
)

print(res.json())

# Output
#
# {
#     "code": 200,
#     "data": {
#         "jobId": "9d0bc230-6b99-4739-a872-0b91cfe2515a"
#     }
# }
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.bulkwriter.response.BulkImportResponse;

BulkImportResponse bulkImportResponse = CloudImport.bulkImport(
    CLUSTER_ENDPOINT,
    API_KEY,
    CLUSTER_ID, // Zilliz Cloud 集群 ID，如 "in01-xxxxxxxxxxxxxxx"
    COLLECTION_NAME,
    OBJECT_URL,
    ACCESS_KEY,
    SECRET_KEY
);

// Get import job ID
String jobId = bulkImportResponse.getJobId();

System.out.println(jobId);

// 0f7fe853-d93e-4681-99f2-4719c63585cc
```

</TabItem>
</Tabs>

### 查看批量导入进度{#check-import-progress}

可通过以下代码查看批量导入进度：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
from pymilvus import get_import_progress

job_id = res.json()['data']['jobId']
res = get_import_progress(
    url=f"controller.api.{CLOUD_REGION}.cloud.zilliz.com.cn",
    api_key=API_KEY,
    job_id=job_id,
    cluster_id=CLUSTER_ID # Zilliz Cloud 集群 ID，如 "in01-xxxxxxxxxxxxxxx"
)

# check the bulk-import progress

while res.json()["data"]["readyPercentage"] < 1:
    time.sleep(5)

    res = get_import_progress(
        url=f"controller.api.{CLOUD_REGION}.cloud.zilliz.com.cn",
        api_key=API_KEY,
        job_id=job_id,
        cluster_id=CLUSTER_ID
    )

print(res.json())

# Output
#
# {
#     "code": 200,
#     "data": {
#         "collectionName": "medium_articles",
#         "fileName": "folder/1/",
#         "fileSize": 26571700,
#         "readyPercentage": 1,
#         "completeTime": "2023-10-28T06:51:49Z",
#         "errorMessage": null,
#         "jobId": "9d0bc230-6b99-4739-a872-0b91cfe2515a",
#         "details": [
#             {
#                 "fileName": "folder/1/",
#                 "fileSize": 26571700,
#                 "readyPercentage": 1,
#                 "completeTime": "2023-10-28T06:51:49Z",
#                 "errorMessage": null
#             }
#         ]
#     }
# }
```

</TabItem>

<TabItem value='java'>

```java
while (true) {
    System.out.println("Wait 5 second to check bulkInsert job state...");
    TimeUnit.SECONDS.sleep(5);

    GetImportProgressResponse getImportProgressResponse = CloudImport.getImportProgress(
        CLUSTER_ENDPOINT,
        API_KEY,
        CLUSTER_ID, // Zilliz Cloud 集群 ID，如 "in01-xxxxxxxxxxxxxxx"
        jobId
    );

    if (getImportProgressResponse.getReadyPercentage().intValue() == 1) {
        System.err.printf("The job %s completed%n", jobId);
        break;
    } else if (StringUtils.isNotEmpty(getImportProgressResponse.getErrorMessage())) {
        System.err.printf("The job %s failed, reason: %s%n", jobId, getImportProgressResponse.getErrorMessage());
        break;
    } else {
        System.err.printf("The job %s is running, progress:%s%n", jobId, getImportProgressResponse.getReadyPercentage());
    }
}

// The job 0f7fe853-d93e-4681-99f2-4719c63585cc is running, progress: 0.01
// The job 0f7fe853-d93e-4681-99f2-4719c63585cc is running, progress: 0.5
// The job 0f7fe853-d93e-4681-99f2-4719c63585cc completed.
```

</TabItem>
</Tabs>

### 列出所有批量导入任务{#list-all-import-jobs}

您还可以调用 ListImportJobs API 来了解其它批量导入任务的运行情况：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
from pymilvus import list_import_jobs

# list bulk-import jobs

res = list_import_jobs(
    url=f"controller.api.{CLOUD_REGION}.cloud.zilliz.com.cn",
    api_key=API_KEY,
    cluster_id=CLUSTER_ID, # Zilliz Cloud 集群 ID，如 "in01-xxxxxxxxxxxxxxx"
    page_size=10,
    current_page=1,
)

print(res.json())

# Output
#
# {
#     "code": 200,
#     "data": {
#         "tasks": [
#             {
#                 "collectionName": "medium_articles",
#                 "jobId": "9d0bc230-6b99-4739-a872-0b91cfe2515a",
#                 "state": "ImportCompleted"
#             },
#             {
#                 "collectionName": "medium_articles",
#                 "jobId": "53632e6c-c078-4476-b840-10c4793d9c08",
#                 "state": "ImportCompleted"
#             },
#         ],
#         "count": 2,
#         "currentPage": 1,
#         "pageSize": 10
#     }
# }
```

</TabItem>

<TabItem value='java'>

```java
ListImportJobsResponse listImportJobsResponse = CloudImport.listImportJobs(
    CLUSTER_ENDPOINT,
    API_KEY,
    CLUSTER_ID,
    10,
    1
);

System.out.println(listImportJobsResponse);
```

</TabItem>
</Tabs>

## 推荐阅读{#related-topics}

- [通过 Web 控制台导入](./import-data-on-web-ui)

- [通过 RESTful API 导入](./import-data-via-restful-api)

- [使用 BulkWriter 导入](./prepare-source-data) 


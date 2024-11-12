---
title: "用户指南：数据导入从入门到精通 | Cloud"
slug: /data-import-zero-to-hero
sidebar_label: "用户指南"
beta: FALSE
notebook: FALSE
description: "本小节为一个快速引导教程，旨在帮助您在 Zilliz Cloud 上快速开始包含数据准备、建立 Collection 到开始导入数据等子任务在内的全流程数据导入任务。通过本节，你将掌握： | Cloud"
type: origin
token: FXGWwcjyViaQm8kvJgScITzBnr3
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 数据导入
  - 指南

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 用户指南：数据导入从入门到精通

本小节为一个快速引导教程，旨在帮助您在 Zilliz Cloud 上快速开始包含数据准备、建立 Collection 到开始导入数据等子任务在内的全流程数据导入任务。通过本节，你将掌握：

- 如何定义 Schema 及创建导入任务的目标 Collection

- 如何使用 **BulkWriter** 准备源数据并将其写入远程对象存储桶

- 如果调用批量导入 API 将准备好的源数据导入目标 Collection

## 开始之前{#before-you-start}

为了保证整个数据导入流程的连续性，请在开始本教程前完成如下准备工作：

### 在 Zilliz Cloud 上创建集群{#set-up-your-zilliz-cloud-cluster}

- 如果您还未创建任何集群，参考[此处创建一个集群](./create-cluster)。

- 收集如下信息：集群 Endpoint、API 密钥、集群 ID 和 集群所在云地域。您可以在 [Zilliz Cloud 控制台](./on-zilliz-cloud-console)上找到这些信息。

### 安装依赖{#install-dependencies}

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
  <version>2.3.5</version>
</dependency>
```

- 如您使用 Gradle/Grails 管理项目, 执行如下命令：

```shell
compile 'io.milvus:milvus-sdk-java:2.3.5'
```

</TabItem>

</Tabs>

### 配置远程对象存储桶{#configure-your-remote-storage-bucket}

- 在您的阿里云或腾讯云控制台上创建一个对象存储桶。

- 记录下访问该对象存储桶的 Access Key、Secret Key 以及桶名称。您可以在阿里云控制台中找到这些信息。

为了更好地利用本教程中的示例代码，建议您使用收集到的信息设置如下变量：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
# Zilliz Cloud 集群配置
CLUSTER_ENDPOINT=""
API_KEY=""
TOKEN=""
CLUSTER_ID="" # Zilliz Cloud 集群 ID，如 "in01-xxxxxxxxxxxxxxx"
CLOUD_REGION=""
CLOUD_API_ENDPOINT="api.cloud.zilliz.com.cn"
COLLECTION_NAME=""

# 远程对象存储桶访问参数
YOUR_ACCESS_KEY=""
YOUR_SECRET_KEY=""
YOUR_BUCKET_NAME="" 
```

</TabItem>

<TabItem value='java'>

```java
// Configs for Zilliz Cloud cluster
String CLUSTER_ENDPOINT = "";
String TOKEN = "";
String API_KEY = "";
String CLUSTER_ID = ""; // Zilliz Cloud 集群 ID，如 "in01-xxxxxxxxxxxxxxx"
String CLOUD_REGION = "";
String CLOUD_API_ENDPOINT = "api.cloud.zilliz.com.cn";
String COLLECTION_NAME = "";

// Configs for remote bucket
String ACCESS_KEY = "";
String SECRET_KEY = "";
String BUCKET_NAME = "";
```

</TabItem>
</Tabs>

## 下载示例数据{#download-example-dataset}

在终端中运行如下命令下载格式为 CSV 的示例数据集。

```shell
curl https://assets.zilliz.com/doc-assets/medium_articles_partial_a13e0f2a.csv \
        --output medium_articles_partial.csv 
```

上述命令会按如下方式打印下载进度。您也可以[单击此处](https://assets.zilliz.com/medium_articles_partial.csv)从浏览器下载此数据集。

```shell
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 5133k  100 5133k    0     0   430k      0  0:00:11  0:00:11 --:--:--  599k0
```

下表详细描述了该数据集的结构及第一行数据各列的取值。

<table>
   <tr>
     <th><p><strong>字段名称</strong></p></th>
     <th><p><strong>字段类型</strong></p></th>
     <th><p><strong>字段属性</strong></p></th>
     <th><p><strong>样例取值</strong></p></th>
   </tr>
   <tr>
     <td><p>id</p></td>
     <td><p>INT64</p></td>
     <td><p>N/A</p></td>
     <td><p>0</p></td>
   </tr>
   <tr>
     <td><p>title_vector</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>Dimension: 768</p></td>
     <td><p>[0.041732933, 0.013779674, -0.027564144, -0.01…</p></td>
   </tr>
   <tr>
     <td><p>title</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>Max length: 512</p></td>
     <td><p>The Reported Mortality Rate of Coronavirus Is …</p></td>
   </tr>
   <tr>
     <td><p>link</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>Max length: 512</p></td>
     <td><p>https://medium.com/swlh/the-reported-mortality…</p></td>
   </tr>
   <tr>
     <td><p>reading_time</p></td>
     <td><p>INT64</p></td>
     <td><p>N/A</p></td>
     <td><p>13</p></td>
   </tr>
   <tr>
     <td><p>publication</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>Max length: 512</p></td>
     <td><p>The Startup</p></td>
   </tr>
   <tr>
     <td><p>claps</p></td>
     <td><p>INT64</p></td>
     <td><p>N/A</p></td>
     <td><p>1100</p></td>
   </tr>
   <tr>
     <td><p>responses</p></td>
     <td><p>INT64</p></td>
     <td><p>N/A</p></td>
     <td><p>18</p></td>
   </tr>
</table>

示例数据集包含了 5,000 篇在 medium.com 发布的文章。关于该数据集更多信息，可参考[此 Kaggle 页面](https://www.kaggle.com/datasets/shiyu22chen/cleaned-medium-articles-dataset)。

## 创建目标 Collection{#set-up-target-collection}

我们可以根据上表的内容设计目标 Collection 的 Schema。

为了更好地演示 Collection 的能力，我们在目标 Collection 的 Schema 中包含了前 4 个字段，并将后 4 个字段做为动态字段使用。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>

<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

# You need to work out a collection schema out of your dataset.
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=True
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="title_vector", datatype=DataType.FLOAT_VECTOR, dim=768)
schema.add_field(field_name="title", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="link", datatype=DataType.VARCHAR, max_length=512)
```

上述代码中的字段解释如下：

- `fields`:

    - `id` 是主键。

    - `title_vector` 用于存储 768 维的向量数据。

    - `title` 和 `link` 是两个标量字段。

- `auto_id=False`

    该参数默认值为 **False**，表示主键不会随数据插入自动增长。将其设置为 **True** 可阻止 **BulkWriter** 在生成的文件中包含主键。

- `enable_dynamic_field=True`

    该参数默认为 **False**，表示 Schema 中未定义的字段将会被忽略。将其设置为 **True** 将允许 **BulkWriter** 将未在 Schema 中定义的字段以键值对的形式存储到一个名为 **$meta** 的预留 JSON 字段中。

</TabItem>

<TabItem value='java'>

```java
import io.milvus.param.collection.CollectionSchemaParam;
import io.milvus.param.collection.FieldType;
import io.milvus.grpc.DataType;

// Define schema for the target collection
FieldType id = FieldType.newBuilder()
        .withName("id")
        .withDataType(DataType.Int64)
        .withPrimaryKey(true)
        .withAutoID(false)
        .build();

FieldType titleVector = FieldType.newBuilder()
        .withName("title_vector")
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

CollectionSchemaParam schema = CollectionSchemaParam.newBuilder()
        .withEnableDynamicField(true)
        .addFieldType(id)
        .addFieldType(titleVector)
        .addFieldType(title)
        .addFieldType(link)
        .build();
```

上述代码中的字段解释如下： 

- 名为 `id` 的字段为主键，其 `withAutoID` 设置为 `false`，表明在导入数据时，待插入数据中应该包含主键。

- 名为 `title_vector` 的字段为向量字段，其 `withDimension` 设置为 768，表明待插入数据各条记录中该字段的值需为一个 768 维的向量。

- Schema 定义中的 `withEnableDynamicField` 设置为 `true`，表明您可以在待插入数据中包含 Schema 中未定义的字段。

</TabItem>

</Tabs>

在创建 Schema 后，就可以继续创建目标 Collection 了。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

# Zilliz Cloud 常量
CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
TOKEN = "YOUR_TOKEN"
COLLECTION_NAME = "YOUR_COLLECTION_NAME"

# 1. 创建一个 MilvusClient
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN
)

# 2. 设置索引参数
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="title_vector",
    index_type="AUTOINDEX",
    metric_type="IP"
)

# 3. 创建 Collection
client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.client.MilvusServiceClient;
import io.milvus.param.ConnectParam;
import io.milvus.param.IndexType;
import io.milvus.param.MetricType;
import io.milvus.param.collection.CreateCollectionParam;
import io.milvus.param.collection.LoadCollectionParam;
import io.milvus.param.index.CreateIndexParam;

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
        .withMetricType(MetricType.IP)
        .build();

milvusClient.createIndex(indexParam);

LoadCollectionParam loadCollectionParam = LoadCollectionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .build();

milvusClient.loadCollection(loadCollectionParam);
```

</TabItem>
</Tabs>

## 准备源数据{#prepare-source-data}

**BulkWriter** 会将您提供的数据转换成 JSON、Parquet 或 NumPy 文件。在下面的示例中，我们将创建一个 **RemoteBulkWriter** 并使用该 **RemoteBulkWriter** 将您的数据转换成上述格式。

### 创建 RemoteBulkWriter{#create-remotebulkwriter}

当 Schema 准备好后，就可以使用该 Schema 创建 **RemoteBulkWriter** 了。由于 **RemoteBulkWriter** 需要访问您的远程对象存储桶。因此，您需要先设置好连接远程对象存储桶的 **ConnectParam** 对象并在创建 **RemoteBulkWriter** 时引用该参数。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
from pymilvus.bulk_import import RemoteBulkWriter, BulkFileType
# 如您使用的 pymilvus 版本低于 2.4.2
# 使用 from pymilvus import RemoteBulkWriter, BulkFileType

# 三方服务常量
YOUR_ACCESS_KEY = "YOUR_ACCESS_KEY"
YOUR_SECRET_KEY = "YOUR_SECRET_KEY"
YOUR_BUCKET_NAME = "YOUR_BUCKET_NAME"

# 远程存储桶连接参数
conn = RemoteBulkWriter.S3ConnectParam(
    endpoint="oss-cn-hangzhou.aliyuncs.com", 
    # 腾讯云请使用 "cos.ap-beijing-1.myqcloud.com"
    access_key=ACCESS_KEY,
    secret_key=SECRET_KEY,
    bucket_name=BUCKET_NAME,
    secure=True
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.bulkwriter.connect.S3ConnectParam;
import io.milvus.bulkwriter.connect.StorageConnectParam;

// 创建一个 RemoteBulkWriter.
StorageConnectParam storageConnectParam = S3ConnectParam.newBuilder()
        .withEndpoint("oss-cn-hangzhou.aliyuncs.com") 
        // 腾讯云请使用 "cos.ap-beijing-1.myqcloud.com"
        .withBucketName(BUCKET_NAME)
        .withAccessKey(ACCESS_KEY)
        .withSecretKey(SECRET_KEY)
        .build();
```

</TabItem>
</Tabs>

<Admonition type="info" icon="📘" title="说明">

<p>参数 <strong>endpoint</strong> 决定了生成文件的输出路径。请务必确保您的目标 Collection 所在地域与您的远程对象存储桶所在地域一致。</p>
<p>关于阿里云下 OSS Region 和 Endpoint 对照关系，可<a href="https://help.aliyun.com/zh/oss/user-guide/regions-and-endpoints">参考此文</a>。</p>
<p>关于腾讯云下 OSS Region 和 Endpoint 对照关系，可<a href="https://cloud.tencent.com/document/product/436/6224">参考此文</a>。</p>

</Admonition>

然后，在创建 **RemoteBulkWriter** 时需要引用上述 **ConnectParam** 对象。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>

<TabItem value='python'>

```python
writer = RemoteBulkWriter(
    schema=schema, # 目标 Collection 的 Schema
    remote_path="/", # 相对于远程对象存储桶根目录的输出路径
    segment_size=512*1024*1024, # 原始数据分段大小
    connect_param=conn, # 远程对象存储桶的连接参数
    file_type=BulkFileType.JSON_RB # 输出文件类型.
)

# 支持的输出文件类型:
# - BulkFileType.JSON_RB, 
# - BulkFileType.NPY, and 
# - BulkFileType.PARQUET
```

上述代码将生成 JSON 格式的文件并将其上传到指定桶的根目录下。

- `remote_path="/"`

    此参数决定了生成文件在远程对象存储桶中的输出路径。

    将其设置为 `"/"` 会使 **RemoteBulkWriter** 将生成的文件放入远程对象存储桶的根目录下。若需放入其它路径，请使用相对于桶根目录的相对路径。

- `file_type=BulkFileType.PARQUET`

    此参数决定了生成文件的文件类型。可选值如下：

    - **BulkFileType.JSON_RB**

    - **BulkFileType.PARQUET**

    - **BulkFileType.NPY**

- `segment_size=512*1024*1024`

    此参数决定了 **BulkWriter** 如何对原始数据进行分段。该参数默认值为 512 MB (512 * 1024 * 1024)。如果您的数据集包含数据量较大时，可以考虑使用该参数对数据进行合理分段。

</TabItem>

<TabItem value='java'>

```java
import io.milvus.bulkwriter.RemoteBulkWriter;
import io.milvus.bulkwriter.RemoteBulkWriterParam;
import io.milvus.bulkwriter.common.clientenum.BulkFileType;

RemoteBulkWriterParam remoteBulkWriterParam = RemoteBulkWriterParam.newBuilder()
        .withCollectionSchema(schema)
        .withRemotePath("/")
        .withChunkSize(512 * 1024 * 1024)
        .withConnectParam(storageConnectParam)
        .withFileType(BulkFileType.PARQUET)
        .build();
        
@SuppressWarnings("resource")
RemoteBulkWriter remoteBulkWriter = new RemoteBulkWriter(remoteBulkWriterParam);

// Possible file types:
// - BulkFileType.PARQUET
```

上述代码将生成 JSON 格式的文件并将其上传到指定桶的根目录下。

- `withRemotePath("/")`

    此参数决定了生成文件在远程对象存储桶中的输出路径。

    将其设置为 `"/"` 会使 **RemoteBulkWriter** 将生成的文件放入远程对象存储桶的根目录下。若需放入其它路径，请使用相对于桶根目录的相对路径。

- `withFileType(BulkFileType.PARQUET)`

    此参数决定了生成文件的文件类型。当前 **PARQUET** 为唯一支持的格式。

- `withChunkSize(512*1024*1024)`

    此参数决定了 **BulkWriter** 如何对原始数据进行分段。该参数默认值为 512 MB (512 * 1024 * 1024)。如果您的数据集包含数据量较大时，可以考虑使用该方法对数据进行合理分段。

</TabItem>

</Tabs>

### 使用 Writer{#use-the-writer}

**Writer** 对象有两个方法：一个是将原始数据以行的形式添加到缓存中，另一个则是将缓存中的数据写入到远程对象存储桶中。

您可以参考如下代码将原始数据以行的形式添加到缓存中。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
import pandas as pd

df = pd.read_csv("path/to/medium_articles_partial.csv") # 请使用原始数据文件所在路径

for i in range(len(df)):
    row = df.iloc[i].to_dict()
    row["title_vector"] = [float(x) for x in row["title_vector"][1:-1].split(",")]
    writer.append_row(row)
```

</TabItem>

<TabItem value='java'>

<Tabs groupId="java" defaultValue='java' values={[{"label":"Main","value":"java"},{"label":"CsvDataObject","value":"java_1"}]}>
<TabItem value='java'>

```java

import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.alibaba.fastjson.JSONObject;

import java.util.Iterator;

CsvMapper csvMapper = new CsvMapper();
File csvFile = new File("medium_articles_partial.csv");

CsvSchema csvSchema = CsvSchema.builder().setUseHeader(true).build();
Iterator<CsvDataObject> iterator = csvMapper
        .readerFor(CsvDataObject.class)
        .with(csvSchema)
        .readValues(csvFile);
        
while (iterator.hasNext()) {
    CsvDataObject data = iterator.next();
    JSONObject row = new JSONObject();

    row.put("id", data.getId());
    row.put("title_vector", data.toFloatArray());
    row.put("title", data.getTitle());
    row.put("link", data.getLink());

    remoteBulkWriter.appendRow(row);
}
        
```

</TabItem>
<TabItem value='java_1'>

```java
// This object should match your data structure (a.k.a schema)

import com.google.gson.Gson;

private static class CsvDataObject {
    @JsonProperty
    private long id;
    @JsonProperty
    private String title_vector;
    @JsonProperty
    private String title;
    @JsonProperty
    private String link;

    public long getId() {
        return id;
    }

    @SuppressWarnings("unused")
    public String getTitleVector() {
        return title_vector;
    }

    public String getTitle() {
        return title;
    }

    public String getLink() {
        return link;
    }

    public List<Float> toFloatArray() {
        return new Gson().fromJson(title_vector, new TypeToken<List<Float>>(){}.getType());
    }
} 
```

</TabItem>
</Tabs>
</TabItem>
</Tabs>

如上述代码所示，**accept_row()** 方法接收一个字典。该字典以键值对的形式表示一条数据。

需要注意的是，该字典需要包含所有在 Schema 中定义了的字段。如果 Schema 中还开启了动态字段，该字典还允许携带 Schema 中未定义的字段。具体内容，可参考[使用 BulkWriter](./use-bulkwriter)。

您还需要调用 **commit()** 方法才能将缓存中的数据写入到远程对象存储桶中。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
writer.commit()
```

</TabItem>

<TabItem value='java'>

```java
remoteBulkWriter.commit(false);
```

</TabItem>
</Tabs>

至此，BulkWriter 将原始数据按您的要求转换成 Zilliz Cloud 可识别的格式并将其存放到指定的远程对象存储桶中。您可以运行如下指令查看输入路径。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
print(writer.data_path)

# /5868ba87-743e-4d9e-8fa6-e07b39229425
```

</TabItem>

<TabItem value='java'>

```java
import java.util.List;

List<List<String>> batchFiles = remoteBulkWriter.getBatchFiles();
System.out.println(batchFiles);

// [["/5868ba87-743e-4d9e-8fa6-e07b39229425/1.parquet"]]
```

</TabItem>
</Tabs>

<Admonition type="info" icon="📘" title="说明">

<p><strong>BulkWriter</strong> 生成一个 UUID，并使用该 UUID 在指定的输入路径下创建一个子路径，然后将生成的文件放在创建的子路径下。</p>

</Admonition>

更多内容，可参考[使用 BulkWriter](./use-bulkwriter)。

## 导入源数据{#import-prepared-data}

在此步骤之前，请再次确认您准备的数据已经正确上传到您的存储桶中。

### 创建批量导入任务{#start-importing}

您可以使用 bulk_import() 函数导入准备好的源数据。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
from pymilvus import bulk_import

# 远程对象存储桶中的源数据外网访问地址
object_url = "https://{0}.oss-cn-hangzhou.aliyuncs.com/{1}/".format(BUCKET_NAME, str(writer.data_path)[1:])

# 开始批量导入
res = bulk_import(
    # Zilliz Cloud 访问参数
    # highlight-next-line
    url=CLOUD_API_ENDPOINT,
    api_key=API_KEY,
    cluster_id=CLUSTER_ID, # Zilliz Cloud 集群 ID，如 in01-xxxxxxxxxxxxxxx
    collection_name=COLLECTION_NAME,
    # 远程对象存储桶访问参数
    object_url=object_url,
    access_key=ACCESS_KEY,
    secret_key=SECRET_KEY,

)

print(res.json())

# {'code': 200, 'data': {'jobId': '0f7fe853-d93e-4681-99f2-4719c63585cc'}}
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.bulkwriter.response.BulkImportResponse;

// Insert the data into the collection
String prefix = batchFiles.get(0).get(0).split("/")[0];
String OBJECT_URL = String.format("https://storage.googleapis.com/%s/%s", BUCKET_NAME, prefix);

BulkImportResponse bulkImportResponse = CloudImport.bulkImport(
    CLUSTER_ENDPOINT,
    API_KEY,
    CLUSTER_ID, // Zilliz Cloud 集群 ID，如 in01-xxxxxxxxxxxxxxx
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

<Admonition type="info" icon="📘" title="Notes">

<p>参数 <strong>object_url</strong> 需为远程对象存储桶中一个合法的文件或目录。在上述代码中，我们使用了 <strong>format()</strong> 方法将桶名称和 Writer 返回的路径拼接成一个合法的目录路径。</p>
<p>如需了解更多信息，可参考 <a href="https://help.aliyun.com/zh/oss/user-guide/oss-domain-names">OSS 访问域名使用规则</a> （阿里云）或<a href="https://cloud.tencent.com/document/product/436/6224">地域和访问域名</a>（腾讯云）。</p>

</Admonition>

### 检查任务进度{#check-task-progress}

如下代码每 5 秒钟检查一次任务进度，并打印进度信息。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
import time
from pymilvus import get_import_progress

job_id = res.json()['data']['jobId']

res = get_import_progress(
    # highlight-next-line
    url=CLOUD_API_ENDPOINT,
    api_key=API_KEY,
    job_id=job_id,
    cluster_id=CLUSTER_ID # Zilliz Cloud 集群 ID，如 in01-xxxxxxxxxxxxxxx
)

print(res.json()["data"]["readyPercentage"])

# 循环检查导入进度
while res.json()["data"]["readyPercentage"] < 1:
    time.sleep(5)

    res = get_import_progress(
        # highlight-next-line
        url=CLOUD_API_ENDPOINT,
        api_key=API_KEY,
        job_id=job_id,
        cluster_id=CLUSTER_ID
    )
    
    print(res.json()["data"]["readyPercentage"])

# 0.01   -- 导入进度 1%
# 0.5    -- 导入进度 50%
# 0.5
# 1      -- 导入完成
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
        CLUSTER_ID, // Zilliz Cloud 集群 ID，如 in01-xxxxxxxxxxxxxxx
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

<Admonition type="info" icon="📘" title="说明">

<p>上述代码中，参数 <strong>url</strong> 为 Zilliz Cloud RESTful API 的服务器路径，其取值须与目标 Collection 所在云地域保持一致。</p>

</Admonition>

您还可以列出所有批量导入任务。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
from pymilvus import list_import_jobs

res = list_import_jobs(
    # highlight-next-line
    url=CLOUD_API_ENDPOINT,
    api_key=API_KEY,
    cluster_id=CLUSTER_ID, # Zilliz Cloud 集群 ID，如 in01-xxxxxxxxxxxxxxx
    page_size=10,
    current_page=1,
)

print(res.json())

# {
#    "code":200,
#    "data":{
#       "tasks":[
#          {
#             "collectionName":"medium_aritlces",
#             "jobId":"0f7fe853-d93e-4681-99f2-4719c63585cc",
#             "state":"ImportCompleted"
#          }
#       ],
#       "count":1,
#       "currentPage":1,
#       "pageSize":10
#    }
# }
```

</TabItem>

<TabItem value='java'>

```java
ListImportJobsResponse listImportJobsResponse = CloudImport.listImportJobs(
    CLUSTER_ENDPOINT,
    API_KEY,
    CLUSTER_ID, // Zilliz Cloud 集群 ID，如 in01-xxxxxxxxxxxxxxx
    10,
    1
);

System.out.println(listImportJobsResponse);
```

</TabItem>
</Tabs>

## 小结{#recaps}

本教程涵盖了数据导入的全流程。下面是一些在进行数据导入时需要遵循的一些原则：

- 仔细分析您的原始数据，以便更好地完成目标 Collection 的 Schema 设计。

- 在导入数据前，请确保 Zilliz Cloud 集群和 BulkWriter 的输出路径所在对象存储桶由同一家云服务提供商托管。

- 在使用 **BulkWriter** 时，请注意：

    - 在 **append_row()** 中，务必确保参数字典中包含所有 Schema 中定义的字段。如果 Schema 还允许动态字段，您还可以在该字典中包含未在 Schema 中定义的字段。

    - 在将所有数据添加到缓存中后，还需要调用 **commit()** 方法才能将转换好的数据上传到指定的远程对象存储桶中。

- 在使用 **bulk_import()** 函数时，您需要将桶名称、桶中文件或目录的外部访问域名，以及 Writer 返回的路径拼接在一起合成一个合法的 **object_url**。


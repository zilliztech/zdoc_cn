---
sidebar_position: 0
---

# 定制 Schema

本文介绍如何为 Collection 定制 Schema。

## 开始前

请确保已完成以下步骤：

- 已了解 Schema 相关信息。详情请参见[数据模型](https://zilliverse.feishu.cn/wiki/ZgcQw57PxiKaeSkuQmCchK8snP0)。

- 已创建集群。详情请参见[创建集群](https://zilliverse.feishu.cn/wiki/MAFcwBTqqiR5YZkdkd4cADg0nub)。

- 已下载示例数据集。详情请参见[示例数据集](https://zilliverse.feishu.cn/wiki/ZoXbwP8hJivPw2ktsLrckw0Snif)。

> 📘 说明 
>
> 您可以下载本指南中的源代码以供参考。

## 连接集群

创建集群时，您需要配置一个由用户名和密码组成的集群凭证。请务必记下这些信息，因为您需要它们来连接集群。

```python
import json
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility

# 连接集群
connections.connect(
  alias='default', 
  #  从控制台获取的集群公网地址
  uri='https://<CLUSTER-ID>.<CLOUD-REGION>.vectordb.zillizcloud.com:<ACCESS-PORT>',
  secure=True,
  token='user:password', # 创建集群时指定的用户名和密码
        # 也可以使用旧连接方式 `user` 和 `password` 来替代 `token`：
        # user='',
        # password='' 
)
```

```javascript
const address = "https://<CLUSTER-ID>.<CLOUD-REGION>.vectordb.zillizcloud.com:<ACCESS-PORT>"
const token = "user:password"

// 在异步函数声明中包含以下内容：
const client = new MilvusClient({
    address,
    token
}, true);
```

```java
import io.milvus.client.*;
import io.milvus.param.*;
import io.milvus.param.collection.FieldType;
import io.milvus.param.collection.FlushParam;
import io.milvus.param.index.CreateIndexParam;
import io.milvus.param.collection.CreateCollectionParam;
import io.milvus.param.collection.DropCollectionParam;
import io.milvus.grpc.DataType;
import io.milvus.grpc.FlushResponse;
import io.milvus.param.dml.InsertParam;
import io.milvus.param.dml.InsertParam.Field;
import io.milvus.grpc.MutationResult;
import io.milvus.response.MutationResultWrapper;
import io.milvus.param.dml.SearchParam;
import io.milvus.grpc.SearchResults;
import io.milvus.response.SearchResultsWrapper;
import io.milvus.common.clientenum.ConsistencyLevelEnum;
import io.milvus.param.collection.LoadCollectionParam;
import io.milvus.grpc.GetLoadingProgressResponse;
import io.milvus.param.collection.GetLoadingProgressParam;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.util.List;
import java.util.ArrayList;
import java.nio.file.Files;
import java.nio.file.Path;

// 1. 连接集群

// 在主函数中包含以下内容：

ConnectParam connectParam = ConnectParam.newBuilder()
    .withUri("https://<CLUSTER-ID>.<CLOUD-REGION>.vectordb.zillizcloud.com:<ACCESS-PORT>")
    .withToken("db_admin:<password>")
    .build();

MilvusServiceClient client = new MilvusServiceClient(connectParam);

System.out.println("Connected to Zilliz Cloud!");
```

```go
import (
        "context"
        "encoding/json"
        "fmt"
        "log"
        "os"

        "github.com/milvus-io/milvus-sdk-go/v2/client"
        "github.com/milvus-io/milvus-sdk-go/v2/entity"
)

// 1. 连接集群

// 在主函数中包含以下内容：

connParams := client.Config{
        Address: "https://<CLUSTER-ID>.<CLOUD-REGION>.vectordb.zillizcloud.com:<ACCESS-PORT>",
        APIKey:  "db_admin:<password>",
        // Username:      "db_admin",
        // Password:      "<password>",
        EnableTLSAuth: true,
}

conn, err := client.NewClient(context.Background(), connParams)

if err != nil {
        log.Fatal("Failed to connect to Zilliz Cloud:", err.Error())
}
```

## 创建 Collection

动态 Schema 使得用户可以更简单高效地插入数据，同时也降低了用户学习难度。如果是生产环境，推荐使用自定义 Schema 而非动态 Schema，以确保所有数据都能按预期存储。

您可以在 Collection 中指定各字段的名称和数据类型来定制 Schema。

```python
# 2. 定义字段
fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="title", dtype=DataType.VARCHAR, max_length=512),   
    FieldSchema(name="title_vector", dtype=DataType.FLOAT_VECTOR, dim=768),
    FieldSchema(name="link", dtype=DataType.VARCHAR, max_length=512),
    FieldSchema(name="reading_time", dtype=DataType.INT64),
    FieldSchema(name="publication", dtype=DataType.VARCHAR, max_length=512),
    FieldSchema(name="claps", dtype=DataType.INT64),
    FieldSchema(name="responses", dtype=DataType.INT64)
]
```

```javascript
// 2. 定义字段

// 在异步函数声明中包含以下内容：

const fields = [
    {
        name: "id",
        data_type: DataType.Int64,
        is_primary_key: true
    },
    {
        name: "title",
        data_type: DataType.VarChar,
        max_length: 512,
    },
    {
        name: "title_vector",
        data_type: DataType.FloatVector,
        dim: 768,
    },
    {
        name: "link",
        data_type: DataType.VarChar,
        max_length: 512,
    },
    {
        name: "reading_time",
        data_type: DataType.Int64,
    },
    {
        name: "publication",
        data_type: DataType.VarChar,
        max_length: 512,
    },
    {
        name: "claps",
        data_type: DataType.Int64,
    },
    {
        name: "responses",
        data_type: DataType.Int64,
    },
];
```

```java
// 2. 定义字段

// 在主函数中包含以下内容：

FieldType id = FieldType.newBuilder()
    .withName("id")
    .withDataType(DataType.Int64)
    .withPrimaryKey(true)
    .withAutoID(true)
    .build();

FieldType title = FieldType.newBuilder()
    .withName("title")
    .withDataType(DataType.VarChar)
    .withMaxLength(512)
    .build();

FieldType title_vector = FieldType.newBuilder()
    .withName("title_vector")
    .withDataType(DataType.FloatVector)
    .withDimension(768)
    .build();

FieldType link = FieldType.newBuilder()
    .withName("link")
    .withDataType(DataType.VarChar)
    .withMaxLength(512)
    .build();

FieldType reading_time = FieldType.newBuilder()
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
```

```go
// 2. 定义字段

// 在主函数中包含以下内容：

id := entity.NewField().
        WithName("id").
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(true)

title := entity.NewField().
        WithName("title").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(512)

title_vector := entity.NewField().
        WithName("title_vector").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(768)

link := entity.NewField().
        WithName("link").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(512)

reading_time := entity.NewField().
        WithName("reading_time").
        WithDataType(entity.FieldTypeInt64)

publication := entity.NewField().
        WithName("publication").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(512)

claps := entity.NewField().
        WithName("claps").
        WithDataType(entity.FieldTypeInt64)

responses := entity.NewField().
        WithName("responses").
        WithDataType(entity.FieldTypeInt64)
```

定义字段后，为 Collection 创建 Schema：

```python
# 3. 创建 Schema
schema = CollectionSchema(
    fields,
    description="Schema of Medium articles",
                enable_dynamic_field=False
)
```

```javascript
// 3. 构建 Collection 创建请求

// 在异步函数声明中包含以下内容：

const collection_name = "medium_articles";

const req = {
    collection_name,
    fields
}
```

```java
// 3. 创建 Schema

// 在主函数中包含以下内容：

CreateCollectionParam createCollectionParam = CreateCollectionParam.newBuilder()
    .withCollectionName("medium_articles")
    .withDescription("Schema of Medium articles")
    .addFieldType(id)
    .addFieldType(title)
    .addFieldType(title_vector)
    .addFieldType(link)
    .addFieldType(reading_time)
    .addFieldType(publication)
    .addFieldType(claps)
    .addFieldType(responses)
    .withEnableDynamicField(true)
    .build();
```

```go
// 3. 创建 Schema

// 在主函数中包含以下内容：

schema := &entity.Schema{
        CollectionName: "medium_articles",
        Description:    "Medium articles published between Jan and August in 2020 in prominent publications",
        AutoID:         true,
        Fields: []*entity.Field{
                id,
                title,
                title_vector,
                link,
                reading_time,
                publication,
                claps,
                responses,
        },
}
```

使用前面定义的 Schema 创建 Collection：

```python
# 4. 创建 Collection
collection = Collection(
    name="medium_articles", 
    description="Medium articles published between Jan and August in 2020 in prominent publications",
    schema=schema
)
```

```javascript
// 4. 创建 Collection

// 在异步函数声明中包含以下内容：

let res = await client.createCollection(req);

console.log(res)

// 输出：
// { error_code: 'Success', reason: '' }
```

```java
// 4. 创建 Collection

// 在主函数中包含以下内容：

R<RpcStatus> collection = client.createCollection(createCollectionParam);

if (collection.getException() != null) {
    System.out.println("Failed to create collection: " + collection.getException().getMessage());
    return;
}

System.out.println("Collection created!");
```

```go
// 4. 创建 Collection

// 在主函数中包含以下内容：

colerr := conn.CreateCollection(context.Background(), schema, 2)

if colerr != nil {
        log.Fatal("Failed to create collection:", colerr.Error())
}
```

## 为 Collection 创建索引

实现极致性能的近似最近邻（Approximate Nearest Neighbor，ANN）搜索需要使用索引。Zilliz Cloud 集群支持对向量字段进行索引，为 Collection 创建索引实际是对 Collection 中的向量字段进行索引。

Zilliz Cloud 目前仅支持 **AUTOINDEX** 索引类型。如果指定的索引类型不是 **AUTOINDEX**，**AUTOINDEX 也**会自动生效。详情请参见[AUTOINDEX](https://zilliverse.feishu.cn/wiki/YUETwzDssiTUs9kCSn4cgUYLnrd)。

```python
# 5. 创建索引

index_params = {
    "index_type": "AUTOINDEX",
    "metric_type": "L2",
    "params": {}
}

# 创建特定名称的索引：
collection.create_index(
  field_name="title_vector", 
  index_params=index_params,
  index_name='title_vector_index'
)
```

```javascript
// 5. 创建索引

// 在异步函数声明中包含以下内容：

index_param = {
    index_type: "AUTOINDEX",
    metric_type: "L2",
    params: {}
}

res = await client.createIndex({
    collection_name,
    field_name: "title_vector",
    index_param
});

console.log(res);

// 输出：
// { error_code: 'Success', reason: '' }
```

```java
// 5. 创建索引

// 在主函数中包含以下内容：

CreateIndexParam createIndexParam = CreateIndexParam.newBuilder()
    .withCollectionName("medium_articles")
    .withFieldName("title_vector")
    .withIndexName("title_vector_index")
    .withIndexType(IndexType.AUTOINDEX)
    .withMetricType(MetricType.L2)
    .build();

R<RpcStatus> res = client.createIndex(createIndexParam);

if (res.getException() != null) {
    System.out.println("Failed to create index: " + res.getException().getMessage());
    return;
}

System.out.println("Index created!");
```

```go
// 5. 创建索引

// 在主函数中包含以下内容：

index, err := entity.NewIndexAUTOINDEX(entity.MetricType("L2"))

if err != nil {
        log.Fatal("Failed to prepare the index:", err.Error())
}

println(index.Name())

err = conn.CreateIndex(context.Background(), "medium_articles", "title_vector", index, false)

if err != nil {
        log.Fatal("Failed to create the index:", err.Error())
}
```

## 加载和释放 Collection

对于使用 SDK 创建的 Collection，应在执行搜索和查询之前手动加载。如果暂时不需要使用 Collection，也可以手动释放以节省开销。

```python
# 6. 加载 Collection
collection.load()

# 查看加载进程
progress = utility.loading_progress("medium_articles")

print(f"Collection loaded successfully: {progress}")

# 输出：
# Collection loaded successfully: 100%
```

```javascript
// 6. 加载 Collection

// 在异步函数声明中包含以下内容：

res = await client.loadCollection({
    collection_name
});

console.log(res);

// 输出：
// { error_code: 'Success', reason: '' }

res = await client.getLoadingProgress({
    collection_name
});

console.log(res);

// 输出：
// { status: { error_code: 'Success', reason: '' }, progress: '0' }
```

```java
// 6. 加载 Collection

// 在主函数中包含以下内容：

LoadCollectionParam loadCollectionParam = LoadCollectionParam.newBuilder()
    .withCollectionName("medium_articles")
    .build();

R<RpcStatus> loadCollectionRes = client.loadCollection(loadCollectionParam);

// Get loading progress
GetLoadingProgressParam getLoadingProgressParam = GetLoadingProgressParam.newBuilder()
    .withCollectionName("medium_articles")
    .build();

R<GetLoadingProgressResponse> getLoadingProgressRes = client.getLoadingProgress(getLoadingProgressParam);

System.out.println("Loading progress: " + getLoadingProgressRes.getData().getProgress());

// 输出：
// Loading progress: 100
```

```go
// 6. 加载 Collection

// 在主函数中包含以下内容：

loadCollErr := conn.LoadCollection(context.Background(), "medium_articles", false)

if loadCollErr != nil {
        log.Fatal("Failed to load collection:", loadCollErr.Error())
}

// Load progress
progress, err := conn.GetLoadingProgress(context.Background(), "medium_articles", nil)

if err != nil {
        log.Fatal("Failed to get loading progress:", err.Error())
}

println("Loading progress:", progress)
```

要释放 Collection，请执行以下操作：

```python
collection.release()
```

```javascript
// 在异步函数声明中包含以下内容：

res = await client.releaseCollection({
    collection_name
});

console.log(res);

// 输出：
// { error_code: 'Success', reason: '' }
```

```java
ReleaseCollectionParam releaseCollectionParam = ReleaseCollectionParam.newBuilder()
    .withCollectionName("medium_articles")
    .build();

R<RpcStatus> releaseCollectionRes = client.releaseCollection(releaseCollectionParam);
```

```go
releaseCollErr := conn.ReleaseCollection(context.Background(), "medium_articles")

if releaseCollErr != nil {
        log.Fatal("Failed to release collection:", releaseCollErr.Error())
}
```

## 插入 Entity

向 Collection 中插入 Entity 前，请确保 Entity 的格式与 Collection 的 Schema 一致。

### 准备数据

您可以按行或列来准备数据。

- 按行排列数据
  要将数据排列为行，需要将每行排列为一个字典，其中字段名称用作键，字段值为其对应的值。以下代码展示如何将[示例数据集](https://zilliverse.feishu.cn/wiki/ZoXbwP8hJivPw2ktsLrckw0Snif)的前 200 条数据记录排列为行。

```python
# 不推荐实际执行以下代码
# 以下代码仅作演示使用

with open('/path/to/downloaded/medium_articles_2020_dpr.json') as f:
        data = json.load(f)
        rows = data['rows'][0:200]

print(rows[:2])
# 输出：
# [
#   {
#      'id': 0,
#      'title': 'The Reported Mortality Rate of Coronavirus Is Not Important',
#      'title_vector': [0.041732933, 0.013779674, -0.027564144, ..., 0.030096486],
#      'link': '<https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912>',
#      'reading_time': 13,
#      'publication': 'The Startup',
#      'claps': 1100,
#             'responses': 18
#   },
#   {
#      'id': 1, 
#      'title': 'Dashboards in Python: 3 Advanced Examples for Dash Beginners and Everyone Else', 
#      'title_vector': [0.0039737443, 0.003020432, -0.0006188639, 0.03913546, ..., 0.021713957], 
#      'link': '<https://medium.com/swlh/dashboards-in-python-3-advanced-examples-for-dash-beginners-and-everyone-else-b1daf4e2ec0a>', 
#      'reading_time': 14, 
#      'publication': 'The Startup', 
#      'claps': 726, 
#      'responses': 3
#   }
# ]
```

```javascript
// 不推荐实际执行以下代码
// 以下代码仅作演示使用

const data = JSON.parse(fs.readFileSync("path/to/downloaded/medium_articles_2020_dpr.json", "utf-8"));
const rows = data.rows;

console.log(rows[0])

// 输出：
// {
//   id: 0,
//   title: 'The Reported Mortality Rate of Coronavirus Is Not Important',
//   title_vector: [
//       0.041732933,   0.013779674,   -0.027564144, -0.013061441,
//       0.009748648, 0.00082446384, -0.00071647146,  0.048612226,
//     ... 764 more items
//   ],
//   link: '<https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912>',
//   reading_time: 13,
//   publication: 'The Startup',
//   claps: 1100,
//   responses: 18
// }
```

```java
// 不推荐实际执行以下代码
// 以下代码仅作演示使用

// 读取数据集
String content;

Path file = Path.of("/path/to/downloaded/medium_articles_2020_dpr.json");
try {
    String content = Files.readString(file);
} catch (Exception e) {
    System.out.println("Failed to read file: " + e.getMessage());
    return;
}

System.out.println("Successfully read file");

// 加载数据集
JSONObject dataset = JSON.parseObject(content);
List<JSONObject> rows = getRows(dataset.getJSONArray("rows"), 200);

// ===================================================================
// 将以下内容作为主函数的同级内容包含进来

// 从示例数据集中检索指定数量的记录，并将它们排列在 JSON 对象列表中
public static List<JSONObject> getRows(JSONArray dataset, int counts) {
    List<JSONObject> rows = new ArrayList<JSONObject>();
    for (int i = 0; i < counts; i++) {
        JSONObject row = dataset.getJSONObject(i);
        List<Float> vectors = row.getJSONArray("title_vector").toJavaList(Float.class);
        Long reading_time = row.getLong("reading_time");
        Long claps = row.getLong("claps");
        Long responses = row.getLong("responses");
        row.put("title_vector", vectors);
        row.put("reading_time", reading_time);
        row.put("claps", claps);
        row.put("responses", responses);
        row.remove("id");
        rows.add(row);
    }
    return rows;
}

System.out.println(rows)

// 输出：
// [{"reading_time":13,"publication":"The Startup","title_vector":[0.041732933,0.013779674,...,0.030096486],"link":"<https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912","responses":18,"title":"The> Reported Mortality Rate of Coronavirus Is Not Important","claps":1100}, 
//  {"reading_time":14,"publication":"The Startup","title_vector":[0.0039737443,0.003020432,-6.188639E-4,...,0.021713957],"link":"<https://medium.com/swlh/dashboards-in-python-3-advanced-examples-for-dash-beginners-and-everyone-else-b1daf4e2ec0a","responses":3,"title":"Dashboards> in Python: 3 Advanced Examples for Dash Beginners and Everyone Else","claps":726}]
```

```go
// 不推荐实际执行以下代码
// 以下代码仅作演示使用

// Read the downloaded dataset file
file, err := os.ReadFile("path/to/downloaded/medium_articles_2020_dpr.json")
if err != nil {
        log.Fatal("Failed to read file:", err.Error())
}

// Load the dataset
var data Dataset

if err := json.Unmarshal(file, &data); err != nil {
        log.Fatal(err.Error())
}

log.Println("Dataset loaded, row number: ", len(data.Rows))

rows, err := getRows(data, 5979)

log.Println("Rows prepared: ", len(rows))

// 输出：
// 2023/06/09 16:54:10 Dataset loaded, row number:  5979
// 2023/06/09 16:54:11 Rows prepared:  5979

// =====================================================
// 在 type 定义中包含以下内容：

// Structs 
// 根据数据集的结构定义 struct
type Dataset struct {
        Rows []Row `json:"rows"`
}

type Row struct {
        ID          int64     `json:"id" milvus:"name:id"`
        Title       string    `json:"title" milvus:"name:title"`
        TitleVector []float32 `json:"title_vector" milvus:"name:title_vector"`
        Link        string    `json:"link" milvus:"name:link"`
        ReadingTime int64     `json:"reading_time" milvus:"name:reading_time"`
        Publication string    `json:"publication" milvus:"name:publication"`
        Claps       int64     `json:"claps" milvus:"name:claps"`
        Response    int64     `json:"response" milvus:"name:responses"`
}

func getRows(dataset Dataset, counts int64) ([]interface{}, error) {
        // 将数据集转换为行
        rows := make([]interface{}, 0, 2)

        for _, row := range dataset.Rows[:counts] {
                rows = append(rows, row)
        }

        return rows, nil
}
```

- 按列排列数据
  要将数据排列为列，请使用包含该列中所有行的值的嵌套列表来表示每个列。以下代码片段将[示例数据集](https://zilliverse.feishu.cn/wiki/ZoXbwP8hJivPw2ktsLrckw0Snif)中的两个数据记录以列的方式排列。

  Node.js SDK 不支持将数据按列排列。

```python
# 不推荐实际执行以下代码
# 以下代码仅作演示使用

with open('/path/to/downloaded/medium_articles_2020_dpr.json') as f:
    data = json.load(f)
    rows = data['rows']
    keys = list(rows[0].keys())
    columns = [ [] for x in keys ]
    for row in rows:
        for x in keys:
            columns[keys.index(x)].append(row[x])

    print("A list of columns is as follows")
    columns_demo = [ [] for x in keys ]
    for row in rows[:3]:
        for x in keys:
            columns_demo[keys.index(x)].append(row[x])

          print(json.dumps(columns_demo, indent=2))

        # 输出：
  #   [
        #     [1, 2],
        #     ['Dashboards in Python: 3 Advanced Examples for Dash Beginners and Everyone Else', 'How Can We Best Switch in Python?'],
        #     [[0.0039737443, 0.003020432, -0.0006188639, ..., 0.021713957], [0.031961977, 0.00047043373, -0.018263113, ..., 0.034458436]],
        #     ['<https://medium.com/swlh/dashboards-in-python-3-advanced-examples-for-dash-beginners-and-everyone-else-b1daf4e2ec0a>', '<https://medium.com/swlh/how-can-we-best-switch-in-python-458fb33f7835>'],
        #     [14, 6]
        #     ['The Startup', 'The Startup'],
        #     [726, 500], 
        #            [3, 7]
  #   ]
```

```java
// 不推荐实际执行以下代码
// 以下代码仅作演示使用

// 读取数据集
String content;

Path file = Path.of("/path/to/downloaded/medium_articles_2020_dpr.json");
try {
    String content = Files.readString(file);
} catch (Exception e) {
    System.out.println("Failed to read file: " + e.getMessage());
    return;
}

// 加载数据集
JSONObject dataset = JSON.parseObject(content);
List<Field> fields = getFields(dataset.getJSONArray("rows"), 1);

// ====================================================================
// 将以下内容与主函数并排包含进来

// 从示例数据集中检索指定数量的记录，并将它们排列在字段数组中
public static List<Field> getFields(JSONArray dataset, int counts) {
    List<Field> fields = new ArrayList<Field>();
    List<String> titles = new ArrayList<String>();
    List<List<Float>> title_vectors = new ArrayList<List<Float>>();
    List<String> links = new ArrayList<String>();
    List<Long> reading_times = new ArrayList<Long>();
    List<String> publications = new ArrayList<String>();
    List<Long> claps_list = new ArrayList<Long>();
    List<Long> responses_list = new ArrayList<Long>();

    for (int i = 0; i < counts; i++) {
        JSONObject row = dataset.getJSONObject(i);
        titles.add(row.getString("title"));
        title_vectors.add(row.getJSONArray("title_vector").toJavaList(Float.class));
        links.add(row.getString("link"));
        reading_times.add(row.getLong("reading_time"));
        publications.add(row.getString("publication"));
        claps_list.add(row.getLong("claps"));
        responses_list.add(row.getLong("responses"));
    }

    fields.add(new Field("title", titles));
    fields.add(new Field("title_vector", title_vectors));
    fields.add(new Field("link", links));
    fields.add(new Field("reading_time", reading_times));
    fields.add(new Field("publication", publications));
    fields.add(new Field("claps", claps_list));
    fields.add(new Field("responses", responses_list));

    return fields;
}

System.out.println(field)

// 输出：
// [Field{fieldName='title', row_count=1}, Field{fieldName='title_vector', row_count=1}, Field{fieldName='link', row_count=1}, Field{fieldName='reading_time', row_count=1}, Field{fieldName='publication', row_count=1}, Field{fieldName='claps', row_count=1}, Field{fieldName='responses', row_count=1}]
```

```go
// 不推荐实际执行以下代码
// 以下代码仅作演示使用

// 使用上文的 structs 定义

// 在主函数中包含以下内容：

// 读取数据集
file, err := os.ReadFile("path/to/downloaded/medium_articles_2020_dpr.json")
if err != nil {
        log.Fatal("Failed to read file:", err.Error())
}

var data Dataset

if err := json.Unmarshal(file, &data); err != nil {
        log.Fatal(err.Error())
}

columns, err := getColumns(data, 1)

for _, column := range columns {
        log.Println(column.Name())
}

// 输出：
// 2023/06/17 16:32:50 Dataset loaded, row number:  5979
// 2023/06/17 16:32:50 title
// 2023/06/17 16:32:50 title_vector
// 2023/06/17 16:32:50 link
// 2023/06/17 16:32:50 reading_time
// 2023/06/17 16:32:50 publication
// 2023/06/17 16:32:50 claps
// 2023/06/17 16:32:50 responses

// ====================================================================
// 将以下内容与主函数并排包含进来

func getColumns(dataset Dataset, counts int64) ([]entity.Column, error) {
        // Make several arrays
        ids := make([]int64, 0, 1)
        titles := make([]string, 0, 1)
        titleVectors := make([][]float32, 0, 1)
        links := make([]string, 0, 1)
        readingTimes := make([]int64, 0, 1)
        publications := make([]string, 0, 1)
        claps := make([]int64, 0, 1)
        responses := make([]int64, 0, 1)

        for _, row := range dataset.Rows[:counts] {
                ids = append(ids, row.ID)
                titles = append(titles, row.Title)
                titleVectors = append(titleVectors, row.TitleVector)
                links = append(links, row.Link)
                readingTimes = append(readingTimes, row.ReadingTime)
                publications = append(publications, row.Publication)
                claps = append(claps, row.Claps)
                responses = append(responses, row.Response)
        }

        // 按列排列
        idColumn := entity.NewColumnInt64("id", ids)
        titleColumn := entity.NewColumnVarChar("title", titles)
        titleVectorColumn := entity.NewColumnFloatVector("title_vector", 768, titleVectors)
        linkColumn := entity.NewColumnVarChar("link", links)
        readingTimeColumn := entity.NewColumnInt64("reading_time", readingTimes)
        publicationColumn := entity.NewColumnVarChar("publication", publications)
        clapColumn := entity.NewColumnInt64("claps", claps)
        responseColumn := entity.NewColumnInt64("responses", responses)

        return []entity.Column{
                idColumn,
                titleColumn,
                titleVectorColumn,
                linkColumn,
                readingTimeColumn,
                publicationColumn,
                clapColumn,
                responseColumn,
        }, nil
}
```

### 插入数据

准备好数据后，可以按如下方式插入数据：

```python
# 7. 插入数据

with open('/path/to/downloaded/medium_articles_2020_dpr.json') as f:
    data = json.load(f)
    rows = data['rows']

results = collection.insert(rows)

# with open('medium_articles_2020_dpr.json') as f:
#     data = json.load(f)
#     rows = data['rows']
#     keys = list(rows[0].keys())
#     columns = [ [] for x in keys ]
#     for row in rows:
#         for x in keys:
#             columns[keys.index(x)].append(row[x])

#     columns = [ [] for x in keys ]
#     for row in rows:
#         for x in keys:
#             columns[keys.index(x)].append(row[x])

# results = collection.insert(columns) # also works

collection.flush()

print(f"Data inserted successfully! Inserted rows: {results.insert_count}")

# 输出：
# Data inserted successfully! Inserted rows: 5979
```

```javascript
// 7. 插入数据

// 在异步函数声明中包含以下内容：

const data = JSON.parse(fs.readFileSync("path/to/downloaded/medium_articles_2020_dpr.json", "utf-8"));
const rows = data.rows;

res = await client.insert({
    collection_name,
    data: rows
});

console.log(res);

// 输出：
// {
//   succ_index: [
//      0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
//     12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
//     24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
//     36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
//     48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
//     60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
//     72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
//     84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
//     96, 97, 98, 99,
//     ... 5879 more items
//   ],
//   err_index: [],
//   status: { error_code: 'Success', reason: '' },
//   IDs: { int_id: { data: [Array] }, id_field: 'int_id' },
//   acknowledged: false,
//   insert_cnt: '5979',
//   delete_cnt: '0',
//   upsert_cnt: '0',
//   timestamp: '442251330624684034'
// }

res = await client.flush({
    collection_names: [collection_name]
});

console.log(res);

// 输出：
// {
//    coll_segIDs: { medium_articles: { data: [Array] } },
//    flush_coll_segIDs: { medium_articles: { data: [] } },
//    coll_seal_times: { medium_articles: '1687054942' },
//    status: { error_code: 'Success', reason: '' },
//    db_name: 'default'
// }
```

```java
// 7. 插入数据

// 在主函数中包含以下内容：

// 读取数据集
String content;

Path file = Path.of("medium_articles_2020_dpr.json");
try {
    content = Files.readString(file);
} catch (Exception e) {
    System.out.println("Failed to read file: " + e.getMessage());
    return;
}

System.out.println("Successfully read file");

// 加载数据集
JSONObject dataset = JSON.parseObject(content);
// List<JSONObject> rows = getRows(dataset.getJSONArray("rows"), 5979);
List<Field> fields = getFields(dataset.getJSONArray("rows"), 5979); // also works

// 按列插入数据
InsertParam insertParam = InsertParam.newBuilder()
    .withCollectionName("medium_articles")
    .withFields(fields)
    // .withRows(rows)
    .build();

R<MutationResult> insertResponse = client.insert(insertParam);

if (insertResponse.getStatus() != R.Status.Success.getCode()) {
    System.out.println(insertResponse.getMessage());
}

MutationResultWrapper mutationResultWrapper = new MutationResultWrapper(insertResponse.getData());

System.out.println("Successfully insert entities: " + mutationResultWrapper.getInsertCount());

// 输出：
// 2023-06-17 17:06:59 io.milvus.client.AbstractMilvusGrpcClient logInfo 
// INFO: InsertParam{collectionName='medium_articles', partitionName='', rowCount=5979}
// 2023-06-17 17:06:59 io.milvus.client.AbstractMilvusGrpcClient logInfo 
// INFO: DescribeCollectionParam(databaseName=null, collectionName=medium_articles)
// Successfully insert entities: 5979

List<String> collectionNames = new ArrayList();
collectionNames.add("medium_articles");

FlushParam flushParam = FlushParam.newBuilder()
    .withCollectionNames(collectionNames)
    .withSyncFlush(true)
    .build();

R<FlushResponse> flush = client.flush(flushParam);

if (flush.getException() != null) {
    System.out.println("Failed to flush: " + flush.getException().getMessage());
    return;
}

System.out.println("Flushed!");

// 输出：
// 2023-06-17 17:07:04 io.milvus.client.AbstractMilvusGrpcClient logInfo 
// INFO: DropCollectionParam{collectionName='medium_articles'}
// 2023-06-17 17:07:05 io.milvus.client.AbstractMilvusGrpcClient logInfo 
// INFO: FlushParam{collectionNames='[medium_articles]', syncFlush=true, syncFlushWaitingInterval=500, syncFlushWaitingTimeout=60}
// Flushed!
```

```go
// 7. 插入数据

// 在主函数中包含以下内容：

// 读取数据集
file, err := os.ReadFile("path/to/downloaded/medium_articles_2020_dpr.json")
if err != nil {
        log.Fatal("Failed to read file:", err.Error())
}

// 加载数据集
var data Dataset

if err := json.Unmarshal(file, &data); err != nil {
        log.Fatal(err.Error())
}

log.Println("Dataset loaded, row number: ", len(data.Rows))

// 按行插入数据
rows, err := getRows(data, 5979)

log.Println("Rows prepared: ", len(rows))

results, err := conn.InsertRows(context.Background(), "medium_articles", "", rows)

if err != nil {
        log.Fatal("Failed to insert rows:", err.Error())
}

// Or insert columns
// columns, err := getColumns(data, 5979)
// 
// for _, column := range columns {
//         log.Println(column.Name())
// }
// 
// results, err := conn.Insert(context.Background(), "medium_articles", "", columns...)
// 
// if err != nil {
//         log.Fatal("Failed to insert rows:", err.Error())
// 
// }

log.Println("Entities inserted:", results.Len())

// 输出：
// 2023/06/17 16:47:35 Entities inserted: 5979

fluerr := conn.Flush(context.Background(), "medium_articles", false)

if fluerr != nil {
        log.Fatal("Failed to flush collection:", fluerr.Error())
}

log.Println("Collection flushed")

// 输出：
// 2023/06/17 17:09:32 Collection flushed
```

## 搜索和查询

单向量搜索是指仅指定一个查询向量，搜索并返回与查询向量最相似的前 *K* 个 Entity。

Zilliz Cloud 也支持在单个请求中指定多个查询向量来进行批量搜索。大多数情况下，批量搜索比单向量搜索更高效，因为批量搜索的总延时会比逐一执行单向量搜索的累计延时要低。

搜索前需定义搜索相关参数，并确保搜索参数中定义的相似度类型与索引参数中定义的一致。您可以在搜索请求中引用搜索参数，并指定查询向量、向量字段名称、返回结果限制以及其他相关参数。

以下代码搜索与指定查询向量最相近的 5 条 Entity，并返回各 Entity 的主键、距离等信息。

```python
# 8. 搜索数据

result = collection.search(
    data=[rows[0]['title_vector']],
    anns_field="title_vector",
    param={"metric_type": "L2", "params": {"nprobe": 10}},
    limit=3,
    expr='claps > 30 and reading_time < 10',
    output_fields=["title", "link" ],
)

# 获取返回所有 ID
# result[0]表示 'data' 列中第一个查询向量的结果
ids = result[0].ids

print(ids)

# 输出：
#
# [5607, 5641, 3441]

# Get the distance from 
# all returned vectors to the query vector.
distances = result[0].distances

print(distances)

# 输出：
#
# [0.36103835701942444, 0.37674015760421753, 0.4162980318069458]

# Get the values of the output fields
# specified in the search request
hits = result[0]
for hit in hits:
    print(hit.entity.get("title"))
    print(hit.entity.get("link"))

# 输出：
#
# The Hidden Side Effect of the Coronavirus
# https://medium.com/swlh/the-hidden-side-effect-of-the-coronavirus-b6a7a5ee9586
# Why The Coronavirus Mortality Rate is Misleading
# https://towardsdatascience.com/why-the-coronavirus-mortality-rate-is-misleading-cc63f571b6a6
# Coronavirus shows what ethical Amazon could look like
# https://medium.com/swlh/coronavirus-shows-what-ethical-amazon-could-look-like-7c80baf2c663
```

```javascript
// 8. 搜索数据

// 在异步函数声明中包含以下内容：

res = await client.search({
    collection_name,
    vector: rows[0].title_vector,
    limit: 3,
    filter: "claps > 30 and reading_time < 10",
    output_fields: ["title", "link"]
});

console.log(res);

// 输出：
// {
//   status: { error_code: 'Success', reason: '' },
//   results: [
//     {
//       score: -0.8194807767868042,
//       id: '5607',
//       title: 'The Hidden Side Effect of the Coronavirus',
//       link: '<https://medium.com/swlh/the-hidden-side-effect-of-the-coronavirus-b6a7a5ee9586>'
//     },
//     {
//       score: -0.8116300106048584,
//       id: '5641',
//       title: 'Why The Coronavirus Mortality Rate is Misleading',
//       link: '<https://towardsdatascience.com/why-the-coronavirus-mortality-rate-is-misleading-cc63f571b6a6>'
//     },
//     {
//       score: -0.7918509244918823,
//       id: '3441',
//       title: 'Coronavirus shows what ethical Amazon could look like',
//       link: '<https://medium.com/swlh/coronavirus-shows-what-ethical-amazon-could-look-like-7c80baf2c663>'
//     }
//   ]
// }
```

```java
// 8. 搜索数据

// 在主函数中包含以下内容：

List<List<Float>> queryVectors = new ArrayList<>();
List<Float> queryVector = rows.get(0).getJSONArray("title_vector").toJavaList(Float.class);
queryVectors.add(queryVector);

// 定义 outputFields
List<String> outputFields = new ArrayList<>();
outputFields.add("title");
outputFields.add("link");

// 在 Collection 中搜索向量
SearchParam searchParam = SearchParam.newBuilder()
    .withCollectionName("medium_articles")
    .withVectorFieldName("title_vector")
    .withVectors(queryVectors)
    .withExpr("claps > 30 and reading_time < 10")
    .withTopK(3)   
    .withMetricType(MetricType.L2)  
    .withParams("{\\"nprobe\\":10,\\"offset\\":2, \\"limit\\":3}")
    .withConsistencyLevel(ConsistencyLevelEnum.BOUNDED)
    .withOutFields(outputFields)
    .build();

R<SearchResults> response = client.search(searchParam);

SearchResultsWrapper wrapper = new SearchResultsWrapper(response.getData().getResults());
System.out.println("Search results");

for (int i = 0; i < queryVectors.size(); ++i) {
    List<SearchResultsWrapper.IDScore> scores = wrapper.getIDScore(i);
        List<String> titles = (List<String>) wrapper.getFieldData("title", i);
    for (int j = 0; j < scores.size(); ++j) {
        SearchResultsWrapper.IDScore score = scores.get(j);
        System.out.println("Top " + j + " ID:" + score.getLongID() + " Distance:" + score.getScore());
                System.out.println("Title: " + titles.get(j));    
        }
}

// 输出：
// Search results
// Top 0 ID:442206870369024034 Distance:0.41629803
// Title: Coronavirus shows what ethical Amazon could look like
// Top 1 ID:442206870369021531 Distance:0.4360938
// Title: Mortality Rate As an Indicator of an Epidemic Outbreak
// Top 2 ID:442206870369024868 Distance:0.48886314
// Title: How Can AI Help Fight Coronavirus?
```

```go
// 8. 搜索数据

// 在主函数中包含以下内容：

vectors := []entity.Vector{}

for _, row := range data.Rows[:1] {
        vector := make(entity.FloatVector, 0, 768)
        vector = append(vector, row.TitleVector...)
        vectors = append(vectors, vector)
}

// 定义搜索参数
sp := searchParams{10}

// 搜索数据
searchResults, err := conn.Search(
        context.Background(),
        "medium_articles",                // collection name
        []string{},                       // partition name
        "",                               // boolean expression
        []string{"title", "publication"}, // output fields
        vectors,                          // query vectors
        "title_vector",                   // vector field name
        entity.MetricType("L2"),          // metric type
        3,                                // topK
        sp,                               // search parameters
)

if err != nil {
        log.Fatal("Failed to search:", err.Error())
}

// 解析搜索结果
for i, sr := range searchResults {
        log.Println("Result counts", i, ":", sr.ResultCount)

        ids := sr.IDs.FieldData().GetScalars().GetLongData().GetData()
        scores := sr.Scores
        titles := sr.Fields.GetColumn("title").FieldData().GetScalars().GetStringData().GetData()
        publications := sr.Fields.GetColumn("publication").FieldData().GetScalars().GetStringData().GetData()

        for i, record := range ids {
                log.Println("ID:", record, "Score:", scores[i], "Title:", titles[i], "Publication:", publications[i])
        }

}

// 输出：
// 2023/06/17 17:28:28 Result counts 0 : 3
// 2023/06/17 17:28:28 ID: 0 Score: 0 Title: The Reported Mortality Rate of Coronavirus Is Not Important Publication: The Startup
// 2023/06/17 17:28:28 ID: 3177 Score: 0.29999837 Title: Following the Spread of Coronavirus Publication: Towards Data Science
// 2023/06/17 17:28:28 ID: 5607 Score: 0.36103836 Title: The Hidden Side Effect of the Coronavirus Publication: The Startup

// =======================================================
// 在 type 定义中包含以下内容：

// 为搜索参数定义 struct 和 func
type searchParams struct {
        nprobe int64
}

func (sp searchParams) Params() map[string]interface{} {
        return map[string]interface{}{
                "nprobe": sp.nprobe,
        }
}
```

## 相关文档

- [开启动态 Schema](https://zilliverse.feishu.cn/wiki/EpHowtn3miepTyk2pNlcLwDonyD)

- [JSON](https://zilliverse.feishu.cn/wiki/UXBjwVpKmirzg9kgWgmcLixwnIe)

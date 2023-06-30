---
sidebar_position: 0
---

# JSON

JSON 全称为 JavaScript Object Notation，是一种轻量级且易于使用的文本数据格式。JSON 字段由键值对组成，其中每个键是一个字符串，其相应的值可以是数字、字符串、布尔值、列表或数组。Zilliz Cloud 支持将字段以字典的形式插入到集群的 Collection 中。

以下示例代码展示如何以 JSON 形式存储一篇已发布文章的元数据：

```json
{
          'title': 'The Reported Mortality Rate of Coronavirus Is Not Important',
          'title_vector': [0.041732933, 0.013779674, -0.027564144, ..., 0.030096486],
          'article_meta': {
        'link': '<https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912>',
        'reading_time': 13,
        'publication': 'The Startup',
        'claps': 1100,
        'responses': 18
          }
}
```

创建列表或数组时，请确保所有字段的值都是相同类型。Zilliz Cloud 将所有嵌套字典视为字符串。在定义 JSON 键时，建议只使用字母、数字和下划线，其他字符类型可能会导致过滤或搜索时出错。

> 📘 说明：
>
> 您可以下载本指南中的源代码以供参考。

## 定义 JSON 字段

定义 JSON 字段的过程与定义其他类型字段的过程相同。

```python
import json
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType

# 1. 定义字段
fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True, max_length=100),
    FieldSchema(name="title", dtype=DataType.VARCHAR, max_length=512),
    FieldSchema(name="title_vector", dtype=DataType.FLOAT_VECTOR, dim=768),
    FieldSchema(name="article_meta", dtype=DataType.JSON),
]
# 2. 创建 Schema
schema = CollectionSchema(
                fields
)
# 3. 在 Collection 中引用 Schema
collection = Collection("medium_articles_with_json", schema)

# 4. 对向量字段进行索引
index_params = {
    "index_type": "AUTOINDEX",
    "metric_type": "L2",
    "params": {}
}

collection.create_index(
  field_name="title_vector",
  index_params=index_params
)

# 5. 加载 Collection
collection.load()
```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node");
const fs = require("fs");

async function main() {
    const client = new MilvusClient({
        address,
        token
    }, true);

    // 1. 定义字段
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
            name: "article_meta",
            data_type: DataType.JSON,
        }
    ];

    const collection_name = "medium_articles_with_json"

    // 2. 将字段信息收集到 req 中
    const req = {
        collection_name,
        fields,
    }

    // 3. 在集合中引用 req
    let res = await client.createCollection(req);

    console.log(res);

    // 4. 对向量字段进行索引
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

    // 5. 加载 Collection
    res = await client.loadCollection({
        collection_name
    });

    console.log(res);

    // 查看加载进度
    res = await client.getLoadingProgress({
        collection_name
    });

    console.log(res);

    res = await client.dropCollection({ collection_name });

    console.log(res);
}

main();
```

```java
import io.milvus.client.*;
import io.milvus.param.*;
import io.milvus.param.R;
import io.milvus.param.collection.FieldType;
import io.milvus.param.index.CreateIndexParam;
import io.milvus.param.collection.CreateCollectionParam;
import io.milvus.grpc.DataType;
import io.milvus.param.dml.InsertParam;
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

// 1. 定义字段
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

// JSON 字段
FieldType article_meta = FieldType.newBuilder()
    .withName("article_meta")
    .withDataType(DataType.JSON)
    .build();

// 2. 将字段信息收集到 req 中
CreateCollectionParam createCollectionParam = CreateCollectionParam.newBuilder()
    .withCollectionName("medium_articles_with_json")
    .withDescription("Schema of Medium articles")
    .addFieldType(id)
    .addFieldType(title)
    .addFieldType(title_vector)
    .addFieldType(article_meta)
    .withEnableDynamicField(false)
    .build();

// 3. 在 Collection 中创建 Schema
R<RpcStatus> collection = client.createCollection(createCollectionParam);

if (collection.getException() != null) {
    System.out.println("Failed to create collection: " + collection.getException().getMessage());
    return;
}

// 4. 创建索引
CreateIndexParam createIndexParam = CreateIndexParam.newBuilder()
    .withCollectionName("medium_articles_with_json")
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

// 5. 加载集合
LoadCollectionParam loadCollectionParam = LoadCollectionParam.newBuilder()
    .withCollectionName("medium_articles_with_json")
    .build();

R<RpcStatus> loadCollectionRes = client.loadCollection(loadCollectionParam);

if (loadCollectionRes.getException() != null) {
    System.out.println("Failed to load collection: " + loadCollectionRes.getException().getMessage());
    return;
}

GetLoadingProgressParam getLoadingProgressParam = GetLoadingProgressParam.newBuilder()
    .withCollectionName("medium_articles_with_json")
    .build();

R<GetLoadingProgressResponse> getLoadingProgressRes = client.getLoadingProgress(getLoadingProgressParam);

if (getLoadingProgressRes.getException() != null) {
    System.out.println("Failed to get loading progress: " + getLoadingProgressRes.getException().getMessage());
    return;
}

// 输出：
// 2023-06-10 15:37:45 io.milvus.client.AbstractMilvusGrpcClient logInfo
// INFO: CreateCollectionParam(collectionName=medium_articles_with_json, shardsNum=2, description=Schema of Medium articles, fieldTypes=[FieldType{name='id', type='Int64', primaryKey=true, partitionKey=false, autoID=true, params={}}, FieldType{name='title', type='VarChar', primaryKey=false, partitionKey=false, autoID=false, params={max_length=512}}, FieldType{name='title_vector', type='FloatVector', primaryKey=false, partitionKey=false, autoID=false, params={dim=768}}, FieldType{name='article_meta', type='JSON', primaryKey=false, partitionKey=false, autoID=false, params={}}], partitionsNum=0, consistencyLevel=BOUNDED, databaseName=null, enableDynamicField=false)
// 2023-06-10 15:37:46 io.milvus.client.AbstractMilvusGrpcClient logInfo
// INFO: CreateIndexParam(databaseName=null, collectionName=medium_articles_with_json, fieldName=title_vector, indexName=title_vector_index, extraParam={metric_type=L2, index_type=AUTOINDEX}, syncMode=true, syncWaitingInterval=500, syncWaitingTimeout=600)
// 2023-06-10 15:37:48 io.milvus.client.AbstractMilvusGrpcClient logInfo
// INFO: LoadCollectionParam(databaseName=null, collectionName=medium_articles_with_json, syncLoad=true, syncLoadWaitingInterval=500, syncLoadWaitingTimeout=60, replicaNumber=1, refresh=false)
// 2023-06-10 15:37:50 io.milvus.client.AbstractMilvusGrpcClient logInfo
// INFO: GetLoadingProgressParam{collectionName='medium_articles_with_json', partitionNames='[]'}
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

// 1. 定义字段
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

// JSON 字段
article_meta := entity.NewField().
        WithName("article_meta").
        WithDataType(entity.FieldTypeJSON)

// 2. 创建 Schema
schema := &entity.Schema{
        CollectionName: "medium_articles_with_json",
        Description:    "Medium articles published between Jan and August in 2020 in prominent publications",
        AutoID:         true,
        Fields: []*entity.Field{
                id,
                title,
                title_vector,
                article_meta,
        },
        EnableDynamicField: true,
}

// 3. 创建 Collection
colerr := conn.CreateCollection(context.Background(), schema, 2)

if colerr != nil {
        log.Fatal("Failed to create collection:", colerr.Error())
}

// 4. 创建索引
index, err := entity.NewIndexAUTOINDEX(entity.MetricType("L2"))

if err != nil {
        log.Fatal("Failed to prepare the index:", err.Error())
}

err = conn.CreateIndex(
        context.Background(),
        "medium_articles_with_json",
        "title_vector",
        index,
        false,
)

if err != nil {
        log.Fatal("Failed to create the index:", err.Error())
}

// 5. 加载 Collection
loadCollErr := conn.LoadCollection(
        context.Background(),
        "medium_articles_with_json",
        false,
)

if loadCollErr != nil {
        log.Fatal("Failed to load collection:", loadCollErr.Error())
}

// 查看加载进程
progress, err := conn.GetLoadingProgress(
        context.Background(),
        "medium_articles_with_json",
        nil,
)

if err != nil {
        log.Fatal("Failed to get loading progress:", err.Error())
}

println("Loading progress:", progress)
```

上述代码中，您需要创建一个与 JSON 字段对应的 `**FieldSchema**`  对象，并将 `**dtype**`  属性设置为 `**DataType.JSON**`。

## 插入字段值

从 `**CollectionSchema**` 对象创建 Collection 之后，可以将字典数据插入到 Collection 中。

```python
# 6. 准备数据
with open("path/to/medium_articles_2020_dpr.json") as f:
    data = json.load(f)
    list_of_rows = data['rows']

    data_rows = []
    for row in list_of_rows:
        data_rows.append({
            "title": row["title"],
            "title_vector": row["title_vector"],
            "article_meta": dict(
                link=row["link"],
                reading_time=row['reading_time'],
                publication=row["publication"],
                claps=row["claps"],
                responses=row["responses"],
            )
        })

    print(data_rows[0])

# 输出：
# {
#           'title': 'The Reported Mortality Rate of Coronavirus Is Not Important', 
#           'title_vector': [0.041732933, 0.013779674, -0.027564144, ..., 0.030096486], 
#           'article_meta': {
#        'link': '<https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912>', 
#         'reading_time': 13, 
#         'publication': 'The Startup', 
#         'claps': 1100, 
#         'responses': 18
#           }
# }

# 7. 插入数据
collection.insert(data_rows)
collection.flush()

# 输出：
# Number of entities in collection:  5979
```

```javascript
// 6. 准备数据
const data = JSON.parse(fs.readFileSync("medium_articles_2020_dpr.json", { encoding: "utf-8" }));
const rows = data.rows.map((row, index) => {
    return {
        id: row.id,
        title: row.title,
        title_vector: row.title_vector,
        article_meta: {
            link: row.link,
            reading_time: row.reading_time,
            publication: row.publication,
            claps: row.claps,
            responses: row.responses,
        }
    }
});

console.log(rows[0]);

// {
//   id: 0,
//   title: 'The Reported Mortality Rate of Coronavirus Is Not Important',
//   title_vector: [
//       0.041732933,   0.013779674,   -0.027564144, -0.013061441,
//     ... 764 more items
//   ],
//   article_meta: {
//     link: '<https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912>',
//     reading_time: 13,
//     publication: 'The Startup',
//     claps: 1100,
//     responses: 18
//   }
// }

//7. 插入数据

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
//   timestamp: '442282689587576833'
// }

res = await client.flush({
    collection_names: [collection_name]
});

console.log(res);

// 输出：
// {
//   coll_segIDs: { medium_articles_with_json: { data: [Array] } },
//   flush_coll_segIDs: { medium_articles_with_json: { data: [] } },
//   coll_seal_times: { medium_articles_with_json: '1687174567' },
//   status: { error_code: 'Success', reason: '' },
//   db_name: 'default'
// }
```

```java
// 6. 读取本地文件

String content;

Path file = Path.of("medium_articles_2020_dpr.json");
try {
    content = Files.readString(file);
} catch (Exception e) {
    System.out.println("Failed to read file: " + e.getMessage());
    return;
}

System.out.println("Successfully read file");

JSONObject dataset = JSON.parseObject(content);
List<JSONObject> rows = getRows(dataset.getJSONArray("rows"), 5979);

// 7. insert data
InsertParam insertParam = InsertParam.newBuilder()
    .withCollectionName("medium_articles_with_json")
    .withRows(rows)
    .build();

R<MutationResult> insertResponse = client.insert(insertParam);

if (insertResponse.getStatus() != R.Status.Success.getCode()) {
    System.out.println(insertResponse.getMessage());
}

MutationResultWrapper mutationResultWrapper = new MutationResultWrapper(insertResponse.getData());

System.out.println("Successfully insert entities: " + mutationResultWrapper.getInsertCount());

// 输出：
// Successfully insert entities: 5979

// The following is the function used to prepare the data
public static List<JSONObject> getRows(JSONArray dataset, int counts) {
    List<JSONObject> rows = new ArrayList<JSONObject>();
    for (int i = 0; i < counts; i++) {
        JSONObject json_row = new JSONObject(1, true);
        JSONObject article_meta = new JSONObject(1, true);
        JSONObject original_row = dataset.getJSONObject(i);

        String title = original_row.getString("title");
        String link = original_row.getString("link");
        String publication = original_row.getString("publication");
        Long reading_time = original_row.getLong("reading_time");
        Long claps = original_row.getLong("claps");
        Long responses = original_row.getLong("responses");
        List<Float> vectors = original_row.getJSONArray("title_vector").toJavaList(Float.class);

        article_meta.put("link", link);
        article_meta.put("publication", publication);
        article_meta.put("reading_time", reading_time);
        article_meta.put("claps", claps);
        article_meta.put("responses", responses);
        json_row.put("title", title);
        json_row.put("title_vector", vectors);
        json_row.put("article_meta", article_meta);
        rows.add(json_row);
    }
    return rows;
}
```

```go
// 6. 读取本地文件
file, err := os.ReadFile("medium_articles_2020_dpr.json")
if err != nil {
        log.Fatal("Failed to read file:", err.Error())
}

var data Dataset

if err := json.Unmarshal(file, &data); err != nil {
        log.Fatal(err.Error())
}

log.Println("Dataset loaded, row number: ", len(data.Rows))

// 输出：
// 2023/06/19 19:53:40 Dataset loaded, row number:  5979

rows := make([]interface{}, 0, 1)

// 7. 插入行
for i := 0; i < len(data.Rows); i++ {
        id := data.Rows[i].ID
        title := data.Rows[i].Title
        titleVector := data.Rows[i].TitleVector
        articleMeta := Meta{
                Link:        data.Rows[i].Link,
                ReadingTime: data.Rows[i].ReadingTime,
                Publication: data.Rows[i].Publication,
                Claps:       data.Rows[i].Claps,
                Responses:   data.Rows[i].Responses,
        }

        jsonRow := JsonRow{
                ID:          id,
                Title:       title,
                TitleVector: titleVector,
                ArticleMeta: articleMeta,
        }

        rows = append(rows, jsonRow)
}

col, err := conn.InsertRows(context.Background(), "medium_articles_with_json", "", rows)
if err != nil {
        log.Fatal("Failed to insert rows:", err.Error())
}

log.Println("Number of entitie inserted", col.Len())

// Output:
// 2023/06/19 19:53:52 Number of entitie inserted 5979

// Structs and functions used in this section are 
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
        Responses   int64     `json:"responses" milvus:"name:responses"`
}

type JsonRow struct {
        ID          int64     `json:"id" milvus:"name:id"`
        Title       string    `json:"title" milvus:"name:title"`
        TitleVector []float32 `json:"title_vector" milvus:"name:title_vector"`
        ArticleMeta Meta      `json:"article_meta" milvus:"name:article_meta"`
}

type Meta struct {
        Link        string `json:"link" milvus:"name:link"`
        ReadingTime int64  `json:"reading_time" milvus:"name:reading_time"`
        Publication string `json:"publication" milvus:"name:publication"`
        Claps       int64  `json:"claps" milvus:"name:claps"`
        Responses   int64  `json:"responses" milvus:"name:responses"`
}

type searchParams struct {
        limit  int64
        offset int64
        nprobe int64
}

func (sp searchParams) Params() map[string]interface{} {
        return map[string]interface{}{
                "limit":  sp.limit,
                "offset": sp.offset,
                "nprobe": sp.nprobe,
        }
}
```

## 搜索 JSON 字段

所有数据插入完成后，您可以使用 JSON 字段中的键进行搜索，搜索方法与基于标量字段搜索相同。

```python
# 8. 搜索数据
result = collection.search(
    data=[data_rows[0]['title_vector']],
    anns_field="title_vector",
    param={"metric_type": "L2", "params": {"nprobe": 10}},
    limit=3,
    expr='article_meta["claps"] > 30 and article_meta["reading_time"] < 10',
    output_fields=["title", "article_meta" ],
)

for hits in result:
    print("Matched IDs: ", hits.ids)
    print("Distance to the query vector: ", hits.distances)
    print("Matched articles: ")
    for hit in hits:
        print(
            "Title: ", 
            hit.entity.get("title"), 
            ", Reading time: ", 
            hit.entity.get("article_meta")['reading_time'], 
            ", Claps", 
            hit.entity.get("article_meta")['claps']
        )

# 输出：
# Matched IDs:  [442206870370198289, 442206870370198323, 442206870370196123]
# Distance to the query vector:  [0.36103835701942444, 0.37674015760421753, 0.4162980318069458]
# Matched articles: 
# Title:  The Hidden Side Effect of the Coronavirus , Reading time:  8 , Claps 83
# Title:  Why The Coronavirus Mortality Rate is Misleading , Reading time:  9 , Claps 2900
# Title:  Coronavirus shows what ethical Amazon could look like , Reading time:  4 , Claps 51
```

```javascript
// 8. 搜索数据

res = await client.search({
    collection_name,
    data: rows[0]["title_vector"],
    limit: 3,
    filter: 'article_meta["claps"] > 30 and article_meta["reading_time"] < 10',
    output_fields: ["title", "article_meta"]
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
//       article_meta: [Object]
//     },
//     {
//       score: -0.8116300106048584,
//       id: '5641',
//       title: 'Why The Coronavirus Mortality Rate is Misleading',
//       article_meta: [Object]
//     },
//     {
//       score: -0.7918509244918823,
//       id: '3441',
//       title: 'Coronavirus shows what ethical Amazon could look like',
//       article_meta: [Object]
//     }
//   ]
// }
```

```java
// 8.设置查询向量
List<List<Float>> queryVectors = new ArrayList<>();
List<Float> queryVector1 = rows.get(0).getJSONArray("title_vector").toJavaList(Float.class);
queryVectors.add(queryVector1);

// 9. 设置输出字段
List<String> outputFields = new ArrayList<>();
outputFields.add("title");
outputFields.add("article_meta");   

// 10. 搜索向量
SearchParam searchParam = SearchParam.newBuilder()
    .withCollectionName("medium_articles_with_json")
    .withVectorFieldName("title_vector")
    .withVectors(queryVectors)
    .withTopK(3)   
    .withMetricType(MetricType.L2)  
    .withParams("{\\"nprobe\\":10,\\"offset\\":2, \\"limit\\":3}")
    .withOutFields(outputFields)
    .withExpr("article_meta[\\"claps\\"] > 30 and article_meta['reading_time'] < 10")
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
        System.out.println("Reading time: " + ((JSONObject) scores.get(j).get("article_meta")).getLong("reading_time"));
        System.out.println("Claps: " + ((JSONObject) scores.get(j).get("article_meta")).getLong("claps"));
    }
    System.out.print("=====================================\\n");
}

// 输出：
// Search results
// Top 0 ID:442206870370214072 Distance:0.41629803
// Title: Coronavirus shows what ethical Amazon could look like
// Reading time: 4
// Claps: 51
// Top 1 ID:442206870370211569 Distance:0.4360938
// Title: Mortality Rate As an Indicator of an Epidemic Outbreak
// Reading time: 6
// Claps: 65
// Top 2 ID:442206870370214906 Distance:0.48886314
// Title: How Can AI Help Fight Coronavirus?
// Reading time: 9
// Claps: 255
```

```go
vectors := []entity.Vector{}

for _, row := range data.Rows[:1] {
        vector := make(entity.FloatVector, 0, 768)
        vector = append(vector, row.TitleVector...)
        vectors = append(vectors, vector)
}

sp := searchParams{10, 0, 16}

searchResults, err := conn.Search(
        context.Background(),
        "medium_articles_with_json",
        []string{},
        "article_meta[\\"claps\\"] > 30 and article_meta['reading_time'] < 10",
        []string{"title", "article_meta"},
        vectors,
        "title_vector",
        entity.MetricType("L2"),
        3,
        sp,
)

if err != nil {
        log.Fatal("Failed to search:", err.Error())
}

for i, sr := range searchResults {
        log.Println("Result counts", i, ":", sr.ResultCount)

        ids := sr.IDs.FieldData().GetScalars().GetLongData().GetData()
        scores := sr.Scores
        titles := sr.Fields.GetColumn("title").FieldData().GetScalars().GetStringData().GetData()
        article_metas := sr.Fields.GetColumn("article_meta").FieldData().GetScalars().GetJsonData().GetData()

        log.Println(article_metas)

        for i, record := range ids {
                var article_meta Meta
                json.Unmarshal(article_metas[i], &article_meta)

                log.Println("ID:", record, "Score:", scores[i], "Title:", titles[i], "Claps:", article_meta.Link, "Reading time:", article_meta.ReadingTime)
        }

}

// 输出：
// 2023/06/19 20:08:47 ID: 5607 Score: 0.36103836 Title: The Hidden Side Effect of the Coronavirus Claps: <https://medium.com/swlh/the-hidden-side-effect-of-the-coronavirus-b6a7a5ee9586> Reading time: 8
// 2023/06/19 20:08:47 ID: 5641 Score: 0.37674016 Title: Why The Coronavirus Mortality Rate is Misleading Claps: <https://towardsdatascience.com/why-the-coronavirus-mortality-rate-is-misleading-cc63f571b6a6> Reading time: 9
// 2023/06/19 20:08:47 ID: 3441 Score: 0.41629803 Title: Coronavirus shows what ethical Amazon could look like Claps: <https://medium.com/swlh/coronavirus-shows-what-ethical-amazon-could-look-like-7c80baf2c663> Reading time: 4
```

要访问 JSON 字段中的键，您可以在表达式 `**expr**` 中指定 JSON 字段名称和键名称（例如，`**article_meta["claps"]**`），并在 `**output_fields**` 中指定要输出的 JSON 字段。之后您就可以像访问普通字典一样访问 JSON 字段中的键。

## 使用限制

使用 JSON 字段时，您可以将字符串值用双引号（""）或单引号（''）括起来。需要注意的是，Zilliz Cloud 将 JSON 字段中的字符串值存储为原始字符串，不进行语义转换。例如，`**'a"b'**`、`**"a'b"**`、`**'a\\\\\\\\'b'**` 和 `**"a\\\\\\\\"b"**` 将按原样保存，而 `**'a'b'**` 和 `**"a"b"**` 将被视为无效值。

要使用 JSON 字段构建过滤表达式，可以引用 JSON 字段中的键。如果键值类型是整数或浮点数，则可以将其与另一个整数、浮点数、INT32/64 或 FLOAT32/64 字段进行比较。如果键值类型是字符串，则只能将其与另一个字符串键或 VARCHAR 字段进行比较。

假设 JSON 字段具有 `A` 键。使用 JSON 字段构建布尔表达式时，请参考以下表格。

| 操作符          | 示例                                             | 备注                        |
| ------------ | ---------------------------------------------- | ------------------------- |
| <            |  `"A < 3"`                                     | `A`  必须存在                 |
| >            |  `"A > 1"`                                     | `A`  必须存在                 |
| ==<br/><br/> |  `"A == 1"`  或 `"A == 'abc'"`                  | `A`  必须存在                 |
| !=           |  `"A != 1"` 或 `"A != 'abc'"`                   | `A`  可以不存在                |
| <=           |  `"A <= 5"`                                    | `A`  必须存在                 |
| >=           |  `"A >= 1"`                                    | `A`  必须存在                 |
| not          |  `"not A == 1"` 或 `"not A != 'abc'"`           | `A`  可以不存在                |
| in           |  `"A in [1, 2, 3]"` 或 `"A in ['a', 'b', 'c']"` | `A`  必须存在                 |
| add (&&)     | `"A > 1 && A < 3"`                             | `A`  是否必须存在取决于运算符两侧表达式的要求 |
| or (\\|\\|)  | `"A > 1 \\|\\| A < 3"`                         | `A`  是否必须存在取决于运算符两侧表达式的要求 |
| exist        | `"exist A"`                                    | `A`  必须存在                 |


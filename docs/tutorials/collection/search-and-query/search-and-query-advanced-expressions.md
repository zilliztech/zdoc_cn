---
slug: /search-and-query-advanced-expressions
beta: TRUE
notebook: 10_search_query_advanced_ops.ipynb
sidebar_position: 4
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 使用高级表达式搜索和查询

本指南将介绍如何在 Zilliz Cloud 中使用高级表达式 `count()` 和 `json_contains()` 来执行搜索或查询操作。

## 概述{#overview}

Zilliz Cloud 现已支持在搜索或查询时使用高级表达式 `count()` 和 `json_contains()`。

- `count()`：用于检索 Collection 中的 Entity 数量。

- `json_contains()`：用于判断 JSON 键中是否包含特定元素。

<Admonition type="info" icon="📘" title="说明">

目前，`count()` 和 `json_contains()` 处于 Beta 测试阶段。请注意，该功能及相关文档在 Beta 测试期间可能会有所更改。

</Admonition>

## 开始前{#before-you-start}

在使用这些高级表达式之前，请确保以下几点：

- 您的集群已升级至 Beta 版本。

- 您已下载了示例数据集，更多详情参见[示例数据集](./example-dataset)。

## 准备数据{#prepare-your-dataset}

使用 `json_contains()` 之前，需要定义一个名为 `article_meta` 的 JSON 字段，并创建与数据集 Schema 相匹配的 Collection。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
# 0. Connect to cluster
connections.connect(
    uri=CLUSTER_ENDPOINT, # Public endpoint obtained from Zilliz Cloud
    token=TOKEN, # API key or a colon-separated cluster username and password
)

# 1. Define fields
fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True, max_length=100),
    FieldSchema(name="title", dtype=DataType.VARCHAR, max_length=512),
    FieldSchema(name="title_vector", dtype=DataType.FLOAT_VECTOR, dim=768),
    # The following field is a JSON field
    FieldSchema(name="article_meta", dtype=DataType.JSON)
]

# 2. Build the schema
schema = CollectionSchema(
    fields,
    description="Schema of Medium articles",
    enable_dynamic_field=False
)

# 3. Create collection
collection = Collection(
    name="medium_articles_with_json", 
    description="Medium articles published between Jan and August in 2020 in prominent publications",
    schema=schema
)

# 4. index the vector field
index_params = {
    "index_type": "AUTOINDEX",
    "metric_type": "L2",
    "params": {}
}

collection.create_index(
  field_name="title_vector", 
  index_params=index_params
)

# 5. load the collection
collection.load()

# Get loading progress
progress = utility.loading_progress(COLLECTION_NAME)

print(progress)

# Output
#
# {
#     "loading_progress": "100%"
# }
```

</TabItem>

<TabItem value='javascript'>

```javascript
async function main() {
    // 1. Connect to the cluster
    const client = new MilvusClient({address, token})
    
    // 2. Define fields
    fields = [
        {
            name: "id",
            data_type: DataType.Int64,
            is_primary_key: true,
            auto_id: true
        },
        {
            name: "title",
            data_type: DataType.VarChar,
            max_length: 512
        },
        {
            name: "title_vector",
            data_type: DataType.FloatVector,
            dim: 768
        },
        {
            name: "article_meta",
            // This field is a JSON field.
            data_type: DataType.JSON
        }
    ]
    
    // 3. Create collection
    res = await client.createCollection({
        collection_name: collectionName,
        fields: fields
    })

    console.log(res)

    // Output
    // 
    // { error_code: 'Success', reason: '', code: 0 }
    // 

    // 4. Create index
    res = await client.createIndex({
        collection_name: collectionName,
        field_name: "title_vector",
        index_type: "IVF_FLAT",
        metric_type: "L2",
        params: {
            nlist: 16384
        }
    })

    console.log(res)

    // Output
    // 
    // { error_code: 'Success', reason: '', code: 0 }
    // 

    res = await client.loadCollection({
        collection_name: collectionName
    })

    console.log(res)

    // Output
    // 
    // { error_code: 'Success', reason: '', code: 0 }
    // 
```

</TabItem>

<TabItem value='java'>

```java
// 1. Connect to cluster
ConnectParam connectParam = ConnectParam.newBuilder()
    .withUri(clusterEndpoint)
    .withToken(token)
    .build();

MilvusServiceClient client = new MilvusServiceClient(connectParam);

System.out.println("Connected to Zilliz Cloud!");
// Output:
// Connected to Zilliz Cloud!

// 2. Create cluster
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

// The following field is a JSON field.
FieldType article_meta = FieldType.newBuilder()
    .withName("article_meta")
    .withDataType(DataType.JSON)
    .build();

CreateCollectionParam createCollectionParam = CreateCollectionParam.newBuilder()
    .withCollectionName(collectionName)
    .withDescription("Schema of Medium articles")
    .addFieldType(id)
    .addFieldType(title)
    .addFieldType(title_vector)
    .addFieldType(article_meta)
    .build();

R<RpcStatus> collection = client.createCollection(createCollectionParam);

if (collection.getException() != null) {
    System.err.println("Failed to create collection: " + collection.getException().getMessage());
    return;
}

System.out.println("Successfully created a collection with name: " + collectionName);
// Output:
// Successfully created a collection with name: medium_articles

// 3. Index and load the collection

// Create index
CreateIndexParam createIndexParam = CreateIndexParam.newBuilder()
    .withCollectionName(collectionName)
    .withFieldName("title_vector")
    .withIndexName("title_vector_index")
    .withIndexType(IndexType.AUTOINDEX)
    .withMetricType(MetricType.L2)
    .build();

R<RpcStatus> res = client.createIndex(createIndexParam);

if (res.getException() != null) {
    System.err.println("Failed to create index: " + res.getException().getMessage());
    return;
}

System.out.println("Successfully created index");
// Output:
// Successfully created index

// Load collection
LoadCollectionParam loadCollectionParam = LoadCollectionParam.newBuilder()
    .withCollectionName(collectionName)
    .build();

R<RpcStatus> loadCollectionRes = client.loadCollection(loadCollectionParam);

if (loadCollectionRes.getException() != null) {
    System.err.println("Failed to load collection: " + loadCollectionRes.getException().getMessage());
    return;
}

GetLoadingProgressParam getLoadingProgressParam = GetLoadingProgressParam.newBuilder()
    .withCollectionName(collectionName)
    .build();

R<GetLoadingProgressResponse> getLoadingProgressRes = client.getLoadingProgress(getLoadingProgressParam);

if (getLoadingProgressRes.getException() != null) {
    System.err.println("Failed to get loading progress: " + getLoadingProgressRes.getException().getMessage());
    return;
}

System.out.println("Successfully loaded collection");
// Output:
// Successfully loaded collection
```

</TabItem>
</Tabs>

创建并索引完 Collection 后，将示例数据集格式化以适应 Collection 的 Schema。以下示例展示了如何在 `article_meta` JSON 字段中增加 `tags_1` 和 `tags_2` 两个新行：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
# 6. Prepare data

# Prepare a list of rows
with open("path/to/medium_articles_2020_dpr.json") as f:
    data = json.load(f)
    list_of_rows = data['rows']

    rows = []
    for row in list_of_rows:
        # Remove the id field because auto-id is enabled for the primary key
        del row['id']
        # Create the article_meta field and 
        row['article_meta'] = {}
        # Move the following keys into the article_meta field
        row['article_meta']['link'] = row.pop('link')
        row['article_meta']['reading_time'] = row.pop('reading_time')
        row['article_meta']['publication'] = row.pop('publication')
        row['article_meta']['claps'] = row.pop('claps')
        row['article_meta']['responses'] = row.pop('responses')
        row['article_meta']['tags_1'] = [ random.randint(0, 40) for x in range(40)]
        row['article_meta']['tags_2'] = [ [ random.randint(0, 40) for y in range(4) ] for x in range(10) ]
        # Append this row to the data_rows list
        rows.append(row)

print(rows[:1])

# Output
#
# [
#     {
#         "title": "The Reported Mortality Rate of Coronavirus Is Not Important",
#         "title_vector": [
#             0.041732933,
#             0.013779674,
#             -0.027564144,
#             -0.013061441,
#             0.009748648,
#             0.00082446384,
#             -0.00071647146,
#             0.048612226,
#             -0.04836573,
#             -0.04567751,
#             "(758 more items hidden)"
#         ],
#         "article_meta": {
#             "link": "https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912",
#             "reading_time": 13,
#             "publication": "The Startup",
#             "claps": 1100,
#             "responses": 18,
#             "tags_1": [
#                 20,
#                 39,
#                 4,
#                 4,
#                 11,
#                 30,
#                 6,
#                 23,
#                 29,
#                 1,
#                 "(30 more items hidden)"
#             ],
#             "tags_2": [
#                 [
#                     37,
#                     29,
#                     23,
#                     27
#                 ],
#                 [
#                     6,
#                     34,
#                     17,
#                     33
#                 ],
#                 [
#                     39,
#                     9,
#                     15,
#                     37
#                 ],
#                 [
#                     3,
#                     28,
#                     21,
#                     10
#                 ],
#                 [
#                     40,
#                     15,
#                     36,
#                     20
#                 ],
#                 [
#                     15,
#                     24,
#                     40,
#                     26
#                 ],
#                 [
#                     8,
#                     36,
#                     18,
#                     19
#                 ],
#                 [
#                     36,
#                     21,
#                     16,
#                     28
#                 ],
#                 [
#                     14,
#                     6,
#                     32,
#                     18
#                 ],
#                 [
#                     23,
#                     31,
#                     36,
#                     39
#                 ]
#             ]
#         }
#     }
# ]
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 5. Prepare dataset
    
    const data = JSON.parse(fs.readFileSync(data_file))

    // read rows
    const rows = data["rows"]
    rows.forEach(row => {
        // add a new field in the row object
        row.article_meta = {}
        // move the following fields into the new field
        row.article_meta.link = row.link
        delete row.link
        row.article_meta.reading_time = row.reading_time
        delete row.reading_time
        row.article_meta.publication = row.publication
        delete row.publication
        row.article_meta.claps = row.claps
        delete row.claps
        row.article_meta.responses = row.responses
        delete row.responses
        row.article_meta.tags_1 = Array.from({length: 40}, () => Math.floor(Math.random() * 40));   
        row.article_meta.tags_2 = Array.from({length: 10}, () => Array.from({length: 4}, () => Math.floor(Math.random() * 40)))      
    });

    console.log(Object.keys(rows[0]))

    // Output
    // 
    // [ 'id', 'title', 'title_vector', 'article_meta' ]
    // 
```

</TabItem>

<TabItem value='java'>

```java
// 4. Read a local file
Path file = Path.of(data_file);
String content;

try {
    content = Files.readString(file);
} catch (Exception e) {
    System.err.println("Failed to read file: " + e.getMessage());
    return;
}

System.out.println("Successfully read file");
// Output:
// Successfully read file

// Load dataset
JSONObject dataset = JSON.parseObject(content);

// In addition to the original data, we also need to add some tags fields.
// The tags fields are used to demonstrate the use of the advanced expression.
// For details, examine the getRows function
List<JSONObject> rows = getRows(dataset.getJSONArray("rows"), 5979);
```

</TabItem>
</Tabs>

## 向 Collection 插入数据{#insert-data-into-the-collection}

使用以下代码将准备好的数据插入到 Collection 中：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
# 7. Insert data
results = collection.insert(rows)

print(f"Data inserted successfully! inserted rows: {results.insert_count}")

# Output
#
# Data inserted successfully! inserted rows: 5979
```

</TabItem>

<TabItem value='javascript'>

```javascript
    //insert vectors
    res = await client.insert({
        collection_name: collectionName,
        data: rows
    })

    console.log(res)

    // Output
    // 
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
    //   status: { error_code: 'Success', reason: '', code: 0 },
    //   IDs: { int_id: { data: [Array] }, id_field: 'int_id' },
    //   acknowledged: false,
    //   insert_cnt: '5979',
    //   delete_cnt: '0',
    //   upsert_cnt: '0',
    //   timestamp: '445318026051190787'
    // }
    // 

    await sleep(5000)
```

</TabItem>

<TabItem value='java'>

```java
InsertParam insertParam = InsertParam.newBuilder()
    .withCollectionName(collectionName)
    .withRows(rows)
    .build();

R<MutationResult> insertResponse = client.insert(insertParam);

if (insertResponse.getStatus() != R.Status.Success.getCode()) {
    System.err.println(insertResponse.getMessage());
}

MutationResultWrapper mutationResultWrapper = new MutationResultWrapper(insertResponse.getData());

System.out.println("Successfully insert entities: " + mutationResultWrapper.getInsertCount());
// Output:
// Successfully insert entities: 5979

// Wait for a while
try {
    // pause execution for 5 seconds
    Thread.sleep(5000);
} catch (InterruptedException e) {
    // handle the exception
    Thread.currentThread().interrupt();
}
```

</TabItem>
</Tabs>

## 使用 `count()`{#use-count}

在搜索或查询时，将 `count()` 包含在 `output_fields` 中可以检索 Collection 内的 Entity 数量。若需查询满足特定条件的 Entity 数量，可使用 `expr` 参数进行数据过滤。

### 查询所有 Entity 的数量{#count-all-entities}

使用以下代码查询 Collection 中的总 Entity 数量：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
num_of_entities = collection.query(expr="",output_fields=["count(*)"])

print(num_of_entities)
print(num_of_entities[0])

# Output:
# [{'count(*)': 5979}]
# {'count(*)': 5979}
```

</TabItem>

<TabItem value='javascript'>

```javascript
    // 6. Count entities

    counts = await client.query({
        collection_name: collectionName,
        filter: "",
        output_fields: ["count(*)"]
    })

    console.log(counts)

    // Output
    // 
    // {
    //   status: { error_code: 'Success', reason: '', code: 0 },
    //   data: [ { 'count(*)': '5979' } ]
    // }
    // 
```

</TabItem>

<TabItem value='java'>

```java
// 5. Count the entities using the 'count(*)' field

List<String> outputFields1 = new ArrayList<>();
outputFields1.add("count(*)");

QueryParam queryParam1 = QueryParam.newBuilder()
    .withCollectionName(collectionName)
    .withExpr("")
    .withOutFields(outputFields1)
    .build();

R<QueryResults> queryResponse1 = client.query(queryParam1);

if (queryResponse1.getException() != null) {
    System.err.println("Failed to query: " + queryResponse1.getException().getMessage());
    return;
}

QueryResultsWrapper queryResultsWrapper1 = new QueryResultsWrapper(queryResponse1.getData());

int count1 = ((Long) queryResultsWrapper1.getFieldWrapper("count(*)").getFieldData().get(0)).intValue();

System.out.println("The collection contains exactly " + count1 + " entities!");
// Output:
// The collection contains exactly 5979 entities!
```

</TabItem>
</Tabs>

以上代码将返回 Collection 中的 Entity 总数，因为没有在 `expr` 参数中设置任何过滤条件。

### 查询满足特定条件的 Entity 的数量{#count-entities-based-on-conditions}

查询满足特定条件的 entities 数量：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
entities = collection.query(
    expr='article_meta["claps"] > 30 and article_meta["reading_time"] < 10',
    output_fields=["count(*)"]
)

print(entities)
print(entities[0])

# Output:
# [{'count(*)': 4304}]
# {'count(*)': 4304}
```

</TabItem>

<TabItem value='javascript'>

```javascript
    // 7. Count entities with condition

    // matches all articles with tags_1 having the member 16
    const expr_1 = 'JSON_CONTAINS(article_meta["tags_1"], 16)'

    // matches all articles with tags_2 having the member [5, 3, 39, 8]
    const expr_2 = 'JSON_CONTAINS(article_meta["tags_2"], [5, 3, 39, 8])'

    // matches all articles with tags_1 having a member from [5, 3, 39, 8]
    const expr_3 = 'JSON_CONTAINS_ANY(article_meta["tags_1"], [5, 3, 39, 8])'

    // matches all articles with tags_1 having all members from [2, 4, 6]
    const expr_4 = 'JSON_CONTAINS_ALL(article_meta["tags_1"], [2, 4, 6])'

    counts = await client.query({
        collection_name: collectionName,
        filter: expr_1,
        output_fields: ["count(*)"]
    })

    console.log(counts)

    // Output
    // 
    // {
    //   status: { error_code: 'Success', reason: '', code: 0 },
    //   data: [ { 'count(*)': '3825' } ]
    // }
    // 
```

</TabItem>

<TabItem value='java'>

```java
// 6. Count the entities with filters

List<String> outputFields2 = new ArrayList<>();
outputFields2.add("count(*)");

QueryParam queryParam2 = QueryParam.newBuilder()
    .withCollectionName(collectionName)
    .withExpr("article_meta[\"claps\"] > 30 and article_meta[\"reading_time\"] < 10")
    .withOutFields(outputFields2)
    .build();

R<QueryResults> queryResponse2 = client.query(queryParam2);

if (queryResponse2.getException() != null) {
    System.err.println("Failed to query: " + queryResponse2.getException().getMessage());
    return;
}

QueryResultsWrapper queryResultsWrapper2 = new QueryResultsWrapper(queryResponse2.getData());

int count2 = ((Long) queryResultsWrapper2.getFieldWrapper("count(*)").getFieldData().get(0)).intValue();

System.out.println("The collection contains exactly " + count2 + " entities!");
// Output:
// The collection contains exactly 4304 entities!
```

</TabItem>
</Tabs>

以上代码将查询同时满足以下两个条件的 Entity 数量：

- `article_meta` 中 `claps` 超过 30。

- `article_meta` 中 `reading_time` 少于 10。

## 使用 `json_contains()` 进行搜索和查询{#search-and-query-with-jsoncontains}

在搜索或查询操作中，使用 `json_contains()` 来检查 JSON 键内是否存在特定值。

### 在向量搜索中使用 `json_contains()`{#use-jsoncontains-in-a-vector-search}

使用 `JSON_CONTAINS()` 过滤结果，以查找 `article_meta["tags_1"]` 中包含元素 `16` 的数据：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
# Define search parameters
search_params = {
    "metric_type": "L2",
    "params": {"nprobe": 10}
}

res = collection.search(
    data=[query_vector],
    anns_field="title_vector",
    param={"metric_type": "L2", "params": {"nprobe": 10}},
    limit=5,
    expr='JSON_CONTAINS(article_meta["tags_1"], 16)',
    output_fields=["title", "article_meta"]
)

ids = [ hits.ids for hits in res ]

print(ids)

# Output
#
# [
#     [
#         445311585782930475,
#         445311585782930509,
#         445311585782928309,
#         445311585782929013,
#         445311585782925710
#     ]
# ]

distances = [ hits.distances for hits in res ]

print(distances)

# Output
#
# [
#     [
#         0.36103832721710205,
#         0.37674015760421753,
#         0.416297972202301,
#         0.4928317368030548,
#         0.49443864822387695
#     ]
# ]

def get_tags_1(value, target):
    try:
        return value.index(target) >= 0
    except (ValueError):
        return False

results = [ {
    "id": hit.id,
    "distance": hit.distance,
    "entity": {
        "title": hit.entity.get("title"),
        "link": hit.entity.get("article_meta")['link'],
        "tags_1": get_tags_1(hit.entity.get("article_meta")["tags_1"], 16),
    }
} for hits in res for hit in hits ]

print(results)

# Output
#
# [
#     {
#         "id": 445311585782930475,
#         "distance": 0.36103832721710205,
#         "entity": {
#             "title": "The Hidden Side Effect of the Coronavirus",
#             "link": "https://medium.com/swlh/the-hidden-side-effect-of-the-coronavirus-b6a7a5ee9586",
#             "tags_1": true
#         }
#     },
#     {
#         "id": 445311585782930509,
#         "distance": 0.37674015760421753,
#         "entity": {
#             "title": "Why The Coronavirus Mortality Rate is Misleading",
#             "link": "https://towardsdatascience.com/why-the-coronavirus-mortality-rate-is-misleading-cc63f571b6a6",
#             "tags_1": true
#         }
#     },
#     {
#         "id": 445311585782928309,
#         "distance": 0.416297972202301,
#         "entity": {
#             "title": "Coronavirus shows what ethical Amazon could look like",
#             "link": "https://medium.com/swlh/coronavirus-shows-what-ethical-amazon-could-look-like-7c80baf2c663",
#             "tags_1": true
#         }
#     },
#     {
#         "id": 445311585782929013,
#         "distance": 0.4928317368030548,
#         "entity": {
#             "title": "Will Coronavirus Impact Freelancers\u2019 Ability to Rent?",
#             "link": "https://medium.com/swlh/will-coronavirus-impact-freelancers-ability-to-rent-ae11f2847bab",
#             "tags_1": true
#         }
#     },
#     {
#         "id": 445311585782925710,
#         "distance": 0.49443864822387695,
#         "entity": {
#             "title": "Choosing the right performance metrics can save lives against Coronavirus",
#             "link": "https://towardsdatascience.com/choosing-the-right-performance-metrics-can-save-lives-against-coronavirus-2f27492f6638",
#             "tags_1": true
#         }
#     }
# ]
```

</TabItem>

<TabItem value='javascript'>

```javascript
    // 8. Check if a specific element exists in JSON field

    // Search

    res = await client.search({
        collection_name: collectionName,
        vector: rows[0].title_vector,
        limit: 5,
        filter: expr_3,
        output_fields: ["title", "article_meta"]
    })

    console.log(res)

    // Output
    // 
    // {
    //   status: { error_code: 'Success', reason: '', code: 0 },
    //   results: [
    //     {
    //       score: 0,
    //       id: '0',
    //       title: 'The Reported Mortality Rate of Coronavirus Is Not Important',
    //       article_meta: [Object]
    //     },
    //     {
    //       score: 0.29999834299087524,
    //       id: '3177',
    //       title: 'Following the Spread of Coronavirus',
    //       article_meta: [Object]
    //     },
    //     {
    //       score: 0.36103832721710205,
    //       id: '5607',
    //       title: 'The Hidden Side Effect of the Coronavirus',
    //       article_meta: [Object]
    //     },
    //     {
    //       score: 0.37674015760421753,
    //       id: '5641',
    //       title: 'Why The Coronavirus Mortality Rate is Misleading',
    //       article_meta: [Object]
    //     },
    //     {
    //       score: 0.416297972202301,
    //       id: '3441',
    //       title: 'Coronavirus shows what ethical Amazon could look like',
    //       article_meta: [Object]
    //     }
    //   ]
    // }
    // 

    tags_1 = res.results.map((item) => item.article_meta["tags_1"])

    console.log(tags_1)

    // Output
    // 
    // [
    //   [
    //     24, 20, 37, 11,  3, 16, 26, 39, 18, 34,
    //     13, 25,  9, 37, 29, 30, 18, 34, 27, 22,
    //      6, 23,  3,  5, 14,  0, 23,  2, 36, 37,
    //     31, 28,  7, 18, 16,  1,  9, 12, 17,  3
    //   ],
    //   [
    //      9,  6, 34, 16,  2,  5, 15, 36,  6, 37,
    //     17,  7,  7, 13, 21,  6, 33, 37, 16, 24,
    //     35, 32, 17, 11, 33, 16, 22, 22, 39, 36,
    //      7, 37, 15, 21, 31, 16,  8, 37, 18, 17
    //   ],
    //   [
    //     23, 10, 35, 32, 23,  1,  1, 31, 10, 20,
    //     20,  2, 15,  3,  3, 22,  8, 27, 24, 18,
    //     36, 24, 22,  1, 24, 31,  9, 20, 25, 22,
    //     10, 36, 29, 25,  3, 17, 37,  2,  6,  0
    //   ],
    //   [
    //     37, 22, 38, 32, 20, 27,  3, 28, 23, 26,
    //     23, 22, 24,  7, 38, 23,  2,  5, 19,  6,
    //     14, 38, 24, 27, 11,  9, 30, 18, 38,  2,
    //     19, 16,  9,  1, 12, 16,  4,  0,  5,  2
    //   ],
    //   [
    //     18, 38, 28, 36,  0, 31, 31, 39,  1, 21,
    //     18,  0, 18, 38, 20, 31, 17,  1, 37,  7,
    //     29, 33, 13, 32, 29, 27, 27, 39, 19, 36,
    //     30,  4, 21,  6, 31, 26, 35,  7, 11, 24
    //   ]
    // ]
    // 
```

</TabItem>

<TabItem value='java'>

```java
// 7. Search with advanced filters

// matches all articles with tags_1 having the member 16
String expr_1 = "JSON_CONTAINS(article_meta[\"tags_1\"], 16)";

// matches all articles with tags_2 having the member [5, 3, 39, 8]
String expr_2 = "JSON_CONTAINS(article_meta[\"tags_2\"], [5, 3, 39, 8])";

// matches all articles with tags_1 having a member from [5, 3, 39, 8]
String expr_3 = "JSON_CONTAINS_ANY(article_meta[\"tags_1\"], [5, 3, 39, 8])";

// matches all articles with tags_1 having all members from [2, 4, 6]
String expr_4 = "JSON_CONTAINS_ALL(article_meta[\"tags_1\"], [2, 4, 6])";

// prepare query vector
List<List<Float>> queryVectors = new ArrayList<>();
List<Float> queryVector1 = rows.get(0).getJSONArray("title_vector").toJavaList(Float.class);
queryVectors.add(queryVector1);

// prepare output field
List<String> outputFields = new ArrayList<>();
outputFields.add("title");
outputFields.add("article_meta");

// Search vectors in a collection
SearchParam searchParam = SearchParam.newBuilder()
    .withCollectionName(collectionName)
    .withVectorFieldName("title_vector")
    .withVectors(queryVectors)
    .withTopK(5)   
    .withMetricType(MetricType.L2)  
    .withParams("{\"nprobe\":10}")
    .withConsistencyLevel(ConsistencyLevelEnum.BOUNDED)
    .withOutFields(outputFields)
    .withExpr(expr_1)
    .build();

R<SearchResults> response = client.search(searchParam);

SearchResultsWrapper wrapper = new SearchResultsWrapper(response.getData().getResults());

List<List<JSONObject>> results = new ArrayList<>();

for (int i = 0; i < queryVectors.size(); ++i) {
    List<SearchResultsWrapper.IDScore> scores = wrapper.getIDScore(i);
    List<JSONObject> entities = new ArrayList<>();
    for (int j = 0; j < scores.size(); ++j) {
        SearchResultsWrapper.IDScore score = scores.get(j);
        JSONObject entity = new JSONObject(1, true);
        entity.put("id", score.getLongID());
        entity.put("distance", score.getScore());
        entity.put("title", scores.get(j).get("title"));
        entity.put("reading_time", ((JSONObject) scores.get(j).get("article_meta")).getLong("reading_time"));
        entity.put("claps", ((JSONObject) scores.get(j).get("article_meta")).getLong("claps"));
        entity.put("tags_1", ((JSONObject) scores.get(j).get("article_meta")).getJSONArray("tags_1").indexOf(16) >= 0);
        entities.add(entity);
    }
    
    results.add(entities);
}

System.out.println(results);

// Output:
// [[{"id":445337000188379768,"distance":0.29999834,"title":"Following the Spread of Coronavirus","reading_time":10,"claps":215,"tags_1":true}, {"id":445337000188382232,"distance":0.37674016,"title":"Why The Coronavirus Mortality Rate is Misleading","reading_time":9,"claps":2900,"tags_1":true}, {"id":445337000188377529,"distance":0.4360938,"title":"Mortality Rate As an Indicator of an Epidemic Outbreak","reading_time":6,"claps":65,"tags_1":true}, {"id":445337000188379663,"distance":0.4627558,"title":"Can we learn anything from the progression of influenza to analyze the COVID-19 pandemic better?","reading_time":5,"claps":2,"tags_1":true}, {"id":445337000188380919,"distance":0.48078254,"title":"Ever Wondered How Epidemiologists Simulate COVID-19 Deaths?","reading_time":4,"claps":20,"tags_1":true}]]
```

</TabItem>
</Tabs>

### 在查询中使用 `json_contains()`{#use-jsoncontains-in-a-query}

使用 `JSON_CONTAINS_ALL()` 过滤结果，以查找 `article_meta["tags_1"]` 中包含 `[2, 4, 6]` 所有元素的数据：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
res = collection.query(
    limit=5,
    expr='JSON_CONTAINS_ALL(article_meta["tags_1"], [2, 4, 6])',
    output_fields=["title", "article_meta"]
)

res = [ {
    "title": x.get("title"),
    "article_meta": {
        "link": x.get("article_meta")['link'],
        "reading_time": x.get("article_meta")['reading_time'],
        "publication": x.get("article_meta")['publication'],
        "claps": x.get("article_meta")['claps'],
        "responses": x.get("article_meta")['responses'],
        "tags_1": get_tags_1(x.get("article_meta")['tags_1'], 2),
    },
} for x in res ]

print(res)

# Output
#
# [
#     {
#         "title": "The Reported Mortality Rate of Coronavirus Is Not Important",
#         "article_meta": {
#             "link": "https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912",
#             "reading_time": 13,
#             "publication": "The Startup",
#             "claps": 1100,
#             "responses": 18,
#             "tags_1": true
#         }
#     },
#     {
#         "title": "Dashboards in Python: 3 Advanced Examples for Dash Beginners and Everyone Else",
#         "article_meta": {
#             "link": "https://medium.com/swlh/dashboards-in-python-3-advanced-examples-for-dash-beginners-and-everyone-else-b1daf4e2ec0a",
#             "reading_time": 14,
#             "publication": "The Startup",
#             "claps": 726,
#             "responses": 3,
#             "tags_1": true
#         }
#     },
#     {
#         "title": "Would you rather have 8% of $25 or 25% of $8?",
#         "article_meta": {
#             "link": "https://medium.com/swlh/would-you-rather-have-8-of-25-or-25-of-8-486b3bc48f28",
#             "reading_time": 3,
#             "publication": "The Startup",
#             "claps": 208,
#             "responses": 5,
#             "tags_1": true
#         }
#     },
#     {
#         "title": "Big Reasons for Expanding Your Vocabulary, and How to Do It.",
#         "article_meta": {
#             "link": "https://medium.com/swlh/big-reasons-for-expanding-your-vocabulary-and-how-to-do-it-c78766e4df2",
#             "reading_time": 8,
#             "publication": "The Startup",
#             "claps": 417,
#             "responses": 3,
#             "tags_1": true
#         }
#     },
#     {
#         "title": "How to Find Things and Do Research in a Discovery Phase",
#         "article_meta": {
#             "link": "https://medium.com/swlh/how-to-find-things-and-do-research-in-a-discovery-phase-6c3e4f50b208",
#             "reading_time": 5,
#             "publication": "The Startup",
#             "claps": 330,
#             "responses": 0,
#             "tags_1": true
#         }
#     }
# ]
```

</TabItem>

<TabItem value='javascript'>

```javascript
    // Query

    res = await client.query({
        collection_name: collectionName,
        filter: expr_4,
        limit: 5,
        output_fields: ["title", "article_meta"]
    })

    console.log(res)

    // Output
    // 
    // {
    //   status: { error_code: 'Success', reason: '', code: 0 },
    //   data: [
    //     {
    //       title: 'Maternity leave shouldn’t set women back',
    //       article_meta: [Object],
    //       id: '3'
    //     },
    //     {
    //       title: 'Python NLP Tutorial: Information Extraction and Knowledge Graphs',
    //       article_meta: [Object],
    //       id: '4'
    //     },
    //     {
    //       title: 'Building Comprehensible Customer Churn Prediction Models',
    //       article_meta: [Object],
    //       id: '7'
    //     },
    //     {
    //       title: '5 Underrated Traits That Separate Exceptional Teams From the Rest',
    //       article_meta: [Object],
    //       id: '8'
    //     },
    //     {
    //       title: 'Building high performance startup teams',
    //       article_meta: [Object],
    //       id: '10'
    //     }
    //   ]
    // }
    // 

    tags_1 = res.data.map((item) => item.article_meta["tags_1"])

    console.log(tags_1)

    // Output
    // 
    // [
    //   [
    //      2, 34, 25, 19, 19,  6,  3, 37, 16,  1,
    //     27,  9,  9, 26, 27, 34, 30, 12, 11, 36,
    //     30,  3,  1,  2, 24,  4, 14, 33, 32, 14,
    //     26, 12, 22, 28, 10,  6,  2, 39, 10, 34
    //   ],
    //   [
    //     37,  3, 11, 27, 20,  6,  4, 33,  7,  4,
    //     37, 39, 29, 19, 35, 24, 29, 25, 38, 25,
    //      7, 27,  8, 19, 27,  7, 15, 36,  8, 28,
    //     29, 13, 13, 30, 29, 30, 22,  2, 35, 30
    //   ],
    //   [
    //      4, 26,  1, 31, 10,  5, 33, 8,  0,  2,
    //     39, 37, 38, 25, 12, 28, 19, 9, 13, 29,
    //     22, 19, 24, 25,  3, 34, 22, 3,  9,  3,
    //      8, 27, 36, 26,  5, 20, 18, 6, 26, 30
    //   ],
    //   [
    //     27,  1,  5, 27, 14,  4,  2, 35,  6, 35,
    //     34,  0, 22, 37, 33,  4,  0, 26,  7,  1,
    //     22, 21,  8, 28, 31, 24, 33, 22, 27, 22,
    //     19, 20,  3, 34,  8, 13, 24, 28, 25, 34
    //   ],
    //   [
    //     38, 12,  4, 18, 17,  2, 25, 31,  7, 23,
    //      0, 10, 23, 35, 37, 32, 26,  9, 32, 27,
    //      8, 38,  5, 30, 10, 10,  7, 25, 29, 10,
    //     27, 23, 34, 27, 38,  0,  6, 38, 34, 23
    //   ]
    // ]
    // 

```

</TabItem>

<TabItem value='java'>

```java
// Query

QueryParam queryParam = QueryParam.newBuilder()
    .withCollectionName(collectionName)
    .withExpr(expr_1)
    .withOutFields(outputFields)
    .withLimit(5L)
    .build();

R<QueryResults> queryResponse = client.query(queryParam);

if (queryResponse.getException() != null) {
    System.err.println("Failed to query: " + queryResponse.getException().getMessage());
    return;
}

QueryResultsWrapper queryResultsWrapper = new QueryResultsWrapper(queryResponse.getData());

List<List<JSONObject>> queryResults = new ArrayList<>();

List<Long> ids = (List<Long>) queryResultsWrapper.getFieldWrapper("id").getFieldData();
List<String> titles = (List<String>) queryResultsWrapper.getFieldWrapper("title").getFieldData();
List<?> articleMetas = queryResultsWrapper.getFieldWrapper("article_meta").getFieldData();
List<JSONObject> entities = new ArrayList<>();
for (int j = 0; j < ids.size(); ++j) {
    JSONObject entity = new JSONObject();
    entity.put("id", ids.get(j));
    entity.put("title", titles.get(j));

    byte[] articleMetaBytes = (byte[]) articleMetas.get(j);
    JSONObject articleMeta = JSON.parseObject(new String(articleMetaBytes));

    articleMeta.put("tags_1", articleMeta.getJSONArray("tags_1").indexOf(16) >= 0);
    articleMeta.remove("tags_2");

    entity.put("article_meta", articleMeta);
    entities.add(entity);
}

queryResults.add(entities);

System.out.println(queryResults);        

// Output:
// [[
//     {
//         "article_meta": {
//             "reading_time": 13,
//             "tags_1": true,
//             "publication": "The Startup",
//             "link": "https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912",
//             "responses": 18,
//             "claps": 1100
//         },
//         "id": 445535516305953765,
//         "title": "The Reported Mortality Rate of Coronavirus Is Not Important"
//     },
//     {
//         "article_meta": {
//             "reading_time": 6,
//             "tags_1": true,
//             "publication": "The Startup",
//             "link": "https://medium.com/swlh/how-can-we-best-switch-in-python-458fb33f7835",
//             "responses": 7,
//             "claps": 500
//         },
//         "id": 445535516305953767,
//         "title": "How Can We Best Switch in Python?"
//     },
//     {
//         "article_meta": {
//             "reading_time": 6,
//             "tags_1": true,
//             "publication": "The Startup",
//             "link": "https://medium.com/swlh/science-monday-can-you-drink-as-much-water-as-tom-brady-1a45cb802be8",
//             "responses": 5,
//             "claps": 142
//         },
//         "id": 445535516305953771,
//         "title": "Science Monday: Can You Drink As Much Water As Tom Brady?"
//     },
//     {
//         "article_meta": {
//             "reading_time": 13,
//             "tags_1": true,
//             "publication": "The Startup",
//             "link": "https://medium.com/swlh/building-comprehensible-customer-churn-prediction-models-ca61ecce529d",
//             "responses": 4,
//             "claps": 261
//         },
//         "id": 445535516305953772,
//         "title": "Building Comprehensible Customer Churn Prediction Models"
//     },
//     {
//         "article_meta": {
//             "reading_time": 11,
//             "tags_1": true,
//             "publication": "The Startup",
//             "link": "https://medium.com/swlh/building-high-performance-startup-teams-1a0611c0bdd4",
//             "responses": 0,
//             "claps": 188
//         },
//         "id": 445535516305953775,
//         "title": "Building high performance startup teams"
//     }
// ]]
```

</TabItem>
</Tabs>

## 表达式参考{#expression-reference}

以下表格详细描述了利用 `json_contains()` 进行搜索或查询时，可以在 `expr` 中使用的布尔表达式。

|  表达式                                       |  示例                                                                                                                                 |  说明                                                                                                                                            |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
|  `json_contains` (`JSON_CONTAINS`)         |  `expr_1 = 'JSON_CONTAINS(article_meta["tags_1"], 16)'`<br/> <br/>  `expr_2 = 'JSON_CONTAINS(article_meta["tags_2"], [5, 3, 39, 8])'` |  `expr_1` 在 `article_meta["tags_1"]` 包含元素 `16` 时返回 True。<br/> <br/>  `expr_2`在 `article_meta["tags_2"]` 包含元素`[5, 3, 39, 8]` 时返回 True。<br/> <br/>   |
|  `json_contains_any` (`JSON_CONTAINS_ANY`) |  `expr_3 = 'JSON_CONTAINS_ANY(article_meta["tags_1"], [5, 3, 39, 8])'`                                                              |  `expr_3` 在 `article_meta["tags_1"]` 包含 `[5, 3, 39, 8]` 中任一元素时返回 True。                                                                         |
|  `json_contains_all` (`JSON_CONTAINS_ALL`) |  `expr_4 = 'JSON_CONTAINS_ALL(article_meta["tags_1"], [2, 4, 6])'`<br/> <br/>                                                         |  `expr_4` 在 `article_meta["tags_1"]` 包含 `[2, 4, 6]` 的所有元素时返回 True。<br/> <br/>                                                                    |

## 相关文档{#related-topics}

- [创建 Collection](./create-collection)

- [使用 JSON 类型字段](./javascript-object-notation-json)

- [使用迭代器搜索和查询](./search-and-query-iterators)

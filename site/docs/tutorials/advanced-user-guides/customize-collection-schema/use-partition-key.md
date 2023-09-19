---
slug: /use-partition-key
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 使用 Partition Key

本节将帮助您了解如何使用 Partition Key 加速在 Collection 中的数据检索。

Partition Key 允许 Zilliz Cloud 根据数据的指定键值将数据存入不同的 Partition 中。这样您就可以根据指定键值为数据分组，从而在根据键值过滤时避免扫描完全无关的 Partition。相比传统的过滤查询方式，启用该特性后可以极大地提升查询性能。

## 准备工作 {#some-prep-work}

在创建 Collection 之前，确保

- 已经根据您的数据完成了 Schema 的设计。如需了解更多，可阅读[数据模型](./data-models-explained)。

- 已经创建了一个集群。如需了解更多，可阅读[创建集群](./create-cluster)。

- 已下载示例数据集。详情请参见[示例数据集](./example-dataset-1)。

## 创建启用 Partition Key 的 Collection {#create-a-collection-with-partition-key-enabled}

为了演示 Partition Key 的使用，我们将继续使用包含了 5,000 篇文章的示例数据集。其中，`publication` 将作为 Partition Key。

示例代码中将创建的 Collection 的 Schema 与[定制 Schema](./use-customized-schema) 中使用的类似。差异就在作为 Partition Key 使用的 `publication` 字段。

<Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "NodeJS", "value": "javascript"}, {"label": "Java", "value": "java"}, {"label": "Go", "value": "go"}]}>
<TabItem value='python'>

```python
# 2. Define fields
fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="title", dtype=DataType.VARCHAR, max_length=512),
    FieldSchema(name="title_vector", dtype=DataType.FLOAT_VECTOR, dim=768),
    FieldSchema(name="link", dtype=DataType.VARCHAR, max_length=512),
    FieldSchema(name="reading_time", dtype=DataType.INT64),
    # set `is_partition_key` to `true` for the field `publication`
    FieldSchema(name="publication", dtype=DataType.VARCHAR, is_partition_key = True, max_length=512),
    FieldSchema(name="claps", dtype=DataType.INT64),
    FieldSchema(name="responses", dtype=DataType.INT64)
]
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 2. Define Fields

// You should include the following in the async function declaration.

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
        // set `is_partition_key` to `true` for the field `publication`
        is_partition_key: true
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

</TabItem>

<TabItem value='java'>

```java
// 2. Define fields

// You should include the following in the main function

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
    // Use `withPartitionKey()` to set the field `publication` as the partition key
    .withPartitionKey(true)
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

</TabItem>

<TabItem value='go'>

```go
// 2. Define fields

// You should include the following in the main function

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
        // Use `WithIsPartitionKey()` to set the field `publication` as the partition key
        WithIsPartitionKey(true).
        WithMaxLength(512)

claps := entity.NewField().
        WithName("claps").
        WithDataType(entity.FieldTypeInt64)

responses := entity.NewField().
        WithName("responses").
        WithDataType(entity.FieldTypeInt64)
```

</TabItem>
</Tabs>

在完成字段定义之后，创建 Collection 的 Schema。

<Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "NodeJS", "value": "javascript"}, {"label": "Java", "value": "java"}, {"label": "Go", "value": "go"}]}>
<TabItem value='python'>

```python
# 3. Build the schema
schema = CollectionSchema(
    fields,
    description="Schema of Medium articles",
    # This is an alternative to `is_partition_key` in field settings.
    partition_key_field="publication"
)
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 3. Build the request for creating a collection
// You should include the following in the async function declaration.

const collection_name = "medium_articles";

const req = {
    collection_name,
    fields
}
```

</TabItem>

<TabItem value='java'>

```java
// 3. Build the schema
// You should include the following in the main function

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

</TabItem>

<TabItem value='go'>

```go
// 3. Build the schema
// You should include the following in the main function

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

</TabItem>
</Tabs>

最后，使用上述 Schema 创建 Collection。

<Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "NodeJS", "value": "javascript"}, {"label": "Java", "value": "java"}, {"label": "Go", "value": "go"}]}>
<TabItem value='python'>

```python
# 4. Create collection
collection = Collection(
    name="medium_articles",
    description="Medium articles published between Jan and August in 2020 in prominent publications",
    schema=schema
)
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 4. Create collection
// You should include the following in the async function declaration

let res = await client.createCollection(req);

console.log(res)

// Output
// { error_code: 'Success', reason: '' }
```

</TabItem>

<TabItem value='java'>

```java
// 4. Create collection

// You should include the following in the main function

R<RpcStatus> collection = client.createCollection(createCollectionParam);

if (collection.getException() != null) {
    System.out.println("Failed to create collection: " + collection.getException().getMessage());
    return;
}

System.out.println("Collection created!");
```

</TabItem>

<TabItem value='go'>

```go
// 4. Create collection

// You should include the following in the main function

colerr := conn.CreateCollection(context.Background(), schema, 2)

if colerr != nil {
        log.Fatal("Failed to create collection:", colerr.Error())
}
```

</TabItem>
</Tabs>

## 基于 Partition Key 的 ANN 搜索 {#ann-search-based-on-partition-key}

在为创建的 Collection 建立索引，加载索引文件至内存并将示例数据集中的数据插入 Collection 后，就可以进行基于 Partition Key 的近似最近邻（ANN）搜索了。相关操作，可参考[定制 Schema](./use-customized-schema)中的具体内容。

在创建搜索请求时，须在请求中包含如下过滤表达式，并将`<partition_key>`替换为实际担任 Partition Key 的字段名称：

- `expr='<partition_key>=="xxx"'`

- `expr='<partition_key> in ["xxx", "xxx"]'`

<Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "NodeJS", "value": "javascript"}, {"label": "Java", "value": "java"}, {"label": "Go", "value": "go"}]}>
<TabItem value='python'>

```python
# 8. Search data

result = collection.search(
    data=[rows[0]['title_vector']],
    anns_field="title_vector",
    param={"metric_type": "L2", "params": {"nprobe": 10}},
    limit=3,
    expr='claps > 30 and reading_time < 10 and publication in ["Towards Data Science", "Personal Growth"]',
    output_fields=["title", "link" ],
)

# Get all returned IDs
# results[0] indicates the result
# of the first query vector in the 'data' list
ids = result[0].ids

print(ids)

# Output:
#
# [5607, 5641, 3441]

# Get the distance from
# all returned vectors to the query vector.
distances = result[0].distances

print(distances)

# Output:
#
# [0.36103835701942444, 0.37674015760421753, 0.4162980318069458]

# Get the values of the output fields
# specified in the search request
hits = result[0]
for hit in hits:
    print(hit.entity.get("title"))
    print(hit.entity.get("link"))

# Output:
#
# The Hidden Side Effect of the Coronavirus
# <https://medium.com/swlh/the-hidden-side-effect-of-the-coronavirus-b6a7a5ee9586>
# Why The Coronavirus Mortality Rate is Misleading
# <https://towardsdatascience.com/why-the-coronavirus-mortality-rate-is-misleading-cc63f571b6a6>
# Coronavirus shows what ethical Amazon could look like
# <https://medium.com/swlh/coronavirus-shows-what-ethical-amazon-could-look-like-7c80baf2c663>
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 8. Search data

// You should include the following in the async function declaration

res = await client.search({
    collection_name,
    vector: rows[0].title_vector,
    limit: 3,
    filter: "claps > 30 and reading_time < 10 and publication in [\"Towards Data Science\", \"Personal Growth\"]",
    output_fields: ["title", "link"]
});

console.log(res);

// Output:
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

</TabItem>

<TabItem value='java'>

```java
// 8. Search data

// You should include the following in the main function

List<List<Float>> queryVectors = new ArrayList<>();
List<Float> queryVector = rows.get(0).getJSONArray("title_vector").toJavaList(Float.class);
queryVectors.add(queryVector);

// Prepare the outputFields
List<String> outputFields = new ArrayList<>();
outputFields.add("title");
outputFields.add("link");

// Search vectors in a collection
SearchParam searchParam = SearchParam.newBuilder()
    .withCollectionName("medium_articles")
    .withVectorFieldName("title_vector")
    .withVectors(queryVectors)
    .withExpr("claps > 30 and reading_time < 10 and publication in [\"Towards Data Science\", \"Personal Growth\"]")
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

// Output
// Search results
// Top 0 ID:442206870369024034 Distance:0.41629803
// Title: Coronavirus shows what ethical Amazon could look like
// Top 1 ID:442206870369021531 Distance:0.4360938
// Title: Mortality Rate As an Indicator of an Epidemic Outbreak
// Top 2 ID:442206870369024868 Distance:0.48886314
// Title: How Can AI Help Fight Coronavirus?
```

</TabItem>

<TabItem value='go'>

```go
// 8. Search data

// You should include the following in the main function

vectors := []entity.Vector{}

for _, row := range data.Rows[:1] {
        vector := make(entity.FloatVector, 0, 768)
        vector = append(vector, row.TitleVector...)
        vectors = append(vectors, vector)
}

// Prepare the search parameters
sp, _ := entity.NewIndexAUTOINDEXSearchParam(1)

opt := client.SearchQueryOptionFunc(func(option *client.SearchQueryOption) {
    option.Limit = 3
    option.Offset = 0
    option.ConsistencyLevel = entity.ClStrong
    option.IgnoreGrowing = false
})

// Start the search
searchResults, err := conn.Search(
        context.Background(),
        "medium_articles",                // collection name
        []string{},                       // partition name
        "claps > 30 and reading_time < 10 and publication in [\"Towards Data Science\", \"Personal Growth\"]",                               // boolean expression
        []string{"title", "publication"}, // output fields
        vectors,                          // query vectors
        "title_vector",                   // vector field name
        entity.MetricType("L2"),          // metric type
        3,                                // topK
        sp,                               // search parameters
        opt,                              // search options
)

if err != nil {
        log.Fatal("Failed to search:", err.Error())
}

// Parse the search results
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

// Output
// 2023/06/17 17:28:28 Result counts 0 : 3
// 2023/06/17 17:28:28 ID: 0 Score: 0 Title: The Reported Mortality Rate of Coronavirus Is Not Important Publication: The Startup
// 2023/06/17 17:28:28 ID: 3177 Score: 0.29999837 Title: Following the Spread of Coronavirus Publication: Towards Data Science
// 2023/06/17 17:28:28 ID: 5607 Score: 0.36103836 Title: The Hidden Side Effect of the Coronavirus Publication: The Startup
```

</TabItem>
</Tabs>

## 典型使用场景 {#typical-usage-scenarios}

该特性可在多租户场景中用于区分租户。

具体来说，可以将每条记录中的某个字段确定为 Partition Key。当进行搜索或查询时，可以用该字段过滤查询结果，实现租户数据隔离的同时，避免在查询时扫描其它租户的 Partition。
---
title: "Grouping Search | BYOC"
slug: /grouping-search
sidebar_label: "Grouping Search"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "如果搜索结果中所有 Entity 在某个标量字段上的取值都相同时，搜索结果可能并不能真实反映与查询向量相似的所有向量在向量空间中的分布情况。为了提升召回结果的多样性，可以考虑使用 Grouping Search。本节将介绍如何使用 Grouping Search 以及与之相关的注意事项。 | BYOC"
type: origin
token: CjZpwlRVNilNytkbHdncperpnbf
sidebar_position: 5
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - search
  - 搜索
  - anns_field
  - filter
  - output fields
  - distance
  - score
  - grouping search

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Grouping Search

如果搜索结果中所有 Entity 在某个标量字段上的取值都相同时，搜索结果可能并不能真实反映与查询向量相似的所有向量在向量空间中的分布情况。为了提升召回结果的多样性，可以考虑使用 Grouping Search。本节将介绍如何使用 Grouping Search 以及与之相关的注意事项。

## 概述{#overview}

当搜索结果中所有 Entity 在某个标量字段上的取值都相同时，表明这些 Entity 在某个属性上相似，可能会对搜索结果带来负面影响。

假设 Collection 中存放了很多文档（docId）。为了尽可能在将文档转换成向量表示后保留更多的语义信息，每篇文档都被拆分成大小合适的段落（chunk）作为单独的 Entity 存放。虽然文档被拆分成了更小的段落，用户关心的可能依然是哪些文档与自己的关注点有关。

![TROmwlRrDhlTlrbIHdqcQNHensh](/img/TROmwlRrDhlTlrbIHdqcQNHensh.png)

如上图所示，在该 Collection 进行 ANN Search 时，搜索结果可能会包含多个来自同一篇文档的段落，导致部分文档被忽略。这并不符合用户的使用场景。

![XIDpwFc1VhUCQFbOtszclkFZn1g](/img/XIDpwFc1VhUCQFbOtszclkFZn1g.png)

如果要提升搜索结果的多样性，可以考虑在 Search 请求中添加 `group_by_field` 参数，启用 Grouping Search。如上图所示，您可以将 `group_by_field` 设置为 `docId`。Zilliz Cloud 在收到该请求后，会执行如下流程：

- 根据请求中携带的查询向量进行 ANN Search，找出与查询向量最为相似的所有 Entity。

- 根据请求中指定的 `group_by_id`对搜索结果进行分组。

- 根据 `limit` 参数，返回符合条件的分组，并在每个分组中返回最相似的一个 Entity。

<Admonition type="info" icon="📘" title="说明">

<p>在默认情况下，Grouping Search 仅为每个分组返回一条 Entity。如果希望增加每个分组返回的结果数量，可以使用 <code>group_size</code> 和 <code>strict_group_size</code> 参数进行控制。</p>

</Admonition>

## 执行 Grouping Search {#grouping-search}

本节将结合具体代码示例来介绍如何使用 Grouping Search。以下示例代码假设 Collection 中有 `id`、`vector`、`chunk` 和 `docId` 四个字段。

```python
[
        {"id": 0, "vector": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], "chunk": "pink_8682", "docId": 1},
        {"id": 1, "vector": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], "chunk": "red_7025", "docId": 5},
        {"id": 2, "vector": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], "chunk": "orange_6781", "docId": 2},
        {"id": 3, "vector": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], "chunk": "pink_9298", "docId": 3},
        {"id": 4, "vector": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], "chunk": "red_4794", "docId": 3},
        {"id": 5, "vector": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], "chunk": "yellow_4222", "docId": 4},
        {"id": 6, "vector": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], "chunk": "red_9392", "docId": 1},
        {"id": 7, "vector": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], "chunk": "grey_8510", "docId": 2},
        {"id": 8, "vector": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], "chunk": "white_9381", "docId": 5},
        {"id": 9, "vector": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], "chunk": "purple_4976", "docId": 3},
]

```

在 Search 请求中，将 `group_by_field` 和 `output_fields` 都设置为 `docId`。 在收到请求后，Zilliz Cloud 会根据指定的字段对搜索结果分组并返回每组结果中最与查询向量最相似的一个 Entity，并在每个返回的 Entity 中携带该 Entity 在 docId 字段上的取值。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

query_vectors = [
    [0.14529211512077012, 0.9147257273453546, 0.7965055218724449, 0.7009258593102812, 0.5605206522382088]]

# Group search results
res = client.search(
    collection_name="my_collection",
    data=query_vectors,
    limit=3,
    group_by_field="docId",
    output_fields=["docId"]
)

# Retrieve the values in the `docId` column
doc_ids = [result['entity']['docId'] for result in res[0]]
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.SearchReq
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build());

FloatVec queryVector = new FloatVec(new float[]{0.14529211512077012f, 0.9147257273453546f, 0.7965055218724449f, 0.7009258593102812f, 0.5605206522382088f});
SearchReq searchReq = SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(queryVector))
        .topK(3)
        .groupByFieldName("docId")
        .outputFields(Collections.singletonList("docId"))
        .build();

SearchResp searchResp = client.search(searchReq);

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

// Output
// TopK results:
// SearchResp.SearchResult(entity={docId=5}, score=0.74767184, id=1)
// SearchResp.SearchResult(entity={docId=2}, score=0.6254269, id=7)
// SearchResp.SearchResult(entity={docId=3}, score=0.3611898, id=3)
```

</TabItem>

<TabItem value='go'>

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "localhost:19530"
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    3,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField("vector").
    WithGroupByField("docId").
    WithOutputFields("docId"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("docId: ", resultSet.GetColumn("docId").FieldData().GetScalars())
}
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "YOUR_CLUSTER_ENDPOINT";
const token = "YOUR_CLUSTER_TOKEN";
const client = new MilvusClient({address, token});

var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = await client.search({
    collection_name: "my_collection",
    data: [query_vector],
    limit: 3,
    // highlight-start
    group_by_field: "docId"
    // highlight-end
})

// Retrieve the values in the `docId` column
var docIds = res.results.map(result => result.entity.docId)
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    "annsField": "vector",
    "limit": 3,
    "groupingField": "docId",
    "outputFields": ["docId"]
}'
```

</TabItem>
</Tabs>

在以上请求中，`limit=3` 表示系统将返回最多 3 个分组，每个分组中包含一条与查询向量最相似的 Entity。

## 设置 Group Size{#set-group-size}

在默认情况下，Grouping Search 仅为每个分组返回一条 Entity。如果希望每个分组中返回多个结果，可以通过设置 `group_size` 和 `strict_group_size` 参数实现。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Group search results

res = client.search(
    collection_name="my_collection", 
    data=query_vectors, # query vector
    limit=5, # number of groups to return
    group_by_field="docId", # grouping field
    group_size=2, # p to 2 entities to return from each group
    strict_group_size=True, # return exact 2 entities from each group
    output_fields=["docId"]
)
```

</TabItem>

<TabItem value='java'>

```java
FloatVec queryVector = new FloatVec(new float[]{0.14529211512077012f, 0.9147257273453546f, 0.7965055218724449f, 0.7009258593102812f, 0.5605206522382088f});
SearchReq searchReq = SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(queryVector))
        .topK(5)
        .groupByFieldName("docId")
        .groupSize(2)
        .strictGroupSize(true)
        .outputFields(Collections.singletonList("docId"))
        .build();

SearchResp searchResp = client.search(searchReq);

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

// Output
// TopK results:
// SearchResp.SearchResult(entity={docId=5}, score=0.74767184, id=1)
// SearchResp.SearchResult(entity={docId=5}, score=-0.49148706, id=8)
// SearchResp.SearchResult(entity={docId=2}, score=0.6254269, id=7)
// SearchResp.SearchResult(entity={docId=2}, score=0.38515577, id=2)
// SearchResp.SearchResult(entity={docId=3}, score=0.3611898, id=3)
// SearchResp.SearchResult(entity={docId=3}, score=0.19556211, id=4)
```

</TabItem>

<TabItem value='go'>

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "localhost:19530"
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    5,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField("vector").
    WithGroupByField("docId").
    WithStrictGroupSize(true).
    WithGroupSize(2).
    WithOutputFields("docId"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("docId: ", resultSet.GetColumn("docId").FieldData().GetScalars())
}
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "YOUR_CLUSTER_ENDPOINT";
const token = "YOUR_CLUSTER_TOKEN";
const client = new MilvusClient({address, token});

var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = await client.search({
    collection_name: "my_collection",
    data: [query_vector],
    limit: 5,
    group_by_field: "docId",
    // highlight-start
    group_size: 2,
    strict_group_size: true
    // highlight-end
})

// Retrieve the values in the `docId` column
var docIds = res.results.map(result => result.entity.docId)
```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    "annsField": "vector",
    "limit": 5,
    "groupingField": "docId",
    "groupSize":2,
    "strictGroupSize":true,
    "outputFields": ["docId"]
}'
```

</TabItem>
</Tabs>

在以上示例中：

- `group_size`：该参数决定了每个分组返回的理想 Entity 数量。例如，`group_size=2` 意味着每个分组（即每个 `docId`）应返回 2 条最相似的段落（`chunk`）。若不设置 `group_size`，系统默认每个分组返回 1 个结果。

- `strict_group_size`：布尔参数，控制是否严格执行 `group_size` 设定的数量。当 `strict_group_size=True` 时，系统会尽量使每个分组都包含 `group_size` 指定的数量（如 2 个段落），除非该分组中没有足够的数据。默认设置下（`strict_group_size=False`），系统将优先保证满足 `limit` 参数指定的分组数量，而不强求每个分组内达到 `group_size`，这在数据分布不均的情况下更为高效。

有关更多参数信息，请参考 [search()](/reference/python/python/Vector-search)。

## 注意事项{#considerations}

- **分组数量**：`limit` 参数决定了返回的分组数量，而不是每组中的具体 Entity 数量。设置合理的 `limit` 值可以帮助控制搜索结果的多样性和查询效率。如果数据分布集中或查询性能要求较高，可适当减少 `limit` 值，以减少计算开销。

- **分组内 Entity 数量**：`group_size` 决定了每个分组内返回的 Entity 数量。根据使用场景，适当调整 `group_size` 可以有效提升搜索结果的丰富性。但在数据分布不均的情况下，部分分组可能会返回少于 `group_size` 个 Entity，特别是在数量有限的场景下。

- **严格分组大小**：`strict_group_size=True` 时，系统会尽量保证每个分组中返回 `group_size` 个 Entity，除非分组内数据本身不足。此设置可以确保每个分组的 Entity 数量一致，但在数据分布不均或资源受限时可能会导致性能下降。若不需要严格的 Entity 数量，可以将 `strict_group_size` 设置为 `False`，提高查询速度。


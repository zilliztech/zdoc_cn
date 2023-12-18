---
slug: /upsert-entities
beta: TRUE
notebook: 08_upsert_entities.ipynb
token: FdqOwWn9siVmS2kHLjpczaTlnlc
sidebar_position: 2
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upsert Entity

本指南介绍如何在 Zilliz Cloud 中进行 Upsert 操作。

所谓 Upsert，是指结合了 Update 和 Insert 两种操作。在 Zilliz Cloud 中，Upsert 操作依据 Entity 的主键是否已在 Collection 中存在，来决定是插入新的 Entity 还是更新现有的 Entity。具体规则如下：

- 若 Entity 的主键已在 Collection 中，原有的 Entity 会被新数据覆盖。

- 若主键在 Collection 中不存在，则会添加一个全新的 Entity。

<Admonition type="info" icon="📘" title="说明">

目前，Upsert 功能处于 Beta 测试阶段。请注意，该功能及相关文档在 Beta 测试期间可能会有所更改。

</Admonition>

## 开始前{#before-you-start}{#before-you-start}

在执行 Upsert 操作前，请确保以下几点：

- 您的集群已升级至 Beta 版本。

- 您已下载了示例数据集，更多详情参见[示例数据集](./example-dataset)。

- 您已根据示例数据集创建了相应 Schema 的 Collection，并且该 Collection 已完成索引构建及加载。详细信息请参见[开启动态 Schema](./enable-dynamic-schema)。

## 准备数据{#prepare-data}{#prepare-data}

本示例中，我们将对示例数据集中的 Entity 进行 Upsert 操作。您可以用以下代码来处理数据：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"},{"label":"Bash","value":"bash"}]}>
<TabItem value='python'>

```python
# (Continued)

import json

DATASET_PATH="../medium_articles_2020_dpr.json" # Set your dataset path

with open('medium_articles_2020_dpr.json') as f:
    data = json.load(f)
    data_to_upsert = data["rows"][:100]

print(rows[0])

# Prepare a list of rows
with open(DATASET_PATH) as f:
    data = json.load(f)
    rows = data['rows']

print(rows[:3])

# Output
#
# [
#     {
#         "id": 0,
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
#         "link": "https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912",
#         "reading_time": 13,
#         "publication": "The Startup",
#         "claps": 1100,
#         "responses": 18
#     }
# ]
```

</TabItem>

<TabItem value='javascript'>

```javascript
const fs = require('fs');
const data_file = `./medium_articles_2020_dpr.json`

async function main () {

    // (Continued)
    
    const data = JSON.parse(fs.readFileSync(data_file, "utf8"))

    // read rows
    const rows = data["rows"]
    const row = rows[0]

    console.log(Object.keys(row))

    // Output
    // 
    // [
    //   'id',
    //   'title',
    //   'title_vector',
    //   'link',
    //   'reading_time',
    //   'publication',
    //   'claps',
    //   'responses'
    // ]
    //     

}
```

</TabItem>

<TabItem value='java'>

```java
public final class UseCustomizedSchemaDemo  {
    public static void main(String[] args) {
        
        // (Continued)
        
        String data_file = "../medium_articles_2020_dpr.json";
        
        String content;

        // read a local file
        Path file = Path.of(data_file);
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
        List<JSONObject> rows = getRows(dataset.getJSONArray("rows"), 5979);
        
        // Also, you can get fields from dataset and insert them
        // List<Field> fields = getFields(dataset.getJSONArray("rows"), 5979);
    }
    
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
}
```

</TabItem>

<TabItem value='bash'>

```bash
# read the first 100 records from the dataset
data="$(cat path/to/medium_articles_2020_dpr.json \
        | jq '.rows' \
        | jq '.[1:100]' \
        | jq -r '.[] | . + {"vector": .title_vector} | del(.title_vector) | del(.id)' \
        | jq -s -c '.')"
        
 
```

</TabItem>
</Tabs>

## Upsert 数据{#upsert-data}{#upsert-upsert-data}

数据准备完毕后，可使用以下代码将其 Upsert 至 Collection：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"},{"label":"Bash","value":"bash"}]}>
<TabItem value='python'>

```python
# upsert entities
# MilvusClient does not support upsert yet.
from pymilvus import Collection
# upsert data
result = collection.upsert(data_to_upsert)

# flush data into memory
collection.flush()

print(f"Data upserted successfully! Upserted rows: {result.upsert_count}")

# Output:
# Data upserted successfully! Upserted rows: 100
```

</TabItem>

<TabItem value='javascript'>

```javascript
async function main () {

    // (Continued)
    
    //insert vectors
    res = await client.upsert({
        collection_name: collectionName,
        data: rows.slice(1, 1000)
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
    //     ... 899 more items
    //   ],
    //   err_index: [],
    //   status: { error_code: 'Success', reason: '', code: 0 },
    //   IDs: { int_id: { data: [Array] }, id_field: 'int_id' },
    //   acknowledged: false,
    //   insert_cnt: '999',
    //   delete_cnt: '999',
    //   upsert_cnt: '999',
    //   timestamp: '445315186586025986'
    // }
    // 

}
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.param.*;
import io.milvus.response.MutationResultWrapper;
import io.milvus.grpc.MutationResult;

public class UseCustomizedSchemaDemo 
{
    public static void main( String[] args )
    {
        // (Continued)
        
        UpsertParam upsertParam = UpsertParam.newBuilder()
            .withCollectionName(collectionName)
            .withRows(rows)
            // .withFields(fields)
            .build();

        R<MutationResult> upsertResponse = client.upsert(upsertParam);

        if (upsertResponse.getStatus() != R.Status.Success.getCode()) {
            System.err.println(upsertResponse.getMessage());
        }

        MutationResultWrapper mutationResultWrapper = new MutationResultWrapper(upsertResponse.getData());

        System.out.println("Successfully insert entities: " + mutationResultWrapper.getInsertCount());  

        // Output:
        // Successfully insert entities: 100
    }
}
```

</TabItem>

<TabItem value='bash'>

```bash
# insert record 
curl --request POST \
     --url "${PUBLIC_ENDPOINT}/v1/vector/upsert" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data "{
        \"collectionName\": \"medium_articles_2020\",
        \"data\": ${data}
    }"

# Response
#
# {
#     "code": 200,
#     "data": {
#         "upsertCount": 99,
#         "upsertIds": [
#             "442169042773493965",
#             "442169042773493966"，
#             ...
#         ]
#     }
# }
```

</TabItem>
</Tabs>

## 写入数据{#understand-flushing-data}{#understand-flushing-data}

Zilliz Cloud 会自动存储已插入的数据。

一般情况下，每次数据插入无需刻意调用 `flush()` API。但如果您需要立即对新插入的数据进行搜索，可以考虑执行 `flush()` 操作。

`flush()` 主要用于整理和处理数据片段，确保您最新添加的 Entity 能够立即被检索到。如果没有这一步骤，由于新数据还未及时被索引，它们可能暂时不会出现在检索结果中。

在大多数情况下，您无需手动调用 `flush()`。系统会自动优雅地处理这一过程。

## 使用限制{#limits}{#limits}

- Upsert 操作不会更新主键值。

- Upsert 操作不支持开启了 `autoID` 的 Collection。

## 相关文档{#related-topics}{#related-topics}

- [创建 Collection](./create-collection)

- [开启动态 Schema](./enable-dynamic-schema)

- [使用 Partition Key](./use-partition-key)


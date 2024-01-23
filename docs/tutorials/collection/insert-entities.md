---
slug: /insert-entities
beta: FALSE
notebook: 00_quick_start.ipynb,01_use_customized_schema.ipynb
token: Am0bwdNmliIZ9OkUB2DcdkOBnAe
sidebar_position: 3
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 插入 Entity

本文介绍如何将 Entity 插入到 Zilliz Cloud 集群中的 Collection。

Entity 是 Collection 中的基本数据单元。同一个 Collection 中的 Entity 具有相同的属性，这些属性共同定义在 Schema 中。

## 开始前{#before-you-start}

请确保已完成以下步骤：

- 已创建了目标 Collection。详情请参见[创建 Collection](./create-collection)。

- 您已经下载了示例数据。详情请参见[示例数据集](./example-dataset)。

## 插入 Entity{#insert-entities}

### 准备数据{#prepare-data}

在向 Collection 插入多条数据前，可按如下步骤准备数据。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"Bash","value":"bash"}]}>
<TabItem value='python'>

```python
import json

# (Continued)

DATASET_PATH="../medium_articles_2020_dpr.json" # Set your dataset path

# 6. Prepare data

# Prepare a list of rows
with open(DATASET_PATH) as f:
    data = json.load(f)
    rows = data['rows']

print(rows[0])

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
#             0.018008126,
#             0.0063936645,
#             -0.011913628,
#             0.030776596,
#             -0.018274948,
#             0.019929802,
#             0.020547243,
#             0.032735646,
#             -0.031652678,
#             -0.033816382,
#             "(748 more items hidden)"
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

<TabItem value='go'>

```go
func main() {

        // (Continued)

        // 6. Read the dataset
        file, err := os.ReadFile("../../medium_articles_2020_dpr.json")
        if err != nil {
                log.Fatal("Failed to read file:", err.Error())
        }

        var data Dataset

        if err := json.Unmarshal(file, &data); err != nil {
                log.Fatal(err.Error())
        }

        fmt.Println("Dataset loaded, row number: ", len(data.Rows))
        
        rows := make([]interface{}, 0, 1)

        for i := 0; i < len(data.Rows); i++ {
                rows = append(rows, data.Rows[i])
        }

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

type Dataset struct {
        Rows []Row `json:"rows"`
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

# This is commented out to avoid massive output in your console.
# echo $data
#
# Output
#
# [
#   {
#      'id': 0,
#      'title': 'The Reported Mortality Rate of Coronavirus Is Not Important',
#      'vector': [0.041732933, 0.013779674, -0.027564144, ..., 0.030096486],
#      'link': '<https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912>',
#      'reading_time': 13,
#      'publication': 'The Startup',
#      'claps': 1100,
#             'responses': 18
#   },
#   {
#      'id': 1, 
#      'title': 'Dashboards in Python: 3 Advanced Examples for Dash Beginners and Everyone Else', 
#      'vector': [0.0039737443, 0.003020432, -0.0006188639, 0.03913546, ..., 0.021713957], 
#      'link': '<https://medium.com/swlh/dashboards-in-python-3-advanced-examples-for-dash-beginners-and-everyone-else-b1daf4e2ec0a>', 
#      'reading_time': 14, 
#      'publication': 'The Startup', 
#      'claps': 726, 
#      'responses': 3
#   },
#   ...
# ]
```

</TabItem>
</Tabs>

### 插入数据{#insert-data}

在数据准备完毕后，即可按如下步骤插入数据。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"Bash","value":"bash"}]}>
<TabItem value='python'>

<Tabs groupId="python" defaultValue='python' values={[{"label":"Starter API","value":"python"},{"label":"Advanced API","value":"python_1"}]}>
<TabItem value='python'>

```python
# Insert data using a MilvusClient object
from pymilvus import MilvusClient

# Insert multiple entities
res = client.insert(
  collection_name=COLLECTION_NAME,
  data=rows
)

print(res)

# Output
#
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, "(5959 more items hidden)"]

```

</TabItem>
<TabItem value='python_1'>

```python
# Insert data using a Collection object
from pymilvus import Collection

res = collection.insert(rows)

print(res.insert_count)

# Output
#
# 5979
```

</TabItem>
</Tabs>
</TabItem>

<TabItem value='javascript'>

```javascript
async function main () {

    // (Continued)

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
    //   timestamp: '445316631681040387'
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
        
        InsertParam insertParam = InsertParam.newBuilder()
            .withCollectionName(collectionName)
            .withRows(rows)
            // .withFields(fields)
            .build();

        R<MutationResult> insertResponse = client.insert(insertParam);

        if (insertResponse.getStatus() != R.Status.Success.getCode()) {
            System.err.println(insertResponse.getMessage());
        }

        MutationResultWrapper mutationResultWrapper = new MutationResultWrapper(insertResponse.getData());

        System.out.println("Successfully insert entities: " + mutationResultWrapper.getInsertCount());

        // Output:
        // Successfully insert entities: 5979
    }
}
```

</TabItem>

<TabItem value='go'>

```go
func main() {

        // (Continued)
    
         col, err := conn.InsertRows(context.Background(), COLLNAME, "", rows)

        if err != nil {
                log.Fatal("Failed to insert rows:", err.Error())
        }

        fmt.Println("Inserted entities: ", col.Len())   

}
```

</TabItem>

<TabItem value='bash'>

```bash
# insert record 
curl --request POST \
     --url "${PUBLIC_ENDPOINT}/v1/vector/insert" \
     --header "Authorization: Bearer ${API_KEY}" \
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
#         "insertCount": 99,
#         "insertIds": [
#             "442169042773493965",
#             "442169042773493966"，
#             ...
#         ]
#     }
# }
```

</TabItem>
</Tabs>

## 写入操作{#understanding-flushing-data}

Zilliz Cloud 会在插入的数量到达一定规模时自动执行建立索引和写入操作。

在大多数情况下，无须在插入一批数据后立即手动调用`flush()`方法。但是如果您需要在插入一批数据后，希望在搜索结果中能准确地查询到这批数据，调用`flush()`方法可能会是一个可以考虑的方式。

该方法所做的就是将数据存入一个 Segment 中并将该 Segment 落盘，只有落盘的数据才可以通过索引检索到。否则，你可能在插入后立即执行的查询结果中看不到这些新插入的记录。

但是请记住，对于大多数用户和场景而言，没有必要手动调用`flush()`方法。Zilliz Cloud 会在适当的时候自动执行这一操作。

如果需要立即查询新插入的数据，可以选择手动执行写入操作。

## 相关文档{#related-topics}

- [向量搜索和查询](./search-query-and-get)

- [数据安全](./data-security)

- [开启动态 Schema](./enable-dynamic-schema)

- [使用 JSON 类型字段](./javascript-object-notation-json) 


---
slug: /delete-entities
beta: FALSE
notebook: 00_quick_start.ipynb,01_use_customized_schema.ipynb
token: R8EPw5l7Ei1tEKkdH6qc54UNn1d
sidebar_position: 5
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 删除 Entity

Entity 是指存储在 Zilliz Cloud 集群中的数据实体，包含用于处理、搜索和查询的数据。如果您不再需要某个 Entity，可以执行相关操作将其删除。

## 删除 Entity{#delete-entities}

如果一条数据过时或不再需要时，可以使用如下步骤删除该 Entity。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"Bash","value":"bash"}]}>
<TabItem value='python'>

<Tabs groupId="python" defaultValue='python' values={[{"label":"Starter API","value":"python"},{"label":"Advanced API","value":"python_1"}]}>
<TabItem value='python'>

```python
# Delete a single entity using a MilvusClient object
from pymilvus import MilvusClient

res = client.delete(
    collection_name="medium_articles_2020", # Collection name
    pks=253 # Entity ID, Use a list for multiple entities, such as [246, 253]
)

print(res)

# Output:
# [253]

```

</TabItem>
<TabItem value='python_1'>

```python
# Delete a single entity using a Collection object
from pymilvus import Collection

collection.delete(expr="id in [253]") 

# Include the IDs of all entities to delete in the expr, such as 'id in [246, 253]'
```

</TabItem>
</Tabs>
</TabItem>

<TabItem value='javascript'>

```javascript
async function main () {

    // Continued

    res = await client.delete({
        collection_name: "medium_articles_2020",
        ids: [253] // Include the IDs of all entities to delete, such as [246, 253]
    });
    
    console.log(res)
    
    // Output
    //  {
    //   succ_index: [],
    //   err_index: [],
    //   status: { error_code: 'Success', reason: '' },
    //   IDs: { int_id: { data: [Array] }, id_field: 'int_id' },
    //   acknowledged: false,
    //   insert_cnt: '0',
    //   delete_cnt: '1',
    //   upsert_cnt: '0',
    //   timestamp: '442192913812684801'
    // }
    
}
```

</TabItem>

<TabItem value='java'>

```java
import java.util.List;

import io.milvus.param.highlevel.dml.DeleteIdsParam;
import io.milvus.param.highlevel.dml.response.DeleteResponse;

public class UseCustomizedSchemaDemo 
{
    public static void main( String[] args )
    {
        // (Continued)
        String data_file = "/medium_articles_2020_dpr.json";
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

        // Insert your data in rows, all the fields not pre-defined in the schema 
        // are recognized as pre-defined schema
        List<JSONObject> rows = getRows(dataset.getJSONArray("rows"), 1000);
        
        List<String> ids = Lists.newArrayList("1");
        // List<String> ids = Lists.newArrayList("1", "2", "3");
        
        DeleteIdsParam deleteParam = DeleteIdsParam.newBuilder()
                .withCollectionName(collectionName)
                .withPrimaryIds(ids)
                .build();

        R<DeleteResponse> deleteRes = client.delete(deleteParam);

        if (deleteRes.getException() != null) {
            System.err.println("Failed to delete: " + deleteRes.getException().getMessage());
            return;
        }

        System.out.println(deleteRes.getData().toString());

        // Output:
        // deleteIds=[]
    }
}
```

</TabItem>

<TabItem value='go'>

```go
func main() {

    // (Continued)
    
    err = conn.Delete(context.Background(), COLLNAME, "", "id in [253]")
    // err = conn.Delete(context.Background(), COLLNAME, "", "id in [253, 254]")

    if err != nil {
        log.Fatal("Failed to delete rows:", err.Error())
    }
}
```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
     --url "${PUBLIC_ENDPOINT}/v1/vector/delete" \
     --header "Authorization: Bearer ${API_KEY}" \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data "{
        \"collectionName\": \"medium_articles_2020\",
        \"id\": 253
      }"

# Output:
# {"code":200,"data":{}}
```

</TabItem>
</Tabs>

以上代码从 Collection `medium_articles_2020` 中同时删除 ID 为 `253` 的 Entity。

<Admonition type="caution" icon="🚧" title="警告">

删除 Entity 是不可逆操作。在执行操作之前，请务必备份或确认数据不再需要。

</Admonition>

## 相关文档{#related-topics}

- [创建 Collection](./create-collection) 

- [插入 Entity](./insert-entities) 

- [向量搜索和查询](./search-query-and-get) 


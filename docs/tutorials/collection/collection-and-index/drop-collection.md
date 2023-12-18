---
slug: /drop-collection
beta: FALSE
notebook: 00_quick_start.ipynb,01_use_customized_schema.ipynb
token: FrMbwwoTwiqJO4kofPkcndsAnoh
sidebar_position: 3
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 删除 Collection

本文介绍如何从 Zilliz Cloud 集群中删除 Collection。

删除 Collection 会删除与其相关的所有信息，包括插入数据、元数据和索引。删除操作不可逆，请谨慎执行本操作。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"Bash","value":"bash"}]}>
<TabItem value='python'>

<Tabs groupId="python" defaultValue='python' values={[{"label":"Starter API","value":"python"},{"label":"Advanced API","value":"python_1"}]}>
<TabItem value='python'>

```python
# Drop a collection that is created using a MilvusClient object
from pymilvus import MilvusClient

res = client.drop_collection(collection_name="medium_articles_2020")

print(res)

```

</TabItem>
<TabItem value='python_1'>

```python
# Drop a collection that is created using a Collection object
from pymilvus import utility

res = utility.drop_collection(collection_name="medium_articles_2020")
```

</TabItem>
</Tabs>
</TabItem>

<TabItem value='javascript'>

```javascript
async function main() {

    // (Continued)
    
    // 8. Drop collection

    res = await client.dropCollection({
        collection_name: collectionName
    })     
    
    console.log(res);

    // Output
    // 
    // { error_code: 'Success', reason: '', code: 0 }
    // 

}
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.param.R;
import io.milvus.param.RpcStatus;
import io.milvus.param.collection.DropCollectionParam;

public class UseCustomizedSchemaDemo 
{
    public static void main( String[] args )
    {
        // (Continued)
        
        DropCollectionParam dropCollectionParam = DropCollectionParam.newBuilder()
            .withCollectionName(collectionName)
            .build();

        R<RpcStatus> dropCollection = client.dropCollection(dropCollectionParam);

        if (dropCollection.getException() != null) {
            System.out.println("Failed to drop collection: " + dropCollection.getException().getMessage());
            return;            
        }
    }
}
```

</TabItem>

<TabItem value='go'>

```go
func main() {
        // (Continued)
    
        // 9. Drop collection
        err = conn.DropCollection(context.Background(), COLLNAME)

        if err != nil {
                log.Fatal("Failed to drop collection:", err.Error())
        }       
}
```

</TabItem>

<TabItem value='bash'>

```bash
# Replace uri and API key with your own
curl --location --request POST "${PUBLIC_ENDPOINT}/v1/vector/collections/drop" \\
    --header "Authorization: Bearer ${API_KEY}" \\
    --header "Content-Type: application/json" \\
    --header "Accept: */*" \\
    --data '{"collectionName": "medium_articles_2020"}'

# Output
# {"code":200,"data":{}}
```

</TabItem>
</Tabs>

## 使用限制{#limits}{#limits}

每个 Collection 只能创建一个向量字段。

## 相关文档{#related-topics}{#related-topics}

- [插入 Entity](./insert-entities) 

- [向量搜索和查询](./search-query-and-get) 

- [删除 Entity](./delete-entities) 


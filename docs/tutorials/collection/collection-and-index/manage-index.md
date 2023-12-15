---
slug: /manage-index
beta: FALSE
notebook: 01_use_customized_schema.ipynb
sidebar_position: 2
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 管理索引

在 Zilliz Cloud 集群中使用索引做为元数据结构，增强向量相似性检索性能。在 Zilliz Cloud 集群中进行检索的前提是您已经为其中的 Collection 创建了索引。

## 准备工作{#before-you-start}

确保您已经创建了一个 Collection。关于如何创建 Collection，可以参考 [创建 Collection](./create-collection)。

## 为 Collection 创建索引{#index-collection}

为了在 Zilliz Cloud 上实现最佳的 ANN 检索性能，创建索引至关重要。目前，Zilliz Cloud 仅允许在  Collection 的向量列上创建索引。为 Collection 创建索引其实就意味着为其向量列创建索引并生成对应的索引文件。

Zilliz Cloud 目前支持创建 AUTOINDEX 类型的索引。如果您在创建索引时指定了其它类型的索引，Zilliz Cloud 会将其重置为 AUTOINDEX。您可以阅读 [AUTOINDEX](./autoindex-explained) 来了解更多关于该索引类型的信息。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"},{"label":"Go","value":"go"}]}>
<TabItem value='python'>

```python
# 4. Index collection
# 'index_type' defines the index algorithm to be used.
#    AUTOINDEX is the only option.
#
# 'metric_type' defines the way to measure the distance 
#    between vectors. Possible values are L2, IP, and Cosine,
#    and defaults to Cosine.
index_params = {
    "index_type": "AUTOINDEX",
    "metric_type": "L2",
    "params": {}
}

# To name the index, do as follows:
collection.create_index(
    field_name="title_vector", 
    index_params=index_params,
    index_name='title_vector_index' # Optional
)

```

</TabItem>

<TabItem value='javascript'>

```javascript
async function main() {

    // (Continued)
    
    // 4. Create index
    res = await client.createIndex({
        collection_name: collectionName,
        field_name: "title_vector",
        index_type: "IVF_FLAT",
        metric_type: "L2",
        params: {
            nlist: 1024
        }
    })

    console.log(res)

    // Output
    // 
    // { error_code: 'Success', reason: '', code: 0 }
    // 

}
```

</TabItem>

<TabItem value='java'>

```java
public final class UseCustomizedSchemaDemo  {
    public static void main(String[] args) {
        
        // (Continued)
        
        // 4. Create index

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

        System.out.println("Index created!");

        // Output:
        // Index created! 
    }
}
```

</TabItem>

<TabItem value='go'>

```go
func main() {
        // (Continued)
    
        // 3. Create index for cluster
        index, err := entity.NewIndexAUTOINDEX(entity.MetricType("L2"))

        if err != nil {
                log.Fatal("Failed to prepare the index:", err.Error())
        }

        fmt.Println(index.Name())

        err = conn.CreateIndex(context.Background(), COLLNAME, "title_vector", index, false)

        if err != nil {
                log.Fatal("Failed to create the index:", err.Error())
        }          
}
```

</TabItem>
</Tabs>

## 加载索引{#load-index}

在 Collection 中进行任何检索和查询之前，需要先将创建好的索引文件加载到内存中。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"},{"label":"Go","value":"go"}]}>
<TabItem value='python'>

```python
# 5. Load collection
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

    // (Continued)
    
    res = await client.loadCollection({
        collection_name: collectionName
    })

    console.log(res)

    // Output
    // 
    // { error_code: 'Success', reason: '', code: 0 }
    // 

}
```

</TabItem>

<TabItem value='java'>

```java
public final class UseCustomizedSchemaDemo  {
    public static void main(String[] args) {
        
        // (Continued)
        
        // 5. Load collection

        LoadCollectionParam loadCollectionParam = LoadCollectionParam.newBuilder()
            .withCollectionName(collectionName)
            .build();

        R<RpcStatus> loadCollectionRes = client.loadCollection(loadCollectionParam);

        if (loadCollectionRes.getException() != null) {
            System.err.println("Failed to load collection: " + loadCollectionRes.getException().getMessage());
            return;
        }

        System.out.println("Collection loaded!");

        // Output:
        // Collection loaded!
    }
}
```

</TabItem>

<TabItem value='go'>

```go
func main() {
        // (Continued)
    
        // 4. Load collection
        loadCollErr := conn.LoadCollection(context.Background(), COLLNAME, false)

        if loadCollErr != nil {
                log.Fatal("Failed to load collection:", loadCollErr.Error())
        }

        // 5. Get load progress
        progress, err := conn.GetLoadingProgress(context.Background(), COLLNAME, nil)

        if err != nil {
                log.Fatal("Failed to get loading progress:", err.Error())
        }

        fmt.Println("Loading progress:", progress)        
}
```

</TabItem>
</Tabs>

## 释放索引{#release-index}

对于暂时无须进行查询操作的 Collection 来说，可以将加载到内存的索引文件从内存中释放出来。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"},{"label":"Go","value":"go"}]}>
<TabItem value='python'>

```python
collection.release()
```

</TabItem>

<TabItem value='javascript'>

```javascript
async function main() {

    // (Continued)
    
    res = await client.releaseCollection({
        collection_name: collectionName
    })

    // Output
    // 
    // { error_code: 'Success', reason: '', code: 0 }
    // 

}
```

</TabItem>

<TabItem value='java'>

```java
public final class UseCustomizedSchemaDemo  {
    public static void main(String[] args) {
        
        // (Continued)

        ReleaseCollectionParam releaseCollectionParam = ReleaseCollectionParam.newBuilder()
            .withCollectionName(collectionName)
            .build();

        R<RpcStatus> releaseCollectionRes = client.releaseCollection(releaseCollectionParam);

        if (releaseCollectionRes.getException() != null) {
            System.err.println("Failed to release collection: " + releaseCollectionRes.getException().getMessage());
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
    
    releaseColErr := conn.ReleaseCollection(context.Background(), COLLNAME)

    if releaseColErr != nil {
        log.Fatal("Failed to release collection:", releaseColErr.Error())
    }       
}
```

</TabItem>
</Tabs>


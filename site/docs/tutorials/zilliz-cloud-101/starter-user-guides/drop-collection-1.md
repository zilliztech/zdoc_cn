---
slug: /drop-collection-1
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 删除 Collection

本文介绍如何从 Zilliz Cloud 集群中删除 Collection。

## 开始前 {#before-commencing}

删除 Collection 会删除与其相关的所有信息，包括插入数据、元数据和索引。删除操作不可逆，请谨慎执行本操作。

阅读本指南系列时，建议[下载代码示例](https://assets.zilliz.com/zdoc/zilliz_cloud_sdk_examples.zip)。

:::info 说明

本指南系列中创建的 Collection 包含 `id` 主键和 `vector` 向量字段。如果您希望完全自定义 Collection，请参见[定制 Schema](./use-customized-schema)、[开启动态 Schema](./enable-dynamic-schema) 和 [JSON](./javascript-object-notation-json-1)。

:::

## 操作步骤 {#steps}

使用以下示例代码从集群中删除 Collection：

<Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "NodeJS", "value": "javascript"}]}>
<TabItem value='python'>

```python
res = client.drop_collection(collection_name="medium_articles_2020")

print(res)

# 输出：
# None
```

</TabItem>

<TabItem value='javascript'>

```javascript
res = await client.dropCollection({
    collection_name: "medium_articles_2020"
});

console.log(res)

// 输出：
// { error_code: 'Success', reason: '' }
```

</TabItem>
</Tabs>

## 使用限制 {#limitations-on-use}

每个 Collection 只能创建一个向量字段。

## 相关文档 {#related-doc}

- [插入 Entity](./insert-entities)

- [向量搜索和查询](./search-and-query)

- [删除 Entity](./delete-entities)

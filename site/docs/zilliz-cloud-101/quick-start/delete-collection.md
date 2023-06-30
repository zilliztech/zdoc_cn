---
sidebar_position: 6
---

# 删除 Collection

本文介绍如何从 Zilliz Cloud 集群中删除 Collection。

## 开始前

删除 Collection 会删除与其相关的所有信息，包括插入数据、元数据和索引。删除操作不可逆，请谨慎执行本操作。

阅读本指南系列时，建议[下载代码示例](https://assets.zilliz.com/zdoc/zilliz_cloud_sdk_examples.zip)。

> 📘 说明
>
> 本指南系列中创建的 Collection 包含 `**id**` 主键和 `**vector**` 向量字段。如果您希望完全自定义 Collection，请参见[定制 Schema](https://zilliverse.feishu.cn/wiki/VCp1wTKc8io1kGkHknEcHX25nLb)、[开启动态 Schema](https://zilliverse.feishu.cn/wiki/EpHowtn3miepTyk2pNlcLwDonyD) 和 [JSON](https://zilliverse.feishu.cn/wiki/UXBjwVpKmirzg9kgWgmcLixwnIe)。

## 操作步骤

使用以下示例代码从集群中删除 Collection：

```python
res = client.drop_collection(collection_name="medium_articles_2020")

print(res)

# 输出：
# None
```

```javascript
res = await client.dropCollection({
    collection_name: "medium_articles_2020"
});

console.log(res)

// 输出：
// { error_code: 'Success', reason: '' }
```

## 使用限制

每个 Collection 只能创建一个向量字段。

## 相关文档

- [插入 Entity](https://zilliverse.feishu.cn/wiki/Am0bwdNmliIZ9OkUB2DcdkOBnAe)

- [向量搜索和查询](https://zilliverse.feishu.cn/wiki/SPaWwHEVuipu3bkeg17coFgnnUo)

- [删除 Entity](https://zilliverse.feishu.cn/wiki/R8EPw5l7Ei1tEKkdH6qc54UNn1d)

---
sidebar_position: 2
---

# 创建 Collection

本文介绍如何在 Zilliz Cloud 集群中创建 Collection。

## 开始前

请确保已完成以下步骤：

- 已了解 Schema 相关信息。详情请参见[数据模型](https://zilliverse.feishu.cn/wiki/ZgcQw57PxiKaeSkuQmCchK8snP0)。

- 已连接到目标集群。详情请参见[连接集群](https://zilliverse.feishu.cn/wiki/HU31wDHCCiN9qIknZ2fcLmconNh)。

- 已下载示例数据集。详情请参见[示例数据集](https://zilliverse.feishu.cn/wiki/ZoXbwP8hJivPw2ktsLrckw0Snif)。

- 阅读本系列指南时，建议[下载代码示例](https://assets.zilliz.com/zdoc/zilliz_cloud_sdk_examples.zip)。

> 📘 说明
>
> 本指南系列中创建的 Collection 包含 `id` 主键和 `vector` 向量字段。如果您希望完全自定义 Collection，请参见[定制 Schema](https://zilliverse.feishu.cn/wiki/VCp1wTKc8io1kGkHknEcHX25nLb)、[开启动态 Schema](https://zilliverse.feishu.cn/wiki/EpHowtn3miepTyk2pNlcLwDonyD) 和 [JSON](https://zilliverse.feishu.cn/wiki/UXBjwVpKmirzg9kgWgmcLixwnIe)。

## 操作步骤

Zilliz Cloud 的动态 Schema 功能可以实现在插入数据时基于新字段重构 Collection。要创建使用动态  Schema 的  Collection，您只需指定 Collection 名称和向量维度：

示例代码：

```python
res = client.create_collection(
        collection_name="medium_articles_2020",
        dimension=768
)

print(res)

# 输出：
# None
```

```javascript
// 创建 Collection
res = await client.createCollection({
    collection_name: "medium_articles_2020",
    dimension: 768
});

console.log(res)

// 输出：
// { error_code: 'Success', reason: '' }
```

以上代码将在后台创建包含 `id` 主键和 `vector` 向量字段的 Collection。

动态 Schema 模式下，您可以向 Collection 中插入 Schema 中未提前定义的新字段，Zilliz Cloud 会动态解析新插入的数据并推测其数据结构。

## 数据类型

Zilliz Cloud 目前支持以下类型的数据：

- 布尔类型（BOOLEAN）

- 8 字节浮点（DOUBLE）

- 4 字节浮点（FLOAT）

- 浮点向量（FLOAT_VECTOR）

- 8 位整数（INT8）

- 32 位整数（INT32）

- 64 位整数（INT64）

- 可变字符串（VARCHAR）

- JSON

## 相关文档

- [删除 Collection](https://zilliverse.feishu.cn/wiki/FrMbwwoTwiqJO4kofPkcndsAnoh)

- [插入 Entity](https://zilliverse.feishu.cn/wiki/Am0bwdNmliIZ9OkUB2DcdkOBnAe)

- [向量搜索和查询](https://zilliverse.feishu.cn/wiki/SPaWwHEVuipu3bkeg17coFgnnUo)

- [定制 Schema](https://zilliverse.feishu.cn/wiki/VCp1wTKc8io1kGkHknEcHX25nLb)

- [开启动态 Schema](https://zilliverse.feishu.cn/wiki/EpHowtn3miepTyk2pNlcLwDonyD)

- [JSON](https://zilliverse.feishu.cn/wiki/UXBjwVpKmirzg9kgWgmcLixwnIe)

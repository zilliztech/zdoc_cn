---
sidebar_position: 5
---

# 删除 Entity

Entity 是指存储在 Zilliz Cloud 集群中的数据实体，包含用于处理、搜索和查询的数据。如果您不再需要某个 Entity，可以执行相关操作将其删除。

本文介绍如何从 Collection 中删除单个或多个 Entity。

阅读本指南系列时，建议[下载代码示例](https://assets.zilliz.com/zdoc/zilliz_cloud_sdk_examples.zip)。

> 📘 说明
>
> 本指南系列中创建的 Collection 包含 `id` 主键和 `vector` 向量字段。如果您希望完全自定义 Collection，请参见[定制 Schema](https://zilliverse.feishu.cn/wiki/VCp1wTKc8io1kGkHknEcHX25nLb)、[开启动态 Schema](https://zilliverse.feishu.cn/wiki/EpHowtn3miepTyk2pNlcLwDonyD) 和 [JSON](https://zilliverse.feishu.cn/wiki/UXBjwVpKmirzg9kgWgmcLixwnIe)。

## 删除单个 Entity

如果您不再需要某个 Entity，可以参考以下示例代码删除 Entity：

```python
res = client.delete(
        collection_name="medium_articles_2020", # Collection 名称
        pks=253 # Entity ID
)

print(res)

# 输出：
# [253]
```

```javascript
res = await client.delete({
    collection_name: "medium_articles_2020",
    ids: [253]
});

console.log(res)

// 输出：
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
```

以上代码从 Collection `medium_articles_2020`  中删除了 ID 为 `253`  的 Entity。

> 🚧 警告
>
> 删除 Entity 是不可逆操作。在执行操作之前，请务必备份或确认数据不再需要。

## 批量删除 Entity

Zilliz Cloud 支持批量删除 Entity。可以参考以下示例代码批量删除 Entity：

```python

res = client.delete(
        collection_name="medium_articles_2020", # Collection 名称
        pks=[252, 236] # Entity ID
)

print(res)

# 输出：
# [252, 236]
```

```javascript
res = await client.delete({
    collection_name: "medium_articles_2020",
    ids: [252, 236]
});

console.log(res)

// 输出：
//  {
//   succ_index: [],
//   err_index: [],
//   status: { error_code: 'Success', reason: '' },
//   IDs: { int_id: { data: [Array] }, id_field: 'int_id' },
//   acknowledged: false,
//   insert_cnt: '0',
//   delete_cnt: '2',
//   upsert_cnt: '0',
//   timestamp: '44219291381268543'
// }
```

以上代码从 Collection `medium_articles_2020` 中同时删除 ID 为 `252` 和 `236` 的 Entity。

> 🚧 警告
>
> 删除 Entity 是不可逆操作。在执行操作之前，请务必备份或确认数据不再需要。

## 相关文档

- [插入 Entity](https://zilliverse.feishu.cn/wiki/Am0bwdNmliIZ9OkUB2DcdkOBnAe)

- [向量搜索和查询](https://zilliverse.feishu.cn/wiki/SPaWwHEVuipu3bkeg17coFgnnUo)

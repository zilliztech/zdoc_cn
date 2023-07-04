---
slug: /example-dataset-1
sidebar_position: 4
---

# 示例数据集

本指南系列中的操作示例都是基于同一个示例数据集。该数据集包含了从 2020 年 1 月至 2020 年 8 月期间在各知名出版物上发表的 5000 多篇 Medium 文章的详细信息。

## 获取数据集 {#get-dataset}

数据集存放在公共 S3 存储桶中，您可以通过以下命令下载文件：

```bash
curl https://assets.zilliz.com/medium_articles_2020_dpr_a13e0377ae.json \
        --output medium_articles_2020_dpr.json

# 输出：
#
# % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
#                                  Dload  Upload   Total   Spent    Left  Speed
# 100 60.4M  100 60.4M    0     0  12.8M      0  0:00:04  0:00:04 --:--:-- 12.9M
```

有关数据集的更多信息，请访问 [Kaggle 相关页面](https://www.kaggle.com/datasets/shiyu22chen/cleaned-medium-articles-dataset)。

## 数据集 Schema {#dataset-schema}

数据集中的记录具有 8 个共同属性。创建 Collection 时，请以此表作为参考。

| 字段名            | 类型           | 属性       |
| -------------- | ------------ | -------- |
| `id`           | INT64        | N/A      |
| `vector`       | FLOAT_VECTOR | 维度：768   |
| `title`        | VARCHAR      | 最大长度：512 |
| `link`         | VARCHAR      | 最大长度：512 |
| `reading_time` | INT64        | N/A      |
| `publication`  | VARCHAR      | 最大长度：512 |
| `claps`        | INT64        | N/A      |
| `responses`    | INT64        | N/A      |

## 相关文档 {#related-doc}

- [连接集群](./connect-to-cluster)

- [创建 Collection](./create-collection-2)

- [删除 Collection](./drop-collection-1)

- [插入 Entity](./insert-entities)

- [向量搜索和查询](./search-and-query)

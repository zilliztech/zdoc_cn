---
slug: /example-dataset
beta: FALSE
notebook: FALSE
type: origin
token: ZoXbwP8hJivPw2ktsLrckw0Snif
sidebar_position: 5

---

import Admonition from '@theme/Admonition';


# 示例数据集

本指南系列中的操作示例都是基于同一个示例数据集。该数据集包含了从 2020 年 1 月至 2020 年 8 月期间在各知名出版物上发表的 5000 多篇 Medium 文章的详细信息。

## 获取数据集{#acquire-the-dataset}

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

## 数据集 Schema{#dataset-schema}

数据集中的记录具有 8 个共同属性。创建 Collection 时，请以此表作为参考。

<table>
   <tr>
     <th><p>字段名</p></th>
     <th><p>类型</p></th>
     <th><p>属性</p></th>
   </tr>
   <tr>
     <td><p><code>id</code></p></td>
     <td><p>INT64</p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>title_vector</code></p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>维度：768</p></td>
   </tr>
   <tr>
     <td><p><code>title</code></p></td>
     <td><p>VARCHAR</p></td>
     <td><p>最大长度：512</p></td>
   </tr>
   <tr>
     <td><p><code>link</code></p></td>
     <td><p>VARCHAR</p></td>
     <td><p>最大长度：512</p></td>
   </tr>
   <tr>
     <td><p><code>reading_time</code></p></td>
     <td><p>INT64</p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>publication</code></p></td>
     <td><p>VARCHAR</p></td>
     <td><p>最大长度：512</p></td>
   </tr>
   <tr>
     <td><p><code>claps</code></p></td>
     <td><p>INT64</p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>responses</code></p></td>
     <td><p>INT64</p></td>
     <td><p>N/A</p></td>
   </tr>
</table>

## 相关文档{#related-topics}

- [连接集群](./connect-to-cluster)

- [创建 Collection](./undefined)

- [删除 Collection](./undefined)

- [插入 Entity](./undefined)

- [向量搜索和查询](./undefined)


---
slug: /migrate-from-elasticsearch
beta: FALSE
notebook: FALSE
type: origin
token: CJN4wlKiGi1P8Zk4BHKcF04GnLb
sidebar_position: 2

---

import Admonition from '@theme/Admonition';


# 从 Elasticsearch 迁移至 Zilliz Cloud

如今，大多数企业的基础环境都以数据为驱动。在这种背景下，如何高效、无缝地在不同平台之间迁移数据以利用先进的数据分析能力变得至关重要。本文介绍了如何将 Elasticsearch 中的数据迁移到 Zilliz Cloud，以帮助您充分释放数据的潜力，实现可扩展性、高性能和易用性。

## 开始前{#before-you-start}

请确保已完成以下步骤：

- 您的 Elasticsearch 集群运行在 7.x 及以上版本。详情请参阅[安装 Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html)。

- 您已创建 Zilliz Cloud 集群。详情请参阅[创建集群](./create-cluster)。

## 连接到 Elasticsearch 集群{#connect-to-your-elasticsearch-cluster}

在与 Elasticsearch 集群交互之前，首先需要连接到集群。根据 Elasticsearch 集群的部署模式，Zilliz Cloud 提供以下连接方法：

- **使用 Cloud ID 连接**：适用于在 Elastic Cloud 上运行的 Elasticsearch 集群。选择此连接方式，您需要指定 Elasticsearch 集群的 Cloud ID 和 API 密钥。

- **使用 URL 连接**：适用于在本地部署的 Elasticsearch 集群。选择此连接方式，您需要指定集群的URL 以及集群用户名和密码。

有关如何获取集群的连接信息，请参阅[连接集群](https://www.elastic.co/guide/en/cloud-enterprise/current/ece-connect.html#ece-connect)和[获取 API 密钥信息](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-get-api-key.html)。

![zh_connect_to_es](/img/zh_connect_to_es.png)

## 将数据从 Elasticsearch 索引迁移至 Zilliz Cloud Collection{#transition-from-elasticsearch-index-to-zilliz-cloud-collection}

Zilliz Cloud 中的 Collection 类似于 Elasticsearch 中的索引。要将 Elasticsearch 中的索引数据迁移到 Zilliz Cloud 的 Collection，首先需要连接到 Elasticsearch 集群，然后从页面左侧选择源索引和待迁移字段。选择完成后，待迁移字段将显示在页面右侧的目标 Collection 中。具体请参见下图。

![zh_migrate_index](/img/zh_migrate_index.png)

默认情况下，该 Collection 的名称遵循命名约定 **Collection_n**，其中 *n* 表示一个数字值，用于区分它与 Zilliz Cloud 上的其他 Collection。

对于每次迁移，您只能选择源索引中的一个 `dense_vector` 字段和一个或多个其他字段。选择待迁移的字段时，请注意以下事项：

- Elasticsearch 索引中的向量字段 `dense_vector` 映射到 Zilliz Cloud 的 Collection 中为 `FloatVector` 字段。您可以为 `FloatVector` 字段选择合适的度量类型。可选值为**欧氏距离（Euclidean/L2）**和**内积（Inner Product/IP）**。

- 向量数据的维度由源索引中的向量字段维度决定。如果您集群的 CU 类型是**容量型**，请确保您选择要迁移的 `dense_vector` 字段的维度不小于 32。否则，将会发生错误，数据无法迁移。有关更多信息，请参见[选择合适的 CU 类型](./cu-types-explained)。

<Admonition type="info" icon="📘" title="说明">

<p>有关更多字段映射信息，请参阅<a href="./migrate-from-elasticsearch#field-mapping-reference">字段映射</a>。</p>

</Admonition>

在**主键**字段，选择一个字段作为 Collection 的主键。您可以选择 Elasticsearch  元数据字段 `_id` 或源索引中的其他字段作为主键。如果选择 `_id` 字段，请将其数据类型设置为 **Int64** 或 **VarChar**。

在**动态 Schema** 字段，选择是否为 Collection 启用动态 Schema。有关更多信息，请参见[开启动态 Schema](./enable-dynamic-field)。

## 结果验证{#verify-the-migration-results}

如果迁移任务的状态从**迁移中**变更为**成功**，则代表迁移成功。

<Admonition type="info" icon="📘" title="说明">

<p>在迁移过程中，您可以同时向 Elasticsearch 中的源索引插入数据，但最新插入的数据不会实时同步迁移至 Zilliz Cloud。</p>

</Admonition>

![zh_verify_collection_es](/img/zh_verify_collection_es.png)

## 字段映射{#field-mapping-reference}

下表详细说明了 Elasticsearch 索引中的字段如何映射到 Zilliz Cloud 的 Collection 中。

<table>
   <tr>
     <th>Elasticsearch 字段</th>
     <th>Zilliz Cloud 字段</th>
     <th>描述</th>
   </tr>
   <tr>
     <td>dense_vector</td>
     <td>FloatVector</td>
     <td>向量维度与源索引中的向量字段维度相同。您可以在 <strong>L2</strong> 和 <strong>IP</strong> 之间指定一个度量类型。</td>
   </tr>
   <tr>
     <td>keyword</td>
     <td>VarChar</td>
     <td>通过 <strong>Max Length</strong> 指定最大数据长度，有效值为 1 到 65535 之间。如果任何字符串超过了最大长度限制，迁移过程将会报错。</td>
   </tr>
   <tr>
     <td>text</td>
     <td>VarChar</td>
     <td>通过 <strong>Max Length</strong> 指定最大数据长度，有效值为 1 到 65535 之间。如果任何字符串超过了最大长度限制，迁移过程将会报错。</td>
   </tr>
   <tr>
     <td>long</td>
     <td>Int64</td>
     <td>-</td>
   </tr>
   <tr>
     <td>integer</td>
     <td>Int32</td>
     <td>-</td>
   </tr>
   <tr>
     <td>double</td>
     <td>Double</td>
     <td>-</td>
   </tr>
   <tr>
     <td>float</td>
     <td>Float</td>
     <td>-</td>
   </tr>
   <tr>
     <td>boolean</td>
     <td>Bool</td>
     <td>-</td>
   </tr>
</table>

## 相关文档{#related-topics}

- [向量搜索和查询](./undefined)

- [插入 Entity](./undefined)

- [AUTOINDEX](./autoindex-explained)

- [选择合适的 CU 类型](./cu-types-explained) 


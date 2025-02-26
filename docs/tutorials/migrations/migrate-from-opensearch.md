---
title: "从 OpenSearch 迁移至 Zilliz Cloud | Cloud"
slug: /migrate-from-opensearch
sidebar_label: "从 OpenSearch 迁移"
beta: FALSE
notebook: FALSE
description: "OpenSearch 是一个分布式的搜索与分析引擎，支持多种应用场景，从在网站上实现搜索框，到用于分析安全数据进行威胁检测。本文将介绍如何将 OpenSearch 数据迁移到 Zilliz Cloud。 | Cloud"
type: origin
token: Cf89wr8V3iGmr3kKiqAcP4D1nPb
sidebar_position: 9
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 迁移
  - opensearch

---

import Admonition from '@theme/Admonition';


# 从 OpenSearch 迁移至 Zilliz Cloud

[OpenSearch](https://opensearch.org/) 是一个分布式的搜索与分析引擎，支持多种应用场景，从在网站上实现搜索框，到用于分析安全数据进行威胁检测。本文将介绍如何将 OpenSearch 数据迁移到 Zilliz Cloud。

## 注意事项{#considerations}

- Zilliz Cloud 支持迁移大多数 OpenSearch 数据类型。开始迁移前，请确认您的数据类型是否兼容。如果表中包含不受支持的数据类型字段，您可以选择不迁移这些字段或[提交工单](https://support.zilliz.com.cn/hc/zh-cn)。完整的支持数据类型列表，请参考[字段映射](./migrate-from-opensearch)。

- 每次迁移仅支持选择单个源集群。如果您在多个源集群中有数据，可以创建多个迁移任务。

## 开始前{#before-you-start}

- 源 OpenSearch 集群可以从公网访问。

- 如果您的网络环境配置了白名单列表，请确保将 Zilliz Cloud 的 IP 地址添加到其中。要了解更多信息，请参考 [Zilliz Cloud IP](./zilliz-cloud-ips)。

- 已在 Zilliz Cloud 中获得组织管理员或项目管理员权限。如果您没有相关权限，请联系您的 Zilliz Cloud 管理员。

## 从 OpenSearch 迁移至 Zilliz Cloud{#migrate-from-opensearch-to-zilliz-cloud}

![zh-migrate_from_opensearch](/img/zh-migrate_from_opensearch.png)

您可以将源数据迁移到任何版本类型的 Zilliz Cloud 集群，只要其计算单元（CU）大小能够满足源数据的存储需求。

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **OpenSearch**。

1. 在**连接至数据源**步骤中，提供 OpenSearch 集群连接信息，包括 Cluster Endpoint（AWS OpenSearch: `https://<ID>.<region>.es.amazonaws.com`，OpenSearch 社区版: `https://<ip>:<port>`）、用户名和密码。然后，单击**下一步**。

    <Admonition type="info" icon="📘" title="说明">

    <p>有关如何获取集群的连接信息，请参阅 <a href="https://opensearch.org/docs/latest/getting-started/communicate/">Communicate with OpenSearch</a>。</p>

    </Admonition>

1. 在**选择迁移来源和目标**步骤中，配置源 OpenSearch 集群和目标 Zilliz Cloud 集群的设置。然后，单击**下一步**。

    <Admonition type="info" icon="📘" title="说明">

    <p>您选择从 OpenSearch 迁移的每个源索引必须包含一个向量字段。</p>

    </Admonition>

1. 在**配置 Schema** 步骤中：

    1. 验证 OpenSearch 数据与 Zilliz Cloud 数据类型之间的映射。Zilliz Cloud 默认映射数据，您可以查看相关映射并进行必要的调整。目前，您可以重命名字段，但不支持更改字段数据类型。

    1. 在**高级设置**中配置**动态列**和 **Partition Key**。更多信息请参考 [Dynamic Field](./enable-dynamic-field) 和[使用 Partition Key](./use-partition-key)。

    1. 在**目标 Collection 名称和描述**中，自定义目标 Collection 的名称和描述。Collection 名称在每个集群中必须唯一。如果名称与现有 Collection 重复，请重命名 Collection。

1. 点击**迁移**。

## 查看迁移进度{#monitor-the-migration-process}

生成迁移任务后，您可前往[任务中心](/docs/job-center)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

<Admonition type="info" icon="📘" title="说明">

<p>迁移完成后，请验证目标集群中的 collection 和 entity 数量是否与数据源一致。如果发现不一致，请删除缺失 entity 的 collection 并重新进行迁移。</p>

</Admonition>

![view_migration_progress_cn](/img/view_migration_progress_cn.png)

## 取消迁移任务{#cancel-migration-job}

如果迁移过程遇到任何问题，您可以采取以下步骤进行故障排除并恢复迁移：

1. 在**任务中心**页面，取消失败的迁移任务。

1. 在**操作**列点击**查看详情**以访问日志信息。

## 字段映射{#field-mapping-reference}

下表详细说明了 OpenSearch 索引中的字段如何映射到 Zilliz Cloud 的 Collection 中。

<table>
   <tr>
     <th><p><strong>OpenSearch Field Type</strong></p></th>
     <th><p><strong>Zilliz Cloud Field Type</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/knn-vector/">k-NN vector</a></p></td>
     <td><p><code>FLOAT_VECTOR</code></p></td>
     <td><p>OpenSearch 中的 <code>float</code> 向量类型映射到 Zilliz Cloud 上的 <code>FLOAT_VECTOR</code>。OpenSearch 的 Byte/Binary 向量不支持迁移。 向量维度保持不变。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/alias/">Alias</a></p></td>
     <td><p>Not supported</p></td>
     <td><p>暂不支持映射该字段。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/binary/">Binary</a></p></td>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>Binary data is stored as a string on Zilliz Cloud.</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/numeric/">Numeric</a></p></td>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code>byte</code></p></td>
     <td><p><code>INT8</code></p></td>
     <td><p>直接映射。</p></td>
   </tr>
   <tr>
     <td><p><code>double</code></p></td>
     <td><p><code>DOUBLE</code></p></td>
     <td><p>直接映射。</p></td>
   </tr>
   <tr>
     <td><p><code>float</code></p></td>
     <td><p><code>FLOAT</code></p></td>
     <td><p>直接映射。</p></td>
   </tr>
   <tr>
     <td><p><code>half_float</code></p></td>
     <td><p><code>FLOAT</code></p></td>
     <td><p>映射为 <code>FLOAT</code> 数据类型。</p></td>
   </tr>
   <tr>
     <td><p><code>integer</code></p></td>
     <td><p><code>INT32</code></p></td>
     <td><p>直接映射。</p></td>
   </tr>
   <tr>
     <td><p><code>long</code></p></td>
     <td><p><code>INT64</code></p></td>
     <td><p>直接映射。</p></td>
   </tr>
   <tr>
     <td><p><code>short</code></p></td>
     <td><p><code>INT16</code></p></td>
     <td><p>直接映射。</p></td>
   </tr>
   <tr>
     <td><p><code>unsigned_long</code></p></td>
     <td><p>Not supported</p></td>
     <td><p>暂不支持映射该字段。</p></td>
   </tr>
   <tr>
     <td><p><code>scaled_float</code></p></td>
     <td><p>Not supported</p></td>
     <td><p>暂不支持映射该字段。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/boolean/">Boolean</a></p></td>
     <td><p><code>BOOL</code></p></td>
     <td><p>存储 <code>true</code> 或 <code>false</code>。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/dates/">Date</a></p></td>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>存储为字符串。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/ip/">IP address</a></p></td>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>存储为字符串。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/range/">Range</a></p></td>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>存储为字符串。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/object-fields/">Object</a></p></td>
     <td><p><code>JSON</code></p></td>
     <td><p>序列化为 JSON 格式。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/string/">String</a></p></td>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code>keyword</code></p></td>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>存储为字符串。</p></td>
   </tr>
   <tr>
     <td><p><code>text</code></p></td>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>映射到 Milvus 2.5 或更早版本中的 VARCHAR。</p></td>
   </tr>
   <tr>
     <td><p><code>match_only_text</code></p></td>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>存储为字符串。</p></td>
   </tr>
   <tr>
     <td><p><code>token_count</code></p></td>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>存储为字符串。</p></td>
   </tr>
   <tr>
     <td><p><code>wildcard</code></p></td>
     <td><p>Not supported</p></td>
     <td><p>暂不支持映射该字段。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/autocomplete/">Autocomplete</a></p></td>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>存储为字符串。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/geographic/">Geographic</a></p></td>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>存储为字符串。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/rank/">Rank</a></p></td>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>存储为字符串。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/percolator/">Percolator</a></p></td>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>存储为字符串。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/derived/">Derived</a></p></td>
     <td><p>Not supported</p></td>
     <td><p>暂不支持映射该字段。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/star-tree/">Star-tree</a></p></td>
     <td><p>Not supported</p></td>
     <td><p>暂不支持映射该字段。</p></td>
   </tr>
</table>

- 潜在的数据丢失或截断：在 VARCHAR 列中存储日期、范围、IP 地址或大文本内容等字段时，请考虑 Zilliz Cloud 上的长度限制或索引要求。

- 不支持的字段类型：对于不支持的 OpenSearch 类型，请在迁移到 Zilliz Cloud 之前进行转换或移除。


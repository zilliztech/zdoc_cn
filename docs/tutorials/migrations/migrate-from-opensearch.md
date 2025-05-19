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

迁移过程分为以下步骤：

1. **连接数据源**：输入您的 OpenSearch 集群 Endpoint 和用户名密码来建立连接。

1. **选择迁移源和目标集群**：

    - 选择一个或多个待迁移的源表。

    - 选择一个现有的 Zilliz Cloud 集群作为目标集群。

1. **配置 Schema**：确保 OpenSearch 与 Zilliz Cloud 之间的字段类型正确映射。有关具体的数据映射规则，请参阅[映射规则](./migrate-from-opensearch#mapping-rules)。

![VvN4wnpcMhpZj9b28r7ctMmZnpg](/img/VvN4wnpcMhpZj9b28r7ctMmZnpg.png)

## 映射规则{#mapping-rules}

下表总结了 OpenSearch 字段类型如何映射到 Zilliz Cloud 字段类型，并对各类型做了详细说明。

<table>
   <tr>
     <th><p><strong>OpenSearch 字段类型</strong></p></th>
     <th><p><strong>Zilliz Cloud 字段类型</strong></p></th>
     <th><p><strong>描述</strong></p></th>
   </tr>
   <tr>
     <td><p>主键（<a href="https://opensearch.org/docs/latest/field-types/metadata-fields/id/">_id</a>）</p></td>
     <td><p>主键</p></td>
     <td><p>OpenSearch 的 ID 字段将自动映射为 Zilliz Cloud 的主键字段。</p></td>
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
     <td><p>Binary 数据在 Zilliz Cloud 中以字符串形式存储。</p></td>
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
     <td><p>不支持</p></td>
     <td><p>暂不支持映射该字段。</p></td>
   </tr>
   <tr>
     <td><p><code>scaled_float</code></p></td>
     <td><p>不支持</p></td>
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
     <td><p><code>JSON</code></p></td>
     <td><p>序列化为 JSON 格式。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/object-fields/">Object</a></p></td>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code>object</code></p></td>
     <td><p>JSON</p></td>
     <td><p>序列化为 JSON 格式。</p></td>
   </tr>
   <tr>
     <td><p><code>nested</code></p></td>
     <td><p>JSON</p></td>
     <td><p>序列化为 JSON 格式。</p></td>
   </tr>
   <tr>
     <td><p><code>flat_object</code></p></td>
     <td><p>JSON</p></td>
     <td><p>序列化为 JSON 格式。</p></td>
   </tr>
   <tr>
     <td><p><code>join</code></p></td>
     <td><p>VARCHAR</p></td>
     <td><p>存储为字符串。</p></td>
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
     <td><p><code>INT32</code></p></td>
     <td><p>存储为 INT32。</p></td>
   </tr>
   <tr>
     <td><p><code>wildcard</code></p></td>
     <td><p>不支持</p></td>
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
     <td><p>不支持</p></td>
     <td><p>暂不支持映射该字段。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://opensearch.org/docs/latest/field-types/supported-field-types/star-tree/">Star-tree</a></p></td>
     <td><p>不支持</p></td>
     <td><p>暂不支持映射该字段。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://docs.opensearch.org/docs/latest/field-types/supported-field-types/index/#arrays">Arrays</a></p></td>
     <td><p>不支持</p></td>
     <td><p>暂不支持映射该字段。</p></td>
   </tr>
   <tr>
     <td><p><a href="https://docs.opensearch.org/docs/latest/field-types/supported-field-types/index/#multifields">Multifields</a></p></td>
     <td><p>不支持</p></td>
     <td><p>暂不支持映射该字段。</p></td>
   </tr>
</table>

## 开始前{#before-you-start}

- 源 OpenSearch 集群可以从公网访问。

- 如果您的网络环境配置了白名单列表，请确保将 Zilliz Cloud 的 IP 地址添加到其中。要了解更多信息，请参考 [Zilliz Cloud IP](./zilliz-cloud-ips)。

- 已在 Zilliz Cloud 中获得组织管理员或项目管理员权限。如果您没有相关权限，请联系您的 Zilliz Cloud 管理员。

- 确保目标集群的 CU 容量足以容纳源数据。要估算所需的 CU 规格，请使用[计算器](https://zilliz.com.cn/pricing#calculator)。

## 从 OpenSearch 迁移至 Zilliz Cloud{#migrate-from-opensearch-to-zilliz-cloud}

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **OpenSearch**。

    ![N2JkbQ9ZFoKyEaxocz6cdLgQnGe](/img/N2JkbQ9ZFoKyEaxocz6cdLgQnGe.png)

1. 在**连接至数据源**步骤中，提供 OpenSearch 集群连接信息，包括 Cluster Endpoint（AWS OpenSearch: `https://<ID>.<region>.es.amazonaws.com`，OpenSearch 社区版: `https://<ip>:<port>`）、用户名和密码。然后，单击**下一步**。

    <Admonition type="info" icon="📘" title="说明">

    <p>有关如何获取集群的连接信息，请参阅 <a href="https://opensearch.org/docs/latest/getting-started/communicate/">Communicate with OpenSearch</a>。</p>

    </Admonition>

1. 在**选择迁移来源和目标**步骤中，配置源 OpenSearch 集群和目标 Zilliz Cloud 集群的设置。然后，单击**下一步**。

    <Admonition type="info" icon="📘" title="说明">

    <p>您选择从 OpenSearch 迁移的每个源索引必须包含一个向量字段。</p>

    </Admonition>

1. 在**配置 Schema** 步骤中，设置 Zilliz Cloud 与 OpenSearch 之间的字段映射：

    ![NDaVbnvSMosZxsxcpSRczIkjnLd](/img/NDaVbnvSMosZxsxcpSRczIkjnLd.png)

    1. **确认字段映射：**

        - Zilliz Cloud 会自动检测并显示您的 OpenSearch 字段及其对应的目标字段。有关字段映射的详细信息，请参阅[映射规则](./migrate-from-opensearch#mapping-rules)。

        - 请确认各 OpenSearch 字段是否与相应的目标字段正确匹配。您可以根据需要重命名字段，但字段的数据类型不支持修改。

    1. **处理标量字段：**

        对于标量字段，请配置以下属性：

        - **支持 Null 值：** 决定该字段是否可以包含 null 值，此功能默认启用。详情请参阅 [Nullable 和默认值](./nullable-and-default)。

        - **默认值：** 为该字段指定一个默认值。详情请参阅 [Nullable 和默认值](./nullable-and-default)。

        - **Partition key：** 可选择将 INT64 或 VARCHAR 字段指定为 Partition Key。注意：每个 Collection 仅支持一个 Partition Key，并且所选字段不能包含 null 值。详情请参阅[使用 Partition Key](./use-partition-key)。

    1. **启动 Dynamic Field：**

        - 默认情况下，Dynamic Field 处于启用状态，这允许您插入 Collection Schema 中未定义的任意标量字段。

        - 如果禁用该功能，则需要在插入数据前显式定义每个 Entity 包含的所有字段。更多信息请参阅 [Dynamic Field](./enable-dynamic-field)。

    1. **（可选）调整 Shard：**

        - 点击**高级设置**以配置目标 Collection 的 Shard 数量。

        - 对于大约 1 亿行数据来说，通常只需一个 Shard 即可。

        - 如果您的数据集超过 10 亿行，请[联系我们](https://zilliz.com.cn/contact-sales)以获取最佳 Shard 配置方案。

1. 点击**迁移**。

## 查看迁移进度{#monitor-the-migration-process}

生成迁移任务后，您可前往[任务中心](/docs/job-center)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

![ONSXbpLgJoWuBpxEycQcEjk7nfe](/img/ONSXbpLgJoWuBpxEycQcEjk7nfe.png)

## 迁移后{#post-migration}

迁移任务完成后，请注意以下事项：

- **索引创建**：在从外部数据源进行迁移时，系统不会自动为向量字段创建索引。您需要手动为每个向量字段创建索引。详细信息请参阅[创建 Vector Index](./index-vector-fields)。

- **手动 Load Collection**：创建必要的向量索引后，请手动 Load Collection，使其可用于搜索和查询操作。详细信息请参阅 [Load 和 Release](./load-release-collections)。

<Admonition type="info" icon="📘" title="说明">

<p>完成索引创建和 Load 后，请检查目标集群中的 Collection 数量及 Entity 数是否与数据源保持一致。如果发现不符，请删除 Collection 并重新进行迁移任务。</p>

</Admonition>

## 取消迁移任务{#cancel-migration-job}

如果迁移过程遇到任何问题，您可以采取以下步骤进行故障排除并恢复迁移：

1. 在**任务中心**页面，取消失败的迁移任务。

1. 在**操作**列点击**查看详情**以访问日志信息。


---
title: "从 Elasticsearch 迁移至 Zilliz Cloud | Cloud"
slug: /migrate-from-elasticsearch
sidebar_label: "从 Elasticsearch 迁移"
beta: FALSE
notebook: FALSE
description: "Elasticsearch 是一个高度可扩展的搜索和分析引擎。通过利用 Zilliz Cloud 的迁移能力，您可以无缝地将数据从 Elasticsearch 实例迁移到 Zilliz Cloud 集群。 | Cloud"
type: origin
token: CJN4wlKiGi1P8Zk4BHKcF04GnLb
sidebar_position: 6
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 迁移
  - elasticsearch

---

import Admonition from '@theme/Admonition';


# 从 Elasticsearch 迁移至 Zilliz Cloud

[Elasticsearch](https://www.elastic.co/elasticsearch) 是一个高度可扩展的搜索和分析引擎。通过利用 Zilliz Cloud 的迁移能力，您可以无缝地将数据从 Elasticsearch 实例迁移到 Zilliz Cloud 集群。

迁移过程分为以下步骤：

1. **连接数据源**：输入您的 Elasticsearch 集群连接端点或 Cloud ID 来建立连接。

1. **选择迁移源和目标集群**：

    - 选择一个或多个待迁移的 Elasticsearch 索引。

    - 选择一个现有的 Zilliz Cloud 集群作为目标集群。

1. **配置 Schema**：确保 Elasticsearch 与 Zilliz Cloud 之间的字段类型正确映射。有关具体的数据映射规则，请参阅[映射规则](./migrate-from-elasticsearch#mapping-rules)。

![XWTOwtbNLhXcaEbLxsAcpK3knPg](/img/XWTOwtbNLhXcaEbLxsAcpK3knPg.png)

## 映射规则{#mapping-rules}

下表总结了 Elasticsearch 字段类型如何映射到 Zilliz Cloud 字段类型，并对各类型做了详细说明。

<table>
   <tr>
     <th><p><strong>Elasticsearch 字段类型</strong></p></th>
     <th><p><strong>Zilliz Cloud 字段类型</strong></p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p>主键</p></td>
     <td><p>主键</p></td>
     <td><p>Elasticsearch 的 ID 字段会自动映射为 Zilliz Cloud 中的主键。 在数据迁移时，您可以选择启用 Auto ID 功能；但请注意，启用后源索引中的原始主键值将会被舍弃。</p></td>
   </tr>
   <tr>
     <td><p>dense_vector</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>向量维度与源索引中的向量字段维度相同。您可以在 <strong>L2</strong> 和 <strong>IP</strong> 之间指定一个度量类型。</p></td>
   </tr>
   <tr>
     <td><p>text, string, keyword, ip, date, timestamp</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>通过 <strong>Max Length</strong> 指定最大数据长度，有效值为 1 到 65535 之间。如果任何字符串超过了最大长度限制，迁移过程将会报错。</p></td>
   </tr>
   <tr>
     <td><p>long</p></td>
     <td><p>INT64</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>integer</p></td>
     <td><p>INT32</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>short</p></td>
     <td><p>INT16</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>byte</p></td>
     <td><p>INT8</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>double</p></td>
     <td><p>DOUBLE</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>float</p></td>
     <td><p>FLOAT</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>boolean</p></td>
     <td><p>BOOL</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>object</p></td>
     <td><p>JSON</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>arrays</p></td>
     <td><p>ARRAY</p></td>
     <td><p>-</p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="说明">

<p>目前不支持从 Elasticsearch 索引迁移稀疏向量。</p>

</Admonition>

## 开始前{#before-you-start}

- 您的 Elasticsearch 集群运行在 7.x 及以上版本。详情请参阅[安装 Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html)。

- 如果您的网络环境配置了白名单列表，请确保将 Zilliz Cloud 的 IP 地址添加到其中。要了解更多信息，请参考 [Zilliz Cloud IP](./zilliz-cloud-ips)。

- 已在 Zilliz Cloud 中获得组织管理员或项目管理员权限。如果您没有相关权限，请联系您的 Zilliz Cloud 管理员。

- 确保目标集群的 CU 容量足以容纳源数据。要估算所需的 CU 规格，请使用[计算器](https://zilliz.com.cn/pricing#calculator)。

## 从 Elasticsearch 迁移至 Zilliz Cloud{#migrate-from-elasticsearch-to-zilliz-cloud}

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **Elasticsearch**。

    ![Q0wObLWW2oamxFx97LVcoEyYn9c](/img/Q0wObLWW2oamxFx97LVcoEyYn9c.png)

1. 在**连接至数据源**步骤中，选择通过 Endpoint 或通过 Cloud ID 作为与源 Elasticsearch 集群交互的连接方法。然后，单击**下一步**。

    <Admonition type="info" icon="📘" title="说明">

    <p>有关如何获取集群的连接信息，请参阅<a href="https://www.elastic.co/guide/en/cloud-enterprise/current/ece-connect.html#ece-connect">连接集群</a>和<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-get-api-key.html">获取 API 密钥信息</a>。</p>

    </Admonition>

    ![FASUbYe2GoYtclxz9PQc86LxnNg](/img/FASUbYe2GoYtclxz9PQc86LxnNg.png)

1. 在**选择迁移来源和目标**步骤中，配置源 Elasticsearch 集群和目标 Zilliz Cloud 集群的设置。然后，单击**下一步**。

    <Admonition type="info" icon="📘" title="说明">

    <p>您选择从 Elasticsearch 迁移的每个源索引必须包含一个向量字段。</p>

    </Admonition>

    ![EpnWb3W8ooJMIGxoaN4cizsunbd](/img/EpnWb3W8ooJMIGxoaN4cizsunbd.png)

1. 在**配置 Schema** 步骤中，设置 Zilliz Cloud 与 Elasticsearch 之间的字段映射：

    ![G7ysbzJJ9oaUDtxLU1OcTTpDngb](/img/G7ysbzJJ9oaUDtxLU1OcTTpDngb.png)

    1. **确认字段映射：**

        - Zilliz Cloud 会自动检测并显示您的 Elasticsearch 字段及其对应的目标字段。有关字段映射的详细信息，请参阅[映射规则](./migrate-from-elasticsearch#mapping-rules)。

        - 请确认各 Elasticsearch 字段是否与相应的目标字段正确匹配。您可以根据需要重命名字段，但字段的数据类型不支持修改。

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

生成迁移任务后，您可前往[任务中心](./view-activities)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

![TYIIbAJKyoY996xmsRicnIETngb](/img/TYIIbAJKyoY996xmsRicnIETngb.png)

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


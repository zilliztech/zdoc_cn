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

迁移过程涉及与现有的 Elasticsearch 源建立连接，并将其数据索引复制到 Zilliz Cloud 中相应的目标 collection，保留原始数据的结构和性能，同时启用高级向量搜索功能。

## 注意事项{#considerations}

- 目前，您可以迁移以下 Elasticsearch 数据类型：**dense_vector**, **text**, **string**, **keyword**, **ip**, **date**, **timestamp**, **long**, **integer**, **short**, **byte**, **double**, **float**, **boolean**, **object**, **arrays**。如果您的表中存在不支持的数据类型字段，可以选择不迁移这些字段或[提交工单](https://support.zilliz.com.cn/hc/zh-cn)。有关 Elasticsearch 数据类型如何映射到 Zilliz Cloud 的详细信息，请参阅[字段映射](./migrate-from-elasticsearch#field-mapping-reference)。

- 为确保兼容性，目标 Collection 中的 Auto ID 将被禁用，且无法修改。

- 每次迁移仅允许从每个源索引中选择一个向量字段。

- 每次迁移仅支持选择单个源集群。如果您在多个源集群中有数据，可以创建多个迁移任务。

## 开始前{#before-you-start}

- 您的 Elasticsearch 集群运行在 7.x 及以上版本。详情请参阅[安装 Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html)。

- 如果您的网络环境配置了白名单列表，请确保将 Zilliz Cloud 的 IP 地址添加到其中。要了解更多信息，请参考 [Zilliz Cloud IP](./zilliz-cloud-ips)。

- 已在 Zilliz Cloud 中获得组织管理员或项目管理员权限。如果您没有相关权限，请联系您的 Zilliz Cloud 管理员。

## 从 Elasticsearch 迁移至 Zilliz Cloud{#migrate-from-elasticsearch-to-zilliz-cloud}

![zh_migrate_from_es](/img/zh_migrate_from_es.png)

您可以将源数据迁移到任何版本类型的 Zilliz Cloud 集群，只要其计算单元（CU）大小能够满足源数据的存储需求。

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **Elasticsearch**。

1. 在**连接至数据源**步骤中，选择通过 Endpoint 或通过 Cloud ID 作为与源 Elasticsearch 集群交互的连接方法。然后，单击**下一步**。

    <Admonition type="info" icon="📘" title="说明">

    <p>有关如何获取集群的连接信息，请参阅<a href="https://www.elastic.co/guide/en/cloud-enterprise/current/ece-connect.html#ece-connect">连接集群</a>和<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-get-api-key.html">获取 API 密钥信息</a>。</p>

    </Admonition>

1. 在**选择迁移来源和目标**步骤中，配置源 Elasticsearch 集群和目标 Zilliz Cloud 集群的设置。然后，单击**下一步**。

    <Admonition type="info" icon="📘" title="说明">

    <p>您选择从 Elasticsearch 迁移的每个源索引必须包含一个向量字段。</p>

    </Admonition>

1. 在**配置 Schema** 步骤中：

    1. 验证 Elasticsearch 数据与 Zilliz Cloud 数据类型之间的映射。Zilliz Cloud 默认映射数据，您可以查看相关映射并进行必要的调整。目前，您可以重命名字段，但不支持更改字段数据类型。

    1. 在**高级设置**中配置**动态列**和 **Partition Key**。更多信息请参考 [Dynamic Field](./enable-dynamic-field) 和[使用 Partition Key](./use-partition-key)。

    1. 在**目标 Collection 名称和描述**中，自定义目标 Collection 的名称和描述。Collection 名称在每个集群中必须唯一。如果名称与现有 Collection 重复，请重命名 Collection。

1. 点击**迁移**。

## 查看迁移进度{#monitor-the-migration-process}

生成迁移任务后，您可前往[任务中心](./view-activities)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

<Admonition type="info" icon="📘" title="说明">

<p>迁移完成后，请验证目标集群中的 collection 和 entity 数量是否与数据源一致。如果发现不一致，请删除缺失 entity 的 collection 并重新进行迁移。</p>

</Admonition>

![view_migration_progress_cn](/img/view_migration_progress_cn.png)

## 取消迁移任务{#cancel-migration-job}

如果迁移过程遇到任何问题，您可以采取以下步骤进行故障排除并恢复迁移：

1. 在**任务中心**页面，取消失败的迁移任务。

1. 在**操作**列点击**查看详情**以访问日志信息。

## 字段映射{#field-mapping-reference}

下表详细说明了 Elasticsearch 索引中的字段如何映射到 Zilliz Cloud 的 Collection 中。

<table>
   <tr>
     <th><p><strong>Elasticsearch 字段类型</strong></p></th>
     <th><p><strong>Zilliz Cloud 字段类型</strong></p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p>dense_vector</p></td>
     <td><p>FloatVector</p></td>
     <td><p>向量维度与源索引中的向量字段维度相同。您可以在 <strong>L2</strong> 和 <strong>IP</strong> 之间指定一个度量类型。</p></td>
   </tr>
   <tr>
     <td><p>text, string, keyword, ip, date, timestamp</p></td>
     <td><p>VarChar</p></td>
     <td><p>通过 <strong>Max Length</strong> 指定最大数据长度，有效值为 1 到 65535 之间。如果任何字符串超过了最大长度限制，迁移过程将会报错。</p></td>
   </tr>
   <tr>
     <td><p>long</p></td>
     <td><p>Int64</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>integer</p></td>
     <td><p>Int32</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>short</p></td>
     <td><p>int16</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>byte</p></td>
     <td><p>int8</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>double</p></td>
     <td><p>Double</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>float</p></td>
     <td><p>Float</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>boolean</p></td>
     <td><p>Bool</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>object</p></td>
     <td><p>JSON</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>arrays</p></td>
     <td><p>Array</p></td>
     <td><p>-</p></td>
   </tr>
</table>


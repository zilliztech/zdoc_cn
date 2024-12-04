---
title: "从 PostgreSQL 迁移至 Zilliz Cloud | Cloud"
slug: /migrate-from-pgvector
sidebar_label: "从 PostgreSQL 迁移"
beta: FALSE
notebook: FALSE
description: "PostgreSQL](https//www.postgresql.org/) 是一个功能强大且开源的对象关系数据库管理系统，以其卓越的可扩展性、数据完整性和高性能而受到广泛认可。通过使用 [pgvector 插件，PostgreSQL 增强了其存储和管理向量数据的能力。 | Cloud"
type: origin
token: QrBFw5sXmiaaYRk1YpectbZpnzg
sidebar_position: 6
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 迁移
  - pgvector

---

import Admonition from '@theme/Admonition';


# 从 PostgreSQL 迁移至 Zilliz Cloud

[PostgreSQL](https://www.postgresql.org/) 是一个功能强大且开源的对象关系数据库管理系统，以其卓越的可扩展性、数据完整性和高性能而受到广泛认可。通过使用 [pgvector](https://github.com/pgvector/pgvector) 插件，PostgreSQL 增强了其存储和管理向量数据的能力。

如果您拥有安装了 [pgvector](https://github.com/pgvector/pgvector) 的 PostgreSQL 数据库，无论是本地部署还是云托管，均可将其无缝迁移至 Zilliz Cloud 集群。迁移过程包括与现有源数据库建立连接，并将数据从源表复制到 Zilliz Cloud 上相应的目标 collection。

## 注意事项{#considerations}

- 当前支持迁移的 PostgreSQL 数据类型包括：**vector**, **text**/**varchar**/**date**/**time**/**json**, **bigint**, **integer**, **smallint**, **double precision**, **real**, **boolean**, **array**。如果您的表中存在不支持的数据类型字段，可以选择不迁移这些字段或[提交工单](https://support.zilliz.com.cn/hc/zh-cn)。有关 PostgreSQL 数据类型如何映射到 Zilliz Cloud 的详细信息，请参阅[字段映射](./migrate-from-pgvector#field-mapping-reference)。

- 为确保兼容性，目标 Collection 中的 Auto ID 将被禁用，且无法修改。

- 每次迁移仅允许从每个源表中选择一个向量字段。

- 每次迁移仅支持选择单个源 PostgreSQL 数据库。如果您有多个源数据库中，可以创建多个迁移任务。

## 开始前{#before-you-start}

- 源 PostgreSQL 数据库必须能够通过公网访问。

- 您需要拥有组织管理员或项目管理员的角色。如果您没有相应的权限，请联系您的 Zilliz Cloud 管理员。

## 从 PostgreSQL 迁移至 Zilliz Cloud{#migrate-from-postgresql-to-zilliz-cloud}

![zh_migrate_from_pgvector](/img/zh_migrate_from_pgvector.png)

您可以将源数据迁移到任何版本类型的 Zilliz Cloud 集群，只要其计算单元（CU）大小能够满足源数据的存储需求。

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **PostgreSQL**。

1. 在**连接至数据源**步骤中，填入源 PostgreSQL 数据库的 endpoint，提供与数据库关联的用户名和密码，然后点击**下一步**。

    <Admonition type="info" icon="📘" title="说明">

    <p>有关连接信息的详细信息，请参阅 <a href="https://jdbc.postgresql.org/documentation/use/#connecting-to-the-database">Connecting to the Database</a>。</p>

    </Admonition>

1. 在**选择迁移来源和目标**步骤中，配置源数据库和目标 Zilliz Cloud 集群的设置，然后点击**下一步**。

    <Admonition type="info" icon="📘" title="说明">

    <p>从 PostgreSQL 选择的待迁移的表中必须包含一个向量字段。</p>

    </Admonition>

1. 在**配置 Schema** 步骤中：

    1. 验证 PostgreSQL 数据与 Zilliz Cloud 数据类型之间的映射。Zilliz Cloud 默认映射数据，您可以查看相关映射并进行必要的调整。目前，您可以重命名字段，但不支持更改字段数据类型。

    1. 在**高级设置**中配置**动态列**和 **Partition Key**。更多信息请参考[开启动态字段](./enable-dynamic-field)和[使用 Partition Key](./use-partition-key)。

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

下表详细说明了 PostgreSQL 中的字段如何映射到 Zilliz Cloud 的 Collection 中。

<table>
   <tr>
     <th><p>PostgreSQL 字段</p></th>
     <th><p>Zilliz Cloud 字段</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p>vector</p></td>
     <td><p>FloatVector</p></td>
     <td><p>向量维度与源索引中的向量字段维度相同。您可以在 <strong>L2</strong> 和 <strong>IP</strong> 之间指定一个度量类型。</p></td>
   </tr>
   <tr>
     <td><p>text/varchar/date/time/json</p></td>
     <td><p>VarChar</p></td>
     <td><p>通过 <strong>Max Length</strong> 指定最大数据长度，有效值为 1 到 65535 之间。如果任何字符串超过了最大长度限制，迁移过程将会报错。</p></td>
   </tr>
   <tr>
     <td><p>bigint</p></td>
     <td><p>Int64</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>integer</p></td>
     <td><p>Int32</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>smallint</p></td>
     <td><p>int16</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>double precision</p></td>
     <td><p>Double</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>real</p></td>
     <td><p>Float</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>boolean</p></td>
     <td><p>Bool</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>array</p></td>
     <td><p>array</p></td>
     <td><p>-</p></td>
   </tr>
</table>


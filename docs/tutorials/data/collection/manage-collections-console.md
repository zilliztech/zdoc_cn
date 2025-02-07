---
title: "管理 Collection (控制台) | Cloud"
slug: /manage-collections-console
sidebar_label: "管理 Collection (控制台)"
beta: FALSE
notebook: FALSE
description: "本教程将介绍如何通过 Zilliz Cloud 控制台创建和管理 Collection。您也可以通过 SDK 管理 Collection。 | Cloud"
type: origin
token: Cy4swPPaeiZgbmkN4wUc9wAdnwd
sidebar_position: 10
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 在控制台上管理 collection
  - manage collections on console

---

import Admonition from '@theme/Admonition';


# 管理 Collection (控制台)

本教程将介绍如何通过 Zilliz Cloud 控制台创建和管理 Collection。您也可以通过 SDK [管理 Collection](./manage-collections)。

## 创建 Collection{#create-collection}

Zilliz Cloud 提供 3 种创建 Collection 的方式以满足不同需求。

- **[使用您自己的数据](./manage-collections-console#create-your-own-collection)**: 适合需要自定义 Collection 配置的用户。您可以根据自己的数据集或需求自定义 Collection Schema 和索引参数。

- **[使用示例数据集](./manage-collections-console#create-sample-collection)**: 适合 Zilliz Cloud 新手用户。Zilliz Cloud 提供示例数据集，并为您根据示例数据集自动定义 Schema。您无需额外修改 Collection 配置即可一键创建 Collection。

- **[复制现有 Collection](./manage-collections-console#copy-collection)**: 适合需要在当前集群中快速复制现有 Collection 的用户。

### 方法 1: 使用您自己的数据{#create-your-own-collection}

如需使用您自己的数据创建 Collection，请遵循以下步骤：

![cn-create-custom-collection](/img/cn-create-custom-collection.png)

1. 在创建 Collection 页面，定义 Collection Schema。

    <table>
       <tr>
         <th><p>配置项</p></th>
         <th><p>描述</p></th>
       </tr>
       <tr>
         <td><p>字段名称</p></td>
         <td><p>字段的名称。每个 Collection 都有唯一的主键和至少一个向量字段（最多4个）。</p><p>在默认设置中，Zilliz Cloud 保留了主字段（<code>primary_key</code>）和一个浮点向量（<code>vector</code>）。您可以根据需要自定义它们的设置。</p></td>
       </tr>
       <tr>
         <td><p>字段类型</p></td>
         <td><p>字段的数据类型。Zilliz Cloud 支持的字段主要分为以下几类：主键、向量字段和标量字段。不同字段的数据类型根据字段类型而异。</p><ul><li><p>主键: <code>INT64</code>, <code>VARCHAR</code></p></li><li><p>向量字段: <code>FLOAT_VECTOR</code>, <code>BINARY_VECTOR</code>, <code>FLOAT16_VECTOR</code>, <code>BFLOAT16_VECTOR</code>, <code>SPARSE_FLOAT_VECTOR</code>.</p></li><li><p>标量字段: <code>INT64</code>, <code>VARCHAR</code>, <code>INT8</code>, <code>INT16</code>, <code>INT32</code>, <code>FLOAT</code>, <code>DOUBLE</code>, <code>BOOL</code>, <code>JSON</code>, <code>ARRAY</code>.</p><p>详情请参见<a href="./schema-explained">了解 Schema</a>。</p></li></ul></td>
       </tr>
       <tr>
         <td><p>索引</p></td>
         <td><p>是否为字段建立索引以提高搜索性能。一旦启用，Zilliz Cloud 将为您的字段创建一个 AUTOINDEX。</p></td>
       </tr>
       <tr>
         <td><p>相似度类型</p></td>
         <td><p>用于测量向量之间相似性的度量类型。此参数仅可为向量字段配置。详情请参见<a href="./search-metrics-explained">相似度类型</a>。</p></td>
       </tr>
       <tr>
         <td><p>默认值</p></td>
         <td><p>是否为字段设置默认值。此参数仅可为标量字段配置（不包括主字段）。详情请参见 <a href="./nullable-and-default">Nullable 和默认值</a>。</p></td>
       </tr>
       <tr>
         <td><p>支持 Null 值</p></td>
         <td><p>是否允许字段为空值。此参数仅可为标量字段配置（不包括主字段）。详情请参见 <a href="./nullable-and-default">Nullable 和默认值</a>。</p></td>
       </tr>
       <tr>
         <td><p>Mmap</p></td>
         <td><p>是否启用 MMAP。此参数仅可为标量字段配置（不包括主字段）。详情请参见<a href="./use-mmap">使用 mmap</a>。</p></td>
       </tr>
       <tr>
         <td><p>描述</p></td>
         <td><p>可选。字段的描述信息。</p></td>
       </tr>
       <tr>
         <td><p>Auto ID</p></td>
         <td><p>是否为主字段启用自动 ID。一旦启用，Zilliz Cloud 会自动为主键生成唯一 ID，无需在数据插入过程中手动分配或管理它们。</p></td>
       </tr>
    </table>

1. (可选) 在**高级设置**中，您可以选择开启动态列或 Partition key。

    - **动态列:** 开启后，您可以灵活将带有新字段的 Entity 插入到 Collection 中。更多详情，请参考[Dynamic Field](./enable-dynamic-field)。

    - **Partition Key**: Partition Key 根据数据的指定键值将数据存入不同的 Partition 中。相比传统的过滤查询方式，启用该特性后可以极大地提升查询性能。更多详情，请参考[使用 Partition Key](./use-partition-key)。

1. 点击**创建 Collection**。创建完成后，您可以在 Collection 中[插入数据](./insert-entities)。

### 方法 2: 使用示例数据集{#create-sample-collection}

打开目标集群，在 Collection 页签中点击**创建示例 Collection**。 检查示例 Collection 信息，点击**创建**。

<Admonition type="info" icon="📘" title="说明">

<p>创建示例 Collection 时，Zilliz Cloud 会自动帮您完成所有 Collection 配置，您无需调整任何配置。</p>

</Admonition>

![cn-create-sample-collection](/img/cn-create-sample-collection.png)

### 方法 3：复制现有 Collection{#copy-collection}

1. 在**操作**下拉菜单中选择**复制 Collection。**

1. 设置新 Collection 名称和描述并选择复制范围。您仅可以在当前集群中复制 Collection。复制范围可以选择仅复制 Collection Schema 或同时复制 Collection Schema 和数据。

1. 点击**复制**。

    ![cn-copy-collection](/img/cn-copy-collection.png)

1. Zilliz Cloud 将生成一条复制 Collection 任务。您可前往[任务中心](./view-activities)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表复制 Collection 成功。

    <Admonition type="info" icon="📘" title="说明">

    <p>仅当您选择复制 Collection Schema 及数据时，会生成复制任务。如果您选择了仅复制 Collection Schema，Zilliz Cloud 将立刻在当前集群中创建一个相同 Schema 的 Collection，而不会生成任务。</p>

    </Admonition>

## 查看 Collections{#view-collections}

您可以查看集群中所有的 Collection。点击 Collection 名称可以查看 Collection 详情。

![cn-view-collection-list](/img/cn-view-collection-list.png)

## 加载和释放 Collection{#load-and-release-collection}

在 Zilliz Cloud 中，所有搜索和查询操作都在内存中进行。因此，您需要在搜索和查询前将 Collection 加载到内存中，也就是将 Collection 数据写入内存中。相反，如果无需搜索和查询数据，您可以从内存中释放 Collection。

![cn-load-and-release-collection](/img/cn-load-and-release-collection.png)

## 将 Collection 移动到其他 Database{#move-collection-to-another-database}

您可以将 Collection 从一个 Database 移动到另一个 Database 中。

![move-collection-to-another-database-cn](/img/move-collection-to-another-database-cn.png)

## 删除 Collection{#drop-collection}

删除 Collection 会删除与其相关的所有信息，包括插入数据、元数据和索引。该操作可以有效帮助节省资源。

<Admonition type="caution" icon="🚧" title="警告">

<p>删除操作不可逆，请谨慎执行本操作。</p>

</Admonition>

![cn-drop-collection](/img/cn-drop-collection.png)

## Collection 限制{#collection-limits}

<table>
   <tr>
     <th><p><strong>集群类型</strong></p></th>
     <th><p><strong>Collection 最大数量</strong></p></th>
     <th><p><strong>描述</strong></p></th>
   </tr>
   <tr>
     <td><p>Free</p></td>
     <td><p>5</p></td>
     <td><p>您最多可创建 5 个 Collection。</p></td>
   </tr>
   <tr>
     <td><p>Serverless</p></td>
     <td><p>100</p></td>
     <td><p>您最多可创建 100 个 Collection。</p></td>
   </tr>
   <tr>
     <td><p>Dedicated</p></td>
     <td><p>每 CU：&lt;= 64</p><p>每集群：&lt;= 4096</p></td>
     <td><p>在企业版集群中，每个计算单元（CU）可创建最多 64 个 Collection，并且集群中的 Collection 总数不能超过 4096。</p></td>
   </tr>
</table>

除了对集群中 Collection 数量的限制外，Zilliz Cloud 还有容量资源相关的限制。具体见下表。

<table>
   <tr>
     <th><p><strong>CU 数量</strong></p></th>
     <th><p><strong>容量</strong></p></th>
   </tr>
   <tr>
     <td><p>1-8 CU</p></td>
     <td><p>&lt;= 4,096</p></td>
   </tr>
   <tr>
     <td><p>12 CU 及以上</p></td>
     <td><p>Min(512 x CU 数, 65536)</p></td>
   </tr>
</table>

如需了解如何计算集群的已使用容量和通用容量，请查看[使用限制](/docs/limits#collections)。
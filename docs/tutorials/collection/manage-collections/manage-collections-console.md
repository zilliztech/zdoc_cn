---
slug: /manage-collections-console
sidebar_label: 控制台
beta: FALSE
notebook: FALSE
type: origin
token: Cy4swPPaeiZgbmkN4wUc9wAdnwd
sidebar_position: 1

---

import Admonition from '@theme/Admonition';


# 管理 Collection (控制台)

本教程将介绍如何通过 Zilliz Cloud 控制台创建和管理 Collection。您也可以通过 SDK [管理 Collection](./manage-collections-sdks)。

## 创建 Collection{#create-collection}

Zilliz Cloud 提供 3 种创建 Collection 的方式以满足不同需求。

- **[使用您自己的数据](./manage-collections-console#create-your-own-collection)**: 适合需要自定义 Collection 配置的用户。您可以根据自己的数据集或需求自定义 Collection Schema 和索引参数。

- **[使用示例数据集](./manage-collections-console#create-sample-collection)**: 适合 Zilliz Cloud 新手用户。Zilliz Cloud 提供示例数据集，并为您根据示例数据集自动定义 Schema。您无需额外修改 Collection 配置即可一键创建 Collection。

- **[复制现有 Collection](./manage-collections-console#copy-collection)**: 适合需要快速复制现有 Collection 的用户。

### 方法 1: 使用您自己的数据{#create-your-own-collection}

如需使用您自己的数据创建 Collection，请遵循以下步骤：

![cn-create-custom-collection](/img/cn-create-custom-collection.png)

1. 在创建 Collection 页面，定义 Collection Schema。

    - **Auto ID**：开启 Auto ID 后将自动生成主键列。因此导入数据时，您无需上传 ID 字段。

    - **主键字段**：可用类型为 **Int64** 或 **VarChar**。当字段类型设置为 **VarChar** 时，需要为字段指定最大长度 **Max Length**。如果启用了 **Auto ID**，则无需配置主键字段。

    - **向量字段**：collection 中的向量字段。对于已升级到 Beta 版本的 Zilliz Cloud 集群，可以向 collection 中添加一个或多个向量字段，每个 collection 最多可以有 4 个向量字段。使用多个向量字段时，可以为这些字段设置相同或不同的数据类型。例如，可以在同一个 collection 中组合使用 `FLOAT_VECTOR` 和 `BFLOAT16_VECTOR`  <sup>(Beta)</sup> 向量字段。有关向量字段类型的更多信息，请参考[相似性度量](./search-metrics-explained) 和 [AUTOINDEX](./autoindex-explained)。

        - **Dimension**：向量字段的维度值。维度值的要求因向量字段类型而异：

            - `FLOAT_VECTOR`、`FLOAT16_VECTOR` 和 `BFLOAT16_VECTOR`：维度值必须是整数，范围为 2 到 32,768。

            - `SPARSE_FLOAT_VECTOR`：不需要指定维度。

            - `BINARY_VECTOR`：维度必须是 8 的倍数，范围为 8 到 32,768 * 8。

        - **索引参数**：索引类型默认设置为 AUTOINDEX，支持的度量类型有 **Cosine**、**IP**、**L2**、**JACCARD** <sup>(Beta)</sup> 和 **HAMMING** <sup>(Beta)</sup>。详情请参见[相似性度量](./search-metrics-explained)和 [AUTOINDEX](./autoindex-explained)。

    - **其他字段**：点击 **+ 新增字段**以添加更多标量字段。更多详情，请参考 [Schema](./schema-explained)。

1. (可选) 在**高级设置**中，您可以选择开启动态列或 Partition key。

    - **动态列:** 开启后，您可以灵活将带有新字段的 Entity 插入到 Collection 中。更多详情，请参考[开启动态字段](./enable-dynamic-field)。

    - **Partition Key**: Partition Key 根据数据的指定键值将数据存入不同的 Partition 中。相比传统的过滤查询方式，启用该特性后可以极大地提升查询性能。更多详情，请参考[使用 Partition Key](./use-partition-key)。

1. 点击**创建 Collection**。创建完成后，您可以在 Collection 中[插入数据](./insert-update-delete#insert-entities)。

### 方法 2: 使用示例数据集{#create-sample-collection}

打开目标集群，在 Collection 页签中点击**创建示例 Collection**。 检查示例 Collection 信息，点击**创建**。

<Admonition type="info" icon="📘" title="说明">

<p>创建示例 Collection 时，Zilliz Cloud 会自动帮您完成所有 Collection 配置，您无需调整任何配置。</p>

</Admonition>

![cn-create-sample-collection](/img/cn-create-sample-collection.png)

### 方法 3：复制现有 Collection{#copy-collection}

该操作将复制现有 Collection 的 Schema 和索引。

在**操作**下拉菜单中选择**复制 Collection**，设置新 Collection 名称和描述，点击**创建**。

![cn-copy-collection](/img/cn-copy-collection.png)

## 查看 Collections{#view-collections}

您可以查看集群中所有的 Collection。点击 Collection 名称可以查看 Collection 详情。

![cn-view-collection-list](/img/cn-view-collection-list.png)

## 加载和释放 Collection{#load-and-release-collection}

在 Zilliz Cloud 中，所有搜索和查询操作都在内存中进行。因此，您需要在搜索和查询前将 Collection 加载到内存中，也就是将 Collection 数据写入内存中。相反，如果无需搜索和查询数据，您可以从内存中释放 Collection。

![cn-load-and-release-collection](/img/cn-load-and-release-collection.png)

## 删除 Collection{#drop-collection}

删除 Collection 会删除与其相关的所有信息，包括插入数据、元数据和索引。该操作可以有效帮助节省资源。

<Admonition type="caution" icon="🚧" title="警告">

<p>删除操作不可逆，请谨慎执行本操作。</p>

</Admonition>

![cn-drop-collection](/img/cn-drop-collection.png)

## Collection 限制{#collection-limits}

有关更多关于 collection 限制相关信息，请参阅[使用限制](./limits#collections)。
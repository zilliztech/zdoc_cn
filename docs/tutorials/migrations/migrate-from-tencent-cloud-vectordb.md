---
title: "从腾讯云向量数据库迁移至 Zilliz Cloud | Cloud"
slug: /migrate-from-tencent-cloud-vectordb
sidebar_label: "从腾讯云向量数据库迁移"
beta: FALSE
notebook: FALSE
description: "腾讯云向量数据库是一款专为相似性搜索设计的向量数据库解决方案。将数据从腾讯云向量数据库迁移到 Zilliz Cloud，可以帮助您利用 Zilliz Cloud 在向量分析和可扩展数据管理方面的增强功能。 | Cloud"
type: origin
token: WBTjw5BmvisFlLk6uGoc6q71nns
sidebar_position: 8
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 迁移
  - 腾讯云
  - vectordb

---

import Admonition from '@theme/Admonition';


# 从腾讯云向量数据库迁移至 Zilliz Cloud

[腾讯云向量数据库](https://cloud.tencent.com/product/vdb)是一款专为相似性搜索设计的向量数据库解决方案。将数据从腾讯云向量数据库迁移到 Zilliz Cloud，可以帮助您利用 Zilliz Cloud 在向量分析和可扩展数据管理方面的增强功能。

迁移过程分为以下步骤：

1. **连接数据源**：输入您的腾讯云向量数据库URL 和 API 密钥来建立连接。

1. **选择迁移源和目标集群**：

    - 选择一个或多个待迁移的源 Collection。

    - 选择一个现有的 Zilliz Cloud 集群作为目标集群。

1. **配置 Schema**：确保腾讯云向量数据库与 Zilliz Cloud 之间的字段类型正确映射。有关具体的数据映射规则，请参阅[映射规则](./migrate-from-tencent-cloud-vectordb#mapping-rules)。

![WyACwwr0XharzrbwbFScE2Dyn5f](/img/WyACwwr0XharzrbwbFScE2Dyn5f.png)

## 映射规则{#mapping-rules}

下表总结了腾讯云向量数据库字段类型如何映射到 Zilliz Cloud 字段类型，并对各类型做了详细说明。

<table>
   <tr>
     <th><p>腾讯云字段类型</p></th>
     <th><p>Zilliz Cloud 字段类型</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p>主键</p></td>
     <td><p>主键</p></td>
     <td><p>腾讯云向量数据库的主键字段会自动映射为 Zilliz Cloud 中的主键。 在数据迁移时，您可以选择启用 Auto ID 功能；但请注意，启用后源 Collection 中的原始主键值将会被舍弃。</p></td>
   </tr>
   <tr>
     <td><p>稠密向量</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>稠密向量字段会直接转换为 FLOAT_VECTOR，无需进行任何修改。</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>Dynamic field</p></td>
     <td><p>默认情况下，腾讯云向量数据库的 JSON 字段会映射为 Zilliz Cloud 中的 Dynamic Field。有关详细信息，请参阅 <a href="./enable-dynamic-field">Dynamic Field</a>。 在迁移数据时，如果您希望对某些动态字段使用固定数据类型并优化索引配置，建议将动态字段转换为固定字段。</p></td>
   </tr>
   <tr>
     <td><p>string</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>如果 JSON 中的字段类型为 string，当转换为固定字段后，该字段将变为 VARCHAR 类型。 <strong>注意：</strong>该字段的最大长度固定为 65,535 字节且不可修改，容量计算以实际字段长度为准。</p></td>
   </tr>
   <tr>
     <td><p>uint64</p></td>
     <td><p>INT32</p></td>
     <td><p>如果 JSON 中的字段类型为 uint64，当转换为固定字段后，该字段将变为 INT32 类型。</p></td>
   </tr>
   <tr>
     <td><p>double</p></td>
     <td><p>DOUBLE</p></td>
     <td><p>如果 JSON 中的字段类型为 double，当转换为固定字段后，该字段将变为 DOUBLE 类型。</p></td>
   </tr>
   <tr>
     <td><p>array</p></td>
     <td><p>ARRAY</p></td>
     <td><p>如果 JSON 中的字段类型为 array，当转换为固定字段后，该字段将变为 ARRAY 类型。</p></td>
   </tr>
</table>

## 开始前{#before-you-start}

- 源腾讯云向量数据库实例可以通过公共互联网访问。

- 如果您的网络环境配置了白名单列表，请确保将 Zilliz Cloud 的 IP 地址添加到其中。要了解更多信息，请参考 [Zilliz Cloud IP](./zilliz-cloud-ips)。

- 您已获取源集群的必要连接凭证：实例 URL 和 API 密钥。

- 已在 Zilliz Cloud 中获得组织管理员或项目管理员权限。如果您没有相关权限，请联系您的 Zilliz Cloud 管理员。

## 从腾讯云向量数据库迁移至 Zilliz Cloud{#migrate-from-tencent-cloud-vectordb-to-zilliz-cloud}

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **腾讯云向量数据库**。

    ![CpP6boj8Po7UapxWktTcTDqen8f](/img/CpP6boj8Po7UapxWktTcTDqen8f.png)

1. 在**连接数据源**步骤中，输入**实例 URL** 和 **API Key**，然后点击**下一步**。

    <Admonition type="info" icon="📘" title="说明">

    <p><a href="https://cloud.tencent.com/document/product/1709/102333">连接先决条件</a>可以指导您如何获取所需的连接信息。</p>

    </Admonition>

    ![RMNObopnToBsHZxrCFVcK3RQnNc](/img/RMNObopnToBsHZxrCFVcK3RQnNc.png)

1. 在**选择迁移来源和目标步骤**中，配置源腾讯云向量数据库和 Zilliz Cloud 集群设置，点击**下一步**。

    <Admonition type="info" icon="📘" title="说明">

    <p>每个从腾讯云向量数据库迁移的源 Collection 必须包含一个向量字段。</p>

    </Admonition>

1. 在**配置 Schema** 步骤中，设置 Zilliz Cloud 与腾讯云向量数据库之间的字段映射：

    ![M0mlbMhcgobGlLxRyDgc7XEZn1d](/img/M0mlbMhcgobGlLxRyDgc7XEZn1d.png)

    1. **确认字段映射：**

        - Zilliz Cloud 会自动检测并显示您的腾讯云向量数据库字段及其对应的目标字段。有关字段映射的详细信息，请参阅[映射规则](./migrate-from-tencent-cloud-vectordb#mapping-rules)。

        - 请确认各字段是否与相应的目标字段正确匹配。您可以根据需要重命名字段，但字段的数据类型不支持修改。

    1. **处理 JSON 字段：**

        - 腾讯云向量数据库的 JSON 字段会显示在 **Metadata** 部分，默认设置为动态字段。

            <Admonition type="info" icon="📘" title="说明">

            <p><strong>动态字段</strong>以 JSON 格式存储元数据，使数据结构更加灵活且易于扩展。详情请参阅 <a href="./enable-dynamic-field">Dynamic Field</a>。</p>
            <p><strong>固定字段</strong>在您的 Schema 中有明确的预定义结构，可用于指定特定的数据类型和索引配置。</p>

            </Admonition>

        - 若要将 JSON 中的字段转换为固定字段，请选择该字段并点击**转换为固定字段**图标。请注意，Zilliz Cloud 仅采样 100 行数据以提取 JSON 中的字段；如需添加更多字段，请点击设置图标。

        - 对于转换为固定字段的 JSON 中的字段，请配置以下属性：

            - **支持 Null 值：** 决定该字段是否可以包含 null 值，此功能默认启用。详情请参阅 [Nullable 和默认值](./nullable-and-default)。

            - **默认值：** 为该字段指定一个默认值。详情请参阅 [Nullable 和默认值](./nullable-and-default)。

            - **Partition key：** 可选择将 INT64 或 VARCHAR 字段指定为 Partition Key。注意：每个 Collection 仅支持一个 Partition Key，并且所选字段不能包含 null 值。详情请参阅[使用 Partition Key](./use-partition-key)。

    1. **（可选）调整 Shard：**

        - 点击**高级设置**以配置目标 Collection 的 Shard 数量。

        - 对于大约 1 亿行数据来说，通常只需一个 Shard 即可。

        - 如果您的数据集超过 10 亿行，请[联系我们](https://zilliz.com.cn/contact-sales)以获取最佳 Shard 配置方案。

1. 点击**迁移**。

## 查看迁移进度{#monitor-the-migration-process}

生成迁移任务后，您可前往[任务中心](/docs/job-center)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

![GBuJbTIY3oyGRDxhc2yciaEznre](/img/GBuJbTIY3oyGRDxhc2yciaEznre.png)

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


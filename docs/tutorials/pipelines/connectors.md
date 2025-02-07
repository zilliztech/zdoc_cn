---
title: "连接数据源 | Cloud"
slug: /connectors
sidebar_label: "连接数据源"
beta: FALSE
notebook: FALSE
description: "Connector 可以轻松将各种数据源连接到向量数据库。本文将介绍什么是 Connector、Connector 的作用以及如何创建和管理 Connector。 | Cloud"
type: origin
token: JAh8wlpmhiQv0lkafAxcooqQnxd
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - pipeline
  - 数据源
  - 连接

---

import Admonition from '@theme/Admonition';


# 连接数据源

Connector 可以轻松将各种数据源连接到向量数据库。本文将介绍什么是 Connector、Connector 的作用以及如何创建和管理 Connector。

<Admonition type="info" icon="📘" title="说明">

<p>Zilliz Cloud Pipelines 服务正处在逐步下线中，将于 2025 年第二季度末停止服务，被 “Data In, Data Out” 的新功能取代。该功能旨在简化 Milvus 和 Zilliz Cloud 中的向量化流程。自 2025 年 1 月 10 日起，Zilliz Cloud Pipelines 将不再接受新用户注册。现有用户可在每月 100 元人民币免费试用额度内继续使用服务直至下线日期。该服务不提供 SLA 支持。建议您使用模型提供商的Embedding API 或开源模型生成向量。</p>

</Admonition>

## Connector 是什么？{#what-is-a-connector}

Connector 用于将数据从各种数据源（包括对象存储、Kafka 等）导入到 Zilliz Cloud。以对象存储 Connector 为例，它可以监控对象存储桶中的目录，并将 PDF、HTML 等文件同步到 Zilliz Cloud Pipelines，以便后续将文件转换为向量并存储在向量数据库中用于搜索。通过 Ingestion 和 Deletion Pipelines，Zilliz Cloud 能够实时同步数据，并根据对象存储中添加或删除的文件即使更新向量数据库 Collection 中的数据。

![connector-overview-cn](/img/connector-overview-cn.png)

### Connector 的作用 {#why-use-a-connector}

- **实时数据导入**

    轻松实时导入数据并创建索引。确保最新内容立即可用于所有搜索查询。

- **灵活可扩展，可适应各种场景**

    轻松扩展您的数据 ingestion pipeline，免去繁琐的运维。Connector 可适应和无缝处理不断变化的流量负载，确保能够丝滑扩展。

- **与数据源保持同步的搜索索引**

    自动同步文档更新（添加和删除），实时更新搜索索引。此外，即将支持所有常见类型的数据源。

- **观测数据流**

    通过详细的日志获取数据流的洞察，确保透明度并检测可能出现的任何异常。

## 创建 Connector{#create-connector}

Zilliz Cloud 支持在创建过程中灵活配置 Connector。创建后， Connector 可以根据您的设置定期扫描数据源并将数据摄取至向量数据库中。

### 前提条件{#prerequisites}

- 请确保您已[创建 Collection](./manage-collections-console#create-collection)。

- 请确保您创建的 Collection 已具备配套的文档 [Ingestion](./pipelines-doc-data#create-doc-ingestion-pipeline) 和 [Deletion](./pipelines-doc-data#delete-doc-data) Pipelines。

<Admonition type="info" icon="📘" title="说明">

<p>当前，Zilliz Cloud Connector 及支持处理文档数据。</p>

</Admonition>

### 操作步骤{#procedures}

1. 选择项目。点击左侧导航栏中的 **Pipelines**。选中 **Connectors** 标签页。点击 **+ Connectors。**

    ![create-connector-cn](/img/create-connector-cn.png)

1. 连接数据源。

    1. 设置 Connector 基本信息。

        <table>
           <tr>
             <th><p><strong>参数</strong></p></th>
             <th><p><strong>描述</strong></p></th>
           </tr>
           <tr>
             <td><p>Connector 名称</p></td>
             <td><p>待创建的 Connector 的名称。</p></td>
           </tr>
           <tr>
             <td><p>描述 (可选)</p></td>
             <td><p>Connector 描述信息。</p></td>
           </tr>
        </table>

    1. 设置数据源信息。

        <table>
           <tr>
             <th><p><strong>参数</strong></p></th>
             <th><p><strong>描述</strong></p></th>
           </tr>
           <tr>
             <td><p>对象存储服务</p></td>
             <td><p>选择对象存储服务。当前，您仅可以选择：</p><ul><li>阿里云 OSS</li></ul></td>
           </tr>
           <tr>
             <td><p>URL</p></td>
             <td><p>输入数据源 URL。请确保 URL 指向文件夹而非具体某一文件。此外，不可输入根目录 URL。</p><p>了解如何<a href="https://help.aliyun.com/zh/oss/user-guide/how-to-obtain-the-url-of-a-single-object-or-the-urls-of-multiple-objects?spm=a2c4g.11186623.0.0.3eecc1f8IO4FkA">获取 URL</a>。</p></td>
           </tr>
           <tr>
             <td><p>对象存储服务访问凭证(可选)</p></td>
             <td><p>AccessKey ID 和 AccessKey Secret。</p><p>了解如何<a href="https://www.alibabacloud.com/help/zh/ram/user-guide/create-an-accesskey-pair?spm=a2c63.p38356.0.0.29bf52672SsfrM">获取AccessKey ID 和 AccessKey Secret</a>。</p></td>
           </tr>
        </table>

        点击**连接并进入下一步**。

        <Admonition type="info" icon="📘" title="说明">

        <p>点击连接并进入下一步后，Zilliz Cloud 会测试数据源连通性。连接数据源成功后方可进入下一步。</p>

        </Admonition>

        ![link-data-source-cn](/img/link-data-source-cn.png)

1. 添加目标 Pipelines。

    请先选择目标集群。然后选择目标 Collection。目标 Collection 中必须含有 1 个 Ingestion Pipeline（**只可含有 INDEX_DOC function**） 和 1个或多个 Deletion Pipelines。如果目标 Collection 中含有多个 Deletion Pipelines，请选择一个。

    <Admonition type="info" icon="📘" title="说明">

    <p>您可选择跳过此步骤，并在后续触发扫描前再添加目标 Pipelines。</p>

    </Admonition>

    ![add-target-pipelines-cn](/img/add-target-pipelines-cn.png)

1. 选择是否开启自动扫描。

    - 如不开启自动扫描，您需要在有数据更新时手动触发扫描。

    - 如开启自动扫描，Zilliz Cloud 会定期扫描数据源中的数据，并通过设置的 Ingestion 和 Deletion Pipeline 自动同步（添加或删除）数据。开启后，您需要设置自动扫描频率和运行时间。

        <table>
           <tr>
             <th><p><strong>参数</strong></p></th>
             <th><p><strong>描述</strong></p></th>
           </tr>
           <tr>
             <td><p>扫描频率</p></td>
             <td><p>设置自动扫描频率。</p><ul><li><p>每天：可选择 1～7 之间的任意整数。</p></li><li><p>每小时：可选择 1、6、12、18。</p></li></ul></td>
           </tr>
           <tr>
             <td><p>下次运行时间</p></td>
             <td><p>设置运行时间。时区与<a href="./organization-settings#manage-timezone">系统时区</a>保持一致。</p></td>
           </tr>
        </table>

        ![enable-auto-scan-cn](/img/enable-auto-scan-cn.png)

1. 点击**创建**。

## 管理 Connector {#manage-connector}

您可以通过 Zilliz Cloud Web 控制台高效管理 Connector。

### 开启或关闭 Connector{#enable-or-disable-a-connector}

1. 找到目标 Connector。

1. 点击**操作栏**下的“**...**”。

1. 选择**开启**或**关闭** Connector。

<Admonition type="info" icon="📘" title="说明">

<p>开启 Connector 前，请确保已为其添加目标 Pipelines。更多详情，请参见<a href="./connectors#create-connector">创建 Connector</a> 中的步骤 3。</p>

</Admonition>

![enable-connector-cn](/img/enable-connector-cn.png)

### 手动触发扫描{#trigger-a-manual-scan}

如未开启自动扫描功能，您可以按需手动触发扫描。

找到目标 Connector，点击**操作栏**中的“**...**”，随后点击**扫描**。

<Admonition type="info" icon="📘" title="说明">

<p>手动扫描前，请确保已开启 Connector。</p>

</Admonition>

### 编辑 Connector{#configure-a-connector}

创建 Connector 后，您可以编辑 Connector 配置。

- 修改对象存储服务密钥：

    - 阿里云对象存储 AccessKey ID 和 AccessKey Secret

- 自动扫描频率。更多详情，请参考[创建 Connector](./connectors#create-connector) 中的步骤 4。

![configure-connector-cn](/img/configure-connector-cn.png)

### 删除 Connector{#drop-a-connector}

您可以删除不再使用的 Connector。

<Admonition type="info" icon="📘" title="说明">

<p>删除 Connector 前，请先关闭 Connector。</p>

</Admonition>

![drop-connector-cn](/img/drop-connector-cn.png)

### 查看 Connector 日志{#view-connector-logs}

您可以通过查看 Connector 日志来监控 Connector 活动并排除故障。

1. 通过 Connectors 事件页面查看日志。

    ![view-connector-logs-cn](/img/view-connector-logs-cn.png)

1. 如果 Connector 状态显示为`异常`，则代表 Connector 运行出错。点击状态旁的 “？”查看详细报错信息。

### 查看 Pipeline 关联的所有 Connectors{#view-related-connectors-in-a-pipeline}

如需查看某一 Pipeline 下关联的所有 Connectors，请参阅[查看 Pipeline 详情](./pipelines-text-data#view-pipeline)。
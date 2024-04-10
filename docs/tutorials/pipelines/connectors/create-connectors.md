---
slug: /create-connectors
beta: FALSE
notebook: FALSE
type: origin
token: UsfSw8xJOiXm5PkWASWcVo7Knff
sidebar_position: 2
---

import Admonition from '@theme/Admonition';


# 创建 Connector

使用 Connector 后，您可以轻松将各种来源的数据通过 Pipelines 无缝导入到 Zilliz Cloud 向量数据库 Collection 中。本文介绍如何通过 Zilliz Cloud Web 控制台轻松创建并设置 Connectors。

## 前提条件{#prerequisites}

- 请确保您已[创建 Collection](./create-collection)。

- 请确保您创建的 Collection 已具备配套的 [Ingestion](./create-ingestion-pipelines) 和 [Deletion](./create-deletion-pipelines) Pipelines。

## 操作步骤{#procedures}

1. 选择项目。点击左侧导航栏中的 **Pipelines**。选中 **Connectors** 标签页。点击 **+ Connectors。**

    ![create-connector-cn](/img/create-connector-cn.png)

1. 连接数据源。

    1. 设置 Connector 基本信息。

        |  **参数**       |  **描述**              |
        | ------------- | -------------------- |
        |  Connector 名称 |  待创建的 Connector 的名称。 |
        |  描述 (可选)      |  Connector 描述信息。     |

    1. 设置数据源信息。

        |  **参数**         |  **描述**                                                                                                                                                                                                           |
        | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        |  对象存储服务         |  选择对象存储服务。当前，您仅可以选择：<br/> - 阿里云 OSS<br/>                                                                                                                                                                    |
        |  URL            |  输入数据源 URL。请确保 URL 指向文件夹而非具体某一文件。<br/> 了解如何[获取 URL](https://help.aliyun.com/zh/oss/user-guide/how-to-obtain-the-url-of-a-single-object-or-the-urls-of-multiple-objects?spm=a2c4g.11186623.0.0.3eecc1f8IO4FkA)。 |
        |  对象存储服务访问凭证(可选) |  AccessKey ID 和 AccessKey Secret。<br/> 了解如何[获取AccessKey ID 和 AccessKey Secret](https://www.alibabacloud.com/help/zh/ram/user-guide/create-an-accesskey-pair?spm=a2c63.p38356.0.0.29bf52672SsfrM)。              |

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

        |  **参数** |  **描述**                                                                        |
        | ------- | ------------------------------------------------------------------------------ |
        |  扫描频率   |   设置自动扫描频率。<br/> - 每天：可选择 1～7 之间的任意整数。<br/> - 每小时：可选择 1、6、12、18。<br/> |
        |  下次运行时间 |  设置运行时间。时区与[系统时区](./manage-timezone)保持一致。                                      |

        ![enable-auto-scan-cn](/img/enable-auto-scan-cn.png)

1. 点击**创建**。


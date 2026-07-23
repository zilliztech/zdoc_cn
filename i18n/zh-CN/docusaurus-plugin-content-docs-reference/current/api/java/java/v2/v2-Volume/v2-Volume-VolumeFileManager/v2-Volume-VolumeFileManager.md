---
title: "VolumeFileManager | Java | v2"
slug: /java/java/v2-Volume-VolumeFileManager
sidebar_label: "VolumeFileManager"
beta: false
added_since: false
last_modified: false
deprecate_since: false
notebook: false
description: "`VolumeFileManager` 实例会维护与 Zilliz Cloud 的 Volume 服务中特定 volume 的连接。在将数据文件上传到 volume 之前，你需要初始化一个 `VolumeFileManager` 实例。 | Java | v2"
type: docx
token: DK7ZdxRCyoepyxx0odzcH66xnu3
sidebar_position: 2
keywords: 
  - 开源 vector db
  - vector database 示例
  - rag vector database
  - 什么是 vector db
  - zilliz
  - zilliz cloud
  - cloud
  - VolumeFileManager
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# VolumeFileManager

`VolumeFileManager` 实例会维护与 Zilliz Cloud 的 Volume 服务中特定 volume 的连接。在将数据文件上传到 volume 之前，你需要初始化一个 `VolumeFileManager` 实例。

```java
io.milvus.bulkwriter.VolumeFileManager
```

<Admonition type="info" icon="📘" title="说明">

volume 是一个中间存储位置，你可以在其中保存数据以便进一步处理，例如数据合并、迁移或导入。详情请参阅 [Volume](/docs/volume)。

</Admonition>

## 构造函数\{#constructor}

此构造函数会初始化一个新的 `VolumeFileManager` 实例，用于维护与 Zilliz Cloud 的 Volume 服务中特定 volume 的连接。

```java
VolumeFileManager(
    VolumeFileManager.newBuilder()
        .withCloudEndpoint(String cloudEndpoint)
        .withApiKey(String apiKey)
        .withVolumeName(String volumeName)
        .build();
)
```

**参数：**

- **cloudEndpoint** (*str*) -

    **[必填]**

    Zilliz Cloud endpoint，即 `https://api.cloud.zilliz.com`。

- **apiKey** (*str*) -

    **[必填]**

    你的 Zilliz Cloud API key，需具备足够权限以管理 Zilliz Cloud Control Plane 上的 volume。要获取 Zilliz Cloud API key，请按照 [API Keys](/docs/manage-api-keys) 中的步骤操作。

- **volumeName** (*str*) -

    **[必填]**

    此操作的目标 volume 的名称。

**返回类型：**

`VolumeFileManager`

**返回：**

一个 `VolumeFileManager` 实例。

## 示例\{#examples}

```java
import io.milvus.bulkwriter.VolumeFileManager;
import io.milvus.bulkwriter.VolumeFileManagerParam;

VolumeFileManagerParam volumeFileManagerParam = VolumeFileManagerParam.newBuilder()
    .withCloudEndpoint("https://api.cloud.zilliz.com")
    .withApiKey("YOUR_API_KEY")
    .withVolumeName("my_volume")
    .build();

VolumeFileManager volumeFileManager = new VolumeFileManager(volumeFileManagerParam);
```


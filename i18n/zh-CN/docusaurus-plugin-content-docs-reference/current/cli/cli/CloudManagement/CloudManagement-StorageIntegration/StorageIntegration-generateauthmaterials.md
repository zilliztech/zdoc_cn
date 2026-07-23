---
title: "generate-auth-materials | Cloud"
slug: /cli/cli/StorageIntegration-generateauthmaterials
sidebar_label: "generate-auth-materials"
beta: false
added_since: v1.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作为存储集成生成授权材料。使用它可在完成外部存储访问配置之前获取云端所需的凭证材料。 | Cloud"
type: docx
token: Wa4Bd7HvNont3WxgFNxcteFqn6g
sidebar_position: 4
keywords: 
  - 什么是非结构化数据
  - Vector embeddings
  - Vector store
  - 开源 vector database
  - zilliz
  - zilliz cloud
  - cloud
  - generate-auth-materials
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# generate-auth-materials

此操作为存储集成生成授权材料。使用它可在完成外部存储访问配置之前获取云端所需的凭证材料。

## 概要\{#synopsis}

```bash
zilliz storage-integration generate-auth-materials --bucket-name <string> [OPTIONS]
```

**选项：**

- **--bucket-name** (*string*) -

    **[必需]**

    指定外部 bucket 或容器名称。

- **--project-id** (*string*) -

    指定 project ID。

- **--region-id** (*string*) -

    指定云区域，例如 `aws-us-east-1`。

- **--body** (*path*) -

    指定 JSON body 文件，例如 `file://authorization-materials.json`。

## 示例\{#example}

```bash
zilliz storage-integration generate-auth-materials --bucket-name my-bucket --region-id aws-us-east-1
```

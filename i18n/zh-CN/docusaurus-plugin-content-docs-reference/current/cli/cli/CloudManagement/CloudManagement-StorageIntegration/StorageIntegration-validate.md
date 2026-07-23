---
title: "validate | Cloud"
slug: /cli/cli/StorageIntegration-validate
sidebar_label: "validate"
beta: false
added_since: v1.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于在创建集成之前或之后验证外部存储集成配置。 | Cloud"
type: docx
token: UCq8dJomCoUqZixRiXsczdtqnfg
sidebar_position: 6
keywords: 
  - 余弦距离
  - 什么是向量数据库
  - vectordb
  - 多模态向量数据库检索
  - zilliz
  - zilliz cloud
  - cloud
  - validate
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# validate

此操作用于在创建集成之前或之后验证外部存储集成配置。

## 概要\{#synopsis}

```bash
zilliz storage-integration validate --bucket-name <string> [OPTIONS]
```

**OPTIONS:**

- **--bucket-name** (*string*) -

    **[必需]**

    指定要验证的外部 bucket 或 container 名称。

- **--project-id** (*string*) -

    指定项目 ID。

- **--region-id** (*string*) -

    指定云区域，例如 `aws-us-east-1`。

- **--role-arn** (*string*) -

    指定 AWS IAM role ARN。

- **--external-id** (*string*) -

    指定 AWS external ID。此值会从本地命令历史记录中隐藏。

- **--account-name** (*string*) -

    指定 Azure storage account 名称。

- **--client-id** (*string*) -

    指定 Azure client ID。

- **--tenant-id** (*string*) -

    指定 Azure tenant ID。

- **--gcp-project-id** (*string*) -

    指定 GCP project ID。

- **--service-account-email** (*string*) -

    指定 GCP service account email。

- **--body** (*path*) -

    当扁平参数不足以满足需求时，指定 JSON body 文件，例如 `file://integration.json`。

## 示例\{#example}

```bash
zilliz storage-integration validate --bucket-name my-bucket --region-id aws-us-east-1 --role-arn arn:aws:iam::123456789012:role/my-role --external-id ext-1
```

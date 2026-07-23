---
title: "delete | Cloud"
slug: /cli/cli/PrivateLink-delete
sidebar_label: "delete"
beta: false
added_since: v1.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会删除 PrivateLink 端点。 | Cloud"
type: docx
token: JYr4dveljoLs84xSAXJclFSkn8d
sidebar_position: 3
keywords: 
  - AI 幻觉
  - AI Agent
  - 语义搜索
  - 异常检测
  - zilliz
  - zilliz cloud
  - cloud
  - delete
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# delete

此操作会删除 PrivateLink 端点。

## 用法\{#usage}

```bash
zilliz privatelink delete [OPTIONS]
```

**OPTIONS:**

- **--project-id** (*string*) -

    **[REQUIRED]**

    项目 ID。

- **--endpoint-id** (*string*) -

    **[REQUIRED]**

    要删除的端点 ID。

## 示例\{#example}

```bash
zilliz privatelink delete --project-id proj-xxxx --endpoint-id vpce-xxxx
```

---
displayed_sidbar: restfulSidebar
slug: /restful-versioning
title: RESTful API 版本控制
description: 本页介绍 Zilliz Cloud RESTful API 使用的版本控制方案。
beta: FALSE
notebook: FALSE
sidebar_label: API 版本控制
sidebar_position: 0
---

import Admonition from '@theme/Admonition';

# RESTful API 版本控制

Zilliz Cloud RESTful API 提供多个版本，以保证 API 的稳定性和兼容性。

版本控制采用 URL 路径版本控制方案，即版本号包含在 URL 路径中。

例如，可以使用以下 URL 访问用于列出所有可用云的 API endpoint 的 V2 版本：

```
https://api.cloud.zilliz.com.cn/v2/clouds
```

也可以使用以下 URL 访问用于创建新 collection 的 API endpoint 的 V2 版本：

```
https://${CLUSTER_ENDPOINT}/v2/vectordb/collections/create
```

建议你使用这些 API endpoint 的 **V2 版本**，后续新功能和改进将添加到 V2 版本中。V1 版本即将弃用。

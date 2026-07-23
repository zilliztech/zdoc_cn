---
title: "User | Go | v2"
slug: /go/go/v2-Authentication-User
sidebar_label: "User"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "表示由 DescribeUser 返回的用户及其分配的角色。| Go | v2"
type: docx
token: FCnndgcaworiHGxozvocjrZonIj
sidebar_position: 26
keywords: 
  - milvus lite
  - milvus benchmark
  - managed milvus
  - Serverless vector database
  - zilliz
  - zilliz cloud
  - cloud
  - User
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# User

表示由 DescribeUser 返回的用户及其分配的角色。

```go
type User struct {
    UserName string
    Roles []string
}
```

**字段：**

- **UserName** (*string*)

    用户的名称。

- **Roles** (*[]string*)

    已分配角色的列表。

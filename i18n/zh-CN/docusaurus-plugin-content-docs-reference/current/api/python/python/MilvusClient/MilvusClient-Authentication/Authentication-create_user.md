---
title: "create_user() | Python | MilvusClient"
slug: /python/python/Authentication-create_user
sidebar_label: "create_user()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "添加可选描述。异步变体共享同步方法的参数和响应约定。| Python | MilvusClient"
type: docx
token: EglSdm1jkozDSlxq6SEc4CRonVe
sidebar_position: 4
keywords: 
  - 句子转换器
  - 推荐系统
  - 信息检索
  - 降维
  - Zilliz
  - Zilliz Cloud
  - 云
  - create_user()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# create_user()

添加可选描述。异步变体共享同步方法的参数和响应约定。

## 请求语法\{#request-syntax}

```python
create_user(
    user_name: str,
    password: str,
    timeout: Optional[float] = None,
    description: Optional[str] = None,
    **kwargs,
) -> None
```

**参数：**

- **user_name** (*str*) -
**[必填]**
要创建的用户账户名称。

- **password** (*str*) -
**[必填]**
新用户账户的密码。

- **timeout** (*Optional[float]*) -
默认值：`None`
等待 RPC 完成的最长时间（以秒为单位）。

- **description** (*Optional[str]*) -
默认值：`None`
用户账户的可选描述。

- **kwargs** (*Any*) -
其他请求上下文选项。

**返回类型：**

*None*

**返回：**

用户成功创建后不返回任何值。

**异常：**

- **MilvusException**
当服务器拒绝请求或 RPC 失败时抛出。请查看服务器错误消息以获取确切的失败详情。

## 示例\{#examples}

演示 create user 的用法。

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT", token="YOUR_CLUSTER_TOKEN")
client.create_user("analyst", "Milvus123", description="Analytics account")
client.update_user("analyst", description="Updated analytics account")
client.create_role("read_only", description="Read-only role")
client.alter_role("read_only", description="Updated read-only role")
print(client.describe_user("analyst"))
print(client.describe_role("read_only"))
```

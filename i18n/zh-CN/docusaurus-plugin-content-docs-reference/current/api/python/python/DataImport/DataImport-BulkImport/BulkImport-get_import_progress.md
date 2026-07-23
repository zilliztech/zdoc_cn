---
title: "get_import_progress() | Python"
slug: /python/python/BulkImport-get_import_progress
sidebar_label: "get_import_progress()"
beta: false
added_since: Inherit
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "添加 projectid、regionid、dbname 和 DB-Name 请求头行为。 | Python"
type: docx
token: CNQIdgQvXoux0KxpXHxca8EMnjg
sidebar_position: 2
keywords: 
  - Vector embeddings
  - Vector store
  - 开源 vector database
  - Vector index
  - zilliz
  - zilliz cloud
  - cloud
  - get_import_progress()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# get_import_progress()

添加 project_id、region_id、db_name 和 DB-Name 请求头行为。

## 请求语法\{#request-syntax}

```python
# include-start milvus
get_import_progress(
    url: str,
    job_id: str,
    api_key: str = "",
    db_name: str = "",
    verify: Optional[Union[bool, str]] = True,
    cert: Optional[Union[str, tuple]] = None,
    **kwargs,
) -> requests.Response
# include-end
# include-start zilliz
get_import_progress(
    url: str,
    job_id: str,
    cluster_id: str = "",
    project_id: str = "",
    region_id: str = "",
    api_key: str = "",
    db_name: str = "",
    verify: Optional[Union[bool, str]] = True,
    cert: Optional[Union[str, tuple]] = None,
    **kwargs,
) -> requests.Response
# include-end
```

**参数：**

- **url** (*str*) -
**[必填]**

    Zilliz Cloud API 服务器端点，即 `https://api.cloud.zilliz.com`。

- **job_id** (*str*) -
**[必填]**
要检查的导入任务 ID。

- **cluster_id** (*str*) -
默认值：`""`
目标 Zilliz Cloud 集群的 ID。

- **project_id** (*str*) -
默认值：`""`
包含目标项目数据库的 Zilliz Cloud 项目的 ID。

- **region_id** (*str*) -
默认值：`""`
包含目标项目数据库的 Zilliz Cloud 区域的 ID。

- **api_key** (*str*) -
默认值：`""`

    用于对请求进行身份验证的 Zilliz Cloud API 密钥。

- **db_name** (*str*) -
默认值：`""`
在 `DB-Name` 请求头中发送的数据库名称，用于基于角色的访问控制。

- **verify** (*Optional[Union[bool, str]]*) -
默认值：`True`
TLS 验证设置。使用 `True` 通过默认信任存储进行验证，或提供 CA 证书路径。

- **cert** (*Optional[Union[str, tuple]]*) -
默认值：`None`
客户端证书路径，或用于双向 TLS 的证书和私钥对。

- **kwargs** (*Any*) -
转发给 HTTP 请求的其他选项。

**返回类型：**

*requests.Response*

**返回：**

包含当前批量导入任务状态和进度的 HTTP 响应。

**异常：**

- **MilvusException**
当服务器拒绝请求或 RPC 失败时抛出。请查看服务器错误消息以获取确切的失败详情。

## 示例\{#examples}

该示例从 Zilliz Cloud 检索导入进度。

```python
# include-start milvus
from pymilvus.bulk_writer import get_import_progress

response = get_import_progress(
    url="YOUR_CLUSTER_ENDPOINT",
    api_key="YOUR_CLUSTER_TOKEN",
    job_id="job-123",
)
print(response.json())
# include-end
# include-start zilliz
from pymilvus.bulk_writer import get_import_progress

response = get_import_progress(
    url="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY",
    project_id="proj-xxxx",
    region_id="aws-us-west-2",
    job_id="job-123",
)
print(response.json())
# include-end
```

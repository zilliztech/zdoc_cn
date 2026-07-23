---
title: "list_import_jobs() | Python"
slug: /python/python/BulkImport-list_import_jobs
sidebar_label: "list_import_jobs()"
beta: false
added_since: Inherit
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "增加 projectid 和 regionid 过滤。| Python"
type: docx
token: N13hd7jVjoA6B1xlgwic2GKRn5f
sidebar_position: 3
keywords: 
  - 问答系统
  - llm-as-a-judge
  - hybrid vector search
  - 视频去重
  - zilliz
  - zilliz cloud
  - cloud
  - list_import_jobs()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# list_import_jobs()

增加 project_id 和 region_id 过滤。

## 请求语法\{#request-syntax}

```python
# include-start milvus
list_import_jobs(
    url: str,
    collection_name: str = "",
    db_name: str = "",
    api_key: str = "",
    page_size: int = 10,
    current_page: int = 1,
    verify: Optional[Union[bool, str]] = True,
    cert: Optional[Union[str, tuple]] = None,
    **kwargs,
) -> requests.Response
# include-end
# include-start zilliz
list_import_jobs(
    url: str,
    collection_name: str = "",
    db_name: str = "",
    cluster_id: str = "",
    project_id: str = "",
    region_id: str = "",
    api_key: str = "",
    page_size: int = 10,
    current_page: int = 1,
    verify: Optional[Union[bool, str]] = True,
    cert: Optional[Union[str, tuple]] = None,
    **kwargs,
) -> requests.Response
# include-end
```

**参数：**

- **url** (*str*) -
**[必需]**

    Zilliz Cloud API 服务器端点，即 `https://api.cloud.zilliz.com`。

- **collection_name** (*str*) -
默认值：`""`
要列出其导入任务的 Collection 名称。

- **db_name** (*str*) -
默认值：`""`
要列出其导入任务的数据库名称。

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

- **page_size** (*int*) -
默认值：`10`
每页返回的最大导入任务数。

- **current_page** (*int*) -
默认值：`1`
要返回的从 1 开始的页码。

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

包含匹配的导入任务和分页信息的 HTTP 响应。

**异常：**

- **MilvusException**
当服务器拒绝请求或 RPC 失败时抛出。请查看服务器错误消息以获取确切的失败详情。

## 示例\{#examples}

该示例列出 Zilliz Cloud 中的导入任务。

```python
# include-start milvus
from pymilvus.bulk_writer import list_import_jobs

response = list_import_jobs(
    url="YOUR_CLUSTER_ENDPOINT",
    api_key="YOUR_CLUSTER_TOKEN",
    collection_name="book_chunks",
)
print(response.json())
# include-end
# include-start zilliz
from pymilvus.bulk_writer import list_import_jobs

response = list_import_jobs(
    url="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY",
    project_id="proj-xxxx",
    region_id="aws-us-west-2",
)
print(response.json())
# include-end
```

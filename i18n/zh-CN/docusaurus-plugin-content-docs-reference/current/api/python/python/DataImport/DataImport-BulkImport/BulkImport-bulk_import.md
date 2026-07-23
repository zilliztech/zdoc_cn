---
title: "bulk_import() | Python"
slug: /python/python/BulkImport-bulk_import
sidebar_label: "bulk_import()"
beta: false
added_since: Inherit
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "添加 projectid/regionid 路由和项目数据库导入行为。| Python"
type: docx
token: HVwRdVSbAo2jUexpxmdczdqPnzh
sidebar_position: 1
keywords: 
  - 什么是 vector embeddings
  - vector database 教程
  - vector database 如何工作
  - vector db 对比
  - zilliz
  - zilliz cloud
  - cloud
  - bulk_import()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# bulk_import()

添加 project_id/region_id 路由和项目数据库导入行为。

## 请求语法\{#request-syntax}

```python
# include-start milvus
bulk_import(
    url: str,
    collection_name: str,
    db_name: str = "",
    files: Optional[List[List[str]]] = None,
    api_key: str = "",
    verify: Optional[Union[bool, str]] = True,
    cert: Optional[Union[str, tuple]] = None,
    **kwargs,
) -> requests.Response
# include-end
# include-start zilliz
bulk_import(
    url: str,
    collection_name: str,
    db_name: str = "",
    object_url: str = "",
    object_urls: Optional[List[List[str]]] = None,
    cluster_id: str = "",
    project_id: str = "",
    region_id: str = "",
    api_key: str = "",
    access_key: str = "",
    secret_key: str = "",
    token: str = "",
    volume_name: str = "",
    data_paths: Optional[List[List[str]]] = None,
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
**[必需]**
目标 collection 的名称。

- **db_name** (*str*) -
默认值：`""`
目标数据库的名称。

- **object_url** (*str*) -
默认值：`""`
已弃用的对象存储 URL。对于新的 Zilliz Cloud 集成，请使用 `object_urls`。

- **object_urls** (*Optional[List[List[str]]]*) -
默认值：`None`
包含导入数据的对象存储 URL。每个嵌套列表标识一个对象或文件夹。

- **cluster_id** (*str*) -
默认值：`""`
目标 Zilliz Cloud cluster 的 ID。

- **project_id** (*str*) -
默认值：`""`
包含目标项目数据库的 Zilliz Cloud 项目的 ID。

- **region_id** (*str*) -
默认值：`""`
包含目标项目数据库的 Zilliz Cloud 区域的 ID。

- **api_key** (*str*) -
默认值：`""`

    用于对请求进行身份验证的 Zilliz Cloud API key。

- **access_key** (*str*) -
默认值：`""`
Zilliz Cloud 使用的对象存储凭证的访问密钥。

- **secret_key** (*str*) -
默认值：`""`
Zilliz Cloud 使用的对象存储凭证的秘密密钥。

- **token** (*str*) -
默认值：`""`
Zilliz Cloud 使用的临时对象存储凭证的会话令牌。

- **volume_name** (*str*) -
默认值：`""`
包含导入数据的 Zilliz Cloud volume 的名称。

- **data_paths** (*Optional[List[List[str]]]*) -
默认值：`None`
Zilliz Cloud volume 中包含导入数据的路径。

- **verify** (*Optional[Union[bool, str]]*) -
默认值：`True`
TLS 验证设置。使用 `True` 通过默认信任存储进行验证，或提供 CA 证书路径。

- **cert** (*Optional[Union[str, tuple]]*) -
默认值：`None`
客户端证书路径，或用于双向 TLS 的证书和私钥对。

- **kwargs** (*Any*) -
转发到 HTTP 请求的其他选项。

**返回类型：**

*requests.Response*

**返回：**

bulk-import 端点返回的 HTTP 响应。检查 JSON 负载以获取已提交的作业标识符。

**异常：**

- **MilvusException**
当服务器拒绝请求或 RPC 失败时抛出。请检查服务器错误消息以获取准确的失败详情。

## 示例\{#examples}

该示例将对象存储数据提交到 Zilliz Cloud。

```python
# include-start milvus
from pymilvus.bulk_writer import bulk_import

response = bulk_import(
    url="YOUR_CLUSTER_ENDPOINT",
    api_key="YOUR_CLUSTER_TOKEN",
    collection_name="book_chunks",
    files=[["./data/part-0001.parquet"]],
)
print(response.json())
# include-end
# include-start zilliz
from pymilvus.bulk_writer import bulk_import

response = bulk_import(
    url="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY",
    project_id="proj-xxxx",
    region_id="aws-us-west-2",
    collection_name="book_chunks",
    object_urls=[["s3://bucket/books/part-0001.parquet"]],
)
print(response.json())
# include-end
```

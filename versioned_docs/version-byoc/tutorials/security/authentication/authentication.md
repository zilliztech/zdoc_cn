---
title: "用户鉴权 | BYOC"
slug: /authentication
sidebar_key: authentication
sidebar_label: "用户鉴权"
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
beta: FALSE
notebook: FALSE
description: "本章将介绍帐户、鉴权、访问白名单和私网连接的相关内容。您可以使用这些功能保障您的数据安全。 | BYOC"
type: origin
token: ZdQxwDlFbiPLCNkXISXcyqtBn3r
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 鉴权
  - 用户

---

import Admonition from '@theme/Admonition';


# 用户鉴权

本章将介绍帐户、鉴权、访问白名单和私网连接的相关内容。您可以使用这些功能保障您的数据安全。

在 BYOC 项目中，API 密钥仅用于平台 API （控制面）请求。对于数据面访问（即 Milvus 相关操作），请使用集群鉴权凭据（`username:password`)。API 密钥不适用于 BYOC 项目中 Milvus SDK 或客户端连接。



import DocCardList from '@theme/DocCardList';

<DocCardList />
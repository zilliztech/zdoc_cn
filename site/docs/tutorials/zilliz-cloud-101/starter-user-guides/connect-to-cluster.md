---
slug: /connect-to-cluster
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 连接集群

本文介绍如何连接到 Zilliz Cloud 集群。

## 开始前 {#before-commencing}

请确保已完成以下步骤：

- 已注册 Zilliz Cloud 账户。详情请参见[注册账号](./register-with-zilliz-cloud)。

- 已创建集群。详情请参见[创建集群](./create-cluster)。

- 已获取集群的用户名和密码。详情请参见[管理身份凭证](./manage-cluster-credentials)。

- 已安装合适版本的 Milvus SDK。详情请参见[安装 SDK](./install-sdks)。

- 阅读本指南系列时，建议下载[代码示例](https://assets.zilliz.com/zdoc/zilliz_cloud_sdk_examples.zip)。

## 操作步骤 {#steps}

您可以通过公网地址和创建集群时指定的用户名和密码连接到集群。

<Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "NodeJS", "value": "javascript"}]}>
<TabItem value='python'>

```python
# 初始化 MilvusClient 实例
# 替换为实际的公网地址和用户名密码
from pymilvus import MilvusClient

client = MilvusClient(
        uri="<PUBLIC_ENDPOINT>", # 从控制台获取的集群公网地址
        token="<USER:PASSWORD>" # 创建集群时指定的用户名和密码
        # 也可以使用旧连接方式 `user` 和 `password` 来替代 `token`：
        # user='',
        # password='' 
)
```

</TabItem>

<TabItem value='javascript'>

```javascript
const { MilvusClient } = require("@zilliz/milvus2-sdk-node")

const address = "<PUBLIC_ENDPOINT>";
const token = "<USER:PASSWORD>";

const client = new MilvusClient({ address, token });
```

</TabItem>
</Tabs>

## 相关文档 {#related-doc}

- [创建 Collection](./create-collection-2)

- [删除 Collection](./drop-collection-1)

- [插入 Entity](./insert-entities)

- [向量搜索和查询](./search-and-query)


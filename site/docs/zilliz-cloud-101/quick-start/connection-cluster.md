---
sidebar_position: 1
---

# 连接集群

本文介绍如何连接到 Zilliz Cloud 集群。

## 开始前

请确保已完成以下步骤：

- 已注册 Zilliz Cloud 账户。详情请参见[注册账号](https://zilliverse.feishu.cn/wiki/CCVpw6BVti8P8LkfcdJcdRH1nHg)。

- 已创建集群。详情请参见[创建集群](https://zilliverse.feishu.cn/wiki/MAFcwBTqqiR5YZkdkd4cADg0nub)。

- 已获取集群的用户名和密码。详情请参见[管理身份凭证](https://zilliverse.feishu.cn/wiki/VNWiwtYwGi9m0Okhj3Zce8wAnte)。

- 已安装合适版本的 Milvus SDK。详情请参见[安装 SDK](https://zilliverse.feishu.cn/wiki/Jo4bwNi6zi4zlHkN2bWcewFYnDc)。

- 阅读本指南系列时，建议下载[代码示例](https://assets.zilliz.com/zdoc/zilliz_cloud_sdk_examples.zip)。

## 操作步骤

您可以通过公网地址和创建集群时指定的用户名和密码连接到集群。

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

```javascript
const { MilvusClient } = require("@zilliz/milvus2-sdk-node")

const address = "<PUBLIC_ENDPOINT>";
const token = "<USER:PASSWORD>";

const client = new MilvusClient({ address, token });
```

## 相关文档

- [创建 Collection](https://zilliverse.feishu.cn/wiki/MNcZwAfV6iZxbckfKBlcmCzanti)

- [删除 Collection](https://zilliverse.feishu.cn/wiki/FrMbwwoTwiqJO4kofPkcndsAnoh)

- [插入 Entity](https://zilliverse.feishu.cn/wiki/Am0bwdNmliIZ9OkUB2DcdkOBnAe)

- [向量搜索和查询](https://zilliverse.feishu.cn/wiki/SPaWwHEVuipu3bkeg17coFgnnUo)


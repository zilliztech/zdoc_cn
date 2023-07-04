---
slug: /manage-cluster-credentials
sidebar_position: 1
---

# 管理身份凭证

与 Zilliz Cloud 交互时，您需要提供身份凭证以验证身份。身份凭证由用户名及对应的密码组成。Zilliz Cloud 根据身份凭证来验证您的请求并授权。

连接 Zilliz Cloud 集群时，您必须提供具有访问权限的用户名和对应密码。如果您的身份凭证显示您无权限连接集群，Zilliz Cloud 则会拒绝您的访问请求。

创建集群时，Zilliz Cloud 会自动创建一个名为 **db_admin** 的默认用户，您需要为该默认用户输入一个初始密码。用户 **db_admin** 被授予 **admin** 权限，表示该用户有权访问集群级别的所有资源和执行所有操作。

本教程将介绍如何管理集群身份凭证。

## 前提条件 {#prerequisites}

开始前，请先确保：

- 您已注册 Zilliz Cloud。如未注册，请先阅读[注册账号](./register-with-zilliz-cloud) 并完成注册。

- 您是组织或项目管理员。更多用户角色和权限详情，请阅读[角色与权限](./roles-privileges) 。

- 项目中已创建 集群。更多创建集群详情，请阅读[创建集群](./create-cluster) 。

## 在 Zilliz Cloud 界面管理身份凭证 {#manage-your-credentials-in-the-zilliz-cloud-interface}

执行以步骤以在 Zilliz Cloud 界面管理身份凭证：

1. 登录 [Zilliz Cloud 界面](https://cloud.zilliz.com.cn/login)。

1. 点击进入您想要管理身份凭证的组织和项目。

1. 在项目页的左侧导航栏中，点击**集群**。左侧出现二级导航树。

1. 点击目标集群的名称以查看其详细信息。

1. 在**用户**选项卡上，执行以下操作以管理用户和身份凭据： 
  - 添加用户

  - 我们建议您记录用户名和密码，因为您需要使用它们连接集群。
    1. 单击右上角的 **+ 用户**。

    1. 在**添加用户**对话框中，输入**用户名**和**密码**，然后点击**添加**。

    ![create_user](/img/create_user.png)

  - 重置用户密码
    1. 在用户列表中，找到需要重置密码的用户。

    1. 点击**操作**列中的**…**图标，然后从下拉列表中选择**重置密码**。

    1. 在**重置密码**对话框中，输入**当前密码**、**新密码**和**确认新密码**，然后点击**确认**。

  - 删除用户

  - 用户一旦删除后，该用户及其关联数据将被永久删除。删除操作不可逆。在确认删除前，请先确保已备份您的数据。
    1. 在用户列表中，找到要删除的用户。

    1. 点击**操作**列中的**…**图标，然后从下拉列表中选择**删除**。

    1. 在弹出的对话框中输入用户名以确认删除该用户。

## 使用身份凭证连接集群 {#connecting-clusters-with-identity-credentials}

集群用户新建成功后，可以使用其用户名和密码连接集群。

以下示例中，已在集群中新建用户 `user1`，其密码为 `milvus@123`。以下代码说明如何作为`user1` 连接集群：

```python
from pymilvus import connections

connections.connect(
  alias="default",
  uri='', # 从 Zilliz Cloud 界面获取的公共端点
  secure=True,
  user='user1', # 用户名
  password='milvus@123' # 密码
)
```

## 文档推荐 {#recommended-documents}

- [设置白名单](./set-up-whitelist) 


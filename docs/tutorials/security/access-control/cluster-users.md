---
title: "管理集群用户（控制台） | Cloud"
slug: /cluster-users
sidebar_label: "管理集群用户（控制台）"
beta: FALSE
notebook: FALSE
description: "在 Zilliz Cloud 中，您可以创建集群用户并为其分配集群角色以定义权限，从而实现数据安全。 | Cloud"
type: origin
token: KKSvwII0Ni7CQ7khuiBcU1gYnQc
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 安全
  - 访问控制
  - 集群用户
  - rbac
  - cluster users
  - db_admin

---

import Admonition from '@theme/Admonition';


# 管理集群用户（控制台）

在 Zilliz Cloud 中，您可以创建集群用户并为其分配集群角色以定义权限，从而实现数据安全。 

在创建集群时，会自动生成一个名为 `db_admin` 的默认用户，该用户不可删除。除了这个默认用户之外，您还可以创建更多的集群用户以实现更精细的访问控制。 

如需管理集群用户，您的角色必须为**组织管理员**、**项目管理员**或拥有 **Cluster_Admin** 权限的角色。

<Admonition type="info" icon="📘" title="说明">

<p>此功能仅限 Dedicated 集群使用。</p>

</Admonition>

## 创建集群用户{#create-a-cluster-user}

创建集群用户时，您需要配置以下信息：

- 输入用户的用户名

- 授予该用户内置角色或自定义角色。有关角色的详细信息，请参考[管理集群角色（控制台）](./cluster-roles)。

- 为该用户设置[鉴权](./cluster-credentials-console)时使用的密码。

![add-cluster-user-cn](/img/add-cluster-user-cn.png)

<Admonition type="info" icon="📘" title="说明">

<p>每个集群中最多可创建 100 名集群用户。</p>

</Admonition>

## 编辑集群用户角色{#edit-the-role-of-a-cluster-user}

![dit-cluster-user-role-zh](/img/dit-cluster-user-role-zh.png)

## 删除集群用户{#drop-a-cluster-user}

<Admonition type="info" icon="📘" title="说明">

<p>集群默认用户 <strong>db_admin</strong> 不支持删除。</p>

</Admonition>

![drop-cluster-user-zh](/img/drop-cluster-user-zh.png)


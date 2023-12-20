---
slug: /create-built-in-roles
beta: FALSE
notebook: FALSE
token: SXwewQ8p6i2qf8kd2YaccqKDnng
sidebar_position: 2
---

import Admonition from '@theme/Admonition';


# 集群内置角色

在 Zilliz Cloud 的[组织和项目](./a-panorama-view)架构中，为了提供更精细的访问控制，特别引入了集群级别的内置角色功能，这些角色明确了在 Zilliz Cloud 集群内的不同访问权限级别。

## 集群用户和角色概览{#cluster-users-and-roles}

### 默认用户（管理员权限）{#default-user-with-admin-role}

在 Zilliz Cloud 中创建集群时，系统会默认创建一个名为 `db_admin` 的集群用户，并自动生成其密码。作为管理员，`db_admin` 用户被赋予了完整的权限，可以访问和操作所有集群级别的资源。

<Admonition type="info" icon="📘" title="说明">

集群创建者将自动获得管理员角色。

</Admonition>

### 其他新增用户（内置角色）{#additional-users-with-built-in-roles}

在默认的 `db_admin` 用户之外，您还可以添加和管理其他具有不同内置角色的集群用户。这些角色分为以下几类，各自定义了用户在集群中的权限界限：

- 管理员：拥有对集群及其关联资源的全面控制权。

- 读写权限：能够读取、写入以及管理集群内的 Collection 和索引。

- 只读权限：仅可查看大部分集群资源，不具备创建、修改或删除的权限。

有关管理不同角色的集群用户的更多信息，请参考[管理身份凭证](./manage-cluster-credentials-console)。

<Admonition type="info" icon="📘" title="说明">

- 内置角色仅适用于 Dedicated 集群类型。有关更多信息，请参考[Zilliz Cloud 版本类型](./select-zilliz-cloud-service-plans)。

- 使用集群的内置角色功能遇到问题时，请及时[与我们联系](https://zilliz.com.cn/contact-sales)，我们将提供故障排除支持。

</Admonition>

## 各内置角色的访问权限{#access-levels-of-built-in-roles}

以下表格详细列出了各内置角色的权限，清晰地划分了各角色在集群操作中的不同能力范围。

### SDK 操作权限{#sdk-functionality-access}

|  **API**                                                                 |  **管理员** |  **读写权限**      |  **只读权限** |
| ------------------------------------------------------------------------ | -------- | -------------- | --------- |
|  **鉴权**                                                                  |          |                |           |
|  CreateCredential                                                        |  ✔︎      |  ✘             |  ✘        |
|  DeleteCredential                                                        |  ✔︎      |  ✘             |  ✘        |
|  ListCredUsers                                                           |  ✔︎      |  ✘             |  ✘        |
|  UpdateCredential                                                        |  ✔︎      |  ✘             |  ✘        |
|  **访问控制（RBAC）**                                                          |          |                |           |
|  AddUserToRole                                                           |  ✔︎      |  ✘             |  ✘        |
|  SelectUser                                                              |  ✔︎      |  ✘             |  ✘        |
|  **Collection**                                                          |          |                |           |
|  CreateCollection                                                        |  ✔︎      |  ✔︎            |  ✘        |
|  DropCollection                                                          |  ✔︎      |  ✔︎            |  ✘        |
|  DescribeCollection                                                      |  ✔︎      |  ✔︎            |  ✘        |
|  ShowCollections                                                         |  ✔︎      |  ✔︎            |  ✔︎       |
|  Load (Load, GetLoadState, LoadCollection, GetLoadingProgress)           |  ✔︎      |  ✔︎<br/> <br/>   |  ✔︎       |
|  ReleaseCollection                                                       |  ✔︎      |  ✔︎            |  ✘        |
|  Insert                                                                  |  ✔︎      |  ✔︎            |  ✘        |
|  Delete                                                                  |  ✔︎      |  ✔︎            |  ✘        |
|  Flush                                                                   |  ✔︎      |  ✔︎            |  ✘        |
|  GetFlushState                                                           |  ✔︎      |  ✔︎            |  ✘        |
|  Compact                                                                 |  ✔︎      |  ✘             |  ✘        |
|  GetStatistics (GetCollectionStatistics, GetStatistics)                  |  ✔︎      |  ✘             |  ✘        |
|  RenameCollection                                                        |  ✔︎      |  ✔︎            |  ✘        |
|  Upsert                                                                  |  ✔︎      |  ✔︎            |  ✘        |
|  **索引**                                                                  |          |                |           |
|  CreateIndex                                                             |  ✔︎      |  ✔︎            |  ✘        |
|  DropIndex                                                               |  ✔︎      |  ✔︎            |  ✘        |
|  DescribeIndex, GetIndexState, GetIndexBuildProgress, GetIndexStatistics |  ✔︎      |  ✔︎            |  ✔︎       |
|  **Partition**                                                           |          |                |           |
|  CreatePartition                                                         |  ✔︎      |  ✔︎            |  ✘        |
|  DropPartition                                                           |  ✔︎      |  ✔︎            |  ✘        |
|  GetPartitionStatistics                                                  |  ✔︎      |  ✔︎            |  ✔︎       |
|  HasPartiotion                                                           |  ✔︎      |  ✔︎            |  ✔︎       |
|  LoadPartitions                                                          |  ✔︎      |  ✔︎            |  ✘        |
|  ReleasePartitions                                                       |  ✔︎      |  ✔︎            |  ✘        |
|  ShowPartitions                                                          |  ✔︎      |  ✔︎            |  ✔︎       |
|  **搜索 & 查询**                                                             |          |                |           |
|  Search                                                                  |  ✔︎      |  ✔︎            |  ✔︎       |
|  Query                                                                   |  ✔︎      |  ✔︎            |  ✔︎       |
|  **系统信息**                                                                |          |                |           |
|  GetVersion                                                              |  ✔︎      |  ✔︎            |  ✔︎       |
|  CheckHealth                                                             |  ✔︎      |  ✔︎            |  ✔︎       |

### RESTful API 操作权限{#restful-api-access}

|  **API**             |  **Admin** |  **Read-Write ** |  **Read-Only** |
| -------------------- | ---------- | ---------------- | -------------- |
|  Create Collection   |  ✔︎        |  ✔︎              |  ✘             |
|  Describe Collection |  ✔︎        |  ✔︎              |  ✔︎            |
|  Drop Collection     |  ✔︎        |  ✔︎              |  ✘             |
|  List Collections    |  ✔︎        |  ✔︎              |  ✔︎            |
|  Delete              |  ✔︎        |  ✔︎              |  ✘             |
|  Get                 |  ✔︎        |  ✔︎              |  ✔︎            |
|  Insert              |  ✔︎        |  ✔︎              |  ✘             |
|  Query               |  ✔︎        |  ✔︎              |  ✔︎            |
|  Upsert              |  ✔︎        |  ✔︎              |  ✘             |

## 相关文档{#related-topics}

- [权限概览](./a-panorama-view)

- [管理组织与成员](./manage-orgs-and-members)

- [管理项目与成员](./manage-projects-and-collaborator)


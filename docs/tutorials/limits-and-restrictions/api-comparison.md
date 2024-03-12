---
slug: /api-comparison
beta: FALSE
notebook: FALSE
token: KOD2wN5jDimhSOk1GshcUbn2nJe
sidebar_position: 2
---

import Admonition from '@theme/Admonition';


# API 异同

为了提供更好的用户体验，Zilliz Cloud 的运行方式与 Milvus 略有不同。本文将介绍 Zilliz Cloud 和 Milvus 在 API 操作方面的差异。

如果您计划从 Milvus 迁移到 Zilliz Cloud，可能需要对历史代码进行一些必要的修改。

## 特定场景权限{#scenario-specific-privileges}

|             |  **API**                       |  **GUI 操作** |  **企业版**     |
| ----------- | ------------------------------ | ----------- | ------------ |
|  别名         |  alterAlias()                  |  ✘          |  ✔︎          |
|             |  createAlias()                 |  ✘          |  ✔︎          |
|             |  dropAlias()                   |  ✘          |  ✔︎          |
|             |  describeAlias()               |  ✘          |  ✔︎          |
|             |  listAliases()                 |  ✘          |  ✔︎          |
|  认证         |  createCredential()            |  ✔︎         |  ✔︎          |
|             |  deleteCredential()            |  ✔︎         |  ✔︎          |
|             |  listCredUsers()               |  ✔︎         |  ✔︎          |
|             |  updateCredential()            |  ✔︎         |  ✔︎          |
|  批量插入       |  bulkInsert()                  |  ✔︎         |  ✘           |
|             |  getBulkInsertState()          |  ✔︎         |  ✔︎          |
|             |  listBulkInsertTasks()         |  ✔︎         |  ✔︎          |
|  Collection |  getCollectionStatistics()     |  ✘          |  ✔︎          |
|             |  createCollection()            |  ✔︎         |  ✔︎          |
|             |  describeCollection()          |  ✔︎         |  ✔︎          |
|             |  dropCollection()              |  ✔︎         |  ✔︎          |
|             |  alterCollection()             |  ✘          |  ✔︎          |
|             |  getLoadingProgress()          |  ✔︎         |  ✔︎          |
|             |  getPersistentSgementInfo()    |  ✘          |  ✘           |
|             |  getQuerySegmentInfo()         |  ✘          |  ✘           |
|             |  getReplicas()                 |  ✘          |  ✘           |
|             |  insert()                      |  ✘          |  ✔︎          |
|             |  loadCollection()              |  ✔︎         |  ✔︎          |
|             |  releaseCollection()           |  ✔︎         |  ✔︎          |
|             |  showCollections()             |  ✔︎         |  ✔︎          |
|             |  getLoadState()                |  ✔︎         |  ✔︎          |
|             |  renameCollection()            |  ✔︎         |  ✔︎          |
|             |  upsert()                      |  ✘          |  ✔︎          |
|  数据库        |  ListDatabases                 |  ✘          |  ✘           |
|             |  DropDatabase                  |  ✘          |  ✘           |
|             |  CreateDatabase                |  ✘          |  ✘           |
|  索引         |  createIndex()                 |  ✔︎         |  ✔︎          |
|             |  describeIndex()               |  ✔︎         |  ✔︎          |
|             |  dropIndex()                   |  ✔︎         |  ✔︎          |
|             |  getIndexBuildProgress()       |  ✔︎         |  ✔︎          |
|             |  getIndexState()               |  ✔︎         |  ✔︎          |
|  管理         |  getCompactionState()          |  ✘          |  ✔︎          |
|             |  getCompactionStateWithPlan()  |  ✘          |  ✔︎          |
|             |  getFlushState()               |  ✘          |  ✔︎          |
|             |  getMetrics()                  |  ✘          |  ✘           |
|             |  loadBalance()                 |  ✘          |  ✘           |
|             |  manualCompact()               |  ✘          |  ✔︎          |
|  分区         |  createPartition()             |  ✘          |  ✔︎          |
|             |  dropPartition()               |  ✘          |  ✔︎          |
|             |  getPartitionStatistics()      |  ✘          |  ✔︎          |
|             |  hasPartiotion()               |  ✘          |  ✔︎          |
|             |  loadPartitions()              |  ✘          |  ✔︎          |
|             |  releasePartitions()           |  ✘          |  ✔︎          |
|             |  showPartitions()              |  ✘          |  ✔︎          |
|  搜索 & 查询    |  search()                      |  ✔︎         |  ✔︎          |
|             |  query()                       |  ✘          |  ✔︎          |
|  访问控制（RBAC） |  addUserToRole()               |  ✔︎         |  ✔︎<br/>  |
|             |  createRole()                  |  ✘          |  ✘           |
|             |  dropRole()                    |  ✘          |  ✘           |
|             |  grantRolePrivilege()          |  ✘          |  ✘           |
|             |  removeUserFromRole()          |  ✔︎         |  ✔︎          |
|             |  revokeRolePrivilege()         |  ✘          |  ✘           |
|             |  selectGrantForRole()          |  ✘          |  ✔︎          |
|             |  selectGrantForRoleAndObject() |  ✘          |  ✔︎          |
|             |  selectRole()                  |  ✘          |  ✔︎          |
|             |  selectUser()                  |  ✘          |  ✔︎          |
|  系统         |  getVersion()                  |  ✔︎         |  ✔︎          |
|             |  checkHealth()                 |  ✘          |  ✔︎          |


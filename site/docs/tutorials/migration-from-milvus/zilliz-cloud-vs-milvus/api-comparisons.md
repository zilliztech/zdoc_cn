---
slug: /api-comparisons
sidebar_position: 0
---

# API 异同

为了提供更好的用户体验，Zilliz Cloud 的运行方式与 Milvus 略有不同。本文将介绍 Zilliz Cloud 和 Milvus 在 API 操作方面的差异。

如果您计划从 Milvus 迁移到 Zilliz Cloud，可能需要对历史代码进行一些必要的修改。

## 特定场景权限 {#specific-scenario-permissions}

|            | API                           | GUI 操作 | 企业版 |
| ---------- | ----------------------------- | ------ | --- |
| 别名         | alterAlias()                  | ✘      | ✘   |
|            | createAlias()                 | ✘      | ✘   |
|            | dropAlias()                   | ✘      | ✘   |
| 认证         | createCredential()            | ✔︎     | ✘   |
|            | deleteCredential()            | ✔︎     | ✘   |
|            | listCredUsers()               | ✔︎     | ✘   |
|            | updateCredential()            | ✔︎     | ✘   |
| 批量插入       | bulkInsert()                  | ✔︎     | ✘   |
|            | getBulkInsertState()          | ✔︎     | ✔︎  |
|            | listBulkInsertTasks()         | ✔︎     | ✔︎  |
| Collection | getCollectionStatistics()     | ✘      | ✔︎  |
|            | getLoadingProgress()          | ✔︎     | ✔︎  |
|            | getPersistentSgementInfo()    | ✘      | ✘   |
|            | getQuerySegmentInfo()         | ✘      | ✘   |
|            | getReplicas()                 | ✘      | ✘   |
|            | insert()                      | ✘      | ✔︎  |
|            | loadCollection()              | ✔︎     | ✔︎  |
|            | releaseCollection()           | ✔︎     | ✔︎  |
|            | showCollections()             | ✔︎     | ✔︎  |
|            | getLoadState()                | ✔︎     | ✔︎  |
|            | renameCollection()            | ✔︎     | ✔︎  |
| 数据库        | ListDatabases                 | ✘      | ✘   |
|            | DropDatabase                  | ✘      | ✘   |
|            | CreateDatabase                | ✘      | ✘   |
| 索引         | createIndex()                 | ✔︎     | ✔︎  |
|            | describeIndex()               | ✔︎     | ✔︎  |
|            | dropIndex()                   | ✔︎     | ✔︎  |
|            | getIndexBuildProgress()       | ✔︎     | ✔︎  |
|            | getIndexState()               | ✔︎     | ✔︎  |
| 管理         | getCompactionState()          | ✘      | ✔︎  |
|            | getCompactionStateWithPlan()  | ✘      | ✔︎  |
|            | getFlushState()               | ✘      | ✔︎  |
|            | getMetrics()                  | ✘      | ✘   |
|            | loadBalance()                 | ✘      | ✘   |
|            | manualCompact()               | ✘      | ✔︎  |
| 分区         | createPartition()             | ✘      | ✘   |
|            | dropPartition()               | ✘      | ✘   |
|            | getPartitionStatistics()      | ✘      | ✘   |
|            | hasPartiotion()               | ✘      | ✘   |
|            | loadPartitions()              | ✘      | ✘   |
|            | releasePartitions()           | ✘      | ✘   |
|            | showPartitions()              | ✘      | ✘   |
| 搜索和查询      | search()                      | ✔︎     | ✔︎  |
|            | query()                       | ✘      | ✔︎  |
| RBAC       | addUserToRole()               | ✘      | ✘   |
|            | createRole()                  | ✘      | ✘   |
|            | dropRole()                    | ✘      | ✘   |
|            | grantRolePrivilege()          | ✘      | ✘   |
|            | removeUserFromRole()          | ✘      | ✘   |
|            | revokeRolePrivilege           | ✘      | ✘   |
|            | selectGrantForRole()          | ✘      | ✘   |
|            | selectGrantForRoleAndObject() | ✘      | ✘   |
|            | selectRole()                  | ✘      | ✘   |
|            | selectUser()                  | ✘      | ✘   |
| 系统         | getVersion()                  | ✘      | ✘   |
|            | checkHealth()                 | ✘      | ✔︎  |
---
displayed_sidbar: restfulSidebar
slug: /restful/error-codes-v2
beta: FALSE
notebook: FALSE
sidebar_position: 2
---

# 错误码 (v2)

您可在本页查找 Zilliz Cloud RESTful API (v2) 的错误码，以便更好地理解接口调用过程中可能遇到的问题。


**96000**

CloudId 无效。请使用 ListCloudProviders API 获取受支持的 cloudIds 列表。

**96001**

RegionId 无效。请使用 ListCloudRegions API 获取受支持的 regionIds 列表。

**96002**

cuSize 无效。参数值应为正数。

**96003**

cuType 无效。

**96004**

专用套餐无效。

**96005**

projectId 无效。projectId 应类似于 proj-xxxxxxxx。请使用 ListProjects API 获取您有权限访问的项目。

**96006**

UTC 中的 ISO 8601 持续时间格式无效。

**96007**

UTC 中的 ISO 8601 时间戳格式无效。

**96008**

pageSize 的参数值应介于 1 和 100 之间。

**96009**

参数 currentPage 的值应介于 1 和 Int 的最大值之间。

**96010**

clusterName 无效。集群名称只能包含字母数字字符和连字符。

**96011**

应提供有效的 period，或有效的 start 和 end 参数。

**96012**

您无权访问此项目。项目组织与 Apikey 组织不匹配。

**96013**

您无权访问此项目。需要组织所有者或项目所有者权限。

**96014**

您无权访问此集群。集群组织与 Apikey 组织不匹配。

**96015**

您无权访问此集群。需要组织所有者或项目所有者权限。

**96016**

您无权访问此集群。请检查您的 Apikey scope。

**96017**

指定的集群名称在项目下已存在。

**96018**

未找到集群。请使用 ListClusters API 获取您有权限访问的集群。

**96019**

此地域不支持免费套餐。

**96020**

此地域不支持 Serverless 套餐。

**96021**

免费集群不支持此操作。

**96022**

Serverless 集群不支持此操作。

**96023**

指定的规格不存在。请检查 cuType、cuSize 和套餐组合。

**96024**

查询实例指标失败。%s（详细信息）

**96025**

clusterId 为空。请指定 clusterId。

**96026**

未找到任务。请检查您的请求参数。

**96027**

您无权访问此项目。请检查您的 Apikey scope。

**96028**

该功能仅支持企业版套餐集群。

**96029**

backupType 无效。

**96030**

备份 creationMethod 无效。

**96031**

备份恢复策略无效。'collectionStatus' 的值应为 KEEP 或 RELEASE。

**96032**

备份策略频率无效。

**96033**

备份策略 startTime 无效。

**96034**

自动备份 retentionDays 无效。该值应介于 1 和 30 之间。

**96035**

时间范围无效。请检查 start 和 end time 参数。

**96036**

clusterId 无效。

**96037**

targetCollectionStatus 无效。该值应为 LOADED 或 UNLOADED。

**96038**

创建备份失败。%s

**96039**

恢复 collection 备份失败。%s

**96040**

恢复集群备份失败。%s

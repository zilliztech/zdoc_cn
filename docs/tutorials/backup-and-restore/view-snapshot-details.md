---
title: "查看备份文件 | Cloud"
slug: /view-snapshot-details
sidebar_label: "查看备份文件"
beta: FALSE
notebook: FALSE
description: "本文介绍如何查看手动或自动创建的备份文件。 | Cloud"
type: origin
token: PS8EwUahQiNPTikPIMbcBxvGnKS
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 备份
  - 快照
  - 查看

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 查看备份文件

本文介绍如何查看手动或自动创建的备份文件。

## 查看所有备份文件{#view-all-backup-files}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"Bash","value":"Bash"}]}>

<TabItem value="Cloud Console">

![view_all_backup_files_cn](/img/view_all_backup_files_cn.png)

</TabItem>
<TabItem value="Bash">

查看集群中已创建的所有备份文件。有关更多参数信息，请参阅[查看备份列表](/reference/restful/list-backups-v2)。

```bash
curl --request GET \
     --url "${BASE_URL}/v2/backups" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "Accept: application/json"
```

示例回显：

```bash
{
  "code": 0,
  "data": {
    "count": 10,
    "currentPage": 1,
    "pageSize": 10,
    "backups": [
      {
        "backupId": "backup1_0b9d15a0ddexxxx",
        "projectId": "proj-20e13e974c7d659a83xxxx",
        "backupName": "Dedicated-01_backup3",
        "backupType": "CLUSTER",
        "creationMethod": "AUTO",
        "status": "CREATING",
        "size": 0,
        "expireTime": "2024-09-02T02:27:51Z",
        "clusterId": "in01-3e5ad8adc38xxxx",
        "clusterName": "Dedicated-01",
        "createTime": "2024-08-26T02:27:51Z"
      },
      ...
    ]
  }
}
```

</TabItem>
</Tabs>

## 查看备份文件详情{#view-backup-file-details}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"Bash","value":"Bash"}]}>

<TabItem value="Cloud Console">

![view_backup_files_details_cn](/img/view_backup_files_details_cn.png)

</TabItem>
<TabItem value="Bash">

查看单个备份文件详情。有关更多参数信息，请参阅[查看备份详情](/reference/restful/describe-backup-v2)。

```bash
curl --request GET \
     --url "${BASE_URL}/v2/clusters/${CLUSTER_ID}/backups/${BACKUP_ID}" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "Accept: application/json"
```

示例回显：

```bash
{
  "code": 0,
  "data": {
    "clusterId": "in01-3e5ad8adc38xxxx",
    "clusterName": "Dedicated-01",
    "regionId": "aws-us-west-2",
    "projectId": "proj-20e13e974c7d659a83xxxx",
    "backupId": "backup1_0b9d15a0ddexxxx",
    "backupName": "Dedicated-01_backup3",
    "backupType": "CLUSTER",
    "creationMethod": "AUTO",
    "status": "AVAILABLE",
    "size": 0,
    "collections": [],
    "createTime": "2024-08-26T02:27:51Z",
    "expireTime": "2024-09-02T02:27:51Z"
  }
}
```

</TabItem>
</Tabs>

## 相关文档{#related-topics}

- [创建备份快照](./create-snapshot)

- [创建自动备份](./schedule-automatic-backups)

- [恢复备份](./restore-from-snapshot)

- [删除备份快照](./delete-snapshot)


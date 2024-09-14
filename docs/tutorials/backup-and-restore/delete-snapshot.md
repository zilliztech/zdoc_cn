---
title: "删除备份文件 | Cloud"
slug: /delete-snapshot
sidebar_label: "删除备份文件"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 支持手动或自动创建备份。 | Cloud"
type: origin
token: FW37wt3qEiKvZzkzBducXgHZnIe
sidebar_position: 5
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 备份
  - 快照
  - 删除

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 删除备份文件

Zilliz Cloud 支持手动或自动创建备份。

Zilliz Cloud 将永久保留手动创建的备份。即使删除集群，为该集群手动创建的备份也不会随集群一起删除。如果不再需要特定的手动备份，您可以将其删除。

自动创建的备份将在到达保留天数后被自动删除。删除集群时，该集群自动创建的备份也会一同被删除。

## 开始前{#before-you-start}

请先确保：

- 您是[组织管理员](./user-roles#organization-roles)或[项目管理员](./user-roles#project-roles)。

- 您的集群为 Dedicated 版集群。

## 操作步骤{#procedures}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"Bash","value":"Bash"}]}>

<TabItem value="Cloud Console">

![delete_snapshot](/img/delete_snapshot.png)

在执行删除操作之前，系统会提示您确认是否删除备份文件。

</TabItem>
<TabItem value="Bash">

删除备份文件。有关更多参数信息，请参阅[删除备份](/reference/restful/delete-backup-v2)。

```bash
curl --request DELETE \
     --url "${BASE_URL}/v2/clusters/${CLUSTER_ID}/backups/${BACKUP_ID}" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "Accept: application/json" \
     --header "Content-type: application/json"
```

示例回显：

```bash
{
  "code": 0,
  "data": {
    "backupId": "backup11_dbf5a40a6e5xxxx",
    "backupName": "medium_articles_backup4"
  }
}
```

</TabItem>
</Tabs>

## 相关文档{#related-topics}

- [创建备份快照](./create-snapshot)

- [创建自动备份](./schedule-automatic-backups)

- [查看备份快照](./view-snapshot-details)

- [恢复备份](./restore-from-snapshot)


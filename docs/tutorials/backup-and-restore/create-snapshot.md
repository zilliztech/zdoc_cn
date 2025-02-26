---
title: "创建备份 | Cloud"
slug: /create-snapshot
sidebar_label: "创建备份"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 备份是指在某特定时间保存的一份集群或 Collection 数据的拷贝。您可以基于备份创建新的集群或 Collection。 | Cloud"
type: origin
token: GFFswc3z1iQtjQkpmyScL00dnSx
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 备份
  - 快照

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 创建备份

Zilliz Cloud 备份是指在某特定时间保存的一份集群或 Collection 数据的拷贝。您可以基于备份创建新的集群或 Collection。

Zilliz Cloud 将永久保存手动创建的备份。换言之，手动创建的备份不会被自动删除。

## 前提条件{#before-you-start}

开始前，请确保：

- 您是目标组织中的[组织管理员](./organization-users)或[项目管理员](./project-users)。

- 您的集群为 Dedicated 版本。

<Admonition type="info" icon="📘" title="说明">

<p>备份功能目前仅对 Dedicated 集群开放。如果您创建的是 Serverless 集群，请先<a href="./migrate-between-cluster">迁移</a>至 Dedicated 集群。</p>
<p>创建备份会产生一定费用。具体详情，请参阅<a href="./understand-cost">了解费用</a>。</p>

</Admonition>

## 创建备份{#create-backup}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"Bash","value":"Bash"}]}>

<TabItem value="Cloud Console">

您可以参考以下截图为集群或 Collection 创建备份。创建备份时，您的集群仍处于**运行中**的状态。

![create_snapshot_cn](/img/create_snapshot_cn.png)

</TabItem>
<TabItem value="Bash">

您可以为整个集群或某个 collection 创建备份。有关具体的参数信息，请参阅[创建备份](/reference/restful/create-backup-v2)。

- 为整个集群创建备份。

    ```bash
    curl --request POST \
         --url "${BASE_URL}/v2/clusters/${CLUSTER_ID}/backups/create" \
         --header "Authorization: Bearer ${TOKEN}" \
         --header "Content-Type: application/json" \
         --data-raw '{
                "backupType": "CLUSTER"
          }'
    ```

    示例回显：

    ```bash
    {
      "code": 0,
      "data": {
        "backupId": "backup0_c7b18539b97xxxx",
        "backupName": "Dedicated-01_backup2",
        "jobId": "job-031a8e3587ba7zqkadxxxx"
      }
    }
    ```

- 为某个 collection 创建备份。

    ```bash
    curl --request POST \
    --url "${BASE_URL}/v2/clusters/${CLUSTER_ID}/backups/create" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "Content-Type: application/json" \
    -d '{
        "backupType": "COLLECTION",
        "dbCollections": [
            {
                "collectionNames": [
                    "medium_articles"
                ]
            }
        ]
    }'
    ```

    示例回显：

    ```bash
    {
      "code": 0,
      "data": {
        "backupId": "backup11_4adb19e3f9exxxx",
        "backupName": "medium_articles_bacxxxx",
        "jobId": "job-039dbc113c5ozfwunvxxxx"
      }
    }
    ```

</TabItem>
</Tabs>

Zilliz Cloud 将生成一条备份任务。您可前往[任务中心](./view-activities)查看任务状态和进度。如果任务状态从**进行中**变更为**成功**，则代表备份创建成功。

<Admonition type="info" icon="📘" title="说明">

<p>同一集群下，同时最多可有一条进行中或等待中的手动创建备份任务。只有当进行中或等待中的手动创建备份任务完成时，您方可手动创建新备份。</p>

</Admonition>

创建备份是异步操作，创建所需时间取决于集群大小和集群的 CU 规格。例如，如果某集群大小为 4 CU 且该集群下有一个 Collection，Collection 中包含了超过 1.2 亿 128 维向量记录，则为该集群创建手动备份大约耗时 5 分钟。

## 相关文档{#related-topics}

- [创建自动备份](./schedule-automatic-backups)

- [查看备份快照](./view-snapshot-details)

- [恢复备份](./restore-from-snapshot)

- [删除备份快照](./delete-snapshot)


---
title: "通过备份工具从 Milvus 迁移至 Zilliz Cloud | Cloud"
slug: /via-stage
sidebar_label: "通过备份工具迁移"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "Zilliz Cloud 提供了一个备份工具，可用于从 Milvus 迁移数据至 Zilliz Cloud。借助备份工具，用户可以更轻松地完成数据迁移，无需过多关注底层细节，从而显著提升迁移效率与易用性。 | Cloud"
type: origin
token: ZP6tw8jcQipDKrkY93DcYCetnJb
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 数据迁移
  - 备份文件
  - 备份工具

---

import Admonition from '@theme/Admonition';


# 通过备份工具从 Milvus 迁移至 Zilliz Cloud

Zilliz Cloud 提供了一个备份工具，可用于从 Milvus 迁移数据至 Zilliz Cloud。借助备份工具，用户可以更轻松地完成数据迁移，无需过多关注底层细节，从而显著提升迁移效率与易用性。

该功能简化了多种迁移场景下的操作复杂度，例如：

- 本地文件迁移时需考虑的备份文件大小限制；

- 使用云存储桶迁移时对不同云服务商配置的了解需求；

- 通过 Milvus 实例 Endpoint 迁移时 Zilliz Cloud 对该 Endpoint 的访问权限问题。

## 开始前\{#before-you-start}

- 您需要拥有组织管理员或项目管理员的角色。如果您没有相应的权限，请联系您的 Zilliz Cloud 管理员。

- 确保目标集群的 Query CU 数量足以容纳源数据。要估算所需的 Query CU 数量，请使用[计算器](https://zilliz.com.cn/pricing#calculator)。

## 操作步骤\{#procedure}

在如下步骤中，你将使用 Milvus Backup 准备备份文件、上传备份文件至 Zilliz Cloud、并将备份文件中的数据迁移到指定的 Zilliz Cloud 集群中。

1. 下载 [milvus-backup](https://github.com/zilliztech/milvus-backup/releases)。推荐下载最新版本。

1. 在下载的二进制文件所在的同级目录下，创建 `configs` 文件夹，然后将 [backup.yaml](https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml) 保存到 `configs`。

    此步骤完成后，文件夹的结构应如下所示：

    ```plaintext
    workspace
    ├── milvus-backup
    └── configs
         └── backup.yaml
    ```

1. 自定义 `backup.yaml` 配置。

    1. 设置如下配置项：

        ```yaml
        ...
        cloud:
          address: https://api.cloud.zilliz.com.cn
          apikey: <your-api-key>
        ...
        ```

        - `cloud.address`

            Zilliz Cloud 控制面访问地址，通常为 `https://api.cloud.zilliz.com.cn`.

        - `cloud.apikey`

            一个拥有操作目标 Zilliz Cloud 集群的 API 密钥。更多详情，可参考[API 密钥](./manage-api-keys)。

    1. 检查以下配置项是否正确：

        ```yaml
        ...
        # milvus proxy address, compatible to milvus.yaml
        milvus:
          address: localhost
          port: 19530
          ...
          
        # Related configuration of minio, which is responsible for data persistence for Milvus.
        minio:
          # Milvus storage configs, make them the same with milvus config
          storageType: "minio" # support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent), gcpnative
          # You can use "gcpnative" for the Google Cloud Platform provider. Uses service account credentials for authentication.
          address: localhost # Address of MinIO/S3
          port: 9000   # Port of MinIO/S3
          bucketName: "a-bucket" # Milvus Bucket name in MinIO/S3, make it the same as your milvus instance
          backupBucketName: "a-bucket" # Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath
          rootPath: "files" # Milvus storage root path in MinIO/S3, make it the same as your milvus instance
          ...
        ```

    <Admonition type="info" icon="📘" title="说明">

    <p>如果 Milvus 实例是通过 Docker Compose 安装，<code>minio.bucketName</code> 默认为 <code>a-bucket</code>， <code>rootPath</code> 默认为 <code>files</code>。</p>
    <p>如果 Milvus 实例是通过 Kubernetes 安装，<code>minio.bucketName</code> 默认为 <code>milvus-bucket</code>， <code>rootPath</code> 默认为 <code>file</code>。</p>

    </Admonition>

1. 创建 Milvus 的安装备份。

    ```bash
    ./milvus-backup --config backup.yaml create -n my_backup
    
    # my_backup 为备份文件的名称。该名称将会用于下一步的迁移命令。
    ```

1. 创建目标 Zilliz Cloud 集群、记录 Cluster ID、然后运行如下命令开始迁移。

    ```bash
    ./milvus-backup migrate --cluster_id inxx-xxxxxxxxxxxxxxx -n my_backup
    
    # cluster_id 为目标 Zilliz Cloud 集群的 ID。
    # my_backup 为上一步记录的备份文件名称。
    
    # 命令回显如下：
    # Successfully triggered migration with backup name: my_backup target cluster: inxx-xxxxxxxxxxxxxxx migration job id: job-xxxxxxxxxxxxxxxxxxx.
    # You can check the progress of the migration job in Zilliz Cloud console.
    ```

    在执行上述命令时，Milvus Backup 会将上一步准备好的备份文件上传到 Zilliz Cloud、创建迁移任务、然后返回迁移任务的 ID。

    <Admonition type="info" icon="📘" title="说明">

    <p>上传到 Zilliz Cloud 的备份文件在上传完成后会默认保存 3 天，然后删除。</p>

    </Admonition>

## 查看迁移进度\{#monitor-the-migration-process}

生成迁移任务后，您可前往[任务中心](/docs/job-center)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

<Admonition type="info" icon="📘" title="说明">

<p>迁移完成后，请验证目标集群中的 collection 和 entity 数量是否与数据源一致。如果发现不一致，请删除缺失 entity 的 collection 并重新进行迁移。</p>

</Admonition>

![view_migration_progress_cn](/img/view_migration_progress_cn.png)

## 迁移后\{#post-migration}

迁移任务完成后，请注意以下事项：

- **索引创建**：迁移过程中会自动为迁移的 Collection 创建 AUTOINDEX。

- **手动 Load Collection**：虽然索引已自动创建，但迁移后的 Collection 并不会立即支持搜索或查询操作。您必须手动 Load Collection，才能启用搜索和查询功能。详细信息请参阅 [Load 和 Release](./load-release-collections)。

## 取消迁移任务\{#cancel-migration-job}

如果迁移过程遇到任何问题，您可以采取以下步骤进行故障排除并恢复迁移：

1. 在**任务中心**页面，取消失败的迁移任务。

1. 在**操作**列点击**查看详情**以访问日志信息。


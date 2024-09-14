---
title: "通过备份文件从 Milvus 迁移至 Zilliz Cloud | Cloud"
slug: /via-backup-files
sidebar_label: "通过备份文件迁移"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 提供基于 Milvus 的完全托管的向量数据库解决方案，适合希望使用 Milvus 向量数据库但不想自己管理基础设施的用户。为了实现顺利的数据迁移，您可以通过以下方式将数据从 Milvus 迁移到 Zilliz Cloud：通过 Milvus 服务器地址连接到源数据库或直接上传备份文件。 | Cloud"
type: origin
token: YBlmwO9ajiU4tYklnjmc6fJPn8e
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 数据迁移
  - 备份文件

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 通过备份文件从 Milvus 迁移至 Zilliz Cloud

Zilliz Cloud 提供基于 Milvus 的完全托管的向量数据库解决方案，适合希望使用 Milvus 向量数据库但不想自己管理基础设施的用户。为了实现顺利的数据迁移，您可以通过以下方式将数据从 Milvus 迁移到 Zilliz Cloud：通过 Milvus 服务器地址连接到源数据库或直接上传备份文件。

本文介绍如何通过备份文件从 Milvus 进行数据迁移。有关如何通过 Endpoint 迁移信息，请参阅[通过 Endpoint 从 Milvus 迁移至 Zilliz Cloud](./via-endpoint)。

## 开始前{#before-you-start}

- 您已根据迁移方法做好必要的迁移准备：

    - 从本地文件：提前准备本地备份文件。有关如何准备备份文件的信息，请参阅[准备迁移数据](./via-backup-files#prepare-migration-data)。

    - 从对象存储：Milvus 对象存储的公共 URL 和访问凭据。您可以选择长期或临时凭据。

- 您需要拥有组织管理员或项目管理员的角色。如果您没有相应的权限，请联系您的 Zilliz Cloud 管理员。

## 准备迁移数据{#prepare-migration-data}

<Tabs defaultValue="1x" values={[{"label":"From Milvus 1.x","value":"1x"},{"label":"From Milvus 2.x","value":"2x"}]}>

<TabItem value="1x">

Zilliz Cloud 支持从 Milvus 1.x（包括 0.9.x 及以上）和更高版本迁移数据。Milvus 向量数据库正持续发展，各版本间通常会存在重大变化。

要从 Milvus 0.9.x 到 1.x 迁移数据，需要按如下准备数据：

1. 下载 [milvus-migration](https://assets.zilliz.com/tools/milvus-migration)。推荐下载最新版本。

1. 停止 Milvus 安装进程或至少停止在 Milvus 中执行的所有 DML 操作。

1. 导出安装相关的元数据到 `meta.json`。

    - 如果后端为 MySQL，执行以下命令：

        ```bash
        ./milvus-migration export -m "user:password@tcp(adderss)/milvus?charset=utf8mb4&parseTime=True&loc=Local" -o outputDir
        ```

    - 如果后端为 SQLite，执行以下命令：

        ```bash
        ./milvus-migration export -s /milvus/db/meta.sqlite -o outputDir
        ```

1. 复制 Milvus 安装目录下的 `tables` 文件夹，将 `meta.json` 和 `tables` 文件夹移动到一个空文件夹。

    此步骤完成后，空文件夹的结构应如下所示：

    ```plaintext
    migration_data
    ├── meta.json
    └── tables
    ```

1. 将准备好的文件夹上传到 OSS 存储，或直接使用本地文件夹开始迁移。

</TabItem>

<TabItem value="2x">

Zilliz Cloud 支持从 Milvus 2.x 和更高版本迁移数据。Milvus 向量数据库如今正在持续发展，各版本之间通常会存在重大变化。

要从 Milvus 2.x 迁移数据，您需要按如下准备数据：

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

    一般情况下，您不需要自定义该文件。 在下一步前，您可以检查以下配置项是否正确：

    <Admonition type="info" icon="📘" title="说明">

    <p>如果 Milvus 实例是通过 Docker Compose 安装，<code>minio.bucketName</code> 默认为 <code>a-bucket</code>， <code>rootPath</code> 默认为 <code>files</code>。</p>
    <p>如果 Milvus 实例是通过 Kubernetes 安装，<code>minio.bucketName</code> 默认为 <code>milvus-bucket</code>， <code>rootPath</code> 默认为 <code>file</code>。</p>

    </Admonition>

1. 创建 Milvus 的安装备份。

```bash
./milvus-backup --config backup.yaml create -n my_backup
```

1. 获取备份文件。

```bash
./milvus-backup --config backup.yaml get -n my_backup
```

1. 检查备份文件。

    - 如果您将 `minio.address` 和 `minio.port` 设置为 OSS 存储，则您的备份文件已在 OSS 存储中。

    - 如果您将 `minio.address` 和 `minio.port` 设置为 MinIO 存储，则可以通过 MinIO 控制台或 mc 客户端下载备份文件。 

        - 如果从 [MinIO 控制台](https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html)下载，请先登录 MinIO 控制台，找到 `minio.address` 中指定的存储桶，选择存储桶中的文件，然后开始下载。

        - 如果使用 [mc](https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install) 客户端，则执行以下命令：

        ```bash
        # 配置 Minio 主机
        mc alias set my_minio https://<minio_endpoint> <accessKey> <secretKey>
        
        # 查询当前桶列表
        mc ls my_minio
        
        # 从桶中下载文件
        mc cp --recursive my_minio/<your-bucket-path> <local_dir_path>
        ```

1. 解压下载的文件，然后将备份文件夹下的子文件夹上传到 Zilliz Cloud。

```plaintext
backup
└── my_backup  <= 上传此文件夹
```

</TabItem>

</Tabs>

## 将数据迁移到 Zilliz Cloud{#migrate-data-to-zilliz-cloud}

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **从 Milvus 迁移** > **通过备份文件**。

1. 在**从 Milvus 迁移数据**页面上，

    - 如果您的数据在本地文件中：

        - 选择**本地文件**，上传包含您数据的文件夹，并选择目标集群。

    - 如果您的数据在对象存储中：

        - 选择**对象存储**，选择服务（例如 S3、Azure Blob、GCP），输入您数据的对象 URL 或 S3 URI，提供必要的凭据，并选择目标集群。

        - 通过指定适当的凭据类型提供必要的凭据：

            - **长期**：使用此选项以持久访问资源，无需频繁重新认证。

            - **Session**：选择此选项以获取有效期有限的临时凭据，适合在特定用户会话期间进行短期访问。

1. 单击**迁移**。

![zh_migrate_from_milvus_via_backup_file](/img/zh_migrate_from_milvus_via_backup_file.png)

## 查看迁移进度{#monitor-the-migration-process}

生成迁移任务后，您可前往[任务中心](/docs/job-center)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

<Admonition type="info" icon="📘" title="说明">

<p>迁移完成后，请验证目标集群中的 collection 和 entity 数量是否与数据源一致。如果发现不一致，请删除缺失 entity 的 collection 并重新进行迁移。</p>

</Admonition>

![view_migration_progress_cn](/img/view_migration_progress_cn.png)

Zilliz Cloud 仅支持 [AUTOINDEX](./autoindex-explained)。**AUTOINDEX** 是一种优化的索引算法，Zilliz Cloud 将使用此算法为您迁移的 Collection 自动创建索引。

Collection 加载后，您可以自行连接和管理 Collection。

## 取消迁移任务{#cancel-migration-job}

如果迁移过程遇到任何问题，您可以采取以下步骤进行故障排除并恢复迁移：

1. 在**任务中心**页面，取消失败的迁移任务。

1. 在**操作**列点击**查看详情**以访问日志信息。


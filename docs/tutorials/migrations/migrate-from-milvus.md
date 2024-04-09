---
slug: /migrate-from-milvus
beta: FALSE
notebook: FALSE
type: origin
token: YBlmwO9ajiU4tYklnjmc6fJPn8e
sidebar_position: 1
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 从 Milvus 迁移至 Zilliz Cloud

Zilliz Cloud 提供了先进的数据基础架构，可帮助您优化向量搜索并轻松实现 AI 应用。如果您是 Milvus 用户，可以将数据迁移到 Zilliz Cloud。

本文档介绍如何准备迁移数据、执行迁移和验证迁移结果。

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

迁移数据准备就绪后，就可以将数据上传到 Zilliz Cloud。

如果您已将迁移数据上传到个人 OSS 存储中，请选择__从 OSS 导入文件夹__，然后填写文件夹路径和身份验证凭据。

如果要将本地文件夹上传到 Zilliz Cloud，请选择__导入本地文件夹__，然后将文件夹拖到指定区域上传。注意，上传文件夹的最大尺寸为 1 GB。

![migrate_from_milvus_1x](/img/migrate_from_milvus_1x.png)

## 结果验证{#verify-the-migration-results}

如果迁移任务的状态从 __迁移中__ 变更为 __成功__，则代表迁移成功。

Zilliz Cloud 仅支持 [AUTOINDEX](./autoindex-explained)。__AUTOINDEX__ 是一种优化的索引算法，Zilliz Cloud 将使用此算法为您迁移的 Collection 自动创建索引。

Collection 加载后，您可以自行连接和管理 Collection。

## 相关文档{#related-topics}

- [AUTOINDEX](./autoindex-explained)

- [选择合适的 CU 类型](./cu-types-explained)

- [API 异同](./api-comparison)

- [其他异同](./other-differences)


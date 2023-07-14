---
slug: /migrate-from-milvus-2x
sidebar_position: 1
---

# 从 Milvus 2.x 迁移至 Zilliz Cloud

Zilliz Cloud 提供了先进的数据基础架构，可帮助您优化向量搜索并轻松实现 AI 应用。如果您是 Milvus 用户，可以将数据迁移到 Zilliz Cloud。

本文档介绍如何准备迁移数据、执行迁移和进行结果验证。

## 准备迁移数据 {#preparing-to-migrate-data}

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

  :::info 说明
  
  如果 Milvus 实例是通过 Docker Compose 安装，`minio.bucketName` 默认为 `a-bucket`， `rootPath` 默认为 `files`。
  如果 Milvus 实例是通过 Kubernetes 安装，`minio.bucketName` 默认为 `milvus-bucket`， `rootPath` 默认为 `file`。
  
  :::

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

## 将数据迁移到 Zilliz Cloud {#migrate-data-to-zilliz-cloud}

迁移数据准备就绪后，就可以将数据上传到 Zilliz Cloud。

如果您已将迁移数据上传到个人 OSS 存储中，请选择**从 OSS 导入文件夹**，然后填写文件夹路径和身份验证凭据。

如果要将本地文件夹上传到 Zilliz Cloud，请选择**导入本地文件夹**，然后将文件夹拖到指定区域上传。注意，上传文件夹的最大尺寸为 1 GB。

![migrate_from_milvus_2x](/img/migrate_from_milvus_2x.png)

## **结果验证** {#result-verification}

如果迁移任务的状态从 **迁移中** 变更为 **成功**，则代表迁移成功。

Zilliz Cloud 仅支持 [AUTOINDEX](./autoindex-explained)。**AUTOINDEX** 是一种优化的索引算法，Zilliz Cloud 将使用此算法为您迁移的 Collection 自动创建索引。

Collection 加载后，您可以自行连接和管理 Collection。

## 相关文档 {#related-doc}

- [从 Milvus 1.x 迁移至 Zilliz Cloud](./migrate-from-milvus-1x)

- [AUTOINDEX](./autoindex-explained)

- [CU 类型](./cu-types-explained-1)

- [API 异同](./api-comparisons)

- [其他异同](./other-differences)

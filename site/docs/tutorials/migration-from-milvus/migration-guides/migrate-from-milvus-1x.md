---
slug: /migrate-from-milvus-1x
sidebar_position: 0
---

# 从 Milvus 1.x 迁移至 Zilliz Cloud

Zilliz Cloud 提供了先进的数据基础架构，可帮助您优化向量搜索并轻松实现 AI 应用。如果您是 Milvus 用户，可以将数据迁移到 Zilliz Cloud。

本文档介绍如何准备迁移数据、执行迁移和验证迁移结果。

## 准备迁移数据 {#preparing-to-migrate-data}

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

## 将数据迁移到 Zilliz Cloud {#migrate-data-to-zilliz-cloud}

迁移数据准备就绪后，就可以将数据上传到 Zilliz Cloud。

如果您已将迁移数据上传到个人 OSS 存储中，请选择**从 OSS 导入文件夹**，然后填写文件夹路径和身份验证凭据。

如果要将本地文件夹上传到 Zilliz Cloud，请选择**导入本地文件夹**，然后将文件夹拖到指定区域上传。注意，上传文件夹的最大尺寸为 1 GB。

![migrate_from_milvus_1x](/img/migrate_from_milvus_1x.png)

## 结果验证 {#result-verification}

如果迁移任务的状态从 **迁移中** 变更为 **成功**，则代表迁移成功。

Zilliz Cloud 仅支持 [AUTOINDEX](./autoindex-explained)。**AUTOINDEX** 是一种优化的索引算法，Zilliz Cloud 将使用此算法为您迁移的 Collection 自动创建索引。

Collection 加载后，您可以自行连接和管理 Collection。

## 相关文档 {#related-doc}

- [从 Milvus 2.x 迁移至 Zilliz Cloud](./migrate-from-milvus-2x)

- [AUTOINDEX](./autoindex-explained)

- [CU 类型](./cu-types-explained-1)

- [API 异同](./api-comparisons)

- [其他异同](./other-differences)

---
title: "FAQ：集群 | CLOUD"
slug: /faq-cluster
sidebar_label: "FAQ：集群"
beta: FALSE
notebook: FALSE
description: " | CLOUD"
type: origin
token: YVAzwqHdti7uHSkZL6icsY7hnpe
sidebar_position: 2

---

# FAQ：集群

本文列举了在使用 Zilliz Cloud 集群时可能遇到的常见问题及对应解决方法。

## 目录

- [集群创建完成后，是否能够修改集群 CU 类型？](#can-i-change-the-cu-type-after-my-dedicated-cluster-is-created)
- [如何为集群缩容？](#how-can-i-scale-down-my-cluster-cu-size)
- [为什么会连接超时以及如何处理连接超时报错？](#how-can-i-deal-with-a-connection-timeout-error-when-i-attempt-to-connect-to-zilliz-cloud)
- [为什么无法连接集群?](#why-cant-i-connect-to-the-cluster-after-the-cluster-is-created)
- [如何解决使用 Node.js SDK 无法连接 Zilliz Cloud 的问题?](#what-can-i-do-if-i-cannot-connect-to-zilliz-cloud-with-nodejs-sdk)
- [集群挂起后，是否还会收取费用？](#will-i-be-charged-if-i-suspend-my-cluster)

## 问答




### 集群创建完成后，是否能够修改集群 CU 类型？ \{#can-i-change-the-cu-type-after-my-dedicated-cluster-is-created}

不能。集群一旦创建完成，不可以修改其 CU 类型。如需修改集群 CU 类型，请使用以下替代方案。

1. 创建 1 个新集群。创建时选择你所需的 CU 类型。

1. [提交工单](https://support.zilliz.com.cn/hc/zh-cn)并请求将旧集群中的数据迁移至新集群中。请务必在邮件中注明源集群和目标集群的名称。

### 如何为集群缩容？ \{#how-can-i-scale-down-my-cluster-cu-size}

如果您需要缩小集群 CU 大小，请先创建一个新集群，并在创建时选择您需要的 CU 大小。随后，将原集群中的数据[迁移](./migrate-between-clusters#procedure)至新集群中。如在迁移过程中遇到任何问题，请[提交工单](https://support.zilliz.com.cn/hc/zh-cn)。

### 为什么会连接超时以及如何处理连接超时报错？ \{#how-can-i-deal-with-a-connection-timeout-error-when-i-attempt-to-connect-to-zilliz-cloud}

在以下情况下可能会发生连接超时错误：

- 网络条件不佳

    如网络条件不佳，建议在连接时调节 `timeout` 参数值。`timeout` 参数值默认为30秒。这意味着如果在发送连接请求后 30 秒内未收到响应，连接操作将超时。

- 连接参数不正确

    Zilliz Cloud 集群已启用 TLS。请确保在连接参数中加入 `secure`，并将其设置为 `true`。未正确设置改参数可能导致连接失败和超时。

- 未将本地 IP 地址加入白名单

    连接集群时，请确保关闭 VPN /代理，并已将获取到的公共 IP 地址（不可使用私有 IP 地址）加入集群白名单中。

### 为什么无法连接集群? \{#why-cant-i-connect-to-the-cluster-after-the-cluster-is-created}

无法连接集群时，请执行以下步骤排查故障：

1. 检查集群状态是否为**运行中**。集群在创建、删除过程中，您无法连接集群。集群白名单更新过程中，您也无法连接集群。

1. 确认已在白名单中设置 IP 地址。

1. 运行 `telnet in01-(uuid).(region).vectordb.cloud.zilliz.com.cn 19530` 测试端口是否可以连接。

如执行上述步骤后，仍无法连接集群，请[提交工单](https://support.zilliz.com.cn/hc/zh-cn)。

### 如何解决使用 Node.js SDK 无法连接 Zilliz Cloud 的问题? \{#what-can-i-do-if-i-cannot-connect-to-zilliz-cloud-with-nodejs-sdk}

如使用 Node.js SDK 无法连接 Zilliz Cloud，请执行以下步骤：

1. 确保您已安装最新版本的 [Node.js SDK](https://github.com/milvus-io/milvus-sdk-node)。

1. 确保您已初始化客户端。

    ```javascript
    const client = new MilvusClient('<https://your-db-address-with-port>', true, 'your-db-user', 'your-db-pasword');
    ```

### 集群挂起后，是否还会收取费用？ \{#will-i-be-charged-if-i-suspend-my-cluster}

集群挂起后，我们仅收取存储费用，不会收取计算费用。更多详情，请阅读 [Zilliz Cloud 定价](https://zilliz.com.cn/pricing)。

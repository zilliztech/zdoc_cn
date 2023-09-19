---
slug: /faqs-connection-and-access-control
sidebar_position: 1
---

# 连接与访问控制

本文列举了连接 Zilliz Cloud 时可能遇到的常见问题及对应解决方法。

**为什么会连接超时以及如何处理连接超时报错？**

在以下情况下可能会发生连接超时错误：

- 网络条件不佳
    如网络条件不佳，建议在连接时调节 `timeout` 参数值。`timeout` 参数值默认为30秒。这意味着如果在发送连接请求后 30 秒内未收到响应，连接操作将超时。

- 连接参数不正确
    Zilliz Cloud 集群已启用 TLS。请确保在连接参数中加入 `secure`，并将其设置为 `true`。未正确设置改参数可能导致连接失败和超时。

- 未将本地 IP 地址加入白名单
    连接集群时，请确保关闭 VPN /代理，并已将获取到的公共 IP 地址（不可使用私有 IP 地址）加入集群白名单中。

**为什么无法连接集群?**

无法连接集群时，请执行以下步骤排查故障：

1. 检查集群状态是否为**运行中**。集群在创建、删除过程中，您无法连接集群。集群白名单更新过程中，您也无法连接集群。

1. 确认已在白名单中设置 IP 地址。

1. 运行 `telnet in01-(uuid).(region).vectordb.zillizcloud.com 19530` 测试端口是否可以连接。

如执行上述步骤后，仍无法连接集群，请[提交工单](https://support.zilliz.com.cn/hc/zh-cn)。

**如何解决使用 Node.js SDK 无法连接 Zilliz Cloud 的问题?**

如使用 Node.js SDK 无法连接 Zilliz Cloud，请执行以下步骤：

1. 确保您已安装最新版本的 [Node.js SDK](https://github.com/milvus-io/milvus-sdk-node)。

1. 确保您已初始化客户端。
    ```javascript
    const client = new MilvusClient('<https://your-db-address-with-port>', true, 'your-db-user', 'your-db-pasword');
    ```

**如何解决连接时身份验证失败？**

请执行以下步骤解决连接时身份验证失败的问题：

1. 连接 Zilliz Cloud 集群时，请确保使用正确的用户名和密码。

1. 如忘记密码，请点击想要连接的集群并切换至 **Users** 选项卡。点击 **+ User** 以创建新用户和密码。
    ![create_user](/img/create_user.png)

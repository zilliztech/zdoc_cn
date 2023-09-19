---
slug: /faqs-bulk-insert-data
sidebar_position: 2
---

# 批量导入数据

本文列举了将数据批量导入 Zilliz Cloud 时可能遇到的常见问题及对应解决方法。

**如何将数据批量从 Elasticsearch 导入 Zilliz Cloud？**

请根据文档[从 Elasticsearch 迁移至 Zilliz Cloud](./migrate-from-elasticsearch)中的详细指南将数据从 Elasticsearch 迁移至 Zilliz Cloud。

**能否向 Zilliz Cloud 集群批量导入数据？**

目前，您只能使用 Zilliz Cloud 界面批量导入数据。更多详情，请阅读[批量导入数据](https://zilliverse.feishu.cn/wiki/MU2mw5IKsiGva9k7Ti5cn9shnFf)。

**在使用 Node.js SDK 导入数据或查询时，遇到 `ECONNRESET`错误该怎么办？**

请执行以下步骤，解决`ECONNRESET`错误问题：

1. 升级至支持 `channelOptions` 的最新版 Milvus NodeJS SDK。 

1. 手动添加 `channelOptions`。
    ```plaintext
    const channelOptions: ChannelOptions = {
    
    // Send keepalive pings every 10 seconds, default is 2 hours.'grpc.keepalive_time_ms': 10 * 1000,
    
    // Keepalive ping timeout after 5 seconds, default is 20 seconds.'grpc.keepalive_timeout_ms': 5 * 1000,
    
    // Allow keepalive pings when there are no gRPC calls.'grpc.keepalive_permit_without_calls': 1,
    
    };
    ```

1. 使用 `channelOptions` 初始化客户端。
    ```javascript
    import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node';
    
    new MilvusClient({
      address: 'your-zilliz-cloud-address',
      ssl: true,
      username: 'username',
      password: 'your-pass',
      channelOptions: channelOptions
    })`
    ```

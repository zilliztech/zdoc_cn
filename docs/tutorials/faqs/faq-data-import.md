---
slug: /faq-data-import
beta: null
notebook: null
token: YVAzwqHdti7uHSkZL6icsY7hnpe
sidebar_position: 4
---

# FAQ：数据导入

本文列举了在 Zilliz Cloud 导入数据时可能遇到的常见问题及对应解决方法。

## 目录

- [能否向 Zilliz Cloud 集群批量导入数据？](#can-i-bulk-insert-data-into-the-zilliz-cloud-vector-databases)
- [在使用 Node.js SDK 导入数据或查询时，遇到 `ECONNRESET`错误该怎么办？](#what-can-i-do-if-i-receive-econnreset-errors-when-importing-data-to-or-querying-zilliz-cloud-clusters-with-nodejs-sdk)

## 问答




### 能否向 Zilliz Cloud 集群批量导入数据？{#can-i-bulk-insert-data-into-the-zilliz-cloud-vector-databases}

目前，您只能使用 Zilliz Cloud 界面批量导入数据。更多详情，请参阅[通过 Web 控制台导入](./import-data-on-web-ui)、[通过 RESTful API 导入](./import-data-via-restful-api)和[通过 SDK 导入](./import-data-via-sdks)。

### 在使用 Node.js SDK 导入数据或查询时，遇到 `ECONNRESET`错误该怎么办？{#what-can-i-do-if-i-receive-econnreset-errors-when-importing-data-to-or-querying-zilliz-cloud-clusters-with-nodejs-sdk}

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

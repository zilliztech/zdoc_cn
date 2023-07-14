---
slug: /faqs/bulk-insert
sidebar_position: 2
---

# 批量导入数据

本文列举了将数据批量导入 Zilliz Cloud 时可能遇到的常见问题及对应解决方法。

**如何将数据批量从 Elasticsearch 导入 Zilliz Cloud？**

请执行以下步骤将数据批量从 Elasticsearch 导入 Zilliz Cloud

1. 连接至 Elasticsearch
  ```python
  print(fmt.format("start connecting to ElasticSearch"))
  
  es = Elasticsearch(hosts=ELASTICSEARCH_HOST)`
  ```

1. 使用 Elasticsearch [Scroll API](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/scroll-api.html) 获取数据并导入 Zilliz Cloud。以下示例代码展示如何将 Elasticsearch 数据导入 Zilliz Cloud 中的 `hello_milvus` Collection
  ```python
  print(fmt.format("Start inserting entities"))
  
  rng = np.random.default_rng(seed=19530)
  
  resp = es.search(index=ELASTICSEARCH_INDEX, query={"match_all": {}}, scroll="1m", size=500)
  
  scroll_id = resp["_scroll_id"]
  
  query = {
    "scroll": "1m",
    "scroll_id": scroll_id,
  }
  
  # Start the primary key from 0
  
  pk = 0
  
  while len(resp["hits"]["hits"]):
  
  l = len(resp["hits"]["hits"])
  
  entities = [[str(i + pk) for i in range(l)], rng.random(l).tolist()]
  
  embeddings = []
  
  for item in resp['hits']['hits']:
  
  embeddings.append(list(item["_source"].values()))
  
  entities.append(embeddings)
  
  insert_result = hello_milvus.insert(entities)
  
  print(insert_result)
  
  pk += l
  
  resp = es.scroll(scroll_id=scroll_id, scroll="1m")
  ```

1. 查看导入数据条数
  ```python
  hello_milvus.flush()
  
  print(f"Number of entities in Milvus: {hello_milvus.num_entities}")
  ```

**能否向 Zilliz Cloud 集群批量导入数据？**

目前，您只能使用 Zilliz Cloud 界面批量导入数据。Zilliz Cloud 暂不支持通过 SDK 批量导入数据。

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

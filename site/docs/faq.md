---
sidebar_position: 99
---

# 常见问题

## 快速入门

**免费试用结束后，我的数据是否会被删除？**

免费试用结束后，Zilliz Cloud 将自动备份您的数据并移至回收站，集群将被删除。回收站中的数据可免费保留30天。您可以通过 support@zilliz.com 联系我们以继续使用 Zilliz Cloud。

**性能型 CU、容量型 CU 和经济型 CU 之间有什么区别？**

性能型 CU 适用于需要低延迟和高吞吐量的向量相似性检索场景。 容量型 CU 相比性能型 CU 能够存储多 5 倍的数据，但延迟可能会增加，因此适用于需要大量存储空间的场景。 经济型 CU 可支持的数据规模与容量型 CU 一致，但价格更低，性能略有下降，适用于追求高性价比或预算敏感的场景。

**我的数据需要使用多少 CU？**

单个性能型 CU 可容纳约 500 万个 128 维向量或 100 万个 768 维向量。

单个容量型 CU 可容纳约 2500 万个 128 维向量或 500 万个 768 维向量。

单个经济型 CU 可容纳约 2500 万个 128 维向量或 500 万个768 维向量。

由于您的 Collection Schema 可能与上述指南中的不同，我们建议您根据实际数据测试不同的 CU 类型。

**如何获取技术支持？**

如需技术支持，请发送邮件至 [support@zilliz.com](mailto:support@zilliz.com)。您将在 24 小时内收到回复。

**什么是计算单元（Compute Unit, CU）?**

计算单元（CU）是指用于提供向量检索、分析服务的一组硬件资源。可以将 CU 视为一个物理查询节点。

**Zilliz Cloud 支持哪些相似度类型？**

Zilliz Cloud支持 2 种相似度类型。

1. 欧式距离（Euclidean）计算两条向量间的欧式距离。计算结果越小，两个向量越相似。

1. 内积（Inner Product）将两条向量相乘。计算结果为正数，两个向量越相似。

**集合加载为何失败，如何解决？**

集合加载失败由集群内存不足引起。我们建议您扩展集群 CU 大小。

**集合加载请求的****并发****是多少？如何增加并发请求的数量？**

当前，Zilliz Cloud 加载集合请求的速率限制为每秒 1 个。该建议数值仅针对 1 CU 的集群。如需增加并发请求的数量，请通过 [support@zilliz.com](mailto:support@zilliz.com) 联系我们。

**1 CU 集群中最多可创建多少个 Collection？**

1 CU 集群中，您最多可以创建 32 个 Collection。

**如何为集群缩容？**

如果您需要降低集群 CU 大小，请通过 [support@zilliz.com](mailto:support@zilliz.com) 联系我们。我们将在 8 小时以内为您的集群缩容。

**如何为创建的 Collection 设置存留时间（TTL）属性？**

您可以使用我们的PyMilvus SDK通过提供参数collection.ttl.seconds的值来设置集合的TTL。

以下示例将TTL设置为1800秒。

**Zilliz Cloud支持哪种索引类型？**

目前，Zilliz Cloud 仅支持 AUTOINDEX。AUTOINDEX 可以增强搜索性能。对于具有 100 万 768维向量的性能型集群，QPS 可达到几百，延迟低于 100 毫秒。对于相同数据量的容量型集群，QPS 可达到50，延迟超过 200 毫秒。有关更多详细信息，请参见[AUTOINDEX](https://zilliverse.feishu.cn/wiki/YUETwzDssiTUs9kCSn4cgUYLnrd) 。

如果您十分熟悉[此处](https://milvus.io/docs/index.md)罗列的索引类型并想要使用这些索引类型，请通过 [support@zilliz.com](mailto:support@zilliz.com) 联系我们。

**Zilliz Cloud 搜索延迟是多少？**

通常，具有 500 万 768 维向量的容量型集群，其搜索延迟约为 100 毫秒。相同数据量和维数的性能型集群，搜索延迟约为 20 毫秒。但请注意，实际搜索延迟可能因您的工作负载和部署环境而有所不同。

## 连接与访问控制

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

1. 运行 `telnet in01-(uuid).(region).vectordb.zillizcloud.com:19530` 测试端口是否可以连接。

如执行上述步骤后，仍无法连接集群，请通过 [support@zilliz.com](mailto:support@zilliz.com) 联系我们。

**如何解决使用 Node.js ****SDK**** 无法连接 Zilliz Cloud 的问题?**

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

## 批量导入数据

**如何将数据批量从 Elasticsearch 导入 Zilliz Cloud？**

请执行以下步骤将数据批量从 Elasticsearch 导入 Zilliz Cloud

1. 连接至 Elasticsearch
  ```javascript
  print(fmt.format("start connecting to ElasticSearch"))
  
  es = Elasticsearch(hosts=ELASTICSEARCH_HOST)`
  ```

1. 使用 Elasticsearch [Scroll API](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/scroll-api.html) 获取数据并导入 Zilliz Cloud。以下示例代码展示如何将 Elasticsearch 数据导入 Zilliz Cloud 中的 `hello_milvus` Collection
  ```javascript
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
  ```javascript
  hello_milvus.flush()
  
  print(f"Number of entities in Milvus: {hello_milvus.num_entities}")
  ```

**能否向 Zilliz Cloud 集群批量导入数据？**

目前，您只能使用 Zilliz Cloud 界面批量导入数据。Zilliz Cloud 暂不支持通过 SDK 批量导入数据。

**在使用 Node.js ****SDK**** 导入数据或查询时，遇到 **`**ECONNRESET**`**错误该怎么办？**

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

## AI 模型集成

**Zilliz Cloud 是否支持集成 LangChain？**

Zilliz Cloud 支持集成 LangChain。更多详情，请阅读[与 LangChain 集成搭建智能文档问答系统](https://zilliverse.feishu.cn/wiki/Msbqwd1izicbFlkT56scmGlWnbb) 。

## 监控与指标

**为什么删除 Collection 后，内存用量依旧保持不变？**

删除的 Collection 数据将于 24 小时后被彻底清理。如果内存用量在 24 小时后仍未下降，请通过 [support@zilliz.com](mailto:support@zilliz.com) 联系我们。

## 用户和角色

**如何邀请同事或团队成员进行协作？**

如果您是组织管理员，请在左侧导航栏点击**成员**并邀请用户加入组织。

如果您是组织成员，请联系您所在组织的管理员邀请用户加入组织。

此外，Zilliz Cloud 还支持邀请用户加入项目。如果您是项目管理员，请点击左侧导航栏**项目成员**邀请用户加入项目。

## 定价

**赠送的 ¥ 300 免费额度是否会过期？**

在首次注册后，您可获赠¥ 300 免费额度，有效期 30 天。

**Zilliz Cloud 如何处理不活跃集群？**

Zilliz Cloud 会自动挂起 7 天内不活跃集群，并发送邮件通知。您可随时按需恢复集群。

**如何避免未使用的集群产生费用？**

建议您挂起未使用的集群以节省成本。您可随时按需恢复集群。

**如何估算使用 Zilliz Cloud 的成本？**

请使用[价格计算器](https://zilliz.com/pricing)估算使用成本。

**数据被移至回收站后是否收费？**

回收站中删除的数据不收取费用。

## 账号

**如何删除账号？**

如需删除账号，请通过 [support@zilliz.com](mailto:support@zilliz.com) 联系我们。

**我的帐号为什么被锁定了？如何解锁账号？**

登录时，密码输入错误 3 次，您的账号会被锁定。

如需解锁账号，请选择以下 1 种方法：

1. 等待 1 小时后您的账号将自动解锁。

1. 如果忘记密码，请重置密码。

1. 联系[support@zilliz.com](mailto:support@zilliz.com)以解锁您的帐户。

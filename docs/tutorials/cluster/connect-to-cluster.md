---
slug: /connect-to-cluster
beta: FALSE
notebook: FALSE
type: origin
token: HU31wDHCCiN9qIknZ2fcLmconNh
sidebar_position: 2
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 连接集群

本文介绍如何连接到 Zilliz Cloud 集群。

## 开始前{#before-you-start}

请确保已完成以下步骤：

- 已注册 Zilliz Cloud 账户。详情请参见[注册账号](./register-with-zilliz-cloud)。

- 已创建集群。详情请参见[创建集群](./create-cluster)。

- 已获取集群的用户名和密码。详情请参见[通过 Web UI 管理身份凭证](./manage-cluster-credentials-console)。

- 已安装合适版本的 Milvus SDK。详情请参见[安装 SDK](./install-sdks)。

- 阅读本指南系列时，建议下载[代码示例](https://assets.zilliz.com/zdoc/zilliz_cloud_sdk_examples.zip)。

## 操作步骤{#connect-to-a-cluster}

您可以通过公网地址和创建集群时指定的用户名和密码连接到集群。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"Bash","value":"bash"}]}>
<TabItem value='python'>

<Tabs groupId="python" defaultValue='python' values={[{"label":"Starter API","value":"python"},{"label":"Advanced API","value":"python_1"}]}>
<TabItem value='python'>

```python
# Connect using a MilvusClient object
from pymilvus import MilvusClient
CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT" # Set your cluster endpoint
TOKEN="YOUR_CLUSTER_TOKEN" # Set your token

# Initialize a MilvusClient instance
# Replace uri and API key with your own
client = MilvusClient(
    uri=CLUSTER_ENDPOINT, # Cluster endpoint obtained from the console
    token=TOKEN # API key or a colon-separated cluster username and password
)

```

</TabItem>
<TabItem value='python_1'>

```python
# Connect with a connections object
from pymilvus import connections

connections.connect(
  alias='default', 
  #  Public endpoint obtained from Zilliz Cloud
  uri=CLUSTER_ENDPOINT,
  # API key or a colon-separated cluster username and password
  token=TOKEN, 
)
```

</TabItem>
</Tabs>
</TabItem>

<TabItem value='javascript'>

```javascript
const { MilvusClient } = require("@zilliz/milvus2-sdk-node")

const address = "YOUR_CLUSTER_ENDPOINT"
const token = "YOUR_CLUSTER_TOKEN"

async function main () {

    // Connect to the cluster
    const client = new MilvusClient({address, token})
    
}
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.client.MilvusServiceClient;
import io.milvus.param.ConnectParam;

public final class QuickStartDemo {

    public static void main(String[] args) {
        String clusterEndpoint = "YOUR_CLUSTER_ENDPOINT";
        String token = "YOUR_CLUSTER_TOKEN";

        // 1. Connect to Zilliz Cloud

        ConnectParam connectParam = ConnectParam.newBuilder()
            .withUri(clusterEndpoint)
            .withToken(token)
            .build();   
            
        MilvusServiceClient client = new MilvusServiceClient(connectParam);

        System.out.println("Connected to Zilliz Cloud!");

        // Output:
        // Connected to Zilliz Cloud!
        
    }
    
 }

```

</TabItem>

<TabItem value='go'>

```go
import "github.com/milvus-io/milvus-sdk-go/v2/client"

func main() {
    CLUSTER_ENDPOINT := "YOUR_CLUSTER_ENDPOINT"
    TOKEN := "YOUR_CLUSTER_TOKEN"
    COLLNAME := "medium_articles_2020"

    // 1. Connect to cluster

    connParams := client.Config{
        Address: CLUSTER_ENDPOINT,
        APIKey:  TOKEN,
    }

    conn, err := client.NewClient(context.Background(), connParams)

    if err != nil {
        log.Fatal("Failed to connect to Zilliz Cloud:", err.Error())
    }
}
```

</TabItem>

<TabItem value='bash'>

```bash
# token="username:password" or token="your-api-key"
curl --request GET \\
    --url "${PUBLIC_ENDPOINT}/v1/vector/collections" \\
    --header "Authorization: Bearer ${TOKEN}" \\
    --header 'accept: application/json' \\
    --header 'content-type: application/json'
```

</TabItem>
</Tabs>

## 相关文档{#related-topics}

- [创建 Collection](./create-collection)

- [插入 Entity](./insert-entities)

- [向量搜索和查询](./search-query-and-get)

- [删除 Collection](./drop-collection)


---
title: "集群扩缩容 | BYOC"
slug: /scale-cluster
sidebar_label: "集群扩缩容"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "随着工作负载增长和数据写入量的增加，集群可能会达到容量上限。在这种情况下，读取操作仍可正常进行，但新的写入请求可能会失败。 | BYOC"
type: origin
token: MeCPwj8n0i2x1BksjOHc3OKRn55
sidebar_position: 5
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 管理

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

# 集群扩缩容

随着工作负载增长和数据写入量的增加，集群可能会达到容量上限。在这种情况下，读取操作仍可正常进行，但新的写入请求可能会失败。

为实现主动管理，您可以在监控页面查看 **CU 加载容量**，判断是否需要扩容。根据业务需求和访问模式，您可以上调 Query CU 数量以扩大集群容量，或在需求量减少时下调 Query CU 数量以降低成本。

注意：对于 1-8 CU 的集群，请直接进行集群扩缩容。对于超过 8 CU 的集群，请增加 [Replica 数量](./manage-replica)。

本指南将介绍如何根据变化的工作负载调整集群 Query CU 数量。

### 注意事项\{#considerations}

- **扩缩容过程中**：集群状态将变为“修改中”，在此期间无法执行任何操作。如触发多个扩缩容任务，将按触发时间顺序依次处理。扩缩容任务完成时间取决于数据量。

- **性能影响**：扩缩容过程中可能会出现轻微的服务抖动。

- **备份限制**：动态和定时扩缩容设置不会包含在备份中。恢复集群后需要重新手动配置。

### 手动扩缩容\{#manual-scaling}

您可以通过 Zilliz Cloud 控制台或 RESTful API 手动扩展或缩减集群的 Query CU 数量。注意：定时扩缩容仅支持通过 Web 控制台设置。

以下是手动扩缩容的限制与注意事项：

- **扩容**

    - Dedicated 企业版集群：最多支持 256  Query CU

    - **Query CU 数量 × Replica 数量**的乘积不得超过 256。

    如需更大 Query CU 数量，请[联系销售](http://zilliz.com.cn/contact-sales)。

- **缩容**

    - 对于已设置多副本（Replica）的集群，Query CU 数量不得缩减到低于 8 CU。

    - 缩容请求仅在满足以下条件时才会成功：

        - 当前数据量 < 缩容后 [CU 加载容量](./metrics-alerts-reference)的 80%。

        - 当前 Collection 和 Partition 数量小于新 Query CU 数量所支持的最大 Collection 和 Partition 数。

#### 通过 Web 控制台\{#via-web-console}

以下 Demo 展示了如何在 Zilliz Cloud Web 控制台中手动扩容或缩容集群。

<Supademo id="cmd2tmxru37t9c4kjvmhe8n6f?utm_source=link" title=""  />

<Admonition type="info" icon="📘" title="说明">

<p>当您在 <strong>Query Node CU 扩缩容</strong>对话框中单击<strong>保存</strong>后，您将看到自动弹出的<strong>检查项目资源配额</strong>窗口。如果当前项目的资源充足，该窗口在检查完成后会自动消失。如果资源不足，您可以：</p>
<ul>
<li><p>单击<strong>前往项目资源设置</strong>按钮，以便编辑当前项目的资源设置，或者</p></li>
<li><p>单击<strong>返回上一步</strong>按钮，以便编辑当前集群的相关设置。</p></li>
</ul>
<p>操作期间会消耗少量额外资源，并在操作完成后释放。</p>

</Admonition>

#### 通过 RESTful API\{#via-restful-api}

以下示例将现有集群扩展为 2  CU。详情请见[修改集群配置](/reference/restful/modify-cluster-v2)。

```bash
export TOKEN="YOUR_API_KEY"
export CLUSTER_ID="inxx-xxxxxxxxxxxxxxx"

curl --request POST \
--url "${BASE_URL}/v2/clusters/${CLUSTER_ID}/modify" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
-d '{
    "cuSize": 2
}'
```

以下为示例返回结果：

```bash
{
    "code": 0,
    "data": {
        "clusterId": "inxx-xxxxxxxxxxxxxxx",
        "prompt": "successfully submitted. Cluster is being upgraded, which is expected to take several minutes. You can access data about the creation progress and status of your cluster by DescribeCluster API. Once the cluster status is RUNNING, you may access your vector database using the SDK."
    }
}
```


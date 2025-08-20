---
title: "管理集群 | Cloud"
slug: /manage-cluster
sidebar_label: "管理集群"
beta: FALSE
notebook: FALSE
description: "本文介绍如了集群的生命周期，以便您能够充分利用 Zilliz Cloud 控制台来管理集群。 | Cloud"
type: origin
token: IRirwe30tilo1qkJlR7ca2MUnvn
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 管理

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Supademo from '@site/src/components/Supademo';

# 管理集群

本文介绍如了集群的生命周期，以便您能够充分利用 Zilliz Cloud 控制台来管理集群。

## 重命名集群{#rename-cluster}

前往目标集群的**集群详情**页并跟随以下指南对集群进行重命名。

<Supademo id="cm9uqn1k801p1wbbizszfx673" title="Zilliz Cloud - 重命名集群 Demo" />

## 挂起集群{#suspend-cluster}

对于运行中的 Dedicated 集群，系统会根据其 CU 和存储用量计费。为了节省成本，您可以选择挂起集群。集群挂起后，仅收取存储费用。

<Admonition type="info" icon="📘" title="说明">

<p>包年包月的 Dedicated 集群不支持挂起。</p>

</Admonition>

请注意，在集群处于“挂起中”的状态时，您无法对集群进行其他操作。

您可以通过 Web 控制台或使用 RESTful API 和 SDK 挂起 Dedicated 集群。

<Tabs groupId="cluster" defaultValue="console" values={[{"label":"Cloud 控制台","value":"console"},{"label":"cURL","value":"bash"}]}>

<TabItem value="console">

前往目标集群的**集群详情**页，并跟随以下指南挂起 Dedicated 集群。

<Supademo id="cm9uraerl02a5wbbiavqhws6u" title="Zilliz Cloud - 挂起集群 Demo" />

</TabItem>

<TabItem value="bash">

以下为示例代码，请将示例中的 `{API_KEY}` 替换为您自己的Zilliz Cloud API 密钥。

以下 `POST` 通过请求体挂起了 Dedicated 集群。

```bash
curl --request POST \
     --url "https://api.cloud.zilliz.com.cn/v2/clusters/${CLUSTER_ID}/suspend" \
     --header "Authorization: Bearer ${API_KEY}" \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \

# {
#     "code": 0,
#     "data": {
#         "clusterId": "inxx-xxxxxxxxxxxxxxx",
#         "prompt": "Successfully Submitted. The cluster will not incur any computing costs when suspended. You will only be billed for the storage costs during this time."
#     }
# }     
```

以下为参数说明：

- `{API_KEY}`：用于验证 API 请求的鉴权信息。请使用您自己的 Zilliz Cloud API 密钥。

- `{CLUSTER_ID}`: 需要挂起的 Dedicated 集群的 ID。

更多详细信息，请参考[挂起集群](/reference/restful/suspend-cluster-v2)。

</TabItem>

</Tabs>

## 恢复运行集群{#resume-cluster}

Free 集群在 7 天不活跃后会自动挂起，您可以随时恢复运行集群。

Serverless 集群不支持挂起和恢复运行的操作。

Dedicated 集群在手动挂起后也按需手动恢复运行。

<Admonition type="info" icon="📘" title="说明">

<p>包年包月的 Dedicated 集群不支持挂起或恢复运行。</p>

</Admonition>

请注意，在集群处于“恢复运行中”的状态下，您无法对集群进行其他操作。

您可以通过 Web 控制台或使用 RESTful API 和 SDK 恢复运行集群。

<Tabs groupId="cluster" defaultValue="console" values={[{"label":"Cloud 控制台","value":"console"},{"label":"cURL","value":"bash"}]}>

<TabItem value="console">

前往目标集群的**集群详情**页，并跟随以下指南恢复运行集群。

<Supademo id="cm9urqadl02ifwbbijvvktj23" title="Zilliz Cloud - 恢复运行集群 Demo" />

</TabItem>

<TabItem value="bash">

以下为示例代码，请将示例中的 `{API_KEY}` 替换为您自己的Zilliz Cloud API 密钥。

以下 `POST` 通过请求体将集群回复运行。

```bash
curl --request POST \
     --url "https://api.cloud.zilliz.com.cn/v2/clusters/${CLUSTER_ID}/resume" \
     --header "Authorization: Bearer ${API_KEY}" \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \

# {
#     "code": 0,
#     "data": {
#         "clusterId": "inxx-xxxxxxxxxxxxxxx",
#         "prompt": "successfully Submitted. Cluster is being resumed, which is expected to takes several minutes. You can access data about the creation progress and status of your cluster by DescribeCluster API. Once the cluster status is RUNNING, you may access your vector database using the SDK."
#     }
# }     
```

以下为参数说明：

- `{API_KEY}`：用于验证 API 请求的鉴权信息。请使用您自己的 Zilliz Cloud API 密钥。

- `{CLUSTER_ID}`: 需要恢复运行的集群的 ID。

更多详细信息，请参考[恢复集群](/reference/restful/resume-cluster-v2)。

</TabItem>

</Tabs>

## 升级版本{#upgrade-plan}

如需使用更多高级功能，建议您升级集群版本。

<table>
   <tr>
     <th><p><strong>版本升级</strong></p></th>
     <th><p><strong>说明</strong></p></th>
   </tr>
   <tr>
     <td><p>Free 升级至 Serverless</p></td>
     <td><p>您的 Free 集群将升级为 Serverless 版本。集群升级后，无法降级回原版本。</p></td>
   </tr>
   <tr>
     <td><p>Free 升级至 Dedicated</p></td>
     <td><p>系统将创建一个新的 Dedicated 集群，并自动迁移您现有 Free 集群中的数据。原有的 Free 集群将被保留。</p><p>请务必在应用程序代码中更新集群的 Endpoint 信息。</p></td>
   </tr>
   <tr>
     <td><p>Serverless 升级至 Dedicated</p></td>
     <td><p>系统将创建一个新的 Dedicated 集群，并自动迁移您现有 Serverless 集群中的数据。原有的 Serverless 集群将被保留。</p><p>请务必在应用程序代码中更新集群的 Endpoint 信息。</p></td>
   </tr>
</table>

以下 Demo 以 Free 至 Dedicated 升级为例展示了如何升级集群版本。

## 升级集群兼容版本以试用公测版功能{#upgrade-cluster-for-preview-features}

如需试用公测版新功能，请升级 Dedicated 集群的兼容 Milvus 版本。

![upgrade-to-preview-version-cn](/img/upgrade-to-preview-version-cn.png)

## 删除集群{#drop-cluster}

您可以删除不再需要的集群。您可以通过 Web 控制台或使用 RESTful API 和 SDK 删除集群。

<Tabs groupId="cluster" defaultValue="console" values={[{"label":"Cloud 控制台","value":"console"},{"label":"cURL","value":"bash"}]}>

<TabItem value="console">

前往目标集群的**集群详情**页，并跟随以下指南删除集群。

<Supademo id="cm9us4mn102n1wbbinzd427jg" title="Zilliz Cloud - Resume Cluster Demo" />

</TabItem>

<TabItem value="bash">

以下为示例代码，请将示例中的 `{API_KEY}` 替换为您自己的Zilliz Cloud API 密钥。

以下 `DELETE` 通过请求体删除了集群。

```bash
curl --request POST \
     --url "https://api.cloud.zilliz.com.cn/v2/clusters/${CLUSTER_ID}/drop" \
     --header "Authorization: Bearer ${API_KEY}" \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \

# {
#     "code": 0,
#     "data": {
#         "clusterId": "inxx-xxxxxxxxxxxxxxx",
#         "prompt": "The cluster has been deleted. If you consider this action to be an error, you have the option to restore the deleted cluster from the recycle bin within a 30-day period. Kindly note, this recovery feature does not apply to free clusters."
#     }
# }     
```

以下为参数说明：

- `{API_KEY}`：用于验证 API 请求的鉴权信息。请使用您自己的 Zilliz Cloud API 密钥。

- `{CLUSTER_ID}`: 需要恢复运行的集群的 ID。

更多详细信息，请参考[删除集群](/reference/restful/drop-cluster-v2)。

</TabItem>

</Tabs>


---
title: "集群 | Cloud"
slug: /on-demand-cluster
sidebar_key: on-demand-cluster
sidebar_label: "集群"
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
beta: PUBLIC
notebook: FALSE
description: "集群是一组用于运行您的向量数据库工作负载的计算资源。Zilliz Cloud 提供两种类型的集群：Serving 集群和 On-demand 集群。其中，Serving 集群始终保持运行，适用于需要始终在线、低延迟访问的生产工作负载；On-demand 集群仅在请求到达时启动，并在空闲时缩容至 0 CU。 | Cloud"
type: origin
token: DpRYwPrYpiWRBukM4tOcJn7knQf
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 按需计算
  - 集群

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

import Procedures from '@site/src/components/Procedures';

# 集群

集群是一组用于运行您的向量数据库工作负载的计算资源。Zilliz Cloud 提供两种类型的集群：Serving 集群和 On-demand 集群。其中，Serving 集群始终保持运行，适用于需要始终在线、低延迟访问的生产工作负载；On-demand 集群仅在请求到达时启动，并在空闲时缩容至 0 CU。

本主题说明如何创建 On-demand 集群。

<Admonition type="info" icon="📘" title="说明">

此功能仅适用于**企业版**项目。

目前，您只能在阿里云华北2（北京）和阿里云华东2（上海）创建 On-demand 集群。如需其他地域，请[联系我们](http://zilliz.com.cn/contact-sales)。

</Admonition>

## 使用限制\{#limitations}

- 如需管理 On-demand 集群，您需要具备**项目管理员**权限。

- 每个项目中最多只能创建 20 个 On-demand 集群。

- 每 8 个 Query CU 的 On-demand 集群最多可查询 3 TB 原始数据。超过此限制的查询将报错。

## 创建 On-demand 集群\{#create-an-on-demand-cluster}

- **通过 RESTful API**

    ```plaintext
    curl --request POST \
    --url "${BASE_URL}/v2/clusters/createOnDemandCluster" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "Request-Timeout: 5" \
    --header "Content-Type: application/json" \
    -d '{
        "projectId": "proj-xxxxxxxxxxxxxxxxxxx",
        "regionId": "ali-cn-hangzhou",
        "clusterName": "my-on-demand",
        "cuSize": 8,
        "autoSuspend": 60,
        "description": "A cluster for vector search workloads."
    }'
    ```

    下表为参数说明。

    <table>
       <tr>
         <th><p><strong>参数</strong></p></th>
         <th><p><strong>说明</strong></p></th>
       </tr>
       <tr>
         <td><p><code>projectId</code></p></td>
         <td><p>待创建的 On-demand 集群所属项目的 ID。</p></td>
       </tr>
       <tr>
         <td><p><code>regionId</code></p></td>
         <td><p>集群部署地域。必须与项目地域一致。</p></td>
       </tr>
       <tr>
         <td><p><code>cuSize</code></p></td>
         <td><p>要分配的 Query CU 数量。集群会根据工作负载在 0 和该值之间自动伸缩：当收到请求时，扩容到指定的 Query CU 大小；空闲时缩容至 0。</p><p>最小值为 8 CU，最大值为 256 CU，并且必须以 8 为梯度递增（例如 8、16、24）。超过 8 CU 的集群需要添加支付方式。</p><p>将此值设置为 8 可支持对最多 3 TB 数据的查询；若要提升可查询的数据量，请增加 Query CU 大小。该值在创建后固定，无法更改。</p></td>
       </tr>
       <tr>
         <td><p><code>clusterName</code></p></td>
         <td><p>要创建的集群名称。</p></td>
       </tr>
       <tr>
         <td><p><code>autoSuspend</code></p></td>
         <td><p>集群自动挂起前的空闲超时时间。如果在此期间未收到任何请求，集群将自动挂起，以停止产生计算费用。</p><ul><li><p>字段类型：整数</p></li><li><p>单位：秒</p></li><li><p>最小值：60</p></li><li><p>默认值：60 </p></li></ul></td>
       </tr>
       <tr>
         <td><p><code>description</code>（可选）</p></td>
         <td><p>要创建的集群描述。最多 255 字符。</p></td>
       </tr>
    </table>

    以下为输出示例。

    ```json
    {
        "code": 0,
        "data": {
            "clusterId": "inxx-xxxxxxxxxxxxxxx",
            "prompt": "Successfully submitted. The on-demand cluster is being created. Use the Describe On-Demand Cluster API to check its creation progress and status. Once the cluster status is RUNNING, use your API key to access the on-demand cluster."
        }
    }
    ```

- **通过 Web 控制台**

    以下 Demo 展示了如何在 Web 控制台中创建 On-demand 集群。

    <Supademo id="cmpdtkz4y0o8mqm8qd5ytywb4" title=""  />

    <Procedures>

    1. 点击**按需计算 > 集群**。

    1. 点击 **+ 集群**。

    1. 配置集群。

        下表为参数说明。

        <table>
           <tr>
             <th><p><strong>参数</strong></p></th>
             <th><p><strong>说明</strong></p></th>
           </tr>
           <tr>
             <td><p>集群名称</p></td>
             <td><p>要创建的集群名称。</p></td>
           </tr>
           <tr>
             <td><p>集群描述（可选）</p></td>
             <td><p>要创建的集群描述。最多 255 字符。</p></td>
           </tr>
           <tr>
             <td><p>Query CU</p></td>
             <td><p>要分配的 Query CU 数量。集群会根据工作负载在 0 和该值之间自动伸缩：当收到请求时，扩容到指定的 Query CU 大小；空闲时缩容至 0。</p><p>最小值为 8 CU，最大值为 256 CU，并且必须以 8 为梯度递增（例如 8、16、24）。超过 8 CU 的集群需要添加支付方式。</p><p>将此值设置为 8 可支持对最多 3 TB 数据的查询；若要提升可查询的数据量，请增加 Query CU 大小。该值在创建后固定，无法更改。</p></td>
           </tr>
           <tr>
             <td><p>自动挂起</p></td>
             <td><p>集群自动挂起前的空闲时间（以秒为单位）。默认值为 1 分钟。如果在此期间未收到任何请求，集群将自动挂起，以停止产生计算费用。</p></td>
           </tr>
        </table>

    1. 点击**创建**。

    </Procedures>

## 查看全部 On-demand 集群\{#view-all-on-demand-clusters}

- **通过 RESTful API**

    您可以按如下方式列出所有 On-demand 集群：

    ```plaintext
    curl --request GET \
         --url "${BASE_URL}/v2/clusters/onDemandClusters?projectId=proj-xxxxxxxxxxxxxxx&regionId=ali-cn-hangzhou" \
         --header "Authorization: Bearer ${TOKEN}" \
         --header "Accept: application/json"
    ```

     以下是输出示例。

    ```plaintext
    {
        "code": 0,
        "data": {
            "count": 2,
            "onDemandClusters": [
                {
                    "projectId": "proj-xxxxxxxxxxxxxxx",
                    "clusterId": "inxx-xxxxxxxxxxxxxxx",
                    "clusterName": "Cluster-01",
                    "regionId": "ali-cn-hangzhou",
                    "cuSize": 8,
                    "status": "RUNNING",
                    "endpoint": "https://proj-xxxxxxxxxxxxxxx.ali-cn-hangzhou.zillizcloud.com",
                    "privateLink": "",
                    "createdBy": "john.doe@zilliz.com.cn",
                    "createTime": "2024-04-21T10:15:15Z",
                    "autoSuspend": 60,
                    "description": "An on-demand cluster for vector search workloads."
                },
                {
                    "projectId": "proj-xxxxxxxxxxxxxxx",
                    "clusterId": "inxx-xxxxxxxxxxxxxxx",
                    "clusterName": "Cluster-02",
                    "regionId": "ali-cn-hangzhou",
                    "status": "RUNNING",
                    "cuSize": 8,
                    "endpoint": "https://proj-xxxxxxxxxxxxxxx.ali-cn-hangzhou.zillizcloud.com",
                    "privateLink": "",
                    "createdBy": "john.doe@zilliz.com.cn",
                    "createTime": "2024-04-21T10:15:16Z",
                    "autoSuspend": 60,
                    "description": "An on-demand cluster for vector search workloads."
                }
            ]
        }
    }
    ```

- **通过 Web 控制台**

    ![J5GCwPH9Bh6FI8bcvEwcsSqenAx](https://zdoc-images.oss-cn-hangzhou.aliyuncs.com/J5GCwPH9Bh6FI8bcvEwcsSqenAx.png)

    <Procedures>

    1. 前往目标项目，点击**按需计算 > 集群**。

    1. 您可以查看全部现有 On-demand 集群。

    </Procedures>

## 查看 On-demand 集群详情\{#check-the-details-of-an-on-demand-cluster}

- **通过 RESTful API**

    您可以按如下方式查看 On-demand 集群 详情：

    ```plaintext
    curl --request GET \
         --url "https://${BASE_URL}/v2/on-demand-compute?projectId=proj-09ee1f4b1151d5dd1edbc5&regionId=ali-cn-hangzhou" \
         --header "Authorization: Bearer ${API_KEY}" \
         --header "Accept: application/json"
    ```

    以下是输出示例。

    ```plaintext
    {
      "code": 0,
      "data": {
        "projectId": "proj-09ee1f4b1151d5dd1edbc5",
        "regionId": "ali-cn-hangzhou",
        "status": "enabled"
      }
    }
    ```

- **通过 Web 控制台**

    ![FvjhwLa0rh32Jfbhusocb2Ien3e](https://zdoc-images.oss-cn-hangzhou.aliyuncs.com/FvjhwLa0rh32Jfbhusocb2Ien3e.png)

    <Procedures>

    1. 前往目标项目，点击**按需计算 > 集群**。

    1. 点击目标 On-demand 集群

    1. 查看详情。

    </Procedures>

## 重命名 On-demand 集群\{#rename-an-on-demand-cluster}

- **通过 RESTful API**

    以下示例展示如何修改集群名称。详情请参考[更新按需集群信息](/reference/restful/update-on-demand-cluster-info-v2)。

    ```bash
    curl --request PATCH \
    --url "${BASE_URL}/v2/clusters/onDemandClusters/${CLUSTER_ID}" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "OrgId: org-xxxxxxxxxxxxxxxxxxx" \
    --header "Content-Type: application/json" \
    -d '{
        "clusterName": "New Cluster Name"
    }'
    ```

    以下为输出示例。

    ```json
    {
        "code": 0,
        "data": {
            "clusterId": "inxx-xxxxxxxxxxxxxxx",
            "prompt": "successfully submitted. Cluster is being upgraded, which is expected to take several minutes. You can access data about the creation progress and status of your cluster by DescribeCluster API. Once the cluster status is RUNNING, you may access your vector database using the SDK."
        }
    }
    ```

- **通过 Web 控制台**

    <Procedures>

    1. 前往目标 On-demand 集群。

    1. 点击**操作**，选择**重命名**。

        ![R5jNbjN86oG8wOxfavzczIGRnZb](https://zdoc-images.oss-cn-hangzhou.aliyuncs.com/R5jNbjN86oG8wOxfavzczIGRnZb.png "R5jNbjN86oG8wOxfavzczIGRnZb")

    1. 输入集群新名称，点击**保存**。

        ![UYlPbSpzFoVhqLx4My5cLXbaneh](https://zdoc-images.oss-cn-hangzhou.aliyuncs.com/UYlPbSpzFoVhqLx4My5cLXbaneh.png "UYlPbSpzFoVhqLx4My5cLXbaneh")

    </Procedures>

## 修改 On-demand 集群描述\{#edit-the-description-of-an-on-demand-cluster}

- **通过 RESTful API**

    以下示例展示如何修改集群名称。详情请参考[更新按需集群信息](/reference/restful/update-on-demand-cluster-info-v2)。

    ```bash
    curl --request PATCH \
    --url "${BASE_URL}/v2/clusters/onDemandClusters/${CLUSTER_ID}" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "OrgId: org-xxxxxxxxxxxxxxxxxxx" \
    --header "Content-Type: application/json" \
    -d '{
        "description": ""
    }'
    ```

    以下为输出示例。

    ```json
    {
        "code": 0,
        "data": {
            "clusterId": "inxx-xxxxxxxxxxxxxxx",
            "prompt": "successfully submitted. Cluster is being upgraded, which is expected to take several minutes. You can access data about the creation progress and status of your cluster by DescribeCluster API. Once the cluster status is RUNNING, you may access your vector database using the SDK."
        }
    }
    ```

- **通过 Web 控制台**

    <Procedures>

    1. 前往目标按需计算集群。

    1. 鼠标悬浮至集群描述，点击**编辑**按钮。

        ![OloKbRwo0oaehBx5rMnc2NYvnif](https://zdoc-images.oss-cn-hangzhou.aliyuncs.com/OloKbRwo0oaehBx5rMnc2NYvnif.png "OloKbRwo0oaehBx5rMnc2NYvnif")

    1. 输入集群新描述，点击**保存**。

        ![QL4ObN2PgowOfDxC1hCcOAAynJe](https://zdoc-images.oss-cn-hangzhou.aliyuncs.com/QL4ObN2PgowOfDxC1hCcOAAynJe.png "QL4ObN2PgowOfDxC1hCcOAAynJe")

    </Procedures>

## 删除 On-demand 集群\{#drop-an-on-demand-cluster}

<Admonition type="danger" icon="🚧" title="警告">

删除集群后，系统会立即将其移除，且无法恢复。此操作不可撤销。

</Admonition>

- **通过 RESTful API**

     您可以按如下方式删除 On-demand 集群：

    ```plaintext
    curl --request DELETE \
         --url "${BASE_URL}/v2/clusters/onDemandClusters/inxx-xxxxxxxxxxxxxxx" \
         --header "Authorization: Bearer ${TOKEN}" \
         --header "Accept: application/json"
    ```

    以下是输出示例。

    ```plaintext
    {
      "code": 0,
      "data": {
        "clusterId": "inxx-xxxxxxxxxxxxxxx",
        "status": "DELETING"
      }
    }
    ```

- **通过 Web 控制台**

    ![TFljws1JshqWmIbrKGXcFxTenxc](https://zdoc-images.oss-cn-hangzhou.aliyuncs.com/TFljws1JshqWmIbrKGXcFxTenxc.png)

    <Procedures>

    1. 前往目标项目，点击**按需计算 > 集群**。

    1. 点击目标 On-demand 集群。

    1. 点击**操作 > 删除**。

    1. 输入集群名称。

    1. 点击**删除**。

    </Procedures>


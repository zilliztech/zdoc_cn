---
slug: /create-deletion-pipelines
beta: FALSE
notebook: FALSE
type: origin
token: Kiu5wA3XFi6E3lkl7nZc7y7Rnnc
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# 创建 Deletion Pipelines

您可以通过 Web 控制台或 RESTful API 创建 Pipelines。Web 控制台操作更简单直观，但 RESTful API 可提供更多灵活性。

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p>目前 Zilliz Cloud 仅支持在阿里云（杭州）的集群中创建 Pipelines。</p></li>
<li><p>在创建 Search Pipeline 前，需要先<a href="./create-ingestion-pipelines">创建 Ingestion Pipeline</a>。</p></li>
<li><p>同一项目下，您可最多创建 10 个同一类型的 Pipelines。</p></li>
</ul>

</Admonition>

## 通过 Web 控制台{#via-web-console}

1. 打开项目。

1. 点击左侧导航栏中的 **Pipelines**。 选中**概览**标签页，并切换到 **Pipelines**。点击 **+ Pipeline**。

1. 选择需要创建的 Pipeline 类型。点击 Deletion Pipeline 一栏中的 **+ Pipeline** 按钮。 

    ![create-deletion-pipeline-cn](/img/create-deletion-pipeline-cn.png)

1. 配置 Deletion Pipeline。

    |  **参数**      |  **说明**                                          |
    | ------------ | ------------------------------------------------ |
    |  Pipeline 名称 |  新创建的 Ingestion Pipeline 的名称。名称中只可包含小写字母、数字和下划线。 |
    |  描述 (可选)     |  对新创建的 Ingestion Pipeline 的描述。                   |

    ![configure-deletion-pipeline-cn](/img/configure-deletion-pipeline-cn.png)

1. 添加 Function。1 个 Search pipeline 中只可添加 1 个 **PURGE_DOC_INDEX** Function。

    1. 输入函数名称。

    1. 输入字段名称固定为 doc_name。

    1. 点击**添加**。

1. 点击**创建 Deletion Pipeline**。

## 通过 RESTful API{#via-restful-api}

以下示例代码创建了 1 个名称为 `my_doc_deletion_pipeline` 的 Deletion Pipeline，并添加了 1 个 **PURGE_DOC_INDEX** Function。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.zillizcloud.com/v1/pipelines" \
    -d '{
        "projectId": "proj-xxxx",
        "name": "my_doc_deletion_pipeline",
        "description": "A pipeline that deletes all info associated with a doc",
        "type": "DELETION",
        "functions": [
            {
                "name": "purge_chunks_by_doc_name",
                "action": "PURGE_DOC_INDEX",
                "inputField": "doc_name"
            }
        ],
    
        "clusterId": "${CLUSTER_ID}",
        "collectionName": "my_new_collection"
    }'
```

以下为参数说明：

- `YOUR_API_KEY`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

- `cloud-region`: 集群所在云服务地域的 ID。目前仅支持 `ali-cn-hangzhou`。

- `projectId`: 创建 Pipeline 所属的项目 ID。了解[如何获取项目 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23085669594011-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%A1%B9%E7%9B%AE-ID)。

- `name`: 创建的 Pipeline 名称。Pipeline 名称应该在 3-64 个字符内，且只可包含数字、字母和下划线。

- `description` (可选): 创建的 Pipeline 描述。

- `type`: 创建的 Pipeline 类型。目前，可创建的 Pipeline 类型包括 `INGESTION`、 `SEARCH` 和 `DELETION`。

- `functions`: Pipeline 中添加的 Function。**1 个 Deletion Pipeline 中仅可添加 1 个 Function。**

    - `name`: Function 名称。Function 名称应该在 3-64 个字符内，且只可包含数字、字母和下划线。

    - `action`: Function 类型。您只可以在 Deletion Pipeline 中添加 1 个 `PURGE_DOC_INDEX` Function。

    - `inputField`:  输入字段名称。该字段值应为 `doc_name`。

- `clusterId`: 创建 Pipeline 所属的集群 ID。目前，仅支持部署在阿里云（杭州）的集群。了解[如何获取集群 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23088888943515-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%9B%86%E7%BE%A4-ID-%E5%92%8C-%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%9C%B0%E5%9F%9F-ID)。

- `CollectionName`: 创建 Pipeline 所属的 Collection 名称。

如果请求返回以下类似内容，则表示 Deletion Pipeline 创建成功：

```bash
{
  "code": 200,
  "data": {
    "pipelineId": "pipe-ab2874d8138c8554375bb0",
    "name": "my_doc_deletion_pipeline",
    "type": "DELETION",
    "description": "A pipeline that deletes all info associated with a doc",
    "status": "SERVING",
    "functions": [
      {
        "action": "PURGE_DOC_INDEX",
        "name": "purge_chunks_by_doc_name",
        "inputField": "doc_name"
      }
    ],
    "clusterId": "in03-***************",
    "collectionName": "my_new_collection"
  }
}
```

## 相关文档{#related-topics}

- [管理 Pipelines](./manage-pipelines)

- [运行 Deletion Pipelines](./run-deletion-pipelines)

- [使用限制](./limits#pipelines)


---
slug: /run-deletion-pipelines
beta: FALSE
notebook: FALSE
type: origin
token: DKg8wtBghivQ7TkPe3ocXjlKnYe
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# 运行 Deletion Pipelines

创建后，您可以运行 Deletion Pipeline，从 Collection 中删除某个文档的所有文档切片。

## 通过 Web 控制台{#via-web-console} 

1. 点击 Deletion Pipeline 右侧的 "▶︎" 按钮。或者您可以点击 __Playground__ 选项卡。

    ![run-pipeline-cn](/img/run-pipeline-cn.png)

1. 在 `doc_name` 字段中输入需要删除的文档名称。点击__运行__。

1. 查看运行结果。

## 通过 RESTful API{#via-restful-api}

以下示例代码用于运行 Deletion Pipeline `my_doc_deletion_pipeline`。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_CLUSTER_TOKEN}" \
    --url "https://controller.api.{cloud-region}.zillizcloud.com/v1/pipelines/${YOUR_PIPELINE_ID}/run" \
    -d '{
        "data": {
            "doc_name": "zilliz_concept_doc.md",
        }
    }'
```

以下为参数说明：

- `YOUR_CLUSTER_TOKEN`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

- `cloud-region`: 集群的云服务地域。目前仅支持 `ali-cn-hangzhou`。

- `YOUR_PIPELINE_ID`：需要运行的 Pipeline 的 ID。

- `doc_name`: 需要删除的文档名称。如果输入的文档名称存在，该文档的所有文档切片都将被删除。如果文档名称不存在，该请求仍可执行，但是输出中的 `num_deleted_chunks` 值为 0。

请求返回以下类似内容：

```bash
{
  "code": 200,
  "data": {
    "num_deleted_chunks": 567
  }
}
```

## 相关文档{#related-topics}

- [管理 Pipelines](./manage-pipelines)

- [估算 Pipelines 用量](./estimate-pipelines-usage)

- [使用限制](./limits#pipelines)


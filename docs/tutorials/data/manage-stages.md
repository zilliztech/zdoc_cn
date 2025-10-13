---
title: "管理 Stage | Cloud"
slug: /manage-stages
sidebar_label: "管理 Stage"
beta: PRIVATE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "Stage 是一个中间存储点，您可以在其中保存数据以进行进一步的处理，例如数据合并、迁移或导入。本文解释了 Zilliz Cloud Stage 的定义，以及您在该平台上管理数据时如何使用它。 | Cloud"
type: origin
token: NCpbwCJX5iP4lzkgerwcfRe1n3f
sidebar_position: 9
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - Stage

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 管理 Stage

Stage 是一个中间存储点，您可以在其中保存数据以进行进一步的处理，例如数据合并、迁移或导入。本文解释了 Zilliz Cloud Stage 的定义，以及您在该平台上管理数据时如何使用它。

<Admonition type="info" icon="📘" title="说明">

<p>在将某个 Stage 中的数据导入、合并或迁移到某个集群时，请确保该 Stage 与该集群处于相同云地域。</p>

</Admonition>

## 概述{#overview}

当您使用 Zilliz Cloud Stage 时，你需要将您的数据从受支持的外部数据源（如本地文件系统或第三方对象存储）上传到 Stage，以备进一步处理。下图展示了 Zilliz Cloud Stage 的主要使用场景。

![Fgtsw07L8huoFRb94hDc2zzFnEb](/img/Fgtsw07L8huoFRb94hDc2zzFnEb.png)

您可以在数据导入、数据迁移与数据合并中使用 Stage。这些场景都要求您从外部数据源上传数据到 Stage，但是却对上传到 Stage 中数据进行不同的处理。

- 数据导入

    在数据导入过程中，您可能将准备好的数据集上传到 Stage，然后再将 Stage 中的数据导入到一个 Zilliz Cloud Collection 中。更多内容，可以参考[通过 RESTful API 导入](./import-data-via-restful-api)和[通过 SDK 导入](./import-data-via-sdks)。

- 数据合并

    您可以将本地文件中上传到 Stage，并将文件中的数据与指定 Collection 合并，从而创建一个包含两种数据来源的新 Collection。更多内容，可以参考[合并数据](./merge-data)。

- 数据迁移

    在数据迁移中，您也可以将从 Milvus 导出的备份数据上传到 Stage 中，然后再使用 Stage 中的数据将其恢复成一个 Zilliz Cloud 集群。更多内容，可以参考[通过 Stage 从 Milvus 迁移至 Zilliz Cloud](./via-stage)。

## 创建、删除和查看 Stage{#create-list-and-delete-stages}

您可以根据业务需要通过创建、删除和查看等 API 接口来管理 Stage 的生命周期。

### 创建 Stage 管理器{#initiate-a-stage-manager}

Stage 管理器用于保存一条到 Zilliz Cloud Stage 服务的连接。在管理 Stage 前，需要创建一个 Stage Manager。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus.stage.stage_manager import StageManager

stage_manager = StageManager(
    cloud_endpoint="https://api.cloud.zilliz.com.cn",
    api_key="YOUR_API_KEY",
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.bulkwriter.StageManager;
import io.milvus.bulkwriter.StageManagerParam;

StageManagerParam stageManagerParam = StageManagerParam.newBuilder()
    .withCloudEndpoint("https://api.cloud.zilliz.com.cn")
    .withApiKey("YOUR_API_KEY")
    .build();
        
StageManager stageManager = new StageManager(stageManagerParam);
```

</TabItem>

<TabItem value='bash'>

```bash
export BASE_URL="https://api.cloud.zilliz.com.cn"
export TOKEN="YOUR_API_KEY"
```

</TabItem>
</Tabs>

### 创建 Stage{#create-a-stage}

Stage 是一个项目级概念。当创建 Stage 时，需要提供该 Stage 所属的项目 ID、云地域 ID 及 Stage 名称。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
stage_manager.create_stage(
    project_id="proj-xxxxxxxxxxxxxxxxxxxxxxx", 
    region_id="ali-cn-hangzhou", 
    stage_name="my_stage"
)

print(f"\nStage {STAGE_NAME} created")

# Stage my_stage created
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.bulkwriter.request.stage.CreateStageRequest;

CreateStageRequest request = CreateStageRequest.builder()
    .projectId("proj-xxxxxxxxxxxxxxxxxxxxxxx")
    .regionId("ali-cn-hangzhou")
    .stageName("my_stage")
    .build();

stageManager.createStage(request);

System.out.printf("\nStage %s created%n", "my_stage");

// Stage my_stage created
```

</TabItem>

<TabItem value='bash'>

```bash
export BASE_URL="https://api.cloud.zilliz.com.cn"
export TOKEN="YOUR_API_KEY"

curl --request POST \
--url "${BASE_URL}/v2/stages/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "projectId": "proj-xxxxxxxxxxxxxxxxxxxxxxx",
    "regionId": "ali-cn-hangzhou",
    "stageName": "my_stage"
}'

# {
#     "code": 0,
#     "data": {
#         "stageName": "my_stage"
#     }
# }
```

</TabItem>
</Tabs>

### 查看 Stage 列表{#list-stages}

建议您在使用 Stage 时不要在不同的任务中重复使用相同的 Stage。您可以参考如下代码查看当前项目下的所有 Stage。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
stage_list = stage_manager.list_stages(
    project_id="proj-xxxxxxxxxxxxxxxxxxxxxxx",
    current_page=1, 
    page_size=10
)

print(f"\nlistStages results: ", stage_list.json()['data'])

# listStages results: 
# 
# {
#     "count": 1,
#     "currentPage": 1,
#     "pageSize": 10,
#     "stages": [
#         {
#             "stageName": "my_stage"
#         }        
#     ]
# }
```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import io.milvus.bulkwriter.request.stage.ListStagesRequest;

ListStagesRequest request = ListStagesRequest.builder()
    .projectId(PROJECT_ID)
    .currentPage(1)
    .pageSize(10)
    .build();
    
ListStagesResponse listStagesResponse = stageManager.listStages(request);

System.out.println("\nlistStages results: " + new Gson().toJson(listStagesResponse));

// listStages results: 
// 
// {
//     "count": 1,
//     "currentPage": 1,
//     "pageSize": 10,
//     "stages": [
//         {
//             "stageName": "my_stage"
//         }        
//     ]
// }
```

</TabItem>

<TabItem value='bash'>

```bash
export BASE_URL="https://api.cloud.zilliz.com.cn"
export TOKEN="YOUR_API_KEY"

curl --request GET \
--url "${BASE_URL}/v2/stages?projectId=proj-xxxxxxxxxxxxxxxxx" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json"

# {
#     "code": 0,
#     "data": {
#         "count": 1,
#         "currentPage": 1,
#         "pageSize": 10,
#         "stages": [
#             {
#                 "stageName": "my_stage"
#             }        
#         ]
#     }
# }
```

</TabItem>
</Tabs>

### 删除 Stage{#delete-a-stage}

当您不再需要某个 Stage 时，可以参考如下代码删除该 Stage。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
stage_manager.delete_stage(
    stage_name="my_stage"
)

print(f"\nStage my_stage deleted")

# Stage my_stage deleted
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.bulkwriter.request.stage.DeleteStageRequest;

DeleteStageRequest request = DeleteStageRequest.builder()
    .stageName("my_stage")
    .build();

stageManager.deleteStage(request);

System.out.printf("\nStage %s deleted%n", STAGE_NAME);

// Stage my_stage deleted
```

</TabItem>

<TabItem value='bash'>

```bash
export BASE_URL="https://api.cloud.zilliz.com.cn"
export TOKEN="YOUR_API_KEY"
export STAGE_NAME="my_stage"

curl --request DELETE \
--url "${BASE_URL}/v2/stages/${STAGE_NAME}" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json"

# {
#     "code": 0,
#     "data": {
#         "stageName": "my_stage"
#     }
# }
```

</TabItem>
</Tabs>

## 上传数据到 Stage{#upload-data-to-stage}

在 Stage 就绪后，您可以参考如下步骤上传本地数据到该 Stage 中。

### 创建 Stage 文件管理器{#initiate-a-stage-file-manager}

Stage 文件管理器用于保存一条到 Zilliz Cloud 控制面中指定 Stage 的连接。在向指定 Stage 上传文件前，您需要先创建 Stage 文件管理器。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
from pymilvus.stage.stage_file_manager import StageFileManager

stage_file_manager = StageFileManager(
    cloud_endpoint='https://api.cloud.zilliz.com.cn',
    api_key='YOUR_API_KEY',
    stage_name='my_stage',
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.bulkwriter.StageFileManager;
import io.milvus.bulkwriter.StageFileManagerParam;

StageFileManagerParam stageFileManagerParam = StageFileManagerParam.newBuilder()
    .withCloudEndpoint("https://api.cloud.zilliz.com.cn")
    .withApiKey("YOUR_API_KEY")
    .withStageName("my_stage")
    .build();

StageFileManager stageFileManager = new StageFileManager(stageFileManagerParam);
```

</TabItem>
</Tabs>

### 上传数据文件{#upload-files}

在 Stage 文件管理器就绪后，您就可以向其上传数据了。如下示例演示了如何将存放于本地的数据文件上传至指定 Stage。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
result = stage_file_manager.upload_file_to_stage(
    source_file_path="/path/to/your/local/data/file", 
    target_file_path="data/"
)

print(f"\nuploadFileToStage results: {result}")

# uploadFileToStage results: 
# 
# {
#     "stageName": "my_stage",
#     "path": "data/"
# }
```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import io.milvus.bulkwriter.model.UploadFilesResult;
import io.milvus.bulkwriter.request.stage.UploadFilesRequest;

UploadFilesRequest request = UploadFilesRequest.builder()
    .sourceFilePath("/path/to/your/local/data/file")
    .targetStagePath("data/")
    .build();

UploadFilesResult result = stageFileManager.uploadFilesAsync(request).get();

System.out.println("\nuploadFiles results: " + new Gson().toJson(result));

// uploadFileToStage results: 
// 
// {
//     "stageName": "my_stage",
//     "path": "data/"
// }
```

</TabItem>
</Tabs>
---
title: "管理 Stage | Cloud"
slug: /manage-stages
sidebar_label: "管理 Stage"
beta: PRIVATE
notebook: FALSE
description: "Stage 是一个中间存储点，您可以在其中保存数据以进行进一步的处理，例如数据合并、迁移或导入。本文解释了 Zilliz Cloud Stage 的定义，以及您在该平台上管理数据时如何使用它。 | Cloud"
type: origin
token: NCpbwCJX5iP4lzkgerwcfRe1n3f
sidebar_position: 0
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

## 创建、删除和查看 Stage{#create-list-and-delete-stages}

您可以根据业务需要通过创建、删除和查看等 API 接口来管理 Stage 的生命周期。

### 创建 Stage{#create-a-stage}

Stage 是一个项目级概念。当创建 Stage 时，需要提供该 Stage 所属的项目 ID、云地域 ID 及 Stage 名称。

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
```

调用创建接口的响应如下：

```json
{
    "code": 0,
    "data": {
        "stageName": "my_stage"
    }
}
```

### 查看 Stage 列表{#list-stages}

建议您在使用 Stage 时不要在不同的任务中重复使用相同的 Stage。您可以参考如下代码查看当前项目下的所有 Stage。

```bash
export BASE_URL="https://api.cloud.zilliz.com.cn"
export TOKEN="YOUR_API_KEY"

curl --request GET \
--url "${BASE_URL}/v2/stages?projectId=proj-xxxxxxxxxxxxxxxxx" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json"
```

调用该接口的响应如下：

```json
{
    "code": 200,
    "data": [
        {
            "stageName": "my_stage"
        }
    ]
}
```

### 删除 Stage{#delete-a-stage}

当您不再需要某个 Stage 时，可以参考如下代码删除该 Stage。

```bash
export BASE_URL="https://api.cloud.zilliz.com.cn"
export TOKEN="YOUR_API_KEY"
export STAGE_NAME="my_stage"

curl --request DELETE \
--url "${BASE_URL}/v2/stages/${STAGE_NAME}" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json"
```

调用该接口的响应如下：

```json
{
    "code": 0,
    "data": {
        "stageName": "my_stage"
    }
}
```

## 上传数据到 Stage{#upload-data-to-stage}

在 Stage 创建完成后，您可以参考如下代码向该 Stage 中上传数据。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
import os
from pymilvus.stage.stage_operation import StageOperation

# You need to upload the local file path or folder path for import & migration & spark.
LOCAL_DIR_OR_FILE_PATH = "/Users/zilliz/Desktop/1.parquet"

# The value of the URL is fixed.
# For overseas regions, it is: https://api.cloud.zilliz.com
# For regions in China, it is: https://api.cloud.zilliz.com.cn
CLOUD_ENDPOINT = "https://api.cloud.zilliz.com.cn"
API_KEY = "YOUR_API_KEY"

# This is currently a private preview feature. If you need to use it, please submit a request and contact us.
# Before using this feature, you need to create a stage using the stage API.
STAGE_NAME = "my_stage"
PATH = "data/"

def main():
    stage_operation = StageOperation(
        cloud_endpoint=CLOUD_ENDPOINT,
        api_key=API_KEY,
        stage_name=STAGE_NAME,
        path=PATH
    )
    result = stage_operation.upload_file_to_stage(LOCAL_DIR_OR_FILE_PATH)
    print(f"\nuploadFileToStage results: {result}")
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.bulkwriter.StageOperation;
import io.milvus.bulkwriter.StageOperationParam;
import io.milvus.bulkwriter.model.StageUploadResult;

/**
 * You need to upload the local file path or folder path for import.
 */
public static final String LOCAL_DIR_OR_FILE_PATH = "/Users/zilliz/Desktop/1.parquet";

/**
 * The value of the URL is fixed.
 * For overseas regions, it is: https://api.cloud.zilliz.com
 * For regions in China, it is: https://api.cloud.zilliz.com.cn
 */
public static final String CLOUD_ENDPOINT = "https://api.cloud.zilliz.com.cn";
public static final String API_KEY = "YOUR_API_KEY";

/**
 * This is currently a private preview feature. If you need to use it, please submit a request and contact us.
 * Before using this feature, you need to create a stage using the stage API.
 */
public static final String STAGE_NAME = "my_stage";
public static final String PATH = "data/";

private static void uploadFileToStage() throws Exception {
    StageOperationParam stageOperationParam = StageOperationParam.newBuilder()
            .withCloudEndpoint(CLOUD_ENDPOINT).withApiKey(API_KEY)
            .withStageName(STAGE_NAME).withPath(PATH)
            .build();
    StageOperation stageOperation = new StageOperation(stageOperationParam);
    StageUploadResult result = stageOperation.uploadFileToStage(LOCAL_DIR_OR_FILE_PATH);
    System.out.println("\nuploadFileToStage results: " + result);
}
```

</TabItem>
</Tabs>


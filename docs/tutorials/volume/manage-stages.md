---
title: "管理 Volume (SDK) | Cloud"
slug: /manage-stages
sidebar_label: "管理 Volume (SDK)"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "本文解释了如何在 Zilliz Cloud 通过 SDK 管理 Volume。如需了解如何通过界面进行操作，请参考管理 Volume (控制台)。 | Cloud"
type: origin
token: NCpbwCJX5iP4lzkgerwcfRe1n3f
sidebar_position: 2
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

# 管理 Volume (SDK)

本文解释了如何在 Zilliz Cloud 通过 SDK 管理 Volume。如需了解如何通过界面进行操作，请参考[管理 Volume (控制台)](./manage-volumes-via-console)。

## 创建、删除和查看 Volume\{#create-list-and-delete-volumes}

您可以根据业务需要通过创建、删除和查看等 API 接口来管理 Volume 的生命周期。

### 创建 Volume 管理器\{#initiate-a-volume-manager}

Volume 管理器用于保存一条到 Zilliz Cloud Volume 服务的连接。在管理 Volume 前，需要创建一个 Volume Manager。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus.bulk_writer.volume_manager import VolumeManager

volume_manager = VolumeManager(
    cloud_endpoint="https://api.cloud.zilliz.com.cn",
    api_key="YOUR_API_KEY"
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.bulkwriter.VolumeManager;
import io.milvus.bulkwriter.VolumeManagerParam;

VolumeManagerParam volumeManagerParam = VolumeManagerParam.newBuilder()
    .withCloudEndpoint("https://api.cloud.zilliz.com.cn")
    .withApiKey("YOUR_API_KEY")
    .build();
        
VolumeManager volumeManager = new VolumeManager(volumeManagerParam);
```

</TabItem>

<TabItem value='bash'>

```bash
export BASE_URL="https://api.cloud.zilliz.com.cn"
export TOKEN="YOUR_API_KEY"
```

</TabItem>
</Tabs>

### 创建 Volume\{#create-a-volume}

Volume 是一个项目级概念。当创建 Volume 时，需要提供该 Volume 所属的项目 ID、云地域 ID 及 Volume 名称。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
volume_manager.create_volume(
    project_id="proj-xxxxxxxxxxxxxxxxxxxxxxx", 
    region_id="ali-cn-hangzhou
    volume_name="my_volume"
)

print(f"\nVolume my_volume created")

# Volume my_volume created
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.bulkwriter.request.volume.CreateVolumeRequest;

CreateVolumeRequest request = CreateVolumeRequest.builder()
    .projectId("proj-xxxxxxxxxxxxxxxxxxxxxxx")
    .regionId("ali-cn-hangzhou
    .volumeName("my_volume")
    .build();

volumeManager.createVolume(request);

System.out.printf("\nVolume %s created%n", "my_volume");

// Volume my_volume created
```

</TabItem>

<TabItem value='bash'>

```bash
export BASE_URL="https://api.cloud.zilliz.com.cn"
export TOKEN="YOUR_API_KEY"

curl --request POST \
--url "${BASE_URL}/v2/volumes/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "projectId": "proj-xxxxxxxxxxxxxxxxxxxxxxx",
    "regionId": "ali-cn-hangzhou
    "volumeName": "my_volume"
}'

# {
#     "code": 0,
#     "data": {
#         "volumeName": "my_volume"
#     }
# }
```

</TabItem>
</Tabs>

以下为参数说明：

- `regionId`：要创建的 Volume 所在地域必须与计划导入或迁移数据的目标集群所使用的云服务商和地域完全一致。

- `volumeName`：要创建的 Volume 名称必须在组织范围内唯一，长度不超过 64 个字符，以字母或下划线开头，并且只能包含字母、数字、连字符（-）和下划线（_）。

### 查看 Volume 列表\{#list-volumes}

建议您在使用 Volume 时不要在不同的任务中重复使用相同的 Volume。您可以参考如下代码查看当前项目下的所有 Volume。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
volume_list = volume_manager.list_volumes(
    project_id="proj-xxxxxxxxxxxxxxxxxxxxxxx",
    current_page=1, 
    page_size=10
)

print(f"\nlistVolumes results: \n", volume_list.json()['data'])

# listVolumes results: 
# 
# {
#     "count": 1,
#     "currentPage": 1,
#     "pageSize": 10,
#     "volumes": [
#         {
#             "volumeName": "my_volume"
#         }        
#     ]
# }
```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import io.milvus.bulkwriter.request.volume.ListVolumesRequest;

ListVolumesRequest request = ListVolumesRequest.builder()
    .projectId("proj-xxxxxxxxxxxxxxxxxxxxxxx")
    .currentPage(1)
    .pageSize(10)
    .build();
    
ListVolumesResponse listVolumesResponse = volumeManager.listVolumes(request);

System.out.println("\nlistVolumes results: " + new Gson().toJson(listVolumesResponse));

// listVolumes results: 
// 
// {
//     "count": 1,
//     "currentPage": 1,
//     "pageSize": 10,
//     "volumes": [
//         {
//             "volumeName": "my_volume"
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
--url "${BASE_URL}/v2/volumes?projectId=proj-xxxxxxxxxxxxxxxxx" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json"

# {
#     "code": 0,
#     "data": {
#         "count": 1,
#         "currentPage": 1,
#         "pageSize": 10,
#         "volumes": [
#             {
#                 "volumeName": "my_volume"
#             }        
#         ]
#     }
# }
```

</TabItem>
</Tabs>

### 删除 Volume\{#delete-a-volume}

当您不再需要某个 Volume 时，可以参考如下代码删除该 Volume。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
volume_manager.delete_volume(
    volume_name="my_volume"
)

print(f"\nVolume my_volume deleted")

# Volume my_volume deleted
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.bulkwriter.request.volume.DeleteVolumeRequest;

DeleteVolumeRequest request = DeleteVolumeRequest.builder()
    .volumeName("my_volume")
    .build();

volumeManager.deleteVolume(request);

System.out.printf("\nVolume %s deleted%n", "my_volume");

// Volume my_volume deleted
```

</TabItem>

<TabItem value='bash'>

```bash
export BASE_URL="https://api.cloud.zilliz.com.cn"
export TOKEN="YOUR_API_KEY"
export VOLUME_NAME="my_volume"

curl --request DELETE \
--url "${BASE_URL}/v2/volumes/${VOLUME_NAME}" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json"

# {
#     "code": 0,
#     "data": {
#         "volumeName": "my_volume"
#     }
# }
```

</TabItem>
</Tabs>

## 上传数据到 Volume\{#upload-data-to-volume}

在 Volume 就绪后，您可以参考如下步骤上传本地数据到该 Volume 中。

### 创建 Volume 文件管理器\{#initiate-a-volume-file-manager}

Volume 文件管理器用于保存一条到 Zilliz Cloud 控制面中指定 Volume 的连接。在向指定 Volume 上传文件前，您需要先创建 Volume 文件管理器。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
from pymilvus.bulk_writer.volume_file_manager import VolumeFileManager

volume_file_manager = VolumeFileManager(
    cloud_endpoint='https://api.cloud.zilliz.com.cn',
    api_key='YOUR_API_KEY',
    volume_name='my_volume',
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.bulkwriter.VolumeFileManager;
import io.milvus.bulkwriter.VolumeFileManagerParam;

VolumeFileManagerParam volumeFileManagerParam = VolumeFileManagerParam.newBuilder()
    .withCloudEndpoint("https://api.cloud.zilliz.com.cn")
    .withApiKey("YOUR_API_KEY")
    .withVolumeName("my_volume")
    .build();

VolumeFileManager volumeFileManager = new VolumeFileManager(volumeFileManagerParam);
```

</TabItem>
</Tabs>

### 上传数据文件\{#upload-files}

在 Volume 文件管理器就绪后，您就可以向其上传数据了。如下示例演示了如何将存放于本地的数据文件上传至指定 Volume。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
result = volume_file_manager.upload_file_to_volume(
    source_file_path="/path/to/your/local/data/file", 
    target_volume_path="data/"
)

print(f"\nuploadFileToVolume results: {result}")

# uploadFileToVolume results: 
# 
# {
#     "volumeName": "my_volume",
#     "path": "data/"
# }
```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import io.milvus.bulkwriter.model.UploadFilesResult;
import io.milvus.bulkwriter.request.volume.UploadFilesRequest;

UploadFilesRequest request = UploadFilesRequest.builder()
    .sourceFilePath("/path/to/your/local/data/file")
    .targetVolumePath("data/")
    .build();

UploadFilesResult result = volumeFileManager.uploadFilesAsync(request).get();

System.out.println("\nuploadFiles results: " + new Gson().toJson(result));

// uploadFileToVolume results: 
// 
// {
//     "volumeName": "my_volume",
//     "path": "data/"
// }
```

</TabItem>
</Tabs>
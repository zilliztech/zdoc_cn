---
title: "uploadFilesAsync | Java | v2"
slug: /java/java/v2-VolumeFileManager-uploadFilesAsync
sidebar_label: "uploadFilesAsync"
beta: false
added_since: false
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会将指定源路径下的本地文件上传到指定 volume 内的目标文件路径。 | Java | v2"
type: docx
token: GE25dbBmMoU8glxCWbJckYObnN1
sidebar_position: 1
keywords: 
  - 分层可导航小世界
  - Dense embedding
  - Faiss vector database
  - Chroma vector database
  - zilliz
  - zilliz cloud
  - cloud
  - uploadFilesAsync
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# uploadFilesAsync

此操作会将指定源路径下的本地文件上传到指定 volume 内的目标文件路径。

```java
public CompletableFuture<UploadFilesResult> uploadFilesAsync(UploadFilesRequest request)
```

## 请求语法\{#request-syntax}

```java
uploadFileAsync(UploadFilesRequest.builder()
    .sourceFilePath(String sourceFilePath)
    .targetVolumePath(String targetVolumePath)
    .build();
)
```

**参数**

- **sourceFilePath** (*str*) -

    **[必需]**

    要上传到指定 volume 的本地数据文件路径。

- **targetVolumePath** (*str*) -

    **[必需]**

    此操作完成后，指定 volume 内的数据文件路径。

**返回类型**

*CompletableFuture&lt;UploadFilesResult&gt;*

**返回**

一个 **CompletableFuture&lt;UploadFilesResult&gt;** 实例，该实例会解析为具有以下属性的 **UploadFilesResult** 实例。

- **volumeName** (*str*) -

    **[必需]**

    此操作的目标 volume 名称。

- **path** (*str*) -

    **[必需]**

    此操作完成后，指定 volume 内的数据文件路径。

## 示例\{#example}

```java
import com.google.gson.Gson;
import java.util.concurrent.CompletableFuture;
import io.milvus.bulkwriter.VolumeFileManager;
import io.milvus.bulkwriter.VolumeFileManagerParam;
import io.milvus.bulkwriter.request.volume.UploadFilesRequest;
import io.milvus.bulkwriter.model.UploadFilesResult;

VolumeFileManagerParam volumeFileManagerParam = VolumeFileManagerParam.newBuilder()
    .withCloudEndpoint("https://api.cloud.zilliz.com")
    .withApiKey("YOUR_API_KEY")
    .withVolumeName("my_volume")
    .build();

VolumeFileManager volumeFileManager = new VolumeFileManager(volumeFileManagerParam);

UploadFilesRequest request = UploadFilesRequest.builder()
    .sourceFilePath("/path/to/your/local/data/file")
    .targetVolumePath("data/")
    .build();

UploadFilesResult result = volumeFileManager.uploadFilesAsync(request).get();

System.out.println("\nuploadFiles results: " + new Gson().toJson(result));

// uploadFiles results: 
// 
// {
//     "volumeName": "my_volume",
//     "path": "data/"
// }
```

---
displayed_sidbar: javaSidebar
title: "deleteStage() | Java | v2"
slug: /java/java/v2-StageManager-deleteStage
sidebar_label: "deleteStage()"
beta: false
notebook: false
description: "This operation deletes a stage. | Java | v2"
type: docx
token: OalndLUMRoUqpMxr2QscYTCenre
sidebar_position: 2
keywords: 
  - rag llm architecture
  - private llms
  - nn search
  - llm eval
  - zilliz
  - zilliz cloud
  - cloud
  - deleteStage()
  - javaV225
displayed_sidebar: javaSidebar

---

import Admonition from '@theme/Admonition';


# deleteStage()

This operation deletes a stage.

```java
public void deleteStage(DeleteStageRequest request)
```

## Request Syntax

```java
deleteStage(DeleteStageRequest.builder()
    .stageName(String stageName)
    .build();
)
```

**PARAMETERS**

- **stageName** (*str*) -

    **&#91;REQUIRED&#93;**

    The name of the stage to delete.

**RETURN TYPE**

*void*

**RETURNS**

None

## Example

```java
import io.milvus.bulkwriter.StageManager;
import io.milvus.bulkwriter.StageManagerParam;
import io.milvus.bulkwriter.request.stage.DeleteStageRequest;

StageManagerParam stageManagerParam = StageManagerParam.newBuilder()
    .withCloudEndpoint("https://api.cloud.zilliz.com")
    .withApiKey("YOUR_API_KEY")
    .build();
        
StageManager stageManager = new StageManager(stageManagerParam);

DeleteStageRequest request = DeleteStageRequest.builder()
    .stageName("my_stage")
    .build();

stageManager.deleteStage(request);

System.out.printf("\nStage %s deleted%n", "my_stage");

// Stage my_stage deleted
```


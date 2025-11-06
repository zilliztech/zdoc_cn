---
displayed_sidbar: pythonSidebar
title: "delete_stage() | Python"
slug: /python/python/StageManager-delete_stage
sidebar_label: "delete_stage()"
added_since: v2.5.x
last_modified: false
deprecate_since: false
beta: false
notebook: false
description: "This operation deletes a stage. | Python"
type: docx
token: FbzLd0f5ToAPRdxa8XWcWfUwnwe
sidebar_position: 2
keywords: 
  - multimodal RAG
  - llm hallucinations
  - hybrid search
  - lexical search
  - zilliz
  - zilliz cloud
  - cloud
  - delete_stage()
  - pymilvus26
displayed_sidebar: pythonSidebar

---

import Admonition from '@theme/Admonition';


# delete_stage()

This operation deletes a stage.

## Request Syntax

```python
delete_stage(
    stage_name: str
)
```

**PARAMETERS**

- **stage_name** (*str*) -

    **[REQUIRED]**

    The name of the stage to delete.

**RETURN TYPE**

*None*

**RETURNS**

None

## Example

```python
from pymilvus.bulk_writer.stage_manager import StageManager

stage_manager = StageManager(
    cloud_endpoint="https://api.cloud.zilliz.com.cn",
    api_key="YOUR_API_KEY"
)

stage_manager.delete_stage(
    stage_name="my_stage"
)

print(f"\nStage my_stage deleted")

# Stage my_stage deleted
```


---
title: "restore_snapshot() | Python | MilvusClient"
slug: /python/python/Snapshot-restore_snapshot
sidebar_label: "restore_snapshot()"
beta: PRIVATE
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作将快照恢复到目标 collection。恢复操作异步运行 — 使用 `getrestoresnapshotstate()` 监控进度。 | Python | MilvusClient"
type: docx
token: I2OZdk40IomugOx9MTqcooVcnEf
sidebar_position: 8
keywords: 
  - 深度学习
  - 知识库
  - 自然语言处理
  - AI 聊天机器人
  - Zilliz
  - Zilliz Cloud
  - cloud
  - restore_snapshot()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# restore_snapshot()

此操作将快照恢复到目标 collection。恢复操作异步运行 — 使用 `get_restore_snapshot_state()` 监控进度。

## 请求语法\{#request-syntax}

```python
restore_snapshot(
    collection_name: str,
    snapshot_name: str,
    rewrite_data: bool = False,
    timeout: Optional[float] = None,
    **kwargs
) -> int
```

**参数：**

- **collection_name** (*str*) -
**[必需]**
要将快照恢复到其中的目标 collection 的名称。

- **snapshot_name** (*str*) -
**[必需]**
要恢复的快照名称。

- **rewrite_data** (*bool*) -
是否覆盖目标 collection 中的现有数据。默认为 *False*。

- **timeout** (*Optional[float]*) -
允许 RPC 执行的可选时长，单位为秒。

**返回类型：**

*int*

恢复作业 ID。将此 ID 与 `get_restore_snapshot_state()` 一起使用，以跟踪恢复进度。

**异常：**

- **MilvusException**

    如果快照不存在、目标 collection 不可用，或操作失败。

## 示例\{#examples}

```python
from pymilvus import MilvusClient
import time

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

# Start restore and get job ID
job_id = client.restore_snapshot(
    snapshot_name="backup_20260418",
    collection_name="restored_collection",
)

# Poll for completion
while True:
    state = client.get_restore_snapshot_state(job_id=job_id)
    if state.state == "RestoreSnapshotCompleted":
        print(f"Restore complete: {state.progress}%")
        break
    elif state.state == "RestoreSnapshotFailed":
        print(f"Restore failed: {state.reason}")
        break
    print(f"In progress: {state.progress}%")
    time.sleep(2)
```

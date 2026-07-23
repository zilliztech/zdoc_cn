---
title: "update-policy | Cloud"
slug: /cli/cli/Backup-updatepolicy
sidebar_label: "update-policy"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作更新集群的备份策略。| Cloud"
type: docx
token: PJsSdI8JBoUchVx1IkrcmakLnCc
sidebar_position: 9
keywords: 
  - 稀疏向量
  - 向量维度
  - ANN 搜索
  - 什么是向量嵌入
  - zilliz
  - zilliz cloud
  - cloud
  - update-policy
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# update-policy

此操作更新集群的备份策略。

## 描述\{#description}

Zilliz Cloud 允许你为集群启用**自动备份**，帮助确保在出现意外问题时能够恢复数据。自动备份适用于**整个集群**——不支持自动备份单个 Collection。

你可以运行此命令来更新自动备份策略。不带选项运行此命令将触发一组交互式提示。

<Admonition type="info" icon="📘" title="说明">

此功能仅适用于 **Dedicated** 集群。

</Admonition>

## 概要\{#synopsis}

```bash
zilliz backup update-policy
--cluster-id <value>
--auto-backup
--frequency <value>
--start-time <value>
--rentention-days <value>
[--output <value>]
[--query <value>]
[--no-header]
[--body <value>]
```

## 选项\{#options}

- **--cluster-id** (*string*) -

    **[必填]**

    表示集群 ID，类似于 `inxx-xxxxx`。

    如果已使用 `zilliz context set` 配置集群，则在此选项未配置时会自动应用该集群。

- **--auto-backup** (*boolean*) -

    **[必填]**

    表示是否启用或禁用自动备份。

- **--frequency** (*string*) -

    表示运行自动备份作业的频率。当 `--auto-backup` 为 `true` 时，此选项为必填。可选值包括：

    - `daily`

    - `weekdays`

    - `weekends`，或

    - `1-7`（1=周一，7=周日）例如，`1,3,5`。

- **--start-time** (*string*) -

    表示 UTC 时间的开始小时，例如 `02:00`。当 `--auto-backup` 为 `true` 时，此选项为必填。

- **--retention-days** (*integer*) -

    保留备份的天数（1-30）。当 `--auto-backup` 为 `true` 时必填。

- **--output, -o** (*string*) -

    表示输出格式。可选值：

    - `json`，

    - `table`，

    - `text`，

    - `yaml`，

    - `csv`。

- **--no-header** (*boolean*) -

    表示当输出设置为 `table` 或 `csv` 时是否省略表头行。

- **--query, -q** (*string*) -

    表示用于筛选输出的 JMESPath 表达式。

- **--body** (*string*) -

    与以下 schema 匹配的原始 JSON 字符串。有关具体示例，请参阅[设置备份策略](/reference/restful/set-backup-policy-v2)。

    ```json
    {
        "type": "object",
        "properties": {
            "frequency": {
                "type": "string",
                "example": "1,2,5"
            },
            "startTime": {
                "type": "string",
                "example": "02:00-04:00"
            },
            "retentionDays": {
                "type": "integer",
                "minimum": 1,
                "maximum": 30,
                "example": 7
            },
            "enabled": {
                "type": "boolean",
                "example": true
            },
            "crossRegionCopies": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "regionId": {
                            "type": "string",
                            "example": "aws-us-west-2"
                        },
                        "retentionDays": {
                            "type": "integer",
                            "minimum": 1,
                            "maximum": 30,
                            "example": 7
                        }
                    }
                }
            }
        },
        "required": [
            "enabled"
        ]
    }
    ```

## 示例\{#example}

```bash
# Enable daily backup at 2am UTC with 7-day retention
zilliz backup update-policy --cluster-id in01-xxxx \
--auto-backup true \
--frequency daily \
--start-time 02:00 \
--retention-days 7

# Enable backup on Mon/Wed/Fri at 3am UTC
zilliz backup update-policy \
--cluster-id in01-xxxx \
--auto-backup true \
--frequency 1,3,5 \
--start-time 03:00-05:00 \
--retention-days 14

# Disable auto-backup
zilliz backup update-policy --cluster-id in01-xxxx --auto-backup false
```

---
displayed_sidbar: javaSidebar
title: "getBatchFiles() | Java | v2"
slug: /java/java/v2-LocalBulkWriter-getBatchFiles
sidebar_label: "getBatchFiles()"
beta: false
notebook: false
description: "This operation returns a list of files passed to the current LocalBulkWriter instance. | Java | v2"
type: docx
token: BLFEde4BuoCjTSxjYSUcZerEnOb
sidebar_position: 4
keywords: 
  - Video deduplication
  - Video similarity search
  - Vector retrieval
  - Audio similarity search
  - zilliz
  - zilliz cloud
  - cloud
  - getBatchFiles()
  - javaV225
displayed_sidebar: javaSidebar

---

import Admonition from '@theme/Admonition';


# getBatchFiles()

This operation returns a list of files passed to the current LocalBulkWriter instance.

```java
public List<List<String>> getBatchFiles()
```

## Request Syntax

```java
localBulkWriter.getBatchFiles()
```

**PARAMETERS:**

*None*

**RETURNS TYPE:**

*List\<List\<String>*

## Example

```java
List<List<String>> batchFiles = localBulkWriter.getBatchFiles();
```

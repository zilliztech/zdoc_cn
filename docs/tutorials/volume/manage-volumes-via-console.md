---
title: "管理 Volume (控制台) | Cloud"
slug: /manage-volumes-via-console
sidebar_label: "管理 Volume (控制台)"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "本文介绍如何在 Web 控制台中管理 Volume。如需了解如何通过 SDK 进行操作，请参考管理 Volume (SDK)。 | Cloud"
type: origin
token: Y7rYwMhrEiAjrHkX7SMc7zoRnhh
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - Volume

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

# 管理 Volume (控制台)

本文介绍如何在 Web 控制台中管理 Volume。如需了解如何通过 SDK 进行操作，请参考[管理 Volume (SDK)](./manage-stages)。

<Admonition type="info" icon="📘" title="说明">

<p>目前仅支持在阿里云和亚马逊云科技上创建 Volume。 如需在腾讯云上使用 Volume，请<a href="http://support.zilliz.com.cn">提交工单</a>。</p>

</Admonition>

## 创建 Volume\{#create-a-volume}

如果您只想体验 Volume 功能，可以创建一个免费试用 Volume。每个项目中只能创建一次免费试用 Volume，且免费试用 Volume 在数据容量和文件上传方面存在限制。详情参见[了解 Volume](./volume-explained#billing)。

对于生产环境的应用，请创建按量计费 Volume。

下表说明了创建 Volume 时需要设置的参数。

<table>
   <tr>
     <th><p><strong>参数</strong></p></th>
     <th><p><strong>描述</strong></p></th>
   </tr>
   <tr>
     <td><p>名称</p></td>
     <td><p>Volume 名称必须在组织范围内唯一，长度不超过 64 个字符，以字母或下划线开头，并且只能包含字母、数字、连字符（-）和下划线（_）。</p></td>
   </tr>
   <tr>
     <td><p>描述</p></td>
     <td><p>可选填写。</p></td>
   </tr>
   <tr>
     <td><p>云服务提供商&amp;地域</p></td>
     <td><p>Volume 所在地域必须与计划导入或迁移数据的目标集群所使用的云服务商和地域完全一致。</p></td>
   </tr>
</table>

<Supademo id="cmimhl79mght1b7b4n3qkbo3n?utm_source=link" title=""  />

## 查看 Volume\{#view-volumes}

您可以查看项目中所有 Volume，或通过点击 Volume 名称查看特定 Volume 的详情。

![GnInbw6Bqor7W3x4SiTcs7Upnid](/img/GnInbw6Bqor7W3x4SiTcs7Upnid.png)

## 管理 Volume 中的文件/文件夹\{#manage-files-or-folders-in-a-volume}

您可以在 Volume 中上传、查看和删除文件或文件夹。

### 上传文件/文件夹\{#upload-a-file-or-folder}

目前暂不支持通过 Web 控制台向 Volume 上传文件或文件夹。如需上传，请使用 SDK，参见[管理 Volume (SDK)](./manage-stages#upload-data-to-volume)。

### 查看文件和文件夹\{#view-files-and-folders}

您可以查看 Volume 中已存在的文件和文件夹。

<Supademo id="cmimjdv88gitib7b4tz26ukez?utm_source=link" title=""  />

### 删除文件/文件夹\{#delete-a-file-or-folder}

如果不再需要某个文件或文件夹，可以将其从 Volume 中删除。删除操作可能需要数分钟时间，具体时间取决于文件或文件夹的大小。

<Admonition type="caution" icon="🚧" title="警告">

<p>被删除的文件和文件夹无法恢复。请谨慎操作。</p>

</Admonition>

<Supademo id="cmimk40f8gjlub7b43mcvp2x3?utm_source=link" title=""  />

## 删除 Volume\{#delete-a-volume}

当不再需要时可以随时删除 Volume。请注意，每个组织中仅可创建一次免费试用 Volume，一旦删除，将无法再创建任何免费试用 Volume。

删除 Volume 会同时删除其中的所有文件和文件夹。

<Admonition type="caution" icon="🚧" title="警告">

<p>被删除的 Volume 无法恢复。请谨慎操作。</p>

</Admonition>

<Supademo id="cmimilchegik5b7b47tza70vz?utm_source=link" title=""  />


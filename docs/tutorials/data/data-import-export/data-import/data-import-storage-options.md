---
title: "支持的对象存储 | Cloud"
slug: /data-import-storage-options
sidebar_label: "支持的对象存储"
beta: FALSE
notebook: FALSE
description: "在导入数据前，您需要了解 Zilliz Cloud 支持的存储方式及对应的 URL 格式，以确保 Zilliz Cloud 可以正确处理您的上传请求，避免验证失败。 | Cloud"
type: origin
token: HaxowqeGdi8uyakrLc9c6Lb0nEb
sidebar_position: 0
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 数据导入
  - 支持的对象存储
  - aliyun
  - 阿里云
  - tencent cloud
  - 腾讯云

---

import Admonition from '@theme/Admonition';


# 支持的对象存储

在导入数据前，您需要了解 Zilliz Cloud 支持的存储方式及对应的 URL 格式，以确保 Zilliz Cloud 可以正确处理您的上传请求，避免验证失败。

## 阿里云 OSS{#aliyun-oss}

- **对象访问 URI**

    <table>
       <tr>
         <th><p>地域</p></th>
         <th><p><strong>URI</strong></p></th>
         <th><p>地域 ID</p></th>
       </tr>
       <tr>
         <td><p>华东1（杭州）</p></td>
         <td><p><code>https://bucket-name.oss-cn-hangzhou.aliyuncs.com/object-name</code></p></td>
         <td><p><code>cn-hangzhou</code></p></td>
       </tr>
       <tr>
         <td><p>华北2（北京）</p></td>
         <td><p><code>https://bucket-name.oss-cn-beijing.aliyuncs.com/object-name</code></p></td>
         <td><p><code>cn-beijing</code></p></td>
       </tr>
       <tr>
         <td><p>华南1（深圳）</p></td>
         <td><p><code>https://bucket-name.oss-cn-shenzhen.aliyuncs.com/object-name</code></p></td>
         <td><p><code>cn-shenzhen</code></p></td>
       </tr>
    </table>

    关于如何通过上述 URI 访问存储桶中的对象，可以参考 [OSS 访问域名使用规则](https://help.aliyun.com/zh/oss/user-guide/regions-and-endpoints)。

- **Required permissions**

    - `oss:GetObject`

    - `oss:ListObjects`

- **获取凭证**

    基于您的数据安全要求，可以在数据导入时使用 Access Key 或 STS Token 临时凭证方案。

    - 如果您希望使用长期 Access Key，强烈建议您创建专用于 API 访问的 RAM 用户，并为其创建 Access Key。具体步骤可以参考[创建阿里云 Access Key](https://help.aliyun.com/zh/ram/user-guide/create-an-accesskey-pair)。

    - 如果您希望使用 STS Token 临时凭证方案，可以参考 [临时访问凭证](https://help.aliyun.com/zh/oss/developer-reference/use-temporary-access-credentials-provided-by-sts-to-access-oss)

## 腾讯云 COS{#tencent-cloud-cos}

- **对象访问 URI**

<table>
   <tr>
     <th><p>地域</p></th>
     <th><p><strong>URI</strong></p></th>
     <th><p>地域 ID</p></th>
   </tr>
   <tr>
     <td><p>北京</p></td>
     <td><p><code>https://bucket-name.cos.ap-beijing.myqcloud.com/object-name</code></p></td>
     <td><p>ap-beijing</p></td>
   </tr>
   <tr>
     <td><p>上海</p></td>
     <td><p><code>https://bucket-name.cos.ap-shanghai.myqcloud.com/object-name</code></p></td>
     <td><p>ap-shanghai</p></td>
   </tr>
   <tr>
     <td><p>弗吉尼亚</p></td>
     <td><p><code>https://bucket-name.cos.na-ashburn.myqcloud.com/object-name</code></p></td>
     <td><p>na-ashburn</p></td>
   </tr>
</table>

- **Required permissions**

    - `cos:GetBucket`

    - `cos:GetObject`

    - `cos:HeadObject`

- **获取凭证**

    基于您的数据安全要求，可以在数据导入时使用 Access Key 或 STS Token 临时凭证方案。

    - 如果您希望使用长期 Access Key，强烈建议您创建专用于 API 访问的 RAM 用户，并为其创建 Access Key。具体步骤可以参考[创建密钥](https://cloud.tencent.com/document/product/598/40488)。

    - 如果您希望使用 STS Token 临时凭证方案，可以参考 [创建临时密钥](https://cloud.tencent.com/document/product/436/14048)

## 亚马逊云科技 S3{#amazon-cn-s3}

- **对象访问 URI**

<table>
   <tr>
     <th><p>地域</p></th>
     <th><p><strong>URI Style</strong></p></th>
     <th><p><strong>URI</strong></p></th>
     <th><p>地域 ID</p></th>
   </tr>
   <tr>
     <td><p>宁夏</p></td>
     <td><p>virtual-hosted–style</p></td>
     <td><p><code>https://bucket-name.s3.northwest-1.amazonaws.com.cn/object-name</code></p></td>
     <td><p>northwest-1</p></td>
   </tr>
   <tr>
     <td><p>宁夏</p></td>
     <td><p>path-style</p></td>
     <td><p><code>https://s3.northwest-1.amazonaws.com.cn/bucket-name/object-name</code></p></td>
     <td><p>northwest-1</p></td>
   </tr>
   <tr>
     <td><p>宁夏</p></td>
     <td><p>S3 URI</p></td>
     <td><p><code>s3://bucket-name/object-name</code></p></td>
     <td><p>northwest-1</p></td>
   </tr>
</table>

- **Required permissions**

    - `s3:GetObject`

    - `s3:ListBucket`

    - `s3:GetBucketLocation`

- **获取凭证**

    基于您的数据安全要求，可以在数据导入时使用 Access Key 或 STS Token 临时凭证方案。

    - 如果您希望使用长期 Access Key，强烈建议您创建专用于 API 访问的 RAM 用户，并为其创建 Access Key。具体步骤可以参考 [使用长期凭证](https://docs.amazonaws.cn/sdkref/latest/guide/access-iam-users.html)。

    - 如果您希望使用 STS Token 临时凭证方案，可以参考 [使用短期凭证](https://docs.amazonaws.cn/sdkref/latest/guide/access-temp-idc.html)


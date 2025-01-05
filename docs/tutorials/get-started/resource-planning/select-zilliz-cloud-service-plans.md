---
title: "Zilliz Cloud 版本对比 | Cloud"
slug: /select-zilliz-cloud-service-plans
sidebar_label: "Zilliz Cloud 版本对比"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 提供多样的集群版本类型以满足不同的用户需求。不论是向量数据库领域的新手，还是追求可靠的企业级解决方案的开发者，需要根据性能、可扩展性及成本，选择合适的版本类型。本文将提供不同版本间的对比，帮助您做出合适的选择。 | Cloud"
type: origin
token: XNCIwt9i6iFgEDkEQE9cTMf8nSe
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 版本

---

import Admonition from '@theme/Admonition';


# Zilliz Cloud 版本对比

Zilliz Cloud 提供多样的集群版本类型以满足不同的用户需求。不论是向量数据库领域的新手，还是追求可靠的企业级解决方案的开发者，需要根据性能、可扩展性及成本，选择合适的版本类型。本文将提供不同版本间的对比，帮助您做出合适的选择。

## 选择版本类型{#select-a-cluster-plan}

Zilliz Cloud 共有以下几个版本可供选择：Free、Serverless、Dedicated、BYOC。

<table>
   <tr>
     <th></th>
     <th><p><strong>Free</strong></p></th>
     <th><p><strong>Serverless</strong></p></th>
     <th><p><strong>Dedicated</strong></p></th>
     <th><p><strong>Bring Your Own Cloud (BYOC)</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>适用场景</strong></p></td>
     <td><p>适用于探索学习向量数据库的场景，可轻松升级至其他付费版本。</p></td>
     <td><p>适用于查询量不固定的应用，无需进行复杂配置即可自动根据业务调整计算资源。</p></td>
     <td><p>适用于生产环境，提供企业级数据安全与合规、监控指标、技术支持 SLA 等，支持高级配置。</p></td>
     <td><p>适用于高度注重数据隐私和合规的场景。</p></td>
   </tr>
   <tr>
     <td><p><strong>定价</strong></p></td>
     <td><p>免费</p></td>
     <td><p>详见 <a href="https://zilliz.com.cn/pricing">Zilliz 定价</a></p></td>
     <td><p>Dedicated 集群提供按量计费和包年包月两种计费方式，详情请参考<a href="./create-cluster">创建集群</a> 与 <a href="https://zilliz.com.cn/pricing">Zilliz 定价</a>。</p></td>
     <td><p><a href="https://zilliz.com.cn/contact-sales">联系销售</a></p></td>
   </tr>
   <tr>
     <td><p><strong>云服务提供商和地域</strong></p></td>
     <td><ul><li>阿里云：华东1（杭州）</li></ul></td>
     <td><ul><li>阿里云：华东1（杭州）</li></ul></td>
     <td><ul><li><p>阿里云：华东1（杭州）、华北2（北京）、华南1（深圳）</p></li><li><p>腾讯云：华北地区（北京）、华东地区（上海）、美国东部（弗吉尼亚）</p></li><li><p>亚马逊云科技：中国（宁夏）</p><p>详见<a href="./cloud-providers-and-regions">云服务提供商和地域</a>。</p></li></ul></td>
     <td><ul><li><p>阿里云</p></li><li><p>百度智能云</p></li><li><p>金山云</p></li><li><p>腾讯云</p></li></ul></td>
   </tr>
   <tr>
     <td><p><strong>CU 规格</strong></p></td>
     <td><p>单个 CU</p></td>
     <td><p>弹性伸缩</p></td>
     <td><p>最多 256 CU (支持 CU 大小包括: 1, 2, 4, 6, 8, 12, 16, 20, 24, 28, 32,…,64, 72, 80, 88,…, 256</p><p>当 CU 规格大于 8 时，CU 增加梯度为 4 CU。</p><p>当 CU 规格 大于 64 时， CU 增加梯度为 8 CU。)</p></td>
     <td><p>可根据用户需求定制</p></td>
   </tr>
   <tr>
     <td><p><strong>CU 类型</strong></p></td>
     <td><p>无</p></td>
     <td><p>无</p></td>
     <td><p>3 种类型可供选择：</p><ul><li><p>性能型</p></li><li><p>容量型</p></li><li><p>存储扩展型</p></li></ul></td>
     <td><p>2 种类型可供选择：</p><ul><li><p>性能型</p></li><li><p>容量型</p></li></ul></td>
   </tr>
   <tr>
     <td><p><strong>项目数量上限</strong></p></td>
     <td><p>1</p></td>
     <td><p>可根据用户需求定制</p></td>
     <td><p>可根据用户需求定制</p></td>
     <td><p>可根据用户需求定制</p></td>
   </tr>
   <tr>
     <td><p><strong>集群数量上限</strong></p></td>
     <td><p>1</p></td>
     <td><p>可根据用户需求定制</p></td>
     <td><p>可根据用户需求定制</p></td>
     <td><p>可根据用户需求定制</p></td>
   </tr>
   <tr>
     <td><p><strong>Collection 数量上限</strong></p></td>
     <td><p>5</p></td>
     <td><p>100</p></td>
     <td><p>根据 CU 大小决定</p></td>
     <td><p>根据 CU 大小决定</p></td>
   </tr>
   <tr>
     <td><p><strong>可用性 SLA</strong></p></td>
     <td><p>无</p></td>
     <td><p>无</p></td>
     <td><p>99.95%</p></td>
     <td><p>99.95%</p></td>
   </tr>
   <tr>
     <td><p><strong>技术支持</strong></p></td>
     <td><p>企业微信支持</p></td>
     <td><ul><li><p>企业微信支持</p></li><li><p>邮件支持及服务响应时间 SLA：</p><ul><li><p>紧急问题：4 小时</p></li><li><p>中等问题：1 个工作日</p></li><li><p>一般问题：2 个工作日</p></li></ul></li></ul></td>
     <td><ul><li><p>企业微信支持</p></li><li><p>邮件支持及服务响应时间 SLA：</p><ul><li><p>紧急问题：1 小时</p></li><li><p>中等问题：4 小时</p></li><li><p>一般问题：1 个工作日</p></li></ul></li></ul></td>
     <td><ul><li><p>企业微信支持</p></li><li><p>邮件支持及服务响应时间 SLA：</p><ul><li><p>紧急问题：1 小时</p></li><li><p>中等问题：4 小时</p></li><li><p>一般问题：1 个工作日</p></li></ul></li></ul></td>
   </tr>
   <tr>
     <td><p><strong>备份与恢复</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>迁移</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>高速数据传输</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>OAuth 2.0</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>SSO</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>不可用</p></td>
     <td><p>可用（公测版）</p></td>
     <td><p>可用（公测版）</p></td>
   </tr>
   <tr>
     <td><p><strong>MFA</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>审计系统</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>API 密钥管理</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>数据传输加密和静态加密</strong></p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>IP 地址访问控制</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>私网连接（Private Link）</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>ISO/ICE 27001、GDPR、HIPPA 合规与安全认证</strong></p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>基础监控指标与监控面板</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>告警</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>组织和项目层级 RBAC</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>数据层 RBAC</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>回收站</strong></p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>Pipelines</strong></p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
</table>


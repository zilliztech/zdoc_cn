---
slug: /select-zilliz-cloud-service-plans
beta: FALSE
notebook: FALSE
type: origin
token: XNCIwt9i6iFgEDkEQE9cTMf8nSe
sidebar_position: 1

---

import Admonition from '@theme/Admonition';


# Zilliz Cloud 版本类型

在配置集群前，您需要先选择版本。Zilliz Cloud 各版本提供不同的服务体验、计费模型，且性能及可扩展性也都有所不同 。目前， Zilliz Cloud 共有 3 个版本可供选择，以满足多样的用户需求。

- Serverless 版

- Dedicated 版

- BYOC

3 个不同的版本为不同的用户需求及使用场景设计，您可以根据自己的需求灵活选择。

## 选择版本类型{#select-a-cluster-plan}

Zilliz Cloud 提供三种版本。

<table>
   <tr>
     <th><p>功能特性</p></th>
     <th><p>Serverless 版</p></th>
     <th><p>Dedicated 版</p></th>
     <th><p>Bring Your Own Cloud (BYOC)</p></th>
   </tr>
   <tr>
     <td><p><strong>适用场景</strong></p></td>
     <td><p>适用于查询量不固定的 Serverless 应用，无需进行复杂配置即可自动根据业务调整计算资源。</p></td>
     <td><p>适用于生产环境，提供企业级数据安全与合规、监控指标、技术支持 SLA 等，支持高级配置。</p></td>
     <td><p>适用于高度注重数据隐私和合规的场景。</p></td>
   </tr>
   <tr>
     <td><p><strong>定价</strong></p></td>
     <td><p>详见 <a href="https://zilliz.com.cn/pricing">Zilliz 定价</a></p></td>
     <td><p>详见 <a href="https://zilliz.com.cn/pricing">Zilliz 定价</a></p></td>
     <td><p><a href="https://zilliz.com.cn/contact-sales">联系销售</a></p></td>
   </tr>
   <tr>
     <td><p><strong>云服务提供商和地域</strong></p></td>
     <td><ul><li>阿里云：华东1（杭州）</li></ul></td>
     <td><ul><li><p>阿里云：华东1（杭州）、华北2（北京）</p></li><li><p>腾讯云：华北地区（北京）、华东地区（上海）、美国东部（弗吉尼亚）</p></li></ul></td>
     <td><ul><li><p>阿里云</p></li><li><p>百度智能云</p></li><li><p>金山云</p></li><li><p>腾讯云</p></li></ul></td>
   </tr>
   <tr>
     <td><p><strong>CU 规格</strong></p></td>
     <td><p>弹性伸缩</p></td>
     <td><p>最多 256 CU (支持 CU 大小包括: 1, 2, 4, 6, 8, 12, 16, 20, 24, 28, 32,…,64, 72, 80, 88,…, 256</p><p>当 CU 规格大于 8 时，CU 增加梯度为 4 CU。</p><p>当 CU 规格 大于 64 时， CU 增加梯度为 8 CU。)</p></td>
     <td><p>可根据用户需求定制</p></td>
   </tr>
   <tr>
     <td><p><strong>最多可创建 Collection 数量</strong></p></td>
     <td><p>10</p></td>
     <td><p>根据 CU 大小决定</p></td>
     <td><p>根据 CU 大小决定</p></td>
   </tr>
   <tr>
     <td><p><strong>私网连接</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>备份</strong></p></td>
     <td><p>不可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
   <tr>
     <td><p><strong>迁移</strong></p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
     <td><p>可用</p></td>
   </tr>
</table>


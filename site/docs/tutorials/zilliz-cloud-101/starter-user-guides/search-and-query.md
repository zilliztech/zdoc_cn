---
slug: /search-and-query
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 向量搜索和查询

本文介绍如何在 Zilliz Cloud 中执行近似最近邻（Approximate Nearest Neighbour，ANN）搜索和查询。搜索是指在 Collection 中查找与指定查询向量最接近的向量，查询是基于指定条件筛选出满足条件的数据。

## 概述 {#overview}

Zilliz Cloud 采用 ANN 算法来处理向量搜索请求，支持搜索并返回与指定查询向量最相似的前 *K* 个 Entity。为优化性能和吞吐，Zilliz Cloud 支持批量搜索，即同时指定多个查询向量并行搜索。您可以定义布尔表达式来缩小 ANN 搜索的范围。

## 开始前 {#before-commencing}

执行 ANN 搜索或查询前，请确保已完成以下步骤：

- 已连接到创建了 Collection 的目标集群。详情请参见[连接集群](./connect-to-cluster)和[创建 Collection](./create-collection-2)。

- 已下载示例数据集并已将数据插入到 Collection 中。详情请参见[示例数据集](./example-dataset-1)和[插入 Entity](./insert-entities)。

- 阅读本指南系列时，建议[下载代码示例](https://assets.zilliz.com/zdoc/zilliz_cloud_sdk_examples.zip)。

:::info 说明

本指南系列中创建的 Collection 包含 `id` 主键和 `vector` 向量字段。如果您希望完全自定义 Collection，请参见[定制 Schema](./use-customized-schema)、[开启动态 Schema](./enable-dynamic-schema) 和 [JSON](./javascript-object-notation-json-1)。

:::

## 单向量搜索 {#one-vector-search}

单向量搜索是指搜索并返回与指定的某个查询向量最相似的前 *K* 个Entity。

以下是单向量搜索的示例代码：

<Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "JavaScript", "value": "javascript"}]}>
<TabItem value='python'>

```python
with open("path/to/downloaded/medium_articles_2020_dpr.json") as f:
    data = json.load(f)

# 'client' 是 MilvusClient 实例。
res = client.search(
    collection_name="medium_articles_2020",
    data=[data["rows"][0]["title_vector"]],
    output_fields=["title"]
)

print(res)

# 输出：
# [
#     [
#         {
#             "id": 0,
#             "distance": -1.0,
#             "entity": {
#                 "title": "The Reported Mortality Rate of Coronavirus Is Not Important"
#             }
#         },
#         {
#             "id": 70,
#             "distance": -0.7525784969329834,
#             "entity": {
#                 "title": "How bad will the Coronavirus Outbreak get? \u2014 Predicting the outbreak figures"
#             }
#         },
#         {
#             "id": 160,
#             "distance": -0.7132074236869812,
#             "entity": {
#                 "title": "The Funeral Industry is a Killer"
#             }
#         },
#         {
#             "id": 111,
#             "distance": -0.6888885498046875,
#             "entity": {
#                 "title": "The role of AI in web-based ADA and WCAG compliance"
#             }
#         },
#         {
#             "id": 196,
#             "distance": -0.6882869601249695,
#             "entity": {
#                 "title": "The Question We Should Be Asking About the Cost of Youth Sports"
#             }
#         },
#         {
#             "id": 51,
#             "distance": -0.6719912886619568,
#             "entity": {
#                 "title": "What if Facebook had to pay you for the profit they are making?"
#             }
#         },
#         {
#             "id": 178,
#             "distance": -0.6699185371398926,
#             "entity": {
#                 "title": "Is The Environmental Damage Due To Cruise Ships Irreversible?"
#             }
#         },
#         {
#             "id": 47,
#             "distance": -0.6680259704589844,
#             "entity": {
#                 "title": "What Happens When the Google Cookie Crumbles?"
#             }
#         },
#         {
#             "id": 135,
#             "distance": -0.6597772836685181,
#             "entity": {
#                 "title": "How to Manage Risk as a Product Manager"
#             }
#         }
#     ]
# ]
```

</TabItem>

<TabItem value='javascript'>

```javascript
const fs = require("fs")

const data = JSON.parse(fs.readFileSync('path/to/medium_articles_2020_dpr.json', 'utf8'));

res = await client.search({
    collection_name: "medium_articles_2020",
    vector: data.rows[0].title_vector,
    output_fields: ['title', 'link']
})

console.log(res)

// 输出：
// {
//   status: { error_code: 'Success', reason: '' },
//   results: [
//     {
//       score: -1,
//       id: '0',
//       title: 'The Reported Mortality Rate of Coronavirus Is Not Important',
//       link: '<https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912>'
//     },
//     {
//       score: -0.8500007390975952,
//       id: '3177',
//       title: 'Following the Spread of Coronavirus',
//       link: '<https://towardsdatascience.com/following-the-spread-of-coronavirus-23626940c125>'
//     },
//     {
//       score: -0.7918509244918823,
//       id: '3441',
//       title: 'Coronavirus shows what ethical Amazon could look like',
//       link: '<https://medium.com/swlh/coronavirus-shows-what-ethical-amazon-could-look-like-7c80baf2c663>'
//     },
//     {
//       score: -0.7819530963897705,
//       id: '938',
//       title: 'Mortality Rate As an Indicator of an Epidemic Outbreak',
//       link: '<https://towardsdatascience.com/mortality-rate-as-an-indicator-of-an-epidemic-outbreak-704592f3bb39>'
//     },
//     {
//       score: -0.7686220407485962,
//       id: '3072',
//       title: 'Can we learn anything from the progression of influenza to analyze the COVID-19 pandemic better?',
//       link: '<https://towardsdatascience.com/can-we-learn-anything-from-the-progression-of-influenza-to-analyze-the-covid-19-pandemic-better-b20a5b3f4933>'
//     }
//   ]
// }
```

</TabItem>
</Tabs>

您可以在搜索请求中引用搜索参数，并指定查询向量、向量字段名称、返回结果限制以及其他相关参数。以上代码搜索与指定查询向量最相近的 10 条 Entity，并返回各 Entity 的主键、距离等信息。

## 批量搜索 {#batch-search}

Zilliz Cloud 支持在单个请求中同时指定多个查询向量来进行批量搜索。大多数情况下，批量搜索比单向量搜索效率更高，因为批量搜索的总延时会比逐一执行单向量搜索的累计延时要低。

您可以迭代数据集中的行，并以行为单位发送搜索请求：

<Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "JavaScript", "value": "javascript"}]}>
<TabItem value='python'>

```python
with open("medium_articles_2020_dpr.json") as f:
    data = json.load(f)

# 'client' 是 MilvusClient 实例。
res = client.search(
    collection_name="medium_articles_2020",
    data=[data["rows"][0]["title_vector"],data["rows"][1]["title_vector"]],
    output_fields=["title", "link"],
    limit=5
)

print(res)

# 输出：
# [
#     [
#         {
#             "id": 0,
#             "distance": -1.0,
#             "entity": {
#                 "title": "The Reported Mortality Rate of Coronavirus Is Not Important",
#                 "link": "https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912"
#             }
#         },
#         {
#             "id": 70,
#             "distance": -0.7525784969329834,
#             "entity": {
#                 "title": "How bad will the Coronavirus Outbreak get? \u2014 Predicting the outbreak figures",
#                 "link": "https://towardsdatascience.com/how-bad-will-the-coronavirus-outbreak-get-predicting-the-outbreak-figures-f0b8e8b61991"
#             }
#         },
#         {
#             "id": 160,
#             "distance": -0.7132074236869812,
#             "entity": {
#                 "title": "The Funeral Industry is a Killer",
#                 "link": "https://medium.com/swlh/the-funeral-industry-is-a-killer-1775118a7778"
#             }
#         },
#         {
#             "id": 111,
#             "distance": -0.6888885498046875,
#             "entity": {
#                 "title": "The role of AI in web-based ADA and WCAG compliance",
#                 "link": "https://towardsdatascience.com/the-role-of-ai-in-web-based-ada-and-wcag-compliance-4fc09e69f416"
#             }
#         }
#     ],
#     [
#         {
#             "id": 1,
#             "distance": -0.9999998807907104,
#             "entity": {
#                 "title": "Dashboards in Python: 3 Advanced Examples for Dash Beginners and Everyone Else",
#                 "link": "https://medium.com/swlh/dashboards-in-python-3-advanced-examples-for-dash-beginners-and-everyone-else-b1daf4e2ec0a"
#             }
#         },
#         {
#             "id": 4,
#             "distance": -0.7625510692596436,
#             "entity": {
#                 "title": "Python NLP Tutorial: Information Extraction and Knowledge Graphs",
#                 "link": "https://medium.com/swlh/python-nlp-tutorial-information-extraction-and-knowledge-graphs-43a2a4c4556c"
#             }
#         },
#         {
#             "id": 155,
#             "distance": -0.7575345635414124,
#             "entity": {
#                 "title": "How To Use Web Sockets (Socket IO) With Digital Ocean Load Balancers And Kubernetes (DOK8S) With Ingress Nginx",
#                 "link": "https://medium.com/swlh/how-to-use-web-sockets-socket-io-with-digital-ocean-load-balancers-and-kubernetes-dok8s-with-e4dd5531c67e"
#             }
#         },
#         {
#             "id": 17,
#             "distance": -0.7366295456886292,
#             "entity": {
#                 "title": "Blockchain, IoT and AI \u2014 A Perfect Fit",
#                 "link": "https://medium.com/swlh/blockchain-iot-and-ai-a-perfect-fit-1-e04c6ad73fbc"
#             }
#         },
#         {
#             "id": 113,
#             "distance": -0.7317826747894287,
#             "entity": {
#                 "title": "AutoAI: The Magic of Converting Data to Models",
#                 "link": "https://towardsdatascience.com/autoai-the-magic-of-converting-data-to-models-185f26d22234"
#             }
#         }
#     ]
# ]
```

</TabItem>

<TabItem value='javascript'>

```javascript
const fs = require("fs")

const data = JSON.parse(fs.readFileSync('path/to/medium_articles_2020_dpr.json', 'utf8'));

res = await client.search({
    collection_name: "medium_articles_2020",
    vectors: [data.rows[0].title_vector, data.rows[1].title_vector],
    limit: 5,
    output_fields: ['title', 'link']
})

// 输出：
// {
//   status: { error_code: 'Success', reason: '' },
//   results: [
//     [ [Object], [Object], [Object], [Object], [Object] ],
//     [ [Object], [Object], [Object], [Object], [Object] ]
//   ]
// }
```

</TabItem>
</Tabs>

## 基于条件搜索 {#search-based-on-criteria}

过滤条件是用于定义 ANN 搜索条件的布尔表达式。您可以使用算术、逻辑和比较运算符来定义过滤条件。

| 操作符                | 描述                                                       |
| ------------------ | -------------------------------------------------------- |
| `and` (`&&`)       | 两个操作数同时为真才为真                                             |
| `or` (`\\|\\|`)    | 一真则真，两个操作数同时为假才为假<br/><br/>                              |
| `+`, `-`, `*`, `/` | 加法、减法、 乘法、除法                                             |
| `**`               | 取幂                                                       |
| `%`                | 取模                                                       |
| `<`, `>`           | 小于、大于                                                    |
| `==`, `!=`         | 等于、不等于                                                   |
| `<=`, `>=`         | 小于等于、大于等于                                                |
| `not`              | 取反                                                       |
| `like`             | 使用通配符运算符将一个值与类似的值进行比较。例如，`prefix％` 将匹配以 `prefix` 开头的字符串。 |
| `in`               | 判断表达式是否与列表中的任何值匹配                                        |

以下是一些带有过滤条件的 ANN 搜索示例。

- 搜索阅读时间（`reading_time`）在 10 到 15 分钟内的文章：
  <Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "JavaScript", "value": "javascript"}]}>
  <TabItem value='python'>

  ```python
  with open("path/to/medium_articles_2020_dpr.json") as f:
      data = json.load(f)
  
  res = client.search(
      collection_name="medium_articles_2020",
      data = [data["rows"][0]["title_vector"]],
      output_fields=["title", "reading_time"],
      limit=5,
      filter="10 < reading_time < 15"
  )
  
  print(res)
  
  # 输出
  # [
  #     [
  #         {
  #             "id": 0,
  #             "distance": -1.0,
  #             "entity": {
  #                 "title": "The Reported Mortality Rate of Coronavirus Is Not Important",
  #                 "reading_time": 13
  #             }
  #         },
  #         {
  #             "id": 7,
  #             "distance": -0.6361640095710754,
  #             "entity": {
  #                 "title": "Building Comprehensible Customer Churn Prediction Models",
  #                 "reading_time": 13
  #             }
  #         },
  #         {
  #             "id": 103,
  #             "distance": -0.6340133547782898,
  #             "entity": {
  #                 "title": "A Primer on Domain Adaptation",
  #                 "reading_time": 12
  #             }
  #         },
  #         {
  #             "id": 90,
  #             "distance": -0.6230067014694214,
  #             "entity": {
  #                 "title": "SVM: An optimization problem",
  #                 "reading_time": 11
  #             }
  #         }
  #     ]
  # ]
  ```
  
  </TabItem>

  <TabItem value='javascript'>

  ```javascript
  const fs = require("fs")
  
  const data = JSON.parse(fs.readFileSync('path/to/medium_articles_2020_dpr.json', 'utf8'));
  
  res = await client.search({
      collection_name: "medium_articles_2020",
      vector: data.rows[0].title_vector,
      limit: 5,
      output_fields: ['title', 'reading_time'],
      filter: "10 < reading_time < 15"
  })
  ```
  
  </TabItem>
  </Tabs>

- 搜索点赞数（`claps`）超过 1500 且回应数（`responses`）超过 15 的文章：
  <Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "JavaScript", "value": "javascript"}]}>
  <TabItem value='python'>

  ```python
  with open("path/to/medium_articles_2020_dpr.json") as f:
      data = json.load(f)
  
  res = client.search(
      collection_name="medium_articles_2020",
      data=[data["rows"][0]["title_vector"]],
      output_fields=['title', 'claps', 'responses'],
      limit=5,
      filter='claps > 1500 and responses > 15'
  )
  
  # 输出
  # [
  #     [
  #         {
  #             "id": 130,
  #             "distance": -0.5737712383270264,
  #             "entity": {
  #                 "title": "The Only \u201cCompetition\u201d Slide You\u2019ll Ever Need in a Pitch Deck",
  #                 "claps": 1940,
  #                 "responses": 25
  #             }
  #         },
  #         {
  #             "id": 66,
  #             "distance": -0.5508043766021729,
  #             "entity": {
  #                 "title": "How to Be Memorable in Social Settings",
  #                 "claps": 8600,
  #                 "responses": 34
  #             }
  #         },
  #         {
  #             "id": 69,
  #             "distance": -0.4541875422000885,
  #             "entity": {
  #                 "title": "Top 10 In-Demand programming languages to learn in 2020",
  #                 "claps": 3000,
  #                 "responses": 18
  #             }
  #         }
  #     ]
  # ]
  ```
  
  </TabItem>

  <TabItem value='javascript'>

  ```javascript
  const fs = require("fs")
  
  const data = JSON.parse(fs.readFileSync('path/to/medium_articles_2020_dpr.json', 'utf8'));
  
  res = await client.search({
      collection_name: "medium_articles_2020",
      vector: data.rows[0].title_vector,
      limit: 5,
      output_fields: ['title', 'claps', 'responses'],
      filter: "claps > 1500 and responses > 15"
  })
  ```
  
  </TabItem>
  </Tabs>

- 搜索由 **Towards Data Science** 发布的文章：
  <Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "JavaScript", "value": "javascript"}]}>
  <TabItem value='python'>

  ```python
  with open("path/to/medium_articles_2020_dpr.json") as f:
      data = json.load(f)
  
  res = client.search(
      collection_name="medium_articles_2020",
      data=[data["rows"][0]["title_vector"]],
      limit=5,
      output_fields=["title", "publication"],
      filter='publication == "Towards Data Science"'
  )
  
  # 输出
  # [
  #     [
  #         {
  #             "id": 70,
  #             "distance": -0.7525784969329834,
  #             "entity": {
  #                 "title": "How bad will the Coronavirus Outbreak get? \u2014 Predicting the outbreak figures",
  #                 "publication": "Towards Data Science"
  #             }
  #         },
  #         {
  #             "id": 111,
  #             "distance": -0.6888885498046875,
  #             "entity": {
  #                 "title": "The role of AI in web-based ADA and WCAG compliance",
  #                 "publication": "Towards Data Science"
  #             }
  #         },
  #         {
  #             "id": 103,
  #             "distance": -0.6340133547782898,
  #             "entity": {
  #                 "title": "A Primer on Domain Adaptation",
  #                 "publication": "Towards Data Science"
  #             }
  #         },
  #         {
  #             "id": 94,
  #             "distance": -0.6249957084655762,
  #             "entity": {
  #                 "title": "Why Machine Learning Validation Sets Grow Stale",
  #                 "publication": "Towards Data Science"
  #             }
  #         },
  #         {
  #             "id": 90,
  #             "distance": -0.6230067014694214,
  #             "entity": {
  #                 "title": "SVM: An optimization problem",
  #                 "publication": "Towards Data Science"
  #             }
  #         }
  #     ]
  # ]
  ```
  
  </TabItem>

  <TabItem value='javascript'>

  ```javascript
  const fs = require("fs")
  
  const data = JSON.parse(fs.readFileSync('path/to/medium_articles_2020_dpr.json', 'utf8'));
  
  res = await client.search({
      collection_name: "medium_articles_2020",
      vector: data.rows[0].title_vector,
      limit: 5,
      output_fields: ['title', 'publication'],
      filter: 'publication == "Towards Data Science"'
  })
  ```
  
  </TabItem>
  </Tabs>

- 搜索不是由 **Towards Data Science** 和 **Personal Growth** 发布的文章：
  <Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "JavaScript", "value": "javascript"}]}>
  <TabItem value='python'>

  ```python
  with open("path/to/medium_articles_2020_dpr.json") as f:
      data = json.load(f)
  
  res = client.search(
      collection_name="medium_articles_2020",
      data=[data["rows"][0]["title_vector"]],
      output_fields=["title", "publication"],
      limit=5,
      filter='publication not in ["Towards Data Science", "Personal Growth"]'
  )
  
  # 输出
  # [
  #     [
  #         {
  #             "id": 0,
  #             "distance": -1.0,
  #             "entity": {
  #                 "title": "The Reported Mortality Rate of Coronavirus Is Not Important",
  #                 "publication": "The Startup"
  #             }
  #         },
  #         {
  #             "id": 160,
  #             "distance": -0.7132074236869812,
  #             "entity": {
  #                 "title": "The Funeral Industry is a Killer",
  #                 "publication": "The Startup"
  #             }
  #         },
  #         {
  #             "id": 196,
  #             "distance": -0.6882869601249695,
  #             "entity": {
  #                 "title": "The Question We Should Be Asking About the Cost of Youth Sports",
  #                 "publication": "The Startup"
  #             }
  #         },
  #         {
  #             "id": 51,
  #             "distance": -0.6719912886619568,
  #             "entity": {
  #                 "title": "What if Facebook had to pay you for the profit they are making?",
  #                 "publication": "The Startup"
  #             }
  #         }
  #     ]
  # ]
  ```
  
  </TabItem>

  <TabItem value='javascript'>

  ```javascript
  const fs = require("fs")
  
  const data = JSON.parse(fs.readFileSync('path/to/medium_articles_2020_dpr.json', 'utf8'));
  
  res = await client.search({
      collection_name: "medium_articles_2020",
      vector: data.rows[0].title_vector,
      limit: 5,
      output_fields: ['title', 'publication'],
      filter: 'publication not in ["Towards Data Science", "Personal Growth"]'
  })
  ```
  
  </TabItem>
  </Tabs>

- 搜索标题以 **Top** 开头的文章：
  <Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "JavaScript", "value": "javascript"}]}>
  <TabItem value='python'>

  ```python
  with open("path/to/medium_articles_2020_dpr.json") as f:
      data = json.load(f)
  
  res = client.search(
      collection_name="medium_articles_2020",
      data=[data["rows"][0]["title_vector"]],
      output_fields=["title", "link"],
      limit=5,
      filter='title like "Top%"'
  )
  
  # 输出
  # [
  #     [
  #         {
  #             "id": 75,
  #             "distance": -0.5751268267631531,
  #             "entity": {
  #                 "title": "Top Trends of Graph Machine Learning in 2020",
  #                 "link": "https://towardsdatascience.com/top-trends-of-graph-machine-learning-in-2020-1194175351a3"
  #             }
  #         },
  #         {
  #             "id": 76,
  #             "distance": -0.5366824865341187,
  #             "entity": {
  #                 "title": "Top 20 Data Science Discord servers to join in 2020",
  #                 "link": "https://towardsdatascience.com/top-20-data-science-discord-servers-to-join-in-2020-567b45738e9d"
  #             }
  #         },
  #         {
  #             "id": 74,
  #             "distance": -0.5235060453414917,
  #             "entity": {
  #                 "title": "Top 10 Artificial Intelligence Trends for 2020",
  #                 "link": "https://towardsdatascience.com/top-10-ai-trends-for-2020-d6294cfee2bd"
  #             }
  #         },
  #         {
  #             "id": 97,
  #             "distance": -0.5228530764579773,
  #             "entity": {
  #                 "title": "Top 5 AI Conferences To Visit in Europe in 2020",
  #                 "link": "https://towardsdatascience.com/top-5-ai-conferences-to-visit-in-europe-in-2020-7a6f068aff34"
  #             }
  #         },
  #         {
  #             "id": 69,
  #             "distance": -0.4541875422000885,
  #             "entity": {
  #                 "title": "Top 10 In-Demand programming languages to learn in 2020",
  #                 "link": "https://towardsdatascience.com/top-10-in-demand-programming-languages-to-learn-in-2020-4462eb7d8d3e"
  #             }
  #         }
  #     ]
  # ]
  ```
  
  </TabItem>

  <TabItem value='javascript'>

  ```javascript
  const fs = require("fs")
  
  const data = JSON.parse(fs.readFileSync('path/to/medium_articles_2020_dpr.json', 'utf8'));
  
  res = await client.search({
      collection_name: "medium_articles_2020",
      vector: data.rows[0].title_vector,
      limit: 5,
      output_fields: ['title'],
      filter: 'title like "Top%"'
  })
  ```
  
  </TabItem>
  </Tabs>

- 搜索由 **Towards Data Science** 发布的文章，且文章拥有超过 1500 个回应（`responses`）和 15 个点赞（`claps`）或阅读时间在 10 到 15 分钟内：
  <Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "JavaScript", "value": "javascript"}]}>
  <TabItem value='python'>

  ```python
  with open("path/to/medium_articles_2020_dpr.json") as f:
      data = json.load(f)
  
  res = client.search(
      collection_name="medium_articles_2020",
      data=[data["rows"][0]["title_vector"]],
      limit=5,
      output_fields=["title", "publication", "claps", "response", "reading_time"],
      filter='(publication == "Towards Data Science") and ((claps > 1500 and responses > 15) or (10 < reading_time < 15))'
  )
  
  # 输出
  # [
  #     [
  #         {
  #             "id": 103,
  #             "distance": -0.6340133547782898,
  #             "entity": {
  #                 "title": "A Primer on Domain Adaptation",
  #                 "reading_time": 12,
  #                 "publication": "Towards Data Science",
  #                 "claps": 74
  #             }
  #         },
  #         {
  #             "id": 90,
  #             "distance": -0.6230067014694214,
  #             "entity": {
  #                 "title": "SVM: An optimization problem",
  #                 "reading_time": 11,
  #                 "publication": "Towards Data Science",
  #                 "claps": 44
  #             }
  #         },
  #         {
  #             "id": 75,
  #             "distance": -0.5751268267631531,
  #             "entity": {
  #                 "title": "Top Trends of Graph Machine Learning in 2020",
  #                 "reading_time": 11,
  #                 "publication": "Towards Data Science",
  #                 "claps": 1100
  #             }
  #         },
  #         {
  #             "id": 99,
  #             "distance": -0.572611927986145,
  #             "entity": {
  #                 "title": "Finding optimal NBA physiques using data visualization with Python",
  #                 "reading_time": 13,
  #                 "publication": "Towards Data Science",
  #                 "claps": 89
  #             }
  #         },
  #         {
  #             "id": 80,
  #             "distance": -0.5648838877677917,
  #             "entity": {
  #                 "title": "Understanding Natural Language Processing: how AI understands our languages",
  #                 "reading_time": 13,
  #                 "publication": "Towards Data Science",
  #                 "claps": 109
  #             }
  #         }
  #     ]
  # ]
  ```
  
  </TabItem>

  <TabItem value='javascript'>

  ```javascript
  const fs = require("fs")
  
  const data = JSON.parse(fs.readFileSync('path/to/medium_articles_2020_dpr.json', 'utf8'));
  
  res = await client.search({
      collection_name: "medium_articles_2020",
      vector: data.rows[0].title_vector,
      limit: 5,
      output_fields: ["title", "publication", "claps", "responses", "reading_time"],
      filter: '(publication == "Towards Data Science") and ((claps > 1500 and responses > 15) or (10 < reading_time < 15))'
  })
  ```
  
  </TabItem>
  </Tabs>

## 查询 {#inquiries}

查询是指使用布尔表达式筛选出满足条件的 Entity。查询时使用的布尔表达式仅支持标量字段。

<Tabs defaultValue='python' values={[{"label": "Python", "value": "python"}, {"label": "JavaScript", "value": "javascript"}]}>
<TabItem value='python'>

```python
res = client.query(
    collection_name="medium_articles_2020",
    filter='(publication == \"Towards Data Science\") and ((claps > 1500 and responses > 15) or (10 < reading_time < 15))',
    output_fields=["title", "link"]    
)

print(res)

# 输出：
# [
#     {
#         "title": "Top 10 In-Demand programming languages to learn in 2020",
#         "link": "https://towardsdatascience.com/top-10-in-demand-programming-languages-to-learn-in-2020-4462eb7d8d3e",
#         "id": 69
#     },
#     {
#         "title": "Data Cleaning in Python: the Ultimate Guide (2020)",
#         "link": "https://towardsdatascience.com/data-cleaning-in-python-the-ultimate-guide-2020-c63b88bf0a0d",
#         "id": 73
#     },
#     {
#         "title": "Top Trends of Graph Machine Learning in 2020",
#         "link": "https://towardsdatascience.com/top-trends-of-graph-machine-learning-in-2020-1194175351a3",
#         "id": 75
#     },
#     {
#         "title": "Rage Quitting Cancer Research",
#         "link": "https://towardsdatascience.com/rage-quitting-cancer-research-5e79cb04801",
#         "id": 79
#     },
#     {
#         "title": "Understanding Natural Language Processing: how AI understands our languages",
#         "link": "https://towardsdatascience.com/understanding-nlp-how-ai-understands-our-languages-77601002cffc",
#         "id": 80
#     },
#     {
#         "title": "SVM: An optimization problem",
#         "link": "https://towardsdatascience.com/svm-an-optimization-problem-242cbb8d96a8",
#         "id": 90
#     },
#     {
#         "title": "Finding optimal NBA physiques using data visualization with Python",
#         "link": "https://towardsdatascience.com/finding-optimal-nba-physiques-using-data-visualization-with-python-6ce27ac5b68f",
#         "id": 99
#     },
#     {
#         "title": "A Primer on Domain Adaptation",
#         "link": "https://towardsdatascience.com/a-primer-on-domain-adaptation-cf6abf7087a3",
#         "id": 103
#     }
# ]
```

</TabItem>

<TabItem value='javascript'>

```javascript
res = await client.query({
    collection_name: "medium_articles_2020",
    filter: '(publication == \\"Towards Data Science\\")\\
            and ((claps > 1500 and responses > 15)\\
            or (10 < reading_time < 15))',
    output_fields: ["title", "link"]
});

// 输出：
// {
//   status: { error_code: 'Success', reason: '' },
//   data: [
//     {
//       title: 'Top 10 In-Demand programming languages to learn in 2020',
//       link: '<https://towardsdatascience.com/top-10-in-demand-programming-languages-to-learn-in-2020-4462eb7d8d3e>',
//       id: '69'
//     },
//     {
//       title: 'Data Cleaning in Python: the Ultimate Guide (2020)',
//       link: '<https://towardsdatascience.com/data-cleaning-in-python-the-ultimate-guide-2020-c63b88bf0a0d>',
//       id: '73'
//     },
//     {
//       title: 'Top Trends of Graph Machine Learning in 2020',
//       link: '<https://towardsdatascience.com/top-trends-of-graph-machine-learning-in-2020-1194175351a3>',
//       id: '75'
//     },
//     ...
//   ]
// }
```

</TabItem>
</Tabs>

以上示例代码的查询结果为字典列表。每个字典包含 `id` 键和其他指定输出字段。

## 相关文档 {#related-doc}

- [定制 Schema](./use-customized-schema)

- [开启动态 Schema](./enable-dynamic-schema)

- [JSON](./javascript-object-notation-json-1)

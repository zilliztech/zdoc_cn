---
sidebar_position: 4
---

# 向量搜索和查询

本文介绍如何在 Zilliz Cloud 中执行近似最近邻（Approximate Nearest Neighbour，ANN）搜索和查询。搜索是指在 Collection 中查找与指定查询向量最接近的向量，查询是基于指定条件筛选出满足条件的数据。

## 概述

Zilliz Cloud 采用 ANN 算法来处理向量搜索请求，支持搜索并返回与指定查询向量最相似的前 *K* 个 Entity。为优化性能和吞吐，Zilliz Cloud 支持批量搜索，即同时指定多个查询向量并行搜索。您可以定义布尔表达式来缩小 ANN 搜索的范围。

## 开始前

执行 ANN 搜索或查询前，请确保已完成以下步骤：

- 已连接到创建了 Collection 的目标集群。详情请参见[连接集群](https://zilliverse.feishu.cn/wiki/HU31wDHCCiN9qIknZ2fcLmconNh)和[创建 Collection](https://zilliverse.feishu.cn/wiki/MNcZwAfV6iZxbckfKBlcmCzanti)。

- 已下载示例数据集并已将数据插入到 Collection 中。详情请参见[示例数据集](https://zilliverse.feishu.cn/wiki/ZoXbwP8hJivPw2ktsLrckw0Snif)和[插入 Entity](https://zilliverse.feishu.cn/wiki/Am0bwdNmliIZ9OkUB2DcdkOBnAe)。

- 阅读本指南系列时，建议[下载代码示例](https://assets.zilliz.com/zdoc/zilliz_cloud_sdk_examples.zip)。

> 📘 说明
>
> 本指南系列中创建的 Collection 包含 `id` 主键和 `vector` 向量字段。如果您希望完全自定义 Collection，请参见[定制 Schema](https://zilliverse.feishu.cn/wiki/VCp1wTKc8io1kGkHknEcHX25nLb)、[开启动态 Schema](https://zilliverse.feishu.cn/wiki/EpHowtn3miepTyk2pNlcLwDonyD) 和 [JSON](https://zilliverse.feishu.cn/wiki/UXBjwVpKmirzg9kgWgmcLixwnIe)。

## 单向量搜索

单向量搜索是指搜索并返回与指定的某个查询向量最相似的前 *K* 个Entity。

以下是单向量搜索的示例代码：

```python
with open("medium_articles_2020_dpr.json") as f:
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
#    [
#       {'id': 0, 'distance': -1.0, 'entity': {'title': 'The Reported Mortality Rate of Coronavirus Is Not Important'}},
#       {'id': 70, 'distance': -0.7525784969329834, 'entity': {'title': 'How bad will the Coronavirus Outbreak get? — Predicting the outbreak figures'}},
#       {'id': 160, 'distance': -0.7132074236869812, 'entity': {'title': 'The Funeral Industry is a Killer'}},
#       {'id': 111, 'distance': -0.6888885498046875, 'entity': {'title': 'The role of AI in web-based ADA and WCAG compliance'}},
#       {'id': 196, 'distance': -0.6882869601249695, 'entity': {'title': 'The Question We Should Be Asking About the Cost of Youth Sports'}},
#       {'id': 51, 'distance': -0.6719912886619568, 'entity': {'title': 'What if Facebook had to pay you for the profit they are making?'}},
#       {'id': 178, 'distance': -0.6699185371398926, 'entity': {'title': 'Is The Environmental Damage Due To Cruise Ships Irreversible?'}},
#       {'id': 47, 'distance': -0.6680259704589844, 'entity': {'title': 'What Happens When the Google Cookie Crumbles?'}},
#       {'id': 135, 'distance': -0.6597772836685181, 'entity': {'title': 'How to Manage Risk as a Product Manager'}}
#    ]
# ]
```

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

您可以在搜索请求中引用搜索参数，并指定查询向量、向量字段名称、返回结果限制以及其他相关参数。以上代码搜索与指定查询向量最相近的 5 条 Entity，并返回各 Entity 的主键、距离等信息。

## 批量搜索

Zilliz Cloud 支持在单个请求中同时指定多个查询向量来进行批量搜索。大多数情况下，批量搜索比单向量搜索效率更高，因为批量搜索的总延时会比逐一执行单向量搜索的累计延时要低。

您可以迭代数据集中的行，并以行为单位发送搜索请求：

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
#    [
#      {'id': 1, 'distance': -0.9999998807907104, 'entity': {'title': 'Dashboards in Python: 3 Advanced Examples for Dash Beginners and Everyone Else'}},
#      {'id': 4, 'distance': -0.7625510692596436, 'entity': {'title': 'Python NLP Tutorial: Information Extraction and Knowledge Graphs'}},
#      {'id': 17, 'distance': -0.7366295456886292, 'entity': {'title': 'Blockchain, IoT and AI — A Perfect Fit'}},
#      {'id': 98, 'distance': -0.7285258769989014, 'entity': {'title': 'How To Write Movie Reviews with AI'}},
#      {'id': 96, 'distance': -0.712313711643219, 'entity': {'title': 'Feature Selection Techniques in Python: Predicting Hotel Cancellations'}}
#    ],
#    [
#      {'id': 2, 'distance': -1.0, 'entity': {'title': 'How Can We Best Switch in Python?'}},
#      {'id': 36, 'distance': -0.7909263372421265, 'entity': {'title': 'Building a Simple CLI Calculator App in Java'}},
#      {'id': 23, 'distance': -0.7671353220939636, 'entity': {'title': 'How Does the Internet Work?'}},
#      {'id': 98, 'distance': -0.7641586065292358, 'entity': {'title': 'How To Write Movie Reviews with AI'}},
#      {'id': 80, 'distance': -0.7512190341949463, 'entity': {'title': 'Understanding Natural Language Processing: how AI understands our languages'}}
#    ]
# ]
```

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

## 基于条件搜索

过滤条件是用于定义 ANN 搜索条件的布尔表达式。您可以使用算术、逻辑和比较运算符来定义过滤条件。

| 操作符         | 描述                                                       |
| ----------- | -------------------------------------------------------- |
| and (&&)    | 两个操作数同时为真才为真                                             |
| or (\\|\\|) | 一真则真，两个操作数同时为假才为假                                        |
| +, -, *, /  | 加法、减法、 乘法、除法                                             |
| **          | 取幂                                                       |
| %           | 取模                                                       |
| <, >        | 小于、大于                                                    |
| ==, !=      | 等于、不等于                                                   |
| <=, >=      | 小于等于、大于等于                                                |
| not         | 取反                                                       |
| like        | 使用通配符运算符将一个值与类似的值进行比较。例如，`prefix％` 将匹配以 `prefix` 开头的字符串。 |
| in          | 判断表达式是否与列表中的任何值匹配                                        |

以下是一些带有过滤条件的 ANN 搜索示例。

- 搜索阅读时间（`reading_time`）在 10 到 15 分钟内的文章：
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
  ```

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

- 搜索点赞数（`claps`）超过 1500 且回应数（`responses`）超过 15 的文章：
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
  ```

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

- 搜索由 **Towards Data Science** 发布的文章：
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
  ```

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

- 搜索不是由 **Towards Data Science** 和 **Personal Growth** 发布的文章：
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
  ```

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

- 搜索标题以 **Top** 开头的文章：
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
  ```

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

- 搜索由 **Towards Data Science** 发布的文章，且文章拥有超过 1500 个回应（`responses`）和 15 个点赞（`claps`）或阅读时间在 10 到 15 分钟内：
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
  ```

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

## 查询

查询是指使用布尔表达式筛选出满足条件的 Entity。查询时使用的布尔表达式仅支持标量字段。

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
#        'title': 'Top 10 In-Demand programming languages to learn in 2020', 
#        'link': '<https://towardsdatascience.com/top-10-in-demand-programming-languages-to-learn-in-2020-4462eb7d8d3e>', 
#        'id': 69
#     }, 
#     {
#         'title': 'Data Cleaning in Python: the Ultimate Guide (2020)', 
#         'link': '<https://towardsdatascience.com/data-cleaning-in-python-the-ultimate-guide-2020-c63b88bf0a0d>', 
#         'id': 73
#    }, 
#    ...
# ]
```

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

以上示例代码的查询结果为字典列表。每个字典包含 `id` 键和其他指定输出字段。

## 相关文档

- [定制 Schema](https://zilliverse.feishu.cn/wiki/VCp1wTKc8io1kGkHknEcHX25nLb)

- [开启动态 Schema](https://zilliverse.feishu.cn/wiki/EpHowtn3miepTyk2pNlcLwDonyD)

- [JSON](https://zilliverse.feishu.cn/wiki/UXBjwVpKmirzg9kgWgmcLixwnIe)

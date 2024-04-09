---
slug: /conduct-a-range-search
beta: FALSE
notebook: FALSE
type: origin
token: VdpLwTKnPinYj6kBGOBckmpfnud
sidebar_position: 8
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 范围搜索

了解如何根据 Entity 的相似程度来筛选向量搜索结果至关重要。通过限制查询向量与其他向量之间的距离，范围搜索能够实现对搜索结果的有效细化。

本指南介绍如何在 Zilliz Cloud 中执行范围搜索。在整个范围搜索流程中，Zilliz Cloud 首先基于向量之间的相似性进行搜索，随后通过指定的向量距离进行过滤，以确保最终获得的向量结果位于设定的距离范围内。

<Admonition type="info" icon="📘" title="说明">

<p>目前，范围搜索功能处于 Beta 测试阶段。请注意，该功能及相关文档在 Beta 测试期间可能会有所更改。</p>

</Admonition>

## 开始前{#before-you-start}

在执行范围搜索前，请确保以下几点：

- 您的集群已升级至 Beta 版本。

- 您已下载了示例数据集，更多详情参见[示例数据集](./example-dataset)。

- 您已根据示例数据集创建了相应 Schema 的 Collection，并且该 Collection 已完成索引构建及加载。详细信息请参见[开启动态 Schema](./enable-dynamic-schema)。

## 步骤简介{#quick-steps-for-a-range-search}

1. 加载 Collection 与插入数据：首先确保您的 Collection 已加载，并且数据已插入至 Collection。

1. 设置范围过滤：定义 `radius` 和 `range_filter` 参数，以控制搜索精准度。Zilliz Cloud 支持使用 __L2__（欧几里得距离）和 __IP__（内积）作为距离测量的度量类型。`radius` 和 `range_filter` 的设置将受到选用的距离测量度量类型的影响。

1. 执行搜索：根据步骤 2 设置的参数进行范围搜索。您将得到的向量结果会位于指定的范围内，符合您选择的距离度量标准。

<Admonition type="info" icon="📘" title="说明">

<p>此处的代码示例默认您已按照<a href="./create-collection">创建 Collection</a> 的步骤完成 Collection 的创建和数据插入。</p>

</Admonition>

## 步骤 1：加载 Collection 与插入数据{#step-1-load-collection-and-insert-data}

开始前，请确保 Collection 已被加载至内存，因 Zilliz Cloud 的搜索和查询功能在内存中执行。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
from pymilvus import Collection

DATASET_PATH="{}/../medium_articles_2020_dpr.json".format(os.path.dirname(__file__)) # Set your dataset path

# (Continued)

collection = Collection(COLLECTION_NAME)

# Load collection
collection.load()

# Get loading progress
progress = utility.loading_progress(COLLECTION_NAME)

print(progress)

# Output
#
# {
#     "loading_progress": "100%"
# }

# Prepare a list of rows
with open(DATASET_PATH) as f:
    data = json.load(f)
    rows = data['rows']

print(rows[:3])

# Output
#
# [
#     {
#         "id": 0,
#         "title": "The Reported Mortality Rate of Coronavirus Is Not Important",
#         "title_vector": [
#             0.041732933,
#             0.013779674,
#             -0.027564144,
#             -0.013061441,
#             0.009748648,
#             0.00082446384,
#             -0.00071647146,
#             0.048612226,
#             -0.04836573,
#             -0.04567751,
#             "(758 more items hidden)"
#         ],
#         "link": "https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912",
#         "reading_time": 13,
#         "publication": "The Startup",
#         "claps": 1100,
#         "responses": 18
#     },
#     {
#         "id": 1,
#         "title": "Dashboards in Python: 3 Advanced Examples for Dash Beginners and Everyone Else",
#         "title_vector": [
#             0.0039737443,
#             0.003020432,
#             -0.0006188639,
#             0.03913546,
#             -0.00089768134,
#             0.021238148,
#             0.014454661,
#             0.025742851,
#             0.0022063442,
#             -0.051130578,
#             "(758 more items hidden)"
#         ],
#         "link": "https://medium.com/swlh/dashboards-in-python-3-advanced-examples-for-dash-beginners-and-everyone-else-b1daf4e2ec0a",
#         "reading_time": 14,
#         "publication": "The Startup",
#         "claps": 726,
#         "responses": 3
#     },
#     {
#         "id": 2,
#         "title": "How Can We Best Switch in Python?",
#         "title_vector": [
#             0.031961977,
#             0.00047043373,
#             -0.018263113,
#             0.027324716,
#             -0.0054595284,
#             -0.014779159,
#             0.017511465,
#             0.030381083,
#             -0.018930407,
#             -0.03372473,
#             "(758 more items hidden)"
#         ],
#         "link": "https://medium.com/swlh/how-can-we-best-switch-in-python-458fb33f7835",
#         "reading_time": 6,
#         "publication": "The Startup",
#         "claps": 500,
#         "responses": 7
#     }
# ]

# Insert data
results = collection.insert(rows)

print(f"Data inserted successfully! inserted rows: {results.insert_count}")

# Output
#
# Data inserted successfully! inserted rows: 5979

time.sleep(10)
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
const data_file = `./medium_articles_2020_dpr.json`
const collectionName = "medium_articles_2020"

async function main() {
    // (Continued)
    
    res = await client.loadCollection({
        collection_name: collectionName
    });
    
    console.log(res);
    
    // Output
    // { error_code: 'Success', reason: '' }
    
    res = await client.getLoadingProgress({
        collection_name: collectionName
    });
    
    console.log(res);
    
    // Output:
    // { status: { error_code: 'Success', reason: '' }, progress: '100' }
}

// 5. Insert vectors
const data = JSON.parse(fs.readFileSync(data_file, "utf8"))

// read rows
const rows = data["rows"]
const row = rows[0]

console.log(Object.keys(row))

// Output
// 
// [
//   'id',
//   'title',
//   'title_vector',
//   'link',
//   'reading_time',
//   'publication',
//   'claps',
//   'responses'
// ]
// 

//insert vectors
res = await client.insert({
    collection_name: collectionName,
    data: rows
})

console.log(res)

// Output
// 
// {
//   succ_index: [
//      0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
//     12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
//     24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
//     36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
//     48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
//     60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
//     72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
//     84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
//     96, 97, 98, 99,
//     ... 5879 more items
//   ],
//   err_index: [],
//   status: { error_code: 'Success', reason: '', code: 0 },
//   IDs: { int_id: { data: [Array] }, id_field: 'int_id' },
//   acknowledged: false,
//   insert_cnt: '5979',
//   delete_cnt: '0',
//   upsert_cnt: '0',
//   timestamp: '445332879628304386'
// }
// 

await sleep(5000)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.param.LoadCollectionParam;

// (Continued)

// Load collection

LoadCollectionParam loadCollectionParam = LoadCollectionParam.newBuilder()
.withCollectionName(collectionName)
.build();

R<RpcStatus> loadCollectionRes = client.loadCollection(loadCollectionParam);

if (loadCollectionRes.getException() != null) {
System.err.println("Failed to load collection: " + loadCollectionRes.getException().getMessage());
return;
}

System.out.println("Collection loaded!");

// Output:
// Collection loaded!

// 6. Insert vectors

String content;

// read a local file
Path file = Path.of(data_file);
try {
    content = Files.readString(file);
} catch (Exception e) {
    System.err.println("Failed to read file: " + e.getMessage());
    return;
}

System.out.println("Successfully read file");

// Output:
// Successfully read file

// Load dataset
JSONObject dataset = JSON.parseObject(content);
List<JSONObject> rows = getRows(dataset.getJSONArray("rows"), 5979);
List<Field> fields = getFields(dataset.getJSONArray("rows"), 5979);

InsertParam insertParam = InsertParam.newBuilder()
    .withCollectionName(collectionName)
    .withFields(fields)
    .build();

R<MutationResult> insertResponse = client.insert(insertParam);

if (insertResponse.getStatus() != R.Status.Success.getCode()) {
    System.err.println(insertResponse.getMessage());
}

MutationResultWrapper mutationResultWrapper = new MutationResultWrapper(insertResponse.getData());

System.out.println("Successfully insert entities: " + mutationResultWrapper.getInsertCount());   

// Output:
// Successfully insert entities: 5979

// wait for a while
try {
    // pause execution for 5 seconds
    Thread.sleep(5000);
} catch (InterruptedException e) {
    // handle the exception
    Thread.currentThread().interrupt();
}  
```

</TabItem>
</Tabs>

## 步骤 2：设置范围过滤{#step-2-configure-range-filtering}

使用 Zilliz Cloud 进行范围搜索时，有两个关键参数与标准向量搜索不同：

- `radius`：设定相似性的最低阈值。

- `range_filter`：可选参数，进一步细化搜索范围，限定在特定的相似性区间内。

`radius` 和 `range_filter` 参数均为 __FLOAT__ 类型，它们在保证搜索准确性与效率之间起着平衡作用。

### 距离度量的影响{#distance-metrics-influence}

- __L2__ 距离：筛选出距离小于 `radius` 的向量，因为较短的 __L2__ 距离代表更高的相似性。若想排除结果中最接近的向量，可将 `range_filter` 设定为低于 `radius` 的值。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"}]}>
    <TabItem value='python'>

    ```python
    # Define search parameters
    search_params = {
        "metric_type": "L2",
        "params": {
            "nprobe": 10,
            "radius": 1.0,
            "range_filter": 0.8
        }
    }
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    const params = {
        nprobe: 10,
        radius: 1.0,
        range_filter: 0.8
    }
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    params = "{\"nprobe\": 10, \"radius\": 1.0, \"range_filter\": 0.8}"
    ```

    </TabItem>
    </Tabs>

- __IP__ 距离：筛选出距离大于 `radius` 的向量，因为更大的 __IP__ 距离意味着更高的相似性。在此情况下，应将 `range_filter` 设定为高于 `radius` 的值，以排除最相似的向量。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"}]}>
    <TabItem value='python'>

    ```python
    # Define search parameters
    # When metric_type is set to IP,
    # `radius` and `range_filter` are reversed compared to `L2` metric
    
    search_params = {
        "metric_type": "IP",
        "params": {
            "nprobe": 10,
            "radius": 0.8,
            "range_filter": 1.0
        }
    }
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    // Define search parameters
    // When metric_type is set to IP,
    // `radius` and `range_filter` are reversed compared to `L2` metric
    
    const params = {
        nprobe: 10,
        radius: 0.8,
        range_filter: 1.0
    }
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    params = "{\"nprobe\": 10, \"radius\": 0.8, \"range_filter\": 1.0}"
    ```

    </TabItem>
    </Tabs>

## 步骤 3：执行范围搜索{#step-3-execute-the-range-search}

参数设置完毕后，开始检索落在特定范围内的向量：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
# conduct a range search
query_vector = rows[0]['title_vector']

res = collection.search(
    data=[query_vector],
    anns_field="title_vector",
    param=search_params,
    output_fields=["title", "link"],
    limit=100,
)

ids = [ hits.ids for hits in res ]

print(ids)

# Output
#
# [
#     [
#         1846,
#         2906,
#         4411,
#         3503,
#         4397,
#         4969,
#         2705,
#         3185,
#         5532,
#         1969,
#         "(90 more items hidden)"
#     ]
# ]

distances = [ hits.distances for hits in res ]

print(distances)

# Output
#
# [
#     [
#         0.8001112341880798,
#         0.8001610040664673,
#         0.8003642559051514,
#         0.8004330992698669,
#         0.8004655838012695,
#         0.8004793524742126,
#         0.8005216121673584,
#         0.8005879521369934,
#         0.8005922436714172,
#         0.8007100224494934,
#         "(90 more items hidden)"
#     ]
# ]

results = [ {
    "id": hit.id,
    "distance": hit.distance,
    "entity": {
        "title": hit.entity.get("title"),
        "link": hit.entity.get("link"),
    }
} for hits in res for hit in hits ]

print(results)

# Output
#
# [
#     {
#         "id": 1846,
#         "distance": 0.8001112341880798,
#         "entity": {
#             "title": "Simple VSCode Setup To Develop C++",
#             "link": "https://medium.com/swlh/simple-vscode-setup-to-develop-c-7830182ee4d8"
#         }
#     },
#     {
#         "id": 2906,
#         "distance": 0.8001610040664673,
#         "entity": {
#             "title": "Binary cross-entropy and logistic regression",
#             "link": "https://towardsdatascience.com/binary-cross-entropy-and-logistic-regression-bf7098e75559"
#         }
#     },
#     {
#         "id": 4411,
#         "distance": 0.8003642559051514,
#         "entity": {
#             "title": "Why Passion Is Not Enough in the Working World \u2014 Learn Professionalism Instead",
#             "link": "https://medium.com/swlh/why-passion-is-not-enough-in-the-working-world-learn-professionalism-instead-d1bdb0acd750"
#         }
#     },
#     {
#         "id": 3503,
#         "distance": 0.8004330992698669,
#         "entity": {
#             "title": "Figma to video prototyping \u2014 easy way in 3 steps",
#             "link": "https://uxdesign.cc/figma-to-video-prototyping-easy-way-in-3-steps-d7ac3770d253"
#         }
#     },
#     {
#         "id": 4397,
#         "distance": 0.8004655838012695,
#         "entity": {
#             "title": "An Introduction to Survey Research",
#             "link": "https://medium.com/swlh/an-introduction-to-survey-research-ba9e9fb9ca57"
#         }
#     },
#     {
#         "id": 4969,
#         "distance": 0.8004793524742126,
#         "entity": {
#             "title": "Warning: Your campaign (process) is broken",
#             "link": "https://medium.com/swlh/warning-your-campaign-process-is-broken-97f3c603f8aa"
#         }
#     },
#     {
#         "id": 2705,
#         "distance": 0.8005216121673584,
#         "entity": {
#             "title": "Exploratory Data Analysis: DataPrep.eda vs Pandas-Profiling",
#             "link": "https://towardsdatascience.com/exploratory-data-analysis-dataprep-eda-vs-pandas-profiling-7137683fe47f"
#         }
#     },
#     {
#         "id": 3185,
#         "distance": 0.8005879521369934,
#         "entity": {
#             "title": "Modelling Volatile Time Series with LSTM Networks",
#             "link": "https://towardsdatascience.com/modelling-volatile-time-series-with-lstm-networks-51250fb7cfa3"
#         }
#     },
#     {
#         "id": 5532,
#         "distance": 0.8005922436714172,
#         "entity": {
#             "title": "Removing \u2018The Wall\u2019 in ML Ops",
#             "link": "https://towardsdatascience.com/removing-the-wall-in-ml-ops-44dac377b4c6"
#         }
#     },
#     {
#         "id": 1969,
#         "distance": 0.8007100224494934,
#         "entity": {
#             "title": "Base Plotting in R",
#             "link": "https://towardsdatascience.com/base-plotting-in-r-eb365da06b22"
#         }
#     },
#     "(90 more items hidden)"
# ]
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 6. Conduct a range search

res = await client.search({
    collection_name: collectionName,
    vector: rows[0].title_vector,
    limit: 100,
    filter: "claps > 30 and reading_time < 10",
    output_fields: ["title", "link"],
    params: {
        nprobe: 10,
        radius: 1.0,
        range_filter: 0.8
    }
});

// Count the results

console.log(res.results.length);

// Output
// 
// 100
// 

// List first few results

console.log(res.results.slice(0, 5));

// Output
// 
// [
//   {
//     score: 0.8003642559051514,
//     id: '4411',
//     title: 'Why Passion Is Not Enough in the Working World — Learn Professionalism Instead',
//     link: 'https://medium.com/swlh/why-passion-is-not-enough-in-the-working-world-learn-professionalism-instead-d1bdb0acd750'
//   },
//   {
//     score: 0.8004330992698669,
//     id: '3503',
//     title: 'Figma to video prototyping — easy way in 3 steps',
//     link: 'https://uxdesign.cc/figma-to-video-prototyping-easy-way-in-3-steps-d7ac3770d253'
//   },
//   {
//     score: 0.8004655838012695,
//     id: '4397',
//     title: 'An Introduction to Survey Research',
//     link: 'https://medium.com/swlh/an-introduction-to-survey-research-ba9e9fb9ca57'
//   },
//   {
//     score: 0.8005216121673584,
//     id: '2705',
//     title: 'Exploratory Data Analysis: DataPrep.eda vs Pandas-Profiling',
//     link: 'https://towardsdatascience.com/exploratory-data-analysis-dataprep-eda-vs-pandas-profiling-7137683fe47f'
//   },
//   {
//     score: 0.8005879521369934,
//     id: '3185',
//     title: 'Modelling Volatile Time Series with LSTM Networks',
//     link: 'https://towardsdatascience.com/modelling-volatile-time-series-with-lstm-networks-51250fb7cfa3'
//   }
// ]
// 
```

</TabItem>

<TabItem value='java'>

```java
// 7. Search vectors

List<List<Float>> queryVectors = new ArrayList<>();
List<Float> queryVector1 = rows.get(0).getJSONArray("title_vector").toJavaList(Float.class);
queryVectors.add(queryVector1);

List<String> outputFields = new ArrayList<>();
outputFields.add("title");
outputFields.add("link");

// Search vectors in a collection

SearchParam searchParam = SearchParam.newBuilder()
    .withCollectionName(collectionName)
    .withVectorFieldName("title_vector")
    .withVectors(queryVectors)
    .withTopK(5)   
    .withMetricType(MetricType.L2) 
    // Set the 'radius' and 'range_filter' here! 
    .withParams("{\"nprobe\":10,\"radius\":1.0, \"range_filter\":0.8}")
    .withConsistencyLevel(ConsistencyLevelEnum.BOUNDED)
    .withOutFields(outputFields)
    .withExpr("(publication == \"Towards Data Science\") and ((claps > 1500 and responses > 15) or (10 < reading_time < 15))")
    .build();

R<SearchResults> response = client.search(searchParam);

SearchResultsWrapper wrapper = new SearchResultsWrapper(response.getData().getResults());

List<List<JSONObject>> results = new ArrayList<>();

for (int i = 0; i < queryVectors.size(); ++i) {
    List<SearchResultsWrapper.IDScore> scores = wrapper.getIDScore(i);
    List<JSONObject> entities = new ArrayList<>();
    for (int j = 0; j < scores.size(); ++j) {
        SearchResultsWrapper.IDScore score = scores.get(j);
        JSONObject entity = new JSONObject(1, true);
        entity.put("id", score.getLongID());
        entity.put("distance", score.getScore());
        entity.put("title", scores.get(j).get("title"));
        entity.put("link", scores.get(j).get("link"));
        entities.add(entity);
    }
    
    results.add(entities);
} 

System.out.println(results);

// Output:
// [[
//     {
//         "distance": 0.800161,
//         "link": "https://towardsdatascience.com/binary-cross-entropy-and-logistic-regression-bf7098e75559",
//         "id": 445494450042705136,
//         "title": "Binary cross-entropy and logistic regression"
//     },
//     {
//         "distance": 0.80130583,
//         "link": "https://towardsdatascience.com/what-i-learnt-from-taking-a-masters-in-computer-vision-and-machine-learning-69f0c6dfe9df",
//         "id": 445494450042703937,
//         "title": "What I Learnt From Taking A Masters In Computer Vision And Machine Learning"
//     },
//     {
//         "distance": 0.8042611,
//         "link": "https://towardsdatascience.com/do-not-use-to-join-strings-in-python-f89908307273",
//         "id": 445494450042703425,
//         "title": "Do Not Use \u201c+\u201d to Join Strings in Python"
//     },
//     {
//         "distance": 0.8053469,
//         "link": "https://towardsdatascience.com/using-data-science-to-study-economic-inequality-in-the-united-states-1101e9350c3d",
//         "id": 445494450042703983,
//         "title": "Using Data Science to Study Economic Inequality in the United States"
//     },
//     {
//         "distance": 0.80535966,
//         "link": "https://towardsdatascience.com/learn-ai-today-01-getting-started-with-pytorch-2e3ba25a518",
//         "id": 445494450042703567,
//         "title": "Learn AI Today: 01 \u2014 Getting started with Pytorch"
//     }
// ]]
```

</TabItem>
</Tabs>

## 要点总结{#takeaways}

根据您设定的 `radius` 和 `range_filter`，Zilliz Cloud 会返回符合指定范围的向量。以下是一个快速参考表，概括了不同距离度量如何影响这些设置。

|  度量类型   |  配置                                      |
| ------- | ---------------------------------------- |
|  __L2__ |  `range_filter` \<= distance \< `radius` |
|  __IP__ |  `radius` \< distance \<= `range_filter` |

## 相关文档{#related-topics}

- [向量搜索和查询](./search-query-and-get)

- [使用迭代器搜索和查询](./search-and-query-iterators)

- [使用高级表达式搜索和查询](./search-and-query-advanced-expressions)


---
displayed_sidebar: restfulSidebar
sidebar_position: {{sidebar_position}}
slug: /restful/{{page_slug}}
title: {{page_title}}
---

import RestHeader from '@site/src/components/RestHeader';

{{page_excerpt | split_excerpt}}

<RestHeader method="{{page_method}}" endpoint="{{server}}{{page_url}}" />

---

## 示例

{% if page_excerpt | split_example === '' %}

{{ page_title | get_example }}

{% else %}

{{ page_excerpt | split_example }}

{% endif %}

## 请求

### 参数

{% if query_params | length > 0 -%}

- 查询参数

    | 参数名称          | 参数说明                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    {%- for param in query_params %}
    | `{{param['name']}}`  | **{{param['schema']['type']}}** {%- if param['required'] -%}（必选）{%- endif -%}<br/>{{param['description']}}{%- if param['default'] -%}<br/>默认值为 **{{param['default']}}**.{%- endif -%}{%- if param['minimum'] and param['maximum'] -%}<br/>参数取值范围在 **{{param['minimum']}}** 到 **{{param['maximum']}}** 之间.{%- endif -%}{%- if param['minimum'] and not param['maximum'] -%}<br/>最小值为 **{{param['minimum']}}**.{%- endif -%}{%- if param['maximum'] and not param['minimum'] -%}<br/>最大值为 **{{param['maximum']}}**.{%- endif -%} |
    {%- endfor %}

{%- else -%}

- 无查询参数。

{%- endif %}

{% if path_params | length > 0 -%}

- 路径参数

    | 参数名称        | 参数说明                                                                             |
    |------------------|-------------------------------------------------------------------------------------------|
    {%- for param in path_params %}
    | `{{param['name']}}`  | **{{param['schema']['type']}}** {%- if param['required'] -%}（必选）{%- endif -%}<br/>{{param['description']}}{%- if param['default'] -%}<br/>默认值为 **{{param['default']}}**.{%- endif -%}{%- if param['minimum'] and param['maximum'] -%}<br/>参数取值范围在 **{{param['minimum']}}** 到 **{{param['maximum']}}** 之间.{%- endif -%}{%- if param['minimum'] and not param['maximum'] -%}<br/>最小值为 **{{param['minimum']}}**.{%- endif -%}{%- if param['maximum'] and not param['minimum'] -%}<br/>最大值为 **{{param['maximum']}}**.{%- endif -%} |
    {%- endfor %}

{%- else -%}

- 无路径参数。

{%- endif %}

{% if header_params | length > 0 -%}

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    {%- for param in header_params %}
    | __{{param['name']}}__  | **{{param['schema']['type']}}** {%- if param['required'] -%}(required){%- endif -%}<br>{{param['description']}}{%- if param['default'] -%}<br>The value defaults to **{{param['default']}}**.{%- endif -%}{%- if param['minimum'] and param['maximum'] -%}<br>The value ranges from **{{param['minimum']}}** to **{{param['maximum']}}**.{%- endif -%}{%- if param['minimum'] and not param['maximum'] -%}<br>The minimum value is **{{param['minimum']}}**.{%- endif -%}{%- if param['maximum'] and not param['minimum'] -%}<br>The maximum value is **{{param['maximum']}}**.{%- endif -%} |
    {%- endfor %}

{%- else -%}

- 无请求头参数

{%- endif %}

### 请求体

{%- if req_bodies | length > 0 -%}
{%- for req_body in req_bodies %}

{%- if req_bodies | length > 1 %}

#### 选项 {{loop.index}}: {{req_body['description']}}
{%- endif %}

```json
{{req_body | req_format }}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
{{ req_body | prepare_entries }}

{%- endfor %}
{%- else %}

No request body required

{%- endif %}

## 响应

{{ res_desc }}

### 响应体

{%- if res_bodies | length > 0 -%}
{%- for res_body in res_bodies %}

{%- if res_bodies | length > 1 %}

#### 选项 {{loop.index}}: {{res_body['description']}}
{%- endif %}

```json
{{res_body | res_format }}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br>表示当前操作是否成功。<br><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
{{ res_body | prepare_entries }}

{%- endfor %}
{%- endif %}

### 错误响应

```json
{
    "code": integer,
    "message": string
}
```

| 属性名称    | 属性描述                                                                                                                                    |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__    | **integer**<br>表示当前操作是否成功。<br><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __message__ | **string**<br>表示错误信息。                                                                        |

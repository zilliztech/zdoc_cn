---
displayed_sidebar: restfulSidebar
sidebar_position: {{sidebar_position}}
slug: /restful/{{page_slug}}
title: {{page_title}}
---

import RestHeader from '@site/src/components/RestHeader';

{{page_excerpt}}

<RestHeader method="{{page_method}}" endpoint="{{server}}{{page_url}}" />

---

## 示例

{{ page_title | get_example }}

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

### 请求体

{%- if req_bodies | length > 0 -%}
{%- for req_body in req_bodies %}

```json
{{req_body | req_format }}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
{{ req_body | prepare_entries }}


{%- endfor %}
{%- else %}

无请求体。

{%- endif %}

## 响应

{{ res_desc }}

### 响应体

- 处理请求成功后返回

```json
{{res_body | res_format }}
```

- 处理请求失败后返回

```json
{
    "code": integer,
    "message": string
}
```

### 属性

下表罗列了响应包含的所有属性。

| 属性名称  | 属性描述                                                                                                                               |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `code`   | **integer**<br/>表示请求是否成功。<br/><ul><li>`200`：请求成功。</li><li>其它：存在错误。</li></ul> |
{{ res_body | prepare_entries }}
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
{{ page_slug | list_error }}

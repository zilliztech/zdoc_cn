import os
import json

def iterate_dict(d, path, strings):
    for k, v in d.items():
        if not k.startswith('x-'):
            if isinstance(v, dict):
                iterate_dict(v, path + '["' + k + '"]', strings)
            elif isinstance(v, list):
                iterate_list(v, path + '["' + k + '"]', strings)
            elif not translated(path + '["' + k + '"]', strings):
                strings.append(path + '["' + k + '"]' + '="' + v + '"') if k in ['summary', 'description'] else []

    return strings

def iterate_list(l, path, strings):
    for i, v in enumerate(l):
        if isinstance(v, dict):
            iterate_dict(v, path + '[' + str(i) + ']', strings)
        elif isinstance(v, list):
            iterate_list(v, path + '[' + str(i) + ']', strings)

def translated(path, strings):
    print(path)
    return path in list(map(lambda x: x.split("=")[0], strings))

if __name__ == '__main__':
    with open('apis/openapi.json') as f:
        openapi = json.load(f)

    if os.path.exists('apis/zh-CN.properties'):
        with open('apis/zh-CN.properties') as f:
            strings = f.read().splitlines()
    else:
        strings = []

    # list all 'summary' and 'description' of all path and parameters in a separate i18n file with specific key paths
    # for example: 'paths./api/v1/health.get.summary' and 'paths./api/v1/health.get.description'

    strings = iterate_dict(openapi["paths"], '["paths"]', strings)

    with open('apis/zh-CN.properties', 'w') as f:
        f.write('\n'.join(strings))
    
    

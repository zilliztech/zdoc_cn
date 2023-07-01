import os, json, re, shutil
import logging
import requests
from dotenv import load_dotenv
from datetime import datetime
from tqdm import tqdm
from urllib import parse
from translate import Translator
from slugify import slugify
from urllib import parse

logging.basicConfig(level=logging.DEBUG)

load_dotenv()

APP_ID = os.getenv("APP_ID")
APP_SECRET = os.getenv("APP_SECRET")
FEISHU_HOST = os.getenv("FEISHU_HOST")
SPACE_ID = os.getenv("SPACE_ID")
FIGMA_API_KEY = os.getenv("FIGMA_API_KEY")

translator = Translator(from_lang="zh", to_lang="en", provider="mymemory")

class tokenFetcher:

    def __init__(self):
        self.tenant_access_token = None
        self.tenant_access_token_expire_time = None
        self.__fetch_token()

    def __fetch_token(self):
        res = requests.post(f"{FEISHU_HOST}/open-apis/auth/v3/tenant_access_token/internal", json={
            "app_id": APP_ID,
            "app_secret": APP_SECRET
        }, headers={ "Content-Type": "application/json; charset=utf-8" })

        if res.json()['code'] == 0:
            self.tenant_access_token = res.json()['tenant_access_token']
            self.tenant_access_token_expire_time = datetime.now().timestamp() + res.json()['expire']
    
    def token(self):
        if self.tenant_access_token_expire_time - datetime.now().timestamp() < 30:
            self.__fetch_token()

        return self.tenant_access_token
    
class docScraper:

    def __init__(self, root_node_token):
        self.docs = None
        self.pages = []
        self.root = root_node_token
        self.tokenFetcher = tokenFetcher()
        self.__fetch()

    def __fetch(self):
        URI = f"/open-apis/wiki/v2/spaces/get_node?token={self.root}"
        res = requests.get(f"{FEISHU_HOST}{URI}", headers={
            "Authorization": f"Bearer {self.tokenFetcher.token()}"
        })

        res = res.json()

        if res['code'] == 0:
            self.docs = res['data']['node']
            self.__fetch_children(self.docs)
            self.__fetch_blocks(self.docs) 
        
    def __fetch_children(self, node):
        if node['has_child']:
            URI = f"/open-apis/wiki/v2/spaces/{SPACE_ID}/nodes?page_size=50&parent_node_token={node['origin_node_token']}"
            res = requests.get(f"{FEISHU_HOST}{URI}", headers={
                "Authorization": f"Bearer {self.tokenFetcher.token()}"
            })

            res = res.json()

            if res['code'] == 0:
                node['children'] = res['data']['items']
                for child in tqdm(node['children'], desc=f"Fetching children of {node['title']}"):
                    del(child['creator'])
                    del(child['node_create_time'])
                    del(child['node_token'])
                    del(child['node_type'])
                    del(child['origin_space_id'])
                    del(child['owner'])
                    del(child['space_id'])
                    del(child['parent_node_token'])
                    del(child['obj_create_time'])
                    del(child['obj_edit_time'])
                    self.__fetch_children(child)
                    self.__fetch_blocks(child)

    def __fetch_blocks(self, node):
        self.pages.append(node)
        if node['obj_type'] == 'docx':
            URI = f"/open-apis/docx/v1/documents/{node['obj_token']}/blocks"
            res = requests.get(f"{FEISHU_HOST}{URI}", headers={
                "Authorization": f"Bearer {self.tokenFetcher.token()}"
            })

            res = res.json()

            if res['code'] == 0:
                node['blocks'] = {}
                node['blocks']['items'] = res['data']['items']
                node['blocks']['counts'] = len(res['data']['items'])

            if res['data']['has_more'] and 'page_token' in res['data']:
                self.__fetch_more(node, res['data']['page_token'])

    def __fetch_more(self, node, page_token):          
        URI = f"/open-apis/docx/v1/documents/{node['obj_token']}/blocks?page_token={page_token}"
        res = requests.get(f"{FEISHU_HOST}{URI}", headers={
            "Authorization": f"Bearer {self.tokenFetcher.token()}"
        })

        res = res.json()

        if res['code'] == 0:
            node['blocks']['items'] += res['data']['items']
            node['blocks']['counts'] += len(res['data']['items'])

        if res['data']['has_more'] and 'page_token' in res['data']:
            self.__fetch_more(node, res['data']['page_token'])

class docWriter:
    
    def __init__(self, pages=None, page_blocks=None):
        self.pages = pages
        self.page_blocks = page_blocks
        self.titles = json.loads(open('titles.json', 'r').read())
        self.blocks = None
        self.block_types = [
            "page",
            "text",
            "heading1",
            "heading2",
            "heading3",
            "heading4",
            "heading5",
            "heading6",
            "heading7",
            "heading8",
            "heading9",
            "bullet",
            "ordered",
            "code",
            "quote",
            None,
            "todo",
            "bitable",
            "callout",
            "chat_card",
            "diagram",
            "divider",
            "file",
            "grid",
            "grid_column",
            "iframe",
            "image",
            "isv",
            "mindnote",
            "sheet",
            "table",
            "table_cell",
            "view",
            "quote_container",
            "task",
            "okr",
            "okr_objective",
            "okr_key_result",
            "okr_progress",
            "add_ons",
            "jira_issue"
        ]
        self.code_langs = [
            None,
            "PlainText",
            "ABAP",
            "Ada",
            "Apache",
            "Apex",
            "Assembly",
            "Bash",
            "CSharp",
            "C++",
            "C",
            "COBOL",
            "CSS",
            "CoffeeScript",
            "D",
            "Dart",
            "Delphi",
            "Django",
            "Dockerfile",
            "Erlang",
            "Fortran",
            "FoxPro",
            "Go",
            "Groovy",
            "HTML",
            "HTMLBars",
            "HTTP",
            "Haskell",
            "JSON",
            "Java",
            "JavaScript",
            "Julia",
            "Kotlin",
            "LateX",
            "Lisp",
            "Logo",
            "Lua",
            "MATLAB",
            "Makefile",
            "Markdown",
            "Nginx",
            "Objective",
            "OpenEdgeABL",
            "PHP",
            "Perl",
            "PostScript",
            "Power",
            "Prolog",
            "ProtoBuf",
            "Python",
            "R",
            "RPG",
            "Ruby",
            "Rust",
            "SAS",
            "SCSS",
            "SQL",
            "Scala",
            "Scheme",
            "Scratch",
            "Shell",
            "Swift",
            "Thrift",
            "TypeScript",
            "VBScript",
            "Visual",
            "XML",
            "YAML",
            "CMake",
            "Diff",
            "Gherkin",
            "GraphQL",
            "OpenGL Shading Language",
            "Properties",
            "Solidity",
            "TOML",          
        ]
        self.tokenFetcher = tokenFetcher()

    def write_docs(self, path, blocks=None, sidebar_position=None):
        if blocks is None:
            blocks = self.page_blocks
        else:
            self.page_blocks = blocks

        page = [ x for x in blocks if x['block_type'] == 1 ][0]

        if page and 'children' in page:
            self.blocks = list(map(self.__retrieve_block_by_id, page['children']))
            self.__write_page(page, path=path, sidebar_position=sidebar_position)

    def write_faqs(self, path, blocks):
        self.page_blocks = blocks

        page = [ x for x in blocks if x['block_type'] == 1 ][0] 

        if page and 'children' in page:
            self.blocks = list(map(self.__retrieve_block_by_id, page['children']))
            a = self.__markdown().split('\n')
            header_pos = [ i for i, x in enumerate(a) if x.startswith('##') ]
            sub_pages = []
            for i, x in enumerate(header_pos):
                sub_pages.append(a[x:header_pos[i+1]] if i < len(header_pos)-1 else a[x:])

            for idx, sub_page in enumerate(sub_pages):
                title = sub_page[0].split(' ')[1]
                titles = json.loads(open('titles.json', 'r').read())
                slug = titles[title] if title in titles else title
                with open(f"{path}/faq-{slug}.md", "w") as f:
                    f.write(self.__front_matters(slug=f"faqs/{slug}", sidebar_position=idx))
                    f.write('\n'.join(sub_page)[1:])

    def __write_page(self, block, path, sidebar_position=None):
        title = self.__text_elements(block['page']['elements'])
        titles = json.loads(open('titles.json', 'r').read())
        title = titles[title] if title in titles else title
        with open(f"{path}/{title}.md", "w") as f:
            f.write(self.__front_matters(slug=title, sidebar_position=sidebar_position))
            f.write(self.__markdown())

    def __front_matters(self, slug, sidebar_position=None):
        template = "---\n{fms}\n---\n\n"
        front_matters = []
        if sidebar_position is not None:
            front_matters.append(f"slug: /{slug}")
            front_matters.append(f"sidebar_position: {sidebar_position}")
        if front_matters:
            return template.format(fms='\n'.join(front_matters))
        else:
            return ''

    def __markdown(self, blocks=None, indent=0):
        markdown = []
        idt = " " * indent
        if blocks is None:
            blocks = self.blocks
            markdown.append(self.__page(self.page_blocks[0]['page']))

        for block in blocks:
            print(block['block_id'], self.block_types[block['block_type']-1], block['block_type'])
            if self.block_types[block['block_type']-1] == 'text':
                markdown.append(idt + self.__text(block['text']))

            elif 'heading' in self.block_types[block['block_type']-1]:
                level = int(self.block_types[block['block_type']-1][-1])
                markdown.append(idt + self.__heading(block[f'heading{level}'], level))

            elif self.block_types[block['block_type']-1] == 'bullet':
                markdown.append(self.__bullet(block, indent))

            elif self.block_types[block['block_type']-1] == 'ordered':
                markdown.append(self.__ordered(block, indent))

            elif self.block_types[block['block_type']-1] == 'code':
                markdown.append(self.__code(block['code'], indent))

            elif self.block_types[block['block_type']-1] == 'quote_container':
                markdown.append(self.__quote(block, indent))

            elif self.block_types[block['block_type']-1] == 'image':
                markdown.append(idt + self.__image(block['image']))
                
            elif self.block_types[block['block_type']-1] == 'iframe':
                markdown.append(idt + self.__iframe(block['iframe']))

            elif self.block_types[block['block_type']-1] == 'table':
                markdown.append(self.__table(block['table'], indent))

            else:
                print(f"Unprocessed: {block['block_id']}")

        return re.sub(r'\n{3,}', '\n\n', '\n\n'.join(markdown))

    def __page(self, page):
        return '# ' + self.__text_elements(page['elements'])
    
    def __text(self, text):
        return self.__text_elements(text['elements'])
    
    def __heading(self, heading, level):
        slug = slugify(translator.translate(self.__text_elements(heading['elements'])))
        return '#' * level + ' ' + self.__text_elements(heading['elements']) + ' {#'+ slug + '}'
    
    def __bullet(self, block, indent):
        children = ''
        if 'children' in block:
            children = list(map(self.__retrieve_block_by_id, block['children']))
            children = self.__markdown(children, indent=indent+2)

        return ' ' * indent + '- ' + self.__text_elements(block['bullet']['elements']) + '\n' + children
    
    def __ordered(self, block, indent):
        children = ''
        if 'children' in block:
            children = list(map(self.__retrieve_block_by_id, block['children']))
            children = self.__markdown(children, indent=indent+2)

        return ' ' * indent + '1. ' + self.__text_elements(block['ordered']['elements']) + '\n' + children
    
    def __code(self, code, indent):
        lang = self.code_langs[code['style']['language']] if 'language' in code['style'] else 'plaintext'
        elements = ''.join([ self.__text_run(x) for x in code['elements'] ])
        return f"{' ' * indent}```{lang.lower()}\n{elements}\n```".replace('\n', '\n' + ' ' * indent)
    
    def __quote(self, block, indent):
        res = []
        quotes = list(map(self.__retrieve_block_by_id, block['children']))
        for quote in quotes:
            res.append(f"{self.__text(quote['text'])}")

        type = 'tip' if '说明' in res[0] else 'caution'

        res[0] = f":::{type}"
        res.insert(1, "")
        res.append((""))
        res.append(f":::")

        return ' ' * indent + '\n'.join(res).replace('\n', '\n' + ' ' * indent)
    
    def __image(self, image):
        URI = f"/open-apis/drive/v1/medias/{image['token']}/download"
        res = requests.get(f"{FEISHU_HOST}{URI}", headers={
              "Authorization": f"Bearer {self.tokenFetcher.token()}"
        }, stream=True)

        if res.status_code == 200:
            with open(f'site/static/img/{image["token"]}.png', 'wb') as f:
                for chunk in res:
                    f.write(chunk)

        return f'![{image["token"]}](/img/{image["token"]}.png)'
    
    def __iframe(self, iframe):
        if iframe['component']['iframe_type'] != 8:
            return ''
        else:
            url = parse.unquote(iframe['component']['url'])
            key = parse.urlsplit(url).path.split('/')[2]
            node = ":".join(parse.parse_qs(url)['node-id'][0].split("-"))
            figma_headers = {
                'Accept': 'application/json',
                'X-Figma-Token': FIGMA_API_KEY
            }

            caption = requests.get(f"https://api.figma.com/v1/files/{key}/nodes?ids={node}", headers=figma_headers)
            caption = caption.json()['nodes'][node]['document']['name']
            caption = caption.replace(' ', '-').lower()
            content = requests.get(f"https://api.figma.com/v1/images/{key}?ids={node}&format=png&scale=3", headers=figma_headers)
            content = requests.get(content.json()['images'][node], stream=True)

            if content.status_code == 200:
                with open(f'site/static/img/{caption}.png', 'wb') as f:
                    for chunk in content:
                        f.write(chunk)

            return f'![{caption}](/img/{caption}.png)'                
            
    def __table(self, table, indent):
        cells = table['cells']
        properties = table['property']
        cells = [ list(map(self.__retrieve_block_by_id, x['children'])) for x in self.page_blocks if x['block_id'] in cells ]
        cells = [ self.__markdown(x) for x in cells ]
        cells = [ x.replace("|", "\|").replace('\n', '<br/>') for x in cells ]

        cell_length_matrix = list(map(lambda x: len(x), cells))

        rows = []
        row_length_matrix = []
        if properties['row_size'] * properties['column_size'] == len(table['cells']):
            for i in range(0, len(cells)-1, properties['column_size']):
                rows.append(cells[i:i+properties['column_size']])
                row_length_matrix.append(cell_length_matrix[i:i+properties['column_size']])

            row_template = list(map(max, zip(*row_length_matrix)))
            table_header_divider = list(map(lambda x: '-' * x, row_template)) 
            rows.insert(1, table_header_divider)

        rows = '\n'.join([ self.__format_table_row(x, row_template) for x in rows ])

        return '\n' + ' ' * indent + rows.replace('\n', '\n' + ' ' * indent)

    def __format_table_row(self, row, temp):
        for i in range(len(temp)):
            if len(row[i]) < temp[i]:
                row[i] = row[i] + (temp[i] - len(row[i])) * ' '

        return '| ' + ' | '.join(row) + ' |'
    
    def __retrieve_block_by_id(self, block_id):
        return [ x for x in self.page_blocks if x['block_id'] == block_id ][0]

    def __text_run(self, element):
        content = element['text_run']['content']
        style = element['text_run']['text_element_style']

        if not content.isspace():
            if style['bold']:
                content = f"**{content}**"

            if style['inline_code']:
                content = f"`{content}`"

            if style['italic']:
                content = f"*{content}*"

            if style['strikethrough']:
                content = f"~~{content}~~"

            if style['underline']:
                content = f"__{content}__"
            
            if 'link' in style:
                content = f"[{content}]({self.__convert_link(parse.unquote(style['link']['url']))})"

        return content
    
    def __mention_doc(self, element):
        title = element['mention_doc']['title']
        url = self.__convert_link(parse.unquote(element['mention_doc']['url']))
        

        return f"[{title}]({url})"
    
    def __convert_link(self, url):
        if 'zilliverse' in url:
            token = parse.urlsplit(url).path.split('/')[-1]
            header = parse.urlsplit(url).fragment

            page = [ x for x in self.pages if x['origin_node_token'] == token ]

            if page:
                page = page[0]
                title = page['title']
                slug = self.titles[title] if title in self.titles else title
                url = f"./{slug}"

                if header:
                    header = [ x for x in page['blocks']['items'] if x['block_id'] == header ]

                    if header:
                        header = header[0]
                        block_type = self.block_types[header['block_type']-1]
                        if int(block_type[-1]) in range(9):
                            title = self.__text_elements(header[block_type]['elements'])
                            slug = slugify(translator.translate(title))
                            url += f"#{slug}"

        return url

    def __text_elements(self, elements):
        paragraph = ""
        for element in elements:
            if 'text_run' in element:
                paragraph += self.__text_run(element)
            if 'mention_doc' in element:
                paragraph += self.__mention_doc(element)

        return paragraph

class biTableParser:

    def __init__(self, token):
        self.app_token = token.split('_')[0]
        self.table_id = token.split('_')[1]
        self.tokenFetcher = tokenFetcher()
        self.records = None
        self.__list_records()

    def __list_records(self):
        URI = f"/open-apis/bitable/v1/apps/{self.app_token}/tables/{self.table_id}/records?page_size=500"
        res = requests.get(f"{FEISHU_HOST}{URI}", headers={
            "Authorization": f"Bearer {self.tokenFetcher.token()}"
        })

        res = res.json()

        if res['code'] == 0:
            self.records = res['data']['items']

    def publish_or_not(self, title):
        record = [ x for x in self.records if '页面标题' in x['fields'] and x['fields']['页面标题'] == title ]

        if record:
            return record[0]['fields']['进度'] != '无需中文版'

def category_meta(path, label, position):
    titles = json.loads(open('titles.json', 'r').read())
    with open(f"{path}/_category_.json", 'w') as f:
        json.dump({
            "label": label,
            "position": position,
            "link": {
                "type": "generated-index",
                "title": label,
                "slug": f"/{titles[label] if label in titles else label}"
            }
        }, f, indent=4, ensure_ascii=False)

def clean_up_docs(path='docs'):
    for filename in os.listdir(path):
        file_path = os.path.join(path, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))

def copy_icons(path="icons"):
    for filename in os.listdir(path):
        file_path = os.path.join(path, filename)
        shutil.copy(file_path, 'site/static/img')

# Write docs
def doc_structure(docs, path='docs'):
    current_path = path
    titles = json.loads(open('titles.json', 'r').read())
    for idx, item in enumerate(docs['children']):
        if 'children' in item:
            title = item['title']
            title = titles[title] if title in titles else title
            os.mkdir(f"{path}/{title}")
            current_path = f"{path}/{title}"
            category_meta(current_path, item['title'], idx)
            doc_structure(item, current_path)
        else:
            if bi.publish_or_not(item['title']):
                if item['title'] == '常见问题':
                    os.mkdir("site/docs/faqs")
                    current_path = "site/docs/faqs"
                    idx = 99
                    category_meta(current_path, item['title'], idx)
                    writer.write_faqs(current_path, item['blocks']['items'])
                else:   
                    writer.write_docs(current_path, item['blocks']['items'], sidebar_position=idx)
                    logging.info(f"Writing {item['title']}")

if __name__ == '__main__':

    scraper = docScraper("XyeFwdx6kiK9A6kq3yIcLNdEnDd")

    pages = scraper.pages

    with open("data.json", "w") as f:
        json.dump(scraper.docs, f, indent=4, ensure_ascii=False)

    with open("pages.json", "w") as f:
        json.dump(pages, f, indent=4, ensure_ascii=False)

    with open("data.json", 'r') as f:
        docs = json.load(f)

    with open("pages.json", 'r') as f:
        pages = json.load(f)

    # root page
    token = [ x for x in docs['blocks']['items'] if 'bitable' in x ][0]['bitable']['token']

    bi = biTableParser(token)

    writer = docWriter(pages=pages)

    clean_up_docs(path='site/static/img')
    clean_up_docs(path='site/docs')
    copy_icons()
    doc_structure(docs, path='site/docs')
    

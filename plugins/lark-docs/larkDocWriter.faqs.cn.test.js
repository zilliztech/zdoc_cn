const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const matter = require('gray-matter')

const LarkDocWriter = require('./larkDocWriter')

function createWriter() {
  const writer = new LarkDocWriter('root', 'base', 'default', undefined, 'tmp/source', 'static/img', 'zilliz.saas', true, false)

  writer.__filter_content = (md) => md
  writer.__markdown = async () => [
    '## 分类一{/category-one}',
    '分类一简介',
    '**问题一{#q-1}**',
    '答案一',
    '## 分类二{/category-two}',
    '分类二简介',
    '**问题二{#q-2}**',
    '答案二',
  ].join('\n')

  return writer
}

function createFaqSource() {
  return {
    title: '常见问题',
    node_type: 'docx',
    node_token: 'faq-token',
    blocks: {
      items: [
        { block_id: 'page-root', block_type: 1, children: ['child-1'] },
        { block_id: 'child-1', block_type: 2, text: { elements: [] } },
      ],
    },
  }
}

function textBlock(blockId, content) {
  return {
    block_id: blockId,
    block_type: 2,
    text: {
      elements: [{
        text_run: {
          content,
          text_element_style: {},
        },
      }],
    },
  }
}

function tableCell(blockId, children = []) {
  return {
    block_id: blockId,
    block_type: 32,
    children,
  }
}

test('write_faqs preserves CN source lookup and CN labels/anchors', async () => {
  const writer = createWriter()
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lark-faq-cn-'))

  let fetchCalls = []
  writer.__fetch_doc_source = (type, value) => {
    fetchCalls.push([type, value])
    if (type === 'title' && value === '常见问题') {
      return createFaqSource()
    }
    throw new Error(`Unexpected lookup: ${type}=${value}`)
  }

  await writer.write_faqs(tempDir)

  assert.deepEqual(fetchCalls[0], ['title', '常见问题'])

  const rootFile = path.join(tempDir, 'faqs.md')
  assert.equal(fs.existsSync(rootFile), true)

  const rootContent = fs.readFileSync(rootFile, 'utf8')
  assert.match(rootContent, /title: "FAQs \| CLOUD"/)
  assert.match(rootContent, /# 常见问题/)

  const categoryFile = path.join(tempDir, 'category-one.md')
  assert.equal(fs.existsSync(categoryFile), true)

  const categoryContent = fs.readFileSync(categoryFile, 'utf8')
  assert.match(categoryContent, /## 目录/)
  assert.match(categoryContent, /## 问答/)
  assert.match(categoryContent, /### 问题一 \\{#q-1}/)
  assert.match(categoryContent, /- \[问题一\]\(#q-1\)/)
})

test('front matter escapes YAML double quoted backslashes', () => {
  const writer = createWriter()
  const frontMatter = writer.__front_matters(
    'createRole()',
    'Java | v2',
    'java/v2-Authentication-createRole',
    false,
    false,
    'docx',
    'WJCAdWmpIolcU1x3T3fcZ1J2nWb',
    3,
    'createRole()',
    '',
    'javaSidebar',
    '# createRole()\\{#createrole}'
  )

  const parsed = matter(`${frontMatter}\n\n# createRole()`)

  assert.equal(parsed.data.description, '# createRole()\\{#createrole} | Java | v2')
})

test('table rendering drops columns that are empty in every row', async () => {
  const writer = new LarkDocWriter('', '', '', undefined, '/tmp')
  writer.page_blocks = [
    tableCell('cell-1', ['text-1']),
    textBlock('text-1', 'Cluster Type'),
    tableCell('cell-2'),
    tableCell('cell-3', ['text-3']),
    textBlock('text-3', 'Performance-optimized'),
    tableCell('cell-4'),
  ]

  const html = await writer.__table({
    cells: ['cell-1', 'cell-2', 'cell-3', 'cell-4'],
    property: {
      row_size: 2,
      column_size: 2,
      merge_info: [
        { row_span: 1, col_span: 1 },
        { row_span: 1, col_span: 1 },
        { row_span: 1, col_span: 1 },
        { row_span: 1, col_span: 1 },
      ],
    },
  }, 0)

  assert.match(html, /Cluster Type/)
  assert.match(html, /Performance-optimized/)
  assert.doesNotMatch(html, /<th><\/th>/)
  assert.doesNotMatch(html, /<td><\/td>/)
  assert.equal((html.match(/<th/g) || []).length, 1)
  assert.equal((html.match(/<td/g) || []).length, 1)
})

test('iframe image URLs escape spaces in generated markdown', async () => {
  const writer = new LarkDocWriter('', '', '', undefined, '/tmp', 'static/img', 'zilliz.saas', true, true)
  writer.downloader = {
    __fetchCaption: async () => ({
      nodes: {
        '1:2': {
          document: {
            name: 'Group 427326000',
          },
        },
      },
    }),
  }

  const markdown = await writer.__iframe({
    block_id: 'iframe-1',
    iframe: {
      component: {
        iframe_type: 8,
        url: encodeURIComponent('https://www.figma.com/file/test?node-id=1-2'),
      },
    },
  })

  assert.equal(
    markdown,
    `![Group 427326000](${process.env.IMAGE_BED_URL || 'https://zdoc-imges.oss-cn-hangzhou.aliyuncs.com'}/Group%20427326000.png "Group 427326000")`
  )
})

test('board image URLs use escaped markdown URLs', async () => {
  const writer = new LarkDocWriter('', '', '', undefined, '/tmp', 'static/img', 'zilliz.saas', true, false)
  const markdown = await writer.__board({ token: 'board token' }, 2)

  assert.equal(markdown, '  ![board token](/img/board%20token.png)')
})

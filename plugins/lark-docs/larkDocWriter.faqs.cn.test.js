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

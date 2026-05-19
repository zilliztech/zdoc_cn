const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const RefGen = require('./refGen')

function withTempDir(callback) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'apifox-refgen-lang-filter-'))
  try {
    callback(dir)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

function testOperationWithIncludeLangExcludesZhCnOutput() {
  withTempDir(targetPath => {
    const spec = {
      openapi: '3.0.1',
      info: { title: 'test', version: '1.0.0' },
      tags: [
        {
          name: 'Project Operations (V2)',
        },
      ],
      paths: {
        '/v2/projects/{projectId}/plan': {
          patch: {
            summary: 'Upgrade Project',
            'x-i18n': {
              'zh-CN': {
                summary: '升级项目',
                description: '本接口可更新指定项目的订阅计划。',
              },
            },
            'x-include-langs': ['en-US'],
            tags: ['Project Operations (V2)'],
            parameters: [
              {
                name: 'Authorization',
                in: 'header',
                description: 'API key token',
                required: true,
                schema: { type: 'string' },
              },
            ],
            responses: {
              200: {
                description: 'ok',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        code: { type: 'integer' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {},
      servers: [],
    }

    const refGen = new RefGen({
      specifications: spec,
      lang: 'zh-CN',
      target: 'zilliz',
      target_path: targetPath,
    })

    refGen.make_groups()
    refGen.write_refs()

    const filePath = path.join(
      targetPath,
      'v2',
      'control-plane',
      'project-operations-v2',
      'upgrade-project-v2.mdx',
    )

    assert.equal(fs.existsSync(filePath), false)
  })
}

function run() {
  testOperationWithIncludeLangExcludesZhCnOutput()
  console.log('apifox refGen lang filter tests passed')
}

run()

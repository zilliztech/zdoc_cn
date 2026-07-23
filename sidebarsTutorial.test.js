'use strict'

const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const { pathToFileURL } = require('node:url')

test('loads the guides sidebar through the ESM adapter required for the default sidebar name', async () => {
  const config = fs.readFileSync(path.join(__dirname, 'docusaurus.config.js'), 'utf8')
  const sidebarEntry = config.match(/sidebarPath:\s*require\.resolve\(['"](\.\/sidebarsTutorial\.[^'"]+)['"]\)/)?.[1]

  assert.equal(sidebarEntry, './sidebarsTutorial.mjs')

  const { default: sidebars } = await import(pathToFileURL(path.join(__dirname, sidebarEntry)).href)
  assert.deepEqual(Object.keys(sidebars).sort(), ['default', 'releasesSidebar'])
  assert.ok(Array.isArray(sidebars.default))
  assert.ok(Array.isArray(sidebars.releasesSidebar))
})

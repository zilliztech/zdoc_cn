'use strict'

const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

test('loads the guides sidebar under the name emitted in guide frontmatter', async () => {
  const config = fs.readFileSync(path.join(__dirname, 'docusaurus.config.js'), 'utf8')
  const sidebarEntry = config.match(/sidebarPath:\s*require\.resolve\(['"](\.\/sidebarsTutorial\.[^'"]+)['"]\)/)?.[1]

  assert.equal(sidebarEntry, './sidebarsTutorial.mjs')

  const sidebars = (await import(path.join(__dirname, sidebarEntry))).default
  assert.ok(Array.isArray(sidebars.default))
  assert.ok(Array.isArray(sidebars.releasesSidebar))
})

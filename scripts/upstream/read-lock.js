const fs = require('node:fs');
const path = require('node:path');

const REQUIRED_KEYS = new Set(['repository', 'commit', 'compatibility']);
const OPTIONAL_KEYS = new Set(['source']);
const ALLOWED_KEYS = new Set([...REQUIRED_KEYS, ...OPTIONAL_KEYS]);

function parseScalar(value) {
  const trimmed = value.trim();
  if (/^['"].*['"]$/.test(trimmed)) return trimmed.slice(1, -1);
  if (/^[0-9]+$/.test(trimmed) && trimmed.length < 16) return Number(trimmed);
  return trimmed;
}

function parseLockContent(content) {
  const out = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+#.*$/, '').trim();
    if (!line) continue;
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) throw new Error(`Invalid lock line: ${rawLine}`);
    const key = match[1];
    if (!ALLOWED_KEYS.has(key)) throw new Error(`Invalid extra lock key: ${key}`);
    if (Object.prototype.hasOwnProperty.call(out, key)) throw new Error(`Duplicate lock key: ${key}`);
    out[key] = parseScalar(match[2]);
  }

  for (const key of REQUIRED_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(out, key)) throw new Error(`Missing lock key: ${key}`);
  }

  if (out.repository !== 'zilliztech/zdoc') throw new Error(`Invalid repository: ${out.repository}`);
  if (!/^[a-f0-9]{40}$/.test(out.commit)) throw new Error(`Invalid commit: ${out.commit}`);
  if (out.compatibility !== 1) throw new Error(`Unsupported compatibility: ${out.compatibility}`);
  if (out.source && path.isAbsolute(out.source)) throw new Error('source must be relative when present');
  return out;
}

function readLock(filePath = path.resolve(__dirname, '..', '..', 'upstream.lock')) {
  return parseLockContent(fs.readFileSync(filePath, 'utf8'));
}

module.exports = { parseLockContent, readLock };

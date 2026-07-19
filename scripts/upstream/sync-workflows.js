#!/usr/bin/env node

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const DEFAULT_UPSTREAM = path.resolve(ROOT_DIR, '..', 'zdoc');

const COPIED_PATHS = [
  '.github/workflows/fetch-docs.yml',
  '.github/workflows/_assemble-guides.yml',
  '.github/workflows/_fetch-content-group.yml',
  '.github/workflows/_fetch-guides-sources.yml',
  '.github/workflows/_monitor-docs-progress.yml',
  '.github/workflows/_prepare-translation-batches.yml',
  '.github/workflows/_publish-content-group.yml',
  '.github/workflows/_publish-translation-batches.yml',
  '.github/workflows/_render-guides-table.yml',
  '.github/workflows/_translate-content-group.yml',
  '.github/workflows/_translate-publish-batch.yml',
  '.github/workflows/_verify-docs.yml',
  '.github/workflows/translate-codex.yml',
  'scripts/docs-workflow',
  'scripts/update-lark-doc-snapshot.js',
  'scripts/update-sdk-reference-snapshots.sh',
];

function parseArgs(argv) {
  const options = {
    mode: 'check',
    root: ROOT_DIR,
    upstream: DEFAULT_UPSTREAM,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--write') {
      options.mode = 'write';
    } else if (arg === '--check') {
      options.mode = 'check';
    } else if (arg === '--root') {
      index += 1;
      if (!argv[index]) throw new Error('--root requires a value');
      options.root = path.resolve(argv[index]);
    } else if (arg === '--upstream') {
      index += 1;
      if (!argv[index]) throw new Error('--upstream requires a value');
      options.upstream = path.resolve(argv[index]);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function copyPath(from, to) {
  fs.rmSync(to, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true, dereference: false, preserveTimestamps: false });
}

function writeText(root, relativePath, content) {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function replaceAll(content, replacements) {
  let next = content;
  for (const [from, to] of replacements) {
    next = next.split(from).join(to);
  }
  return next;
}

function applyOssPatch(content) {
  let next = replaceAll(content, [
    ['AWS_ACCESS_KEY_ID', 'OSS_ACCESS_KEY_ID'],
    ['AWS_SECRET_ACCESS_KEY', 'OSS_ACCESS_KEY_SECRET'],
    ['AWS_BUCKET', 'OSS_BUCKET'],
    ['AWS_REGION', 'OSS_REGION'],
  ]);

  if (!next.includes('OSS_ENDPOINT: ${{ vars.OSS_ENDPOINT }}')) {
    next = next.replace(
      /(\n\s+OSS_REGION: \$\{\{ vars\.OSS_REGION \}\})/,
      '$1\n          OSS_ENDPOINT: ${{ vars.OSS_ENDPOINT }}',
    );
  }

  return next;
}

function removeScheduleBlock(content) {
  return content.replace(/\n\s+schedule:\n(?:\s+- cron: .*?\n)+/m, '\n');
}

function applyFetchDocsPatch(content) {
  let next = content;
  next = next.replace(/^name: .+$/m, 'name: fetch CN docs');
  next = removeScheduleBlock(next);
  next = next.replace(/default: true/g, 'default: false');
  next = next.replace(/Global Docs Artifact-Only Build/g, 'CN Docs Artifact-Only Build');
  next = next.replace(/Global Docs Build/g, 'CN Docs Build');
  next = next.replace(/group: docs-production-dev/g, 'group: cn-docs-production-dev');
  return applyOssPatch(next);
}

function applyTranslatePatch(content) {
  return content
    .replace(/ja-JP/g, 'zh-CN')
    .replace(/Japanese/g, 'Chinese')
    .replace(/japanese/g, 'chinese');
}

function transform(relativePath, content) {
  if (relativePath === '.github/workflows/fetch-docs.yml') return applyFetchDocsPatch(content);
  if (relativePath === '.github/workflows/_fetch-content-group.yml') return applyOssPatch(content);
  if (relativePath === '.github/workflows/_fetch-guides-sources.yml') return applyOssPatch(content);
  if (relativePath === '.github/workflows/_translate-content-group.yml') return applyTranslatePatch(content);
  if (relativePath === '.github/workflows/_translate-publish-batch.yml') return applyTranslatePatch(content);
  if (relativePath === '.github/workflows/_publish-translation-batches.yml') return applyTranslatePatch(content);
  if (relativePath === '.github/workflows/translate-codex.yml') return applyTranslatePatch(content);
  return content;
}

function syncInto(root, upstream) {
  for (const relativePath of COPIED_PATHS) {
    const source = path.join(upstream, relativePath);
    const target = path.join(root, relativePath);
    if (!fs.existsSync(source)) throw new Error(`Missing upstream sync source: ${relativePath}`);

    const stat = fs.statSync(source);
    if (stat.isDirectory()) {
      copyPath(source, target);
      continue;
    }

    const content = transform(relativePath, fs.readFileSync(source, 'utf8'));
    writeText(root, relativePath, content);
    if (stat.mode & 0o111) fs.chmodSync(target, stat.mode);
  }
}

function diffDirectories(expected, actual) {
  const result = spawnSync('git', ['diff', '--no-index', '--', expected, actual], {
    encoding: 'utf8',
  });
  if (result.status === 0) return '';
  if (result.status === 1) return `${result.stdout}${result.stderr}`;
  throw new Error(result.stderr || result.stdout || 'git diff --no-index failed');
}

function check(root, upstream) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'zdoc-cn-workflow-sync-'));
  try {
    syncInto(tempRoot, upstream);
    const drift = [];
    for (const relativePath of COPIED_PATHS) {
      const expected = path.join(tempRoot, relativePath);
      const actual = path.join(root, relativePath);
      if (!fs.existsSync(actual)) {
        drift.push(`${relativePath}: missing`);
        continue;
      }
      const diff = diffDirectories(expected, actual);
      if (diff) drift.push(`${relativePath}:\n${diff}`);
    }
    return drift;
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(options.upstream)) throw new Error(`Upstream repo not found: ${options.upstream}`);

  if (options.mode === 'write') {
    syncInto(options.root, options.upstream);
    return;
  }

  const drift = check(options.root, options.upstream);
  if (drift.length > 0) {
    console.error(`Workflow sync drift detected. Run: npm run upstream:sync-workflows\n\n${drift.join('\n')}`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  COPIED_PATHS,
  applyFetchDocsPatch,
  applyOssPatch,
  applyTranslatePatch,
  parseArgs,
  syncInto,
  transform,
};

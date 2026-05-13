const fs = require('node:fs');
const path = require('node:path');
const { normalizeCnContent } = require('../plugins/cn-publish-normalizer/normalizeCnContent');

const ROOT_DIR = path.resolve(__dirname, '..');
const BUILD_DIR = path.join(ROOT_DIR, 'build');

const TEXT_FILE_EXTENSIONS = new Set([
  '.html',
  '.js',
  '.css',
  '.json',
  '.xml',
  '.txt',
  '.md',
  '.map',
]);

const FORBIDDEN_RULES = [
  {
    rule: 'placeholder-endpoint',
    pattern: /YOUR_[A-Z0-9_]*ENDPOINT/g,
    description: 'Residual endpoint placeholder (YOUR_*ENDPOINT) found',
  },
  {
    rule: 'support-url-non-cn',
    pattern: /https?:\/\/support\.zilliz\.com(?:\.cn)?(?:\/[\w\-.~%!$&'()*+,;=:@/?#]*)?/gi,
    description: 'Non-CN support URL form found',
    isForbiddenMatch: (match) => !/^https?:\/\/support\.zilliz\.com\.cn\/hc\/zh-cn\/?$/i.test(match),
  },
  {
    rule: 'sales-or-pricing-non-cn',
    pattern: /https?:\/\/(?:www\.)?zilliz\.com(?:\.cn)?\/(?:contact-sales|pricing)(?:\/[\w\-.~%!$&'()*+,;=:@/?#]*)?/gi,
    description: 'Non-CN sales/pricing URL form found',
    isForbiddenMatch: (match) => !/^https?:\/\/(?:www\.)?zilliz\.com\.cn\/(?:contact-sales|pricing)(?:$|[/?#])/i.test(match),
  },
  {
    rule: 'global-endpoint-non-cn',
    pattern: /https?:\/\/(?:api\.cloud\.zilliz\.com(?!\.cn)|\{(?:cluster-id|project-id)\}\.\{region\}\.api\.zillizcloud\.com(?!\.cn))(?:\/[\w\-.~%!$&'()*+,;=:@/?#]*)?/gi,
    description: 'Global endpoint form found where CN endpoint is required',
  },
];

function shouldScanFile(filePath) {
  return TEXT_FILE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function listArtifactFiles(rootDir) {
  const files = [];
  const queue = [rootDir];

  while (queue.length > 0) {
    const current = queue.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        queue.push(absolutePath);
      } else if (entry.isFile() && shouldScanFile(absolutePath)) {
        files.push(absolutePath);
      }
    }
  }

  return files;
}

function normalizeArtifacts(buildDir = BUILD_DIR) {
  if (!fs.existsSync(buildDir)) {
    throw new Error(`Build directory does not exist: ${buildDir}`);
  }

  const changedFiles = [];
  const files = listArtifactFiles(buildDir);

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const normalized = normalizeCnContent(content);

    if (normalized !== content) {
      fs.writeFileSync(file, normalized, 'utf8');
      changedFiles.push(file);
    }
  }

  return changedFiles;
}

function getLineNumber(content, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (content.charCodeAt(i) === 10) {
      line += 1;
    }
  }
  return line;
}

function scanArtifacts(buildDir = BUILD_DIR) {
  if (!fs.existsSync(buildDir)) {
    throw new Error(`Build directory does not exist: ${buildDir}`);
  }

  const violations = [];
  const files = listArtifactFiles(buildDir);

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');

    for (const rule of FORBIDDEN_RULES) {
      rule.pattern.lastIndex = 0;
      let match;
      while ((match = rule.pattern.exec(content)) !== null) {
        const fullMatch = match[0];
        if (rule.isForbiddenMatch && !rule.isForbiddenMatch(fullMatch)) {
          continue;
        }

        violations.push({
          rule: rule.rule,
          description: rule.description,
          file,
          line: getLineNumber(content, match.index),
          match: fullMatch,
        });
      }
    }
  }

  return violations;
}

function formatViolations(violations) {
  return violations
    .map((v) => `- [${v.rule}] ${v.file}:${v.line} -> ${v.match}`)
    .join('\n');
}

function main() {
  let violations;
  try {
    normalizeArtifacts();
    violations = scanArtifacts();
  } catch (error) {
    console.error(`verify-cn-publish-artifacts failed: ${error.message}`);
    process.exitCode = 1;
    return;
  }

  if (violations.length > 0) {
    console.error('verify-cn-publish-artifacts found forbidden residuals:');
    console.error(formatViolations(violations));
    process.exitCode = 1;
    return;
  }

  console.log('verify-cn-publish-artifacts passed');
}

if (require.main === module) {
  main();
}

module.exports = {
  BUILD_DIR,
  FORBIDDEN_RULES,
  normalizeArtifacts,
  scanArtifacts,
  formatViolations,
};

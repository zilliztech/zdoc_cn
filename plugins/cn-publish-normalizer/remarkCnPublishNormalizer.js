const { normalizeCnContent } = require('./normalizeCnContent');

const TARGET_VALUE_NODE_TYPES = new Set(['text', 'inlineCode', 'code', 'html', 'mdxjsEsm']);
const TARGET_URL_NODE_TYPES = new Set(['link', 'definition']);

function visit(node, visitor, visited = new WeakSet()) {
  if (!node || typeof node !== 'object') {
    return;
  }

  if (visited.has(node)) {
    return;
  }
  visited.add(node);

  visitor(node);

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      visit(child, visitor, visited);
    }
  }
}

function remarkCnPublishNormalizer() {
  return function transformer(tree) {
    visit(tree, (node) => {
      if (TARGET_VALUE_NODE_TYPES.has(node.type)) {
        if (typeof node.value !== 'string' || node.value.length === 0) {
          return;
        }

        node.value = normalizeCnContent(node.value);
        return;
      }

      if (!TARGET_URL_NODE_TYPES.has(node.type)) {
        return;
      }

      if (typeof node.url !== 'string' || node.url.length === 0) {
        return;
      }

      node.url = normalizeCnContent(node.url);
    });

    return tree;
  };
}

module.exports = {
  remarkCnPublishNormalizer,
};

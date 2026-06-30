const assert = require('node:assert/strict');
const Module = require('node:module');

async function testListedDocsRetriesPrematureClose() {
  const originalLoad = Module._load;
  const originalRetryDelay = process.env.FEISHU_RETRY_DELAY_MS;
  let recordsFetches = 0;

  try {
    process.env.FEISHU_RETRY_DELAY_MS = '1';

    Module._load = function patchedLoad(request, parent, isMain) {
      if (request === 'node-fetch') {
        return async function mockedFetch(url, options) {
          assert.equal(options.compress, false);
          assert.equal(options.headers['Accept-Encoding'], 'identity');

          if (String(url).includes('/tables/') && String(url).includes('/records')) {
            recordsFetches += 1;

            if (recordsFetches === 1) {
              const error = new Error('Premature close');
              error.code = 'ERR_STREAM_PREMATURE_CLOSE';
              error.type = 'system';
              throw error;
            }

            return {
              status: 200,
              headers: { get: () => null },
              text: async () => JSON.stringify({ code: 0, data: { items: [{ fields: { Docs: { text: 'Doc', link: 'https://example.com/doc' }, Slug: 'doc' } }] } }),
            };
          }

          return {
            status: 200,
            headers: { get: () => null },
            text: async () => JSON.stringify({ code: 0, data: { items: [{ table_id: 'tbl' }] } }),
          };
        };
      }

      return originalLoad.apply(this, arguments);
    };

    delete require.cache[require.resolve('./feishuFetch')];
    delete require.cache[require.resolve('./larkDocWriter')];
    const WriterWithMockedFetch = require('./larkDocWriter');
    Module._load = originalLoad;

    const writer = new WriterWithMockedFetch('', 'base', 'default');
    writer.tokenFetcher = { token: async () => 'tenant-token' };
    process.env.FEISHU_HOST = 'https://open.feishu.cn';

    await writer.__listed_docs();

    assert.equal(recordsFetches, 2);
    assert.equal(writer.records.length, 1);
  } finally {
    Module._load = originalLoad;
    if (originalRetryDelay === undefined) {
      delete process.env.FEISHU_RETRY_DELAY_MS;
    } else {
      process.env.FEISHU_RETRY_DELAY_MS = originalRetryDelay;
    }
  }
}

async function run() {
  await testListedDocsRetriesPrematureClose();
  console.log('larkDocWriter tests passed');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

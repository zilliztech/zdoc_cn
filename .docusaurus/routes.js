import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', '331'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '3fd'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', 'ea4'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', 'ba0'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', '628'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', 'b52'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '5bd'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', '904'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '060'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '15e'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', 'ead'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', '60b'),
    exact: true
  },
  {
    path: '/reference',
    component: ComponentCreator('/reference', 'c52'),
    routes: [
      {
        path: '/reference',
        component: ComponentCreator('/reference', 'acb'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/cloud-meta',
        component: ComponentCreator('/reference/cloud-meta', '255'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/cluster-operations',
        component: ComponentCreator('/reference/cluster-operations', '7e2'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/collection-operations',
        component: ComponentCreator('/reference/collection-operations', '3af'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/create-collection',
        component: ComponentCreator('/reference/create-collection', '4ba'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/delete',
        component: ComponentCreator('/reference/delete', 'ec4'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/describe-cluster',
        component: ComponentCreator('/reference/describe-cluster', '045'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/describe-collection',
        component: ComponentCreator('/reference/describe-collection', 'ff6'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/drop-collection',
        component: ComponentCreator('/reference/drop-collection', '184'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/get',
        component: ComponentCreator('/reference/get', 'a08'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/get-import-progress',
        component: ComponentCreator('/reference/get-import-progress', '87a'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go',
        component: ComponentCreator('/reference/go', 'eb6'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go/client',
        component: ComponentCreator('/reference/go/client', '590'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go/collection',
        component: ComponentCreator('/reference/go/collection', '840'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go/create_collection',
        component: ComponentCreator('/reference/go/create_collection', '392'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go/delete_by_pks',
        component: ComponentCreator('/reference/go/delete_by_pks', 'c6d'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go/describe_collection',
        component: ComponentCreator('/reference/go/describe_collection', 'b66'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go/drop_collection',
        component: ComponentCreator('/reference/go/drop_collection', 'a80'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go/insert',
        component: ComponentCreator('/reference/go/insert', 'dd8'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go/insert_rows',
        component: ComponentCreator('/reference/go/insert_rows', '2c9'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go/list_collection',
        component: ComponentCreator('/reference/go/list_collection', 'a6e'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go/new-client',
        component: ComponentCreator('/reference/go/new-client', '540'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go/query',
        component: ComponentCreator('/reference/go/query', '44e'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go/query_by_pks',
        component: ComponentCreator('/reference/go/query_by_pks', '5fd'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go/search',
        component: ComponentCreator('/reference/go/search', '097'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/go/vector',
        component: ComponentCreator('/reference/go/vector', '588'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/import',
        component: ComponentCreator('/reference/import', '7ee'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/import-operations',
        component: ComponentCreator('/reference/import-operations', '75b'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/insert',
        component: ComponentCreator('/reference/insert', '7ff'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java',
        component: ComponentCreator('/reference/java', 'e80'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java/client',
        component: ComponentCreator('/reference/java/client', 'ac9'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java/collection',
        component: ComponentCreator('/reference/java/collection', '935'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java/create_collection',
        component: ComponentCreator('/reference/java/create_collection', '422'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java/delete',
        component: ComponentCreator('/reference/java/delete', '598'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java/describe_collection',
        component: ComponentCreator('/reference/java/describe_collection', 'ecb'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java/drop_collection',
        component: ComponentCreator('/reference/java/drop_collection', 'd1a'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java/get',
        component: ComponentCreator('/reference/java/get', '973'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java/insert',
        component: ComponentCreator('/reference/java/insert', 'd98'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java/list_collection',
        component: ComponentCreator('/reference/java/list_collection', 'c2b'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java/milvus_service_client',
        component: ComponentCreator('/reference/java/milvus_service_client', '9c4'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java/query',
        component: ComponentCreator('/reference/java/query', 'c9e'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java/search',
        component: ComponentCreator('/reference/java/search', '891'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java/show_collections',
        component: ComponentCreator('/reference/java/show_collections', '9bd'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/java/vector',
        component: ComponentCreator('/reference/java/vector', '4b9'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/list-cloud-providers',
        component: ComponentCreator('/reference/list-cloud-providers', '4b9'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/list-cloud-regions',
        component: ComponentCreator('/reference/list-cloud-regions', 'f92'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/list-clusters',
        component: ComponentCreator('/reference/list-clusters', '4dc'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/list-collections',
        component: ComponentCreator('/reference/list-collections', '632'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/list-import-jobs',
        component: ComponentCreator('/reference/list-import-jobs', 'f0a'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/nodejs',
        component: ComponentCreator('/reference/nodejs', 'fe4'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/nodejs/client',
        component: ComponentCreator('/reference/nodejs/client', '7e1'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/nodejs/collection',
        component: ComponentCreator('/reference/nodejs/collection', '1c0'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/nodejs/create_collection',
        component: ComponentCreator('/reference/nodejs/create_collection', '56c'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/nodejs/delete',
        component: ComponentCreator('/reference/nodejs/delete', '2da'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/nodejs/describe_collection',
        component: ComponentCreator('/reference/nodejs/describe_collection', '883'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/nodejs/drop_collection',
        component: ComponentCreator('/reference/nodejs/drop_collection', '33a'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/nodejs/get',
        component: ComponentCreator('/reference/nodejs/get', '246'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/nodejs/insert',
        component: ComponentCreator('/reference/nodejs/insert', '054'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/nodejs/milvus-client',
        component: ComponentCreator('/reference/nodejs/milvus-client', '2ce'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/nodejs/query',
        component: ComponentCreator('/reference/nodejs/query', 'b7a'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/nodejs/search',
        component: ComponentCreator('/reference/nodejs/search', 'b85'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/nodejs/show_collection',
        component: ComponentCreator('/reference/nodejs/show_collection', 'efb'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/nodejs/vector',
        component: ComponentCreator('/reference/nodejs/vector', 'b76'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python',
        component: ComponentCreator('/reference/python', '226'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/client',
        component: ComponentCreator('/reference/python/client', '46a'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/collection',
        component: ComponentCreator('/reference/python/collection', '9ca'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/create_collection',
        component: ComponentCreator('/reference/python/create_collection', '4c6'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/delete',
        component: ComponentCreator('/reference/python/delete', 'f73'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/describe_collection',
        component: ComponentCreator('/reference/python/describe_collection', '3ff'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/drop_collection',
        component: ComponentCreator('/reference/python/drop_collection', 'e58'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/flush',
        component: ComponentCreator('/reference/python/flush', '349'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/get',
        component: ComponentCreator('/reference/python/get', '04e'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/insert',
        component: ComponentCreator('/reference/python/insert', 'ff7'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/list_collection',
        component: ComponentCreator('/reference/python/list_collection', 'fb1'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/milvus-client',
        component: ComponentCreator('/reference/python/milvus-client', 'a0d'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/num_entities',
        component: ComponentCreator('/reference/python/num_entities', '3fa'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/query',
        component: ComponentCreator('/reference/python/query', '762'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/search',
        component: ComponentCreator('/reference/python/search', 'e67'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/python/vector',
        component: ComponentCreator('/reference/python/vector', 'ee9'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/query',
        component: ComponentCreator('/reference/query', 'bac'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/restful',
        component: ComponentCreator('/reference/restful', 'e62'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/resume-cluster',
        component: ComponentCreator('/reference/resume-cluster', '62e'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/search',
        component: ComponentCreator('/reference/search', 'cb6'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/suspend-cluster',
        component: ComponentCreator('/reference/suspend-cluster', 'a8f'),
        exact: true,
        sidebar: "referenceSidebar"
      },
      {
        path: '/reference/vector-operations',
        component: ComponentCreator('/reference/vector-operations', '08f'),
        exact: true,
        sidebar: "referenceSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '475'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '625'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/account-and-security',
        component: ComponentCreator('/account-and-security', '9b0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/accounts',
        component: ComponentCreator('/accounts', '67e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/advanced-features',
        component: ComponentCreator('/advanced-features', '8ee'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/authentication',
        component: ComponentCreator('/authentication', '050'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/backup-and-restore',
        component: ComponentCreator('/backup-and-restore', '087'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/cluster',
        component: ComponentCreator('/cluster', '938'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/collection',
        component: ComponentCreator('/collection', 'e76'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/collection-and-index',
        component: ComponentCreator('/collection-and-index', '8f8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/data-import',
        component: ComponentCreator('/data-import', '78f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/a-panorama-view',
        component: ComponentCreator('/docs/a-panorama-view', '654'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/advance-pay',
        component: ComponentCreator('/docs/advance-pay', '04c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/advance-pay-balance-monitor',
        component: ComponentCreator('/docs/advance-pay-balance-monitor', '00a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/ann-search-explained',
        component: ComponentCreator('/docs/ann-search-explained', '476'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/api-comparison',
        component: ComponentCreator('/docs/api-comparison', 'bc3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/autoindex-explained',
        component: ComponentCreator('/docs/autoindex-explained', '85b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/cloud-providers-and-regions',
        component: ComponentCreator('/docs/cloud-providers-and-regions', '3fe'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/cluster-collection-and-entities',
        component: ComponentCreator('/docs/cluster-collection-and-entities', '1a2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/conduct-a-range-search',
        component: ComponentCreator('/docs/conduct-a-range-search', '290'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/connect-to-cluster',
        component: ComponentCreator('/docs/connect-to-cluster', '02a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/consistency-level',
        component: ComponentCreator('/docs/consistency-level', 'b1f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/create-cluster',
        component: ComponentCreator('/docs/create-cluster', '3d0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/create-collection',
        component: ComponentCreator('/docs/create-collection', '728'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/create-snapshot',
        component: ComponentCreator('/docs/create-snapshot', '1f9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/cu-resource-monitor',
        component: ComponentCreator('/docs/cu-resource-monitor', '19b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/cu-types-explained',
        component: ComponentCreator('/docs/cu-types-explained', 'b73'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/data-models-explained',
        component: ComponentCreator('/docs/data-models-explained', 'afb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/data-security',
        component: ComponentCreator('/docs/data-security', '28c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/delete-entities',
        component: ComponentCreator('/docs/delete-entities', 'c03'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/delete-snapshot',
        component: ComponentCreator('/docs/delete-snapshot', '901'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/delete-your-account',
        component: ComponentCreator('/docs/delete-your-account', 'f81'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/delete-your-org',
        component: ComponentCreator('/docs/delete-your-org', '4fa'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/documentation-qa-using-zilliz-cloud-and-llamaindex',
        component: ComponentCreator('/docs/documentation-qa-using-zilliz-cloud-and-llamaindex', 'f41'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/drop-collection',
        component: ComponentCreator('/docs/drop-collection', 'c9c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/enable-dynamic-schema',
        component: ComponentCreator('/docs/enable-dynamic-schema', '69b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/enterprise-certification',
        component: ComponentCreator('/docs/enterprise-certification', '5ca'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/example-dataset',
        component: ComponentCreator('/docs/example-dataset', 'c78'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/faq-account',
        component: ComponentCreator('/docs/faq-account', '703'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/faq-authentication',
        component: ComponentCreator('/docs/faq-authentication', 'e82'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/faq-backup-and-restore',
        component: ComponentCreator('/docs/faq-backup-and-restore', '20c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/faq-cluster',
        component: ComponentCreator('/docs/faq-cluster', '1e7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/faq-collection',
        component: ComponentCreator('/docs/faq-collection', '269'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/faq-data-import',
        component: ComponentCreator('/docs/faq-data-import', '72c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/faq-get-started',
        component: ComponentCreator('/docs/faq-get-started', '265'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/faq-integrations',
        component: ComponentCreator('/docs/faq-integrations', '1bc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/faq-migration',
        component: ComponentCreator('/docs/faq-migration', '3b3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/faq-monitors-and-metrics',
        component: ComponentCreator('/docs/faq-monitors-and-metrics', '781'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/faq-payment-and-billing',
        component: ComponentCreator('/docs/faq-payment-and-billing', '765'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/faq-resource-planning',
        component: ComponentCreator('/docs/faq-resource-planning', 'f18'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/faq-users-and-roles',
        component: ComponentCreator('/docs/faq-users-and-roles', 'fa7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/free-trials',
        component: ComponentCreator('/docs/free-trials', 'afe'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/image-search-with-zilliz-cloud-and-pytorch',
        component: ComponentCreator('/docs/image-search-with-zilliz-cloud-and-pytorch', '8c7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/import-data-on-web-ui',
        component: ComponentCreator('/docs/import-data-on-web-ui', '60d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/import-data-via-restful-api',
        component: ComponentCreator('/docs/import-data-via-restful-api', '72b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/import-data-via-sdks',
        component: ComponentCreator('/docs/import-data-via-sdks', '0de'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/insert-entities',
        component: ComponentCreator('/docs/insert-entities', 'c5a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/install-sdks',
        component: ComponentCreator('/docs/install-sdks', '272'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/invoice',
        component: ComponentCreator('/docs/invoice', 'c4a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/javascript-object-notation-json',
        component: ComponentCreator('/docs/javascript-object-notation-json', '422'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/load-capacity-resource-monitor',
        component: ComponentCreator('/docs/load-capacity-resource-monitor', 'add'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/manage-api-keys',
        component: ComponentCreator('/docs/manage-api-keys', '5ee'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/manage-cluster',
        component: ComponentCreator('/docs/manage-cluster', '103'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/manage-cluster-credentials',
        component: ComponentCreator('/docs/manage-cluster-credentials', 'fda'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/manage-index',
        component: ComponentCreator('/docs/manage-index', '41b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/manage-orgs-and-members',
        component: ComponentCreator('/docs/manage-orgs-and-members', 'e8c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/manage-projects-and-collaborator',
        component: ComponentCreator('/docs/manage-projects-and-collaborator', '2e1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/manage-timezone',
        component: ComponentCreator('/docs/manage-timezone', '3b8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/migrate-beween-clusters',
        component: ComponentCreator('/docs/migrate-beween-clusters', 'ddb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/migrate-from-elasticsearch',
        component: ComponentCreator('/docs/migrate-from-elasticsearch', '644'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/migrate-from-milvus',
        component: ComponentCreator('/docs/migrate-from-milvus', '413'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/monitor-metrics',
        component: ComponentCreator('/docs/monitor-metrics', '551'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/movie-search-using-zilliz-cloud-and-sentencetransformers',
        component: ComponentCreator('/docs/movie-search-using-zilliz-cloud-and-sentencetransformers', '8c8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/multi-factor-authentication',
        component: ComponentCreator('/docs/multi-factor-authentication', '5ef'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/other-differences',
        component: ComponentCreator('/docs/other-differences', '49d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/pricing-calculator',
        component: ComponentCreator('/docs/pricing-calculator', 'c20'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/qps-resource-monitor',
        component: ComponentCreator('/docs/qps-resource-monitor', '9a7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/query-latency-monitor',
        component: ComponentCreator('/docs/query-latency-monitor', 'f10'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/question-answering-over-documents-with-zilliz-cloud-and-langchain',
        component: ComponentCreator('/docs/question-answering-over-documents-with-zilliz-cloud-and-langchain', 'd6a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/question-answering-using-zilliz-cloud-and-cohere',
        component: ComponentCreator('/docs/question-answering-using-zilliz-cloud-and-cohere', '4f8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/question-answering-using-zilliz-cloud-and-hugging-face',
        component: ComponentCreator('/docs/question-answering-using-zilliz-cloud-and-hugging-face', 'db4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/register-with-zilliz-cloud',
        component: ComponentCreator('/docs/register-with-zilliz-cloud', '038'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/release-notes-200',
        component: ComponentCreator('/docs/release-notes-200', '9d4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/release-notes-210',
        component: ComponentCreator('/docs/release-notes-210', 'd0a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/release-notes-220',
        component: ComponentCreator('/docs/release-notes-220', '1b5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/release-notes-221',
        component: ComponentCreator('/docs/release-notes-221', 'dce'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/release-notes-230',
        component: ComponentCreator('/docs/release-notes-230', '81a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/restore-from-snapshot',
        component: ComponentCreator('/docs/restore-from-snapshot', 'aa3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/schedule-automatic-backups',
        component: ComponentCreator('/docs/schedule-automatic-backups', '32a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/search-and-query-advanced-expressions',
        component: ComponentCreator('/docs/search-and-query-advanced-expressions', '861'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/search-and-query-iterators',
        component: ComponentCreator('/docs/search-and-query-iterators', 'f6b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/search-metrics-explained',
        component: ComponentCreator('/docs/search-metrics-explained', '38f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/search-query-and-get',
        component: ComponentCreator('/docs/search-query-and-get', '50a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/select-zilliz-cloud-service-plans',
        component: ComponentCreator('/docs/select-zilliz-cloud-service-plans', 'c7e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/set-up-a-private-link',
        component: ComponentCreator('/docs/set-up-a-private-link', 'a66'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/set-up-maintenance-window',
        component: ComponentCreator('/docs/set-up-maintenance-window', '26d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/set-up-whitelist',
        component: ComponentCreator('/docs/set-up-whitelist', '89a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/similarity-search-with-zilliz-cloud-and-openai',
        component: ComponentCreator('/docs/similarity-search-with-zilliz-cloud-and-openai', '6a5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/subscribe-on-aliyun-marketplace',
        component: ComponentCreator('/docs/subscribe-on-aliyun-marketplace', 'a80'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/upsert-entities',
        component: ComponentCreator('/docs/upsert-entities', '4a9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/use-bulkwriter-for-data-import',
        component: ComponentCreator('/docs/use-bulkwriter-for-data-import', '076'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/use-partition-key',
        component: ComponentCreator('/docs/use-partition-key', 'b34'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/use-recycle-bin',
        component: ComponentCreator('/docs/use-recycle-bin', 'b9a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/view-activities',
        component: ComponentCreator('/docs/view-activities', '49e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/view-invoice',
        component: ComponentCreator('/docs/view-invoice', 'b9d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/view-snapshot-details',
        component: ComponentCreator('/docs/view-snapshot-details', '083'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/faqs',
        component: ComponentCreator('/faqs', 'ba9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/insert-update-and-delete',
        component: ComponentCreator('/insert-update-and-delete', 'f70'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/integrations',
        component: ComponentCreator('/integrations', '3ad'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/limits-and-restrictions',
        component: ComponentCreator('/limits-and-restrictions', '4b7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/migrations',
        component: ComponentCreator('/migrations', '646'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/monitors-metrics',
        component: ComponentCreator('/monitors-metrics', '10f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/organization-settings',
        component: ComponentCreator('/organization-settings', '774'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/payment-billing',
        component: ComponentCreator('/payment-billing', '5f1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/quick-start',
        component: ComponentCreator('/quick-start', 'db3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/release-notes',
        component: ComponentCreator('/release-notes', 'dfd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/resource-planning',
        component: ComponentCreator('/resource-planning', 'f6a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/search-and-query',
        component: ComponentCreator('/search-and-query', '864'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/security',
        component: ComponentCreator('/security', 'b30'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/understand-basics',
        component: ComponentCreator('/understand-basics', 'bb2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/users-roles',
        component: ComponentCreator('/users-roles', '593'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

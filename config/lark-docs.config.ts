interface TargetConfig {
    outputDir: string;
    imageDir: string;
}

interface Targets { [key: string]: TargetConfig | { [key: string]: TargetConfig } }

interface Manual {
    root: string;
    base: string;
    sourceType: 'wiki' | 'drive' | 'onePager';
    version?: string;
    displayedSidebar: string;
    robots?: string;
    docSourceDir: string;
    fallbackSourceDir?: string;
    targets: Targets;
}

// guides ==============================

const guides: Manual = {
    root: 'XyeFwdx6kiK9A6kq3yIcLNdEnDd',
    base: 'MQI8b662gabapmsTl7ZcnTExnSc',
    sourceType: 'wiki',
    displayedSidebar: 'default',
    docSourceDir: './plugins/lark-docs/meta/sources/guides',
    targets: {
        zilliz: {
        saas: {
            outputDir: 'docs/tutorials',
            imageDir: 'static/img',
        },
        paas: {
            outputDir: 'onpremise/docs/vdb',
            imageDir: 'static/byoc',
        }
        },
        milvus: {
        outputDir: 'milvus/guides/docs',
        imageDir: 'milvus/guides/images'
        }
    }
}

const onPremise: Manual = {
    root: 'PXwawNqh0i40H4krMYlc6qgZnKe',
    base: 'V7t6bcQWiaDL99sgUkwcEIJ0nUb',
    sourceType: 'wiki',
    displayedSidebar: 'onPremiseSidebar',
    robots: 'noindex',
    docSourceDir: './plugins/lark-docs/meta/sources/onpremise',
    targets: {
        paas: {
        outputDir: 'onpremise/docs/ops',
        imageDir: 'static/img'
        }
    }
}

const python: Manual = {
    root: 'PTJzfzI0ulKGjwdUsxQcFxfJn6b',
    base: 'D1VabelmAansLwsNTvLc2Wxxn1g',
    sourceType: 'drive',
    version: 'v2.4.x',
    displayedSidebar: 'pythonSidebar',
    docSourceDir: './plugins/lark-docs/meta/sources/python/v2.4.x',
    targets: {
        milvus: {
        outputDir: 'milvus/reference/python/docs/v2.4.x',
        imageDir: 'milvus/reference/python/images'
        },
        zilliz: {
        outputDir: 'reference/api/python/python',
        imageDir: 'static/img',
        }
    }
}

const javaV1: Manual = {
    root: 'D0cfwvTqMiyhSrkCUv4c1a2Fnjd',
    base: 'A4ivb7y2XaIND9s93QZcvwykn0d',
    // root: 'wikcnu8oU4VVbRFKKLjDH5aCIIh',
    // base: 'XJ2RbEDgTakJ80sfUAPcLG4Tnug',
    sourceType: 'onePager',
    version: 'v2.4.x',
    displayedSidebar: 'javaSidebar',
    docSourceDir: './plugins/lark-docs/meta/sources/java/v2.4.x/v1',
    targets: {
        milvus: {
        outputDir: 'milvus/reference/java/docs/v1',
        imageDir: 'milvus/reference/java/images'
        },
        zilliz: {
        outputDir: 'reference/api/java/java/v1',
        imageDir: 'static/img',
        }
    }
}

const javaV2: Manual = {
    root: 'Sg3EfIgVtlTkeBdtguJchE9ynne',
    base: 'WqHJb3zimaxXjssk4Kic4GEDnte',
    // root: 'GYfPfBbdglDhh5dzLH3cYaV1nDf',
    // base: 'Bp72bJ9wEazV1SsA30lcsuJgnfe',
    sourceType: 'drive',
    version: 'v2.4.x',
    displayedSidebar: 'javaSidebar',
    docSourceDir: './plugins/lark-docs/meta/sources/java/v2.4.x/v2',
    targets: {
        milvus: {
        outputDir: 'milvus/reference/java/docs/v2/v2.4.x',
        imageDir: 'milvus/reference/java/images'
        },
        zilliz: {
        outputDir: 'reference/api/java/java/v2',
        imageDir: 'static/img',
        }
    }
}

const node: Manual = {
    root: 'Vg1kfluyll0h7MdlUMaciXfEnZd',
    base: 'DVVobtXQMamuLqsQij5c29nVn3c',
    sourceType: 'drive',
    version: 'v2.4.x',
    displayedSidebar: 'nodeSidebar',
    docSourceDir: './plugins/lark-docs/meta/sources/node/v2.4.x',
    targets: {
        milvus: {
        outputDir: 'milvus/reference/node/docs/v2.4.x',
        imageDir: 'milvus/reference/node/images'
        },
        zilliz: {
        outputDir: 'reference/api/nodejs/nodejs',
        imageDir: 'static/img',
        }
    }
}

const goV1: Manual = {
    root: 'V0SCw3U3siZBynkKhUCcRRAin69',
    base: 'WA8rbgtu8aq3wtsBm02cepOznPJ',
    sourceType: 'wiki',
    version: 'v2.4.x',
    displayedSidebar: 'goSidebar',
    docSourceDir: './plugins/lark-docs/meta/sources/go/v2.4.x',
    targets: {
        milvus: {
        outputDir: 'milvus/reference/go/docs/v1',
        imageDir: 'milvus/reference/go/images'
        },
        zilliz: {
        outputDir: 'reference/api/go/go/v1',
        imageDir: 'static/img',
        }
    }
}

const goV2: Manual = {
    root: 'LaQ1wPdnSiDXDLkMieEcrv95nRc',
    base: 'RWi9b79oeaDNkBsCkAGcoc90nif',
    sourceType: 'wiki',
    version: 'v2.5.x',
    displayedSidebar: 'goSidebar',
    docSourceDir: './plugins/lark-docs/meta/sources/go/v2.5.x',
    targets: {
        milvus: {
        outputDir: 'milvus/reference/go/docs/v2',
        imageDir: 'milvus/reference/go/images'
        },
        zilliz: {
        outputDir: 'reference/api/go/go/v2',
        imageDir: 'static/img',
        }
    }
}

const pymilvus25: Manual = {
    root: 'Z1SFf89zYlGHXvdo6dxcR6gXntc',
    base: 'B8X9bJjJta2q4NskclYcxT7lngG',
    sourceType: 'drive',
    displayedSidebar: 'pythonSidebar',
    docSourceDir: './plugins/lark-docs/meta/sources/python/v2.5.x',
    fallbackSourceDir: './plugins/lark-docs/meta/sources/python/v2.4.x',
    targets: {
        milvus: {
        outputDir: 'milvus/reference/python/docs/v2.5.x',
        imageDir: 'milvus/reference/python/images'
        },
        zilliz: {
        outputDir: 'reference/api/python/python',
        imageDir: 'static/img',
        }
    }
}

const pymilvus26: Manual = {
    root: 'IaWgf4osAlpdwqdVIclct97wnCg',
    base: 'J3Qzbv7AWazzivsv7vqcqlGCnFc',
    sourceType: 'drive',
    displayedSidebar: 'pythonSidebar',
    docSourceDir: './plugins/lark-docs/meta/sources/python/v2.6.x',
    fallbackSourceDir: './plugins/lark-docs/meta/sources/python/v2.5.x',
    targets: {
        milvus: {
        outputDir: 'milvus/reference/python/docs/v2.6.x',
        imageDir: 'milvus/reference/python/images'
        },
        zilliz: {
        outputDir: 'reference/api/python/python',
        imageDir: 'static/img',
        }
    }
}

const javaV225: Manual = {
    root: 'LJ6MfN5wzlHjz8dB642cjUh8nqq',
    base: 'Hsq1bRcqraeQW0sGFJbcI3YIn3d',
    sourceType: 'drive',
    displayedSidebar: 'javaSidebar',
    docSourceDir: './plugins/lark-docs/meta/sources/java/v2.5.x/v2',
    fallbackSourceDir: './plugins/lark-docs/meta/sources/java/v2.4.x/v2',
    targets: {
        milvus: {
        outputDir: 'milvus/reference/java/docs/v2/v2.5.x',
        imageDir: 'milvus/reference/java/images'
        },
        zilliz: {
        outputDir: 'reference/api/java/java/v2',
        imageDir: 'static/img',
        }
    }
}

const nodejs25: Manual = {
    root: 'U9fWfMPdelsPMydYnolcr2aEnBf',
    base: 'JTBebezMDaV8ZhsHF5wc7lJSnuh',
    sourceType: 'drive',
    displayedSidebar: 'nodeSidebar',
    docSourceDir: './plugins/lark-docs/meta/sources/node/v2.5.x',
    fallbackSourceDir: './plugins/lark-docs/meta/sources/node/v2.4.x',
    targets: {
        milvus: {
        outputDir: 'milvus/reference/node/docs/v2.5.x',
        imageDir: 'milvus/reference/node/images'
        },
        zilliz: {
        outputDir: 'reference/api/nodejs/nodejs',
        imageDir: 'static/img',
        }
    }
}

export default {
    guides,
    onPremise,
    python,
    javaV1,
    javaV2,
    node,
    goV1,
    goV2,
    pymilvus25,
    pymilvus26,
    javaV225,
    nodejs25
} 
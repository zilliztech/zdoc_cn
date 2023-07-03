import React, { useState } from 'react';
import Link from '@docusaurus/Link';


export default function IconBar () {
    const PythonIcon = require('@site/static/img/python-icon.svg').default
    const GoIcon = require('@site/static/img/go-icon.svg').default
    const JavaIcon = require('@site/static/img/java-icon.svg').default
    const NodejsIcon = require('@site/static/img/nodejs-icon.svg').default

    return (
        <div style={{ display: "block", width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "row", gap: "2%"  }}>
                <div style={{ display: "block", flex: "20%" }}>
                    <Link to="/docs/api/python">
                        <PythonIcon style={{ width: "100%" }} />
                    </Link>
                </div>
                <div style={{ display: "block", flex: "20%" }}>
                    <Link to="/docs/api/java">
                        <JavaIcon style={{ width: "100%" }} />
                    </Link>
                </div>
                <div style={{ display: "block", flex: "20%" }}>
                    <Link to="/docs/api/go">
                        <GoIcon style={{ width: "100%" }} />
                    </Link>
                </div>
                <div style={{ display: "block", flex: "20%" }}>
                    <Link to="/docs/api/nodejs">
                        <NodejsIcon style={{ width: "100%" }} />
                    </Link>
                </div>
            </div>
        </div>)
}
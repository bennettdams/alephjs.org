/// <reference lib="dom" />
import { Head, Import, NavLink, useRouter } from 'https://deno.land/x/aleph/mod.ts'
import hljs from 'https://esm.sh/highlight.js/lib/core'
import bash from 'https://esm.sh/highlight.js/lib/languages/bash'
import javascript from 'https://esm.sh/highlight.js/lib/languages/javascript'
import json from 'https://esm.sh/highlight.js/lib/languages/json'
import React, { ComponentType, useEffect, useMemo } from 'https://esm.sh/react'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', (hljs: any) => {
    const l = bash(hljs)
    l.keywords.built_in += ' deno aleph'
    return l
})

interface Metadata {
    title: string
    author: string
    date: string
}

export default function Docs({ Page }: { Page?: ComponentType<any> & { meta: Metadata } }) {
    const { pagePath } = useRouter()
    const editUrl = useMemo(() => {
        const md = pagePath === '/docs' ? pagePath + '/index.md' : pagePath + '.md'
        return 'https://github.com/postui/alephjs.org/edit/master/pages' + md
    }, [pagePath])

    useEffect(() => {
        document.querySelectorAll('.docs pre > code').forEach(block => {
            hljs.highlightBlock(block)
        })
    }, [Page])

    return (
        <div className="docs">
            <Head>
                <title>{Page?.meta.title} - Aleph.js</title>
            </Head>
            <Import from="../style/docs.less" />
            <aside>
                <input placeholder="Search..." />
                <h2>Documentation</h2>
                <ul>
                    <li>
                        <NavLink to="/docs">About Aleph.js</NavLink>
                    </li>
                    <li>
                        <NavLink to="/docs/get-started">Get Started</NavLink>
                    </li>
                    <li>
                        <NavLink to="/docs/concepts">Concepts</NavLink>
                    </li>
                </ul>
                <h2>API Reference</h2>
                <ul>
                    <li>
                        <NavLink to="/docs/api-reference/cli">aleph/CLI</NavLink>
                    </li>
                    <li>
                        <NavLink to="/docs/api-reference/link">aleph/Link</NavLink>
                    </li>
                    <li>
                        <NavLink to="/docs/api-reference/head">aleph/Head</NavLink>
                    </li>
                    <li>
                        <NavLink to="/docs/api-reference/router">aleph/Router</NavLink>
                    </li>
                    <li>
                        <NavLink to="/docs/api-reference/config">config.ts</NavLink>
                    </li>
                </ul>
            </aside>
            <div className="content">
                {Page && <Page />}
                <p className="edit-link">
                    <a href={editUrl} target="_blank">Edit this page on Github</a>
                </p>
            </div>
        </div>
    )
}
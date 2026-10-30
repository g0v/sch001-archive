#!/usr/bin/env node
// full build: srcbuild 建置 web/src 後, 以 lib/site 的路由 render 所有頁面至 web/static
const fs = require('fs')
const path = require('path')
const srcbuild = require('@plotdb/srcbuild')
const site = require('../lib/site')

const app = site.app()
const render = p => new Promise((resolve, reject) => {
  app.render(p.view, p.locals, (e, html) => {
    if (e) return reject(new Error(`${p.file}: ${e.message}`))
    const des = path.join(site.dirs.static, p.file)
    fs.mkdirSync(path.dirname(des), { recursive: true })
    fs.writeFileSync(des, html)
    resolve()
  })
})

srcbuild.i18n({ enabled: false })
  .then(i18n => srcbuild.lsp({ base: site.web, i18n }).ready)
  .then(() => {
    const list = site.pages()
    return list.reduce((p, page) => p.then(() => render(page)), Promise.resolve()).then(() => list.length)
  })
  .then(n => {
    console.log(`build done: ${n} pages`)
    process.exit(0)
  })
  .catch(e => {
    console.error(e.message)
    process.exit(1)
  })

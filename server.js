#!/usr/bin/env node
// dev server: srcbuild 監看 web/src ( styl / ls / raw / view ), 頁面由 express 動態 render
const path = require('path')
const srcbuild = require('@plotdb/srcbuild')
const site = require('./lib/site')

const port = +process.env.PORT || 3000
srcbuild.i18n({ enabled: false })
  .then(i18n => {
    srcbuild.lsp({ base: path.relative(process.cwd(), site.web) || '.', i18n })
    site.app().listen(port, () => console.log(`http://localhost:${port}`))
  })

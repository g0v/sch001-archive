// 網站路由與頁面. dev server 與 full build 共用:
//  - page(url) 把網址對應到 view 與 locals
//  - pages() 列出所有要輸出的靜態頁
//  - app() 建立以 srcbuild view engine render 的 express app
// 典藏取代原 grantdash 的 /dash/*, 沿用原網址 ( /dash/brd/<slug>/list, /dash/prj/<slug> ).
// web/static 即網站的 /dash/ 子樹, 網站其餘部份為 sch001-net/static.
const path = require('path')
const express = require('express')
const pugEngine = require('@plotdb/srcbuild/dist/view/pug')
const data = require('./data')
const answer = require('./answer')

const base = '/dash/'
const web = path.join(__dirname, '../web')
const dirs = {
  src: path.join(web, 'src/pug'),
  view: path.join(web, '.view'),
  static: path.join(web, 'static'),
  site: path.join(__dirname, '../sch001-net/static')
}

const badgeOrder = { special: 0, winner: 1, final: 2, short: 3 }
const badgeName = { special: '特別獎', winner: '獲選提案', final: '決選提案', short: '入圍提案' }
const rank = p => p.badge ? badgeOrder[p.badge] : 9

const routes = [{
  re: /^index\.html$/,
  view: 'index',
  locals: () => ({
    boards: data.boards().map(b => Object.assign(b, {
      winners: b.projects.filter(p => p.badge === 'winner' || p.badge === 'special').length
    }))
  })
}, {
  re: /^brd\/([^/]+)\/list\/index\.html$/,
  view: 'brd',
  locals: slug => {
    const brd = data.board(slug)
    if (!brd) return null
    const prjs = brd.projects.slice().sort((a, b) => rank(a) - rank(b))
    const badges = Object.keys(badgeOrder).filter(k => prjs.some(p => p.badge === k))
    return { brd, prjs, badges }
  }
}, {
  re: /^prj\/([^/]+)\/index\.html$/,
  view: 'prj',
  locals: slug => {
    const ret = data.project(slug)
    return ret ? Object.assign({ answer }, ret) : null
  }
}]

// path 為 /dash/ 之下的相對路徑, 可為 ``, `brd/x/list`, `brd/x/list/`, `brd/x/list/index.html` 等形式
function page (url) {
  let p = decodeURIComponent(url).replace(/^\/+/, '')
  if (!p || p.endsWith('/')) p += 'index.html'
  else if (!/\.html$/.test(p)) p += '/index.html'
  for (const r of routes) {
    const m = r.re.exec(p)
    if (!m) continue
    const locals = r.locals(m[1])
    return locals ? { file: p, view: `view/${r.view}.pug`, locals } : null
  }
  return null
}

function pages () {
  return ['']
    .concat(data.boards().flatMap(b => [`brd/${b.slug}/list`].concat(b.projects.map(p => `prj/${p.slug}`))))
    .map(page)
}

function app (opt = {}) {
  const logger = opt.logger || { debug () {}, info () {}, warn: console.warn, error: console.error }
  const app = express()
  app.engine('pug', pugEngine({
    logger,
    viewdir: dirs.view,
    srcdir: dirs.src,
    desdir: dirs.static
  }))
  app.set('view engine', 'pug')
  app.set('views', dirs.src)
  Object.assign(app.locals, { basedir: dirs.src, root: base, badgeName })
  const dash = express.Router()
  dash.use((req, res, next) => {
    const p = page(req.path)
    if (!p) return next()
    res.render(p.view, p.locals)
  })
  dash.use(express.static(dirs.static))
  app.use(base, dash)
  // 網站其餘部份 ( dev 用; 正式環境由 deploy 合併 )
  app.use(express.static(dirs.site))
  return app
}

module.exports = { app, page, pages, dirs, web, base }

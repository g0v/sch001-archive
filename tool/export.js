#!/usr/bin/env node
// 從 db ( psql sch001 ) 匯出公開資料:
//  - data/brd/<slug>.json : 計畫與提案, 僅含公開欄位
//  - web/src/raw/img/prj/<slug>.webp : 壓縮後的提案縮圖
// 匯出後以 db 重新比對, 確認公開內容可完整由 json 重建.
const fs = require('fs')
const path = require('path')
const assert = require('assert')
const { Client } = require('pg')
const sharp = require('sharp')

const root = path.join(__dirname, '..')
const boards = require(path.join(root, 'data/boards.json'))
const uploadRoot = path.join(root, 'backup/users/org/g0v-jothon/prj')
const dataDir = path.join(root, 'data/brd')
const imgDir = path.join(root, 'web/src/raw/img/prj')
const THUMB_SIZE = 800

const db = new Client({ database: process.env.PGDATABASE || 'sch001' })

const isPublic = b => !!(b && b.config && b.config.public)

// 與 grantdash 相同的徽章判定順序
function badgeOf (system) {
  const b = (system && system.badge) || {}
  return b.special ? 'special' : b.winner ? 'winner' : b.finalist ? 'final' : b.shortlist ? 'short' : null
}

// 公開答案只保留渲染所需的欄位
function pickAnswer (ans) {
  if (!ans) return null
  const ret = {}
  ;['content', 'useMarkdown', 'list', 'other', 'otherValue', 'start', 'end', 'sheet'].forEach(k => {
    if (ans[k] !== undefined) ret[k] = ans[k]
  })
  // 附件只留檔名, 不留內部 key 等 metadata
  if (Array.isArray(ret.list)) {
    ret.list = ret.list.map(f => (f && typeof f === 'object' && f.fn) ? { name: f.name, fn: f.fn } : f)
  }
  return Object.keys(ret).length ? ret : null
}

function isEmpty (ans) {
  if (!ans) return true
  if (ans.content) return false
  if (ans.start) return false
  if (Array.isArray(ans.list) && ans.list.length) return false
  if (ans.sheet) return false
  return true
}

function convertThumb (prj) {
  if (!prj.thumb) return Promise.resolve(null)
  const src = path.join(uploadRoot, prj.slug, 'upload', prj.thumb)
  const des = path.join(imgDir, `${prj.slug}.webp`)
  if (!fs.existsSync(src)) return Promise.reject(new Error(`missing thumb: ${src}`))
  if (fs.existsSync(des)) return Promise.resolve(`img/prj/${prj.slug}.webp`)
  return sharp(src, { animated: false })
    .rotate()
    .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(des)
    .then(() => `img/prj/${prj.slug}.webp`)
}

function exportBoard (cfg) {
  const lc = {}
  return db.query(
    'select slug, name, description, detail, starttime, endtime from brd where slug = $1 and deleted is not true',
    [cfg.slug]
  ).then(r => {
    if (!(lc.brd = r.rows[0])) throw new Error(`board not found: ${cfg.slug}`)
    // 與 grantdash prj-list 相同條件: detail 不為 null 且未刪除
    return db.query(`
      select p.slug, p.grp, p.name, p.description, p.tag, p.thumb, p.system, p.detail, p.createdtime,
        u.displayname as ownername
      from prj p join users u on u.key = p.owner
      where p.brd = $1 and p.deleted is not true and p.detail is not null
      order by p.key`, [cfg.slug])
  }).then(r => {
    lc.prjs = r.rows
    return Promise.all(lc.prjs.map(convertThumb))
  }).then(thumbs => {
    const groups = (lc.brd.detail.group || [])
    const projects = lc.prjs.map((p, i) => {
      const grp = groups.find(g => g.key === p.grp) || {}
      const form = grp.form || {}
      const list = form.list || []
      const answer = p.detail.answer || {}
      const purpose = form.purpose || {}
      const teamBlock = list.find(b => b.key === purpose.teamname)
      const info = p.detail.info || {}
      const tags = (Array.isArray(p.tag) ? p.tag : info.tag) || []
      return {
        slug: p.slug,
        name: p.name,
        description: p.description || '',
        group: (grp.info && grp.info.name) || null,
        owner: p.ownername || null,
        team: isPublic(teamBlock) && info.teamname ? info.teamname : null,
        tags: tags.filter(t => t),
        badge: badgeOf(p.system),
        thumb: thumbs[i],
        createdtime: p.createdtime,
        // 縮圖欄位已由 thumb 呈現; 只收公開且有內容的欄位
        fields: list
          .filter(b => isPublic(b) && b.name !== 'form-thumbnail')
          .map(b => ({ key: b.key, type: b.name, title: b.title, answer: pickAnswer(answer[b.key] || b.value) }))
          .filter(f => !isEmpty(f.answer))
      }
    })
    const out = {
      slug: lc.brd.slug,
      label: cfg.label,
      name: lc.brd.name,
      description: lc.brd.description || '',
      starttime: lc.brd.starttime,
      endtime: lc.brd.endtime,
      projects
    }
    fs.writeFileSync(path.join(dataDir, `${cfg.slug}.json`), JSON.stringify(out, null, 2) + '\n')
    lc.out = out
    return verify(lc)
  }).then(() => {
    console.log(`${cfg.slug}: ${lc.out.projects.length} projects`)
  })
}

// 確認 json 中的公開內容與 db 一致, 且未混入非公開欄位
function verify ({ brd, prjs }) {
  const saved = JSON.parse(fs.readFileSync(path.join(dataDir, `${brd.slug}.json`)))
  assert.strictEqual(saved.projects.length, prjs.length, `${brd.slug}: project count`)
  const unsafe = /<script|<iframe|<style|javascript:|\son[a-z]+\s*=/i
  prjs.forEach(p => {
    const s = saved.projects.find(x => x.slug === p.slug)
    assert(s, `${p.slug}: missing`)
    assert.strictEqual(s.name, p.name)
    const grp = (brd.detail.group || []).find(g => g.key === p.grp) || {}
    const list = (grp.form || {}).list || []
    const answer = p.detail.answer || {}
    const pub = list.filter(b => isPublic(b) && b.name !== 'form-thumbnail' && !isEmpty(answer[b.key] || b.value))
    assert.deepStrictEqual(s.fields.map(f => f.key), pub.map(b => b.key), `${p.slug}: public fields`)
    s.fields.forEach(f => {
      const a = answer[f.key] || list.find(b => b.key === f.key).value
      if (a.content !== undefined) assert.strictEqual(f.answer.content, a.content, `${p.slug}/${f.key}: content`)
      if (a.list !== undefined) assert.strictEqual(f.answer.list.length, a.list.length, `${p.slug}/${f.key}: list`)
      // 典藏頁以 md() 直接輸出, 須確保沒有可執行內容
      if (f.answer.content && f.answer.useMarkdown) assert(!unsafe.test(f.answer.content), `${p.slug}/${f.key}: unsafe html`)
    })
    const privateKeys = list.filter(b => !isPublic(b)).map(b => b.key)
    const text = JSON.stringify(s)
    privateKeys.forEach(k => assert(!text.includes(`"${k}"`), `${p.slug}: private field ${k} leaked`))
    ;[(p.detail.info || {}).email, (p.detail.info || {}).uid].filter(v => v).forEach(v => {
      assert(!text.includes(v), `${p.slug}: private info leaked`)
    })
    if (p.thumb) assert(fs.existsSync(path.join(imgDir, `${p.slug}.webp`)), `${p.slug}: thumb`)
  })
}

fs.mkdirSync(dataDir, { recursive: true })
fs.mkdirSync(imgDir, { recursive: true })
db.connect()
  .then(() => boards.reduce((p, b) => p.then(() => exportBoard(b)), Promise.resolve()))
  .then(() => db.end())
  .catch(e => {
    console.error(e.message)
    db.end()
    process.exit(1)
  })

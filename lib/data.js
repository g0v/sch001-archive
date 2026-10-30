// 讀取 data/ 下的典藏資料. 每次呼叫都重新讀檔, 檔案小且讓 dev 時修改資料即時生效.
const fs = require('fs')
const path = require('path')

const dataDir = path.join(__dirname, '../data')
const read = f => JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf8'))

function boards () {
  return read('boards.json').map(b => Object.assign(read(`brd/${b.slug}.json`), { label: b.label }))
}

function board (slug) {
  return boards().find(b => b.slug === slug) || null
}

function project (slug) {
  for (const brd of boards()) {
    const prj = brd.projects.find(p => p.slug === slug)
    if (prj) return { brd, prj }
  }
  return null
}

module.exports = { boards, board, project }

// 依 grantdash Ctrl.render ( src/ls/prj/view-simple.ls ) 的規則把公開欄位答案轉為 html.
// markdown 內容於匯出時已檢查不含可執行的 html, 故直接輸出 marked 的結果.
const { marked } = require('marked')

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
))

// 非 markdown 答案: 轉義後自動連結網址並保留換行
const text = s => esc(s)
  .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
  .replace(/\n/g, '<br>')

module.exports = function (f) {
  const a = f.answer
  if (a.content) return a.useMarkdown ? marked.parse(a.content) : text(a.content)
  if (a.start) return esc(a.start) + (a.end ? ' - ' + esc(a.end) : '')
  if (!a.list) return ''
  // 附件不在典藏範圍, 只列檔名
  if (f.type === 'form-file' || f.type === 'form-thumbnail') {
    return '<ul>' + a.list.map(x => `<li>${esc(x.name)}</li>`).join('') + '</ul>'
  }
  if (f.type === 'form-checkpoint') {
    return a.list.map(d => (
      `<div class="checkpoint"><b>${esc(d.title)}</b> <small>${esc(d.date)}</small><p>${esc(d.desc)}</p></div>`
    )).join('')
  }
  return a.list.concat(a.other && a.otherValue ? [a.otherValue] : []).map(esc).join('<br>')
}

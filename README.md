# sch001-archive

g0v 零時小學校「看提案」頁面 ( `sch001.g0v.tw/dash/brd/*/list` ) 的靜態典藏，資料取自 grantdash v1 資料庫，只收公開欄位。


## 結構

 - `data/boards.json` - 要收錄的計畫與顯示名稱
 - `data/brd/<slug>.json` - 各計畫的公開提案資料
 - `web/src/raw/img/prj/<slug>.webp` - 提案縮圖 ( 最長邊 800px )
 - `web/src/pug/view/` - 首頁 / 計畫頁 / 提案頁樣板，`modules/` 為共用 layout
 - `lib/` - 資料讀取、答案渲染與路由，dev server 與 full build 共用
 - `server.js` - dev server
 - `web/src/styl/`、`web/src/ls/` - 樣式與前端程式
 - `web/static/` - 建置產出，不進 git
 - `tool/` - 匯出與 full build 工具
 - `backup/` - grantdash 原始上傳檔備份，不進 git


## 開發

    npm install
    npm start

`npm start` 啟動 dev server：`@plotdb/srcbuild` 監看並建置 `web/src`，頁面由 express 依 `lib/site.js` 的路由帶入 `data/` 動態 render `web/src/pug/view/` 的樣板。


## 從資料庫重新匯出

需要本地 `sch001` 資料庫與 `backup/users/org/g0v-jothon/prj` 上傳檔：

    npm run export

匯出後會以資料庫重新比對，確認公開欄位完整、未混入非公開欄位，且 markdown 內容不含可執行的 HTML。縮圖已存在時不會重新壓縮。


## 建置與發布

    npm run build   # full build, 輸出所有頁面至 web/static
    npm run deploy  # full build 後 force push 至 gh-pages 分支

`deploy` 需在乾淨的 git 工作目錄下執行。`gh-pages` 分支永遠只有一個 commit，可另設 `DEPLOY_BRANCH`。遠端主機取用：

    git clone -b gh-pages --single-branch --depth 1 <repo> static   # 初次
    git fetch --depth 1 origin gh-pages && git reset --hard FETCH_HEAD  # 更新

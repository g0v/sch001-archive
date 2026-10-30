# sch001-archive

g0v 零時小學校網站 ( sch001.g0v.tw ) 的完整靜態版本：

 - `/` - 網站本體，來自 submodule [`g0v/sch001-net`](https://github.com/g0v/sch001-net) 的 `static/`
 - `/dash/` - 提案典藏，取代原 grantdash v1 的「看提案」頁面，沿用原網址
   ( `/dash/brd/<slug>/list`、`/dash/prj/<slug>` )。資料取自 grantdash 資料庫，只收公開欄位。


## 結構

 - `sch001-net/` - git submodule，網站本體 ( 已建置的 `static/` )
 - `data/boards.json` - 要收錄的計畫與顯示名稱
 - `data/brd/<slug>.json` - 各計畫的公開提案資料
 - `web/src/raw/img/prj/<slug>.webp` - 提案縮圖 ( 最長邊 800px )
 - `web/src/pug/view/` - 典藏首頁 / 計畫頁 / 提案頁樣板，`modules/` 為共用 layout
 - `web/src/styl/`、`web/src/ls/` - 樣式與前端程式
 - `lib/` - 資料讀取、答案渲染與路由，dev server 與 full build 共用
 - `server.js` - dev server
 - `tool/` - 匯出與 full build 工具
 - `config/nginx.conf` - 正式環境 nginx 參考設定
 - `web/static/` - 典藏的建置產出 ( 即網站的 `/dash/` )，不進 git
 - `backup/` - grantdash 原始上傳檔備份，不進 git


## 開發

    git submodule update --init
    npm install
    npm start

`npm start` 啟動 dev server：`@plotdb/srcbuild` 監看並建置 `web/src`，`/dash/` 下的頁面由 express 依
`lib/site.js` 的路由帶入 `data/` 動態 render，其餘路徑提供 `sch001-net/static`。


## 從資料庫重新匯出

需要本地 `sch001` 資料庫與 `backup/users/org/g0v-jothon/prj` 上傳檔：

    npm run export

匯出後會以資料庫重新比對，確認公開欄位完整、未混入非公開欄位，且 markdown 內容不含可執行的 HTML。縮圖已存在時不會重新壓縮。


## 建置與發布

    npm run build   # full build, 輸出典藏所有頁面至 web/static
    npm run deploy  # 合成整站並 force push 至 gh-pages 分支

`deploy` 需在乾淨的 git 工作目錄下執行，以 `sch001-net/static` 為根目錄、`web/static` 為 `dash/` 合成整個網站。
`gh-pages` 分支永遠只有一個 commit，可另設 `DEPLOY_BRANCH`。

更新 sch001-net 內容時，先更新 submodule 再 deploy：

    git submodule update --remote sch001-net
    git commit -am "update sch001-net"
    npm run deploy

遠端主機取用 ( nginx 設定見 `config/nginx.conf` )：

    git clone -b gh-pages --single-branch --depth 1 https://github.com/g0v/sch001-archive sch001-site  # 初次
    git fetch --depth 1 origin gh-pages && git reset --hard FETCH_HEAD  # 更新

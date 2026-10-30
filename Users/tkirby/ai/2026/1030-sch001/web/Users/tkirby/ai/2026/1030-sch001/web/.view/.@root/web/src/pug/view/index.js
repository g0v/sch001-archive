 (function() { function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (boards, description, root, title) {
      var title = '', description = '收錄零時小學校歷屆專案孵化競賽與計畫的公開提案內容。'
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml lang=\"zh-Hant\"\u003E\u003Chead\u003E\u003Cmeta charset=\"utf-8\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u003E\u003Ctitle\u003E" + (pug_escape(null == (pug_interp = title ? title + ' · ' : '') ? "" : pug_interp)) + "零時小學校 提案典藏\u003C\u002Ftitle\u003E";
if (description) {
pug_html = pug_html + "\u003Cmeta" + (" name=\"description\""+pug_attr("content", description.slice(0, 160), true, true)) + "\u003E";
}
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\""+pug_attr("href", `${root}css/index.min.css`, true, true)) + "\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Cheader class=\"site\"\u003E\u003Cdiv class=\"wrap\"\u003E\u003Ca" + (" class=\"logo\""+pug_attr("href", `${root}index.html`, true, true)) + "\u003ESch001 \u003Cspan\u003E提案典藏\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fheader\u003E\u003Cmain class=\"wrap\"\u003E\u003Csection class=\"hero\"\u003E\u003Ch1\u003E零時小學校 歷年提案\u003C\u002Fh1\u003E\u003Cp\u003E" + (pug_escape(null == (pug_interp = description) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Cdiv class=\"boards\"\u003E";
// iterate boards
;(function(){
  var $$obj = boards;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var b = $$obj[pug_index0];
pug_html = pug_html + "\u003Ca" + (" class=\"board-card\""+pug_attr("href", `brd/${b.slug}/index.html`, true, true)) + "\u003E\u003Cdiv class=\"board-label\"\u003E" + (pug_escape(null == (pug_interp = b.label) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"board-name\"\u003E" + (pug_escape(null == (pug_interp = b.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"board-meta\"\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = b.projects.length) ? "" : pug_interp)) + " 件提案\u003C\u002Fspan\u003E";
if (b.winners) {
pug_html = pug_html + "\u003Cspan\u003E" + (pug_escape(null == (pug_interp = b.winners) ? "" : pug_interp)) + " 件獲選\u003C\u002Fspan\u003E";
}
if (b.starttime) {
pug_html = pug_html + "\u003Cspan\u003E" + (pug_escape(null == (pug_interp = b.starttime.slice(0, 10)) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var b = $$obj[pug_index0];
pug_html = pug_html + "\u003Ca" + (" class=\"board-card\""+pug_attr("href", `brd/${b.slug}/index.html`, true, true)) + "\u003E\u003Cdiv class=\"board-label\"\u003E" + (pug_escape(null == (pug_interp = b.label) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"board-name\"\u003E" + (pug_escape(null == (pug_interp = b.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"board-meta\"\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = b.projects.length) ? "" : pug_interp)) + " 件提案\u003C\u002Fspan\u003E";
if (b.winners) {
pug_html = pug_html + "\u003Cspan\u003E" + (pug_escape(null == (pug_interp = b.winners) ? "" : pug_interp)) + " 件獲選\u003C\u002Fspan\u003E";
}
if (b.starttime) {
pug_html = pug_html + "\u003Cspan\u003E" + (pug_escape(null == (pug_interp = b.starttime.slice(0, 10)) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fmain\u003E\u003Cfooter class=\"site\"\u003E\u003Cdiv class=\"wrap\"\u003E資料來源：\u003Ca href=\"https:\u002F\u002Fsch001.g0v.tw\u002F\"\u003Eg0v 零時小學校\u003C\u002Fa\u003E 提案系統封存\u003C\u002Fdiv\u003E\u003C\u002Ffooter\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "boards" in locals_for_with ?
        locals_for_with.boards :
        typeof boards !== 'undefined' ? boards : undefined, "description" in locals_for_with ?
        locals_for_with.description :
        typeof description !== 'undefined' ? description : undefined, "root" in locals_for_with ?
        locals_for_with.root :
        typeof root !== 'undefined' ? root : undefined, "title" in locals_for_with ?
        locals_for_with.title :
        typeof title !== 'undefined' ? title : undefined));
    ;;return pug_html;}; module.exports = template; })() 
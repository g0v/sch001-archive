 (function() { function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (answer, badgeName, brd, description, prj, root, title) {
      var title = prj.name, description = prj.description
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml lang=\"zh-Hant\"\u003E\u003Chead\u003E\u003Cmeta charset=\"utf-8\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u003E\u003Ctitle\u003E" + (pug_escape(null == (pug_interp = title ? title + ' · ' : '') ? "" : pug_interp)) + "零時小學校 提案典藏\u003C\u002Ftitle\u003E";
if (description) {
pug_html = pug_html + "\u003Cmeta" + (" name=\"description\""+pug_attr("content", description.slice(0, 160), true, true)) + "\u003E";
}
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\""+pug_attr("href", `${root}css/index.min.css`, true, true)) + "\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Cheader class=\"site\"\u003E\u003Cdiv class=\"wrap\"\u003E\u003Ca class=\"logo\" href=\"\u002F\"\u003ESch001 \u003Cspan\u003E零時小學校\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fheader\u003E\u003Cmain class=\"wrap\"\u003E\u003Cnav class=\"crumb\"\u003E\u003Ca href=\"\u002F\"\u003E首頁\u003C\u002Fa\u003E\u003Cspan\u003E\u002F\u003C\u002Fspan\u003E\u003Ca" + (pug_attr("href", root, true, true)) + "\u003E看提案\u003C\u002Fa\u003E\u003Cspan\u003E\u002F\u003C\u002Fspan\u003E\u003Ca" + (pug_attr("href", `${root}brd/${brd.slug}/list`, true, true)) + "\u003E" + (pug_escape(null == (pug_interp = brd.label) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fnav\u003E\u003Carticle class=\"prj\"\u003E\u003Cheader class=\"prj-head\"\u003E";
if (prj.thumb) {
pug_html = pug_html + "\u003Cimg" + (" class=\"prj-thumb\""+pug_attr("src", `${root}${prj.thumb}`, true, true)+" alt=\"\"") + "\u003E";
}
pug_html = pug_html + "\u003Cdiv class=\"prj-info\"\u003E";
if (prj.badge) {
pug_html = pug_html + "\u003Cspan" + (pug_attr("class", pug_classes(["badge","inline",prj.badge], [false,false,true]), false, true)) + "\u003E" + (pug_escape(null == (pug_interp = badgeName[prj.badge]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003Ch1\u003E" + (pug_escape(null == (pug_interp = prj.name) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003Cdiv class=\"owner\"\u003E提案人 \u003Cb\u003E" + (pug_escape(null == (pug_interp = prj.team || prj.owner) ? "" : pug_interp)) + "\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E";
if (prj.tags.length) {
pug_html = pug_html + "\u003Cdiv class=\"tags\"\u003E";
// iterate prj.tags
;(function(){
  var $$obj = prj.tags;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var t = $$obj[pug_index0];
pug_html = pug_html + "\u003Cspan\u003E" + (pug_escape(null == (pug_interp = t) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var t = $$obj[pug_index0];
pug_html = pug_html + "\u003Cspan\u003E" + (pug_escape(null == (pug_interp = t) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
if (prj.description) {
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E" + (pug_escape(null == (pug_interp = prj.description) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fheader\u003E";
if (prj.fields.length) {
pug_html = pug_html + "\u003Cnav class=\"toc\"\u003E";
// iterate prj.fields
;(function(){
  var $$obj = prj.fields;
  if ('number' == typeof $$obj.length) {
      for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
        var f = $$obj[i];
pug_html = pug_html + "\u003Ca" + (pug_attr("href", `#f${i}`, true, true)) + "\u003E" + (pug_escape(null == (pug_interp = f.title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
      }
  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;
      var f = $$obj[i];
pug_html = pug_html + "\u003Ca" + (pug_attr("href", `#f${i}`, true, true)) + "\u003E" + (pug_escape(null == (pug_interp = f.title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fnav\u003E";
}
pug_html = pug_html + "\u003Cdiv class=\"fields\"\u003E";
// iterate prj.fields
;(function(){
  var $$obj = prj.fields;
  if ('number' == typeof $$obj.length) {
      for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
        var f = $$obj[i];
pug_html = pug_html + "\u003Csection" + (" class=\"field\""+pug_attr("id", `f${i}`, true, true)) + "\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = f.title) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003Cdiv class=\"answer\"\u003E" + (null == (pug_interp = answer(f)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
      }
  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;
      var f = $$obj[i];
pug_html = pug_html + "\u003Csection" + (" class=\"field\""+pug_attr("id", `f${i}`, true, true)) + "\u003E\u003Ch2\u003E" + (pug_escape(null == (pug_interp = f.title) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003Cdiv class=\"answer\"\u003E" + (null == (pug_interp = answer(f)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E\u003C\u002Fmain\u003E\u003Cfooter class=\"site\"\u003E\u003Cdiv class=\"wrap\"\u003E資料來源：\u003Ca href=\"https:\u002F\u002Fsch001.g0v.tw\u002F\"\u003Eg0v 零時小學校\u003C\u002Fa\u003E 提案系統封存\u003C\u002Fdiv\u003E\u003C\u002Ffooter\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "answer" in locals_for_with ?
        locals_for_with.answer :
        typeof answer !== 'undefined' ? answer : undefined, "badgeName" in locals_for_with ?
        locals_for_with.badgeName :
        typeof badgeName !== 'undefined' ? badgeName : undefined, "brd" in locals_for_with ?
        locals_for_with.brd :
        typeof brd !== 'undefined' ? brd : undefined, "description" in locals_for_with ?
        locals_for_with.description :
        typeof description !== 'undefined' ? description : undefined, "prj" in locals_for_with ?
        locals_for_with.prj :
        typeof prj !== 'undefined' ? prj : undefined, "root" in locals_for_with ?
        locals_for_with.root :
        typeof root !== 'undefined' ? root : undefined, "title" in locals_for_with ?
        locals_for_with.title :
        typeof title !== 'undefined' ? title : undefined));
    ;;return pug_html;}; module.exports = template; })() 
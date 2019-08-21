/*import Sku from "./src/Sku"
window.sku = new Sku();*/

import "./plugin/vue"
let _toString = Object.prototype.toString;
let reg = new RegExp("^123");
function cont(a) {
  return a;
}
// 缓存数据
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}
// 设置首字母大写
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});
// 驼峰命名
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});
let c2 = cached(function (str) {
  return str + "----..."
});
// 用- 字符连接驼峰命名
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  // 将字符串替换成 Hello-World  然后再转换为小写就成了hello-world
  return str.replace(hyphenateRE, '-$1')
});


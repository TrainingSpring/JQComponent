/*import Sku from "./src/Sku"
window.sku = new Sku();*/
import "./plugin/vue"
// import Vue from "vue";

import "./plugin/vue"
let _toString = Object.prototype.toString;
let reg = new RegExp("^123");

Vue.component("itest",{
  template:"<div>这是一个测试模板</div>",
  mounted() {
    console.log("测试模板创建成功!!!")
  }
});

let vm = new Vue({
  el:"#test",
  data(){
    return {
      message:"test"
    }
  },
  mounted(){

  },
  methods:{
    tEvent(str){
      console.log(str,"事件触发测试");
    }
  },
  components:{
    "itest":{
      template: "<div>这是一个测试模板</div>",
      mounted() {
        this.$emit("testEvent")
      }
    }
  }
});

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
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]")); // 匹配中括号里面的内容


function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
      console.log(obj,segments.length);
    }
    return obj
  }
}
var arrayProto = Array.prototype;
// 数组方法
var arrayMethods = Object.create(arrayProto);


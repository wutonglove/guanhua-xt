/**
 * Created by ww on 2017/7/26.
 */
// 替换插入资源的路径 false 为本地
export function replaceSrc(htmlstr, url, bool) {
  return htmlstr.replace(/<img[^>]*src="[^>]*"[^>]*data-name="[^(>")]*"[^>]*>/g, (str) => {
    // console.log(str);
    str.match(/data-name="([^"]*)"[^>]*data-type="([^"]*)"[^>]*data-src="([^"]*)"/g);
    // console.log(RegExp.$1);
    // console.log(RegExp.$2);
    // let loaclSrc = RegExp.$1;
    let filename = RegExp.$1;
    let filetype = RegExp.$2;
    let resource = RegExp.$3;
    let src = bool ? url + filename : resource;
    console.log(src);
    switch (filetype) {
      case 'image':
        str = `<span class="img_wrap"><img src="${src}" title="${filename}" class="insertFile insertFile_hook"/><span class="shade">点击图片查看原图</span></span>`;
        break;
      case 'video':
        str = `<video src="${src}" title="${filename}" controls="controls"  class="insertFile">您的浏览器不支持video</video>`;
        break;
      case 'audio':
        str = `<audio src="${src}" title="${filename}" controls="controls"  class="insertFile">您的浏览器不支持audio</audio>`;
        break;
    }
    return str.trim();
  });
}
// 解析地址
export function urlSearch() {
  let parameters = {};
  let name;
  let value;
  let str = location.href; // 取得整个地址栏
  let num = str.indexOf('?');

  str = str.substr(num + 1); // 取得所有参数

  let arr = str.split('&'); // 各个参数放到数组里
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf('=');
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      parameters[name] = value.replace('/', '');
    }
  }
  return parameters;
}
// 生成 n-m 的 length=l 的随机数组
export function createRandomArr(l, n, m) {
  let arr = [];
  while (arr.length < l) {
    let num = Math.round(Math.random() * (m - n) + n);
    if (arr.indexOf(num) === -1) {
      arr.push(num);
    }
  }
  return arr;
}
// GUID
export function GUID() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
// question_id
export function createQuestionId() {
  // 0220170804110738662
  let id = '';
  while (id.length !== 19) {
    id = '01' + new Date().Format('yyyyMMddHHmmssS');
  }
  return id;
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
window.Date.prototype.Format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  }
  return fmt;
};

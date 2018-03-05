/**
 * Created by ww on 2017/7/26.
 */
export function replaceSrc(htmlstr, url) {
  return htmlstr.replace(/<img[^>]*src="[^>]*"[^>]*data-name="[^(>")]*"[^>]*>/g, (str) => {
    str.match(/data-name="([^"]*)"[^>]*data-type="([^"]*)"[^>]*data-src="([^"]*)"/g);
    let filename = RegExp.$1;
    let filetype = RegExp.$2;
    let resource = RegExp.$3;
    let src = (url || url === '') ? url + filename : resource;
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

/**
 * 将img video audio 替换 减小串长度
 */
// let resourceCode = 0;
export function replaceResource(htmlstr) {
  return htmlstr.replace();
}

// 解析地址
export function urlSearch() {
  let parameters = {};
  let name;
  let value;
  let str = decodeURIComponent(location.href); // 取得整个地址栏
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

/**
 * 生成 n-m 的 length=l 的随机数组 闭区间
 * @param l 数组长度
 * @param n 最小值
 * @param m 最大值
 * @return {Array}
 */
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

// 最小公倍数
export function lcm(x, y) {
  return x * y / gcd(x, y);
}

// 最大公约数
export function gcd(x, y) {
  let max, min, temp;
  max = x > y ? x : y;
  min = x < y ? x : y;
  while (max % min) {
    temp = max % min;
    max = min;
    min = temp;
  }
  return min;
}

/*
 * Wrap a dyadic array by fill
 * @params arr     the source arr
 * @params fill    which to wrap source arr
 *
 *               0 0 0 0 0
 *   1 1 1       0 1 1 1 0
 *   1 1 1   =>  0 1 1 1 0
 *   1 1 1       0 1 1 1 0
 *               0 0 0 0 0
 */
export function dyadicArrayWrap(arr, fill) {
  let firstRowLength = 0;
  let lastRowLength = 0;
  arr.forEach(function (row, index) {
    if (index === 0) {
      firstRowLength = row.length + 2;
    } else if (index === arr.length - 1) {
      lastRowLength = row.length + 2;
    }
    row.splice(0, 0, Object.assign({}, fill).valueOf());
    row.splice(row.length, 0, Object.assign({}, fill).valueOf());
  });
  arr.splice(0, 0, Array(firstRowLength).fill(0).map(e => Object.assign({}, fill).valueOf()));
  arr.splice(arr.length, 0, Array(lastRowLength).fill(0).map(e => Object.assign({}, fill).valueOf()));
  return arr;
}

/**
 * 将一维数组根据col转换为二维数组
 * @param arr
 * @param col
 * @return {Array}
 */
export function arrayToDyadic(arr, col) {
  let result = [];
  arr.forEach((e, i) => {
    let index = ~~(i / col);
    let mod = i % col;
    result[index] || (result[index] = []);
    result[index][mod] = e;
  });
  return result;
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

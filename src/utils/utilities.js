/**
 * Created by ww on 2017/7/26.
 */
// 替换插入资源的路径 false 为本地
export function replaceSrc(htmlstr, url, bool) {
  return htmlstr.replace(/<img[^>]*src="[^>]*"[^>]*data-name="[^(>")]*"[^>]*>/g, (str) => {
    // console.log(str);
    str.match(/src="([^"]*)"[^>]*data-name="([^"]*)"[^>]*data-type="([^"]*)"/g);
    // console.log(RegExp.$1);
    // console.log(RegExp.$2);
    let loaclSrc = RegExp.$1;
    let filename = RegExp.$2;
    let filetype = RegExp.$3;
    let src = bool ? url + filename : loaclSrc;
    console.log(src);
    switch (filetype) {
      case 'image':
        str = `<span class="img_wrap"><img src="${src}" title="${filename}" class="insertFile insertFile_hook"/><span class="shade">点击查看原图</span></span>`;
        break;
      case 'video':
        str = `<video src="${src}" title="${filename}" controls="controls"  class="insertFile">您的浏览器不支持video</video>`;
        break;
      case 'audio':
        str = `<audio src="${src}" title="${filename}" controls="controls"  class="insertFile">您的浏览器不支持audio</audio>`;
        break;
    }
    return str;
  });
}
// 解析地址
export function urlSearch() {
  let parameters = {},
    name,
    value,
    str = location.href, //取得整个地址栏
    num = str.indexOf("?");

  str = str.substr(num + 1); //取得所有参数

  let arr = str.split("&"); //各个参数放到数组里
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf("=");
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      parameters[name] = value.replace("/", "");
    }
  }
  return parameters
}

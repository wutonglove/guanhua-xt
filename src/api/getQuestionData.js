/**
 * Created by ww on 2017/9/27.
 */
import axios from 'axios';
import {LOCALSTORAGEKEY} from 'common/js/config';

export function getQuestionData(questionId) {
  return new Promise((resolve, reject) => {
    if (!questionId) {
      resolve(JSON.parse(window.localStorage.getItem(LOCALSTORAGEKEY)));
    } else {
      // 发送请求
      axios({
        method: 'post',
        url: '/api/xiti/v1/resource/queryquestionbyid',
        data: JSON.stringify({
          questionid: questionId
        })
      })
        .then((res) => {
          if (res.data.code === '0') {
            resolve(JSON.parse(res.data.data.maincontent));
          } else {
            reject(res.data.code);
          }
        })
        .catch(function (error) {
          if (error.response) {
            // 请求被发出，服务器响应状态码
            // 这超出了2 xx的范围
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // 提出了请求，但没有收到答复
            // `error.request` 是浏览器中的XMLHttpRequest实例和实例
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // 在设置请求时发生了一些事情，触发了一个错误
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    }
  });
}

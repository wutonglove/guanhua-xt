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
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    }
  });
}

import axios from 'axios';
import {RES_SUCCESS} from './config';

export default function(data) {
  let url = '/api/xiti/v1/resource/queryallschoolinfo';
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(response => {
        if (+response.data.code === RES_SUCCESS) resolve(response.data.data);
        else reject('请求失败！');
      })
      .catch(() => {
        reject('请求失败！');
      });
  });
}

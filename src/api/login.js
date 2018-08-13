import axios from 'axios';
import { RES_SUCCESS } from './config';

export default function(data) {
  let url = '/api/xiti/v1/auth/loginuser';
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(response => {
        if (response.data.code * 1 === RES_SUCCESS) {
          resolve(response.data.data);
        } else {
          reject(response.data.data);
        }
      })
      .catch(() => {
        reject('登陆失败！');
      });
  });
}

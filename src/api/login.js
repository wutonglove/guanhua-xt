import axios from 'axios';

export default function(data) {
  let url = '/api/xiti/v1/auth/loginuser';
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(response => {
        if (response.data.code === '0') {
          resolve(response.data);
        } else {
          reject(response.data.data);
        }
      })
      .catch(() => {
        reject('登陆失败！');
      });
  });
}

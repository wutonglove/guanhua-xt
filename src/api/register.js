import axios from 'axios';

export default function(data) {
  let url = '/api/xiti/v1/resource/addStudent';
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(response => {
        if (response.data.code === '0') resolve(data);
        else reject(response.data.data);
      })
      .catch(() => {
        reject('注册失败！');
      });
  });
}

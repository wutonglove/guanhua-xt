/**
 * Created by shizw on 2017/10/31.
 */
'use strict';
import axios from 'axios';

export default function (keyword, pn, rn) {
  return new Promise((resolve, reject) => {
    axios.post('/api/xiti/v1/resource/query_baidu_image_by_keyword', {keyword, pn, rn})
      .then(function (response) {
        let data = response.data;
        console.log(typeof data);
        if (typeof data === 'string') {
          data = JSON.stringify(data);
          data = JSON.parse(data);
        }
        console.log(data);
        resolve(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};

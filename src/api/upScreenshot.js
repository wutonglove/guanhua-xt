/**
 * Created by shizw on 2017/12/29.
 */
'use strict';
import axios from 'axios';
import { RES_SUCCESS } from './config';

export default function(questionId, base64) {
  let formData = new FormData();
  formData.append('questionid', questionId);
  formData.append('sltdata', base64);
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/api/xiti/v1/resource/uploadxitislt',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        if (+res.data.code === RES_SUCCESS) {
          resolve();
        } else {
          reject(res.data.code);
        }
      })
      .catch(res => {
        reject(res.data.code);
      });
  });
}

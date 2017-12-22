/**
 * Created by shizw on 2017/12/19.
 */
'use strict';
import axios from 'axios';

import Map from 'map/exercises.json';
import xtclassList from 'map/xtclass-list';
import xttypeList from 'map/xttype-list';
import {urlSearch} from 'utils/utilities';

class Save {
  constructor(questionId) {
    let CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    this.questionId = questionId;
    this.getParam();
  }

  /**
   * 上传页面内插入的资源文件
   * @param {Array} nameList 页面资源文件的 name 列表
   * @param {Array} fileList 页面内存中的文件列表
   * @param callback 上传过程中的执行函数
   * @returns {Promise}
   */
  upload(nameList, fileList, callback) {
    return new Promise((resolve, reject) => {
      let urlSnippet;
      if (nameList.length < 1) {
        urlSnippet = '/';
        resolve(urlSnippet);
        return;
      }
      let fileNameList = [];
      let uploadfilelist = [];
      let fileOriNameList = [];
      let formData = new FormData();

      for (let i = 0; i < nameList.length; i++) {
        if (fileNameList.indexOf(nameList[i]) === -1) {
          fileNameList.push(nameList[i]);
        }
      }

      fileNameList.forEach((item, index) => {
        fileList.forEach((file) => {
          if (file.name === item) {
            uploadfilelist.push(file.original);
            formData.append(file.original.name, file.original);
            fileOriNameList.push(file.original.name);
          }
        });
      });

      formData.append('filelistori', fileOriNameList.join('|'));
      formData.append('filelistnew', fileNameList.join('|'));
      formData.append('questionid', this.questionId);
      axios({
        method: 'post',
        url: '/api/xiti/v1/resource/uploadxitifiles',
        data: formData,
        cancelToken: this.source.token,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress(progressEvent) {
          let proportion = (progressEvent.loaded / progressEvent.total).toFixed(2);
          let progress = (proportion * 100 - 1) || 0;
          callback.call(this, progress);
        }
      })
        .then((res) => {
          if (res.data.code === '0') {
            urlSnippet = '/' + res.data.data;
            resolve(urlSnippet);
          } else {
            reject(res.data.code);
          }
        })
        .catch((res) => {
          reject(res.data.code);
        });
    });
  }

  /**
   * 保存习题数据
   * @param {Object} data 上传数据
   * @returns {Promise}
   */
  saveData(data) {
    let xtclass = getXTClass(data.questionType);
    let xttype = xttypeList[data.questionType];
    data = {
      questionid: this.questionId, // 习题ID
      maincontent: JSON.stringify(data), // 习题内容
      xttype, // 小类  number
      xtclass, // 习题大类  number
      grade: this.grade, // 学阶
      subject: this.subject, // 科目
      courseid: this.courseid, // 课程编号
      ispublic: 1, // 公开 私有
      creator: this.creator // 用户ID
    };
    // console.log(data);
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: '/api/xiti/v1/resource/createxiti',
        cancelToken: this.source.token,
        data: JSON.stringify(data)
      })
        .then((res) => {
          if (res.data.code === '0') {
            resolve();
          } else {
            reject(res.data.code);
          }
        })
        .catch((res) => {
          reject('服务器超时');
        });
    });
  }

  /**
   * 中断请求
   */
  interruptSave() {
    this.source.cancel('Operation canceled by the user.');
  }

  getParam() {
    let params = urlSearch();

    this.courseid = params.courseid || 'test';
    this.grade = params.grade || 1;
    this.subject = params.subject || 1;
    this.creator = params.creator || 0;
  }
}

function getXTClass(type) {
  for (let key in Map) {
    let questions = Map[key];
    for (let i = 0; i < questions.length; i++) {
      // console.log(questions[i].type, type);
      if (questions[i].type === type) {
        // console.log(key);
        return xtclassList[key];
      }
    }
  }
}

export default Save;

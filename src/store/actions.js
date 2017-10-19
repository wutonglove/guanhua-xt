/**
 * Created by ww on 2017/9/19.
 */
import * as types from './mutation-types';
import {UNFINISHED, FINISHED} from 'common/js/config';
import axios from 'axios';
import $ from 'expose-loader?$!jquery';

let CancelToken = axios.CancelToken;
let source = CancelToken.source();

// 保存选区
export const saveCurrentRange = function ({commit}) {
  let selection;
  let range;

  selection = document.getSelection();
  if (selection.getRangeAt && selection.rangeCount) {
    range = document.getSelection().getRangeAt(0);
  }
  commit(types.SET_CURRENTRANGE, range);
};
// 重置光标选区
export const resetSelection = function ({state}) {
  if (!state.currentRange) {
    return;
  }
  console.log(state.currentRange);
  return new Promise((resolve) => {
    let selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(state.currentRange);
    resolve();
  });
};
// 清空光标选区
export const clearSelection = function ({state, commit}) {
  let selection = document.getSelection();
  selection.removeAllRanges();
  commit('SET_CURRENTRANGE', null);
};
// 验证
export const verifyIsPass = function ({commit}, passes) {
  let ret = Math.min.apply(null, passes) ? FINISHED : UNFINISHED;
  commit(types.SET_ISPASS, ret);
};

// 上传文件
export const uploadToRemote = function ({commit, state}, questionId) {
  return new Promise((resolve, reject) => {
    let urlSnippet;
    let $insertFileDoms = $('.content_wrapper').find('.insertFile_hook');
    if ($insertFileDoms.length < 1) {
      urlSnippet = '/';
      resolve(urlSnippet);
      return;
    }
    let formData = new FormData();
    let fileNameList = [];
    let fileOriNameList = [];
    let uploadfilelist = [];

    $insertFileDoms.each((index, item) => {
      let name = $(item).attr('data-name');
      if (fileNameList.indexOf(name) === -1) {
        fileNameList.push(name);
      }
    });

    fileNameList.forEach((item, index) => {
      // console.log(state.fileList);
      state.fileList.forEach((file) => {
        if (file.name === item) {
          uploadfilelist.push(file.original);
          formData.append(file.original.name, file.original);
          fileOriNameList.push(file.original.name);
        }
      });
    });

    formData.append('filelistori', fileOriNameList.join('|'));
    formData.append('filelistnew', fileNameList.join('|'));
    formData.append('questionid', questionId);

    axios({
      method: 'post',
      url: '/api/xiti/v1/resource/uploadxitifiles',
      data: formData,
      cancelToken: source.token,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress(progressEvent) {
        console.log(progressEvent);
        let proportion = (progressEvent.loaded / progressEvent.total).toFixed(2);
        let progress = (proportion * 100 - 1) || 0;
        commit('SET_PROGRESSDIA', {progress});
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
};
// 保存
export const saveToRemote = function ({commit, state}, {data, questionId}) {
  data = {
    questionid: questionId,
    courseid: '111',
    maincontent: JSON.stringify(data),
    xtclass: 0,
    xttype: 0,
    ispublic: 0,
    creator: 0
  };
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/api/xiti/v1/resource/createxiti',
      cancelToken: source.token,
      data: JSON.stringify(data)
    })
      .then((res) => {
        if (res.data.code === '0') {
          commit('SET_PROGRESSDIA', {progress: 100});
        } else {
          reject(res.data.code);
        }
      })
      .catch((res) => {
        reject('服务器超时');
      });
  });
};

// 中断保存
export const interruptSave = function ({commit}) {
  source.cancel('Operation canceled by the user.');
};

/**
 * Created by ww on 2017/9/19.
 */
import * as types from './mutation-types';
import {UNFINISHED, FINISHED} from 'common/js/config';
import Save from 'api/saveQuestionData';

const $ = window.$;

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
  // console.log(state.currentRange);
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

let save;
// 上传文件
export const uploadToRemote = function ({commit, state}, questionId) {
  save = new Save(questionId);
  let $insertFileDoms = $('.content_wrapper').find('.insertFile_hook');
  let nameList = [];
  $insertFileDoms.each((index, item) => {
    let name = $(item).attr('data-name');
    nameList.push(name);
  });

  return new Promise((resolve, reject) => {
    save.upload(nameList, state.fileList, (progress) => {
      commit('SET_PROGRESSDIA', {progress});
    })
      .then((url) => {
        resolve(url);
      })
      .catch((code) => {
        reject(code);
      });
  });
};
// 保存
export const saveToRemote = function ({commit, state}, {data}) {
  return new Promise((resolve, reject) => {
    save.saveData(data)
      .then(() => {
        resolve();
      })
      .catch((code) => {
        reject(code);
      });
  });
};

// 中断保存
export const interruptSave = function ({commit}) {
  if (save) {
    save.interruptSave();
  }
};

/**
 * Created by ww on 2017/7/31.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {createQuestionId} from 'utils/utilities';

// 判断习题类型
let _href = window.location.href;
_href.match(/\/([^/]*)\.html/);
let type = RegExp.$1 || '';

Vue.use(Vuex);
console.log(axios);
Vue.prototype.$axios = axios;

/* eslint-disable*/
export default new Vuex.Store({
  state: {
    questionType: type,
    questionId: '',
    urlSnippet: '',
    progress: 0,
    startUpload: false,
    filelist: [],
    uploadfilelist: [],
    currentRange: null,
    currentRangeParent: null,
    fileDialog: {
      isShow: false,
      type: 'image'
    },
    selectedFile: {},
    fileTarget: null,
    isAloneFile: false,
    formulaDialog: false,
    unfold: {
      content: '',
      isShow: false,
      width: 0
    },
    isPass: false,
    preDialog: {
      isShow: false,
      title: ''
    }
  },
  mutations: {
    // 获取选中区域
    GETCURRRANGE(state) {
      let selection;
      let range;

      selection = document.getSelection();
      if (selection.getRangeAt && selection.rangeCount) {
        range = document.getSelection().getRangeAt(0);
      }
      state.currentRange = range;
      console.log(range);
    },
    GETCURRANGEPARENT(state){
      state.currentRangeParent = state.currentRange.commonAncestorContainer
    },
    // 重置选中区域
    RESETSELECTION(state) {
      if (!state.currentRange) {
        return;
      }
      console.log(state.currentRange);
      let selection = document.getSelection();
      selection.removeAllRanges();
      selection.addRange(state.currentRange);
      console.log(1);
      // state.currentRange = null;
    },
    // 暂停页面内所有的媒体元素
    PAUSEAll(state) {
      let audioes = document.querySelectorAll('audio');
      let videoes = document.querySelectorAll('video');
      for (let i = 0; i < audioes.length; i++) {
        audioes[i].pause();
      }
      for (let j = 0; j < videoes.length; j++) {
        videoes[j].pause();
      }
    },
    // 点击媒体元素
    UNFOLD(state, file) {
      state.unfold.isShow = true;
      switch (file.type.split('/')[0]) {
        case 'image':
          state.unfold.content = `<img src="${file.resource}" class="unfold_file"/>`;
          break;
        case 'video':
          state.unfold.content = `<video src="${file.resource}" class="unfold_file" controls>您的浏览器不支持video</video>`;
          break;
        case 'audio':
          state.unfold.content = `<audio src="${file.resource}" class="unfold_file" controls>您的浏览器不支持audio</audio>`;
          break;
      }
    },
    // 验证必填项是否填写
    TEST(state, domarr) {
      let bol = 1;
      domarr.forEach((item, index) => {
        bol = bol && item.isPass;
      });

      let insertBox = $(".insert_hook");
      for (let i = 0; i < insertBox.length; i++) {
        if (insertBox.eq(i).find('.insertFile').length === 0) {
          state.isPass = false;
          return;
        }
      }

      if (bol) {
        state.isPass = true;
      } else {
        state.isPass = false;
      }
    },
    // 保存 && 上传
    UPLOAD(state, data) {
      let formData = new FormData();
      let fileNameList = [];
      let fileOriNameList = [];
      let $insertFileDoms = $('.content_wrapper').find('.insertFile_hook');
      // 初始化上传进度对话框
      state.progress = 0;
      state.startUpload = true;

      if ($insertFileDoms.length < 1) {
        state.urlSnippet = '/';
        return;
      }

      $insertFileDoms.each((index, item) => {
        let name = $(item).attr('data-name');
        if (fileNameList.indexOf(name) === -1)
          fileNameList.push(name)
      });

      fileNameList.forEach((item, index) => {
        state.filelist.forEach((file) => {
          if (file.name === item) {
            state.uploadfilelist.push(file.file);
            console.log(file.file.name);
            formData.append(file.file.name, file.file);
            fileOriNameList.push(file.file.name)
          }
        })
      });

      formData.append('filelistori', fileOriNameList.join('|'));
      formData.append('filelistnew', fileNameList.join('|'));
      formData.append("questionid", state.questionId);

      axios({
        method: 'post',
        url: '/api/xiti/v1/resource/uploadxitifiles',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress(progressEvent) {
          let proportion = (progressEvent.loaded / progressEvent.total).toFixed(2)
          state.progress = proportion * 100;
        }
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.code === '0') {
            // alert('保存成功');
            state.urlSnippet = '/' + res.data.data;
          } else {
            alert('错误编码：' + res.data.code);
          }
        })
        .catch((res) => {
          alert('错误编码：' + res.data.code);
        })
    },
    SAVE(state, data){
      console.log(data);
      // save
      data = {
        questionid: state.questionId,
        courseid: '111',
        maincontent: JSON.stringify(data),
        xtclass: 0,
        xttype: 0,
        ispublic: 0,
        creator: 0
      };

      axios({
        method: 'post',
        url: '/api/xiti/v1/resource/createxiti',
        data: JSON.stringify(data)
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.code === '0') {
            // alert('保存成功');
            state.urlSnippet = '';
            state.progress = 100;
          } else {
            alert('错误编码：' + res.data.code);
          }
        })
        .catch((res) => {
          alert('错误编码：' + res.data.code);
        })

    },
    PREVIEW(state, data){
      console.log(data);
      window.localStorage.setItem('guanhuaPPT-data', JSON.stringify(data));
      state.preDialog = {
        isShow: true,
        title: document.title
      };
    },
    INITQUESTION(state){
      state.questionId = createQuestionId();
      state.urlSnippet = '';
    }
  }
  ,
  actions: {
    saveSelection(context) {
      context.commit('GETCURRRANGE');
      context.commit('GETCURRANGEPARENT');
    },
    restoreSelection(context){
      context.commit('RESETSELECTION');
    },
    removeSelection(context) {
    },
    pauseAll(context) {
      context.commit('PAUSEALL');
    },
    unfold(context, file){
      context.commit('UNFOLD', file);
    },
    closeUnfold(context){
      context.commit('PAUSEAll');
    },
    // 为插入元素 绑定事件attachEventToFile
    attachEventToFile(context) {
      $(document).on("click", '.div_input>img.insertFile_hook', function () {
        $('.div_input>img.insertFile_hook').removeClass('active');
        $(this).addClass('active');
      }).on("dblclick", '.div_input>img.insertFile_hook', function () {
        let name = $(this).attr('data-name');
        let file;
        console.log(name);
        for (let i = 0; i < context.state.filelist.length; i++) {
          if (context.state.filelist[i].name === name) {
            file = context.state.filelist[i];
          }
        }
        context.commit('UNFOLD', file);
      })
    },
    // 验证
    test(context, domarr) {
      context.commit('TEST', domarr);
    },
    upload(context){
      context.commit('UPLOAD');
    },
    save(context, data){
      context.commit('SAVE', data);
    },
    preview(context, data) {
      context.commit('PREVIEW', data);
    },
    initQuestion(context){
      context.commit('INITQUESTION');
    }
  }
});

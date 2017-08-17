/**
 * Created by ww on 2017/7/31.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// 判断习题类型
let _href = window.location.href;
_href.match(/\/([^/]*)\.html/);
let type = RegExp.$1 || '';

Vue.use(Vuex);
console.log(axios);
Vue.prototype.$ajax = axios;

/* eslint-disable*/
export default new Vuex.Store({
  state: {
    questionType: type,
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
    urlSnippet: '',
    preDialog:{
      isShow:false,
      title:''
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
    },
    GETCURRANGEPARENT(state){
      state.currentRangeParent = state.currentRange.commonAncestorContainer
    },
    // 重置选中区域
    RESETSELECTION(state) {
      if (!state.currentRange) {
        return;
      }
      let selection = document.getSelection();
      selection.removeAllRanges();
      selection.addRange(state.currentRange);
      state.currentRange = null;
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
    // 保存
    SAVE(sate, data){
      console.log(data.localData);
      let localData = JSON.stringify(data.localData);
      window.localStorage.setItem('guanhuaPPT-data', localData);
    }
  },
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
    save(context, data){
      context.commit('SAVE', data);
    }
  }
});

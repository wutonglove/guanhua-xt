/**
 * Created by ww on 2017/7/31.
 */
/**
 * Created by ww on 2017/7/11.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import Lib from 'lib/Lib';
import RadioModule from './modules/radio';

let obj = Object;

// 判断习题类型
let _href = window.location.href;
_href.match(/\/html\/([^/]*)\/index.html/);
let type = RegExp.$1;
obj = Lib[type];

Vue.use(Vuex);

/* eslint-disable*/
export default new Vuex.Store({
  state: {
    questionType: type,
    questionCode: 0,
    filelist: [],
    uploadfilelist: [],
    currentRange: null,
    currentRangeParent: null,
    fileDialog: {
      isShow: false,
      type: 'image'
    },
    selectedFile: {},
    formulaDialog: false,
    unfold: {
      content: '',
      isShow: false,
      width: 0
    },
    isPass: true
  },
  mutations: {
    updateOptionIcon(state) {
      let iconType = state[state.questionType].questionContent[state.questionCode].options[0].icon;
      if (!isNaN(iconType * 1)) {
        state[state.questionType].questionContent[state.questionCode].options.forEach((item, index) => {
          item.icon = index + 1;
          item.id = index;
        });
      } else {
        state[state.questionType].questionContent[state.questionCode].options.forEach((item, index) => {
          let code = 'A';
          code = index + code.charCodeAt(0);
          item.icon = String.fromCharCode(code);
          item.id = index;
        });
        console.log(state[state.questionType].questionContent[state.questionCode].options);
      }
    },
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
    TEST(state) {
      if (state[state.questionType].questionContent[state.questionCode].topic === '') {
        state.isPass = true;
        return;
      }
      else if (state[state.questionType].questionContent[state.questionCode].answer === '') {
        state.isPass = true;
        return;
      }
      else {
        for (let i = 0; i < state[state.questionType].questionContent[state.questionCode].options.length; i++) {
          if (state[state.questionType].questionContent[state.questionCode].options[i].text === '') {
            state.isPass = true;
            return;
          }
        }
      }
      state.isPass = false;
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
    test(context) {
      context.commit('TEST');
    },
    save(context, url){
      console.log(context);
      // context.commit('radio/SAVEDATA');
      let type = context.state.questionType;
      let data = obj.saveData(context.state[type].questionContent[state.questionCode], url, type);
      console.log(JSON.parse(data.webData));
      console.log(JSON.parse(data.localData));
      window.localStorage.setItem('101PPT-question-data', data.localData);

    }
  },
  modules: {
    radio: RadioModule
  }
});

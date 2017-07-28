/**
 * Created by ww on 2017/7/11.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import {hasClass, addClass, removeClass} from 'utils/dom.js';
import {replaceSrc} from 'utils/utilities.js';

Vue.use(Vuex);

/* eslint-disable*/
export default new Vuex.Store({
  state: {
    topic: '',
    options: [
      {
        icon: 'A',
        text: ''
      },
      {
        icon: 'B',
        text: ''
      }
    ],
    answer: '',
    hint: '',
    explanation: '',
    filelist: [],
    uploadfilelist: [],
    currentRange: null,
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
      let type = state.options[0].icon;
      if (!isNaN(type * 1)) {
        state.options.forEach((item, index) => {
          item.icon = index;
        });
      } else {
        state.options.forEach((item, index) => {
          let code = 'A';
          code = index + code.charCodeAt(0);
          item.icon = String.fromCharCode(code);
        });
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
    // 点击媒体元素 如果当前状态为暂停（将要播放钙元素） 则暂停出this之外的所有
    UNFOLD(state, file) {
      console.log(file);
      console.log(state);
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
    // 删除所有的insertFile 的active
    REMOVEALLFILECLASS() {
      let itFile = document.querySelectorAll('.div_input>img.insertFile_hook');
      for (let i = 0; i < itFile.length; i++) {
        removeClass(itFile[i], 'active');
      }
    },
    // 验证必填项是否填写
    TEST(state) {
      if (state.topic === '') {
        state.isPass = true;
        return;
      }
      else if (state.answer === '') {
        state.isPass = true;
        return;
      }
      else {
        for (let i = 0; i < state.options.length; i++) {
          if (state.options[i].text === '') {
            state.isPass = true;
            return;
          }
        }
      }
      state.isPass = false;
    },
    SAVE(state,url) {
      let data = {
        title: document.title,
        topic: replaceSrc(state.topic,url,true),
        options:(function(){
          let options = [];
          state.options.forEach((item,index)=>{
            let option = {
              icon:item.icon,
              text:replaceSrc(item.text,url,true)
            };
            options.push(option);
          });
          return options;
        })(),
        answer: state.answer,
        hint: replaceSrc(state.hint,url,true),
        explanation: replaceSrc(state.explanation,url,true),
        type: '',
      };
      console.log(data);
      data = JSON.stringify(data); // 保存服务器

      let localData = {
        title: document.title,
        topic: replaceSrc(state.topic,url),
        options:(function(){
          let options = [];
          state.options.forEach((item,index)=>{
            let option = {
              icon:item.icon,
              text:replaceSrc(item.text,url)
            };
            options.push(option);
          });
          return options;
        })(),
        answer: state.answer,
        hint: replaceSrc(state.hint,url),
        explanation: replaceSrc(state.explanation,url),
        type: '',
      };
      localData = JSON.stringify(localData);
      window.localStorage.setItem('101PPT-question-data', localData);
    }
  },
  actions: {
    saveSelection(context) {
      context.commit('GETCURRRANGE');
    },
    restoreSelection(context){
      context.commit('GETCURRRANGE');
    },
    removeSelection(context) {
    },
    pauseAll(context) {
      context.commit('PAUSEALL');
    },
    unfold(context, file){
      context.commit('UNFOLD', file);
    },
    // 为插入元素 绑定事件attachEventToFile
    attachEventToFile(context) {
      let itFile = document.querySelectorAll('.div_input>img.insertFile_hook');
      document.onclick = (event) => {
        if (!hasClass(event.srcElement, 'insertFile_hook')) {
          context.commit('REMOVEALLFILECLASS');
        }
      }
      for (let i = 0; i < itFile.length; i++) {
        itFile[i].onclick = function () {
          context.commit('REMOVEALLFILECLASS');
          addClass(this, 'active');
        };
        // 双击展示media
        itFile[i].ondblclick = function () {
          let name = this.getAttribute('data-name');
          let file;
          console.log(name);
          for (let i = 0; i < context.state.filelist.length; i++) {
            if (context.state.filelist[i].name === name) {
              file = context.state.filelist[i];
            }
          }
          context.commit('UNFOLD', file);
        }
      }
    },
    // 验证
    test(context) {
      context.commit('TEST');
    },
    save(context,url){
      console.log(context.state);
      context.commit('SAVE',url);
    }
  }
});



/**
 * Created by ww on 2017/7/26.
 */
/**
 * Created by ww on 2017/7/11.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import {hasClass, addClass, removeClass} from 'utils/dom';
import {urlSearch} from 'utils/utilities';
import Lib from 'lib/Lib';

Vue.use(Vuex);

/* eslint-disable*/
export default new Vuex.Store({
  state: {
    questionData: null,
    questionId: '',
    result:null,
    unfold: {
      content: '',
      isShow: false,
      width: 0
    }
  },
  mutations: {
    GETQUESTIONID(state){
      state.questionId = urlSearch().questionId || '';
      console.log(state.questionId)
    },
    INITRESULT(state){
      state.result = Lib[state.questionData.questionType].result;
    },
    GETQUESTIONDATA(state){
      if (!state.questionId) {
        state.questionData = JSON.parse(window.localStorage.getItem('101PPT-question-data'));
      }else{
        // 发送请求
      }
    },
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
    // 给资源绑定事件
    ATTCHEVENTTOFILE(state){
      $(document).on("click",'.insertFile_hook',function(){
        state.unfold.isShow = true;
        state.unfold.content = `<img src="${this.src}" class="unfold_file"/>`;
      })
    },
    SUBMITANDROID(){
      // 提交  有用
    }
  },
  actions: {
    getdata(context){
      context.commit('GETQUESTIONID');
      context.commit('GETQUESTIONDATA');
      console.log(context.state.questionData);
    },
    closeUnfold(context){
      context.commit('PAUSEAll');
    },
    submit(context) {
      context.commit('SUBMITANDROID');
    }
  }
});



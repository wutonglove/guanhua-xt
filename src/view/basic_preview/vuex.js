/**
 * Created by ww on 2017/7/26.
 */
/**
 * Created by ww on 2017/7/11.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import {hasClass, addClass, removeClass} from 'utils/dom.js';
import {urlSearch} from 'utils/utilities.js';

Vue.use(Vuex);

/* eslint-disable*/
export default new Vuex.Store({
  state: {
    questionData: null,
    questionId: '',
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
    GETQUESTIONDATA(state){
      if (!state.questionId) {
        state.questionData = JSON.parse(window.localStorage.getItem('101PPT-question-data'));
      }else{
        // 发送请求
      }
    }
  },
  actions: {
    getdata(context){
      context.commit('GETQUESTIONID');
      context.commit('GETQUESTIONDATA');
      console.log(context.state.questionData);
    }
  }
});



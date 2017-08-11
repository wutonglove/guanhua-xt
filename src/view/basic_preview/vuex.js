/**
 * Created by ww on 2017/7/26.
 */
/**
 * Created by ww on 2017/7/11.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import {urlSearch} from 'utils/utilities';
// import types from 'lib/mutaion-types';

import radio from 'lib/modules/radio';
import checkbox from 'lib/modules/checkbox';
import judge from 'lib/modules/judge';
import fillblank from 'lib/modules/fillblank';
import vote from 'lib/modules/vote';
import sort from 'lib/modules/sort';
import jigsaw from 'lib/modules/jigsaw';
import comprehensive from 'lib/modules/comprehensive';

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
    },
  },
  mutations: {
    GETQUESTIONID(state){
      state.questionId = urlSearch().questionId || '';
      console.log(state.questionId)
    },
    INITRESULT(state){
      // state.result = Lib[state.questionData.questionType].result;
      state.result = state[state.questionData.questionType].IAnswer;
    },
    GETQUESTIONDATA(state){
      if (!state.questionId) {
        state.questionData = JSON.parse(window.localStorage.getItem('guanhuaPPT-data'));
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
    submit(context,vueObj) {
      context.dispatch(context.state.questionData.questionType+'Submit',vueObj);
      // 手机端提交
      context.commit('SUBMITANDROID');
    },
    showSubmitResult(context,_self){
      setTimeout(()=>{
        switch (context.state.result) {
          case -1:
            _self.$Modal.warning({
              title: '',
              content: `<p>这道题没有作答！</p>`
            });
            break;
          case 0:
            _self.$Modal.error({
              title: '',
              content: `<p>这道题没有答对，下次加油哦！</p>`
            });
            break;
          case 1:
            _self.$Modal.success({
              title: '',
              content: `<p>太棒了，您答对了！</p>`
            });
            break;
        }
      },400);
    }
  },
  modules:{
    radio,
    checkbox,
    judge,
    fillblank,
    vote,
    sort,
    jigsaw,
    comprehensive
  }
});



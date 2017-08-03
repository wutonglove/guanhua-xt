/**
 * Created by ww on 2017/8/3.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    questionContent: [{
      topic: '',
      options: [
        {
          icon: 'A',
          text: '',
          id: 0
        },
        {
          icon: 'B',
          text: '',
          id: 1
        }
      ],
      answer: '',
      hint: '',
      explanation: '',
    }]
  },
  mutations: {
    SAVEDATA(state, url, type){
      let data = {
        title: document.title,
        topic: replaceSrc(state.topic, url, true),
        options: (function () {
          let options = [];
          state.options.forEach((item, index) => {
            let option = {
              icon: item.icon,
              text: replaceSrc(item.text, url, true),
              id: item.id
            };
            options.push(option);
          });
          return options;
        })(),
        answer: state.answer,
        hint: replaceSrc(state.hint, url, true),
        explanation: replaceSrc(state.explanation, url, true),
        questionType: state.questionType
      };
      data = JSON.stringify(data); // 保存服务器

      let localData = {
        title: document.title,
        topic: state.topic.trim(),
        options: (function () {
          let options = [];
          state.options.forEach((item, index) => {
            let option = {
              icon: item.icon,
              text: item.text.trim(),
              id: item.id
            };
            options.push(option);
          });
          return options;
        })(),
        answer: state.answer,
        hint: state.hint.trim(),
        explanation: state.explanation.trim(),
        questionType: state.questionType
      };
      console.log(localData);
      localData = JSON.stringify(localData);
      return {
        webData: data,
        localData: localData
      };
    },
  }
})

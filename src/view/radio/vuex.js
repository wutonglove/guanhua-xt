/**
 * Created by ww on 2017/7/11.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* eslint-disable*/
export default new Vuex.Store({
  state: {
    topic: '',
    options: [
      {
        icon: 'A',
        text: 'this is A'
      },
      {
        icon: 'B',
        text: 'this is B'
      }
    ],
    answer: [],
    hint: '',
    explanation: '',
    currentRange: null,
    fileDialog: false
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
    getCurrentRange(state) {
      let selection;
      let range;

      selection = document.getSelection();
      if (selection.getRangeAt && selection.rangeCount) {
        range = document.getSelection().getRangeAt(0);
      }
      state.currentRange = range;
    }
  },
  actions: {
    saveSelection(context) {
      context.commit('getCurrentRange');
    },
    // 重置选中区域
    restoreSelection(context) {
      if (!context.state.currentRange) {
        return;
      }
      let selection = document.getSelection();
      selection.removeAllRanges();
      selection.addRange(context.state.currentRange);
      // console.log('restore end');
    },
    removeSelection(context) {}
  }
});


/*
*  点击空白
*    如果不是tool btn
*      清空选中对象
*
* */

/**
 * Created by ww on 2017/8/9.
 */

export default {
  state: {
    IAnswer: '-1'
  },
  mutations: {
    GETJUDGEESULT(state, rootState) {
      console.log(state.IAnswer);
      if (state.IAnswer === '-1') {
        rootState.result = -1;
      } else if (state.IAnswer === rootState.questionData.answer) {
        rootState.result = 1;
      } else {
        rootState.result = 0;
      }
    }
  },
  actions: {
    judgeSubmit(context, _self) {
      context.commit('GETJUDGEESULT', context.rootState);
      context.dispatch('showSubmitResult', _self);
    }
  }
};

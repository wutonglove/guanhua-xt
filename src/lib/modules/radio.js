/**
 * Created by ww on 2017/8/3.
 */

export default {
  state: {
    IAnswer: '-1',
    result: -1
  },
  mutations: {
    GETRADIORESULT(state, rootState) {
      console.log(state.IAnswer);
      if (state.IAnswer === '-1') {
        state.result = -1;
      } else if (state.IAnswer === rootState.questionData.answer) {
        state.result = 1;
      } else {
        state.result = 0;
      }
    }
  },
  actions: {
    radioSubmit(context, _self) {
      context.commit('GETRADIORESULT', context.rootState);
      context.rootState.result = context.state.result;
      context.dispatch('showSubmitResult', _self);
    }
  }
};

/**
 * Created by ww on 2017/8/11.
 */

export default {
  state: {
    IAnswer: '-1',
    result:-1
  },
  mutations: {
    GETRADIORESULT(state){
      console.log(state.IAnswer);
      if (state.IAnswer === '-1') {
        state.result = -1;
      } else if (state.IAnswer === state.questionData.answer) {
        state.result = 1;
      } else {
        state.result = 0;
      }
    }
  },
  actions: {
    radioSubmit(context, _self){
      context.commit('GETRADIORESULT');
      context.rootState.result = state.result;
      context.dispatch('showSubmitResult', _self);
    }
  }
}

/**
 * Created by ww on 2017/8/10.
 */
import getResult from 'utils/getResult';

export default {
  state: {
    IAnswer: '-1',
    result: -1
  },
  mutations: {
    GETSORTRESULT(state, rootState) {
      console.log(state.IAnswer);
      state.result = getResult[rootState.questionData.questionType](state.IAnswer);
    }
  },
  actions: {
    sortSubmit(context, _self) {
      context.commit('GETSORTRESULT', context.rootState);
      context.rootState.result = context.state.result;
      context.dispatch('showSubmitResult', _self);
    }
  }
};

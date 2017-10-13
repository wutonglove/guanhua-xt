/**
 * Created by ww on 2017/9/1.
 */
import getResult from 'utils/getResult';

export default {
  state: {
    IAnswer: [],
    result: -1
  },
  mutations: {
    GETSUBJECTIVERESULT(state, rootState) {
      console.log(state.IAnswer);
      state.result = getResult[rootState.questionData.questionType]();
    }
  },
  actions: {
    subjectiveSubmit(context, _self) {
      context.commit('GETSUBJECTIVERESULT', context.rootState);
      context.rootState.result = context.state.result;
      context.dispatch('showSubmitResult', _self);
    }
  }
};

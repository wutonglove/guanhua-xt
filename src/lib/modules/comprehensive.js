/**
 * Created by ww on 2017/8/9.
 */
/**
 * Created by ww on 2017/8/9.
 */
import getResult from 'utils/getResult';

export default {
  state: {
    IAnswer: [],
    result: []
  },
  mutations: {
    GETCOMPREHENSIVERESULT(state, rootState) {
      for (let i = 0; i < state.IAnswer.length; i++) {
        let type = rootState.questionData.context[i].questionType;
        console.log(state.IAnswer[i]);
        let res = getResult[type](state.IAnswer[i], rootState.questionData.context[i].answer);
        state.result.push(res);
      }
      if (state.result.length === 0) {
        rootState.result = -1;
      } else {
        for (let i = 0; i < state.result.length; i++) {
          if (state.result[i] !== 1) {
            rootState.result = 0;
            return;
          }
        }
        rootState.result = 1;
      }
    }
  },
  actions: {
    comprehensiveSubmit(context, _self) {
      context.commit('GETCOMPREHENSIVERESULT', context.rootState);
      context.dispatch('showSubmitResult', _self);
    }
  }
};

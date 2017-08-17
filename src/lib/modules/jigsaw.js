/**
 * Created by ww on 2017/8/11.
 */
import getResult from 'utils/getResult';

export default {
  state: {
    IAnswer: '-1',
    result: -1
  },
  mutations: {
    GETJIGSAWRESULT(state) {
      console.log(state.IAnswer);
      state.result = getResult['jigsaw'](state.IAnswer);
    }
  },
  actions: {
    jigsawSubmit(context, _self) {
      context.commit('GETJIGSAWRESULT');
      context.rootState.result = context.state.result;
      context.dispatch('showSubmitResult', _self);
    }
  }
};

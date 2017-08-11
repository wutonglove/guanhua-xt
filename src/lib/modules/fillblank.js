/**
 * Created by ww on 2017/8/9.
 */

export default {
  state: {
    IAnswer: []
  },
  mutations: {
    GETFILLBLANKRESULT(state, rootState){
      console.log(state.IAnswer);

      if (state.IAnswer.length === 0) {
        rootState.result = -1;
      }else{
        for(let i=0;i<state.IAnswer.length;i++){
          if(state.IAnswer[i] !== rootState.questionData.answer[i]){
            rootState.result = 0;
            return;
          }
        }
        rootState.result = 1;
      }
    }
  },
  actions: {
    fillblankSubmit(context, _self){
      context.commit('GETFILLBLANKRESULT', context.rootState);
      context.dispatch('showSubmitResult', _self);
    }
  }
}

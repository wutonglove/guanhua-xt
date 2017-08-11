/**
 * Created by ww on 2017/8/3.
 */

export default {
  state: {
    IAnswer: [],
    result:-1
  },
  mutations: {
    GETCHECKBOXRESULT(state){
      console.log(state.IAnswer);

      if(state.IAnswer.length ===0) {
        state.result = -1;
      }else if(state.IAnswer.length !== state.questionData.answer.length){
        state.result = 0;
      }else{
        for(let i=0;i<state.IAnswer.length;i++){
          if(state.questionData.answer.indexOf(state.IAnswer[i]) === -1){
            state.result = 0;
            return;
          }
        }
        state.result = 1;
      }
    }
  },
  actions: {
    checkboxSubmit(context, _self){
      context.commit('GETCHECKBOXRESULT');
      context.rootState.result = context.state.result;
      context.dispatch('showSubmitResult', _self);
    }
  }
}

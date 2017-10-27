/**
 * Created by ww on 2017/9/19.
 */
import * as types from './mutation-types';

const mutations = {
  [types.SET_UNFOLD](state, {isShow, width, content}) {
    state.unfold.isShow = isShow;
    state.unfold.width = width || 0;
    if (content) state.unfold.content = content;
  },
  [types.SET_TIMES](state, {minute, second}) {
    state.times.minute = minute;
    state.times.second = second;
  }
};

export default mutations;

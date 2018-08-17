/**
 * Created by ww on 2017/9/19.
 */
import * as types from './mutation-types';

const mutations = {
  [types.SET_CURRENTRANGE](state, range) {
    state.currentRange = range;
  },
  [types.SET_VALID](state, is) {
    state.isPass = is;
  },
  [types.SET_TIMES](state, { minute, second }) {
    state.times = { minute, second };
  },
  [types.SET_FILEDIALOGINFO](state, { status, name, type }) {
    state.fileDialogInfo.status = status;
    if (name) state.fileDialogInfo.name = name;
    if (type) state.fileDialogInfo.type = type;
  },
  [types.SET_FILELIST](state, one) {
    state.fileList.push(one);
  },
  [types.SET_SELECTEDFILE](state, one) {
    state.selectedFile = one;
  },
  [types.SET_TARGETDOM](state, dom) {
    state.targetDom = dom;
  },
  [types.SET_UNFOLD](state, { isShow, width, content }) {
    state.unfold.isShow = isShow;
    state.unfold.width = width || 0;
    if (content) state.unfold.content = content;
  },
  [types.SET_FORMULADIALOG](state, isShow) {
    state.formulaDialog = isShow;
  },
  [types.SET_PREDIALOG](state, { isShow, title }) {
    state.preDialog.isShow = isShow;
    if (title) state.preDialog.title = title;
  },
  [types.SET_PROGRESSDIA](state, { isShow, progress }) {
    if (typeof isShow === 'boolean') state.progressDia.isShow = isShow;
    if (typeof progress === 'number') state.progressDia.progress = progress;
  },
  [types.SET_QSDATA](state, data) {
    if (!state.qsData) state.qsData = {};
    // 传data.type，判断和当前的习题类型 是否相等
    // 如果是 相等
    state.qsData = Object.assign({}, state.qsData, data);
  },
  [types.SET_DIVCHGABLE](state, value) {
    state.divChgAble = value;
  },
  [types.SET_MBOARD](state, value) {
    Object.assign(state.mboard, value);
  },
  [types.SET_QSTYPE](state, value) {
    state.qstype = value;
  }
};

export default mutations;

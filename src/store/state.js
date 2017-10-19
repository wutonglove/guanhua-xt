/**
 * Created by ww on 2017/9/19.
 */
const state = {
  currentRange: null,
  isPass: false,
  fileDialogInfo: {
    name: '',
    status: false,
    type: ''
  },
  fileList: [],
  selectedFile: null,
  targetDom: null,
  unfold: {
    content: '',
    isShow: false,
    width: 0
  },
  formulaDialog: false,
  preDialog: {
    isShow: false,
    title: ''
  },
  progressDia: {
    isShow: false,
    progress: 0
  }
};

export default state;

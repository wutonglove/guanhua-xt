/**
 * Created by ww on 2017/8/9.
 */
export default {
  radio: function (IAnswer, answer) {
    if (IAnswer === '-1') {
      return -1;
    } else if (IAnswer === answer) {
      return 1;
    } else {
      return 0;
    }
  },
  checkbox: function (IAnswer, answer) {
    if (IAnswer.length === 0) {
      return -1;
    } else if (IAnswer.length !== answer.length) {
      return 0;
    } else {
      for (let i = 0; i < IAnswer.length; i++) {
        if (answer.indexOf(IAnswer[i]) === -1) {
          return 0;
        }
      }
      return 1;
    }
  },
  fillblank: function (IAnswer, answer) {
    if (IAnswer.length === 0) {
      return -1;
    } else {
      for (let i = 0; i < IAnswer.length; i++) {
        if (IAnswer[i] !== answer[i]) {
          return 0;
        }
      }
      return 1;
    }
  },
  judge: function (IAnswer, answer) {
    if (IAnswer === '-1') {
      return -1;
    } else if (IAnswer === answer) {
      return 1;
    } else {
      return 0;
    }
  },
  vote: function () {
    return 1;
  },
  sort: function (IAnswer) {
    if (IAnswer.length === 0) {
      return -1;
    } else {
      for (let i = 0; i < IAnswer.length; i++) {
        if (IAnswer[i] !== i) return 0;
      }
      return 1;
    }
  },
  jigsaw: function (IAnswer, answer) {
    if (IAnswer === '-1') {
      return -1;
    } else {
      for (let i = 0; i < IAnswer.length; i++) {
        if (IAnswer[i] !== i) {
          return 0;
        }
      }
      return 1;
    }
  }
};

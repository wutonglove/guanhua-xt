/**
 * Created by shizw on 2017/11/17.
 */
'use strict';
class Grid {
  constructor({text}) {
    this.text = text;
    this.code = [];
    this.tagCode = 0;
    this.tagOri = '';
    this.tagShow = false;
    this.hover = false;
    this.selecting = false;
    this.disableX = false;
    this.disableY = false;
  }

  setText(text) {
    this.text = text;
  }

  getText() {
    return this.text;
  }

  setCode(code) {
    this.code.push(code);
  }

  setTagOri(val) {
    this.tagOri = val;
  }

  setTagShow(val) {
    this.tagShow = val;
  }

  setDisable(ori, val) {
    if (ori === 'x') {
      this.disableX = val;
    } else {
      this.disableY = val;
    }
  }
}

export function createGrid(text = '') {
  return new Grid({text});
}

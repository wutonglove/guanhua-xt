/**
 * Created by shizw on 2017/11/17.
 */
'use strict';
class Grid {
  constructor({text}) {
    this.text = text;
    this.code = [];
    this.tags = [];
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

  setTags({ori, code}) {
    this.tags.push({
      ori,
      code,
      show: true
    });
  }

  setDisable(ori, val) {
    if (ori === 'x') {
      this.disableX = val;
    } else if (ori === 'y') {
      this.disableY = val;
    } else {
      this.disableX = val;
      this.disableY = val;
    }
  }
}

export function createGrid(text = '') {
  return new Grid({text});
}

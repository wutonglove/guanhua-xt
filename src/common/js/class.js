/**
 * Created by shizw on 2017/11/17.
 */
'use strict';
import {GUID} from 'utils/utilities';
let videoThumb = require('../image/media.jpg');
let insertVideo = require('../image/video.jpg');

export class IAmage {
  constructor({file, w, h}) {
    this.name = GUID() + getSuffix(file.name);
    this.icon = window.URL.createObjectURL(file);
    this.objURL = window.URL.createObjectURL(file);
    this.resource = window.URL.createObjectURL(file);
    this.size = `${w} * ${h}`;
    this.original = file;
    this.type = file.type;
    this.suffix = file.type.split('/')[1];
  }
}

export class IVideo {
  constructor({file}) {
    this.name = GUID() + getSuffix(file.name);
    this.icon = videoThumb;
    this.objURL = insertVideo;
    this.resource = window.URL.createObjectURL(file);
    this.original = file;
    this.type = file.type;
    this.suffix = file.type.split('/')[1];
  }
}

export class IAudio {
  constructor({file}) {
    this.name = GUID() + getSuffix(file.name);
    this.icon = videoThumb;
    this.objURL = insertVideo;
    this.resource = window.URL.createObjectURL(file);
    this.original = file;
    this.type = file.type;
    this.suffix = file.type.split('/')[1];
  }
}

/**
 * 取文件名后缀
 * @param [String] name
 * @return {string}
 */
const getSuffix = (name) => {
  let index = name.lastIndexOf('.');
  return name.substr(index);
};

/**
 * 方格
 */
export class Grid {
  constructor(text) {
    this.text = text || '';
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

export class OptionsData {
  constructor() {
    this.data = [
      {
        icon: 'A',
        text: '',
        id: 0
      },
      {
        icon: 'B',
        text: '',
        id: 1
      },
      {
        icon: 'C',
        text: '',
        id: 2
      },
      {
        icon: 'D',
        text: '',
        id: 3
      }
    ];
  }
}

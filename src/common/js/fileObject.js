/**
 * Created by ww on 2017/9/22.
 */
import {GUID} from 'utils/utilities';
let videoThumb = require('../image/media.jpg');
let insertVideo = require('../image/video.jpg');

export class IAmage {
  constructor({file, w, h}) {
    this.name = GUID() + getSuffix(file.name);
    this.icon = window.URL.createObjectURL(file);
    this.src = window.URL.createObjectURL(file);
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
    this.src = insertVideo;
    this.resource = window.URL.createObjectURL(file);
    ;
    this.original = file;
    this.type = file.type;
    this.suffix = file.type.split('/')[1];
  }
}

export class IAudio {
  constructor({file}) {
    this.name = GUID() + getSuffix(file.name);
    this.icon = videoThumb;
    this.src = insertVideo;
    this.resource = window.URL.createObjectURL(file);
    this.original = file;
    this.type = file.type;
    this.suffix = file.type.split('/')[1];
  }
}

const getSuffix = (name) => {
  let index = name.lastIndexOf('.');
  return name.substr(index);
};

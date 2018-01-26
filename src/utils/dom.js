/**
 * Created by shizw on 2018/1/26.
 */
'use strict';
function offset(elem) {
  let docElem = document.documentElement;
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + docElem.scrollTop,
    left: box.left + docElem.scrollLeft
  };
}

export default {
  offset
};

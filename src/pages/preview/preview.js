/**
 * Created by ww on 2017/7/25.
 */
import Vue from 'vue';
import App from './preview.vue';
import store from './store';
import router from './router';
import 'iview/dist/styles/iview.css';
import 'common/stylus/base.styl';
import 'common/css/preview-common.css';
import domtoimage from 'dom-to-image';

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');

window.screenshot = function () {
  return new Promise((resolve, reject) => {
    let dom = window.document.body;
    setTimeout(() => {
      domtoimage
        .toJpeg(dom)
        .then((dataUrl) => {
          resolve(dataUrl);
        });
    }, 3000);
  });
};

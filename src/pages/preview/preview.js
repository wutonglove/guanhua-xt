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
// 复合题 内容部分
import CompContent from 'components/preview-part/general-content/general-content';
Vue.component('CompContent', CompContent);

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');

window.screenshot = function() {
  return new Promise((resolve, reject) => {
    let dom = window.document.body;
    let timer = setTimeout(() => {
      domtoimage.toJpeg(dom).then(dataUrl => {
        clearTimeout(timer);
        resolve(dataUrl);
      });
    }, 3000);
  });
};

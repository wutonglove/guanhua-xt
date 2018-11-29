/**
 * Created by ww on 2017/7/7.
 */
import Vue from 'vue';
import App from './app';
import store from './store/index';
import router from './router';
import 'iview/dist/styles/iview.css';
import 'common/css/common.css';
import 'common/stylus/base.styl';

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');

/**
 * Created by ww on 2017/7/7.
 */
import Vue from 'vue';
import App from './radio.vue';
import vuex from './vuex';
import router from 'utils/router/router.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'common/stylus/base.styl';


Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  store: vuex,
  router
}).$mount('#app');

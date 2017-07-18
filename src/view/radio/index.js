/**
 * Created by ww on 2017/7/7.
 */
import Vue from 'vue';
import App from './radio.vue';
import vuex from './vuex';
import 'common/stylus/base.styl';
import router from 'utils/router/router.js';


/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  store: vuex,
  router
}).$mount('#app');

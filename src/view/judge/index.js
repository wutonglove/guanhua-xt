/**
 * Created by ww on 2017/7/7.
 */
import Vue from 'vue';
import App from './main.vue';
import vuex from 'lib/vuex';
import router from 'utils/router/router';
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

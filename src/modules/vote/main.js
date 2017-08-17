/**
 * Created by ww on 2017/7/7.
 */
import Vue from 'vue';
import App from 'components/xiti_basic/main/main.vue';
import vuex from 'lib/vuex';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'common/stylus/base.styl';

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  store: vuex
}).$mount('#app');

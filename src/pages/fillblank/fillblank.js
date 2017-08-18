/**
 * Created by ww on 2017/7/7.
 */
import Vue from 'vue';
import App from 'components/xiti_basic/main/main.vue';
import vuex from 'lib/vuex';
import 'iview/dist/styles/iview.css';
import 'common/stylus/base.styl';

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  store: vuex
}).$mount('#app');

/**
 * Created by ww on 2017/7/7.
 */
import Vue from 'vue';
import App from './radio.vue';
import vuex from '../vuex/vuex';
import 'assets/stylus/base.styl';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: vuex,
  template: '<App/>',
  components: {App}
});
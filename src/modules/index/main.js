/**
 * Created by ww on 2017/7/7.
 */
import Vue from 'vue';
import App from './main.vue';
import 'iview/dist/styles/iview.css';
import 'common/stylus/base.styl';

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app');

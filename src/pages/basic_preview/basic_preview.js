/**
 * Created by ww on 2017/7/25.
 */
import Vue from 'vue';
import App from './preview.vue';
import store from './store';
import 'iview/dist/styles/iview.css';
import 'common/stylus/base.styl';

/* eslint-disable no-new */
new Vue({
  store,
  render: h => h(App)
}).$mount('#app');

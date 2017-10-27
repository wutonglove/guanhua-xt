/**
 * Created by ww on 2017/7/25.
 */
import Vue from 'vue';
import App from './preview.vue';
import store from './store';
import router from './router';
import 'iview/dist/styles/iview.css';
import 'common/stylus/base.styl';

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');

/**
 * Created by ww on 2017/7/7.
 */
import Vue from 'vue';
import App from 'components/register/register';
import router from './router';
import 'iview/dist/styles/iview.css';
import 'common/stylus/base.styl';

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router
}).$mount('#app');

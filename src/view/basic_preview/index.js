/**
 * Created by ww on 2017/7/25.
 */
/**
 * Created by ww on 2017/7/7.
 */
import Vue from 'vue';
import App from './preview.vue';
import vuex from './vuex';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'common/stylus/base.styl';


Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  store: vuex,
  render: h => h(App)
}).$mount('#app');

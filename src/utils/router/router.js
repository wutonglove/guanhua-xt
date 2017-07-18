/**
 *
 * Created by ww on 2017/7/18.
 */
import Vue from 'vue';
import Router from 'vue-router';
import Local from 'components/insertFile/local';
import Outer from 'components/insertFile/outerNet'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/resource/local'
    },
    {
      path: '/resource/local',
      component: Local
    },
    {
      path: '/resource/outer',
      component: Outer
    },
  ],
  linkActiveClass: 'active'
});

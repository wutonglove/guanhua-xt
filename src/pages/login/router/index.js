/**
 * Created by ww on 2017/10/19.
 */
import Vue from 'vue';
import Router from 'vue-router';

const Login = (resolve) => {
  import('components/login/login').then((module) => {
    resolve(module);
  });
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    }
  ]
});

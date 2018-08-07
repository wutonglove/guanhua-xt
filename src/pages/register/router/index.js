/**
 * Created by ww on 2017/10/19.
 */
import Vue from 'vue';
import Router from 'vue-router';

const Register = resolve => {
  import('components/register/register').then(module => {
    resolve(module);
  });
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Register
    }
  ]
});

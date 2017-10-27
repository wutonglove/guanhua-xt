/**
 * Created by shizw on 2017/10/26.
 */
'use strict';
import Vue from 'vue';
import Router from 'vue-router';

import Preview from 'components/preview-part/general-pre-main/general-pre-main';
import Template1 from 'components/preview-part/template1-pre-main/template1-pre-main';

import Compare from 'components/preview-question/math/compare/compare';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Preview
    },
    {
      path: '/general',
      component: Preview
    },
    {
      path: '/interest',
      component: Template1,
      children: [
        {
          path: '/interest/compare',
          component: Compare
        }
      ]
    }
  ]
});

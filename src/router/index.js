/**
 * Created by ww on 2017/10/19.
 */
import Vue from 'vue';
import Router from 'vue-router';

import Index from 'components/index-main/index-main';
import General from 'components/general-main/general-main';
import Interest from 'components/template1-main/template1-main';

import Radio from 'components/questions/general/radio';
import Judge from 'components/questions/general/judge';
import Checkbox from 'components/questions/general/checkbox';
import Fillblank from 'components/questions/general/fillblank';
import Vote from 'components/questions/general/vote';
import Sort from 'components/questions/general/sort';
import Jigsaw from 'components/questions/general/jigsaw';
import Comprehensive from 'components/questions/general/comprehensive';
import Subjective from 'components/questions/general/subjective';

import Compare from 'components/questions/maths/compare';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/general',
      component: General,
      children: [
        {
          path: '/general/radio',
          component: Radio
        },
        {
          path: '/general/checkbox',
          component: Checkbox
        },
        {
          path: '/general/fillblank',
          component: Fillblank
        },
        {
          path: '/general/vote',
          component: Vote
        },
        {
          path: '/general/judge',
          component: Judge
        },
        {
          path: '/general/sort',
          component: Sort
        },
        {
          path: '/general/jigsaw',
          component: Jigsaw
        },
        {
          path: '/general/comprehensive',
          component: Comprehensive
        },
        {
          path: '/general/subjective',
          component: Subjective
        }
      ]
    },
    {
      path: '/math',
      component: Interest,
      children: [
        {
          path: '/math/compare',
          component: Compare
        }
      ]
    }
  ]
});

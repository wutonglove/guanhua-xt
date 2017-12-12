/**
 * Created by shizw on 2017/10/26.
 */
'use strict';
import Vue from 'vue';
import Router from 'vue-router';

import Preview from 'components/preview-part/general-pre-main/general-pre-main';
import Template1 from 'components/preview-part/template1-pre-main/template1-pre-main';

import Compare from 'components/preview-question/math/compare/compare';
import FractionalCalc from 'components/preview-question/math/fractional-calc/fractional-calc';
import VerticalCalc from 'components/preview-question/math/vertical-calc/vertical-calc';
import RubikBox from 'components/preview-question/chinese/rubik-box/rubik-box';
import Logogriph from 'components/preview-question/chinese/logogriph/logogriph';
import SpellingPoem from 'components/preview-question/chinese/spelling-poem/spelling-poem';
import Punctuation from 'components/preview-question/chinese/punctuation/punctuation';

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
        },
        {
          path: '/interest/fractional-calc',
          component: FractionalCalc
        },
        {
          path: '/interest/vertical-calc',
          component: VerticalCalc
        },
        {
          path: '/interest/rubik-box',
          component: RubikBox
        },
        {
          path: '/interest/logogriph',
          component: Logogriph
        },
        {
          path: '/interest/spelling-poem',
          component: SpellingPoem
        },
        {
          path: '/interest/punctuation',
          component: Punctuation
        }
      ]
    }
  ]
});

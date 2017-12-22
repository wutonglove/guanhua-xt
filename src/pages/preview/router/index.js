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
import BlankCloze from 'components/preview-question/interaction/blank-cloze/blank-cloze';

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
      path: '/interaction',
      component: Template1,
      children: [
        {
          path: '/interaction/compare',
          component: Compare
        },
        {
          path: '/interaction/fractional-calc',
          component: FractionalCalc
        },
        {
          path: '/interaction/vertical-calc',
          component: VerticalCalc
        },
        {
          path: '/interaction/rubik-box',
          component: RubikBox
        },
        {
          path: '/interaction/logogriph',
          component: Logogriph
        },
        {
          path: '/interaction/spelling-poem',
          component: SpellingPoem
        },
        {
          path: '/interaction/punctuation',
          component: Punctuation
        },
        {
          path: '/interaction/blank-cloze',
          component: BlankCloze
        }
      ]
    }
  ]
});

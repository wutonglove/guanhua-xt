/**
 * Created by shizw on 2017/10/26.
 */
'use strict';
import Vue from 'vue';
import Router from 'vue-router';

import Preview from 'components/preview-part/general-pre-main/general-pre-main';
import Template1 from 'components/preview-part/template1-pre-main/template1-pre-main';

const Empty = (resolve) => {
  import('components/preview-part/empty-pre-main/empty-pre-main').then((module) => {
    resolve(module);
  });
};

import Compare from 'components/preview-question/math/compare/compare';
import FractionalCalc from 'components/preview-question/math/fractional-calc/fractional-calc';
import VerticalCalc from 'components/preview-question/math/vertical-calc/vertical-calc';
import RubikBox from 'components/preview-question/chinese/rubik-box/rubik-box';
import Logogriph from 'components/preview-question/chinese/logogriph/logogriph';
import SpellingPoem from 'components/preview-question/chinese/spelling-poem/spelling-poem';
import Punctuation from 'components/preview-question/chinese/punctuation/punctuation';
import BlankCloze from 'components/preview-question/interaction/blank-cloze/blank-cloze';

const Textselect = (resolve) => {
  import('components/preview-question/interaction/textselect/textselect').then((module) => {
    resolve(module);
  });
};
const Order = (resolve) => {
  import('components/preview-question/interaction/order/order').then((module) => {
    resolve(module);
  });
};
const MindMap = (resolve) => {
  import('components/preview-question/interaction/mind-map/mind-map').then((module) => {
    resolve(module);
  });
};
const EnPronounce = (resolve) => {
  import('components/preview-question/english/en-pronounce/en-pronounce').then((module) => {
    resolve(module);
  });
};
const Interval = (resolve) => {
  import('components/preview-question/math/interval/interval').then((module) => {
    resolve(module);
  });
};
const WordGuess = (resolve) => {
  import('components/preview-question/interaction/word-guess/word-guess').then((module) => {
    resolve(module);
  });
};
const Handwrite = (resolve) => {
  import('components/preview-question/interaction/handwrite/handwrite').then((module) => {
    resolve(module);
  });
};
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Preview,
      redirect: '/general'
    },
    {
      path: '/general',
      component: Preview,
      children: [
        {
          path: '/general/handwrite',
          component: Handwrite
        }
      ]
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
        },
        {
          path: '/interaction/textselect',
          component: Textselect
        },
        {
          path: '/interaction/order',
          component: Order
        },
        {
          path: '/interaction/en-pronounce',
          component: EnPronounce
        },
        {
          path: '/interaction/interval',
          component: Interval
        },
        {
          path: '/interaction/word-guess',
          component: WordGuess
        }
      ]
    },
    {
      path: '/other',
      component: Empty,
      children: [
        {
          path: '/other/mind-map',
          component: MindMap
        }
      ]
    }
  ]
});

/**
 * Created by ww on 2017/10/19.
 */
import Vue from 'vue';
import Router from 'vue-router';

import Index from 'components/index-main/index-main';
import General from 'components/general-main/general-main';
import Interaction from 'components/template1-main/template1-main';

import Radio from 'components/questions/general/radio';
import Judge from 'components/questions/general/judge';
import Checkbox from 'components/questions/general/checkbox';
import Fillblank from 'components/questions/general/fillblank';
import Vote from 'components/questions/general/vote';
import Sort from 'components/questions/general/sort';
import Jigsaw from 'components/questions/general/jigsaw';
import Comprehensive from 'components/questions/general/comprehensive';
import Subjective from 'components/questions/general/subjective';

const Compare = (resolve) => {
  import('components/questions/maths/compare/compare').then((module) => {
    resolve(module);
  });
};
const FractionalCalc = (resolve) => {
  import('components/questions/maths/fractional-calc/fractional-calc').then((module) => {
    resolve(module);
  });
};
const VerticalCalc = (resolve) => {
  import('components/questions/maths/vertical-calc/vertical-calc').then((module) => {
    resolve(module);
  });
};
const RubikBox = (resolve) => {
  import('components/questions/chinese/rubik-box/rubik-box').then((module) => {
    resolve(module);
  });
};
const Logogriph = (resolve) => {
  import('components/questions/chinese/logogriph/logogriph').then((module) => {
    resolve(module);
  });
};
const SpellingPoem = (resolve) => {
  import('components/questions/chinese/spelling-poem/spelling-poem').then((module) => {
    resolve(module);
  });
};
const Punctuation = (resolve) => {
  import('components/questions/chinese/punctuation/punctuation').then((module) => {
    resolve(module);
  });
};
const Composition = (resolve) => {
  import('components/questions/chinese/composition/composition').then((module) => {
    resolve(module);
  });
};
const BlankCloze = (resolve) => {
  import('components/questions/interaction/blank-cloze/blank-cloze').then((module) => {
    resolve(module);
  });
};

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
        },
        {
          path: '/general/composition',
          component: Composition
        }
      ]
    },
    {
      path: '/math',
      component: Interaction,
      children: [
        {
          path: '/math/compare',
          component: Compare
        },
        {
          path: '/math/fractional-calc',
          component: FractionalCalc
        },
        {
          path: '/math/vertical-calc',
          component: VerticalCalc
        }
      ]
    },
    {
      path: '/chinese',
      component: Interaction,
      children: [
        {
          path: '/chinese/rubik-box',
          component: RubikBox
        },
        {
          path: '/chinese/logogriph',
          component: Logogriph
        },
        {
          path: '/chinese/spelling-poem',
          component: SpellingPoem
        },
        {
          path: '/chinese/punctuation',
          component: Punctuation
        }
      ]
    },
    {
      path: '/english',
      component: Interaction,
      children: [
        {
          path: '/english/rubik-box',
          component: RubikBox
        },
        {
          path: '/english/logogriph',
          component: Logogriph
        }
      ]
    },
    {
      path: '/interaction',
      component: Interaction,
      children: [
        {
          path: '/interaction/blank-cloze',
          component: BlankCloze
        }
      ]
    }
  ]
});

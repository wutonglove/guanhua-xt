/**
 * Created by ww on 2017/10/19.
 */
import Vue from 'vue';
import Router from 'vue-router';

import Index from 'components/index-main/index-main';
import General from 'components/general-main/general-main';
import Interaction from 'components/template1-main/template1-main';
import Empty from 'components/empty/empty';

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
const Interval = (resolve) => {
  import('components/questions/maths/interval/interval').then((module) => {
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
const TextSelect = (resolve) => {
  import('components/questions/interaction/textselect/textselect').then((module) => {
    resolve(module);
  });
};
const Order = (resolve) => {
  import('components/questions/interaction/order/order').then((module) => {
    resolve(module);
  });
};
const MindMap = (resolve) => {
  import('components/questions/interaction/mind-map/mind-map').then((module) => {
    resolve(module);
  });
};
const EnPronounce = (resolve) => {
  import('components/questions/english/en-pronounce/en-pronounce').then((module) => {
    resolve(module);
  });
};
const WordGuess = (resolve) => {
  import('components/questions/interaction/word-guess/word-guess').then((module) => {
    resolve(module);
  });
};
const Handwrite = (resolve) => {
  import('components/questions/interaction/handwrite/handwrite').then((module) => {
    resolve(module);
  });
};
const LinkGame = (resolve) => {
  import('components/questions/interaction/link-game/link-game').then((module) => {
    resolve(module);
  });
};
const Classify = (resolve) => {
  import('components/questions/interaction/classify/classify').then((module) => {
    resolve(module);
  });
};
const ClassifyTab = (resolve) => {
  import('components/questions/interaction/classify-tab/classify-tab').then((module) => {
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
        },
        {
          path: '/general/handwrite',
          component: Handwrite
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
        },
        {
          path: '/math/interval',
          component: Interval
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
        },
        {
          path: '/english/en-pronounce',
          component: EnPronounce
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
        },
        {
          path: '/interaction/textselect',
          component: TextSelect
        },
        {
          path: '/interaction/order',
          component: Order
        },
        {
          path: '/interaction/word-guess',
          component: WordGuess
        },
        {
          path: '/interaction/link-game',
          component: LinkGame
        },
        {
          path: '/interaction/memory-card',
          component: LinkGame
        },
        {
          path: '/interaction/classify',
          component: Classify
        },
        {
          path: '/interaction/classify-tab',
          component: ClassifyTab
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

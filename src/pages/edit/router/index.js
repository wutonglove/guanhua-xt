/**
 * Created by ww on 2017/10/19.
 */
import Vue from 'vue';
import Router from 'vue-router';
import cp from './cp-list';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/new/home'
    },
    {
      path: '/new/',
      component: cp.Index,
      children: [
        {
          path: '/new/home',
          component: cp.Home
        },
        {
          path: '/new/general',
          component: cp.General,
          children: [
            {
              path: '/new/general/radio',
              component: cp.Radio
            },
            {
              path: '/new/general/checkbox',
              component: cp.Checkbox
            },
            {
              path: '/new/general/fillblank',
              component: cp.Fillblank
            },
            {
              path: '/new/general/vote',
              component: cp.Vote
            },
            {
              path: '/new/general/judge',
              component: cp.Judge
            },
            {
              path: '/new/general/sort',
              component: cp.Sort
            },
            {
              path: '/new/general/jigsaw',
              component: cp.Jigsaw
            },
            {
              path: '/new/general/comprehensive',
              component: cp.Comprehensive
            },
            {
              path: '/new/general/subjective',
              component: cp.Subjective
            },
            {
              path: '/new/general/composition',
              component: cp.Composition
            },
            {
              path: '/new/general/handwrite',
              component: cp.Handwrite
            }
          ]
        },
        {
          path: '/new/math',
          component: cp.Interaction,
          children: [
            {
              path: '/new/math/compare',
              component: cp.Compare
            },
            {
              path: '/new/math/fractional-calc',
              component: cp.FractionalCalc
            },
            {
              path: '/new/math/vertical-calc',
              component: cp.VerticalCalc
            },
            {
              path: '/new/math/interval',
              component: cp.Interval
            }
          ]
        },
        {
          path: '/new/chinese',
          component: cp.Interaction,
          children: [
            {
              path: '/new/chinese/rubik-box',
              component: cp.RubikBox
            },
            {
              path: '/new/chinese/logogriph',
              component: cp.Logogriph
            },
            {
              path: '/new/chinese/spelling-poem',
              component: cp.SpellingPoem
            },
            {
              path: '/new/chinese/punctuation',
              component: cp.Punctuation
            }
          ]
        },
        {
          path: '/new/english',
          component: cp.Interaction,
          children: [
            {
              path: '/new/english/rubik-box',
              component: cp.RubikBox
            },
            {
              path: '/new/english/logogriph',
              component: cp.Logogriph
            },
            {
              path: '/new/english/en-pronounce',
              component: cp.EnPronounce
            }
          ]
        },
        {
          path: '/new/interaction',
          component: cp.Interaction,
          children: [
            {
              path: '/new/interaction/blank-cloze',
              component: cp.BlankCloze
            },
            {
              path: '/new/interaction/textselect',
              component: cp.TextSelect
            },
            {
              path: '/new/interaction/order',
              component: cp.Order
            },
            {
              path: '/new/interaction/word-guess',
              component: cp.WordGuess
            },
            {
              path: '/new/interaction/link-game',
              component: cp.LinkGame
            },
            {
              path: '/new/interaction/memory-card',
              component: cp.LinkGame
            },
            {
              path: '/new/interaction/classify',
              component: cp.Classify
            },
            {
              path: '/new/interaction/classify-tab',
              component: cp.ClassifyTab
            }
          ]
        },
        {
          path: '/new/other',
          component: cp.Empty,
          children: [
            {
              path: '/new/other/mind-map',
              component: cp.MindMap
            }
          ]
        }
      ]
    },
    {
      path: '/:id',
      component: cp.Edit,
      children: [
        {
          path: '/:id/general',
          component: cp.General,
          children: [
            {
              path: '/:id/general/radio',
              component: cp.Radio
            },
            {
              path: '/:id/general/checkbox',
              component: cp.Checkbox
            },
            {
              path: '/:id/general/fillblank',
              component: cp.Fillblank
            },
            {
              path: '/:id/general/vote',
              component: cp.Vote
            },
            {
              path: '/:id/general/judge',
              component: cp.Judge
            },
            {
              path: '/:id/general/sort',
              component: cp.Sort
            },
            {
              path: '/:id/general/jigsaw',
              component: cp.Jigsaw
            },
            {
              path: '/:id/general/comprehensive',
              component: cp.Comprehensive
            },
            {
              path: '/:id/general/subjective',
              component: cp.Subjective
            },
            {
              path: '/:id/general/composition',
              component: cp.Composition
            },
            {
              path: '/:id/general/handwrite',
              component: cp.Handwrite
            }
          ]
        },
        {
          path: '/:id/math',
          component: cp.Interaction,
          children: [
            {
              path: '/:id/math/compare',
              component: cp.Compare
            },
            {
              path: '/:id/math/fractional-calc',
              component: cp.FractionalCalc
            },
            {
              path: '/:id/math/vertical-calc',
              component: cp.VerticalCalc
            },
            {
              path: '/:id/math/interval',
              component: cp.Interval
            }
          ]
        },
        {
          path: '/:id/chinese',
          component: cp.Interaction,
          children: [
            {
              path: '/:id/chinese/rubik-box',
              component: cp.RubikBox
            },
            {
              path: '/:id/chinese/logogriph',
              component: cp.Logogriph
            },
            {
              path: '/:id/chinese/spelling-poem',
              component: cp.SpellingPoem
            },
            {
              path: '/:id/chinese/punctuation',
              component: cp.Punctuation
            }
          ]
        },
        {
          path: '/:id/english',
          component: cp.Interaction,
          children: [
            {
              path: '/:id/english/rubik-box',
              component: cp.RubikBox
            },
            {
              path: '/:id/english/logogriph',
              component: cp.Logogriph
            },
            {
              path: '/:id/english/en-pronounce',
              component: cp.EnPronounce
            }
          ]
        },
        {
          path: '/:id/interaction',
          component: cp.Interaction,
          children: [
            {
              path: '/:id/interaction/blank-cloze',
              component: cp.BlankCloze
            },
            {
              path: '/:id/interaction/textselect',
              component: cp.TextSelect
            },
            {
              path: '/:id/interaction/order',
              component: cp.Order
            },
            {
              path: '/:id/interaction/word-guess',
              component: cp.WordGuess
            },
            {
              path: '/:id/interaction/link-game',
              component: cp.LinkGame
            },
            {
              path: '/:id/interaction/memory-card',
              component: cp.LinkGame
            },
            {
              path: '/:id/interaction/classify',
              component: cp.Classify
            },
            {
              path: '/:id/interaction/classify-tab',
              component: cp.ClassifyTab
            }
          ]
        },
        {
          path: '/:id/other',
          component: cp.Empty,
          children: [
            {
              path: '/:id/other/mind-map',
              component: cp.MindMap
            }
          ]
        }
      ]
    }
  ]
});

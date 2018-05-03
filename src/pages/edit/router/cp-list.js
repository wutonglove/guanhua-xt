/**
 * Created by shizw on 2018/4/26.
 */
'use strict';
const cps = {};
cps.Index = (resolve) => {
  import('components/index/index').then((module) => {
    resolve(module);
  });
};
cps.Home = (resolve) => {
  import('components/home/home').then((module) => {
    resolve(module);
  });
};

cps.Edit = (resolve) => {
  import('components/edit/edit').then((module) => {
    resolve(module);
  });
};

cps.General = (resolve) => {
  import('components/general-main/general-main').then((module) => {
    resolve(module);
  });
};
cps.Interaction = (resolve) => {
  import('components/template1-main/template1-main').then((module) => {
    resolve(module);
  });
};

cps.Empty = (resolve) => {
  import('components/empty/empty').then((module) => {
    resolve(module);
  });
};

cps.Radio = (resolve) => {
  import('components/questions/general/radio').then((module) => {
    resolve(module);
  });
};

cps.Judge = (resolve) => {
  import('components/questions/general/judge').then((module) => {
    resolve(module);
  });
};

cps.Checkbox = (resolve) => {
  import('components/questions/general/checkbox').then((module) => {
    resolve(module);
  });
};
cps.Sort = (resolve) => {
  import('components/questions/general/sort').then((module) => {
    resolve(module);
  });
};
cps.Jigsaw = (resolve) => {
  import('components/questions/general/jigsaw').then((module) => {
    resolve(module);
  });
};

cps.Vote = (resolve) => {
  import('components/questions/general/vote').then((module) => {
    resolve(module);
  });
};
cps.Fillblank = (resolve) => {
  import('components/questions/general/fillblank').then((module) => {
    resolve(module);
  });
};

cps.Comprehensive = (resolve) => {
  import('components/questions/general/comprehensive').then((module) => {
    resolve(module);
  });
};

cps.Subjective = (resolve) => {
  import('components/questions/general/subjective').then((module) => {
    resolve(module);
  });
};

cps.Compare = (resolve) => {
  import('components/questions/maths/compare/compare').then((module) => {
    resolve(module);
  });
};
cps.FractionalCalc = (resolve) => {
  import('components/questions/maths/fractional-calc/fractional-calc').then((module) => {
    resolve(module);
  });
};
cps.VerticalCalc = (resolve) => {
  import('components/questions/maths/vertical-calc/vertical-calc').then((module) => {
    resolve(module);
  });
};
cps.Interval = (resolve) => {
  import('components/questions/maths/interval/interval').then((module) => {
    resolve(module);
  });
};
cps.RubikBox = (resolve) => {
  import('components/questions/chinese/rubik-box/rubik-box').then((module) => {
    resolve(module);
  });
};
cps.Logogriph = (resolve) => {
  import('components/questions/chinese/logogriph/logogriph').then((module) => {
    resolve(module);
  });
};
cps.SpellingPoem = (resolve) => {
  import('components/questions/chinese/spelling-poem/spelling-poem').then((module) => {
    resolve(module);
  });
};
cps.Punctuation = (resolve) => {
  import('components/questions/chinese/punctuation/punctuation').then((module) => {
    resolve(module);
  });
};
cps.Composition = (resolve) => {
  import('components/questions/chinese/composition/composition').then((module) => {
    resolve(module);
  });
};
cps.BlankCloze = (resolve) => {
  import('components/questions/interaction/blank-cloze/blank-cloze').then((module) => {
    resolve(module);
  });
};
cps.TextSelect = (resolve) => {
  import('components/questions/interaction/textselect/textselect').then((module) => {
    resolve(module);
  });
};
cps.Order = (resolve) => {
  import('components/questions/interaction/order/order').then((module) => {
    resolve(module);
  });
};
cps.MindMap = (resolve) => {
  import('components/questions/interaction/mind-map/mind-map').then((module) => {
    resolve(module);
  });
};
cps.EnPronounce = (resolve) => {
  import('components/questions/english/en-pronounce/en-pronounce').then((module) => {
    resolve(module);
  });
};
cps.WordGuess = (resolve) => {
  import('components/questions/interaction/word-guess/word-guess').then((module) => {
    resolve(module);
  });
};
cps.Handwrite = (resolve) => {
  import('components/questions/interaction/handwrite/handwrite').then((module) => {
    resolve(module);
  });
};
cps.LinkGame = (resolve) => {
  import('components/questions/interaction/link-game/link-game').then((module) => {
    resolve(module);
  });
};
cps.Classify = (resolve) => {
  import('components/questions/interaction/classify/classify').then((module) => {
    resolve(module);
  });
};
cps.ClassifyTab = (resolve) => {
  import('components/questions/interaction/classify-tab/classify-tab').then((module) => {
    resolve(module);
  });
};

export default cps;

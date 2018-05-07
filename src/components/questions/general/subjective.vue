<template>
  <div>
    <topic :topic="topic" @change="tpChange"></topic>
    <cnt-module name="答案" :isMandatory="true">
      <div-input v-model="answer"></div-input>
    </cnt-module>
    <hint :hint="hint" @change="hintChange"></hint>
    <explanation :explanation="explanation" @change="expChange"></explanation>
  </div>
</template>

<script>
import Topic from 'components/general-part/topic/topic';
import Hint from 'components/general-part/hint/hint';
import Explanation from 'components/general-part/explanation/explanation';
import CntModule from 'components/general-part/cnt-module/cnt-module';
import DivInput from 'components/general-part/div-input/div-input';

import { replaceSrc } from 'utils/utilities';
import { generalMixin } from 'common/js/mixin';

export default {
  mixins: [generalMixin],
  data() {
    return {
      answer: ''
    };
  },
  computed: {
    _answer: {
      set(value) {
        this.answer = value;
      },
      get() {
        return this.answer;
      }
    }
  },
  methods: {
    getQuestionData: function(urlSnippet) {
      let _topic = this.topic;
      let _answer = this.answer.trim();

      let questionData = {
        title: document.title,
        topic: replaceSrc(_topic, urlSnippet),
        answer: replaceSrc(_answer, urlSnippet),
        questionType: 'subjective'
      };
      let localData = {
        title: document.title,
        topic: replaceSrc(_topic),
        answer: replaceSrc(_answer),
        questionType: 'subjective'
      };
      return {
        questionData,
        localData
      };
    },
    complete() {
      if (!this.topic) {
        this.isPass = false;
        return;
      }
      if (!this.answer) {
        this.isPass = false;
        return;
      }
      this.isPass = true;
    }
  },
  watch: {
    topic() {
      this.verify();
    },
    answer() {
      this.verify();
    }
  },
  components: {
    Topic,
    Hint,
    Explanation,
    CntModule,
    DivInput
  }
};
</script>

<style scoped lang="stylus">
</style>

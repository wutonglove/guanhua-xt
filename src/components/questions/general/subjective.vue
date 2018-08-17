<template>
  <div>
    <topic v-model="qsData.topic"></topic>
    <cnt-module name="答案" :required="true">
      <div-input v-model="qsData.answer"></div-input>
    </cnt-module>
    <hint v-model="qsData.hint"></hint>
    <explanation v-model="qsData.explanation"></explanation>
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
  methods: {
    initQsData() {
      return (this.qsData = {
        topic: '',
        hint: '',
        explanation: '',
        answer: ''
      });
    },
    getQuestionData: function(urlSnippet) {
      let _topic = this.qsData.topic;
      let _answer = this.qsData.answer;

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
    validate() {
      if (!this.qsData) return [false];
      return [this.qsData.topic !== '', this.qsData.answer !== ''];
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

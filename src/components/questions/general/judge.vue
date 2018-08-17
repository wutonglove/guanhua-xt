<template>
  <div>
    <topic v-model="qsData.topic"></topic>
    <answer v-model="qsData.answer" :options="qsData.options"></answer>
    <hint v-model="qsData.hint"></hint>
    <explanation v-model="qsData.explanation"></explanation>
  </div>
</template>

<script>
import Topic from 'components/general-part/topic/topic';
import Answer from 'components/general-part/answer/answer';
import Hint from 'components/general-part/hint/hint';
import Explanation from 'components/general-part/explanation/explanation';

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
        options: [
          {
            icon: '是',
            text: '',
            id: 0
          },
          {
            icon: '否',
            text: '',
            id: 1
          }
        ],
        answer: '-1'
      });
    },
    getQuestionData(urlSnippet) {
      let _topic = this.qsData.topic;
      let _answer = this.qsData.answer;
      let _hint = this.qsData.hint;
      let _explanation = this.qsData.explanation;

      let questionData = {
        title: document.title,
        topic: replaceSrc(_topic, urlSnippet),
        answer: _answer,
        hint: replaceSrc(_hint, urlSnippet),
        explanation: replaceSrc(_explanation, urlSnippet),
        questionType: 'judge'
      };
      let localData = {
        title: document.title,
        topic: replaceSrc(_topic),
        answer: _answer,
        hint: replaceSrc(_hint),
        explanation: replaceSrc(_explanation),
        questionType: 'judge'
      };
      return {
        questionData,
        localData
      };
    },
    validate() {
      if (!this.qsData) return [false];
      return [this.qsData.topic !== '', this.qsData.answer !== '-1'];
    }
  },
  components: {
    Topic,
    Answer,
    Hint,
    Explanation
  }
};
</script>

<style scoped lang="stylus">
</style>

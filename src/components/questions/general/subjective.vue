<template>
  <div>
    <topic v-model="qsData.topic"></topic>
    <e-box v-model="qsData.answer" name="答案"  :required="true"></e-box>    
    <e-box v-model="qsData.hint" name="提示"></e-box>
    <e-box v-model="qsData.explanation" name="解析"></e-box>
  </div>
</template>

<script>
import EBox from 'components/general-part/edit-box/edit-box';
import Topic from 'components/general-part/topic/topic';

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
    EBox,
    Topic
  }
};
</script>

<style scoped lang="stylus">
</style>

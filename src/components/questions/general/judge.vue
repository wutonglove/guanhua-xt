<template>
  <div>
    <topic :topic="topic" @change="tpChange" @input="verify" ref="topic"></topic>
    <answer :options="options" :answer="answer" @change="anwChange"></answer>
    <hint :hint="hint" @change="hintChange"></hint>
    <explanation :explanation="explanation" @change="expChange"></explanation>
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
  data() {
    return {
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
    };
  },
  methods: {
    getQuestionData(urlSnippet) {
      let _topic = this.topic;
      let _answer = this.answer;
      let _hint = this.hint;
      let _explanation = this.explanation;

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
    complete() {
      return [this.$refs.topic.isComplete, this.answer && this.answer !== '-1'];
    },
    initOriData(newVal) {
      this.answer = newVal.answer.toString();
      this.topic = newVal.topic;
      this.explanation = newVal.explanation;
      this.hint = newVal.hint;
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
    Answer,
    Hint,
    Explanation
  }
};
</script>

<style scoped lang="stylus">
</style>

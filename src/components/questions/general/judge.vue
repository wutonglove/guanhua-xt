<template>
  <div>
    <topic ref="topicDOM" @verify="verify"></topic>
    <answer :options="options" ref="answerDOM" @verify="verify"></answer>
    <hint ref="hintDOM"></hint>
    <explanation ref="explanationDOM"></explanation>
  </div>
</template>

<script>
  import Topic from 'components/general-part/topic/topic';
  import Answer from 'components/general-part/answer/answer';
  import Hint from 'components/general-part/hint/hint';
  import Explanation from 'components/general-part/explanation/explanation';

  import {replaceSrc} from 'utils/utilities';
  import {verifyMixin} from 'common/js/mixin';

  export default {
    mixins: [verifyMixin],
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
        let _topic = this.$refs.topicDOM.topic;
        let _answer = this.$refs.answerDOM.answer;
        let _hint = this.$refs.hintDOM.hint;
        let _explanation = this.$refs.explanationDOM.explanation;

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
      getIsPass() {
        return [
          this.$refs.topicDOM.isPass,
          this.$refs.answerDOM.isPass
        ];
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

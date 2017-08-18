<template>
  <div>
    <topic ref="topicDOM" @on-test="test"></topic>
    <answer :options="options" ref="answerDOM" @on-test="test"></answer>
    <hint ref="hintDOM"></hint>
    <explanation ref="explanationDOM"></explanation>
  </div>
</template>

<script>
  import Topic from 'components/xiti_basic/topic/topic';
  import Answer from 'components/xiti_basic/answer/answer';
  import Hint from 'components/xiti_basic/hint/hint';
  import Explanation from 'components/xiti_basic/explanation/explanation';

  import {replaceSrc} from 'utils/utilities';

  export default {
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
        answer: '-1',
        isPass: false,
        questionData: {},
        localData: {}
      };
    },
    methods: {
      getQuestionData() {
        let _topic = this.$refs.topicDOM.topic;
        let _answer = this.$refs.answerDOM.answer;
        let _hint = this.$refs.hintDOM.hint;
        let _explanation = this.$refs.explanationDOM.explanation;
        let _url = this.$store.state.urlSnippet;

        this.questionData = {
          title: document.title,
          topic: replaceSrc(_topic, _url, true),
          answer: _answer,
          hint: replaceSrc(_hint, _url, true),
          explanation: replaceSrc(_explanation, _url, true),
          questionType: 'judge'
        };
        this.localData = {
          title: document.title,
          topic: replaceSrc(_topic, _url),
          answer: _answer,
          hint: replaceSrc(_hint, _url),
          explanation: replaceSrc(_explanation, _url),
          questionType: 'judge'
        };
        return {
          questionData: this.questionData,
          localData: this.localData
        };
      },
      test: function () {
        let domarr = [this.$refs.topicDOM, this.$refs.answerDOM];

        this.$store.dispatch('test', domarr);
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

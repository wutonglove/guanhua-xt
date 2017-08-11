<template>
  <div>
    <topic ref="topicDOM" @on-test="test"></topic>
    <options :options="options" ref="optionsDOM" @on-test="test"></options>
    <answer :options="options" ref="answerDOM" @on-test="test"></answer>
    <hint ref="hintDOM"></hint>
    <explanation ref="explanationDOM"></explanation>
  </div>
</template>

<script>
  import Topic from 'components/xiti_basic/topic/topic';
  import Options from 'components/xiti_basic/options/options';
  import Answer from 'components/xiti_basic/answer/answer';
  import Hint from 'components/xiti_basic/hint/hint';
  import Explanation from 'components/xiti_basic/explanation/explanation';

  import {replaceSrc} from 'utils/utilities';

  export default {
    data(){
      return {
        options: [
          {
            icon: 'A',
            text: '',
            id: 0
          },
          {
            icon: 'B',
            text: '',
            id: 1
          }
        ],
        answer: '-1',
        questionData: {},
        localData: {}
      };
    },
    methods: {
      getQuestionData: function () {
        let _topic = this.$refs.topicDOM.topic;
        let _options = this.$refs.optionsDOM.options;
        let _answer = this.$refs.answerDOM.answer;
        let _hint = this.$refs.hintDOM.hint;
        let _explanation = this.$refs.explanationDOM.explanation;
        let _url = this.$store.state.urlSnippet;

        this.questionData = {
          title: document.title,
          topic: replaceSrc(_topic, _url, true),
          options: (function () {
            let options = [];
            _options.forEach((item, index) => {
              let option = {
                icon: item.icon,
                text: replaceSrc(item.text, _url, true),
                id: item.id
              };
              options.push(option);
            });
            return options;
          })(),
          answer: _answer,
          hint: replaceSrc(_hint, _url, true),
          explanation: replaceSrc(_explanation, _url, true),
          questionType: 'radio'
        };
        this.localData = {
          title: document.title,
          topic: _topic,
          options: (function () {
            let options = [];
            _options.forEach((item, index) => {
              let option = {
                icon: item.icon,
                text: item.text,
                id: item.id
              };
              options.push(option);
            });
            return options;
          })(),
          answer: _answer,
          hint: _hint,
          explanation: _explanation,
          questionType: 'radio'
        };
        return {
          questionData: this.questionData,
          localData: this.localData
        };
      },
      test: function () {
        let domarr = [this.$refs.topicDOM, this.$refs.optionsDOM, this.$refs.answerDOM];

        this.$store.dispatch('test', domarr);
      }
    },
    components: {
      Topic,
      Options,
      Answer,
      Hint,
      Explanation
    }
  };
</script>

<style scoped lang="stylus">
</style>

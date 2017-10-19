<template>
  <div>
    <topic ref="topicDOM" @verify="verify"></topic>
    <options :options="options" ref="optionsDOM" @verify="verify"></options>
    <answer :options="options" inputType="checkbox" ref="answerDOM" @verify="verify"></answer>
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
  import {verifyMixin} from 'common/js/mixin';

  export default {
    mixins: [verifyMixin],
    data() {
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
        answer: [],
        isPass: false
      };
    },
    methods: {
      getQuestionData: function (urlSnippet) {
        let _topic = this.$refs.topicDOM.topic;
        let _options = this.$refs.optionsDOM.options;
        let _answer = this.$refs.answerDOM.answers;
        let _hint = this.$refs.hintDOM.hint;
        let _explanation = this.$refs.explanationDOM.explanation;

        let questionData = {
          title: document.title,
          topic: replaceSrc(_topic, urlSnippet),
          options: (function () {
            let options = [];
            _options.forEach((item, index) => {
              let option = {
                icon: item.icon,
                text: replaceSrc(item.text, urlSnippet),
                id: item.id
              };
              options.push(option);
            });
            return options;
          })(),
          answer: _answer,
          hint: replaceSrc(_hint, urlSnippet),
          explanation: replaceSrc(_explanation, urlSnippet),
          questionType: 'checkbox'
        };
        let localData = {
          title: document.title,
          topic: replaceSrc(_topic),
          options: (function () {
            let options = [];
            _options.forEach((item, index) => {
              let option = {
                icon: item.icon,
                text: replaceSrc(item.text),
                id: item.id
              };
              options.push(option);
            });
            return options;
          })(),
          answer: _answer,
          hint: replaceSrc(_hint),
          explanation: replaceSrc(_explanation),
          questionType: 'checkbox'
        };
        return {
          questionData,
          localData
        };
      },
      getIsPass() {
        return [
          this.$refs.topicDOM.isPass,
          this.$refs.optionsDOM.isPass,
          this.$refs.answerDOM.isPass
        ];
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

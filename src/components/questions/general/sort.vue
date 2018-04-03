<template>
  <div>
    <topic ref="topicDOM" @verify="verify"></topic>
    <options :options="options" name="排序项" desc="请按照正确的顺序依次输入排序项" ref="optionsDOM" @verify="verify"></options>
    <hint ref="hintDOM"></hint>
    <explanation ref="explanationDOM"></explanation>
  </div>
</template>

<script>
  import Topic from 'components/general-part/topic/topic';
  import Options from 'components/general-part/options/options';
  import Hint from 'components/general-part/hint/hint';
  import Explanation from 'components/general-part/explanation/explanation';
  import {OptionsData} from 'common/js/class';

  import {replaceSrc} from 'utils/utilities';
  import {verifyMixin} from 'common/js/mixin';

  export default {
    mixins: [verifyMixin],
    data() {
      return {
        options: new OptionsData().data,
        questionData: {},
        localData: {}
      };
    },
    methods: {
      getQuestionData: function (urlSnippet) {
        let _topic = this.$refs.topicDOM.topic;
        let _options = this.$refs.optionsDOM.options;
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
          hint: replaceSrc(_hint, urlSnippet),
          explanation: replaceSrc(_explanation, urlSnippet),
          questionType: 'sort'
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
          hint: replaceSrc(_hint),
          explanation: replaceSrc(_explanation),
          questionType: 'sort'
        };
        return {
          questionData,
          localData
        };
      },
      getIsPass() {
        return [
          this.$refs.topicDOM.isPass,
          this.$refs.optionsDOM.isPass
        ];
      }
    },
    components: {
      Topic,
      Options,
      Hint,
      Explanation
    }
  };
</script>

<style scoped lang="stylus">
</style>

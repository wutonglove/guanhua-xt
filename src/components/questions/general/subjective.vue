<template>
  <div>
    <topic ref="topicDOM" @verify="verify"></topic>
    <cnt-module name="答案" :isMandatory="true">
      <div class="div_input cl_rg_hook"
           contenteditable="true"
           spellcheck="false" ref="answerDom"
           @blur="verify"
           @input="setAnswer"
      ></div>
    </cnt-module>
    <hint ref="hintDOM"></hint>
    <explanation ref="explanationDOM"></explanation>
  </div>
</template>

<script>
  import Topic from 'components/general-part/topic/topic';
  import Hint from 'components/general-part/hint/hint';
  import Explanation from 'components/general-part/explanation/explanation';
  import CntModule from 'components/general-part/cnt-module/cnt-module';

  import {replaceSrc} from 'utils/utilities';
  import {verifyMixin} from 'common/js/mixin';

  export default {
    mixins: [verifyMixin],
    data() {
      return {
        answer: '',
        questionData: {},
        localData: {}
      };
    },
    methods: {
      setAnswer: function () {
        this.answer = this.$refs.answerDom.innerHTML.trim();
        this.verify();
      },
      getQuestionData: function (urlSnippet) {
        let _topic = this.$refs.topicDOM.topic;
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
      getIsPass() {
        return [
          this.$refs.topicDOM.isPass,
          this.answer !== ''
        ];
      }
    },
    components: {
      Topic,
      Hint,
      Explanation,
      CntModule
    }
  };
</script>

<style scoped lang="stylus">
</style>

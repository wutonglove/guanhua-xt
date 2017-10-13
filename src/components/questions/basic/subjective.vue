<template>
  <div>
    <topic ref="topicDOM" @on-test="test"></topic>
    <cnt-module name="答案" :isMandatory="true">
      <div class="div_input"
           contenteditable="true"
           spellcheck="false" ref="answerDom"
           @blur="test"
           @input="setAnswer"
      ></div>
    </cnt-module>
    <hint ref="hintDOM"></hint>
    <explanation ref="explanationDOM"></explanation>
  </div>
</template>

<script>
  import Topic from 'components/xiti_basic/topic/topic';
  import Hint from 'components/xiti_basic/hint/hint';
  import Explanation from 'components/xiti_basic/explanation/explanation';
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';

  import {replaceSrc} from 'utils/utilities';

  export default {
    data() {
      return {
        answer: '',
        isPass: false,
        questionData: {},
        localData: {}
      };
    },
    methods: {
      setAnswer: function () {
        this.answer = this.$refs.answerDom.innerHTML.trim();
        this.test();
      },
      getQuestionData: function () {
        let _topic = this.$refs.topicDOM.topic;
        let _answer = this.answer.trim();
        let _url = this.$store.state.urlSnippet;

        this.questionData = {
          title: document.title,
          topic: replaceSrc(_topic, _url, true),
          answer: replaceSrc(_answer, _url, true),
          questionType: 'subjective'
        };
        this.localData = {
          title: document.title,
          topic: replaceSrc(_topic, _url),
          answer: replaceSrc(_answer, _url),
          questionType: 'subjective'
        };
        return {
          questionData: this.questionData,
          localData: this.localData
        };
      },
      test: function () {
        this.isPass = (this.answer !== '') ? 1 : 0;
        let domarr = [this.$refs.topicDOM, this];

        this.$store.dispatch('test', domarr);
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

<template>
  <div>
    <topic :topic="topic" @change="tpChange" @input="verify" ref="topic"></topic>
    <options :options="options" @input="verify" ref="options"></options>
    <answer :options="options" :answer="answer" @change="anwChange"></answer>
    <hint :hint="hint" @change="hintChange"></hint>
    <explanation :explanation="explanation" @change="expChange"></explanation>
  </div>
</template>

<script>
import Topic from 'components/general-part/topic/topic';
import Options from 'components/general-part/options/options';
import Answer from 'components/general-part/answer/answer';
import Hint from 'components/general-part/hint/hint';
import Explanation from 'components/general-part/explanation/explanation';
import { OptionsData } from 'common/js/class';
import { replaceSrc } from 'utils/utilities';
import { generalMixin } from 'common/js/mixin';

export default {
  mixins: [generalMixin],
  data() {
    return {
      options: new OptionsData().data,
      answer: []
    };
  },
  methods: {
    getQuestionData: function(urlSnippet) {
      let _topic = this.topic;
      let _options = this.options;
      let _answer = this.answer.map((item, index) => {
        let code = item.charCodeAt(0);
        if (code > 64 && code < 91) {
          return code - 65;
        }
      });
      let _hint = this.hint;
      let _explanation = this.explanation;

      let questionData = {
        title: document.title,
        topic: replaceSrc(_topic, urlSnippet),
        options: (function() {
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
        options: (function() {
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
    complete() {
      return [
        this.$refs.topic.isComplete,
        this.answer && this.answer.length > 0,
        this.$refs.options.isComplete
      ];
    },
    initOriData(newVal) {
      this.options = newVal.options.map(item => {
        return Object.assign({}, item);
      });
      this.answer = newVal.answer.map(item => {
        return newVal.options[item].icon;
      });
      this.topic = newVal.topic;
      this.explanation = newVal.explanation;
      this.hint = newVal.hint;
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

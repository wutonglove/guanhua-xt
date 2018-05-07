<template>
  <div>
    <topic :topic="topic" @change="tpChange" @input="verify"></topic>
    <options :options="options" @input="verify"></options>
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
      answer: '-1'
    };
  },
  methods: {
    getQuestionData(urlSnippet) {
      let _topic = this.topic;
      let _options = this.options;
      let _answer = this.answer.charCodeAt(0);
      if (_answer > 64 && _answer < 91) {
        _answer = _answer - 65;
      }
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
        questionType: 'radio'
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
        questionType: 'radio'
      };
      return {
        questionData,
        localData
      };
    },
    complete() {
      if (!this.topic) {
        this.isPass = false;
        return;
      }
      if (!this.answer || this.answer === '-1') {
        this.isPass = false;
        return;
      }
      for (let i = 0; i < this.options.length; i++) {
        if (!this.options[i].text.trim()) {
          this.isPass = false;
          return;
        }
      }
      this.isPass = true;
    },
    initOriData(newVal) {
      this.options = newVal.options.map(item => {
        return Object.assign({}, item);
      });
      this.answer = newVal.options[newVal.answer].icon;
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
    },
    options: {
      deep: true,
      handler() {
        this.verify();
      }
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

<template>
  <div>
    <topic :topic="topic" @change="tpChange" @input="verify" ref="topic"></topic>
    <options :options="options" name="排序项" desc="请按照正确的顺序依次输入排序项" @input="verify" ref="options"></options>
    <hint :hint="hint" @change="hintChange"></hint>
    <explanation :explanation="explanation" @change="expChange"></explanation>
  </div>
</template>

<script>
import Topic from 'components/general-part/topic/topic';
import Options from 'components/general-part/options/options';
import Hint from 'components/general-part/hint/hint';
import Explanation from 'components/general-part/explanation/explanation';
import { OptionsData } from 'common/js/class';

import { replaceSrc } from 'utils/utilities';
import { generalMixin } from 'common/js/mixin';

export default {
  mixins: [generalMixin],
  data() {
    return {
      options: new OptionsData().data
    };
  },
  methods: {
    getQuestionData: function(urlSnippet) {
      let _topic = this.topic;
      let _options = this.options;
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
        hint: replaceSrc(_hint, urlSnippet),
        explanation: replaceSrc(_explanation, urlSnippet),
        questionType: 'sort'
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
        hint: replaceSrc(_hint),
        explanation: replaceSrc(_explanation),
        questionType: 'sort'
      };
      return {
        questionData,
        localData
      };
    },
    complete() {
      return [
        this.$refs.topic.isComplete,
        this.$refs.options.isComplete
      ];
    }
  },
  watch: {
    topic() {
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
    Hint,
    Explanation
  }
};
</script>

<style scoped lang="stylus">
</style>

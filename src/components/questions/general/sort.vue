<template>
  <div>
    <topic v-model="qsData.topic"></topic>
    <options ref="options" v-model="qsData.options" desc="请按照正确的顺序依次输入排序项" name="排序项"></options>
    <hint v-model="qsData.hint"></hint>
    <explanation v-model="qsData.explanation"></explanation>
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
    initQsData() {
      return (this.qsData = {
        topic: '',
        hint: '',
        explanation: '',
        options: new OptionsData().data
      });
    },
    getQuestionData: function(urlSnippet) {
      let _topic = this.qsData.topic;
      let _options = this.qsData.options;
      let _hint = this.qsData.hint;
      let _explanation = this.qsData.explanation;

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
    validate() {
      if (!this.qsData) return [false];
      return [
        this.qsData.topic !== '',
        this.$refs.options.valid
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

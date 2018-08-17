<template>
  <div>
    <e-box v-model="qsData.topic" name="题干" :config="{initialFrameHeight: 60}" :mheight="90" :required="true"></e-box>
    <options ref="options" v-model="qsData.options"></options>
    <answer v-model="qsData.answer" :options="qsData.options"></answer>
    <e-box v-model="qsData.hint" name="提示"></e-box>
    <e-box v-model="qsData.explanation" name="解析"></e-box>
  </div>
</template>

<script>
import EBox from 'components/general-part/edit-box/edit-box';

import Options from 'components/general-part/options/options';
import Answer from 'components/general-part/answer/answer';
import { OptionsData } from 'common/js/class';
import { replaceSrc } from 'utils/utilities';
import { generalMixin } from 'common/js/mixin';

export default {
  mixins: [generalMixin],
  methods: {
    initQsData() {
      return (this.qsData = {
        topic: '',
        hint: '',
        explanation: '',
        options: new OptionsData().data,
        answer: '-1'
      });
    },
    getQuestionData(urlSnippet) {
      let _topic = this.qsData.topic;
      let _options = this.qsData.options;
      let _answer = this.qsData.answer.charCodeAt(0) - 65;
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
    validate() {
      if (!this.qsData) return [false];
      return [
        this.qsData.topic !== '',
        this.qsData.answer !== '-1',
        this.$refs.options.valid
      ];
    }
  },
  components: {
    Options,
    Answer,
    EBox
  }
};
</script>

<style scoped lang="stylus">
</style>

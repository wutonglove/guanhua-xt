<template>
  <div>
    <topic v-model="qsData.topic"></topic>
    <div class="choiceType">
      <i-radio-group v-model="voteType">
        <i-radio label="radio">
          <span class="text">单项投票</span>
        </i-radio>
        <i-radio label="multiple">
          <span class="text">不定项投票</span>
        </i-radio>
      </i-radio-group>
    </div>
    <options ref="options" name="投票项" v-model="qsData.options"></options>
  </div>
</template>

<script>
import Topic from 'components/general-part/topic/topic';
import Options from 'components/general-part/options/options';

import IRadioGroup from 'iview/src/components/radio/radio-group';
import IRadio from 'iview/src/components/radio';

import { replaceSrc } from 'utils/utilities';
import { generalMixin } from 'common/js/mixin';
import { OptionsData } from 'common/js/class';

export default {
  mixins: [generalMixin],
  data() {
    return {
      voteType: 'multiple'
    };
  },
  methods: {
    initQsData() {
      return (this.qsData = {
        topic: '',
        options: new OptionsData().data
      });
    },
    getQuestionData(urlSnippet) {
      let _topic = this.qsData.topic;
      let _options = this.qsData.options;

      let questionData = {
        title: document.title,
        topic: replaceSrc(_topic, urlSnippet),
        options: (function() {
          let options = [];
          _options.forEach((item, index) => {
            let option = {
              icon: item.icon,
              text: replaceSrc(item.text, urlSnippet)
            };
            options.push(option);
          });
          return options;
        })(),
        voteType: this.voteType,
        questionType: 'vote'
      };
      let localData = {
        title: document.title,
        topic: replaceSrc(_topic),
        options: (function() {
          let options = [];
          _options.forEach((item, index) => {
            let option = {
              icon: item.icon,
              text: replaceSrc(item.text)
            };
            options.push(option);
          });
          return options;
        })(),
        voteType: this.voteType,
        questionType: 'vote'
      };
      return {
        questionData,
        localData
      };
    },
    validate() {
      if (!this.qsData) return [false];
      return [this.qsData.topic !== '', this.$refs.options.valid];
    }
  },
  components: {
    Topic,
    Options,
    IRadio,
    IRadioGroup
  }
};
</script>

<style scoped lang="stylus">
.choiceType
  margin-top: 20px
  .text
    font-size: 16px
</style>

<template>
  <div>
    <topic :topic="topic" @change="tpChange"></topic>
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
    <options :options="options" name="投票项" @input="verify"></options>
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
      options: new OptionsData().data,
      voteType: 'multiple'
    };
  },
  methods: {
    getQuestionData(urlSnippet) {
      let _topic = this.topic;
      let _options = this.options;

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
    complete() {
      if (!this.topic) {
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

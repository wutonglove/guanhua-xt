<template>
  <div>
    <topic ref="topicDOM" @on-test="test"></topic>
    <div class="choiceType">
      <Radio-group v-model="voteType">
        <Radio label="radio">
          <span class="text">单项投票</span>
        </Radio>
        <Radio label="multiple">
          <span class="text">不定项投票</span>
        </Radio>
      </Radio-group>
    </div>
    <options :options="options" name="投票项" ref="optionsDOM" @on-test="test"></options>
  </div>
</template>

<script>
  import Topic from 'components/xiti_basic/topic/topic';
  import Options from 'components/xiti_basic/options/options';

  import Radio from 'iview/src/components/radio';

  import {replaceSrc} from 'utils/utilities';

  export default {
    data() {
      return {
        options: [
          {
            icon: 'A',
            text: ''
          },
          {
            icon: 'B',
            text: ''
          }
        ],
        voteType: 'multiple',
        questionData: {},
        localData: {}
      };
    },
    methods: {
      getQuestionData: function () {
        let _topic = this.$refs.topicDOM.topic;
        let _options = this.$refs.optionsDOM.options;
        let _url = this.$store.state.urlSnippet;

        this.questionData = {
          title: document.title,
          topic: replaceSrc(_topic, _url, true),
          options: (function () {
            let options = [];
            _options.forEach((item, index) => {
              let option = {
                icon: item.icon,
                text: replaceSrc(item.text, _url, true)
              };
              options.push(option);
            });
            return options;
          })(),
          voteType: this.voteType,
          questionType: 'vote'
        };
        this.localData = {
          title: document.title,
          topic: replaceSrc(_topic, _url),
          options: (function () {
            let options = [];
            _options.forEach((item, index) => {
              let option = {
                icon: item.icon,
                text: replaceSrc(item.text, _url)
              };
              options.push(option);
            });
            return options;
          })(),
          voteType: this.voteType,
          questionType: 'vote'
        };
        return {
          questionData: this.questionData,
          localData: this.localData
        };
      },
      test: function () {
        let domarr = [this.$refs.topicDOM, this.$refs.optionsDOM];

        this.$store.dispatch('test', domarr);
      }
    },
    components: {
      Topic,
      Options,
      Radio
    }
  };
</script>

<style scoped lang="stylus">
  .choiceType
    margin-top: 20px
    .text
      font-size: 16px
</style>

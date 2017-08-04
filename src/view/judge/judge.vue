<template>
  <div>
    <topic ref="topicDOM"></topic>
    <answer :options="options" ref="answerDOM"></answer>
    <hint ref="hintDOM"></hint>
    <explanation ref="explanationDOM"></explanation>
  </div>
</template>

<script>
  import Topic from 'components/xiti_basic/topic/topic';
  import Answer from 'components/xiti_basic/answer/answer';
  import Hint from 'components/xiti_basic/hint/hint';
  import Explanation from 'components/xiti_basic/explanation/explanation';

  import {replaceSrc} from 'utils/utilities';

  export default {
    data(){
      return {
        options: [
          {
            icon: '是',
            text: '',
            id: 0
          },
          {
            icon: '否',
            text: '',
            id: 1
          }
        ],
        answer: '-1',
        isPass: false,
        questionData: {},
        localData: {}
      };
    },
    methods:{
      save(){
        console.log('radio');
        let _topic = this.$refs.topicDOM.topic;
        let _answer = this.$refs.answerDOM.answer;
        let _hint = this.$refs.hintDOM.hint;
        let _explanation = this.$refs.explanationDOM.explanation;
        let _url = this.$store.state.urlSnippet;

        this.questionData = {
          title: document.title,
          topic: replaceSrc(_topic, _url, true),
          answer: _answer,
          hint: replaceSrc(_hint, _url, true),
          explanation: replaceSrc(_explanation, _url, true),
          questionType: 'judge'
        };
        console.log('questionData:');
        console.log(this.questionData);
        this.localData = {
          title: document.title,
          topic: _topic,
          answer: _answer,
          hint: _hint,
          explanation: _explanation,
          questionType: 'judge'
        }
        console.log('localData:');
        console.log(this.localData)
      }
    },
    components: {
      Topic,
      Answer,
      Hint,
      Explanation
    }
  };
</script>

<style scoped lang="stylus">
</style>

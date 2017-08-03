<template>
  <div>
    <topic></topic>
    <answer></answer>
    <hint></hint>
    <explanation></explanation>
  </div>
</template>

<script>
  import Topic from 'components/xiti_basic/topic/topic';
  import Answer from 'components/xiti_basic/answer/answer';
  import Hint from 'components/xiti_basic/hint/hint';
  import Explanation from 'components/xiti_basic/explanation/explanation';

  export default {
    created(){
      this.$store.state['questionContent'] = {
        topic: '',
        options: [
          {icon: '是'},
          {icon: '否'}
        ],
        answer: '',
        hint: '',
        explanation: '',
      };
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

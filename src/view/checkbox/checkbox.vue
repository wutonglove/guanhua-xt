<template>
  <div>
    <topic></topic>
    <options></options>
    <answer inputType="checkbox"></answer>
    <hint></hint>
    <explanation></explanation>
  </div>
</template>

<script>
  import Topic from 'components/xiti_basic/topic/topic';
  import Options from 'components/xiti_basic/options/options';
  import Answer from 'components/xiti_basic/answer/answer';
  import Hint from 'components/xiti_basic/hint/hint';
  import Explanation from 'components/xiti_basic/explanation/explanation';

  export default {
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

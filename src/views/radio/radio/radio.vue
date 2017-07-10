<template>
  <div class="app">
    <p-header></p-header>
    <div class="content">
      <topic></topic>
      <options :data="options"></options>
      <answer :data="options"></answer>
      <hint></hint>
      <explanation></explanation>

    </div>
    <p-footer></p-footer>
  </div>
</template>

<script>
  import PHeader from 'components/xiti_basic/header/header';
  import Topic from 'components/xiti_basic/topic/topic';
  import Options from 'components/xiti_basic/options/options';
  import Answer from 'components/xiti_basic/answer/answer';
  import Hint from 'components/xiti_basic/hint/hint';
  import Explanation from 'components/xiti_basic/explanation/explanation';
  import PFooter from 'components/xiti_basic/footer/footer';

  export default {
    data() {
      return {
        options: [
          {
            icon: 'A',
            text: 'this is A'
          },
          {
            icon: 'B',
            text: 'this is B'
          }
        ]
      };
    },
    components: {
      PHeader,
      Topic,
      Options,
      Answer,
      Hint,
      Explanation,
      PFooter
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../assets/stylus/mixin.styl'

  .app
    width: 100%
    .content
      $fixedWidth()
</style>
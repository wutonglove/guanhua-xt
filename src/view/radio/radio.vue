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
    <insert-file-dialog></insert-file-dialog>
    <insert-formula-dialog></insert-formula-dialog>
    <unfold></unfold>
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
  import InsertFileDialog from 'components/insertFile/insertFile';
  import InsertFormulaDialog from 'components/xiti_basic/insertFormula/insertFormula';
  import Unfold from 'components/unfoldDialog/unfoldDialog';
  //  import Checkbox from 'iview/src/components/checkbox';

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
    mounted() {
    },
    methods: {
      cancelRange: function () {
        window.getSelection().removeAllRanges();
      }
    },
    components: {
      PHeader,
      Topic,
      Options,
      Answer,
      Hint,
      Explanation,
      PFooter,
      InsertFileDialog,
      InsertFormulaDialog,
      Unfold
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/mixin.styl'

  .app
    width: 100%
    .content
      $fixedWidth()
</style>

<template>
  <div class="app">
    <p-header></p-header>

    <div class="content">
      <slot></slot>
    </div>

    <p-footer></p-footer>
    <insert-file-dialog></insert-file-dialog>
    <insert-formula-dialog></insert-formula-dialog>
    <unfold></unfold>
  </div>
</template>

<script>
  import PHeader from 'components/xiti_basic/header/header';
  import PFooter from 'components/xiti_basic/footer/footer';

  import InsertFileDialog from 'components/insertFile/insertFile';
  import InsertFormulaDialog from 'components/xiti_basic/insertFormula/insertFormula';
  import Unfold from 'components/unfoldDialog/unfoldDialog';

  export default {
    mounted() {
      this.$store.dispatch('attachEventToFile');
    },
    components: {
      PHeader,
      PFooter,
      InsertFileDialog,
      InsertFormulaDialog,
      Unfold
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../common/stylus/mixin.styl'

  .app
    width: 100%
    .content
      $fixedWidth()
      position: relative
</style>

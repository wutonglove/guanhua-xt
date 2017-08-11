<template>
  <div class="app">
    <p-header></p-header>

    <div class="content_wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>

    <p-footer @on-save="save"></p-footer>
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
    methods:{
      save(){
        console.log('basic');
        this.$emit('on-save');
      }
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
    .content_wrapper
      position: absolute
      top: 91px
      bottom: 76px
      width: 100%
      overflow-x: auto
      padding-bottom:50px
      .content
        $fixedWidth()
        position: relative
</style>

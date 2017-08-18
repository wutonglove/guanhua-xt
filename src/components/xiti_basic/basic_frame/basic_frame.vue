<template>
  <div class="app">
    <p-header></p-header>

    <div class="content_wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>

    <p-footer @on-save="save" @on-preview="preview"></p-footer>
    <insert-file-dialog></insert-file-dialog>
    <insert-formula-dialog></insert-formula-dialog>
    <unfold></unfold>
    <pre-dia ></pre-dia>
    <up-progress></up-progress>
  </div>
</template>

<script>
  import PHeader from 'components/xiti_basic/header/header';
  import PFooter from 'components/xiti_basic/footer/footer';

  import InsertFileDialog from 'components/insertFile/insertFile';
  import InsertFormulaDialog from 'components/xiti_basic/insertFormula/insertFormula';
  import Unfold from 'components/unfoldDialog/unfoldDialog';
  import PreDia from 'components/pre_dia/pre_dia';
  import UpProgress from 'components/progress/progress';

  export default {
    mounted() {
      this.$store.dispatch('attachEventToFile');
    },
    methods: {
      save: function () {
        console.log('basic');
        this.$emit('on-save');
      },
      preview: function() {
        this.$emit('on-preview');
      }
    },
    components: {
      PHeader,
      PFooter,
      InsertFileDialog,
      InsertFormulaDialog,
      Unfold,
      PreDia,
      UpProgress
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
      padding-bottom: 50px
      .content
        $fixedWidth()
        position: relative
</style>

<template>
  <div class="app">
    <p-header></p-header>

    <div class="content_wrapper" @click="clearRange">
      <form>
        <div class="content">
          <router-view ref="questionDOM" @validate="validate"></router-view>
        </div>
      </form>
    </div>

    <p-footer @on-save="save" @on-preview="preview"></p-footer>
    <insert-file-dialog @on-insert="insert"></insert-file-dialog>
    <insert-formula-dialog></insert-formula-dialog>
  </div>
</template>

<script>
  import PHeader from 'components/general-part/header/header';
  import PFooter from 'components/general-part/footer/footer';

  import InsertFileDialog from 'base/insertFile/insertFile';
  import InsertFormulaDialog from 'components/general-part/insertFormula/insertFormula';
  import Modal from 'iview/src/components/modal';

  import {mapActions, mapMutations, mapGetters} from 'vuex';
  import $ from 'jquery';

  export default {
    computed: {
      ...mapGetters([
        'targetDom'
      ])
    },
    methods: {
      save() {
        this.$emit('save');
      },
      preview() {
        this.$emit('preview');
      },
      insert(file) {
        let html;
        html = this.createImgHtml(file);
        if (!html) return;
        this.resetSelection()
          .then(() => {
            if (this.targetDom) {
              this.targetDom.innerHTML = html;
              this.setTargetDom(null);
              return;
            }
            document.execCommand('insertHTML', false, `&zwnj;${html}&zwnj;`);
          });
      },
      createImgHtml(file) {
        let src = file.objURL;
        let type = file.type.split('/')[0];
        let name = file.name;
        let resource = file.resource;
        if (src) {
          return `<img src="${src}" data-name="${name}" data-type="${type}" data-src="${resource}" class="insertFile insertFile_hook"/>`;
        }
        return '';
      },
      getdata(url) {
        return this.$refs.questionDOM.getQuestionData(url);
      },
      clearRange(e) {
        let parents = $(e.target).parents();
        let curr = $(e.target);
        if (parents.hasClass('cl_rg_hook') || curr.hasClass('cl_rg_hook')) return;
        this.clearSelection();
      },
      ...mapActions({
        clearSelection: 'clearSelection',
        resetSelection: 'resetSelection',
        validate: 'validate'
      }),
      ...mapMutations({
        setTargetDom: 'SET_TARGETDOM'
      })
    },
    components: {
      PHeader,
      PFooter,
      InsertFileDialog,
      InsertFormulaDialog,
      Modal
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/mixin.styl'
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

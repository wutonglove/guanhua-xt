<template>
  <div class="app">
    <p-header></p-header>

    <div class="content_wrapper" @click="clearRange">
      <div class="content">
        <router-view ref="questionDOM"></router-view>
      </div>
    </div>

    <p-footer @on-save="showDia" @on-preview="preview"></p-footer>
    <insert-file-dialog></insert-file-dialog>
    <insert-formula-dialog></insert-formula-dialog>
    <unfold></unfold>
    <pre-dia :pageSrc="'./preview.html'" ref="previewDOM"></pre-dia>
    <up-progress @interrupt="interrupt"></up-progress>
  </div>
</template>

<script>
  import PHeader from 'components/general-part/header/header';
  import PFooter from 'components/general-part/footer/footer';

  import InsertFileDialog from 'base/insertFile/insertFile';
  import InsertFormulaDialog from 'components/general-part/insertFormula/insertFormula';
  import Unfold from 'base/unfoldDialog/unfoldDialog';
  import PreDia from 'base/pre-dialog/pre-dialog';
  import UpProgress from 'base/progress/progress';
  import Modal from 'iview/src/components/modal';

  import {mapActions} from 'vuex';
  import exercises from 'map/exercises.json';
  import {actionMixin} from 'common/js/mixin';
  import $ from 'jquery';

  export default {
    mixins: [actionMixin],
    created() {
      this.type = this.$route.path.trim().split('/')[2];
      exercises['基础题型'].forEach((item, index) => {
        if (item.type === this.type) {
          document.title = item.name;
          this.preTitle = item.name;
        }
      });
      if (this.type === 'composition') {
        document.title = '作文题';
        this.preTitle = '作文题';
      }
    },
    data() {
      return {
        preTitle: '',
        type: ''
      };
    },
    methods: {
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
        clearSelection: 'clearSelection'
      })
    },
    components: {
      PHeader,
      PFooter,
      InsertFileDialog,
      InsertFormulaDialog,
      Unfold,
      PreDia,
      UpProgress,
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

<template>
  <div class="app">
    <p-header></p-header>

    <div class="content_wrapper" @click="clearRange">
      <div class="content">
        <router-view ref="mainDOM"></router-view>
      </div>
    </div>

    <p-footer @on-save="showDia" @on-preview="preview"></p-footer>
    <insert-file-dialog></insert-file-dialog>
    <insert-formula-dialog></insert-formula-dialog>
    <unfold></unfold>
    <pre-dia :pageSrc="'./preview.html'"></pre-dia>
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

  import $ from 'expose-loader?$!jquery';
  import {mapMutations, mapActions} from 'vuex';
  import {createQuestionId} from 'utils/utilities';
  import {LOCALSTORAGEKEY} from 'common/js/config';
  import exercises from 'map/exercises.json';

  export default {
    created() {
      this.type = this.$route.path.trim().split('/')[2];
      exercises['基础题型'].forEach((item, index) => {
        if (item.type === this.type) {
          document.title = item.name;
          this.preTitle = item.name;
        }
      });
    },
    data() {
      return {
        preTitle: '',
        type: ''
      };
    },
    methods: {
      showDia() {
        Modal.confirm({
          title: '',
          content: '<p class="text">确认保存该试题么？</p>',
          onOk: () => {
            this.save();
          }
        });
      },
      save() {
        if (!this.questionId) {
          this.questionId = createQuestionId();
        }
        this.setProgressDia({isShow: true, progress: 0});
        this.upload(this.questionId)
          .then((urlSnippet) => {
            let data = this.$refs.mainDOM.getQuestionData(urlSnippet).questionData;
            console.log(data);
            this.saveToRemote({data, questionId: this.questionId})
              .then(this.setProgressDia({progress: 100}));
          })
          .catch((code) => {
            alert('错误编码：' + code);
          });
      },
      preview() {
        let data = this.$refs.mainDOM.getQuestionData().localData;
        console.log(data);
        localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(data));
        console.log(this.preTitle);
        this.setPreDialog({isShow: true, title: this.preTitle});
      },
      interrupt() {
        this.interruptSave();
        this.setProgressDia({isShow: false});
      },
      clearRange(e) {
        let parents = $(e.target).parents();
        let curr = $(e.target);
        if (parents.hasClass('div_input') || curr.hasClass('div_input')) return;
        this.clearSelection();
      },
      ...mapMutations({
        setCurrentRange: 'SET_CURRENTRANGE',
        setPreDialog: 'SET_PREDIALOG',
        setProgressDia: 'SET_PROGRESSDIA'
      }),
      ...mapActions({
        clearSelection: 'clearSelection',
        saveToRemote: 'saveToRemote',
        upload: 'uploadToRemote',
        interruptSave: 'interruptSave'
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

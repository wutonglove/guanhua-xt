<template>
  <div>
    <i-modal v-model="isShow"
             class="file_dialog_wrapper"
             width="880"
             @on-ok="onOk"
             ref="dialogDOM"
    >

      <div class="header" solt="header">{{title}}</div>
      <div class="content">

        <i-tabs value="0" ref="tabs" @on-click="clearSelectFile">
          <i-tab-pane :label="`本地${title.substr(2,2)}库`" name="0">
            <local @ok="ok" @unfold="unfold" ref="local"></local>
          </i-tab-pane>
          <i-tab-pane :label="`百度${title.substr(2,2)}库`" name="1"
                      v-if="dialogType==='image'">
            <outer @ok="ok" @unfold="unfold" ref="outer"></outer>
          </i-tab-pane>
        </i-tabs>
      </div>

      <div slot="footer"></div>
    </i-modal>
  </div>
</template>

<script>
  import Local from '../insertFile/local';
  import Outer from '../insertFile/outerNet';

  import IModal from 'iview/src/components/modal';
  import ITabs from 'iview/src/components/tabs';
  import ITabPane from 'iview/src/components/tabs/pane';

  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    data() {
      return {
        isShow: false
      };
    },
    computed: {
      title() {
        return this.fileDialogInfo.name;
      },
      dialogType() {
        return this.fileDialogInfo.type;
      },
      currIndex() {
        return this.$refs.tabs.activeKey;
      },
      ...mapGetters([
        'fileDialogInfo',
        'selectedFile',
        'targetDom'
      ])
    },
    methods: {
      ok: function () {
        this.$refs.dialogDOM.ok();
      },
      onOk: function () {
        let html;
        html = this.createImgHtml(this.selectedFile);
        if (!html) return;
        this.resetSelection().then(() => {
          if (this.targetDom) {
            this.targetDom.innerHTML = html;
            this.setTargetDom(null);
          }
          document.execCommand('insertHTML', false, `&zwnj;${html}&zwnj;`);
        });
      },
      unfold(file) {
        let isShow = true;
        let content = '';
//        console.log(file.type);
        switch (file.type.split('/')[0]) {
          case 'image':
            content = `<img src="${file.objURL}" class="unfold_file"/>`;
            break;
          case 'video':
            content = `<video src="${file.resource}" class="unfold_file" controls>您的浏览器不支持video</video>`;
            break;
          case 'audio':
            content = `<audio src="${file.resource}" class="unfold_file" controls>您的浏览器不支持audio</audio>`;
            break;
        }
        this.setUnfold({isShow, content});
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
      clearSelectFile() {
        this.$nextTick(() => {
          this.$refs.outer.clearSelectFile();
          this.$refs.local.clearSelectFile();
          this.setSelectFile(null);
        });
      },
      ...mapMutations({
        setFileDiaSta: 'SET_FILEDIALOGINFO',
        setUnfold: 'SET_UNFOLD',
        setTargetDom: 'SET_TARGETDOM',
        setSelectFile: 'SET_SELECTEDFILE'
      }),
      ...mapActions({
        resetSelection: 'resetSelection'
      })
    },
    watch: {
      fileDialogInfo: {
        deep: true,
        handler(newVal) {
          this.isShow = newVal.status;
        }
      },
      isShow(newVal) {
        this.setFileDiaSta({
          status: newVal
        });
      }
    },
    components: {
      Local,
      Outer,
      IModal,
      ITabs,
      ITabPane
    }
  };
</script>

<style lang="stylus">
  @import '../../common/stylus/variable.styl'
  .file_dialog_wrapper
    .ivu-modal-body
      padding: 0
      .header
        background-color: $background-blue-d
        border-top-left-radius: $file-bdrs
        border-top-right-radius: $file-bdrs
        line-height: 48px
        padding-left: 20px
        font-size: 18px
        font-weight: 700
        color: #efefef

      .content
        .ivu-tabs-bar
          margin-bottom: 0
          .ivu-tabs-nav-container
            line-height: 40px
            font-size: 18px

        .nav_tabs
          width: 100%
          background-color: #fff
          font-size: 0
          vertical-align: top
          .presentation
            display: inline-block
            padding: 0 5px
            margin: 10px 5px
            cursor: pointer
            &:first-child
              margin-left: 15px
            &:hover
              padding-bottom: 3
              border-bottom: 2px solid $bdcolor-file
              color: $bdcolor-file
            &.active
              font-weight: 700
              padding-bottom: 3
              border-bottom: 2px solid $bdcolor-file
              color: $bdcolor-file
</style>

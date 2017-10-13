<template>
  <div>
    <i-modal v-model="$store.state.fileDialog.isShow"
             class="file_dialog_wrapper"
             width="880"
             @on-ok="ok"
             ref="dialogDOM"
    >

      <div class="header" solt="header">插入{{title}}</div>
      <div class="content">

        <i-tabs value="0">
          <i-tab-pane :label="`本地${title}库`" name="0">
            <local @insert="insert"></local>
          </i-tab-pane>
          <i-tab-pane :label="`百度${title}库`" name="1" v-if="title==='图片'">
            <outer></outer>
          </i-tab-pane>
        </i-tabs>
      </div>

      <div slot="footer"></div>
    </i-modal>
  </div>
</template>

<script>
  import Local from 'components/insertFile/local';
  import Outer from 'components/insertFile/outerNet';

  import IModal from 'iview/src/components/modal';
  import ITabs from 'iview/src/components/tabs';
  import ITabPane from 'iview/src/components/tabs/pane';

  import $ from 'expose-loader?$!jquery';

  export default {
    computed: {
      title() {
        let title = '';
        switch (this.$store.state.fileDialog.type) {
          case 'image':
            title = '图片';
            break;
          case 'audio':
            title = '音频';
            break;
          case 'video':
            title = '视频';
            break;
        }
        return title;
      }
    },
    methods: {
      insert: function () {
        this.$refs.dialogDOM.ok();
      },
      ok: function () {
        let html;
        html = this.createImgHtml();

        if (this.$store.state.fileTarget) {
          $(this.$store.state.fileTarget).html(html).css('height', 'auto');

          this.$store.state.fileTarget = null;
          return;
        }
        console.log();
        this.$store.dispatch('restoreSelection');
        document.execCommand('insertHTML', false, `&nbsp;${html}&nbsp;`);
      },
      createImgHtml: function () {
        let file = this.$store.state.selectedFile;
        let src = file.src;
        let type = file.type.split('/')[0];
        let resource = file.resource;
        console.log(type);
        if (src) {
          let html = `<img src="${src}" data-name="${file.name}" data-type="${type}" data-src="${resource}" class="insertFile insertFile_hook"/>`;
          return html;
        }
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

<template>
  <div>
    <Modal v-model="$store.state.fileDialog.isShow"
           class="file_dialog_wrapper"
           width="880"
           @on-ok="ok"
           ref="dialogDOM"
    >

      <div class="header" solt="header">插入{{title}}</div>
      <div class="content">
        <!--<div class="nav_tabs" ref="navTab">-->
        <!--<router-link class="presentation" to="/resource/local" tag="li">本地{{title}}库</router-link>-->
        <!--<router-link class="presentation" to="/resource/outer" tag="li">百度{{title}}库</router-link>-->
        <!--</div>-->
        <!--<keep-alive>-->
        <!--<router-view class="dia_view"></router-view>-->
        <!--</keep-alive>-->

        <Tabs value="0">
          <Tab-pane :label="`本地${title}库`" name="0">
            <local @insert="insert"></local>
          </Tab-pane>
          <Tab-pane :label="`百度${title}库`" name="1">
            <outer></outer>
          </Tab-pane>
        </Tabs>
      </div>

      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  import Local from 'components/insertFile/local';
  import Outer from 'components/insertFile/outerNet';
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
        console.log(type);
        if (src) {
          let html = `<img src="${src}" data-name="${file.name}" data-type="${type}" class="insertFile insertFile_hook"/>`;
          return html;
        }
      },
      createVideoHtml: function () {
        let file = this.$store.state.selectedFile;
        let src = file.src;
        if (src) {
          let html =
            `<video src="${src}" class="insertVideo insertFile_hook" controls="controls">
                您的浏览器不支持video
              </video>`;
          return html;
        }
      },
      createAudioHtml: function () {
        let file = this.$store.state.selectedFile;
        let src = file.src;
        if (src) {
          let html =
            `<audio src="${src}" class="insertAudio insertFile_hook" controls="controls">
                您的浏览器不支持audio
              </audio>`;
          return html;
        }
      }
    },
    components: {
      Local,
      Outer
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

<template>
  <div class="dialog-">
    <Modal v-model="$store.state.fileDialog.isShow"
           class="dialog_wrapper"
           class-name="vertical-center-modal"
           width="880"
           @on-ok="ok"
    >

      <div class="header" solt="header">插入{{title}}</div>
      <div class="content">
        <div class="nav_tabs" ref="navTab">
          <router-link class="presentation" to="/resource/local" tag="li">本地{{title}}库</router-link>
          <router-link class="presentation" to="/resource/outer" tag="li">百度{{title}}库</router-link>
        </div>
        <keep-alive>
          <router-view class="dia_view"></router-view>
        </keep-alive>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  import Checkbox from 'iview/src/components/checkbox';
  import Local from './local';
  import {hasClass} from 'utils/dom.js';

  export default {
    computed: {
      title() {
        let title = '';
        switch (this.$store.state.fileDialog.type) {
          case 'image':
            title = '图片'
            break;
          case 'audio':
            title = '音频'
            break;
          case 'video':
            title = '视频'
            break;
        }
        return title
      }
    },
    methods: {
      ok() {
        this.$store.dispatch('restoreSelection');
        let html;

        switch (this.$store.state.fileDialog.type) {
          case 'image':
            html = this.createImgHtml();
            break;
          case 'video':
            html = this.createVideoHtml();
            break;
          case 'audio':
            html = this.createAudioHtml();
            break;
        }

        console.log(html);
        document.execCommand('insertHTML', false, html);
      },
      createImgHtml() {
        let file = this.$store.state.selectedFile;
        let src = file.src;
        if (src) {
          let html = `<img src="${src}" class="insertImg insertFile_hook"/>`;
          return html;
        }
      },
      createVideoHtml() {
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
      createAudioHtml() {
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
    comonents: {
      Local
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/variable.styl'
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
    .nav_tabs
      height: 60px
      line-height: 40px
      width: 100%
      background-color: #fff
      font-size: 0
      vertical-align: top
      .presentation
        display: inline-block
        font-size: 18px
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

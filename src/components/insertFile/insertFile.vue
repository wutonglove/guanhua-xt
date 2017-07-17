<template>
  <div class="file_dialog_wrapper">
    <p-dialog v-show="dialogStatus">
      <div class="header">
        <h2 class="title">插入{{title}}</h2>
        <span class="icon-close"></span>
      </div>
      <div class="content">

      </div>
    </p-dialog>
  </div>
</template>

<script>
  import PDialog from 'components/dialog/dialog';

  export default {
    props: {
      fileType: {
        type: String,
        default: 'img'
      }
    },
    computed: {
      dialogStatus() {
        return this.$store.state.fileDialog
      },
      title() {
        switch (this.fileType) {
          case 'img':
            return '图片';
          case 'audio':
            return '音频';
          case 'video':
            return '视频';
        }
      }
    },
    components: {
      PDialog
    }
  };
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
  .header
    height: 56px
    width: 100%
    background: linear-gradient(to bottom,$bgc-gradient-blue1,$bgc-gradient-blue2)
    color:#fff
    position: relative
    .title
      padding-left: 20px
      line-height: 56px
    .icon-close
      position: absolute
      top:6px
      right: 0
      font-size: 40px
      border-left: 1px solid #fff
      padding:2px 10px;
      cursor: pointer
</style>

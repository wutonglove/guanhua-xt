<template>
  <div class="file_dialog_wrapper">
    <p-dialog v-show="">
      <div class="header">
        <h2 class="title">插入{{title}}</h2>
        <span class="icon-close" @click="$store.state.fileDialog=false"></span>
      </div>
      <div class="content">
        <div class="nav_tabs">
          <router-link class="presentation" to="/resource/local" tag="li">本地{{title}}库</router-link>
          <router-link class="presentation" to="/resource/outer" tag="li">百度{{title}}库</router-link>
        </div>
         <router-view class="dia_view"></router-view>
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

  .file_dialog_wrapper
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
    .content
      position: relative
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
          padding:0 5px
          margin:10px 5px
          cursor:pointer
          &:first-child
            margin-left: 15px
          &:hover
            padding-bottom:3
            border-bottom: 2px solid $bdcolor-file
            color: $bdcolor-file
          &.active
            font-weight: 700
            padding-bottom:3
            border-bottom: 2px solid $bdcolor-file
            color: $bdcolor-file

</style>

<template>
  <div class="dialog_pre" v-if="$store.state.preDialog.isShow">
    <i-modal v-model="$store.state.preDialog.isShow"
           class="dialog_wrapper"
           class-name="vertical-center-modal"
           width="880"
    >

      <div class="header" slot="header">{{$store.state.preDialog.title}}</div>
      <div class="content">
        <iframe name="previewDialog" src="/basic_preview.html" frameborder="0" ref="previewDialog"></iframe>
      </div>
      <div slot="footer"></div>
    </i-modal>
  </div>
</template>

<script>
  import IModal from 'iview/src/components/modal';

  export default {
    mounted() {
      console.log(this.$store.state.preDialog);
    },
    methods: {
      ok() {
        let body = this.$refs.formulaDialog.contentWindow;

        let editor = body.KFEditor;
        editor.execCommand('get.image.data', function (data) {
          console.log(data);
          let html = `<img class="formula" src="${data.img}"/>`;
          document.execCommand('insertHTML', false, html);
        });
      }
    },
    components: {
      IModal
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
    iframe
      width: 100%
      height: 505px
      margin-top: 10px
</style>

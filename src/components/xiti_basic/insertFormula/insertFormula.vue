<template>
  <div class="dialog_formula">
    <Modal v-model="$store.state.formulaDialog"
           class="dialog_wrapper"
           class-name="vertical-center-modal"
           width="880"
           @on-ok="ok"
    >

      <div class="header" solt="header">插入公式</div>
      <div class="content">
        <!-- 插件源码  http://gongshi.baidu.com/ed.html -->
        <iframe name="formulaDialog" src="/plugs/formula-plug/index.html" frameborder="0" ref="formulaDialog"></iframe>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Checkbox from 'iview/src/components/checkbox';

  export default {
    mounted() {
//      window.downloadReady = (editor,jQuery) => {
//
//        jQuery("#downloadBtn").click(function () {
//
//          editor.execCommand("get.image.data", function (data) {
//
//            if (jQuery("#iframe-download").length === 0) {
//              jQuery('<iframe id="iframe-download" name="iframe-download" style="display:none;"></iframe>' +
//                '<form target="iframe-download" id="form-download" action="download-base64.php" method="post" style="display:none;">' +
//                '<input name="base64" id="base64" value="" />' +
//                '<input name="mimetype" value="image/png" />' +
//                '<input name="filename" value="latexEditor.png" /></form>').appendTo(document.body);
//            }
//
//            jQuery("#base64").val(data.img);
//            jQuery('#form-download').submit();
//
//          });
//
//        });

//      }
    },
    methods: {
      ok() {
        let body = this.$refs.formulaDialog.contentWindow;
        console.log(body);
        let editor = body.KFEditor;
        editor.execCommand("get.image.data", function (data) {
          console.log(data);
        });
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../common/stylus/variable.styl'

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

<template>
  <div class="dialog_pre" v-if="isShow">
    <i-modal v-model="isShow"
             class="dialog_wrapper"
             class-name="vertical-center-modal"
             width="880"
    >
      <div class="header" slot="header">{{title}}</div>
      <div class="content" id="preview_content">
        <iframe name="previewDialog" :src="pageSrc" frameborder="0" ref="previewDialog"></iframe>
      </div>
      <div slot="footer"></div>
    </i-modal>
  </div>
</template>

<script>
  import IModal from 'iview/src/components/modal';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    props: {
      pageSrc: {
        type: String
      }
    },
    data() {
      return {
        isShow: null
      };
    },
    computed: {
      status() {
        return this.preDialog.isShow;
      },
      title() {
        return this.preDialog.title;
      },
      ...mapGetters([
        'preDialog'
      ])
    },
    methods: {
      ok() {
        let body = this.$refs.formulaDialog.contentWindow;

        let editor = body.KFEditor;
        editor.execCommand('get.image.data', function (data) {
          let html = `<img class="formula" src="${data.img}"/>`;
          document.execCommand('insertHTML', false, html);
        });
      },
      ...mapMutations({
        setPreDialog: 'SET_PREDIALOG'
      })
    },
    watch: {
      isShow(newVal) {
        if (newVal !== this.preDialog.isShow) this.setPreDialog(newVal);
      },
      status: {
        deep: true,
        handler(newVal) {
          if (newVal !== this.isShow) this.isShow = newVal;
        }
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

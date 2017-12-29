<template>
  <div class="dialog_formula">
    <i-modal v-model="isShow"
             class="dialog_wrapper"
             class-name="vertical-center-modal"
             width="880"
             @on-ok="ok"
    >

      <div class="header" slot="header">插入公式</div>
      <div class="content">
        <!-- 插件源码  http://gongshi.baidu.com/ed.html -->
        <iframe name="formulaDialog" src="/static/plugs/formula-plug/ed.html" frameborder="0"
                ref="formulaDialog"></iframe>
      </div>
    </i-modal>
  </div>
</template>

<script>
  import IModal from 'iview/src/components/modal';
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    data() {
      return {
        isShow: null
      };
    },
    computed: {
      status() {
        return this.formulaDialog;
      },
      ...mapGetters([
        'currentRange',
        'formulaDialog'
      ])
    },
    methods: {
      ok() {
        this.resetSelection();
        if (!this.currentRange) return;

        let body = this.$refs.formulaDialog.contentWindow;
        let editor = body.KFEditor;
        editor.execCommand('get.image.data', function (data) {
//          console.log(data);
          let html = `<img class="formula" src="${data.img}"/>`;
          document.execCommand('insertHTML', false, html);
        });
      },
      ...mapMutations({
        setFormula: 'SET_FORMULADIALOG'
      }),
      ...mapActions({
        resetSelection: 'resetSelection'
      })
    },
    watch: {
      status(newVal) {
        if (newVal !== this.isShow) this.isShow = newVal;
      },
      isShow(newVal) {
        if (newVal !== this.status) this.setFormula(newVal);
      }
    },
    components: {
      IModal
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

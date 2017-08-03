<template>
  <div>
    <Button
      class="btn_insertBlank"
      type="primary"
      shape="circle"
      @click="addBlank"
    >
      插入填空横线
    </Button>
    <topic @key-delete="backspace"></topic>
    <options :hasAdd="false" v-if="$store.state.questionContent.options.length>0" ref="options"></options>
    <div class="init_answer" v-else>
      <div class="name">
        <span class="text">答案</span>
        <div class="sign">*</div>
      </div>
      <div class="desc">请在题干中插入填空横线</div>
    </div>
    <hint></hint>
    <explanation></explanation>
  </div>
</template>

<script>
  import Topic from 'components/xiti_basic/topic/topic';
  import Options from 'components/xiti_basic/options/options';
  import Hint from 'components/xiti_basic/hint/hint';
  import Explanation from 'components/xiti_basic/explanation/explanation';
  // ui 组件
  import Checkbox from 'iview/src/components/checkbox';
  // 三方 功能 组件
  import domtoimage from 'dom-to-image';

  export default {
    data(){
      return {
        blanks: []
      };
    },
    mounted() {
    },
    methods: {
      addBlank: function () {
        let parent = this.getRangeParent();
        let duty = parent.data('duty');
        if (duty === 'topic') {
          let index = this.getInsertIndex();
          this.$store.state.questionContent.options.splice(index, 0, {
            icon: 1,
            text: ''
          });
          this.$store.commit('updateOptionIcon');
          // 创建空格图片 并插入div_input中
          this.createBlank();
        }

        this.$store.dispatch('restoreSelection');
      },
      backspace(){
        let blankDOM = $('img.blankDOM_hook');
        if (this.$store.state.questionContent.options.length > blankDOM.length) {
          let index = this.getInsertIndex();
          this.$refs.options.removeOption(index);
        }
        this.upBlankCode();
      },
      // 更新div_input中的空格的排序
      upBlankCode: function () {
        $('.div_input .blankDOM_hook').each((index, item) => {
          item.src = this.blanks[index];
          $(item).attr('data-code', index);
        })
      },
      getInsertIndex: function () {
        this.$store.dispatch('saveSelection');
        let current = this.$store.state.currentRangeParent;
        return $(current).prev('img.blankDOM_hook').attr('data-code') * 1 + 1 || 0;
      },
      createBlank: function () {
        let code = this.$store.state.questionContent.options[this.$store.state.questionContent.options.length - 1].icon;

        // 判断该编号的空格图片 有没有创建过
        if (this.blanks[code - 1]) {
          this.insertBlank()
          return;
        }

        let html = `<span class="blankDOM_hook" style="display:inline-block;width: 60px;border-bottom:1px solid #222;text-align: center;"><span style="display:inline-block;width:25px;height:25px;line-height: 25px;border-radius:50%;text-align:center;background-color: #888;color:#fff;font-size: 16px;">${code}</span></span>`
        $('body').append(html);

        domtoimage.toPng($('span.blankDOM_hook')[0], {quality: 0.95})
          .then((dataUrl) => {
            this.blanks[code - 1] = dataUrl;
            $('span.blankDOM_hook').remove();
            this.insertBlank();
          });
      },
      getRangeParent(){
        this.$store.dispatch('saveSelection');
        let parent = this.$store.state.currentRangeParent;
        return $(parent).hasClass('div_input') ? $(parent) : $(parent).parents('.div_input');
      },
      insertBlank() {
        let html = `&nbsp;&nbsp;<img class="blankDOM_hook" data-code="0" style="margin:0 -1px;vertical-align:bottom;"/>&nbsp;&nbsp;`
        document.execCommand('insertHTML', false, html);
        this.upBlankCode();
        setTimeout(()=>{
          this.$refs.options.refreshOption();
        },20);
      }
    },
    components: {
      Topic,
      Options,
      Hint,
      Explanation
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/mixin.styl'
  @import '../../common/stylus/variable.styl'

  .btn_insertBlank
    font-size: 16px
    position: absolute
    right: 0
    top: 110px

  .init_answer
    width: 100%
    .name
      margin-top: 10px
      line-height: 38px
      height: 38px
      font-size: 18px
      .sign
        display: inline-block
        vertical-align: top
        color: red
    .desc
      color: $font-color-grey
</style>


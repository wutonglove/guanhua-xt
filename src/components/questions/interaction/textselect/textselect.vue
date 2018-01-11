<template>
  <mboard :mboard="mboard">
    <div class="textselect" id="textselect" ref="wrap">
      <div
        contenteditable
        spellcheck="false"
        class="textarea" name="" id=""
        @focus="focus"
        @blur="blur"
        @mouseup="mouseUp"
        @mousedown="hideAddBtn"
        @input="input"
        ref="textarea"
      >
      </div>
      <span class="text_desc">{{len}} / 800</span>
      <div class="add_option" ref="floatBtn" v-show="addBtnShow">
        <span class="tr_text" @click="addOption('cor')">正确选项</span>
        <span class="err_text" @click="addOption('err')">干扰项</span>
      </div>
    </div>

  </mboard>
</template>

<script>
  import {tem1ComMixin} from 'common/js/mixin';
  import IIcon from 'iview/src/components/icon';
  import Notice from 'iview/src/components/notice';

  import {mapActions} from 'vuex';
  import $ from 'jquery';

  export default {
    mixins: [tem1ComMixin],
    data() {
      return {
        placeholder: '请输入800字符以内的文本...',
        addBtnShow: false,
        curSelectText: '',
        curSpan: null,
        len: 0
      };
    },
    mounted() {
      let _self = this;
      this.$refs.textarea.innerHTML = this.placeholder;
      this.offsetX = $(this.$refs.wrap).offset().left;
      this.offsetY = $(this.$refs.wrap).offset().top;
      // 绑定删除选项事件
      $(document)
        .on('click', '.textarea .ts_tag .ts_del', this.delOption)
        .on('click', '.textarea .ts_tag', function (e) {
          _self.curSpan = this;
          _self.curSelectText = $(this).children('em').text().trim();
          let x = $(this).offset().left + $(this).width() + 10;
          let y = $(this).offset().top - 8;
          _self.showAddBtn(x, y);
        });
    },
    methods: {
      input() {
        this.clacArticleLen();
      },
      focus() {
        let text = this.$refs.textarea.innerText.trim();
        if (text === this.placeholder) {
          this.$refs.textarea.innerHTML = '';
        }
      },
      blur() {
        let text = this.$refs.textarea.innerText.trim();
        if (text === '') {
          this.$refs.textarea.innerHTML = this.placeholder;
        }
      },
      mouseUp(e) {
        if ($(e.target).hasClass('ts_tag') || $(e.target).parents('.ts_tag').hasClass('ts_tag')) return;
        setTimeout(() => {
          let selection = document.getSelection();
          let text = selection.toString();
          if (text !== '') {
            this.curSelectText = selection.toString();
            this.showAddBtn(e.x, e.y);
          } else {
            this.hideAddBtn();
          }
        }, 20);
      },
      showAddBtn(x, y) {
        $(this.$refs.floatBtn).css({
          left: x - this.offsetX,
          top: y - this.offsetY - 30 // btn 高25
        });
        this.addBtnShow = true;
      },
      hideAddBtn() {
        this.addBtnShow = false;
      },
      addOption(type) {
        // 添加
        if (this.curSelectText) {
          let html = this.createHtml(type);
          document.execCommand('InsertHTML', false, html);
          this.clearRange();
          this.curSelectText = '';
        }
        // 替换
        if (this.curSpan) {
          this.curSelectText = $(this.curSpan).children('em').text().trim();
          let html = this.createHtml(type);
          $(this.curSpan).replaceWith(html);
          this.curSpan = null;
          this.curSelectText = '';
        }
        this.hideAddBtn();
      },
      createHtml(type) {
        let clsName = '';
        if (type === 'cor') {
          clsName = 'ts_cor';
        } else if (type === 'err') {
          clsName = 'ts_err';
        }
        return `<span class=" ts_tag ${clsName}" contenteditable="false"><em>${this.curSelectText}</em><span class="ts_del">x</span></span>`;
      },
      delOption(e) {
        let $span = $(e.target).parents('.ts_tag');
        if ($span[0]) {
          let text = $span.children('em').text();
          $span.replaceWith(text);
        }
      },
      clacAnswer() {
        let answers = [];
        $(this.$refs.textarea).find('.ts_tag').each((index, item) => {
          if ($(item).hasClass('ts_cor')) {
            answers.push(1);
          } else if ($(item).hasClass('ts_err')) {
            answers.push(0);
          }
        });
        return answers;
      },
      getArticle() {
        let $textarea = $(this.$refs.textarea).clone();
        $textarea.find('.ts_tag').each((index, item) => {
          let text = $(item).children('em').text().trim();
          $(item).replaceWith(`<textselect>${text}</textselect>`);
        });
        return $textarea.html().trim();
      },
      clacArticleLen() {
        this.len = this.getArticle().length;
      },
      getQuestionData(urlSnippet) {
        let article = this.getArticle();
        let answers = this.clacAnswer();

        let questionData = {
          title: document.title,
          article,
          answers,
          questionType: 'textselect'
        };
        let localData = questionData;
        return {
          questionData,
          localData
        };
      },
      verifyHandle() {
        let $tsTag = $(this.$refs.textarea).find('.ts_tag');

        if ($tsTag.length < 1) return -1;
        if ($tsTag.length < 2) return -2;
        return 1;
      },
      showMessage() {
        let res = this.verifyHandle();
        let desc = '';
        if (res === 1) {
          return 1;
        } else if (res === -1) {
          desc = '请设置答案';
        } else if (res === -2) {
          desc = '请设置至少两个选项';
        }
        Notice.destroy();
        Notice.warning({
          desc
        });
        return 0;
      },
      ...mapActions({
        clearRange: 'clearSelection'
      })
    },
    components: {
      IIcon
    }
  };
</script>

<style lang="stylus">
  #textselect
    width: 100%
    height: 100%
    padding: 30px 20px 0
    display: flex
    flex-direction: column
    color: #5D391E
    position: relative
    .textarea
      flex: 1
      width: 100%
      border: none
      outline: none
      background-color: rgba(255, 255, 255, .2)
      padding: 35px 20px 10px
      border-radius: 8px
      line-height: 30px
      resize: none
      color: #5D391E
      font-size: 18px
      span.ts_tag
        display: inline-block
        color: #fff
        padding-right: 5px
        position: relative
        text-align: center
        margin: 0 10px 0 3px
        .ts_del
          position: absolute
          top: -8px
          right: -8px
          color: #EF4C4C
          background-color: #fff
          width: 16px
          height: 16px
          line-height: 13px
          font-size: 13px
          border-radius: 50%
        &:before
          content: 'x'
          display: inline-block
          height: 32px
          line-height: 32px
          width: 30px
          margin-right: 5px
        &.ts_err
          background-color: #F25657
        &:before
          background-color: #E04F4F
        &.ts_cor
          background-color: #6FD071
          &:before
            content: '√'
            background-color: #6AC26C
    .text_desc
      flex: 0 0 40px
      font-size: 18px
      text-align: right
      line-height: 40px
    .add_option
      position: absolute
      text-align: center
      color: #fff
      font-size: 14px
      border-radius: 4px
      cursor: pointer
      z-index: 11
      border-radius: 4px
      overflow: hidden
      .tr_text, .err_text
        float: left
        padding: 8px 10px
        &.tr_text
          background-color: #6FD071
        &.err_text
          background-color: #F25657
</style>

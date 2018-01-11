<template>
  <mboard :mboard="mboard">
    <div class="blankcloze" ref="wrap">
      <notepad class="article_wrap">
        <div class="textarea_wrap">
          <div class="textarea"
               contenteditable
               @mouseup="mouseUp"
               @mousedown="hideAddBtn"
               ref="textarea"></div>
        </div>
      </notepad>
      <div class="options_wrap">
        <div class="header">
          <span class="text"><strong>填空题</strong>(请从左侧的文章中选取)</span>
          <span class="option_lh" v-show="lhShow">{{curOptionLn}}/20</span>
        </div>
        <tem1-btn class="add_distractions_btn" icon="plus-round" @click="addDistraction">添加干扰项</tem1-btn>
        <div class="options_content">
          <div class="option_box" v-for="(option,index) in options">
            <span class="option_item" v-show="option!==''">
              <span class="text">{{option}}</span>
              <i-icon class="icon" type="close-round" @click.native="delOption(index)"></i-icon>
            </span>
            <span class="option_item" v-show="option===''">
              <span class="edit"
                    contenteditable
                    @blur="optionEdit($event,index)"
                    @focus="editFocus"
                    @compositionstart="editInputStart"
                    @compositionend="editInputEnd"
                    @input="editInput"
                    ref="editInput"
              ></span>
              <i-icon class="icon" type="close-round" @click.native="delOption(index)"></i-icon>
            </span>
          </div>
        </div>
      </div>
      <div class="add_option" ref="floatBtn" v-show="addBtnShow" @click="addOption">
        <i-icon type="plus"></i-icon>
        <span class="text">添加选项</span>
      </div>
    </div>
  </mboard>
</template>

<script>
  import Mboard from 'components/template1-part/mboard/mboard';
  import Notepad from 'components/template1-part/notepad/notepad';
  import Tem1Btn from 'components/template1-part/template1-btn/template1-btn';

  import IIcon from 'iview/src/components/icon';

  import {mapActions} from 'vuex';
  import Notice from 'iview/src/components/notice';
  import $ from 'jquery';

  export default {
    props: {
      mboard: {
        type: Object
      }
    },
    data() {
      return {
        options: [],
        corrects: [],
        curSelect: '',
        curOptionLn: 0,
        lhShow: false,
        inputState: true,
        addBtnShow: false
      };
    },
    mounted() {
      this.offsetX = $(this.$refs.wrap).offset().left;
      this.offsetY = $(this.$refs.wrap).offset().top;
    },
    methods: {
      mouseUp(e) {
        setTimeout(() => {
          let selection = document.getSelection();
          let text = selection.toString();
          if (text !== '') {
            this.curSelectText = selection;
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
      addOption() {
        let text = this.curSelectText.toString();
        if (text) {
          this.options.push(text);
          this.corrects.push(text);
          document.execCommand('InsertHTML', false, `<blank contenteditable="false">${text}</blank>`);
          this.clearRange();
        }
        this.hideAddBtn();
      },
      addDistraction() {
        this.options.push('');
        let index = this.options.length - 1;
        this.$nextTick(() => {
          this.$refs.editInput[index].focus();
        });
      },
      optionEdit(e, index) {
        this.lhShow = false; // 隐藏 长度 检测
        let value = e.target.innerText.trim();
        if (value) {
          if (this.corrects.indexOf(value) !== -1) {
            Notice.destroy();
            Notice.error({
              desc: '干扰选项不能与正确选项相同'
            });
            this.options.splice(index, 1);
          } else {
            this.options[index] = value;
          }
        } else {
          this.options.splice(index, 1);
        }
      },
      delOption(index) {
        this.options.splice(index, 1);
      },
      editFocus() {
        this.lhShow = true;
      },
      editInputStart() {
        this.inputState = false;
      },
      editInput(e) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          if (this.inputState) {
            this.curOptionLn = e.target.innerHTML.trim().length;
          }
        }, 20);
      },
      editInputEnd() {
        this.inputState = true;
      },
      getQuestionData(urlSnippet) {
        let article = this.$refs.textarea.innerHTML.trim();
        let answers = [];
        $(this.$refs.textarea).find('blank').each((index, item) => {
          answers.push(item.innerHTML.trim());
        });

        let questionData = {
          title: document.title,
          article,
          answers,
          options: this.options,
          questionType: 'blank-cloze'
        };
        let localData = questionData;
        return {
          questionData,
          localData
        };
      },
      verifyHandle() {
        if (this.$refs.textarea.innerHTML.trim() === '') return -1;
        if (this.options.length < 1) return -2;
        return 1;
      },
      showMessage() {
        let res = this.verifyHandle();
        let desc = '';
        if (res === 1) {
          return 1;
        } else if (res === -1) {
          desc = '请设置题干';
        } else if (res === -2) {
          desc = '请设置至少一个选项';
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
      Mboard,
      Notepad,
      Tem1Btn,
      IIcon
    }
  };
</script>

<style scoped lang="stylus">
  .blankcloze
    width: 100%
    height: 100%
    display: flex
    position: relative
    z-index: 1
    .article_wrap
      flex: 1
      margin: 10px
      &:after, &:before
        content: ''
        display: block
        position: absolute
        bottom: 14px
        right: 14px
        border-color: #A5A5A5
        border-width: 1px
        border-style: solid
        width: 20px
        height: 20px
        border-top-width: 0
        border-left-width: 0
        z-index: 1
      &:before
        left: 14px
        border-left-width: 1px
        border-top-width: 0
        border-right-width: 0
      .textarea_wrap
        width: 100%
        height: 100%
        padding: 15px
        position: relative
        &:after, &:before
          content: ''
          display: block
          position: absolute
          top: 14px
          right: 14px
          border-color: #A5A5A5
          border-width: 1px
          border-style: solid
          width: 20px
          height: 20px
          border-bottom-width: 0
          border-left-width: 0
        &:before
          left: 14px
          border-left-width: 1px
          border-bottom-width: 0
          border-right-width: 0
        .textarea
          width: 100%
          height: 100%
          border: 1px solid #E3E3E5
          background-color: rgba(214, 214, 214, .3)
          outline: none
          padding: 10px
          font-size: 13px
          line-height: 20px
          overflow-y: auto
    .options_wrap
      flex: 1
      margin-left: 10px
      display: flex
      flex-direction: column
      .header
        margin-top: 20px
        flex: 0 0 25px
        height: 25px
        line-height: 25px
        color: #333
        font-size: 14px
        .text
          strong
            font-weight: 800
        .option_lh
          font-weight: 800
      .add_distractions_btn
        position: absolute
        right: 15px
        top: 15px
      .options_content
        flex: 1
        padding: 10px
        overflow-y: auto
        .option_box
          display: inline-block
          padding: 3px
          background-color: #F3DCBA
          border-radius: 5px
          margin: 5px 10px
          position: relative
          .option_item
            display: inline-block
            padding: 4px 8px
            border: 1px solid #8F6831
            border-radius: 5px
            .edit
              display: inline-block
              border: none
              background: none
              outline: none
              min-width: 30px
              height: 16px
              text-align: center
            .icon
              display: none
              position: absolute
              top: -8px
              right: -8px
              width: 18px
              height: 18px
              line-height: 18px
              text-align: center
              font-size: 12px
              background-color: #FFFEFD
              border: 1px solid #D7B580
              color: #EE4D5F
              border-radius: 50%
              cursor: pointer
          &:hover
            .icon
              display: block
    .add_option
      position: absolute
      width: 76px
      height: 25px
      line-height: 25px
      text-align: center
      color: #fff
      font-size: 12px
      background-color: rgba(0, 0, 0, .6);
      border-radius: 4px
      cursor: pointer
      z-index: 11
</style>

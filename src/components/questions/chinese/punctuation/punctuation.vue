<template>
  <mboard :mboard="mboard">
    <div class="punctuation_wrapper">
      <div class="article_wrapper">
        <div class="textarea_wrap" ref="textareaWrap">
          <div class="textarea"
               contenteditable="true"
               spellcheck="false"
               @keydown="keyInput"
               @keydown.enter="ketEnter"
               ref="textarea"
          ></div>
          <div class="add_btn"
               :style="`top:${addBtn.y}px;left:${addBtn.x}px`"
               @mouseover="btnOver"
               @mouseout="btnOut"
               @click="addOption(addBtn.domObj)"
               v-show="addBtn.show"
          >设置选项
          </div>
          <div class="del_btn"
               :style="`top:${delBtn.y}px;left:${delBtn.x}px`"
               @mouseover="btnOver"
               @mouseout="btnOut"
               @click="delOption(delBtn.domObj)"
               v-show="delBtn.show"
          >删除选项
          </div>
        </div>
        <div class="control">
          <div class="btn_wrapper">
            <tem1-btn class="control_btn"
                      :disable="allBtnState"
                      @click="setAll"
            >
              一键设为选项
            </tem1-btn>

            <tem1-btn class="control_btn"
                      :disable="resBtnState"
                      @click="restoreAll"
            >
              一键还原
            </tem1-btn>
          </div>
          <div class="size_wrapper">{{}}/200</div>
        </div>
      </div>
      <div class="options_wrapper">
        <div class="text">标点选项</div>
        <div class="options">
          <div class="ctrl_btn" @click="listToLf">
            <i-icon type="chevron-left"></i-icon>
          </div>
          <div class="options_box" ref="optionsWrap">
            <ul class="options_box_wrap" ref="optionsList">
              <li class="pun_btn" v-for="symbol in options" v-html="symbol"></li>
            </ul>
          </div>
          <div class="ctrl_btn" @click="listToRt">
            <i-icon type="chevron-right"></i-icon>
          </div>
        </div>
        <div class="btn_wrapper">
          <i-poptip placement="top-end" :width="popWidth" ref="punPanel" v-show="options.length>0">
            <tem1-btn class="add_disturbance_btn" icon="plus">
              添加干扰项
            </tem1-btn>
            <div class="punctuation_list" slot="content">
              <ul class="pun_btn_list">
                <li class="pun_btn" :class="{active: pun.active}"
                    v-for="pun in punBtnList"
                    @click="addDistractors(pun)"
                >
                  {{pun.text}}
                </li>
              </ul>
              <div class="close_wrap">
                <tem1-btn class="close_btn" @click="closePunPanel">关闭</tem1-btn>
              </div>
            </div>
          </i-poptip>
        </div>
      </div>
    </div>
  </mboard>
</template>

<script>
  import Mboard from 'components/template1-part/mboard/mboard';
  import IIcon from 'iview/src/components/icon';
  import IPoptip from 'iview/src/components/poptip';
  import Notice from 'iview/src/components/notice';
  import Tem1Btn from 'components/template1-part/template1-btn/template1-btn';

  import textBG from './iocn_pun_bg.png';
  import $ from 'jquery';

  const PUNLIST_CN = ['，', '。', '、', '？', '！', '：', '；', '…', '……', '·', '-', '——', '“', '”', '‘', '’', '《', '》', '<', '>', '（', '）', '【', '】', '[', ']'];
  const PUNLIST_EN = [',', '.', '、', '?', '!', ':', ';', '…', '……', '`', '-', '_', '"', '"', '\'', '\'', '《', '》', '<', '>', '(', ')', '【', '】', '[', ']'];
  const PUNLIST_NAME = [
    {code: 'Comma'},
    {code: 'Period'},
    {code: 'Backslash'},
    {code: 'Slash', shiftKey: true},
    {code: 'Digit1', shiftKey: true},
    {code: 'Semicolon', shiftKey: true},
    {code: 'Semicolon'},
    {code: 'Digit6', shiftKey: true},
    {code: 'Digit6', shiftKey: true},
    {code: 'Backquote'},
    {code: 'Minus'},
    {code: 'Minus', shiftKey: true},
    {code: 'Quote', shiftKey: true},
    {code: 'Quote', shiftKey: true},
    {code: 'Quote'},
    {code: 'Quote'},
    {code: 'Comma', shiftKey: true},
    {code: 'Period', shiftKey: true},
    {code: 'Comma', shiftKey: true},
    {code: 'Period', shiftKey: true},
    {code: 'Digit9', shiftKey: true},
    {code: 'Digit0', shiftKey: true},
    {code: 'BracketLeft'},
    {code: 'BracketRight'},
    {code: 'BracketLeft'},
    {code: 'BracketRight'}
  ];

  export default {
    props: {
      mboard: {
        type: Object
      }
    },
    data() {
      return {
        article: '',
        regexp: null,
        addBtn: {
          show: false,
          x: 0,
          y: 0,
          domObj: null
        },
        delBtn: {
          show: false,
          x: 0,
          y: 0,
          domObj: null
        },
        timer: null,
        options: [],
        answers: [],
        allBtnState: true,
        popWidth: 400
      };
    },
    mounted() {
      this.createReg();
      this.$nextTick(() => {
        this.$refs.textarea.style.backgroundImage = `url(${textBG})`;
        this.bindHover();
        this.popWidth = $(this.$refs.textareaWrap).width();
      });
    },
    computed: {
      resBtnState() {
        return this.options.length < 1;
      },
      punList() {
        let regArr = PUNLIST_CN.concat(PUNLIST_EN);
        return Array.from(new Set(regArr));
      },
      punBtnList() {
        let arr = [];
        this.punList.forEach((item) => {
          let active = false;
          let index = this.options.findIndex((option) => {
            return option === item;
          });
          if (index !== -1) active = true;
          arr.push({
            text: item,
            active
          });
        });
        return arr;
      }
    },
    methods: {
      keyInput(e) {
        let key = e.key;
        let index = PUNLIST_EN.findIndex((item) => {
          return key === item;
        });// 英文模式 标点
        if (index === -1) {
          // 中文
          let _index = PUNLIST_NAME.findIndex((item) => {
            return item.code === e.code && Boolean(item.shiftKey) === e.shiftKey;
          });
          if (_index !== -1) {
            e.preventDefault();
            key = PUNLIST_CN[_index];
//            console.log('中文：', key);
            let str = this.createPunHtml(key);
            document.execCommand('insertHTML', false, str);
            setTimeout(() => {
              document.execCommand('Delete', false, null);
            }, 10);
          }
        } else {
          // 英文
          key = PUNLIST_CN[index];
//          console.log('英文：', key);
          let str = this.createPunHtml(key);
          document.execCommand('insertHTML', false, str);
          e.preventDefault();
        }
        this.setAllBtnState();
      },
      ketEnter(e) {
        document.execCommand('insertHTML', false, '\n');
        e.preventDefault();
      },
      bindHover() {
        let diffX = $('.box-inner').offset().left + 33;
        let diffY = $('.box-inner').offset().top + 35;
        $(document)
          .on('mouseover', '.textarea .symbol', (e) => {
//            console.log('over', e);
            let $this = $(e.target);
            if ($this.hasClass('active')) {
              this.delBtn.show = true;
              this.delBtn.x = $this.offset().left - diffX;
              this.delBtn.y = $this.offset().top - diffY;
              this.delBtn.domObj = $this;
            } else {
              this.addBtn.show = true;
              this.addBtn.x = $this.offset().left - diffX;
              this.addBtn.y = $this.offset().top - diffY;
              this.addBtn.domObj = $this;
            }
          })
          .on('mouseout', '.textarea .symbol', (e) => {
//            console.log('out', e);
            this.btnOut();
          });
      },
      btnOver() {
        clearTimeout(this.timer);
      },
      btnOut() {
        this.timer = setTimeout(() => {
          this.addBtn.show = false;
          this.delBtn.show = false;
        });
      },
      addOption(span) {
        span.addClass('active');
        let symbol = span.html();
        let index = this.options.findIndex((item) => {
          return item === symbol;
        });
        if (index === -1) {
          this.options.push(symbol);
        }
      },
      delOption(span) {
        span.removeClass('active');
        let symbol = span.html();
        let $spans = $('.textarea .active');
        for (let i = 0; i < $spans.length; i++) {
          if ($spans.eq(i).html() === symbol) return;
        }
        let index = this.options.findIndex((item) => {
          return item === symbol;
        });
        this.options.splice(index, 1);
      },
      addDistractors(btn) {
        if (btn.active) return;
        this.options.push(btn.text);
        btn.active = true;
      },
      setAll() {
        if (this.allBtnState) return;
        $('.textarea .symbol').each((index, item) => {
          this.addOption($(item));
        });
      },
      restoreAll() {
        if (this.resBtnState) return;
        $('.textarea .symbol').each((index, item) => {
          this.delOption($(item));
        });
        this.options = [];
      },
      setAllBtnState() {
        this.allBtnState = $('.textarea').find('.symbol').length < 1;
      },
      listToLf() {
        // 每次移动36px
        const PW = this.$refs.optionsWrap.offsetWidth;
        let maxOffset = this.$refs.optionsList.offsetWidth - PW;
        let list = this.$refs.optionsList;
        let left = parseInt(list.style.left);
        left = left > -1 * maxOffset + 36 ? left - 36 : -1 * maxOffset;
        list.style.left = `${left}px`;
      },
      listToRt() {
        let list = this.$refs.optionsList;
        let left = parseInt(list.style.left);
        left = left <= -36 ? left + 36 : 0;
        list.style.left = `${left}px`;
      },
      closePunPanel() {
        this.$refs.punPanel.handleClose();
      },
      createReg() {
        let regStr = this.punList.join('');
//        console.log(regStr);
        regStr = regStr.replace(/[()[\]]/g, (str) => {
          return '\\' + str;
        });
//        console.log(regStr);
        this.regexp = new RegExp('[' + regStr + ']', 'g');
      },
      changeArticle() {
        let reg1 = /<span class="symbol active" contenteditable="false">(.*?)<\/span>/g;
        let reg2 = /<span class="symbol" contenteditable="false">(.*?)<\/span>/g;
        this.answers = [];
        this.article = this.$refs.textarea.innerHTML.replace(reg1, (item) => {
          item.match(reg1);
          this.answers.push(RegExp.$1);
          return '<_>';
        });
        this.article = this.article.replace(reg2, (item) => {
          item.match(reg2);
          let str = RegExp.$1;
          return str;
        });
        console.log(this.answers, this.article);
      },
      createPunHtml(key) {
        return `&zwj;<span class="symbol" contenteditable="false">${key}</span>&zwj;`;
      },
      getQuestionData() {
        let questionData = {
          title: document.title,
          article: this.article,
          options: this.options,
          answers: this.answers,
          times: '',
          questionType: 'punctuation'
        };
        let localData = questionData;
        return {
          questionData,
          localData
        };
      },
      verifyHandle() {
        this.changeArticle();
        if (this.article.trim() === '') return -1;
        if (this.options.length < 1) return -2;
        return 1;
      },
      showMessage() {
        let res = this.verifyHandle();
        let desc = '';
        if (res === 1) {
          return 1;
        } else if (res === -1) {
          desc = '请输入文字内容';
        } else if (res === -2) {
          desc = '请设置答案';
        }
        Notice.destroy();
        Notice.warning({
          desc
        });
        return 0;
      }
    },
    components: {
      Mboard,
      IIcon,
      IPoptip,
      Tem1Btn
    }
  };
</script>

<style scoped lang="stylus">
  .punctuation_wrapper
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    .article_wrapper
      flex: 1
      background-color: rgba(255, 255, 255, .1);
      padding: 0 30px
      display: flex
      flex-direction: column
      .textarea_wrap
        width: 100%
        flex: 1
        margin-top: 20px
        color: #643809
        overflow-y: auto
        .textarea
          width: 100%
          min-height: 100%
          line-height: 40px
          background-repeat: repeat
          outline: none
          white-space: pre-wrap
        .add_btn, .del_btn
          position: absolute;
          width: 80px;
          height: 25px;
          text-align: center;
          line-height: 25px;
          color: #fff;
          border-radius: 4px;
          font-size: 14px;
          z-index: 100;
          &:after
            content: '';
            display: block;
            position: absolute;
            bottom: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border: 6px solid transparent;
          &.add_btn
            background-color: #62CD76;
            &:after
              border-top-color: #62CD76;
          &.del_btn
            background-color: #EE5453;
            &:after
              border-top-color: #EE5453;
      .control
        flex: 0 0 40px
        display: flex
        .btn_wrapper
          flex: 1
          text-align: center
          padding-top: 6px
          .control_btn
            padding: 4px 12px
            margin-left: 20px
        .size_wrapper
          flex: 0 0 40px;
          color: #643809
          line-height: 40px
    .options_wrapper
      flex: 0 0 72px
      height: 72px
      display: flex
      .text
        flex: 0 0 115px
        text-align: center
        line-height: 72px
      .options
        flex: 1
        display: flex
        .ctrl_btn
          flex: 0 0 28px
          line-height: 72px
          font-size: 20px
          color: #653d10
          text-align: center
        .options_box
          flex: 1
          overflow: hidden
          position: relative
          .options_box_wrap
            min-width: 100%
            margin-top: 22px
            font-size: 0
            white-space: nowrap
            position: absolute
            left: 0
            .pun_btn
              display: inline-block
              margin: 0 3px
              width: 30px
              height: 30px
              line-height: 30px
              text-align: center
              color: #A37C49
              background: url('/static/images/poem_word_bg.png') no-repeat center
              background-size: 100% 100%
              font-size: 18px
              font-weight: 800
              &:hover
                opacity: 0.8
      .btn_wrapper
        flex: 0 0 120px
        text-align: center
        font-size: 0
        line-height: 72px
        .add_disturbance_btn
          line-height: 20px
          padding: 2px 6px
          font-size: 12px
        .punctuation_list
          display: flex
          background-color: rgba(202, 175, 124, .9)
          border: 2px solid #fff
          border-radius: 5px
          padding: 0 10px
          .pun_btn_list
            flex: 1
            height: 115px
            white-space: pre-wrap
            text-align: left
            .pun_btn
              display: inline-block
              margin: 4px 4px
              width: 30px
              height: 30px
              line-height: 30px
              text-align: center
              color: #A37C49
              background: url('/static/images/poem_word_bg.png') no-repeat center
              background-size: 100% 100%
              font-size: 14px
              font-weight: 800
              white-space: nowrap
              &:hover
                opacity: 0.7
              &.active
                opacity: 0.7
          .close_wrap
            flex: 0 0 100px
            line-height: 115px
            border-left: 2px solid #fff
            .close_btn
              width: 75px;
              height: 26px;
              padding: 0
              line-height: 26px;
</style>

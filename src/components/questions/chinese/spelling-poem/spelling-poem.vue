<template>
  <div class="spelling-poem-box">
    <mboard class="mboard" :mboard="mboard[0]">
      <div class="poem_edit_wrap">
        <div class="poem_title">
          <input type="text" class="input"
                 v-model="poem.title"
                 @input="input('title')"
                 maxlength="15"
                 placeholder="古诗名不超过15个汉字"
          >
        </div>
        <div class="poem_author">
          <input type="text" class="input"
                 v-model="poem.author"
                 @input="input('author')"
                 maxlength="8"
                 placeholder="作者名不超过8个汉字"
          >
        </div>
        <line1></line1>
        <div class="poem_content">
          <span class="poem_rule">诗句上限为10句，每句文字上限为10个汉字。</span>
          <div class="verses_wrap">
            <ul class="verses_list">
              <li class="verse_box" v-for="verse in poem.verses">
                <input type="text" class="input" v-model="verse.text" @input="input('verses')" maxlength="10">
              </li>
            </ul>
            <div class="add_verse" @click="addVerse" v-show="poem.verses.length<10">
              <i-icon type="plus" class="add_icon"></i-icon>
            </div>
          </div>
        </div>
        <line1></line1>
        <div class="poem_clear">
          <tem1-btn class="clear_btn" @click="clear">一键清除</tem1-btn>
        </div>
      </div>
    </mboard>
    <mboard class="mboard" :mboard="mboard[1]">
      <div class="poem_show_wrap">
        <div class="poem_title">{{poem.title}}</div>
        <div class="poem_author">{{poem.author}}</div>
        <line1></line1>
        <div class="poem_content">
          <ul class="poem_list">
            <li class="poem_verse" v-for="verse in poem.verses">
              <span class="poem_word" ref="poemWord" v-for="word in strToArr(verse.text)">{{word}}</span>
            </li>
          </ul>
        </div>
      </div>
    </mboard>
  </div>
</template>

<script>
  import Mboard from 'components/template1-part/mboard/mboard';
  import Line1 from 'components/template1-part/line1/line1';
  import IIcon from 'iview/src/components/icon';
  import IModal from 'iview/src/components/modal';
  import Notice from 'iview/src/components/notice';
  import Tem1Btn from 'components/template1-part/template1-btn/template1-btn';

  export default {
    props: {
      mboard: {
        type: Array
      }
    },
    data() {
      return {
        poem: {
          title: '登鹳雀楼',
          author: '王之涣',
          verses: [
            {
              text: '白日依山尽'
            },
            {
              text: '黄河入海流'
            },
            {
              text: '欲穷千里目'
            },
            {
              text: '更上一层楼'
            }
          ]
        }
      };
    },
    methods: {
      strToArr(str) {
        return str.split('');
      },
      input(type) {
        if (type === 'verses') {
          this.poem[type].forEach((item) => {
            item.text = this.inputRule(item.text);
          });
        } else {
          this.poem[type] = this.inputRule(this.poem[type]);
        }
      },
      inputRule(str) {
        return str.replace(/[^\u4e00-\u9fa5]/g, '');
      },
      addVerse() {
        this.poem.verses.push({
          text: ''
        });
      },
      clear() {
        IModal.confirm({
          content: '确定要清空古诗内容？',
          onOk: () => {
            this.poem = {
              title: '',
              author: '',
              verses: [
                {
                  text: ''
                },
                {
                  text: ''
                },
                {
                  text: ''
                },
                {
                  text: ''
                }
              ]
            };
          }
        });
      },
      getQuestionData() {
        let questionData = {
          title: document.title,
          poem: this.poem,
          times: '',
          questionType: 'spelling-poem'
        };
        let localData = questionData;
        return {
          questionData,
          localData
        };
      },
      verifyHandle() {
        if (this.poem.title === '') return -1;
        if (this.poem.author === '') return -2;
        for (let i = 0; i < this.poem.verses.length; i++) {
          if (this.poem.verses[i] === '') return -3;
        }
        return 1;
      },
      showMessage() {
        let res = this.verifyHandle();
        let desc;
        if (res === 1) {
          return 1;
        } else if (res === -1) {
          desc = '请输入古诗名！';
        } else if (res === -2) {
          desc = '请输入作者！';
        } else if (res === -3) {
          desc = '不能有空白行！';
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
      Line1,
      IIcon,
      Tem1Btn
    }
  };
</script>

<style scoped lang="stylus">
  .spelling-poem-box
    display: flex
    .mboard
      flex: 1.9
      &:first-child
        flex: 1.1
        margin-right: 10px
        .poem_edit_wrap
          width: 100%
          height: 100%
          padding: 10px
          box-sizing: border-box
          position: relative
          z-index: 1
          .input
            width: 100%;
            padding-left: 12px
            height: 100%
            border: none;
            font-size: 13px;
            color: #000;
            border-radius: 3.68px;
            box-shadow: inset 0 2px 2.45px rgba(0, 0, 0, .6);
          .poem_title, .poem_author
            width: 100%
            height: 26px
            line-height: 26px
            margin: 5px 0
          .poem_content
            .poem_rule
              font-size: 12px
              line-height: 20px;
              color: #5d390d;
              font-weight: 700;
              text-shadow: 0.2px 0.5px 0 hsla(0, 0%, 100%, .31);
            .verses_wrap
              padding-right: 15px
              height: 245px
              overflow-y: auto
              .verse_box
                height: 36px
                padding: 6px 12px
                background-color: #F1DAB6
                box-shadow: 0 0 0 1px #F1DAB6
                border: 1px solid #8F6A36
                border-radius: 5px
                margin: 10px 0
              .add_verse
                width: 100%
                height: 36px
                line-height: 36px
                text-align: center
                border: 2px solid #805b28
                border-radius: 5px
                margin-bottom: 10px
                .add_icon
                  font-size: 24px
                  color: #966d2d;
                  text-shadow: 0 1px 1px hsla(0, 0%, 100%, .89);
          .poem_clear
            margin-top: 20px
            .clear_btn
              display: block
              width: 110px
              height: 30px
              padding: 0
              margin: 0 auto
              line-height: 30px
              border: 1px solid #8f5211;
              font-size: 14px
              text-align: center
      .poem_show_wrap
        height: 100%
        text-align: center
        color: #5d3702
        padding: 0 15px
        display: flex
        flex-direction: column
        .poem_title
          flex: 0 0 30px
          height: 30px
          line-height: 30px
          margin-top: 20px
          font-size: 20px
        .poem_author
          flex: 0 0 24px
          height: 24px
          line-height: 24px
          font-size: 15px
          margin-bottom: 15px
        .poem_content
          flex: 1
          margin: 25px 0 5px
          overflow-y: auto
          .poem_list
            .poem_verse
              margin: 25px 0
              .poem_word
                display: inline-block
                width: 40px
                height: 40px
                line-height: 39px
                border-radius: 4px
                font-size: 20px
                background: url('/static/images/poem_word_bg.png') no-repeat
                background-size: 100% 100%
                margin: 0 3px
</style>

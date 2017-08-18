<template>
  <div style="position: relative;top:15px" ref="fillblankDOM">
    <i-button
      class="btn_insertBlank"
      type="primary"
      shape="circle"
      @click="addBlank"
    >
      插入填空横线
    </i-button>
    <topic ref="topicDOM" @key-delete="backspace" @on-test="test"></topic>
    <options
      :options="blanks"
      :hasAdd="false"
      name="答案"
      tag="input"
      v-if="blanks.length>0"
      ref="optionsDOM"
      @delete="removeOption"
      @on-test="test"
    ></options>
    <div class="init_answer" v-else>
      <div class="name">
        <span class="text">答案</span>
        <div class="sign">*</div>
      </div>
      <div class="desc">请在题干中插入填空横线</div>
    </div>
    <hint ref="hintDOM"></hint>
    <explanation ref="explanationDOM"></explanation>
  </div>
</template>

<script>
  import Topic from 'components/xiti_basic/topic/topic';
  import Options from 'components/xiti_basic/options/options';
  import Hint from 'components/xiti_basic/hint/hint';
  import Explanation from 'components/xiti_basic/explanation/explanation';

  import {replaceSrc} from 'utils/utilities';
  import $ from 'expose-loader?$!jquery';

  // ui 组件
  import IButton from 'iview/src/components/button';
  // 三方 功能 组件
  import domtoimage from 'dom-to-image';

  export default {
    data() {
      return {
        blanks: [],
        blankImgs: [],
        isPass: false,
        questionData: {},
        localData: {}
      };
    },
    methods: {
      addBlank: function () {
        let parent = this.getRangeParent();
        let duty = parent.data('duty');
        if (duty === 'topic') {
          let index = this.getInsertIndexStart();
          this.blanks.splice(index, 0, {
            icon: 1,
            text: ''
          });

          setTimeout(() => {
            this.$refs.optionsDOM.updateOptionIcon();
            // 创建空格图片 并插入div_input中
            this.createBlank();
          }, 20);
        }
      },
      backspace: function () {
        let blankDOM = $('img.blankDOM_hook');
        if (this.blanks.length > blankDOM.length) {
          let start = this.getInsertIndexStart();
          let end = this.getInsertIndexEnd();
          console.log(start);
          console.log(end);
          console.log(end - start - 1);
          this.$refs.optionsDOM.removeOption(start, true);
//          一次删除多个
//          for (let i = start; i < end - 1; i++) {
//            setTimeout(()=>{
//              console.log(i);
//              this.$refs.optionsDOM.removeOption(i, true);
//            },20);
//          }
        }
        this.upBlankCode();
      },
      // 更新div_input中的空格的排序
      upBlankCode: function () {
        $(this.$refs.fillblankDOM).find('.div_input .blankDOM_hook').each((index, item) => {
          item.src = this.blankImgs[index];
          $(item).attr('data-code', index + 1);
        });
      },
      getInsertIndexStart: function () {
        this.$store.dispatch('saveSelection');
        let current = this.$store.state.currentRangeParent;
        return $(current).prev('img.blankDOM_hook').attr('data-code') * 1 || 0;
      },
      getInsertIndexEnd: function () {
        this.$store.dispatch('saveSelection');
        let current = this.$store.state.currentRangeParent;
        let l = $('img.blankDOM_hook').length;
        return $(current).next('img.blankDOM_hook').attr('data-code') * 1 || l;
      },
      createBlank: function () {
        let code = this.blanks[this.blanks.length - 1].icon;

        // 判断该编号的空格图片 有没有创建过
        if (this.blankImgs[code - 1]) {
          this.insertBlank();
          return;
        }

        let html = `<span class="blankDOM_hook" style="display:inline-block;width: 60px;border-bottom:1px solid #222;text-align: center;"><span style="display:inline-block;width:25px;height:25px;line-height: 25px;border-radius:50%;text-align:center;background-color: #888;color:#fff;font-size: 16px;">${code}</span></span>`;
        $('body').append(html);

        domtoimage.toPng($('span.blankDOM_hook')[0], {quality: 0.95})
          .then((dataUrl) => {
            this.blankImgs[code - 1] = dataUrl;
            $('span.blankDOM_hook').remove();
            this.insertBlank();
          });
      },
      getRangeParent: function () {
        this.$store.dispatch('saveSelection');
        let parent = this.$store.state.currentRangeParent;
        return $(parent).hasClass('div_input') ? $(parent) : $(parent).parents('.div_input');
      },
      insertBlank: function () {
        let html = `&nbsp;<img class="blankDOM_hook" data-code="0" style="margin:0 -1px;vertical-align:bottom;"/>&nbsp;`;
        document.execCommand('insertHTML', false, html);
        this.upBlankCode();
        setTimeout(() => {
          this.$refs.optionsDOM.refreshOption();
        }, 20);
      },
      removeOption: function (index) {
        $('img.blankDOM_hook').eq(index).remove();
        this.upBlankCode();
      },
      getQuestionData: function () {
        let _topic = this.$refs.topicDOM.topic;
        let _options = this.$refs.optionsDOM.options;
        let _hint = this.$refs.hintDOM.hint;
        let _explanation = this.$refs.explanationDOM.explanation;
        let _url = this.$store.state.urlSnippet;

        this.questionData = {
          title: document.title,
          topic: replaceSrc(_topic, _url, true),
          answer: (function () {
            let options = [];
            _options.forEach((item, index) => {
              let option = replaceSrc(item.text, _url, true);
              options.push(option);
            });
            return options;
          })(),
          hint: replaceSrc(_hint, _url, true),
          explanation: replaceSrc(_explanation, _url, true),
          questionType: 'fillblank'
        };

        this.localData = {
          title: document.title,
          topic: replaceSrc(_topic, _url),
          answer: (function () {
            let options = [];
            _options.forEach((item, index) => {
              let option = replaceSrc(item.text, _url);
              options.push(option);
            });
            return options;
          })(),
          hint: replaceSrc(_hint, _url),
          explanation: replaceSrc(_explanation, _url),
          questionType: 'fillblank'
        };
        return {
          questionData: this.questionData,
          localData: this.localData
        };
      },
      test: function () {
        let domarr = [this.$refs.topicDOM, this.$refs.optionsDOM];

        if (this.blanks.length < 1) {
          this.$store.state.isPass = false;
          return;
        }

        this.$store.dispatch('test', domarr);
      }
    },
    components: {
      Topic,
      Options,
      Hint,
      Explanation,
      IButton
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../common/stylus/mixin.styl'
  @import '../../../common/stylus/variable.styl'

  .btn_insertBlank
    font-size: 16px
    position: absolute
    right: 0
    top: -10px

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


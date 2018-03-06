<template>
  <div style="position: relative;top:15px" ref="fillblankDOM">
    <i-button
      class="btn_insertBlank"
      type="primary"
      shape="circle"
      @click.stop="addBlank"
    >
      插入填空横线
    </i-button>
    <topic ref="topicDOM" @key-delete="backspace" @verify="verify"></topic>
    <options
      :options="blanks"
      :hasAdd="false"
      name="答案"
      v-if="blanks.length>0"
      ref="optionsDOM"
      @delete="removeOption"
      @verify="verify"
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
  import Topic from 'components/general-part/topic/topic';
  import Options from 'components/general-part/options/options';
  import Hint from 'components/general-part/hint/hint';
  import Explanation from 'components/general-part/explanation/explanation';

  import {replaceSrc} from 'utils/utilities';
  import {mapActions, mapGetters} from 'vuex';

  // ui 组件
  import IButton from 'iview/src/components/button';
  // 三方 功能 组件
  import domtoimage from 'dom-to-image';
  import {verifyMixin} from 'common/js/mixin';
  import $ from 'jquery';

  export default {
    mixins: [verifyMixin],
    data() {
      return {
        blanks: [],
        blankImgs: []
      };
    },
    computed: {
      ...mapGetters([
        'currentRange'
      ])
    },
    methods: {
      addBlank: function () {
        let parent = this.getFocusDiv(this.currentRange);
        if (!parent) return;
        let duty = parent.data('duty');
        if (duty === 'topic') {
          let index = this.getInsertIndexStart(this.currentRange);
          console.log(index);
          this.blanks.splice(index, 0, {
            icon: 1,
            text: ''
          });
          // 创建空格图片 并插入div_input中
          this.createBlank()
            .then(() => {
              this.$refs.optionsDOM.refresh();
              this.insertBlank();
            });
        }
      },
      backspace: function () {
        this.saveCurrentRange();
        let blankDOM = $('img.blankDOM_hook');
        if (this.blanks.length > blankDOM.length) {
          let start = this.getInsertIndexStart(this.currentRange);
//          let end = this.getInsertIndexEnd(this.currentRange);
//          console.log(start);
//          console.log(end);
//          console.log(end - start - 1);
          this.$refs.optionsDOM.removeOption(start, true);
//          console.log(this.blanks);
        }
        this.upBlankCode();
      },
      // 更新div_input中的空格的编号
      upBlankCode: function () {
        $(this.$refs.fillblankDOM).find('.div_input .blankDOM_hook').each((index, item) => {
          item.src = this.blankImgs[index];
          $(item).attr('data-code', index + 1);
        });
      },
      getInsertIndexStart: function (range) {
//        console.log(range);
        if (range.commonAncestorContainer.nodeName !== '#text') {
        }
        let prev = range.commonAncestorContainer.previousElementSibling;
        let next = range.commonAncestorContainer.nextElementSibling;
//        console.log($(prev).prev('img.blankDOM_hook'));
        let code = 0;
        if (prev) {
          code = $(prev).attr('data-code') * 1;
        } else if (next) {
          code = $(next).attr('data-code') * 1 - 1;
        } else {
          code = 0;
        }
//        console.log('code:' + code);
        return code;
      },
      getInsertIndexEnd: function (range) {
        let l = $('img.blankDOM_hook').length;
        let prev = range.commonAncestorContainer.previousElementSibling;
        let next = range.commonAncestorContainer.nextElementSibling;
        let code = l;
        if (prev) {
          code = $(prev).attr('data-code') * 1 + 1;
        } else if (next) {
          code = $(next).attr('data-code') * 1;
        } else {
          code = l;
        }
        return code;
      },
      createBlank: function () {
        let code = this.blanks.length;
        return new Promise((resolve, reject) => {
          // 判断该编号的空格图片 有没有创建过
          if (this.blankImgs[code - 1]) {
            resolve();
            return;
          }

          let html = `<span class="blankDOM_hook" style="display:inline-block;width: 60px;border-bottom:1px solid #222;text-align: center;"><span style="display:inline-block;width:25px;height:25px;line-height: 25px;border-radius:50%;text-align:center;background-color: #888;color:#fff;font-size: 16px;">${code}</span></span>`;
          $('body').append(html);

          domtoimage
            .toPng($('span.blankDOM_hook')[0], {quality: 0.95})
            .then((dataUrl) => {
              this.blankImgs[code - 1] = dataUrl;
              $('span.blankDOM_hook').remove();
              resolve();
            });
        });
      },
      getFocusDiv: function (range) {
        if (!range) return;
        let dom = range.commonAncestorContainer.parentElement;
        let ret;
        if ($(dom).hasClass('div_input')) {
          ret = $(dom);
        } else {
          if ($(dom).parents('.div_input').length === 0) {
            ret = $(dom).find('.div_input');
          } else {
            ret = $(dom).parents('.div_input');
          }
        }
        return ret;
      },
      insertBlank: function () {
        let html = `&nbsp;<img class="blankDOM_hook" data-code="0" style="margin:0 -1px;vertical-align:bottom;"/>&nbsp;`;
        document.execCommand('insertHTML', false, html);
        this.upBlankCode();
        this.$refs.optionsDOM.refresh();
      },
      removeOption: function (index) {
        $('img.blankDOM_hook').eq(index).remove();
        this.upBlankCode();
      },
      getQuestionData: function (urlSnippet) {
        let _topic = this.$refs.topicDOM.topic;
        _topic = this.v_replaceBlank(_topic);
        let _options = this.$refs.optionsDOM.options;
        let _hint = this.$refs.hintDOM.hint;
        let _explanation = this.$refs.explanationDOM.explanation;

        let questionData = {
          title: document.title,
          topic: replaceSrc(_topic, urlSnippet),
          answer: (function () {
            let options = [];
            _options.forEach((item, index) => {
              let option = replaceSrc(item.text, urlSnippet);
              options.push(option);
            });
            return options;
          })(),
          hint: replaceSrc(_hint, urlSnippet),
          explanation: replaceSrc(_explanation, urlSnippet),
          questionType: 'fillblank'
        };

        let localData = {
          title: document.title,
          topic: replaceSrc(_topic),
          answer: (function () {
            let options = [];
            _options.forEach((item, index) => {
              let option = replaceSrc(item.text);
              options.push(option);
            });
            return options;
          })(),
          hint: replaceSrc(_hint),
          explanation: replaceSrc(_explanation),
          questionType: 'fillblank'
        };
        return {
          questionData,
          localData
        };
      },
      getIsPass() {
        if (this.blanks.length < 1) return [false];
        return [
          this.$refs.topicDOM.isPass,
          this.$refs.optionsDOM.isPass
        ];
      },
      v_replaceBlank(str) {
        let reg = /<img class="blankDOM_hook".*?>/g;
        return str.replace(reg, (item) => {
          return '<blank></blank>';
        });
      },
      ...mapActions({
        saveCurrentRange: 'saveCurrentRange'
      })
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


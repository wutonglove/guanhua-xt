<template>
  <div style="position: relative;top:15px" ref="fillblankDOM">
    <i-button
      class="btn_insertBlank"
      type="primary"
      shape="circle"
      @click.stop="addBlank"
      :disabled="addBlankSt"
    >
      插入填空横线
    </i-button>
    <cnt-module name="题干" :isMandatory="true">
      <div class="div_input cl_rg_hook topic_input"
           data-duty="topic"
           contenteditable="true"
           spellcheck="false" ref="topicDom"
           @blur="blur"
           @input="setTopic"
           @keyup.delete="backspace"
      ></div>
    </cnt-module>
    <options
      ref="options"
      :options="options"
      :hasAdd="false"
      name="答案"
      tag="input"
      v-if="options.length>0"     
      @delete="removeOption"
      @input="verify"
    ></options>
    <div class="init_answer" v-else>
      <div class="name">
        <span class="text">答案</span>
        <div class="sign">*</div>
      </div>
      <div class="desc">请在题干中插入填空横线，建议先编辑题干再编辑选项。</div>
    </div>
    <hint :hint="hint" @change="hintChange"></hint>
    <explanation :explanation="explanation" @change="expChange"></explanation>
  </div>
</template>

<script>
import Topic from 'components/general-part/topic/topic';
import Options from 'components/general-part/options/options';
import Hint from 'components/general-part/hint/hint';
import Explanation from 'components/general-part/explanation/explanation';
import CntModule from 'components/general-part/cnt-module/cnt-module';

import { replaceSrc } from 'utils/utilities';
import { mapActions, mapGetters } from 'vuex';

// ui 组件
import IButton from 'iview/src/components/button';
// 三方 功能 组件
import domtoimage from 'dom-to-image';
import { generalMixin } from 'common/js/mixin';
import $ from 'jquery';

export default {
  mixins: [generalMixin],
  data() {
    return {
      options: [],
      blankImgs: [],
      addBlankSt: false,
      icodes_cc: []
    };
  },
  computed: {
    ...mapGetters(['currentRange'])
  },
  methods: {
    setTopic: function() {
      this.topic = this.$refs.topicDom.innerHTML.trim();
      this.verify();
    },
    blur() {
      this.saveCurrentRange();
      this.verify();
    },
    addBlank: function(e) {
      let parent = this.getFocusDiv(this.currentRange);
      if (!parent) return;
      let duty = parent.data('duty');
      if (duty === 'topic') {
        this.addBlankSt = true;
        let index = this.getInsertIndexStart(this.currentRange);
        console.log(index);
        if (index >= 0) {
          this.options.splice(index, 0, {
            icon: 1,
            text: ''
          });
          // 创建空格图片 并插入div_input中
          this.createBlank().then(() => {
            this.insertBlank();
            this.addBlankSt = false;
          });
        } else {
          this.addBlankSt = false;
        }
      }
    },
    backspace: function() {
      this.saveCurrentRange();
      let $blankDOM = $('img.blankDOM_hook');
      if ($blankDOM.length === 0) this.options = [];
      if (this.options.length > $blankDOM.length) {
        let codes = this.getDeleteCode();
        codes.forEach(item => {
          this.options[item - 1] = '';
        });
        this.options = this.options.filter(item => {
          return item !== '';
        });
      }
      this.upBlankCode();
    },
    // 获取删除空格编号
    getDeleteCode() {
      let $blankDOM = $('img.blankDOM_hook');
      let max = this.options.length;
      let arr = new Array(max).fill(1).map((item, index) => {
        return index + 1;
      });
      let set1 = new Set(arr);
      let set2 = new Set();
      $blankDOM.each((index, item) => {
        set2.add($(item).attr('data-code') * 1);
      });
      return [...new Set([...set1].filter(x => !set2.has(x)))];
    },
    // 更新div_input中的空格的编号
    upBlankCode: function() {
      $(this.$refs.fillblankDOM)
        .find('.div_input .blankDOM_hook')
        .each((index, item) => {
          item.src = this.blankImgs[index];
          $(item).attr('data-code', index + 1);
        });
    },
    getInsertIndexStart: function(range) {
      let prev = range.commonAncestorContainer.previousElementSibling;
      let next = range.commonAncestorContainer.nextElementSibling;
      if ($('.blankDOM_hook').length === 0) {
        return 1;
      }
      let code = 0;
      if (prev) {
        code = $(prev).hasClass('blankDOM_hook')
          ? $(prev).attr('data-code') * 1
          : this.options.length - 1;
      } else if (next) {
        code = $(next).hasClass('blankDOM_hook')
          ? $(next).attr('data-code') * 1 - 1
          : this.options.length - 1;
      }
      return code;
    },
    createBlank: function() {
      let code = this.options.length;
      return new Promise((resolve, reject) => {
        // 判断该编号的空格图片 有没有创建过
        if (this.blankImgs[code - 1]) {
          resolve();
          return;
        }

        let html = `<span class="blankDOM_hook" style="display:inline-block;width: 60px;border-bottom:1px solid #222;text-align: center;"><span style="display:inline-block;width:25px;height:25px;line-height: 25px;border-radius:50%;text-align:center;background-color: #888;color:#fff;font-size: 16px;">${code}</span></span>`;
        $('body').append(html);

        domtoimage
          .toPng($('span.blankDOM_hook')[0], { quality: 0.95 })
          .then(dataUrl => {
            this.blankImgs[code - 1] = dataUrl;
            $('span.blankDOM_hook').remove();
            resolve();
          });
      });
    },
    getFocusDiv: function(range) {
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
    insertBlank: function() {
      let html = `&nbsp;<img class="blankDOM_hook" data-code="0" style="margin:0 -1px;vertical-align:bottom;"/>&nbsp;`;
      document.execCommand('insertHTML', false, html);
      this.upBlankCode();
      //        this.$refs.optionsDOM.refresh();
    },
    removeOption: function(index) {
      $('img.blankDOM_hook')
        .eq(index)
        .remove();
      this.upBlankCode();
    },
    getQuestionData: function(urlSnippet) {
      let _topic = this.topic;
      _topic = this.v_replaceBlank(_topic);
      let _options = this.options;
      let _hint = this.hint;
      let _explanation = this.explanation;

      let questionData = {
        title: document.title,
        topic: replaceSrc(_topic, urlSnippet),
        answer: (function() {
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
        answer: (function() {
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
    complete() {
      if (!this.$refs.topicDom.innerHTML.trim()) {
        return [false];
      }
      if (this.options.length < 1) {
        return [false];
      }
      for (let i = 0; i < this.options.length; i++) {
        if (!this.options[i].text.trim()) {
          return [false];
        }
      }
      return [true];
    },
    v_replaceBlank(str) {
      let reg = /<img class="blankDOM_hook".*?>/g;
      return str.replace(reg, item => {
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
    IButton,
    CntModule
  }
};
</script>

<style scoped lang="stylus">
@import '../../../common/stylus/mixin.styl'
@import '../../../common/stylus/variable.styl'

.topic_input
  min-height: 60px
  line-height: 25px
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


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
    <topic v-model="qsData.topic" @change="change" ref="topic"></topic>
    <options v-show="options && options.length>0" tag="input" iconType="1" :hasAdd="false" v-model="qsData.options" ref="options"></options>
    <div class="init_answer" v-show="!options || options.length===0">
      <div class="name">
        <span class="text">答案</span>
        <div class="sign">*</div>
      </div>
      <div class="desc"> 请在题干中插入填空横线，建议先编辑题干再编辑选项。</div>
    </div>
    <hint></hint>
    <explanation></explanation>
  </div>
</template>

<script>
import Topic from 'components/general-part/topic/topic';
import Options from 'components/general-part/options/options';
import Hint from 'components/general-part/hint/hint';
import Explanation from 'components/general-part/explanation/explanation';
import CntModule from 'components/general-part/cnt-module/cnt-module';

import { replaceSrc } from 'utils/utilities';

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
      blankImgs: [],
      divDom: null,
      index: 0
    };
  },
  computed: {
    options() {
      return this.qsData.options;
    }
  },
  methods: {
    initQsData() {
      return (this.qsData = {
        topic: '',
        hint: '',
        explanation: '',
        options: []
      });
    },
    change() {
      // 检查有没有删除空格，获取删除的编号
      // let indexes = [];
      let editor = this.$refs.topic.getEditor();
      let cnt = editor.getContent();
      let div = document.createElement('div');
      let rmIndexes = [];
      let _indexes = [];
      // _indexes 为当前编辑框内的所有空格编号
      let curIndexes = $(div)
        .html(cnt)
        .find('.blankDOM_hook')
        .toArray()
        .map(item => {
          let className = $(item).attr('class');
          let res = className.match(/code(\d+)/);
          return className && res && res[1] * 1;
        })
        .sort();
      for (var i = 0; i < this.options.length; i++) {
        _indexes.push(i);
      }
      rmIndexes = _indexes.filter(item => {
        return curIndexes.indexOf(item) === -1;
      });
      console.log(curIndexes, rmIndexes);
      // 如果删除的空格为0 终止
      if (rmIndexes.length === 0) {
        return;
      }
      this.$refs.options.removeOption(rmIndexes);
      // 删除完成
      // this.upBlankCode();
    },
    addBlank() {
      let editor = this.$refs.topic.getEditor();
      editor.execCommand(
        'inserthtml',
        `<img class="blankDOM_hook new" src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1752806649,1085024710&fm=173&app=25&f=JPEG?w=218&h=146&s=FB9061856A624B1D1AA7E8CC0300F099" width="60" height="25"/>`
      );
      console.log(this.options, this.qsData.options);
      this.divDom = $('<div>');
      // 获取刚插入的空格index
      let index = this.divDom
        .html(editor.getContent())
        .find('.blankDOM_hook')
        .toArray()
        .findIndex(item => {
          return $(item).hasClass('new');
        });
      console.log(this.divDom[0], index);
      this.divDom.find('.new').removeClass('new');
      this.upBlankCode();
      this.$refs.options.addOption(index);
      editor = null;
    },
    // 更新编辑框中的空格的编号
    upBlankCode: function() {
      let editor = this.$refs.topic.getEditor();

      this.divDom.find('.blankDOM_hook').each(function(i, item) {
        item.className = item.className.replace(/\bcode\d+\b/g, '');
        $(item).addClass('code' + i);
      });
      editor.setContent(this.divDom.html());
      this.divDom = editor = null;
    },
    getNewBlankCode() {},
    createBlank: function() {
      let code = this.options.length + 1;
      console.log('code' + code);
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
    getQuestionData: function(urlSnippet) {
      let _topic = this.qsData.topic;
      _topic = this._replaceBlank(_topic);
      let _options = this.qsData.options;
      let _hint = this.qsData.hint;
      let _explanation = this.qsData.explanation;

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
    _replaceBlank(str) {
      let reg = /<img class="blankDOM_hook".*?>/g;
      return str.replace(reg, item => {
        return '<blank></blank>';
      });
    },
    validate() {
      if (!this.qsData) return [false];
      return [
        this.qsData.topic !== '',
        this.options.length > 0,
        this.$refs.options.valid
      ];
    }
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
  z-index: 1
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
    text-indent: 15px
    color: $font-color-grey
</style>


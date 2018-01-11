<template>
  <div class="blank_cloze" @mousemove="mouseMove">
    <notepad class="article_wrap">
      <div class="article_content" v-html="article" id="bc_article" ref="articleWrap"></div>
    </notepad>
    <div class="options_wrap">
      <div class="header">填空项</div>
      <div class="options_list" id="bc_options" ref="optionsWrap">
        <div class="option_box" v-for="(option,index) in options">
            <span class="option_item">
              {{option}}
            </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {submitMixin} from 'common/js/mixin';
  import Notepad from 'components/template1-part/notepad/notepad';
  import $ from 'jquery';
  window.jQuery = $;
  window.$ = $;
  import 'jquery-ui/ui/core.js';
  import 'jquery-ui/ui/disable-selection';
  import 'jquery-ui/ui/widgets/draggable';
  import 'jquery-ui/ui/widgets/droppable';
  import 'jquery-ui/ui/widgets/sortable';
  import 'jquery-ui-touch-punch';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    data() {
      return {
        dragState: false,
        options: []
      };
    },
    mounted() {
      this.options = this.questionData.options;
      this.$nextTick(() => {
        this.initOpDrag();
        this.initBkDrop();
        this.initBkDrag();
        this.initOpDrop();
        $('#bc_options, #bc_article').disableSelection();
      });
    },
    computed: {
      article() {
        let reg = /<blank.*?>.*?<\/blank>/g;
        return this.questionData.article.replace(reg, (str) => {
          return `<blank>?</blank>`;
        });
      }
    },
    methods: {
      mouseMove(e) {
        if (this.dragState) {
          let x = $(this.curDom).offset().left;
          let y = $(this.curDom).offset().top;
          $('#bc_article blank').removeClass('hover');
          $('#bc_article blank').each((index, item) => {
            let y1 = $(item).offset().top;
            let x1 = $(item).offset().left;
            let y2 = y1 + $(item).height();
            let x2 = x1 + $(item).width();
            if (x > x1 && x < x2 && y > y1 && y < y2) {
              $(item).addClass('hover');
            }
          });
        }
      },
      initOpDrag() { // 选项拖动
        $('#bc_options .option_box').draggable({
          revert: 'invalid',
          zIndex: 1000,
          opacity: 0.7,
          start: (e) => {
            this.$refs.optionsWrap.style['overflow-y'] = 'visible';
            this.dragState = true;
            this.curDom = e.target;
          },
          stop: () => {
            this.$refs.optionsWrap.style['overflow-y'] = 'auto';
            this.dragState = false;
            $('#bc_article blank').removeClass('hover');
          }
        });
      },
      initBkDrop() { // 选项放置在空格上
        let _self = this;
        $('#bc_article blank').droppable({
          accept: '.option_box',
          drop: function (event, ui) {
            // 放置位置为空
            let index = ui.draggable.index();
            let value = $(this).html().trim();
            if ($(this).html() === '?') {
              $(this).addClass('fill').html(_self.options[index]);
              _self.options.splice(index, 1);
            } else {
              // 放置位置已经有内容
              $(this).html(_self.options[index]);
              _self.options[index] = value;
              _self.options = _self.options.slice();
//              _self.$set(this.options, index, value);
            }
            $('#bc_options .option_box').css({
              left: 0,
              top: 0,
              opacity: 1
            });
            _self.initBkDrag();
          }
        });
      },
      initBkDrag() { // 填上的空格 拖动
        $('#bc_article blank.fill').draggable({
          revert: 'invalid',
          zIndex: 1000,
          opacity: 0.7,
          start: (e) => {
            this.$refs.articleWrap.style['overflow-y'] = 'visible';
            console.log(e);
          },
          stop: () => {
            this.$refs.articleWrap.style['overflow-y'] = 'auto';
          }
        });
      },
      initOpDrop() { // 选项放回
        let _self = this;
        $('#bc_options').droppable({
          accept: 'blank.fill',
          drop: function (event, ui) {
            let text = ui.draggable.html().trim();
            _self.options.push(text);
            $('#bc_article blank').css({
              left: 0,
              top: 0,
              opacity: 1
            });
            ui.draggable.removeClass('fill').html('?');

            _self.$nextTick(() => {
              ui.draggable.draggable('destroy');
              _self.initOpDrag();
            });
          }
        });
      },
      getResult() {
        let $blanks = $(this.$refs.articleWrap).find('blank');
        let str = '';
        for (let i = 0; i < $blanks.length; i++) {
          let text = $blanks.eq(i).html().trim();
          str += (text === '?' ? '' : text);
          if (text !== this.questionData.answers[i]) return 0;
        }
        console.log('jieguo', str);
        if (str === '') return -1;
        return 1;
      }
    },
    components: {
      Notepad
    }
  };
</script>

<style scoped lang="stylus">
  .blank_cloze
    display: flex
    padding: 10px
    width: 100%
    height: 100%
    .article_wrap
      flex: 1
      .article_content
        width: 100%
        height: 100%
        padding: 20px 10px
        font-size: 16px
        line-height: 26px
        overflow-y: auto
    .options_wrap
      flex: 1
      margin: 10px
      .header
        font-size: 18px
        font-weight: 800
        padding-left: 15px
      .options_list
        padding: 10px
        height: 100%
        overflow-y: auto
        .option_box
          display: inline-block
          padding: 3px
          background-color: #F3DCBA
          border-radius: 5px
          margin: 5px 10px
          box-shadow: 0 0 5px 0 rgba(0, 0, 0, .3)
          .option_item
            display: inline-block
            padding: 4px 8px
            border: 1px solid #8F6831
            border-radius: 5px
</style>

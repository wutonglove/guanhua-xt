<template>
  <div class="punctuation_wrap">
    <div class="article_wrapper">
        <pre class="textarea"
             spellcheck="false"
             ref="textarea"
             v-html="article"
        ></pre>
    </div>
    <div class="options_wrapper">
      <div class="text">标点选项</div>
      <div class="options">
        <div class="ctrl_btn" @click="listToLf">
          <i-icon type="chevron-left"></i-icon>
        </div>
        <div class="options_box" ref="optionsWrap">
          <ul class="options_box_wrap" ref="optionsList">
            <li class="pun_btn" v-for="symbol in options" v-html="symbol" ref="punBtn" @click="setPun(symbol)"></li>
          </ul>
        </div>
        <div class="ctrl_btn" @click="listToRt">
          <i-icon type="chevron-right"></i-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IIcon from 'iview/src/components/icon';
  import $ from 'expose-loader?$!jquery';

  import textBG from './iocn_pun_bg.png';
  import {submitMixin} from 'common/js/mixin';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    mounted() {
      this.$refs.textarea.style.backgroundImage = `url(${textBG})`;
      this.bingClick();
    },
    data() {
      return {};
    },
    computed: {
      options() {
        return this.questionData.options;
      },
      article() {
        let article = this.questionData.article;
        article = article.replace(/<_>/g, () => {
          return `<span class="empty_pun"></span>`;
        });
        return article;
      },
      answers() {
        return this.questionData.answers;
      }
    },
    methods: {
      listToLf() {
        // 每次移动36px
        const PW = this.$refs.optionsWrap.offsetWidth;
        const maxOffset = this.$refs.optionsList.offsetWidth - PW;
        const list = this.$refs.optionsList;
        let left = parseInt(list.style.left);
        left = left > -1 * maxOffset + 46 ? left - 46 : -1 * maxOffset;
        list.style.left = `${left}px`;
      },
      listToRt() {
        const list = this.$refs.optionsList;
        let left = parseInt(list.style.left);
        left = left <= -46 ? left + 46 : 0;
        list.style.left = `${left}px`;
      },
      setPun(pun) {
        $('.textarea .active').html(pun);
      },
      bingClick() {
        $(document).on('click', '.textarea .empty_pun', (e) => {
          console.log(e);
          let $this = $(e.target);
          if ($this.hasClass('active')) {

          } else {
            $('.textarea .empty_pun').removeClass('active');
            $this.addClass('active');
          }
        });
      },
      getResult() {
        let $puns = $('.textarea .empty_pun');
        for (let i = 0; i < $puns.length; i++) {
          if ($puns.eq(i).html().trim() !== this.answers[i]) return 0;
        }
        return 1;
      }
    },
    components: {
      IIcon
    }
  };
</script>

<style scoped lang="stylus">
  .punctuation_wrap
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    .article_wrapper
      flex: 1
      padding: 10px 20px 0
      overflow-y: auto
      background-color: rgba(255, 255, 255, .1);
      .textarea
        width: 100%
        min-height: 100%
        line-height: 40px
        background-repeat: repeat
        white-space: pre-wrap
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
        margin-right: 20px
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
            margin-top: 17px
            font-size: 0
            white-space: nowrap
            position: absolute
            left: 0
            .pun_btn
              display: inline-block
              margin: 0 3px
              width: 40px
              height: 40px
              line-height: 40px
              text-align: center
              color: #A37C49
              background: url('/static/images/poem_word_bg.png') no-repeat center
              background-size: 100% 100%
              font-size: 14px
              font-weight: 800
              &:active
                opacity: 0.7
</style>

<template>
  <div class="spelling_wrap">
    <div class="poem_title">
      <span class="text" ref="poemTitle"></span>
    </div>
    <div class="poem_content">
      <div class="poem_wrap">
        <ul class="poem_list">
          <li class="poem_word_box" v-for="word in poem">
            <span class="poem_word">{{word.text}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {submitMixin} from 'common/js/mixin';
  import titleBG from './poem_title_bg.png';

  class PoemWord {
    constructor(text = '') {
      this.text = text;
    }
  }

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.poemTitle.style.backgroundImage = `url(${titleBG})`;
      });
    },
    computed: {
      poem() {
        let arr = [];
        let poem = '';
        this.questionData.poem.verses.forEach((item) => {
          poem += item.text;
        });
        poem.split('').forEach((item) => {
          arr.push(new PoemWord(item));
        });
        return arr;
      }
    }
  };
</script>

<style scoped lang="stylus">
  .spelling_wrap
    width: 100%
    height: 100%
    background: url('/static/images/poem_bg.jpg')
    background-size: 100% 100%
    text-align: center
    display: flex
    flex-direction: column
    .poem_title
      width: 100%
      padding-top: 10px
      .text
        display: inline-block
        min-width: 200px
        padding: 0 20px
        height: 36px
        line-height: 36px
        border: 1px solid #B8624B
        box-shadow: 0 0 0 1px #F7EDEB
        background-size: 90% 98%
        background-repeat: no-repeat
        background-position: center
        background-color: #F7EDEB
    .poem_content
      flex: 1
      margin: 20px 30px
      background-color: rgba(232, 244, 221, .7)
      border: 1px solid #D0C0A9
      padding: 20px
      display: flex
      .poem_wrap
        flex: 1
        border: 1px solid #D0C0A9
</style>

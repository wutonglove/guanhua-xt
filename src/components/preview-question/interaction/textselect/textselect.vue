<template>
  <div class="textselect">
    <div class="article" v-html="questionData.article"></div>
  </div>
</template>

<script>
  import {submitMixin} from 'common/js/mixin';
  const $ = window.$;

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    mounted() {
      $(document).on('click', '.textselect textselect', function () {
        $(this).hasClass('selected') ? $(this).removeClass('selected') : $(this).addClass('selected');
      });
    },
    methods: {
      getResult() {
        if ($('.article textselect.selected').length < 1) return -1;
        let ans = this.questionData.answers;
        let $textselect = $('.article textselect');
        for (let i = 0; i < ans.length; i++) {
          if (ans[i] !== $textselect.eq(i).hasClass('selected') * 1) return 0;
        }
        return 1;
      }
    }
  };
</script>

<style lang="stylus">
  .textselect
    width: 100%
    height: 100%
    padding: 20px 10px 10px
    .article
      width: 100%
      height: 100%
      overflow-y: auto
      font-size: 18px
      line-height: 40px
      textselect
        border: 1px solid #806031
        border-bottom-width: 2px
        background-color: #B18745
        border-radius: 5px
        padding: 3px 8px
        color: #fff
        margin: 0 5px
        &.selected
          border-color: #4B8AAD
          background-color: #76C1EA
</style>

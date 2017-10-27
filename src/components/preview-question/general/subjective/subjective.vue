<template>
  <div class="subjective">
    <div class="subj_wrap">
      <h2 class="account">
        请在下面区域输入答案：
      </h2>
      <textarea class="input_div" spellcheck="false" @input="setAnswer" ref="answerDOM"></textarea>
    </div>
  </div>
</template>

<script>
  import {submitMixin} from 'common/js/mixin';
  import Modal from 'iview/src/components/modal';

  export default {
    mixins: [submitMixin],
    data() {
      return {
        answer: ''
      };
    },
    methods: {
      setAnswer() {
        this.answer = this.$refs.answerDOM.value.trim();
      },
      submit() {
        let result = this.getResult();
        if (result === '') {
          Modal.info({
            title: '',
            content: `<p>这道题没有作答！</p>`
          });
        } else {
          Modal.info({
            title: '',
            content: `<p>${result}</p>`
          });
        }
      },
      getResult() {
        return this.answer;
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../../common/stylus/variable.styl'
  .subjective
    .subj_wrap
      border-top: 1px solid #ccc
      padding-top: 10px
      .account
        font-size: 14px
      .input_div
        width: 100%
        resize: none
        border: 1px solid #ccc
        margin-top: 10px
        padding: 10px
        line-height: 20px
        min-height: 100px
        font-size: 15px
        border-radius: 5px
        background-color: #fff
</style>

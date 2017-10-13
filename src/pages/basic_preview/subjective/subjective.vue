<template>
  <div class="subjective">
    <div class="subj_wrap">
      <h2 class="account">
        请在下面区域输入答案：
      </h2>
      <div class="input_div" contenteditable="true" spellcheck="false" @input="setAnswer" ref="answerDOM"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      questionData: {
        type: Object
      },
      isDisabled: {
        type: Boolean
      }
    },
    data() {
      return {
        answer: this.$store.state[this.questionData.questionType].IAnswer
      };
    },
    methods: {
      setAnswer() {
        this.answer = this.$refs.answerDOM.innerHTML.trim();
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../common/stylus/variable.styl'
  .subjective
    .subj_wrap
      border-top: 1px solid #ccc
      padding-top: 10px
      .account
        font-size: 14px
      .input_div
        border: 1px solid #ccc
        margin-top: 10px
        padding: 10px
        line-height: 20px
        min-height: 100px
        font-size: 15px
        border-radius: 5px
        background-color: #fff
</style>

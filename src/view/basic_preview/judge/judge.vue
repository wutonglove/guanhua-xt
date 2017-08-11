<template>
  <div class="judge">
    <Radio-group v-model="answer" vertical class="options">
      <Radio label="是" :disabled="isDisabled"></Radio>
      <Radio label="否" :disabled="isDisabled"></Radio>
    </Radio-group>
  </div>
</template>

<script>
  export default {
    props: {
      questionData: {
        type: Object
      }
    },
    data(){
      return{
        isDisabled:false,
        answer:this.$store.state[this.questionData.questionType].IAnswer
      };
    }
  };
</script>

<style lang="stylus">
  .options
    line-height: 30px
    width: 100%
    label
      white-space: normal
      font-size: 22px;
      margin: 15px 0;
      width: 100%;
      .ivu-radio
        .ivu-radio-inner
          width: 25px
          height: 25px
          top: 50%
          &:after
            width: 15px
            height: 15px
        .ivu-radio-inner
          &:after
            width: 19px
            height: 19px
            border-radius: 9px
</style>

<template>
  <div class="judge">
    <i-radio-group v-model="answer" vertical class="options">
      <i-radio label="是" :disabled="isDisabled"></i-radio>
      <i-radio label="否" :disabled="isDisabled"></i-radio>
    </i-radio-group>
  </div>
</template>

<script>
  import IRadioGroup from 'iview/src/components/radio/radio-group';
  import IRadio from 'iview/src/components/radio';

  import {submitMixin} from 'common/js/mixin';

  export default {
    mixins: [submitMixin],
    data() {
      return {
        isDisabled: false,
        answer: -1
      };
    },
    methods: {
      getResult() {
        if (this.answer === -1) {
          return -1;
        } else {
          return this.answer === this.questionData.answer ? 1 : 0;
        }
      }
    },
    components: {
      IRadioGroup,
      IRadio
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

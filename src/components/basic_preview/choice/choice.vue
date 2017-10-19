<template>
  <div>
    <div class="choice">
      <i-radio-group v-if="questionData.questionType === 'radio'" v-model="answer" vertical class="options">
        <i-radio
          :label="option.id"
          v-for="(option,index) in options"
          :key="index"
          :disabled="isDisabled"
        >
          <span class="icon"><span>{{option.icon}}.</span></span>
          <span class="text" v-html="option.text"></span>
        </i-radio>
      </i-radio-group>

      <i-checkbox-group v-model="answer" class="options" v-else>
        <i-checkbox
          :label="option.id"
          v-for="(option,index) in options"
          :key="index"
          :disabled="isDisabled"
        >
          <span class="icon"><span>{{option.icon}}.</span></span>
          <span class="text" v-html="option.text"></span>
        </i-checkbox>
      </i-checkbox-group>
    </div>
  </div>
</template>

<script>
  import IRadioGroup from 'iview/src/components/radio/radio-group';
  import IRadio from 'iview/src/components/radio';
  import ICheckboxGroup from 'iview/src/components/checkbox/checkbox-group';
  import ICheckbox from 'iview/src/components/checkbox';
  import {createRandomArr} from 'utils/utilities';
  import {submitMixin} from 'common/js/mixin';

  export default {
    mixins: [submitMixin],
    data() {
      return {
        indexes: [],
        isDisabled: false,
        answer: null
      };
    },
    mounted() {
      this.answer = this.questionData.questionType === 'radio' ? -1 : [];
      setTimeout(() => {
        let l = this.questionData.options.length;
        this.indexes = createRandomArr(l, 0, l - 1);
      }, 20);
    },
    computed: {
      options() {
        if (this.indexes.length < 1) return;
        let newOptions = [];
        let oldOptions = this.questionData.options;
        for (let i = 0; i < oldOptions.length; i++) {
          newOptions[i] = {
            icon: oldOptions[i].icon,
            text: oldOptions[this.indexes[i]].text,
            id: oldOptions[this.indexes[i]].id
          };
        }
        return newOptions;
      },
      inputType() {
        let type = this.questionData.questionType;
        return type === 'checkbox' ? 'checkbox' : 'radio';
      }
    },
    methods: {
      getResult() {
        return this.inputType === 'checkbox'
          ? this.getCheckboxResult()
          : this.getRadioResult();
      },
      getRadioResult() {
        if (this.answer === -1) {
          return -1;
        } else if (this.questionData.answer === this.answer) {
          return 1;
        } else {
          return 0;
        }
      },
      getCheckboxResult() {
        if (this.answer.length === 0) {
          return -1;
        } else if (this.answer.length !== this.questionData.answer.length) {
          return 0;
        } else {
          for (let i = 0; i < this.answer.length; i++) {
            if (this.questionData.answer.indexOf(this.answer[i]) === -1) {
              return 0;
            }
          }
          return 1;
        }
      }
    },
    components: {
      IRadioGroup,
      IRadio,
      ICheckboxGroup,
      ICheckbox
    }
  };
</script>

<style lang="stylus">
  @import '../../../common/stylus/mixin.styl'

  .choice
    .options
      line-height: 30px
      width: 100%
      label
        display: flex
        white-space: normal
        height: auto
        font-size: 22px;
        margin: 15px 0;
        width: 100%;
        .ivu-radio, .ivu-checkbox
          .ivu-radio-inner, .ivu-checkbox-inner
            width: 25px
            height: 25px
            top: 50%
            transform: translateY(-50%)
            &:after
              width: 15px
              height: 15px
          .ivu-radio-inner
            &:after
              width: 19px
              height: 19px
              border-radius: 9px
        .icon
          flex: 0 0 35px
          text-align: center
          span
            display: inline-block
            position: relative
            top: 50%
            transform: translateY(-50%)
        .text
          flex: 1
          word-break: break-all
</style>

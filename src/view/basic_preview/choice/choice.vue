<template>
  <div>

    <div class="choice">
      <Radio-group v-if="questionData.questionType === 'radio'" v-model="answer" vertical class="options">
        <Radio
          :label="option.id"
          v-for="(option,index) in options"
          :key="index"
          :disabled="isDisabled"
        >
          <span class="icon"><span>{{option.icon}}.</span></span>
          <span class="text" v-html="option.text"></span>
        </Radio>
      </Radio-group>

      <Checkbox-group v-model="answer" class="options" v-else>
        <Checkbox
          :label="option.id"
          v-for="(option,index) in options"
          :key="index"
          :disabled="isDisabled"
        >
          <span class="icon"><span>{{option.icon}}.</span></span>
          <span class="text" v-html="option.text"></span>
        </Checkbox>
      </Checkbox-group>

    </div>

  </div>
</template>

<script>
  import {createRandomArr} from 'utils/utilities';
  export default {
    props: {
      questionData: {
        type: Object
      }
    },
    data(){
      return {
        indexes: [],
        isDisabled: false,
        answer:this.$store.state[this.questionData.questionType].IAnswer,
      }
    },
    mounted(){
      setTimeout(() => {
        console.log(this.questionData)
        let l = this.questionData.options.length;
        this.indexes = createRandomArr(l, 0, l - 1);
      }, 20)
    },
    computed: {
      options() {
        if (this.indexes.length < 1) return
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
        let type = this.$store.state.questionData.questionType;
        return type === 'checkbox' ? 'checkbox' : 'radio';
      },

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

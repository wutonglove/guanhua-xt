<template>
  <div class="input_wrap">
    <div class="input_name" v-if="name">{{name}}：</div>
    <div class="input_box">
      <i-input :type="type"
               class="input"
               :placeholder="placeholder"
               size="large"
               v-model="inputVal"
               @on-focus="focus"
               @on-blur="blur"
               @on-keydown="input"
      ></i-input>
      <span class="input_icon">
          <i-icon type="ios-close" color="#FF4743" v-show="showIcon && pass"></i-icon>
          <i-icon type="ios-checkmark" color="#4ACC45" v-show="showIcon && !pass"></i-icon>
        </span>
    </div>
    <div class="input_desc">
      <i-alert show-icon v-if="showText">{{ruleDesc}}</i-alert>
      <i-alert show-icon type="error" v-else-if="showText && descText">{{descText}}</i-alert>
      <i-alert show-icon type="error" v-else-if="showText">{{defaultText}}</i-alert>
    </div>
  </div>
</template>

<script>
  import IAlert from 'iview/src/components/alert';
  import IInput from 'iview/src/components/input';
  import IIcon from 'iview/src/components/icon';

  export default {
    props: {
      name: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      ruleDesc: {
        type: String
      },
      rules: {
        type: Array
      },
      isRequired: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        inputVal: '',
        showIcon: false,
        showText: false,
        pass: false,
        ruleIndex: -1
      };
    },
    computed: {
      defaultText() {
        return `${this.name ? this.name : '该项'}不能为空！`;
      },
      descText() {
        return this.ruleIndex === -1 ? '' : this.rules[this.ruleIndex];
      }
    },
    methods: {
      focus() {
        this.showIcon = true;
        this.$emit('on-focus');
      },
      blur() {
        this.showRule = false;
        this.$emit('on-blur');
      },
      input() {
        if (this.isRequired) {
          if (this.inputVal.trim() === '') {
            return;
          }
        }
        this.showText = true;
        this.$emit('on-input');
      }
    },
    components: {
      IAlert,
      IInput,
      IIcon
    }
  };
</script>

<style scoped lang="stylus">
  .input_wrap
    margin: 10px 0
    .input_name
      font-size: 16px
      font-weight: 800
      height: 30px
      line-height: 30px
    .input_box
      display: flex
      position: relative
      .input
        flex: 1
      .input_icon
        font-size: 24px
        line-height: 36px
        margin-left: 10px
        position: absolute
        right: 10px

    .input_desc
      margin: 10px 0
</style>

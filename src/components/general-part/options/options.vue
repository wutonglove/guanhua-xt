<template>
  <div class="options_wrapper">
    <cnt-module :name="name" :desc="desc" :isMandatory="true">
      <div class="options" ref="optionsDOM">
        <div class="option" v-for="(option,index) in options" :key="index">
          <span class="code">{{option.icon}}</span>
          <!-- tag div -->
          <div-input
            class="text"
            v-model="option.text"
            @input="input"
            @change="editText"
            v-if="tag==='div'"
            ref="input"
          ></div-input>

          <!-- tag input -->
          <input type="text" class="text div_input cl_rg_hook"
                 v-else-if="tag==='input'"
                 :data-icode="option.icode"
                 v-model="option.text"
                 @input='input'
                 @paste.stop.prevent="paste(index, $event)"
                 ref="input"
          >

          <button type="button" class="icon" @click="removeOption(index)"
                  :disabled="hasAdd && options.length<3">
            <i-icon type="trash-a"></i-icon>
          </button>
        </div>
        <i-button v-if="hasAdd" type="primary" shape="circle" class="add_option" @click="addOption">
          <i-icon type="android-add" size="20"></i-icon>
          <span class="text">选项</span>
        </i-button>
      </div>
    </cnt-module>
  </div>
</template>

<script>
import CntModule from 'components/general-part/cnt-module/cnt-module';
import DivInput from 'components/general-part/div-input/div-input';

import IButton from 'iview/src/components/button';
import IIcon from 'iview/src/components/icon';
import $ from 'jquery';

export default {
  model: {
    prop: 'options',
    event: 'change'
  },
  props: {
    hasAdd: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: '选项'
    },
    desc: {
      type: String,
      default: ''
    },
    options: {
      type: Array
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  data() {
    return {
      isComplete: false
    };
  },
  methods: {
    input() {
      let inputs = this.$refs.input;
      this.isComplete = true;
      for (let i = 0; i < inputs.length; i++) {
        if (this.tag === 'div') {
          if (inputs[i].isEmpty) {
            this.isComplete = false;
            break;
          }
        } else {
          if (inputs[i].value.trim()) {
            this.isComplete = false;
            break;
          }
        }
      }
      this.$emit('input');
    },
    editText() {
      this.$emit('chang', this.options);
    },
    updateOptionIcon() {
      if (this.options.length < 1) return;
      let iconType = this.options[0].icon;
      this.options.forEach((item, index) => {
        if (!isNaN(iconType * 1)) {
          item.icon = index + 1;
          item.id = index;
        } else {
          let code = 'A';
          code = index + code.charCodeAt(0);
          item.icon = String.fromCharCode(code);
          item.id = index;
        }
      });
    },
    addOption() {
      this.options.push({
        icon: '',
        text: '',
        id: 0
      });
      this.refresh();
    },
    removeOption(index) {
      this.options.splice(index, 1);
      this.refresh();
      this.$emit('delete', index);
    },
    paste(index, e) {
      document.execCommand(
        'insertText',
        false,
        e.clipboardData.getData('text/plain')
      );
      let $input = $(e.srcElement);
      let optionHtml = this.tag === 'div' ? $input.html() : $input.val();
      this.setOption(index, optionHtml);
    },
    setOption(index, val) {
      this.options[index].text = val;
      this.$emit('chang', this.options);
    },
    refresh() {
      this.updateOptionIcon();
      this.$emit('chang', this.options);
    }
  },
  watch: {
    'options.length': {
      deep: true,
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          this.refresh();
        });
      }
    }
  },
  components: {
    CntModule,
    IButton,
    IIcon,
    DivInput
  }
};
</script>

<style scoped lang="stylus">
@import '../../../common/stylus/variable.styl'

.options_wrapper
  .options
    .option
      display: flex
      margin-bottom: 15px
      .code
        flex: 0 0 40px
        width: 40px
        height: 40px
        line-height: 40px
        text-align: center
        border-radius: 50%
        background-color: #EAEAEA
        margin-right: 16px
        padding: 2px
        box-sizing: border-box
        font-size: 18px
      &:hover
        .code
          border: 2px solid $bdcolor-blue-d
          padding: 0
        .text
          border-color: $bdcolor-blue-d
      .text
        flex: 1
        border: 1px solid #ccc
        padding: 0 10px
      .icon
        flex: 0 0 40px
        width: 40px
        height: 40px
        margin-left: 10px
        text-align: center
        color: #aaa
        font-size: 36px
        display: none
        &:hover
          color: #666
      &:hover .icon
        display: inline-block
  .add_option
    width: 106px
    height: 42px
    margin-left: 80px
    font-size: 18px
</style>

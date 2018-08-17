<template>
  <div class="options_wrapper">
    <cnt-module :name="name" :desc="desc" :required="true">
      <div class="options" ref="optionsDOM">
        <div class="option" v-for="(option,index) in temp" :key="index">
          <span class="code">{{option.icon}}</span>
          <!-- tag div -->
          <ue ref="ue" class="text" v-model="option.text" v-if="tag!=='input'" @change="change"></ue>

          <!-- tag input -->
          <input type="text" class="text div_input cl_rg_hook"
                 v-else
                 v-model="option.text"
                 ref="input"
                  @change="change"
          >

          <button type="button" class="icon" @click="removeOption(index)" v-if="tag!=='input'"
                  :disabled="hasAdd && temp.length<3">
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
import Ue from 'base/ueditor/ueditor';
import CntModule from 'components/general-part/cnt-module/cnt-module';

import IButton from 'iview/src/components/button';
import IIcon from 'iview/src/components/icon';
import $ from 'jquery';

export default {
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
    tag: {
      type: String,
      default: 'div'
    },
    options: Array
  },
  model: {
    prop: 'options',
    event: 'change'
  },
  data() {
    return {
      temp: []
    };
  },
  mounted() {
    this.temp = $.extend(true, [], this.options);
  },
  computed: {
    valid() {
      let _arr = [];
      for (let i = 0; i < this.temp.length; i++) {
        let text = this.temp[i].text.trim();
        if (text === '') return false;
        if (_arr.indexOf(text) !== -1) return false;
        _arr.push(text);
      }
      return true;
    }
  },
  methods: {
    updateOptionIcon() {
      if (this.temp.length < 1) return;
      let iconType = this.temp[0].icon;
      this.temp.forEach((item, index) => {
        if (!isNaN(iconType * 1)) {
          item.icon = index + 1;
        } else {
          let code = 'A';
          code = index + code.charCodeAt(0);
          item.icon = String.fromCharCode(code);
        }
      });
    },
    addOption(index) {
      if (typeof index === 'number') {
        this.temp.splice(index, 0, {
          icon: '',
          text: ''
        });
      } else {
        this.temp.push({
          icon: '',
          text: ''
        });
      }
      this.$nextTick(() => {
        this.refresh();
      });
    },
    removeOption(index) {
      if ({}.toString.call(index) === '[object Array]') {
        let i = 0;
        index.forEach(item => {
          this.temp.splice(item - i, 1);
          i++;
        });
      } else if (typeof index === 'number') {
        this.temp.splice(index, 1);
      }
      this.$nextTick(() => {
        this.refresh();
      });
    },
    refresh() {
      // 手动更新icon
      this.updateOptionIcon();
      // 手动更新text;
      if (this.tag !== 'input') {
        this.temp.forEach((item, index) => {
          // 需要等待ue加载
          this.$refs.ue[index].setContent(item.text);
        });
      } else {
        this.temp.forEach((item, index) => {
          this.$refs.input.value = item.text;
        });
      }
      this.change();
    },
    change() {
      this.$emit('change', this.temp);
    }
  },
  components: {
    CntModule,
    IButton,
    IIcon,
    Ue
  }
};
</script>

<style scoped lang="stylus">
@import '../../../common/stylus/variable.styl'

.options_wrapper
  .options
    padding: 10px
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
        width: 752px
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

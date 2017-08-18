<template>
  <div class="options_wrapper">
    <cnt-module :name="name" :desc="desc" :isMandatory="true">
      <div class="options" ref="optionsDOM">
        <div class="option" v-for="(option,index) in options">
          <span class="code">{{option.icon}}</span>
          <!-- tag div -->
          <div class="text div_input"
               contenteditable="true"
               ref="selectDOM"
               @input.lazy="setOption(index,$event)"
               @blur="test"
               v-if="tag==='div'"
          ></div>

          <!-- tag input -->
          <input type="text" class="text div_input"
                 v-else-if="tag==='input'"
                 ref="selectDOM"
                 @input.lazy="setOption(index,$event)"
                 @blur="test"
          >
<!-- class="icon-trash"-->
          <button type="button" class="icon" @click="removeOption(index)"
                  :disabled="hasAdd && options.length<3">
            <i-icon type="trash-a"></i-icon>
          </button>
        </div>
        <i-button v-if="hasAdd" type="primary" shape="circle" class="add_option" @click="addOption">
          <!--<span class="icon-plus"></span>-->
          <i-icon type="android-add" size="20"></i-icon>
          <span class="text">选项</span>
        </i-button>
      </div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';

  import IButton from 'iview/src/components/button';
  import IIcon from 'iview/src/components/icon';
  import $ from 'expose-loader?$!jquery';

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
        isPass: false
      };
    },
    mounted() {
      setTimeout(() => {
        this.refreshOption();
      }, 20);
    },
    methods: {
      updateOptionIcon: function () {
        if (this.options.length < 1) return;
        let iconType = this.options[0].icon;
        if (!isNaN(iconType * 1)) {
          this.options.forEach((item, index) => {
            item.icon = index + 1;
            item.id = index;
          });
        } else {
          this.options.forEach((item, index) => {
            let code = 'A';
            code = index + code.charCodeAt(0);
            item.icon = String.fromCharCode(code);
            item.id = index;
          });
          console.log(this.options);
        }
        this.refreshOption();
      },
      addOption: function () {
        this.options.push({
          icon: 'A',
          text: '',
          id: 0
        });
        this.updateOptionIcon();
      },
//      按index 下标删除
      removeOption: function (index, isPropagate) {
        this.options.splice(index, 1);
        this.updateOptionIcon();
        if (!isPropagate) {
          this.$emit('delete', index);
        }
      },
      setOption: function (index, event) {
        let optionHtml = this.tag === 'div' ? event.srcElement.innerHTML : event.srcElement.value;
        this.options[index].text = optionHtml;
        this.test();
      },
      refreshOption: function () {
        setTimeout(() => {
          $(this.$refs.optionsDOM).children('.option').each((index, item) => {
            $(item).children('.text').html(this.options[index].text);
          });
        }, 20);
      },
      setIsPass: function () {
        for (let i = 0; i < this.$refs.selectDOM.length; i++) {
          if (this.tag === 'div') {
            if (this.$refs.selectDOM[i].innerHTML.trim() === '') return false;
          } else {
            if (this.$refs.selectDOM[i].value.trim() === '') return false;
          }
        }
        return true;
      },
      test: function () {
        this.isPass = this.setIsPass();
        this.$emit('on-test');
      }
    },
    components: {
      CntModule,
      IButton,
      IIcon
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
          background-color: #EAEAEA;
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
          line-height: 40px
          padding: 0 10px;
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

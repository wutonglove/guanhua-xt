<template>
  <div class="options_wrapper">
    <cnt-module name="答案" :isMandatory="true">
      <div class="options" ref="optionsDOM">
        <div class="option" v-for="(option,index) in $store.state[questionType].questionContent[questionCode].options">
          <span class="code">{{option.icon}}</span>
          <!-- 如果是选择题  用div -->
          <div class="text div_input"
               contenteditable="true"
               @input.lazy="setOption(index,$event)"
               @blur="$store.dispatch('saveSelection')"
          ></div>
          <!-- 如果是填空题用input -->
          <!--<input v-else-->
                 <!--type="text" class="text div_input"-->
                 <!--@change="setOption(index,$event)"-->
                 <!--@blur="$store.dispatch('saveSelection')"-->
                 <!--v-html="option.text"-->
          <!--/>-->
          <!-- hasAdd 可以判断是否是 天空题 -->
          <button type="button" class="icon-trash" @click="removeOption(index)" :disabled="hasAdd && options.length<3"></button>
        </div>
        <Button v-if="hasAdd" type="primary" shape="circle" class="add_option" @click="addOption">
          <span class="icon-plus"></span>
          <span class="text">选项</span>
        </Button>
      </div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';
  import Checkbox from 'iview/src/components/checkbox';

  export default {
    props:{
      hasAdd:{
        type: Boolean,
        default: true
      }
    },
    data(){
      return {
        questionType:this.$store.state.questionType,
        questionCode:this.$store.state.questionCode
      };
    },
    mounted() {
      setTimeout(() => {
        this.refreshOption();
      }, 20);
    },
    computed: {
      options() {
        return this.$store.state[this.questionType].questionContent[this.questionCode].options;
      }
    },
    methods: {
      refreshOption() {
        let options = this.$store.state[this.questionType].questionContent[this.questionCode].options;
        let optionsDOM = this.$refs.optionsDOM.getElementsByClassName('div_input');
        options.forEach((item, index) => {
          optionsDOM[index].innerHTML = item.text;
        });
      },
      setOption(index, event) {
        this.$store.state[this.questionType].questionContent[this.questionCode].options[index].text = event.srcElement.innerHTML;
      },
      addOption() {
        let options = this.$store.state[this.questionType].questionContent[this.questionCode].options;
        options.push({
          icon: options[0].icon,
          text: options[0].text,
          id:0
        });
        options[options.length - 1].text = '';
        this.$store.commit('updateOptionIcon');
      },
      removeOption(index) {
        this.$store.state[this.questionType].questionContent[this.questionCode].options.splice(index, 1);
        this.$store.commit('updateOptionIcon');
        this.refreshOption();
      }
    },
    watch:{
      options:{
        deep: true,
        handler(){
          this.$store.dispatch('test');
        }
      }
    },
    components: {
      CntModule
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
            border-color:$bdcolor-blue-d
        .text
          flex: 1
          border: 1px solid #ccc
          line-height: 40px
          padding: 0 10px;
        .icon-trash
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
        &:hover .icon-trash
          display: inline-block
    .add_option
      width: 106px
      height: 42px
      margin-left: 80px
      font-size: 18px
</style>

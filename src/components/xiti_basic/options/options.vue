<template>
  <div class="options_wrapper">
    <cnt-module name="选项" :isMandatory="true">
      <div class="options">
        <div class="option" v-for="option in data">
          <span class="code">{{option.icon}}</span>
          <div class="text div_input" contenteditable="true" v-html="option.text"></div>
          <span class="del_btn"></span>
        </div>
        <button type="button" class="add_option">
          <span class="icon-plus"></span>
          <span class="text">选项</span>
        </button>
      </div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module'
  export default {
    props:{
      data:{
        type: Array
      }
    },
    components: {
      CntModule
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../assets/stylus/variable.styl'
  .options_wrapper
    .options
      .option
        display: flex
        margin-bottom: 15px
        .code
          flex:0 0 40px
          width: 40px
          height: 40px
          line-height: 40px
          text-align: center
          border-radius: 50%
          background-color: #EAEAEA;
          margin-right: 16px
          padding:2px
          box-sizing:border-box
          font-size: 18px
        &:hover .code
            border:2px solid $bdcolor-blue-d
            padding:0
        .text
          flex:1
          border: 1px solid #ccc
          line-height: 40px
          padding:0 10px;
        .del_btn
          flex:0 0 40px
          width: 40px
          height: 40px
          display: none
        &:hover .del_btn
          display: inline-block
    .add_option
      display: block
      width: 106px
      height: 42px
      line-height: 42px
      margin-left: 80px
      border-radius: 21px
      text-align: center
      background-color: $background-blue-d
      font-size: 18px
      color: #fff
</style>

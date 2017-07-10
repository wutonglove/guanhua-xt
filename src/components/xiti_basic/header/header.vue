<template>
  <div class="header">
    <div class="header_wrapper">
      <div class="text_wrapper clear">
        <ul class="tool_wrapper clear" v-for="btns in txtBtns">
          <li class="tool_btn" v-for="btn in btns.list">
            <span :class="btn.icon"></span>
          </li>
        </ul>
      </div>
      <div class="file_wrapper">
        <div class="file_btn" v-for="btn in fileBtns">
          <span class="icon" :class="btn.icon"></span>
          <span class="name">{{btn.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TextTool from 'components/xiti_basic/textTool/textTool';
  import TextBtns from 'assets/json/text_tool.json';
  import FileBtns from 'assets/json/insert_file_btn.json';

  export default {
    data() {
      return {
        txtBtns: TextBtns,
        fileBtns: FileBtns
      }
    },
    components: {
      'text-tool': TextTool
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../assets/stylus/variable.styl'
  @import '../../../assets/stylus/mixin.styl'

  .header
    width: 100%
    position: fixed
    top:0
    left: 0
    background-color:$background-blue
    border-bottom:1px solid $bdcolor-blue
    .header_wrapper
      $fixedWidth()
      height: 90px
      display: flex
      padding:15px 0 10px
      box-sizing:border-box
      .text_wrapper
        flex:0 0 375px
        width: 375px
        color:#666;
        .tool_wrapper
          float: left
          height: 100%
          font-size: 0
          line-height: 25px
          border-right: 1px solid #ccc
          .tool_btn
            display: inline-block
            vertical-align:top
            width:25px
            height: 25px
            font-size: 16px
            text-align: center
            padding:5px
          &:first-child
            width:190px
          &:nth-child(2)
            width: 110px
          &:nth-child(3)
            width: 35px
          &:nth-child(4)
            width: 35px
      .file_wrapper
        flex:1
        font-size: 0
        display: flex
        .file_btn
          display: inline-block
          flex:1
          height: 100%
          font-size: 16px
          border-right: 1px solid #ccc
          text-align: center
          .icon
            display: block
            width: 100%
            font-size: 35px
            color: $background-blue-d
            margin-bottom: 10px

</style>

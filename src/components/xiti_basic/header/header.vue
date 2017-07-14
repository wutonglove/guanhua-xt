<template>
  <div class="header">
    <div class="header_wrapper">
      <div class="text_wrapper clear">
        <ul class="tool_wrapper clear" v-for="btns in txtBtns">
          <li class="tool_btn" v-for="btn in btns.list" @click.stop.prevent="execute(btn.role,btn.type)">
            <!-- 前景色 颜色选择 start-->
            <color-picker
              v-model="fontColor"
              v-if="btn.role === 'fontColor'"
              @change="ecFontColor">
              <span :class="btn.icon" ></span>
            </color-picker> <!-- end -->
            <!-- 背景色 颜色选择  start-->
            <color-picker
              v-model="bgColor"
              v-else-if="btn.role === 'bgkColor'"
              @change="ecBgColor">
              <span :class="btn.icon" ></span>
            </color-picker> <!-- end -->
            <!-- 字号 -->
            <select v-else-if="btn.role === 'FontSize'" @change="ecFsz($event)">
              <option :value="index+1" v-for="(size,index) in btn.content">{{size}}</option>
            </select>
            <span :class="btn.icon" v-else></span>
          </li>
        </ul>
      </div>
      <div class="file_wrapper">
        <div class="file_btn"  v-for="btn in fileBtns">
          <div class="file_btn_content" v-if="btn.role==='img'" @click="test">
            <span class="icon" :class="btn.icon"></span>
            <span class="name">{{btn.name}}</span>
          </div>
          <div class="file_btn_content" v-else>
            <span class="icon" :class="btn.icon"></span>
            <span class="name">{{btn.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TextTool from 'components/xiti_basic/textTool/textTool';
  import ColorPicker from 'components/xiti_basic/colorPicker/colorPicker';
  import TextBtns from 'common/json/text_tool.json';
  import FileBtns from 'common/json/insert_file_btn.json';

  export default {
    data() {
      return {
        txtBtns: TextBtns,
        fileBtns: FileBtns,
        fontColor: 'red',
        bgColor: 'blue'
      };
    },
    methods: {
      execute: function(role, type) {
        if (type) return;

        this.$store.dispatch('restoreSelection').then(() => {
//          console.log(role);
          document.execCommand(role, false, null);
        });
      },
      ecFontColor: function(color) {
        document.execCommand('ForeColor', false, color);
      },
      ecBgColor: function(color) {
        document.execCommand('BackColor', false, color);
      },
      ecFsz: function(event) {
        let size = event.srcElement.value;
        console.log(size);
        document.execCommand('FontSize', false, size);
      },
      test(){
        this.$store.state.fileDialog = true;
        console.log(1);
      }
    },
    components: {
      TextTool,
      ColorPicker
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../common/stylus/variable.styl'
  @import '../../../common/stylus/mixin.styl'

  .header
    width: 100%
    position: fixed
    top: 0
    left: 0
    background-color: $background-blue
    border-bottom: 1px solid $bdcolor-blue
    .header_wrapper
      $fixedWidth()
      height: 90px
      display: flex
      padding: 15px 0 10px
      box-sizing: border-box
      .text_wrapper
        flex: 0 0 375px
        width: 375px
        color: #666;
        .tool_wrapper
          float: left
          height: 100%
          font-size: 0
          line-height: 25px
          border-right: 1px solid #ccc
          &:first-child
            .tool_btn:last-child
              width:46px
          .tool_btn
            display: inline-block
            vertical-align: top
            width: 23px
            height: 23px
            line-height: 25px
            font-size: 16px
            text-align: center
            margin: 5px
            border-radius: 5px
            select
              width: 100%
              height: 100%
              vertical-align: top
            &:hover
              background-color: #C1DEE8
            .icon-pencil
              font-size: 20px
            .icon-pencil-square
              font-size: 26px
          &:first-child
            width: 190px
          &:nth-child(2)
            width: 110px
          &:nth-child(3)
            width: 35px
          &:nth-child(4)
            width: 35px
      .file_wrapper
        flex: 1
        font-size: 0
        display: flex
        .file_btn
          display: inline-block
          flex: 1
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

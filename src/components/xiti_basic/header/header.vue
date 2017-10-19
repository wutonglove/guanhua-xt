<template>
  <div class="header">
    <div class="header_wrapper">
      <div class="text_wrapper clear">
        <ul class="tool_wrapper clear" v-for="btns in txtBtns">
          <li class="tool_btn" v-for="btn in btns.list">
            <i-tooltip :content="btn.name">
              <!-- 前景色 颜色选择 start-->
              <color-picker
                v-model="fontColor"
                v-if="btn.role === 'fontColor'"
                @change="ecFontColor"
              >
                <span :class="btn.icon"></span>
              </color-picker> <!-- end -->
              <!-- 背景色 颜色选择  start-->
              <color-picker
                v-model="bgColor"
                v-else-if="btn.role === 'bgkColor'"
                @change="ecBgColor"
              >
                <span :class="btn.icon"></span>
              </color-picker> <!-- end -->
              <!-- 字号 -->
              <i-select v-model="fontSize" v-else-if="btn.role === 'FontSize'" size="small" @on-change="ecFsz">
                <i-option :value="index+1" v-for="(size, index) in btn.content" :key="index">{{ size }}</i-option>
              </i-select>
              <span :class="_btnSpanCls(btn)" v-else @click.stop.prevent="execute(btn.role,btn.type)"></span>
            </i-tooltip>
          </li>
        </ul>
      </div>
      <div class="file_wrapper">
        <div class="file_btn" v-for="btn in fileBtns">
          <div class="file_btn_content" v-if="btn.role!=='formula'" @click="showFileDialog(btn)">
            <span class="icon" :class="btn.icon"></span>
            <span class="name">{{btn.name}}</span>
          </div>
          <div class="file_btn_content" v-else @click="showFormula">
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
  import ISelect from 'iview/src/components/select/select';
  import IOption from 'iview/src/components/select/option';
  import ITooltip from 'iview/src/components/tooltip/tooltip';

  import {mapActions, mapMutations} from 'vuex';
  import $ from 'expose-loader?$!jquery';

  export default {
    data() {
      return {
        txtBtns: TextBtns,
        fileBtns: FileBtns,
        fontSize: 3,
        bgColor: 'white',
        fontColor: 'black'
      };
    },
    created() {
      $(document).on('mouseup', () => {
        setTimeout(() => {
          this._initTxtBtnState();
        }, 20);
      });
    },
    methods: {
      execute: function (role, type) {
        if (type) return;
        this.resetSelection().then(() => {
          document.execCommand(role, false, null);
        });
      },
      ecFontColor: function (color) {
        this.resetSelection().then(() => {
          document.execCommand('ForeColor', false, this.fontColor);
          this.fontColor = 'black';
        });
      },
      ecBgColor: function (color) {
        this.resetSelection().then(() => {
          document.execCommand('BackColor', false, this.bgColor);
          this.bgColor = 'white';
        });
      },
      ecFsz: function () {
        this.resetSelection().then(() => {
          document.execCommand('FontSize', false, this.fontSize);
          this.fontSize = 3;
        });
      },
      showFileDialog: function (btn) {
        let name;
        let type = btn.role;
        let status = true;
        switch (btn.role) {
          case 'image':
            name = '插入图片';
            break;
          case 'video':
            name = '插入视频';
            break;
          case 'audio':
            name = '插入音频';
            break;
        }
        this.setFileDia({
          name,
          type,
          status
        });
      },
      showFormula() {
        this.setFormula(true);
      },
      _btnSpanCls(btn) {
        return `${btn.icon} ${btn.state === 'on' ? 'active' : ''}`;
      },
      _initTxtBtnState() {
        for (let j = 0; j < this.txtBtns[0].list.length; j++) {
          let btn = this.txtBtns[0].list[j];
          if (document.queryCommandState(btn.role)) {
            btn.state = 'on';
          } else {
            btn.state = 'off';
          }
        }
      },
      ...mapActions({
        resetSelection: 'resetSelection'
      }),
      ...mapMutations({
        setFileDia: 'SET_FILEDIALOGINFO',
        setFormula: 'SET_FORMULADIALOG'
      })
    },
    components: {
      TextTool,
      ColorPicker,
      ISelect,
      IOption,
      ITooltip
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
    z-index: 10
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
              width: 60px
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
            position: relative
            span
              display: inline-block
              width: 23px
              height: 23px
              border-radius: 5px
              &.active
                background-color: #97d5ea
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

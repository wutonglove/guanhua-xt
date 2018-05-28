<template>
  <div class="header">
    <div class="header_wrapper" @mousedown.stop="hdClkHandler">
      <div class="text_wrapper clear">
        <ul class="tool_wrapper clear" v-for="(btns,index) in txtBtns" :key="index">
          <li class="tool_btn" v-for="(btn,i) in btns.list"  :key="i">
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
              <span :class="btnSpanCls(btn)" v-else-if="btn.role === 'insertTable'"
                    @click.stop.prevent="exInsertTb"></span>
              <span :class="btnSpanCls(btn)" v-else @click.stop.prevent="execute(btn.role,btn.type)"></span>
            </i-tooltip>
          </li>
        </ul>
      </div>
      <div class="file_wrapper">
        <div class="file_btn" v-for="(btn,index) in fileBtns" :key="index">
          <div class="file_btn_content" @click="showInDialog(btn)">
            <i-icon class="icon" :type="btn.icon"></i-icon>
            <span class="name">{{btn.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <i-modal
      v-model="tableInserting"
      title="插入表格"
      @on-ok="insertTable"
      class="insert_tb_md"
    >
      <div slot="header" class="title">插入表格</div>
      <span class="tab_op">
        行： <i-input-number :max="10" :min=1 v-model="table.r"></i-input-number>
        列： <i-input-number :max="10" :min=1 v-model="table.c"></i-input-number>
      </span>
    </i-modal>
  </div>
</template>

<script>
import ColorPicker from 'components/general-part/colorPicker/colorPicker';
import ISelect from 'iview/src/components/select/select';
import IOption from 'iview/src/components/select/option';
import ITooltip from 'iview/src/components/tooltip/tooltip';
import IIcon from 'iview/src/components/icon';
import IModal from 'iview/src/components/modal';
import IInputNumber from 'iview/src/components/input-number';

import { EDIT_TEXT_BTNS, IN_FILE_BTNS } from 'common/js/config';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import $ from 'jquery';

export default {
  data() {
    return {
      txtBtns: EDIT_TEXT_BTNS,
      fileBtns: IN_FILE_BTNS,
      fontSize: 3,
      bgColor: 'white',
      fontColor: 'black',
      tableInserting: false,
      table: {
        r: 3,
        c: 2
      }
    };
  },
  created() {
    $(document).on('mouseup', '.cl_rg_hook', e => {
      setTimeout(() => {
        this.initTxtBtnState();
      }, 20);
    });
  },
  computed: {
    ...mapGetters(['currentRange'])
  },
  methods: {
    hdClkHandler() {
      this.setDivChgAble(false);
    },
    execute: function(role, type) {
      if (type) return;
      this.resetSelection().then(() => {
        document.execCommand(role, false, null);
      });
    },
    ecFontColor: function(color) {
      this.resetSelection().then(() => {
        document.execCommand('ForeColor', false, this.fontColor);
        this.fontColor = 'black';
      });
    },
    ecBgColor: function(color) {
      this.resetSelection().then(() => {
        document.execCommand('BackColor', false, this.bgColor);
        this.bgColor = 'white';
      });
    },
    ecFsz: function() {
      if (this.currentRange && !this.currentRange.toString()) return;
      this.resetSelection().then(() => {
        document.execCommand('FontSize', false, this.fontSize);
        // this.fontSize = 3;
      });
    },
    exInsertTb() {
      this.tableInserting = true;
    },
    insertTable() {
      let html = '<table contenteditable="false">';

      for (let i = 0; i < this.table.r; i++) {
        html += '<tr>';
        for (let j = 0; j < this.table.c; j++) {
          html +=
            '<td contenteditable="true" style="text-align:center;vertical-align:middle;min-width:100px;height:30px;border:1px solid #ccc;"></td>';
        }
        html += '</tr>';
      }
      html += '</table>';

      document.execCommand('InsertHTML', false, html);
    },
    showInDialog: function(btn) {
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
        case 'formula':
          this.setFormula(status);
          return;
      }
      this.setFileDia({
        name,
        type,
        status
      });
    },
    btnSpanCls(btn) {
      return `${btn.icon} ${btn.state === 'on' ? 'active' : ''}`;
    },
    initTxtBtnState() {
      for (let j = 0; j < this.txtBtns[0].list.length; j++) {
        let btn = this.txtBtns[0].list[j];
        if (document.queryCommandState(btn.role)) {
          btn.state = 'on';
        } else {
          btn.state = 'off';
        }
      }
      this.fontSize = document.queryCommandValue('FontSize') * 1;
    },
    ...mapActions({
      resetSelection: 'resetSelection'
    }),
    ...mapMutations({
      setFileDia: 'SET_FILEDIALOGINFO',
      setFormula: 'SET_FORMULADIALOG',
      setDivChgAble: 'SET_DIVCHGABLE'
    })
  },
  components: {
    ColorPicker,
    ISelect,
    IOption,
    ITooltip,
    IIcon,
    IModal,
    IInputNumber
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
      color: #666
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
        .file_btn_content
          margin: 0 10px
          padding: 10px 0
          margin-top: -10px
          cursor: pointer
          &:hover
            background-color: #6CBAE4
            border-radius: 4px
            .icon, .name
              color: #fff
          .icon
            display: block
            width: 100%
            font-size: 35px
            color: $background-blue-d
            margin-bottom: 10px
.insert_tb_md
  .title
    padding: 15px 0 15px 20px
</style>

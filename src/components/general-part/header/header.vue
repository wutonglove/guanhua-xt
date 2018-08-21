<template>
  <div class="header">
    <div class="header_wrapper">
      <div class="text_wrapper clear">
        <ul class="tool_wrapper clear" v-for="(btns,index) in txtBtns" :key="index">
          <li class="tool_btn" v-for="(btn,i) in btns.list"  :key="i">
            <i-tooltip :content="btn.name">
              <!-- 前景色 颜色选择 start-->
              <color-picker
                v-model="forecolor"
                v-if="btn.role === 'forecolor'"
                @change="ecFontColor"
              >
                <span class="on" :class="btn.icon"></span>
              </color-picker> <!-- end -->
              <!-- 背景色 颜色选择  start-->
              <color-picker
                v-model="backcolor"
                v-else-if="btn.role === 'backcolor'"
                @change="ecBgColor"
              >
                <span :class="btn.icon"></span>
              </color-picker> <!-- end -->
              <!-- 字号 -->
              <i-select v-model="fontsize" v-else-if="btn.role === 'fontsize'" size="small" @on-change="ecFsz">
                <i-option :value="size" v-for="(size, index) in btn.content" :key="index">{{ size }}</i-option>
              </i-select>
              <!-- 表格 -->
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
import { mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      txtBtns: EDIT_TEXT_BTNS,
      fileBtns: IN_FILE_BTNS,
      fontsize: '16px',
      forecolor: '#000',
      backcolor: '#fff',
      isDisable: false,
      tableInserting: false,
      table: {
        r: 3,
        c: 2
      }
    };
  },
  computed: {
    editor() {
      /* eslint-disable no-undef */
      return UM.getEditor(this.editorId);
    },
    ...mapGetters(['currentRange', 'editorId'])
  },
  methods: {
    initBtnState() {
      for (var i = 0; i < 2; i++) {
        this.txtBtns[i].list.forEach((item, index) => {
          if (!item.type) {
            item.state =
              this.editor.queryCommandState(item.role) === 1 ? 'on' : 'off';
          }
        });
      }
      this.txtBtns[0].list.forEach((item, index) => {
        if (!item.type) {
          item.state =
            this.editor.queryCommandState(item.role) === 1 ? 'on' : 'off';
        }
      });
      this.forecolor = this.editor.queryCommandValue('forecolor') || '#000';
      this.backcolor = this.editor.queryCommandValue('backcolor') || '#fff';
      this.fontsize = this.editor.queryCommandValue('fontsize') || '16px';
    },
    execute: function(role, type) {
      if (!this.editor || type) return;
      this.editor.execCommand(role);
    },
    ecFontColor: function(color) {
      if (!this.editor) return;
      this.editor.execCommand('forecolor', color);
    },
    ecBgColor: function(color) {
      if (!this.editor) return;
      this.editor.execCommand('BackColor', color);
    },
    ecFsz: function(size) {
      if (!this.editor) return;
      this.editor.execCommand('FontSize', size);
    },
    exInsertTb() {
      this.tableInserting = true;
    },
    insertTable() {
      if (!this.editor) return;
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

      this.editor.execCommand('inserthtml', html);
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
      return `${btn.icon} ${btn.state}`;
    },
    ...mapMutations({
      setFileDia: 'SET_FILEDIALOGINFO',
      setFormula: 'SET_FORMULADIALOG'
    })
  },
  watch: {
    editorId(now, old) {
      if (now === old) return;
      this.$nextTick(() => {
        this.editor.addListener('afterSelectionChange', () => {
          this.initBtnState();
        });
      });
    }
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
            &.on
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

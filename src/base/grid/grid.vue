<template>
  <div class="grid" @mouseup.stop>
    <div class="ctrl_btn_wrap_t" v-if="mode==='edit'">
      <div class="btn_box" v-for="(btn,index) in rCtrlBtn" ref="tdCtrl">
        <a href="javasctipt:void(0)" class="del_btn" v-show="index>=config.c" @click="delC(index)">
          <i-icon type="close-round" color="red" :size="12"></i-icon>
        </a>
      </div>
    </div>
    <div class="tr" v-for="(tr,r) in table">
      <div class="td"
           :class="{'selecting':td.selecting,'hover':td.hover}"
           v-for="(td,c) in tr"
           ref="td"
           @mousedown="selectStart({r,c})"
           @mousemove.stop="selectMove({r,c})"
           @mouseup="selectEnd({r,c})"
           @mouseover="over({r,c})"
           @mouseout="out"
           @touchstart="touchStart({r,c}, $event)"
           @touchmove="touchMove($event)"
           @touchend="touchEnd({r,c})"
      >
        <num-tag
          class="tag"
          v-if="td.tagShow"
          :text="td.tagCode+''"
          :ori="td.tagOri"
        ></num-tag>
        <input class="input"
               v-if="isEdit"
               v-model="td.text"
               :id="`gridInput-${r}-${c}`"
               @input="input({tr,r,c})"
               @keyup.37="keyleft(r,c)"
               @keyup.38="keytop(r,c)"
               @keyup.39="keyright(r,c)"
               @keyup.40="keydown(r,c)"
               @keydown.8="backspace(r, c, $event)"
        />
        <span class="text"
              v-else
              v-text="td.text"
        ></span>
      </div>
    </div>
    <div class="ctrl_btn_wrap_r" v-if="mode==='edit'">
      <div class="btn_box" v-for="(btn,index) in cCtrlBtn" ref="trCtrl">
        <a href="javasctipt:void(0)" class="del_btn" v-show="index>=config.r" @click="delR(index)">
          <i-icon type="close-round" color="red" :size="12"></i-icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import IIcon from 'iview/src/components/icon';
  import NumTag from 'components/template1-part/num-tag/num-tag';
  import Notice from 'iview/src/components/notice';
  import {createGrid} from 'common/js/class';
  //  import $ from 'expose-loader?$!jquery';

  export default {
    props: {
      tableData: {
        type: Array
      },
      mode: {
        type: String,
        default: 'edit'
      }
    },
    data() {
      return {
        config: {
          r: 5,
          c: 5,
          maxWidth: 300,
          maxHeight: 300,
          maxR: 10,
          maxC: 10
        },
        table: [],
        tdWidth: 0,
        options: [],
        pos: {
          selecting: false,
          selectOrient: '',
          curR: 0,
          curC: 0,
          curX: 0,
          curY: 0
        },
        optionsObj: []
      };
    },
    computed: {
      isEdit() {
        return this.mode === 'edit';
      },
      rCtrlBtn() {
        let arr = [];
        if (this.table[0]) {
          for (let i = 0; i < this.table[0].length; i++) {
            arr.push('');
          }
        }
        return arr;
      },
      cCtrlBtn() {
        let arr = [];
        if (this.table.length > 0) {
          for (let i = 0; i < this.table.length; i++) {
            arr.push('');
          }
        }
        return arr;
      }
    },
    mounted() {
      this.$nextTick(() => {
        document.body.onmouseup = () => {
          this.initPos();
          this.initSelecting();
        };
        if (this.mode === 'show') {
          this.table = this.tableData;
        } else {
          this._initTable();
        }
      });
    },
    methods: {
      input({tr, r, c}) {
        // 输入事件
        let NO_CN = /[^\u4E00-\u9FA5]/g;
        let str = tr[c].text.replace(NO_CN, ''); // 将非中文替换
        let n = (c + str.length) - (this.table[0].length);
        if (n > 0) {
          this.addC(n);
        }
        tr[c].text = str[0] || ''; // 极限：没有一个中文时
        for (let i = 0; i < str.length; i++) {
          tr[c + i].text = str[i];
        }
      },
      keydown(r, c) {
        if (r === this.table.length - 1) {
          this.addR();
        } else {
          let _r = r > this.config.maxR - 1 ? r : r + 1;
          let idName = `gridInput-${_r}-${c}`;
          document.getElementById(idName).focus();
        }
      },
      keytop(r, c) {
        let _r = r > 1 ? r - 1 : 0;
        let idName = `gridInput-${_r}-${c}`;
        document.getElementById(idName).focus();
      },
      keyleft(r, c) {
        let _c = c > 1 ? c - 1 : 0;
        let idName = `gridInput-${r}-${_c}`;
        document.getElementById(idName).focus();
      },
      keyright(r, c) {
        if (c === this.table[0].length - 1) {
          this.addC(1);
        } else {
          let _c = c > this.config.maxC - 1 ? c : c + 1;
          let idName = `gridInput-${r}-${_c}`;
          document.getElementById(idName).focus();
        }
      },
      backspace(r, c, e) {
        let str = this.table[r][c].getText();
        if (str.trim() === '') {
          this.keyleft(r, c);
          e.preventDefault();
        }
      },
      addC(n) {
        for (let i = 0; i < n; i++) {
          if (this.table[0].length < this.config.maxC) {
            for (let r = 0; r < this.table.length; r++) {
              this.table[r].push(createGrid());
            }
          }
        }
      },
      addR() {
        let arr = [];
        if (this.table.length >= this.config.maxR) return;
        for (let c = 0; c < this.table[0].length; c++) {
          arr.push(createGrid());
        }
        this.table.push(arr);
      },
      delC(index) {
        for (let r = 0; r < this.table.length; r++) {
          this.table[r].splice(index, 1);
        }
      },
      delR(index) {
        this.table.splice(index, 1);
      },
      selectStart({r, c}) {
        this.pos = Object.assign({}, this.pos, {
          selecting: true,
          selectOrient: '',
          curR: r,
          curC: c
        });
      },
      selectMove({r, c}) {
        if (this.pos.selecting) {
          let _c = c - this.pos.curC + 1;
          let _r = r - this.pos.curR + 1;

          this.initSelecting();

          this.table[this.pos.curR][this.pos.curC].selecting = true;
          if (_c > 1) {
            this.pos.selectOrient = 'x';
            for (let i = 1; i < _c; i++) {
              let grid = this.table[this.pos.curR][i + this.pos.curC];
              if (grid.getText() === '') return;
              grid.selecting = true;
            }
          } else if (_r > 1) {
            this.pos.selectOrient = 'y';
            for (let i = 0; i < _r; i++) {
              let grid = this.table[i + this.pos.curR][this.pos.curC];
              if (grid.getText() === '') return;
              grid.selecting = true;
            }
          }
        }
      },
      selectEnd({r, c}) {
        let _c = c - this.pos.curC + 1;
        let _r = r - this.pos.curR + 1;

        if (_c > 1) {
          let bol = this.chooseable({
            ori: 'x',
            r: this.pos.curR,
            c: this.pos.curC,
            n: _c
          });
          if (bol) {
            this.showMessage('答案设置不合理：同一行/列的答案不能有重叠！');
            return;
          }
          for (let i = 0; i < _c; i++) {
            let grid = this.table[this.pos.curR][i + this.pos.curC];
            if (grid.getText() === '') return;
            grid.setCode(this.options.length);
            grid.setDisable('x', true);
            if (i === 0) {
              grid.setTagOri('right');
            }
          }
        } else if (_r > 1) {
          let bol = this.chooseable({
            ori: 'y',
            r: this.pos.curR,
            c: this.pos.curC,
            n: _r
          });
          if (bol) {
            this.showMessage('答案设置不合理：同一行/列的答案不能有重叠！');
            return;
          }
          for (let i = 0; i < _r; i++) {
            let grid = this.table[i + this.pos.curR][this.pos.curC];
            if (grid.getText() === '') return;
            grid.setCode(this.options.length);
            grid.setDisable('y', true);
            if (i === 0) {
              grid.setTagOri('down');
            }
          }
        } else {
          this.initPos();
          return;
        }

        this.initPos();
        this.addOption();
        this.initSelecting();
        this.refreshOptions();
        console.log(this.optionsObj);
      },
      touchStart({r, c}, e) {
        console.log('touch start');
        this.selectStart({r, c});
        this.pos.curX = Math.abs(e.touches[0].pageX - this.tdWidth / 2);
        this.pos.curY = Math.abs(e.touches[0].pageY - this.tdWidth / 2);
      },
      touchMove(e) {
        console.log('touch move');
        let rn = Math.trunc((e.touches[0].pageY - this.pos.curY) / this.tdWidth);
        let cn = Math.trunc((e.touches[0].pageX - this.pos.curX) / this.tdWidth);
        let r = this.pos.curR + rn;
        let c = this.pos.curC + cn;
        this.selectMove({r, c});
      },
      touchEnd() {
        console.log('touch end');
      },
      over({r, c}) {
        let codes = this.table[r][c].code;
        codes.forEach((code) => {
          let arr = this.table.slice();
          arr.forEach((item) => {
            item.forEach((grid) => {
              if (grid.code.indexOf(code) !== -1) {
                grid.hover = true;
              }
            });
          });
          this.table = arr;
        });
      },
      out() {
        this.table.forEach((item) => {
          item.forEach((grid) => {
            grid.hover = false;
          });
        });
      },
      delCodeItem(code) {
        this.optionsObj[code].forEach((item, index) => {
          if (index === 0) item.setTagShow(false);
          let i = item.code.indexOf(code);
          item.code.splice(i, 1);
        });
        this.refreshOptions();
      },
      initPos() {
        this.pos = Object.assign({}, this.pos, {
          selecting: false,
          selectOrient: '',
          curR: 0,
          curC: 0,
          curX: 0,
          curY: 0
        });
      },
      initSelecting() {
        this.table.forEach((item) => {
          item.forEach((grid) => {
            grid.selecting = false;
          });
        });
      },
      addOption() {
        let str = '';
        let arr = [];
        this.table.forEach((item) => {
          item.forEach((grid) => {
            if (grid.selecting) {
              str += grid.text;
              arr.push(grid);
            }
          });
        });
        this.options.push(str);
        this.optionsObj.push(arr);
        console.log(this.options, this.table);
      },
      refreshOptions() {
        this.optionsObj.forEach((item, index) => {
          item[0].tagCode = index + 1;
          item[0].setTagShow(true);
        });
      },
      showMessage(desc) {
        Notice.destroy();
        Notice.error({
          desc
        });
      },
      chooseable({ori, r, c, n}) {
        for (let i = 0; i < n; i++) {
          if (ori === 'x') {
            if (this.table[r][c + i].disableX) return 1;
          } else if (ori === 'y') {
            if (this.table[r + i][c].disableY) return 1;
          }
        }
        return 0;
      },
      fillRandom() {
        this.table.forEach((item, index) => {
          item.forEach((grid, i) => {
            if (grid.text.trim() === '') {
              grid.text = this.getRandom();
            }
          });
        });
      },
      getRandom() {
        return String.fromCharCode(Math.round(Math.random() * 20901) + 19968);
      },
      _initTable(rn = this.config.r, cn = this.config.c) {
        console.log(rn, cn);
        for (let r = 0; r < rn; r++) {
          this.table.push([]);
          for (let c = 0; c < cn; c++) {
            this.table[r].push(createGrid());
          }
        }
      },
      _calcWidth() {
        if (this.table.length < 1) return;
        let width = this.config.maxWidth / this.table[0].length;
        let height = this.config.maxHeight / this.table.length;
        width = Math.max(30, Math.min(width, height, 50));
        this.tdWidth = width;
      },
      _initGird() {
        this.$nextTick(() => {
          this.$refs.td.forEach((item, index) => {
            item.style.width = `${this.tdWidth}px`;
            item.style.height = `${this.tdWidth}px`;
            item.style.lineHeight = `${this.tdWidth}px`;
          });
          if (this.$refs.tdCtrl) {
            this.$refs.tdCtrl.forEach((item, index) => {
              item.style.width = `${this.tdWidth}px`;
              item.style.height = `${this.tdWidth}px`;
            });
          }
          if (this.$refs.trCtrl) {
            this.$refs.trCtrl.forEach((item, index) => {
              item.style.width = `${this.tdWidth}px`;
              item.style.height = `${this.tdWidth}px`;
            });
          }
        });
      }
    },
    watch: {
      table: {
        deep: true,
        handler(newVal) {
          this._calcWidth();
          this._initGird();
        }
      },
      options: {
        deep: true,
        handler(newVal) {
          this.$emit('op-change', newVal);
        }
      }
    },
    components: {
      IIcon,
      NumTag,
      Notice
    }
  };
</script>

<style scoped lang="stylus">
  .grid
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    border-right: 1px solid #9D876B
    border-bottom: 1px solid #9D876B
    background-color: #FEF9E7
    font-size: 0
    .ctrl_btn_wrap_t
      position: absolute
      left: 0
      top: 0
      transform: translateY(-100%)
      width: 100%
      .btn_box
        display: inline-block
        text-align: center
        position: relative
        .del_btn
          display: inline-block
          width: 24px
          height: 24px
          position: absolute
          left: 50%
          top: 50%
          transform: translate(-50%, -50%);
          line-height: 29px
          background: #fdfbfa;
          border: 1px solid #dcbc85;
          border-radius: 100%;
          box-shadow: 0 2px 5px 1px #a47737;
    .ctrl_btn_wrap_r
      position: absolute
      right: 0
      top: 0
      bottom: 0
      transform: translateX(100%)
      .btn_box
        text-align: center
        position: relative
        .del_btn
          display: inline-block
          width: 24px
          height: 24px
          position: absolute
          left: 50%
          top: 50%
          transform: translate(-50%, -50%);
          line-height: 29px
          background: #fdfbfa;
          border: 1px solid #dcbc85;
          border-radius: 100%;
          box-shadow: 0 2px 5px 1px #a47737;
    .tr
      font-size: 0
      white-space: nowrap
      .td
        display: inline-block
        border-left: 1px solid #9D876B
        border-top: 1px solid #9D876B
        text-align: center
        font-size: 0
        overflow: hidden
        position: relative
        &.selecting
          background-color: #F1E0C4
        &.hover
          background-color: #F1F0C5
        .tag
          position: absolute
          top: 2px
          left: 2px
        .input
          display: block
          border: none
          width: 100%
          height: 100%
          font-size: 18px
          text-align: center
          background: none
          &:focus
            font-size: 24px
            font-weight: 800
            background-color: #F1C374
        .text
          display: inline-block
          width: 100%
          height: 100%
          font-size: 18px
</style>

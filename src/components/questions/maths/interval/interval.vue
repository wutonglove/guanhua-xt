<template>
  <mboard :mboard="mboard">
    <div id="interval">
      <header class="title_wrap">
        <h2 class="main_title">填写一个区间或区间运算式</h2>
        <span class="sub_title">支持-20——20的整数</span>
      </header>
      <line1></line1>
      <content class="content_wrap">
        <div class="interval_item" v-for="(interval,index) in intervalList">
          <span class="brackets" v-if="interval.bracketsLf">(</span>
          <a href="javascript:void(0)"
             class="symbol"
             v-if="interval.symbol"
             @click="changeSymbol(index)"
          >
            {{interval.symbol}}
          </a>
          <div class="interval_wrap">
            <div class="val_nm val_lf">
              <a class="brackets_small"
                 @click="changeInclude(index,'min')"
                 herf="javascript:void(0)"
              >
                {{interval.min.include ? '[' : '('}}
              </a>
              <input type="number" v-model="interval.min.num" placeholder="-∞" @input="input">
            </div>
            ,
            <div class="val_nm val_rt">
              <input type="number" v-model="interval.max.num" placeholder="+∞" @input="input">
              <a class="brackets_small"
                 @click="changeInclude(index,'max')"
                 herf="javascript:void(0)"
              >
                {{interval.max.include ? ']' : ')'}}
              </a>
            </div>
            <div class="del_btn" v-show="intervalList.length>1" @click="del(index)">
              <i-icon type="ios-trash"></i-icon>
            </div>
          </div>
          <span class="brackets" v-if="interval.bracketsRt">)</span>
        </div>
        <a class="add_btn_wrap" href="javascript:void(0)" v-show="intervalList.length<3" @click="add">
          <i-icon type="plus-circled" size="22"></i-icon>
          <span class="text">添加</span>
        </a>
      </content>
      <line1></line1>
      <footer class="nmb_axis_wrap">
        <div class="show_btn_box">
          <tem1-btn class="btn" @click="showAxis">数轴预览</tem1-btn>
        </div>
        <canvas class="show_box" ref="canvasBox" :width="canvas.w" :height="canvas.h"></canvas>
      </footer>
    </div>
    <!--<button typ="button" @click="test"-->
    style="position:absolute;top:200px;left:200px;width:100px;font-size:20px;z-index:10000">test
    </button>
  </mboard>
</template>

<script>
  import {tem1ComMixin} from 'common/js/mixin';
  import Line1 from 'components/template1-part/line1/line1';
  import Tem1Btn from 'components/template1-part/template1-btn/template1-btn';
  import Notice from 'iview/src/components/notice';
  import IIcon from 'iview/src/components/icon';

  const _PI = Math.PI;
  const A_COLOR = '#57330C';
  const R_COLOR = '#CD241F';
  const M_L_W = 4;
  const overMin = {
    num: -21,
    include: true
  };
  const overMax = {
    num: 21,
    include: true
  };
  class AxisInterval {
    constructor() {
      this.symbol = '';
      this.bracketsLf = false;
      this.bracketsRt = false;
      this.min = {
        num: '',
        include: false
      };
      this.max = {
        num: '',
        include: false
      };
    }
  }

  export default {
    mixins: [tem1ComMixin],
    mounted() {
      this.$nextTick(() => {
        this.$canvas = this.$refs.canvasBox;
        this.ctx = this.$canvas.getContext('2d');
        this.drawBG();
      });
    },
    data() {
      return {
        intervalList: [new AxisInterval()],
        canvas: {
          w: 820,
          h: 180,
          r: 11,
          c: 46
        },
        axisRange: [-20, 20]
      };
    },
    computed: {
      grid() {
        return {
          w: this.canvas.w / this.canvas.c,
          h: this.canvas.h / this.canvas.r
        };
      },
      axisAll() {
        return {
          startX: this.grid.w,
          endX: this.canvas.w - this.grid.w
        };
      },
      axisReal() {
        return {
          startX: this.grid.w * 3,
          endX: this.canvas.w - this.grid.w * 3
        };
      },
      axisY() {
        return this.canvas.h / 2;
      },
      range() {
        let intervals = [];
        let symbols = [];
        this.intervalList.forEach((item, index) => {
          symbols.push(item.symbol);
          intervals.push([
            item.min.num === '' ? overMin : item.min,
            item.max.num === '' ? overMax : item.max
          ]);
        });
        return this.clacInter(intervals, symbols);
      }
    },
    methods: {
      drawBG() {
        const canvas = this.$canvas;
        const ctx = this.ctx;
        let ctxw = canvas.width;
        let ctxh = canvas.height;
        let _h = this.grid.h;

        for (let r = 0; r < this.canvas.r - 1; r++) {
          let h = _h * (r + 1);
          ctx.beginPath();
          ctx.moveTo(0, h);
          ctx.lineTo(ctxw, h);
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = 'rgba(255,255,255,0.5)';
          ctx.stroke();
        }
        let _w = this.grid.w;
        for (let c = 0; c < this.canvas.c - 1; c++) {
          let w = _w * (c + 1);
          ctx.beginPath();
          ctx.moveTo(w, 0);
          ctx.lineTo(w, ctxh);
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = 'rgba(255,255,255,0.5)';
          ctx.stroke();
        }
      },
      drawAxis() {
        const ctx = this.ctx;
        let startX = this.axisAll.startX;
        let startY = this.axisY;
        let endX = this.axisAll.endX;
        let endY = startY;
        ctx.beginPath();
        // 主轴
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineTo(endX - 14, endY - 14);
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - 14, endY + 14);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = M_L_W;
        ctx.strokeStyle = A_COLOR;
        ctx.stroke();
        // 节点
        let _x = this.axisReal.startX;
        let _y = startY;
        let startN = this.axisRange[0];
        for (let i = 0; i <= 40; i++) {
          let curX = _x + i * this.grid.w;
          ctx.beginPath();
          ctx.strokeStyle = A_COLOR;
          if (i % 5 === 0) {
            ctx.moveTo(curX, _y - this.grid.h * 0.5);
            ctx.lineTo(curX, _y + this.grid.h * 0.5);
            ctx.lineWidth = M_L_W;
            ctx.stroke();
            // 数字标注
            ctx.font = "bold 16px '微软雅黑'";
            ctx.textAlign = 'center';
            ctx.fillStyle = A_COLOR;
            ctx.fillText(startN + i, curX, _y + this.grid.h * 2);
          } else {
            ctx.moveTo(curX, _y - this.grid.h * 0.3);
            ctx.lineTo(curX, _y);
            ctx.lineWidth = M_L_W * 0.7;
            ctx.stroke();
          }
        }
        // 圆点
        let oriX = (endX - startX) / 2 + startX;
        let oriY = startY;
        ctx.beginPath();
        ctx.moveTo(oriX, oriY);
        ctx.arc(oriX, oriY, 4, 0, _PI * 2);
        ctx.strokeStyle = A_COLOR;
        ctx.stroke();
      },
      drawRange(range) {
        let _x1 = this.calcPos(range[0].num);
        let _y1 = this.axisY;
        let fillState1 = range[0].include;
        let _x2 = this.calcPos(range[1].num);
        let _y2 = _y1;
        let fillState2 = range[1].include;
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(_x1, _y1);
        ctx.lineTo(_x2, _y2);
        ctx.lineWidth = M_L_W;
        ctx.strokeStyle = R_COLOR;
        ctx.stroke();
        if (+range[0].num < -20) {
          this.drawArr(_x1, _y1, 'l');
        } else {
          this.drawDot(_x1, _y1, fillState1);
        }
        if (+range[1].num > 20) {
          this.drawArr(_x2, _y2, 'r');
        } else {
          this.drawDot(_x2, _y2, fillState2);
        }
      },
      drawDot(x, y, fill) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, _PI * 2);
        ctx.fillStyle = fill ? R_COLOR : '#fff';
        ctx.strokeStyle = R_COLOR;
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();
      },
      drawArr(x, y, dir) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - this.grid.h * 0.3);
        ctx.lineTo(dir === 'r' ? x + this.grid.w * 0.6 : x - this.grid.w * 0.6, y);
        ctx.lineTo(x, y + this.grid.h * 0.3);
        ctx.closePath();
        ctx.fillStyle = R_COLOR;
        ctx.strokeStyle = R_COLOR;
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();
      },
      showAxis() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.w, this.canvas.h);
        this.drawBG();
        this.drawAxis();
        if (Object.prototype.toString.call(this.range) === '[object Array]') {
          this.range.forEach((item, index) => {
            this.drawRange(item);
          });
        }
      },
      calcPos(num) {
        if (num === '-∞') {
          return this.axisReal.startX - this.grid.w;
        } else if (num === '+∞') {
          return this.axisReal.endX + this.grid.w;
        }
        return (num - this.axisRange[0]) * this.grid.w + this.axisReal.startX;
      },
      neatenInter() {
        let l = this.intervalList.length;
        if (l > 2) {
          this.intervalList.forEach((item, index) => {
            if (index === 0) {
              item.bracketsLf = true;
              item.bracketsRt = false;
            } else {
              item.symbol = '∪';
              if (index === 1) {
                item.bracketsLf = false;
                item.bracketsRt = true;
              } else {
                item.bracketsLf = false;
                item.bracketsRt = false;
              }
            }
          });
        } else if (l < 2) {
          this.intervalList[0].symbol = '';
          this.intervalList[0].bracketsLf = false;
          this.intervalList[0].bracketsRt = false;
        } else {
          this.intervalList.forEach((item, index) => {
            item.bracketsLf = false;
            item.bracketsRt = false;
            item.symbol = index === 1 ? '∪' : '';
          });
        }
      },
      clacInter(intervals, symbols) {
        intervals.sort((a, b) => {
          if (a[0].num !== b[0].num) {
            return a[0].num - b[0].num;
          } else {
            return a[1].num - b[1].num;
          }
        });
        let ans = [];
        let len = intervals.length;
        let start, end;
        for (var i = 0; i < len; i++) {
          let s = intervals[i][0];
          let e = intervals[i][1];
          let symbol = symbols[i];
          if (start === undefined) {
            start = s;
            end = e;
          } else {
            if (symbol === '∪') {
              // 1,14 2,5
              if (+s.num < +end.num || (s.num === end.num && (s.include || end.include))) {
                end = Math.max(e.num, end.num) === +e.num ? e : end;
              } else {
                var part = [start, end];
                ans.push(part);
                start = s;
                end = e;
              }
            } else {
              if (+s.num < +end.num || (s.num === end.num && (s.include && end.include))) {
                start = Math.max(s.num, start.num) === s.num ? s : start;
                end = Math.min(e.num, end.num) === +e.num ? e : end;
              } else {
                return 'Ø';
              }
            }
          }
        }
        if (start !== undefined) {
          ans.push([start, end]);
        }
        return ans;
      },
      // 事件
      input(e) {
        Notice.destroy();
        let val = e.target.value;
        let valStr = val.toString();

        if (/[^0-9-]/g.test(valStr) || +val < -20 || +val > 20) {
          Notice.warning({
            desc: '请输入-20到20之间的整数'
          });
        }
      },
      add() {
        this.intervalList.push(new AxisInterval());
        this.neatenInter();
      },
      del(index) {
        this.intervalList.splice(index, 1);
        this.neatenInter();
      },
      changeInclude(index, role) {
        this.intervalList[index][role].include = !this.intervalList[index][role].include;
      },
      changeSymbol(index) {
        this.intervalList[index].symbol = this.intervalList[index].symbol === '∪' ? '∩' : '∪';
      },
      // 保存
      getQuestionData() {
        let questionData = {
          title: document.title,
          intervals: this.intervalList,
          answer: this.range,
          questionType: 'interval'
        };
        let localData = questionData;
        return {
          questionData,
          localData
        };
      },
      verifyHandle() {
        let intervals = this.intervalList;
        let len = intervals.length;
        for (let i = 0; i < len; i++) {
          if (+intervals[i].min.num > +intervals[i].max.num) {
            return -1;
          }
          let _max = Math.max(Math.abs(intervals[i].min.num), Math.abs(intervals[i].max.num));

          if (_max > 20 || isNaN(_max)) {
            return -2;
          }
        }
        return 1;
      },
      showMessage() {
        let res = this.verifyHandle();
        let desc = '';
        if (res === 1) {
          return 1;
        } else if (res === -1) {
          desc = '区间左端点不能大于右端点';
        } else if (res === -2) {
          desc = '请输入-20到20之间的整数';
        }
        Notice.destroy();
        Notice.warning({
          desc
        });
        return 0;
      }
    },
    watch: {
      intervalList: {
        deep: true,
        handler(newVal) {
          newVal.forEach((item) => {
            if (item.min.num > item.max.num) {
              Notice.warning({
                desc: '区间左端点不能大于右端点'
              });
            }
          });
        }
      }
    },
    components: {
      Line1,
      Tem1Btn,
      Notice,
      IIcon
    }
  };
</script>

<style scoped lang="stylus">
  #interval
    width: 100%
    height: 100%
    padding: 0 10px
    display: flex
    flex-direction: column
    .title_wrap
      flex: 0 0 80px
      height: 80px
      text-align: center
      color: #3e2200
      .main_title
        font-size: 20px
        line-height: 30px
        margin: 15px 0
      .sub_title
        font-size: 14px
    .content_wrap
      flex: 0 0 90px
      height: 90px
      display: flex
      justify-content: center
      align-items: center
      color: #6D410A
      .interval_item
        display: inline-block
        display: flex
        .brackets
          flex: 0 0 20px
          font-size: 48px
          color: #936222
          margin: 0 10px
        .symbol
          flex: 0 0 27px
          height: 52px
          border: 1px solid #F5CA92
          background: linear-gradient(to top, #DBA45C, #F2C07F)
          border-radius: 6px
          text-align: center
          line-height: 52px
          color: #216BD2
          font-weight: 800
          font-size: 24px
          margin: 0 10px
        .interval_wrap
          flex: 0 0 210px
          width: 210px
          height: 54px
          background-color: #deb47c
          padding: 10px 20px
          border: 1px solid #6D410A
          border-radius: 6px
          line-height: 54px
          font-size: 20px
          display: flex
          position: relative
          .val_nm
            flex: 0 0 72px
            width: 72px
            height: 34px
            border: 1px solid #6D410A
            border-radius: 5px
            display: flex
            margin: 0 5px
            overflow: hidden
            .brackets_small
              flex: 0 0 20px
              width: 20px
              height: 100%
              line-height: 30px
              text-align: center
              background-color: #f1be7c
              color: #E1501C
              font-size: 19px
              font-weight: 800
            input
              flex: 1
              width: 50px
              height: 100%
              border: none
              font-size: 18px
              box-shadow: 0 0 2px 0 #B99C77 inset
              padding: 0 3px
              text-align: center
              color: #6C4B24
              appearance: none
          .del_btn
            position: absolute
            right: 1px
            top: 1px
            width: 24px
            height: 22px
            color: #fff
            background-color: #FF9B30
            border-bottom-left-radius: 6px
            border-top-right-radius: 6px
            line-height: 22px
            text-align: center
            display: none
          &:hover
            .del_btn
              display: block
      .add_btn_wrap
        margin-left: 20px
        cursor: pointer
        color: #926836
        width: 32px
        text-align: center
        :hover
          color: #76542A
    .nmb_axis_wrap
      flex: 1
      display: flex
      flex-direction: column
      .show_btn_box
        flex: 0 0 60px
        height: 60px
        text-align: center
        .btn
          font-size: 18px
          font-weight: 500
          padding: 8px 20px
          margin-top: 10px
      .show_box
        border-radius: 10px
        border: 1px solid rgba(255, 255, 255, .2)
</style>

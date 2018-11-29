<template>
  <div id="interval" @mouseup="touchEnd" @touchend="touchEnd">
    <line1></line1>
    <div class="interval_formula">
      <span class="text" v-html="interval"></span>
    </div>
    <line1></line1>
    <div class="axis_wrap" @touchmove="touchMove" @mousemove="touchMove">
      <canvas class="axis_box" ref="canvasBox" :width="canvas.w" :height="canvas.h"></canvas>
      <svg class="axis_inter" ref="interval"
           xmlns="http://www.w3.org/2000/svg"
           :width="canvas.w"
           :height="grid.h"
           :style="`top:${axisY+3}px`"
           @touchstart="touchStart"
           @mousedown="touchStart"
      >
        <g v-for="(inter,index) in axisInter"
           :fill="inter.select?'#FBE798':'#CB1F1F'"
           stroke-width="3"
           :stroke="inter.select?'#FBE798':'#CB1F1F'"
           @click.stop.prevent="selectG(index)"
        >
          <line stroke-width="6"
                :x1="inter.interval[0].x"
                :y1="grid.h / 2"
                :x2="inter.interval[1].x"
                :y2="grid.h / 2"
                v-show="inter.interval[0].isShow"
          ></line>
          <circle v-for="(item,code) in inter.interval"
                  r="5"
                  :cx="item.x"
                  :cy="grid.h / 2"
                  :fill="item.include?'':'#fff'"
                  v-show="item.isShow"
                  @touchstart="dragPoint(index,code)"
                  @mousedown="dragPoint(index,code)"
                  @click.stop.prevent="changeInclude(index, code)"
                  v-if="item.x>grid.w*2.1 && item.x<grid.w*(canvas.c-2)"
          ></circle>
          <g v-else-if="item.x<=grid.w*2"
             :style="`transform:translate(${item.x}px,${grid.h*.25}px)`"
             @touchstart="dragPoint(index,code)"
             @mousedown="dragPoint(index,code)"
          >
            <polygon :points="`-${grid.w*.75},${grid.h*.25} ${0},${0} ${0},${grid.h*.5}`"
            />
          </g>
          <g v-else-if="item.x>=grid.w*(canvas.c-2)"
             :style="`transform:translate(${item.x}px,${grid.h*.25}px)`"
             @touchstart="dragPoint(index,code)"
             @mousedown="dragPoint(index,code)"
          >
            <polygon :points="`${grid.w*.75},${grid.h*.25} ${0},${0} ${0},${grid.h*.5}`"
            />
          </g>
        </g>
      </svg>
    </div>
    <div class="other_btns_wrap">
      <i-checkbox v-model="isEmptySet">空集（Ø）</i-checkbox>
      <tem1-btn class="btn" @click="del">删除区间</tem1-btn>
      <i-poptip placement="top-end" class="instructions">
        <tem1-btn class="btn">操作说明</tem1-btn>
        <div slot="title" class="title"></div>
        <div slot="content" class="content">
          <ul class="desc_list">
            <li class="desc_item">
              1.在数轴上点击选中区域的端点，可以切换开区间（空心点）和闭区间（实心点）
            </li>
            <li class="desc_item">
              2.若结果为空集，只需点选页面上的空集选项，不需要在数轴上进行操作
            </li>
            <li class="dex_item">
              3.将选中区域的端点拖动至±20，即表示正（负）无穷大
            </li>
          </ul>
        </div>
      </i-poptip>
    </div>
  </div>
</template>

<script>
import { submitMixin } from 'common/js/mixin';
import Line1 from 'components/template1-part/line1/line1';
import Tem1Btn from 'components/template1-part/template1-btn/template1-btn';
import ICheckbox from 'iview/src/components/checkbox';
import IPoptip from 'iview/src/components/poptip';
import Notice from 'iview/src/components/notice';

import $ from 'jquery';

const _PI = Math.PI;
const A_COLOR = '#57330C';
const M_L_W = 3;

export default {
  mixins: [submitMixin],
  data() {
    return {
      isEmptySet: false,
      canvas: {
        w: 680,
        h: 182,
        r: 11,
        c: 46
      },
      axisRange: [-20, 20],
      startX: 0,
      drawState: false,
      mouseDownTime: 0,
      axisInter: [],
      gCode: 0,
      pCode: 1
    };
  },
  computed: {
    interval() {
      let str = '';
      this.questionData.intervals.forEach(item => {
        str += `
          ${item.bracketsLf ? '<strong>(</strong>' : ''}
          ${item.symbol}
          ${item.min.include ? '[' : '('}
          ${item.min.num === '' ? '-∞' : item.min.num},
          ${item.max.num === '' ? '+∞' : item.max.num}
          ${item.max.include ? ']' : ')'}
          ${item.bracketsRt ? '<strong>)</strong>' : ''}
          `;
      });
      return str;
    },
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
    offset() {
      return $(this.$refs.interval).offset();
    },
    answer() {
      return this.questionData.answer;
    },
    curG() {
      return this.gCode > -1 ? this.axisInter[this.gCode] : null;
    },
    arrInterval() {
      let res = [];
      for (let i = 0; i < this.axisInter.length; i++) {
        let num1 = {
          num: this.xToNum(this.axisInter[i].interval[0].x),
          include: this.axisInter[i].interval[0].include
        };
        let num2 = {
          num: this.xToNum(this.axisInter[i].interval[1].x),
          include: this.axisInter[i].interval[1].include
        };
        res.push(
          [num1, num2].sort((a, b) => {
            return a.num - b.num;
          })
        );
      }
      return res;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.ctx = this.$refs.canvasBox.getContext('2d');
      this.drawBG();
      this.drawAxis();
      let _self = this;
      $(document).on('click', function(e) {
        _self.drawEnd();
        _self.axisInter.forEach(item => {
          item.select = false;
        });
      });
    },
    drawBG() {
      const ctx = this.ctx;
      let ctxw = this.$refs.canvasBox.width;
      let ctxh = this.$refs.canvasBox.height;
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
      ctx.lineTo(endX - 10, endY - 10);
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - 10, endY + 10);
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
      // 0点
      let oriX = (endX - startX) / 2 + startX;
      let oriY = startY;
      ctx.beginPath();
      ctx.moveTo(oriX, oriY);
      ctx.arc(oriX, oriY, 3, 0, _PI * 2);
      ctx.strokeStyle = A_COLOR;
      ctx.stroke();
    },
    drawStart(x) {
      this.axisInter.push({
        select: false,
        interval: [
          {
            x: x,
            include: true,
            isShow: false
          },
          {
            x: x,
            include: true,
            isShow: true
          }
        ]
      });
      this.gCode = this.axisInter.length - 1;
      this.drawState = true;
    },
    drawEnd() {
      if (this.curG) {
        let offset = Math.abs(
          this.curG.interval[0].x - this.curG.interval[1].x
        );
        if (offset < this.grid.w) {
          this.curG.interval[0].isShow = false;
        }
      }
      this.drawState = false;
      this.pCode = 1;
      this.gCode = -1;
    },
    dragPoint(index, code) {
      this.$nextTick(() => {
        this.gCode = index;
        this.pCode = code;
        if (this.curG) this.curG.interval[0].isShow = true;
        this.drawState = true;
      });
    },
    changeInclude(index, code) {
      this.gCode = index;
      this.pCode = code;
      if (this.curG) {
        this.curG.interval[code].include = !this.curG.interval[code].include;
      }
    },
    selectG(index) {
      this.gCode = index;
      if (this.curG) this.curG.select = !this.curG.select;
    },
    touchStart(e) {
      this.mouseDownTime = new Date();
      let _e = e;
      if (_e.type === 'touchstart') _e = e.touches[0];
      let x = this.xFilter(_e.clientX - this.offset.left);
      if (this.hasInter(x)) return;
      this.drawStart(x);
    },
    touchMove(e) {
      if (this.drawState && new Date() - this.mouseDownTime > 100) {
        let _e = e;
        if (_e.type === 'touchmove') _e = e.touches[0];
        if (this.curG) {
          let x = this.xFilter(_e.clientX - this.offset.left);
          this.curG.interval[0].isShow = true;
          this.curG.interval[this.pCode].x = x;
        }
      }
    },
    touchEnd() {
      this.drawEnd();
      this.mouseDownTime = 0;
    },
    del() {
      let num = 0;
      this.axisInter = this.axisInter.filter(item => {
        if (item.select) {
          num++;
        }
        return !item.select;
      });
      if (num < 1) {
        Notice.warning({
          desc: '当前选择区间为空，请先点击区间选择想要删除的区间！'
        });
      }
    },
    // 判断 x 位置是否存在 区间
    hasInter(x) {
      for (let i = 0; i < this.axisInter.length; i++) {
        let n1 = this.axisInter[i].interval[0];
        let n2 = this.axisInter[i].interval[1];
        let arr = [n1.x, n2.x].sort((a, b) => {
          return a - b;
        });
        if (x >= arr[0] && x <= arr[1]) {
          return true;
        }
      }
      return false;
    },
    xFilter(x) {
      let min = this.grid.w * 2;
      let max = this.canvas.w - this.grid.w * 2;
      let resX = Math.round(x / this.grid.w) * this.grid.w;
      resX = Math.min(Math.max(resX, min), max);
      return resX;
    },
    xToNum(x) {
      let num;
      num = x / this.grid.w - this.canvas.c / 2;
      return num;
    },
    getResult() {
      if (this.answer !== 'Ø') {
        if (this.axisInter.length === 0) return -1;
        if (this.axisInter.length !== this.answer.length) return 0;
        if (this.getAnswer()) return 1;
      } else if (this.isEmptySet) {
        if (this.axisInter.length === 0) return 1;
      } else {
        if (this.axisInter.length === 0) return -1;
      }
      return 0;
    },
    getAnswer() {
      let sortRule = (a, b) => {
        return a[0].num - b[0].num;
      };
      let arr1 = this.answer.sort(sortRule);
      let arr2 = this.arrInterval.sort(sortRule);
      for (let m = 0; m < arr1.length; m++) {
        for (let n = 0; n < arr1[m].length; n++) {
          if (
            arr1[m][n].num * 1 !== arr2[m][n].num * 1 ||
            arr1[m][n].include !== arr2[m][n].include
          ) {
            return false;
          }
        }
      }
      return true;
    }
  },
  components: {
    Line1,
    Tem1Btn,
    ICheckbox,
    IPoptip
  }
};
</script>

<style lang="stylus">
#interval
  padding: 30px 15px 8px
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  .interval_formula
    width: 100%
    flex: 2
    position: relative
    .text
      text-align: center
      width: 100%
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      font-size: 36px
      strong
        font-weight: 800
        color: #B5802D
  .axis_wrap
    flex: 5
    min-height: 196px
    padding: 10px 10px 0
    position: relative
    .axis_box
      border: 1px solid #F1DFC2
      border-radius: 6px
      background-color: rgba(0, 0, 0, 0.1)
      position: absolute
      top: 10px
      left: 50%
      transform: translateX(-50%)
      z-index: 10
    .axis_inter
      position: absolute
      top: 0
      left: 50%
      z-index: 11
      transform: translateX(-50%)
  .other_btns_wrap
    flex: 0 0 35px
    height: 35px
    line-height: 35px
    padding: 0 15px
    position: relative
    .btn
      right: 0
      line-height: 20px
    .instructions
      position: absolute
      right: 15px
      .ivu-poptip-inner
        white-space: normal
      .content
        width: 375px
        height: 200px
        overflow: hidden
        .desc_list
          width: 100%
          height: 100%
          padding: 3px 5px
          font-size: 16px
          .desc_item
            width: 100%
            margin: 0 4px
</style>

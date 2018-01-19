<template>
  <div id="interval">
    <line1></line1>
    <div class="interval_formula">
      <span class="text" v-html="interval"></span>
    </div>
    <line1></line1>
    <div class="axis_wrap">
      <canvas class="axis_box" ref="canvasBox" :width="canvas.w" :height="canvas.h"></canvas>
    </div>
    <div class="other_btns_wrap">
      <i-checkbox v-model="isEmptySet">空集（Ø）</i-checkbox>
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
  import {submitMixin} from 'common/js/mixin';
  import Line1 from 'components/template1-part/line1/line1';
  import Tem1Btn from 'components/template1-part/template1-btn/template1-btn';
  import ICheckbox from 'iview/src/components/checkbox';
  import IPoptip from 'iview/src/components/poptip';

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
        axisRange: [-20, 20]
      };
    },
    computed: {
      interval() {
        let str = '';
        this.questionData.intervals.forEach((item) => {
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
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$canvas = this.$refs.canvasBox;
        this.ctx = this.$canvas.getContext('2d');
        this.drawBG();
        this.drawAxis();
      });
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
      getResult() {
        return -1;
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
    padding: 40px 15px 8px
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
      padding: 10px 10px 0
      .axis_box
        border: 1px solid #F1DFC2
        border-radius: 6px
        background-color: rgba(0, 0, 0, .1)
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

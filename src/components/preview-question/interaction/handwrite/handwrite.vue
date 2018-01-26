<template>
  <div id="handwrite" @touchmove="move" ref="main">
    <div class="left_box">
      <div class="top_box" ref="textWrap">
        <span class="text" v-html="topic"></span>
      </div>
      <a href="javascript:void(0)" class="ctrl"
         ref="ctrl"
         @touchstart="changeStart"
      ></a>
      <div class="bom_box" ref="wrap">
        <canvas :width="board.w" :height="board.h" ref="canvas" @touchstart="drawStart" @touchmove="drawing"></canvas>
      </div>
    </div>
    <div class="right_box">
      <draw-tool class="draw_ctrl" @on-clear="clearClick" @on-change="change" ref="drawTool"></draw-tool>
    </div>
  </div>
</template>

<script>
  import LucencyBoard from 'components/template1-part/lucency-board/lucency-board';
  import DrawTool from 'components/template1-part/draw-tool/draw-tool';
  import Modal from 'iview/src/components/modal';

  import {submitMixin} from 'common/js/mixin';

  import bg from './bd_bg.jpg';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    data() {
      return {
        board: {
          w: 0,
          h: 1000
        },
        changeHSte: false,
        start: {
          x: 0,
          y: 0
        },
        box: {
          h: 0,
          b: 0,
          maxH: 0,
          minH: 90
        },
        drawSte: false,
        linecolor: '',
        linewidth: 0,
        writeState: '',
        offset: {}
      };
    },
    computed: {
      topic() {
        return this.questionData.topic;
      },
      brush() {
        return {
          color: this.linecolor,
          width: this.linewidth
        };
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.init();
        this.$refs.ctrl.style.bottom = this.$refs.wrap.offsetHeight - 15 + 'px';
      });
      document.body.onmouseup = () => {
        this.drawEnd();
        this.changeEnd();
      };
      document.body.ontouchend = () => {
        this.drawEnd();
        this.changeEnd();
      };
    },
    methods: {
      init() {
        this.initCanvas();
        this.calcOffset();
      },
      initCanvas() {
        this.board.w = this.$refs.wrap.offsetWidth - 30;
        let h = this.$refs.wrap.offsetHeight - 30;
        this.$refs.wrap.style.backgroundImage = `url(${bg})`;
        this.$refs.wrap.style.backgroundSize = `${this.board.w}px ${h}px`;
      },
      calcOffset() {
        let offset = this.$refs.wrap.getBoundingClientRect();
        this.offset.x = offset.left + 15;
        this.offset.y = offset.top + 15;
      },
      changeStart(e) {
        this.changeHSte = true;
        if (e.type === 'touchstart') {
          e = e.touches[0];
        }
        this.start.x = e.clientX;
        this.start.y = e.clientY;
        this.box.h = this.$refs.wrap.offsetHeight;
        this.box.b = Math.max(this.$refs.wrap.style.bottom, this.box.h - 15);
        this.box.maxH = this.$refs.main.offsetHeight - 80;

        if (!this.$refs.wrap.style.flex) {
          this.$refs.wrap.style.flex = 'none';
          this.$refs.wrap.style.height = this.box.h + 'px';
        }
      },
      changeEnd(e) {
        this.changeHSte = false;
      },
      changeH(offsetY) {
        this.$refs.ctrl.style.bottom = Math.min(Math.max(this.box.b - offsetY, this.box.minH - 15), this.box.maxH - 15) + 'px';
        this.$refs.wrap.style.height = Math.min(Math.max(this.box.h - offsetY, this.box.minH), this.box.maxH) + 'px';
        this.calcOffset();
      },
      move(e) {
        if (e.type === 'touchmove') {
          e = e.touches[0];
        }
        if (this.changeHSte) {
          this.changeH(e.clientY - this.start.y);
        }
      },
      drawStart(e) {
        if (e.type === 'touchstart') {
          e = e.touches[0];
          this.$refs.wrap.style.overflowY = 'hidden';
        }
        this.drawSte = true;
        this.lastX = e.x - this.offset.x;
        this.lastY = e.y - this.offset.y + this.$refs.wrap.scrollTop;
      },
      drawing(e) {
        if (this.drawSte) {
          if (e.type === 'touchmove') e = e.touches[0];
          let x = e.clientX;
          let y = e.clientY;
          let _offset = this.$refs.wrap.scrollTop;
          if (this.writeState === 'write') {
            let _x = x - this.offset.x;
            let _y = y - this.offset.y + _offset;
            this.write(_x, _y);
          } else if (this.writeState === 'eraser') {
            this.moveEraser(x, y);
            this.clearCir(x, y + _offset);
          }
        }
      },
      drawEnd() {
        this.drawSte = false;
        this.$refs.wrap.style.overflowY = 'auto';
      },
      clearClick() {
        Modal.confirm({
          content: '该操作将清空已写的全部内容，你确定要清空页面吗？',
          onOk: () => {
            this.clearAll();
          }
        });
      },
      write(x, y) {
        let ctx = this.$refs.canvas.getContext('2d');
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.strokeStyle = this.brush.color;
        ctx.lineWidth = this.brush.width;
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
        this.lastX = x;
        this.lastY = y;
      },
      clearCir(ex, ey) {
        let span = document.getElementById('eraser_mouse');
        let ctx = this.$refs.canvas.getContext('2d');

        let radius = parseInt(span.style.width) / 2;
        let x = ex - this.offset.x;
        let y = ey - this.offset.y;

        let stepClear = 1;
        while (stepClear <= radius) {
          let calcWidth = radius - stepClear;
          let calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth);

          let posX = x - calcWidth;
          let posY = y - calcHeight;

          let widthX = 2 * calcWidth;
          let heightY = 2 * calcHeight;
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(posX, posY, widthX, heightY);
          stepClear += 1;
        }
      },
      moveEraser(x, y) {
        let span = document.getElementById('eraser_mouse');

        let left = x - parseInt(span.style.width) / 2;
        let top = y - parseInt(span.style.height) / 2;

        span.style.top = `${top}px`;
        span.style.left = `${left}px`;
      },
      change(draw) {
        this.linecolor = draw.color;
        this.linewidth = draw.width;
        this.writeState = draw.state;
      },
      clearAll() {
        let ctx = this.$refs.canvas.getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
    },
    components: {
      LucencyBoard,
      DrawTool,
      Modal
    }
  };
</script>

<style scoped lang="stylus">
  #handwrite
    width: 100%
    height: 100%
    position: relative
    .left_box
      position: absolute
      top: 0
      left: 0
      right: 80px
      height: 100%
      display: flex
      flex-direction: column
      .top_box
        flex: 3
        background-color: #F1EBDE
        border: 2px solid #EAE5DA
        padding: 18px
        font-size: 22px
        color: #333
        overflow-y: auto
        .text
          display: inline-block
          width: 100%
          height: 100%
          line-height: 28px
          word-wrap: break-word
      .ctrl
        position: absolute
        z-index: 10
        left: 50%
        width: 30px
        height: 30px
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        background: linear-gradient(to top, #DBD8D1, #fff)
        &:after, &:before
          content: ''
          display: block
          position: absolute
          left: 50%
          transform: translateX(-50%)
          width: 0
          height: 0
          border: 10px solid transparent
        &:after
          top: 16px
          border-top-color: #E9C998
        &:before
          top: -8px
          border-bottom-color: #E9C998
      .bom_box
        flex: 8
        background-repeat: no-repeat
        background-color: #F6F2E8
        background-position: center
        padding: 15px
        overflow-x: hidden
        overflow-y: auto
        position: relative
        .board_wrap
          width: 100%
          height: 100%
          position: relative
          .text
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            font-size: 40px
            color: #d2cfc7
    .right_box
      position: absolute
      right: 0
      top: 0
      width: 80px
      height: 100%
      background-color: #F8E8D2
      .draw_ctrl
        margin-top: 100px
</style>

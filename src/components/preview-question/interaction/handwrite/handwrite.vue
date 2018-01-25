<template>
  <div id="handwrite" @touchmove="move">
    <div class="left_box">
      <div class="top_box">
        <span class="text" v-html="topic"></span>
      </div>
      <a href="javascript:void(0)" class="ctrl"
         ref="ctrl"
         @touchstart="changeStart"
         @touchend="changeEnd"
      ></a>
      <div class="bom_box" ref="wrap">
        <canvas :width="board.w" :height="board.h"></canvas>
      </div>
    </div>
    <div class="right_box">
      <draw-tool class="draw_ctrl"></draw-tool>
    </div>
  </div>
</template>

<script>
  import LucencyBoard from 'components/template1-part/lucency-board/lucency-board';
  import DrawTool from 'components/template1-part/draw-tool/draw-tool';
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
          b: 0
        }
      };
    },
    computed: {
      topic() {
        return this.questionData.topic;
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.init();
        this.$refs.ctrl.style.bottom = this.$refs.wrap.offsetHeight - 15 + 'px';
      });
    },
    methods: {
      init() {
        this.initCanvas();
      },
      initCanvas() {
        this.board.w = this.$refs.wrap.offsetWidth - 30;
        let h = this.$refs.wrap.offsetHeight - 30;
        this.$refs.wrap.style.backgroundImage = `url(${bg})`;
        this.$refs.wrap.style.backgroundSize = `${this.board.w}px ${h}px`;
      },
      changeStart(e) {
        this.changeHSte = true;
        this.start.x = e.touches[0].clientX;
        this.start.y = e.touches[0].clientY;
        this.box.h = this.$refs.wrap.offsetHeight;
        this.box.b = Math.max(this.$refs.wrap.style.bottom, this.box.h - 15);

        if (!this.$refs.wrap.style.flex) {
          this.$refs.wrap.style.flex = 'none';
          this.$refs.wrap.style.height = this.box.h + 'px';
        }
      },
      changeEnd(e) {
        this.changeHSte = false;
      },
      changeH(offsetY) {
        this.$refs.ctrl.style.bottom = this.box.b - offsetY + 'px';
        this.$refs.wrap.style.height = (this.box.h - offsetY) + 'px';
      },
      move(e) {
        if (this.changeHSte) {
          if (e.type === 'touchmove') {
            e = e.touches[0];
          }
          this.changeH(e.clientY - this.start.y);
        }
      }
    },
    components: {
      LucencyBoard,
      DrawTool
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

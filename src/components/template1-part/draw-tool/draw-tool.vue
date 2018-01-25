<template>
  <div class="ctrl_wrap">
    <div class="brush_ctrl">
      <i-poptip placement="left" ref="brushCtrl">
        <span class="ctrl_btn" ref="brush" @click="writeState='write'"></span>
        <div class="brush_set_wrap" slot="content">
          <ul class="brush_set_w">
            <li class="item"
                :class="{active: widthIndex===item-1}"
                v-for="item in 3"
                ref="brushWidth"
                @click="changeBrushW(item)">
              <i-icon type="checkmark-circled icon"></i-icon>
            </li>
          </ul>
          <ul class="brush_set_c">
            <li class="item"
                :class="{active: colorIndex===item-1}"
                v-for="item in 3"
                ref="brushColor"
                @click="changeBrushC(item)">
              <i-icon type="checkmark-circled icon"></i-icon>
            </li>
          </ul>
        </div>
      </i-poptip>
    </div>
    <div class="eraser_ctrl">
      <i-poptip placement="left" ref="eraserCtrl">
        <span class="ctrl_btn" ref="eraser"></span>
        <div class="eraser_set_wrap" slot="content">
          <div class="eraser_clear" @click="clear">
            <span class="icon" ref="clear"></span>
            <span class="text">一键清除</span>
          </div>
          <div class="eraser" @click="writeState='eraser'">
            <span class="icon" ref="eraserBtn"></span>
            <span class="text">橡皮</span>
          </div>
        </div>
      </i-poptip>
    </div>
  </div>
</template>

<script>
  import IPoptip from 'iview/src/components/poptip';
  import IIcon from 'iview/src/components/icon';

  import brush from './brush.png';
  import eraser from './eraser.png';
  import brushW1 from './brush_w_1.png';
  import brushW2 from './brush_w_2.png';
  import brushW3 from './brush_w_3.png';
  import eraserClear from './eraser_clear.png';
  import eraserBtn from './eraser_btn.png';
  import eraserMouse from './eraser_mouse.png';

  export default {
    data() {
      return {
        linewidth: [1, 3, 6],
        lineclolor: ['#333', '#e1e1e1', '#FF4A32'],
        colorIndex: 0,
        widthIndex: 0,
        writeState: 'write'
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.init();
        this.initEraser();
        this.change();
      });
    },
    methods: {
      init() {
        this.$refs.brush.style.backgroundImage = `url(${brush})`;
        this.$refs.eraser.style.backgroundImage = `url(${eraser})`;
        let ws = [brushW1, brushW2, brushW3];
        this.$refs.brushWidth.forEach((item, index) => {
          item.style.backgroundImage = `url(${ws[index]})`;
        });
        // 橡皮
        this.$refs.clear.style.backgroundImage = `url(${eraserClear})`;
        this.$refs.eraserBtn.style.backgroundImage = `url(${eraserBtn})`;
      },
      changeBrushW(index) {
        this.widthIndex = index - 1;
        this.change();
      },
      changeBrushC(index) {
        this.colorIndex = index - 1;
        this.change();
      },
      clear() {
        this.close();
        this.$emit('on-clear');
      },
      change() {
        this.$emit('on-change', {
          state: this.writeState,
          color: this.lineclolor[this.colorIndex],
          width: this.linewidth[this.widthIndex]
        });
        this.close();
      },
      close() {
        this.$refs.brushCtrl.handleClose();
        this.$refs.eraserCtrl.handleClose();
      },
      initEraser() {
        let span = document.getElementById('eraser_mouse');
        if (!span) {
          span = document.createElement('span');
          span.id = 'eraser_mouse';
          Object.assign(span.style, {
            display: 'none',
            width: `60px`,
            height: `60px`,
            backgroundImage: `url(${eraserMouse})`,
            backgroundSize: '100%',
            backgroundPosition: 'no-repeat',
            position: 'absolute',
            zIndex: '1000',
            left: 0,
            top: 0
          });
          document.body.appendChild(span);
        }
      }
    },
    watch: {
      writeState() {
        this.change();
      }
    },
    components: {
      IPoptip,
      IIcon
    }
  };
</script>

<style scoped lang="stylus">
  .ctrl_wrap
    width: 80px
    padding: 0 10px
    text-align: center
    .ctrl_btn
      display: block
      width: 60px
      height: 60px
      background-position: center
      background-size: 40px 40px
      background-repeat: no-repeat
      &:active
        background-color: #E7C896
    .brush_set_wrap
      background-color: #F4F1E9
      border: 4px solid #ECD6AB
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, .5)
      .brush_set_w, .brush_set_c
        padding: 5px 0
        overflow: hidden
        .item
          float: left
          width: 42px
          height: 42px
          border-radius: 50%
          background-color: #DBC096
          box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .3) inset
          margin: 0 10px
          background-size: 40px 40px
          background-repeat: no-repeat
          background-position: center
          position: relative
          border: 1px solid transparent
          &.active
            font-size: 12px
            border-color: #FF8F00
            .icon
              position: absolute
              bottom: 0
              right: 0
              color: #FF8F00
              background-color: #fff
              border-radius: 50%
              z-index: 10
      .brush_set_c
        .item
          &:after
            content: ''
            display: block
            width: 36px
            height: 36px
            border-radius: 50%
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
          &:nth-child(1):after
            background-color: #333
          &:nth-child(2):after
            background-color: #E1E1E1
          &:nth-child(3):after
            background-color: #FF4A32
    .eraser_set_wrap
      background-color: #F4F1E9
      border: 4px solid #ECD6AB
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, .5)
      font-size: 0
      padding: 0 15px
      .eraser_clear, .eraser
        width: 60px
        display: inline-block
        margin: 0 10px
        .icon
          display: block
          width: 60px
          height: 40px
          background-position: center top
          background-repeat: no-repeat
        .text
          font-size: 14px
          text-align: center
        &:active
          background-color: #E7C896
</style>

<template>
  <div class="composition">
    <i-menu class="menu" mode="vertical" theme="dark" :active-name="menuName" @on-select="changeMenuName">
      <i-menu-item name="1">查看题目</i-menu-item>
      <i-menu-item name="2">查看素材</i-menu-item>
      <i-menu-item name="3">进入书写</i-menu-item>
    </i-menu>
    <div class="menu_content" ref="content">
      <transition-group name="fade">
        <ul class="question" v-if="menuName === '1'" key="1">
          <li class="com_title">
            <span class="desc">作文题目：</span>
            <span class="content" v-html="comTitle"></span>
          </li>
          <li class="com_desc">
            <span class="desc">要求：</span>
            <span class="content" v-html="comDesc"></span>
          </li>
        </ul>
        <div class="assets" v-if="menuName === '2'" key="2">
          <i-tabs>
            <i-tab-pane :label="asset.tabTitle"
                        v-for="(asset,index) in assets"
                        :key="'asset' + index"
            >
              <div class="asset_content" spellcheck="false" v-html="asset.content"></div>
            </i-tab-pane>
          </i-tabs>
        </div>
        <div class="write" v-if="menuName === '3'" key="3" ref="write">
          <div class="title" ref="title">{{comTitle}}</div>
          <div class="page_wrap">
            <canvas ref="canvas"
                    @touchstart="touchStart"
                    @touchend="touchEnd"
                    @touchmove="touchMove"
                    @mousedown="mouseDown"
                    @mousemove="mouseMove"
                    @mouseup="mouseUp"
                    v-for="(page,index) in canvases"
                    v-show="index+1 === currPage"
            ></canvas>
            <draw-tool @on-clear="clearClick" @on-change="change" ref="drawTool"></draw-tool>
          </div>
          <div class="other">
            <i-icon type="minus-circled" class="minus" @click.native="delCurPage"></i-icon>
            <i-page ref="pageCtrl"
                    class="page_ctrl"
                    :current="currPage"
                    :total="pageTotal"
                    :page-size="1" simple
                    @on-change="changePage"
            ></i-page>
            <i-icon type="plus-circled" class="plus" @click.native="plusPage"></i-icon>
            <div class="num_words">{{pageTotal * singlepageWords}}字</div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import IMenu from 'iview/src/components/menu';
  import IMenuItem from 'iview/src/components/menu/menu-item';
  import ITabs from 'iview/src/components/tabs';
  import ITabPane from 'iview/src/components/tabs/pane';
  import IPage from 'iview/src/components/page';
  import IPoptip from 'iview/src/components/poptip';
  import IIcon from 'iview/src/components/icon';
  import Modal from 'iview/src/components/modal';
  import {submitMixin} from 'common/js/mixin';
  import DrawTool from 'components/template1-part/draw-tool/draw-tool';

  // 图
  import MI from './page_mi.png';
  import TIAN from './page_tian.png';
  import FANG from './page_fang.png';
  import LINE from './page_line.png';

  export default {
    mixins: [submitMixin],
    data() {
      return {
        menuName: '1',
        lastX: 10,
        lastY: 10,
        offset: {
          x: 0,
          y: 0
        },
        linecolor: '',
        linewidth: 0,
        writeState: 'write',
        mouseState: false,
        singlepageWords: 45,
        currPage: 1,
        canvases: [{}]
      };
    },
    computed: {
      brush() {
        return {
          color: this.linecolor,
          width: this.linewidth
        };
      },
      comTitle() {
        return this.questionData.comTitle;
      },
      comDesc() {
        return this.questionData.description;
      },
      assets() {
        return this.questionData.assets;
      },
      pageTotal() {
        return this.canvases.length;
      },
      pageBG() {
        let imgBG = {};
        switch (this.questionData.pageType) {
          case '米字格':
            imgBG = MI;
            break;
          case '方格本':
            imgBG = FANG;
            break;
          case '田字格':
            imgBG = TIAN;
            break;
          case '横线本':
            imgBG = LINE;
            break;
        }
        return imgBG;
      }
    },
    mounted() {
      document.body.onmouseup = () => {
        this.mouseState = false;
        this.end();
      };
    },
    methods: {
      changePage(page) {
        this.currPage = page;
      },
      plusPage() {
        this.canvases.push({});
        this.currPage = this.pageTotal;
        this.initCanvas(this.currPage - 1);
      },
      delCurPage() {
        this.canvases.splice(this.currPage - 1, 1);
        this.currPage = Math.min(this.currPage, this.pageTotal);
      },
      changeMenuName(name) {
        this.menuName = name;
      },
      start(x, y) {
        let _offset = this.$refs.content.scrollTop;
        this.lastX = x - this.offset.x;
        this.lastY = y - this.offset.y + _offset;
        if (this.writeState === 'eraser') {
          let span = document.getElementById('eraser_mouse');
          Object.assign(span.style, {
            display: 'block'
          });
          this.moveEraser(x, y);
          this.clearCir(x, y + _offset);
        }
        this.$refs.drawTool.close();
      },
      move(x, y) {
        let _offset = this.$refs.content.scrollTop;
        if (this.writeState === 'write') {
          let _x = x - this.offset.x;
          let _y = y - this.offset.y + _offset;
          this.write(_x, _y);
        } else if (this.writeState === 'eraser') {
          this.moveEraser(x, y);
          this.clearCir(x, y + _offset);
        }
      },
      end() {
        if (this.writeState === 'eraser') {
          let span = document.getElementById('eraser_mouse');
          Object.assign(span.style, {
            display: 'none'
          });
        }
      },
      mouseDown(e) {
        this.mouseState = true;
        this.start(e.clientX, e.clientY);
      },
      mouseMove(e) {
        if (this.mouseState) {
          this.move(e.clientX, e.clientY);
        }
      },
      mouseUp(e) {
        this.mouseState = false;
        this.end();
      },
      touchEnd() {
        this.end();
      },
      touchMove(e) {
        this.move(e.touches[0].clientX, e.touches[0].clientY);
        e.preventDefault();
        e.stopPropagation();
      },
      touchStart(e) {
        this.start(e.touches[0].clientX, e.touches[0].clientY);
      },
      clearClick() {
        Modal.confirm({
          content: '该操作将清空已写的全部内容，你确定要清空页面吗？',
          onOk: () => {
            this.clearAll();
          }
        });
      },
      change(draw) {
        this.linecolor = draw.color;
        this.linewidth = draw.width;
        this.writeState = draw.state;
      },
      moveEraser(x, y) {
        let span = document.getElementById('eraser_mouse');

        let left = x - parseInt(span.style.width) / 2;
        let top = y - parseInt(span.style.height) / 2;

        span.style.top = `${top}px`;
        span.style.left = `${left}px`;
      },
      clearCir(ex, ey) {
        let span = document.getElementById('eraser_mouse');
        let ctx = this.$refs.canvas[this.currPage - 1].getContext('2d');

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
          //          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(posX, posY, widthX, heightY);
          stepClear += 1;
        }
      },
      clearAll() {
        let ctx = this.$refs.canvas[this.currPage - 1].getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      },
      write(x, y) {
        let ctx = this.$refs.canvas[this.currPage - 1].getContext('2d');
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
      initWrite() {
        // 设置 canvas 宽高
      //        console.log(this.pageTotal, this.canvases);
        this.initCanvas(this.currPage - 1);
        // 计算 canvas 对于body的偏移量
        this.$nextTick(() => {
          let canvas = this.$refs.canvas[this.currPage - 1];
          this.offset = this.clcalOffset(canvas);
        });
      },
      clcalOffset(dom) {
        let x = 0;
        let y = 0;
        let n = 0;
        while (dom.tagName !== 'BODY') {
          // canvas的top多100 ????
          x += dom.offsetLeft;
          y += dom.offsetTop;
          dom = dom.offsetParent;
          n++;
          if (n > 20) {
            return alert('error no found BODY tag');
          }
        }
        y = y - 100;
        return {x, y};
      },
      initCanvas(index) {
        let totalH = this.$refs.write.offsetHeight;
        let totalW = this.$refs.write.offsetWidth - 60;
        let titleH = this.$refs.title.clientHeight;
        let pageH = this.$refs.pageCtrl.$el.clientHeight;
        let height = totalH - titleH - pageH - 5; // 5px留白
        let width = totalW;

        let gWidth = width / 9;
        height = gWidth * 5;
        this.$refs.title.style.width = `${totalW}px`;
        this.$nextTick(() => {
          console.log(this.canvases);
          this.$refs.canvas[index].width = width - 1;
          this.$refs.canvas[index].height = height;
          Object.assign(this.$refs.canvas[index].style, {
            backgroundImage: `url(${this.pageBG})`,
            backgroundSize: `${gWidth + 0.5}px ${gWidth}px`
          });
        });
      }
    },
    watch: {
      menuName(newVal) {
        if (newVal === '3') {
          this.$nextTick(() => {
            this.initWrite();
          });
        }
      }
    },
    components: {
      IMenu,
      IMenuItem,
      ITabs,
      ITabPane,
      IPage,
      IPoptip,
      IIcon,
      DrawTool
    }
  };
</script>

<style scoped lang="stylus">
  .composition
    width: 100%
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    display: flex /*flex-direction: column
    padding: 10px*/
    .menu
      flex: 0 0 130px
    .menu_content
      flex: 1
      overflow-y: auto
      background-color: #fff
      .question
        width: 100%
        padding: 0 10px
        .com_title, .com_desc
          font-size: 20px
          margin-top: 30px
          .desc
            font-weight: 800
          .content
            color: #545454
      .assets
        padding: 0 15px
        height: 100%
        background-color: #eee
      .write
        width: 100%
        height: 100%
        .title
          text-align: center
          height: 40px
          line-height: 40px
          border-left: 1px solid #D1D1D1
          border-right: 1px solid #D1D1D1
        .page_wrap
          canvas
            border-right: 1px solid #CCC
            position: relative
          .ctrl_wrap
            width: 60px
            text-align: center
            position: absolute
            right: 5px
            top: 40px
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
        .other
          font-size: 0
          text-align: center
          position: relative
          .minus, .plus
            font-size: 20px
            position: relative
            top: -5px
            cursor: pointer
          .page_ctrl
            display: inline-block
            height: 26px
            line-height: 26px
            text-align: center
            font-size: 14px
          .num_words
            position: absolute
            right: 70px
            top: 5px
            font-size: 15px
            color: #9A9A9A
</style>

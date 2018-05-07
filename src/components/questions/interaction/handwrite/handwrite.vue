<template>
  <div id="handwrite">
    <topic :topic="topic" @change="tpChange" @input="verify"></topic>
    
    <div class="board_wrap">
      <div class="title">手写板</div>
      <div class="write_board">
        <div class="board_bg_out" ref="board" style="top:0;left:0" @mousedown="bdMoveStart">
          <i class="size_ctrl lt" data-role="lt" @mousedown="chgSizeStart"></i>
          <i class="size_ctrl rt" data-role="rt" @mousedown="chgSizeStart"></i>
          <i class="size_ctrl lb" data-role="lb" @mousedown="chgSizeStart"></i>
          <i class="size_ctrl rb" data-role="rb" @mousedown="chgSizeStart"></i>
          <div class="board_bg_inner" ref="insertImgBOX"></div>
        </div>
      </div>
      <div class="bg_ctrl">
        <a href="javascript:void(0)" @click="showFile">设置背景</a>
        <a href="javascript:void(0)" @click="clearbg">清除背景</a>
      </div>
    </div>
  </div>
</template>

<script>
import Topic from 'components/general-part/topic/topic';
import { generalMixin } from 'common/js/mixin';
import { mapMutations } from 'vuex';
import { replaceSrc } from 'utils/utilities';

export default {
  mixins: [generalMixin],
  mounted() {
    document.body.onmousemove = this.mmove;
    document.body.onmouseup = this.mup;
  },
  data() {
    this.$nextTick(() => {
      this.bdcss.maxW =
        parseInt(this.$refs.board.style.width) || this.$refs.board.offsetWidth;
      this.bdcss.maxH =
        parseInt(this.$refs.board.style.height) ||
        this.$refs.board.offsetHeight;
    });
    return {
      chgSizeSte: false,
      bdMoveSte: false,
      bdcss: {},
      x: 0,
      y: 0
    };
  },
  methods: {
    mmove(e) {
      // 移动控制按钮 缩放 画板背景
      if (this.chgSizeSte) {
        let offsetX = e.x - this.x;
        let offsetY = e.y - this.y;
        let board = this.$refs.board;
        switch (this.ctrl) {
          case 'rb':
            board.style.width = this.bdcss.w + offsetX + 'px';
            board.style.height = this.bdcss.h + offsetY + 'px';
            break;
          case 'rt':
            board.style.width = this.bdcss.w + offsetX + 'px';
            board.style.height = this.bdcss.h - offsetY + 'px';
            board.style.top = this.bdcss.t + offsetY + 'px';
            break;
          case 'lb':
            board.style.width = this.bdcss.w - offsetX + 'px';
            board.style.height = this.bdcss.h + offsetY + 'px';
            board.style.left = this.bdcss.l + offsetX + 'px';
            break;
          case 'lt':
            board.style.width = this.bdcss.w - offsetX + 'px';
            board.style.height = this.bdcss.h - offsetY + 'px';
            board.style.left = this.bdcss.l + offsetX + 'px';
            board.style.top = this.bdcss.t + offsetY + 'px';
            break;
        }
      }
      // 移动画板位置
      if (this.bdMoveSte) {
        let offsetX = e.x - this.x;
        let offsetY = e.y - this.y;
        let board = this.$refs.board;
        let minT = 0;
        let minL = 0;
        let maxL =
          this.bdcss.maxW -
          (parseInt(this.$refs.board.style.width) ||
            this.$refs.board.offsetWidth);
        let maxT =
          this.bdcss.maxH -
          (parseInt(this.$refs.board.style.height) ||
            this.$refs.board.offsetHeight);
        let _top = Math.min(Math.max(minT, this.bdcss.t + offsetY), maxT);
        let _left = Math.min(Math.max(minL, this.bdcss.l + offsetX), maxL);
        board.style.top = _top + 'px';
        board.style.left = _left + 'px';
      }
    },
    mup() {
      this.chgSizeSte = false;
      this.bdMoveSte = false;
    },
    chgSizeStart(e) {
      this.x = e.x;
      this.y = e.y;

      this.bdcss.w =
        parseInt(this.$refs.board.style.width) || this.$refs.board.offsetWidth;
      this.bdcss.h =
        parseInt(this.$refs.board.style.height) ||
        this.$refs.board.offsetHeight;
      this.bdcss.t = parseInt(this.$refs.board.style.top);
      this.bdcss.l = parseInt(this.$refs.board.style.left);

      this.chgSizeSte = true;
      this.ctrl = e.target.getAttribute('data-role');
      e.stopPropagation();
      e.preventDefault();
    },
    bdMoveStart(e) {
      this.bdMoveSte = true;
      this.bdcss.t = parseInt(this.$refs.board.style.top);
      this.bdcss.l = parseInt(this.$refs.board.style.left);
      this.x = e.x;
      this.y = e.y;
      e.stopPropagation();
      e.preventDefault();
    },
    clearbg() {
      this.$refs.insertImgBOX.innerHTML = '';
    },
    showFile() {
      this.setTargetDom(this.$refs.insertImgBOX);
      this.showFileDia({
        status: true,
        name: '插入图片',
        type: 'image'
      });
    },
    calcProportion() {
      if (!this.$refs.insertImgBOX.firstElementChild) return null;
      let w = this.bdcss.maxW;
      let h = this.bdcss.maxH;
      let _w =
        parseInt(this.$refs.board.style.width) || this.$refs.board.offsetWidth;
      let _h =
        parseInt(this.$refs.board.style.height) ||
        this.$refs.board.offsetHeight;
      let _t = parseInt(this.$refs.board.style.top);
      let _l = parseInt(this.$refs.board.style.left);
      return {
        w: _w / w,
        h: _h / h,
        t: _t / h,
        l: _l / w
      };
    },
    getQuestionData: function(urlSnippet) {
      let _topic = this.topic;
      let img = this.$refs.insertImgBOX.firstElementChild;
      let pos = this.calcProportion();
      let handwrite, _handwrite;
      if (img) {
        handwrite = {
          src: urlSnippet + img.getAttribute('data-name'),
          pos
        };
        _handwrite = {
          src: img.getAttribute('data-name'),
          pos
        };
      }

      let questionData = {
        title: document.title,
        topic: replaceSrc(_topic, urlSnippet),
        handwrite,
        questionType: 'handwrite'
      };

      let localData = Object.assign({}, questionData, {
        topic: replaceSrc(_topic),
        handwrite: _handwrite
      });
      return {
        questionData,
        localData
      };
    },
    complete() {
      if (!this.topic) {
        this.isPass = false;
        return;
      }
      this.isPass = true;
    },
    ...mapMutations({
      showFileDia: 'SET_FILEDIALOGINFO',
      setTargetDom: 'SET_TARGETDOM'
    })
  },
  watch: {
    topic() {
      this.verify();
    }
  },
  components: {
    Topic
  }
};
</script>

<style lang="stylus">
#handwrite
  .board_wrap
    .title
      margin: 20px 0 10px
    .write_board
      width: 100%
      height: 710px
      border: 1px solid #000
      margin-right: 20px
      position: relative
      .board_bg_out
        width: 100%
        height: 100%
        background-color: #fff
        border: 1px solid #E1E1E1
        position: absolute
        .size_ctrl
          position: absolute
          z-index: 10
          width: 0
          height: 0
          border: 5px solid #000
          &.lt
            top: -4px
            left: -4px
          &.rt
            top: -4px
            right: -4px
          &.lb
            bottom: -4px
            left: -4px
          &.rb
            bottom: -4px
            right: -4px
        .board_bg_inner
          width: 100%
          height: 100%
          img
            max-width: 100%
            max-height: 100%
    .bg_ctrl
      margin-top: 15px
      font-size: 14px
</style>

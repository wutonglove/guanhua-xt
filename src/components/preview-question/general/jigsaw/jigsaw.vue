<template>
  <div class="jigsaw">
    <div class="jigsaw_wrapper">
      <div class="show" ref="showRegion">
        <div class="debris_tr" v-for="(tr,tr_index) in showList" :key="tr_index">
          <div class="debris_td drag_wrap_hook" v-for="(td,td_index) in tr" :key="td_index" v-if="refresh">
            <div class="debris" v-show="td.code!==-1"
                 :style="`background-image:url(${jigsawImg._src});background-size:${td.img.w}px ${td.img.h}px;background-position:${td.x}px ${td.y}px`"></div>
          </div>
        </div>
      </div>

      <div class="resource drag_wrap_hook" ref="resourceRegion">
        <div class="debris_wrapper"
             v-for="(li,index) in resourceList"
             :key="index"
             :style="`width:${li.w}px;height:${li.h}px`"
             v-if="li"
        >
          <div class="debris"
               :style="`width:100%;height:100%;background-image:url(${jigsawImg._src});background-size:${li.img.w}px ${li.img.h}px;background-position:${li.x}px ${li.y}px`"></div>
        </div>
      </div>
    </div>
    <div class="buffer" ref="bufferRegion">

    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  window.jQuery = $;
  import 'jquery-ui/ui/core.js';
  import 'jquery-ui/ui/widgets/draggable';
  import 'jquery-ui/ui/widgets/droppable';
  import 'jquery-ui/ui/widgets/sortable';
  import 'jquery-ui-touch-punch';

  import {createRandomArr} from 'utils/utilities';
  import {submitMixin} from 'common/js/mixin';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    mounted() {
      let _self = this;
      let $buffer = $(this.$refs.bufferRegion);
      $buffer.html(this.questionData.jigsawImg);
      $buffer.find('.insertFile_hook')[0].onload = function () {
        _self.jigsawImg._src = this.src;
        _self.jigsawImg._width = this.width;
        _self.jigsawImg._height = this.height;

        _self.initList();
        _self.initShowRegion();
        _self.initResourceRegion();
        _self.initDrag();

        setTimeout(() => {
          $buffer.html('');
        }, 20);
      };
      this.$nextTick(() => {
        let l = this.questionData.itable.r * this.questionData.itable.d;
        this.indexes = createRandomArr(l, 0, l - 1);
        console.log(this.indexes);
      });
    },
    data() {
      return {
        jigsawImg: {
          _src: '',
          _width: 0,
          _height: 0
        },
        imgMaxWidth: window.innerWidth > 425 ? 490 : window.innerWidth,
        resourceList: [],
        showList: [],
        indexes: [],
        refresh: true,
        isDisabled: false,
        answer: []
      };
    },
    methods: {
      initShowRegion: function () {
        $(this.$refs.showRegion)
          .width(this.jigsawImg._width)
          .height(this.jigsawImg._height);
      },
      initResourceRegion: function () {
        $(this.$refs.resourceRegion).height(this.jigsawImg._height);
      },
      initList: function () {
        for (let i = 0; i < this.questionData.itable.r * this.questionData.itable.d; i++) {
          let smallImgW = 255 - 4 - 12 * this.questionData.itable.d;
          let smallImgH = this.jigsawImg._height / this.jigsawImg._width * smallImgW;
          let oneWidth = smallImgW / this.questionData.itable.d - 1;
          let oneHeight = smallImgH / this.questionData.itable.r;
          this.resourceList[this.indexes[i]] = {
            code: i,
            img: {
              w: smallImgW,
              h: smallImgH
            },
            w: oneWidth,
            h: oneHeight,
            x: (i % this.questionData.itable.d) * oneWidth * -1,
            y: parseInt(i / this.questionData.itable.d) * oneHeight * -1
          };
        }
        for (let r = 0; r < this.questionData.itable.r; r++) {
          this.showList.push([]);
          for (let d = 0; d < this.questionData.itable.d; d++) {
            this.showList[r].push({
              code: -1,
              img: {
                w: 0,
                h: 0
              },
              x: 0,
              y: 0
            });
          }
        }
      },
      drop() {
        let _self = this;
        $('.drag_wrap_hook').sortable();
        $('.debris_td>.debris').draggable({zIndex: 1000, revert: true});

        $('.drag_wrap_hook')
          .droppable({
            drop: function (event, ui) {
              let td = $(event.target).index();
              let tr = $(event.target).parents('.debris_tr').index();
              let curtd = $(event.toElement).parent('.debris_td').index();
              let curtr = $(event.toElement).parents('.debris_tr').index();

              // 1 在resource 中拖动 排序   $(event.target).hasClass('debris_td')
              // 2 在 show 中拖动  交换 $(event.target).hasClass('debris_td') && _self.showList[tr][td].code===-1
              // 3 从resource中向 show中拖 判断 目标dom有有没有debris  【没有：放入】【有：】 $(event.toElement).parent('.debris_td').length < 1
              // 4 从show中向外托 push进resource中 $(event.target).hasClass('debris_td')
              if ($(event.toElement).parent('.debris_td').length > 0) {
                if (tr < 0 || curtr < 0) return;
                let tem = _self.showList[tr][td];
                _self.showList[tr][td] = _self.showList[curtr][curtd];
                _self.showList[curtr][curtd] = tem;
                _self.refreshShow();
              } else {
                if (tr < 0) return;

                if (_self.showList[tr][td].code !== -1) return;
                let index = $(event.toElement).parents('.debris_wrapper').index();

                let code = _self.resourceList[index].code;

                _self.showList[tr][td] = {
                  code: code,
                  img: {
                    w: _self.jigsawImg._width,
                    h: _self.jigsawImg._height
                  },
                  x: (code % _self.questionData.itable.d) * (_self.jigsawImg._width / _self.questionData.itable.d) * -1,
                  y: parseInt(code / _self.questionData.itable.d) * (_self.jigsawImg._height / _self.questionData.itable.r) * -1
                };
                _self.resourceList.splice(index, 1);
                _self.refreshShow();
              }
            }
          });
      },
      initDrag: function () {
        this.$nextTick(() => {
          this.drop();
        });
      },
      refreshShow: function () {
        this.refresh = false;
        this.$nextTick(() => {
          this.refresh = true;
          this.setAnswer();
          this.initDrag();
        });
      },
      setAnswer: function () {
        this.answer = [];
        this.showList.forEach((item, index) => {
          item.forEach((td, index) => {
            this.answer.push(td.code);
          });
        });
      },
      getResult() {
        if (this.answer.length < 1) return -1;
        for (let i = 0; i < this.answer.length; i++) {
          if (this.answer[i] !== i) return 0;
        }
        return 1;
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../../common/stylus/variable.styl'

  .jigsaw
    .jigsaw_wrapper
      padding: 20px 0 0 10px
      position: absolute
      width: 100%
      left: 0
      text-align: center
      display: inline-block
      &:after
        content: ''
        display: block
        width: 0
        height: 0
        clear: both
      .show
        float: left
        display: flex
        flex-direction: column
        border: 1px solid $bdcolor-g
        padding: 2px
        .debris_tr
          flex: 1
          display: flex
        .debris_td
          flex: 1
          border: 1px solid $bdcolor-g
          margin: 1px
          /*display: flex*/
          .debris
            width: 100%
            height: 100%
            background-repeat: no-repeat
      .resource
        float: left
        width: 255px
        border: 1px solid $bdcolor-g
        padding: 2px
        &:after
          content: ''
          display: block
          width: 0
          height: 0
          clear: both
        .debris_wrapper
          float: left
          background-color: $background-grey-sh
          position: relative
          width: 110px
          margin: 6px
          overflow: hidden
          .debris
            background-repeat: no-repeat
            width: 100%
            height: 100%
    .buffer
      .insertFile
        max-width: 430px
        max-height: none
</style>


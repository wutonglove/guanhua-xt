<template>
  <div class="mind-map">
    <div :id="mindId"
         @contextmenu="dismMenu"
         @mousedown="dragstart"
         @mouseup="dragend"
         @mousemove="dragin"
         @touchstart="dragstart"
         @touchmove="dragin"
         @touchend="dragend"
         ref="mind"
    ></div>
    <mind-ctrl class="float_ctrl_box" @on-zoom="zoomed" :mindId="mindId"></mind-ctrl>
  </div>
</template>

<script>
  import JsMind from 'jsmind';
  import 'jsmind/style/jsmind.css';
  import $ from 'jquery';

  import MindCtrl from 'components/empty-part/mind-ctrl/mind-ctrl';

  export default {
    props: {
      questionData: {
        type: Object
      }
    },
    computed: {
      mindData() {
        return JSON.parse(this.questionData.mindData);
      },
      mindTheme() {
        return this.questionData.theme || 'orange';
      }
    },
    data() {
      return {
        mindId: 'mind-map',
        startX: null,
        startY: null,
        dragstate: false,
        oriStyle: ''
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.initMind();
      });
    },
    methods: {
      initMind() {
        let options = {
          container: 'mind-map',
          editable: false,
          theme: this.mindTheme
        };
        this.jm = new JsMind(options);
        this.jm.show(this.mindData);
      },
      dragstart(e) {
        if (e.type === 'touchstart') {
          e = e.touches[0];
        }
        this.dragstate = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        let _style = $(this.$refs.mind).find('canvas').css('transform');
        this.oriStyle = _style === 'none' ? '' : _style;
      },
      dragin(e) {
        if (this.dragstate) {
          if (e.type === 'touchmove') {
            e = e.touches[0];
          }
          let offsetX = e.clientX - this.startX;
          let offsetY = e.clientY - this.startY;
          let _style = {
            transform: `${this.oriStyle} translate(${offsetX}px,${offsetY}px)`
          };
          $(this.$refs.mind).find('canvas').css(_style);
          $(this.$refs.mind).find('.theme-orange').css(_style);
        }
      },
      dragend(e) {
        this.dragstate = false;
        this.startX = null;
        this.startY = null;
        this.oriStyle = '';
      },
      dismMenu(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      zoomed(zoom) {
        $('#' + this.mindId).css({transform: `scale(${zoom / 50})`});
      }
    },
    components: {
      MindCtrl
    }
  };
</script>

<style lang="stylus">
  .mind-map
    width: 100%
    height: 100%
    background-color: #F8F0DF
    position: relative
    #mind-map
      width: 100%
      height: 100%
      .jsmind-inner
        overflow: hidden
    .float_ctrl_box
      position: absolute
      bottom: 10px
      left: 20px
      z-index: 1000

  body
    overflow: hidden
</style>

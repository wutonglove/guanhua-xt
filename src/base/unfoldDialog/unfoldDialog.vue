<template>
  <i-modal class="unfold_wrapper"
           v-model="isShow"
           @on-cancel="close"
  >
    <div class="unfold_dialog" v-show="isShow">
      <div class="content" v-html="unfold.content" ref="content"></div>
      <i-icon class="close" size="24" color="#fff" type="close" @click.native="close" @keyup.esc="close"></i-icon>
    </div>
    <p slot="header"></p>
    <p slot="close"></p>
    <p slot="footer"></p>
  </i-modal>
</template>

<script>
  import IModal from 'iview/src/components/modal';
  import IIcon from 'iview/src/components/icon';

  import {mapGetters, mapMutations} from 'vuex';
  //  import $ from 'expose-loader?$!jquery';
  const $ = window.$;

  export default {
    data() {
      return {
        isShow: null
      };
    },
    methods: {
      close() {
        let domObj = $('.unfold_file');
        if (domObj.is('video') || domObj.is('audio')) {
          domObj[0].pause();
        }
        this.isShow = false;
      },
      ...mapMutations({
        setUnfold: 'SET_UNFOLD'
      })
    },
    computed: {
      width() {
        return this.unfold.width;
      },
      unfold() {
        console.log(this.unfold.content);
        return this.unfold;
      },
      ...mapGetters([
        'unfold'
      ])
    },
    watch: {
      isShow(newVal) {
        if (newVal !== this.unfold.isShow) {
          this.setUnfold(newVal);
        }
      },
      unfold: {
        deep: true,
        handler(newVal) {
          if (this.newVal === this.unfold.isShow) return;
          this.isShow = newVal.isShow;
          // 当屏幕小于800 时 展开的内容 自适应屏幕
          this.$nextTick(() => {
            if (window.screen.width <= 800) {
              let $unfold = $(this.$refs.content).find('.unfold_file');
              $unfold.css({
                'max-height': `${window.screen.height - 20}px`,
                'max-width': `${window.screen.width - 20}px`
              });
            }
          });
        }
      }
    },
    components: {
      IModal,
      IIcon
    }
  };
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
  .unfold_wrapper
    .unfold_dialog
      position: fixed
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
      border: 10px solid #fff
      z-index: 1200
      background-color: #fff
      max-height: 100%
      max-width: 100%
      overflow: auto
      .close
        position: absolute
        right: 0
        top: 0
        padding: 10px;
        background-color: rgba(0, 0, 0, .5)
</style>

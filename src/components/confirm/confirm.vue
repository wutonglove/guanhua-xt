<template>
  <transition name="fade">
    <div class="config-modal" v-show="isShow">
      <div class="confirm-mask" @click="close"></div>
      <div class="confirm-wrap">
        <div class="confirm-header">{{title}}</div>
        <div class="confirm-content">
          <div class="text">{{text}}</div>
        </div>
        <div class="confirm-footer">
          <i-button class="btn" type="ghost" size="small" @click="close" :disabled="hasDisabled && disabled">取消</i-button>
          <i-button class="btn" type="primary" size="small" @click="ok" :disabled="hasDisabled && !disabled">确定
          </i-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import IButton from 'iview/src/components/button';

  export default {
    data() {
      return {
        isShow: false
      };
    },
    props: {
      text: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: '确定'
      },
      hasDisabled: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      ok() {
        this.$emit('on-ok');
        this.close();
      },
      close() {
        this.isShow = false;
      },
      show() {
        this.isShow = true;
      }
    },
    components: {
      IButton
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/variable.styl'

  .config-modal
    position: fixed
    top: 0
    left: 0
    z-index: 9999
    width: 100%
    height: 100%
    .confirm-mask
      width: 100%
      height: 100%
      background-color: rgba(0, 0, 0, .5)
    .confirm-wrap
      position: absolute
      top: 40%
      left: 50%
      transform: translate(-50%, -50%);
      width: 400px
      background-color: #fff
      overflow: hidden
      border-radius: 6px
      .confirm-header
        height: 30px
        line-height: 30px
        background-color: $background-blue-d
        color: #fff
        padding-left: 15px
      .confirm-content
        padding: 15px 10px
        .text
          font-size: 20px
          line-height: 35px
          text-align: center
          color:$font-color-grey
      .confirm-footer
        border-top: 1px solid #ccc
        padding: 10px 10px
        text-align: right

  .fade-enter-active, .fade-leave-active
    transition: all .3s ease

  .fade-enter, .fade-leave-to
    transform: translateX(10px)
    opacity: 0

</style>

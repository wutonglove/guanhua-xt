<template>
  <div class="dialog_wrapper">
    <transition name="fade">
      <div class="mask" key="mask" v-show="status"></div>
    </transition>
    <transition name="fall">
        <div class="dialog_content" key="content" v-show="status">
          <slot></slot>
        </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      status() {
        return this.isShow
      }
    }
  };
</script>

<style scoped lang="stylus">
  .dialog_wrapper
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    z-index: 100
    .mask
      width: 100%
      height: 100%
      background-color: rgba(0, 0, 0, .5)
    .dialog_content
      width: 700px
      height: 450px
      background-color: #fff
      position: fixed
      top: 50px;
      left: 50%;
      transform: translate(-50%,0);
    .fade-enter-active, .fade-leave-active
      transition: all .25s
    .fade-enter, .fade-leave-to
      opacity: 0
    .fall-enter-active, .fall-leave-active
      transition: all .25s
    .fall-enter, .fall-leave-to
      transform :translate(-50%,-100%)
      opacity:0
</style>

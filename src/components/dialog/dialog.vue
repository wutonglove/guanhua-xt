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
    computed: {
      status() {
        return this.$store.state.fileDialog;
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
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
      background-color: $background-opacity
    .dialog_content
      width: 700px
      height: 450px
      background-color: #fff
      position: fixed
      top: 50px;
      left: 50%;
      transform: translate(-50%,0)
      border-radius: 4px
      overflow: hidden
      box-shadow:0 0 10px 2px rgba(255,255,255,.3)
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

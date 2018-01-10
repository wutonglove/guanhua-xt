<template>
  <div class="wrap">
    <div class="box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped lang="stylus">
  .wrap
    position: relative
    background-color: rgba(118, 118, 255, .1)
    &:after, &:before, .box:before, .box:after
      content: ''
      display: block
      width: 18px
      height: 18px
      border: 1px solid transparent
      position: absolute
      z-index: 10
    &:after
      bottom: -1px
      left: -1px
      border-left-color: #bbb
      border-bottom-color: #bbb
    &:before
      bottom: -1px
      right: -1px
      border-right-color: #bbb
      border-bottom-color: #bbb
    .box
      position: relative
      width: 100%
      height: 100%
      &:after
        top: -1px
        left: -1px
        border-left-color: #bbb
        border-top-color: #bbb
      &:before
        top: -1px
        right: -1px
        border-right-color: #bbb
        border-top-color: #bbb
</style>

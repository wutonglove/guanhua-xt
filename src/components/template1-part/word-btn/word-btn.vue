<template>
  <div class="word_btn" ref="btn">
    <div class="word_inner">
      <slot class="text"></slot>
    </div>
  </div>
</template>

<script>
  import bg from './bg_text.png';
  export default {
    mounted() {
      this.$refs.btn.style.backgroundImage = `url(${bg})`;
    }
  };
</script>

<style scoped lang="stylus">
  .word_btn
    display: inline-block
    width: 40px
    text-align: center
    background-size: cover
    font-size: 22px
    color: #422701
    position: relative
    &:after
      content: ''
      display: block
      padding-top: 100%
    .word_inner
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
    &:hover
      opacity: 0.8
    &:active
      opacity: 0.8
</style>

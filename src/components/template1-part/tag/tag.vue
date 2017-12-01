<template>
  <div class="tag">
    <div class="tag_wrapper">
      <span class="head" ref="head"></span>
      <span class="body" ref="body">{{text}}</span>
      <span class="tail" ref="tail"></span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      color: {
        type: String
      },
      text: {
        type: String
      }
    },
    mounted() {
      this.setBGUrl(this.$refs.head);
      this.setBGUrl(this.$refs.body);
      this.setBGUrl(this.$refs.tail);
    },
    methods: {
      setBGUrl(tar) {
        tar.style.backgroundImage = `url(${require(`./${this.color}_${tar.className}.png`)})`;
      }
    }
  };
</script>

<style scoped lang="stylus">
  .tag_wrapper
    height: 32px
    line-height: 24px
    color: #fff
    font-size: 12px
    overflow: hidden
    span
      float: left
      height: 100%
      background-size: contain
      background-repeat: no-repeat
      &.head
        width: 12px
      &.body
        padding: 0 10px
        background-repeat: repeat
      &.tail
        width: 20px
</style>

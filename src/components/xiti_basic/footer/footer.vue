<template>
  <div class="footer">
    <div class="footer_wrapper">
      <button type="button" class="preview">预览</button>
      <button type="button" class="save" @click="test">保存</button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      test() {
        console.log(this.$store.state);
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../common/stylus/variable.styl'
  @import '../../../common/stylus/mixin.styl'
  .footer
    width: 100%
    height: 76px
    position: fixed
    bottom: 0
    border-top: 1px solid $bdcolor-g
    padding-top: 10px
    box-sizing: border-box
    background-color: #fff
    .footer_wrapper
      $fixedWidth()
      text-align: right
      .save, .preview
        width: 176px
        height: 52px
        line-height: 52px
        text-align: center
        border-radius: 26px
        font-size: 20px
        opacity: .8
        &:hover
          opacity: 1
      .save
        border: 1px solid $bdcolor-blue-d
        color: #fff
        background: linear-gradient(to bottom, $bgc-gradient-blue1, $bgc-gradient-blue2)
      .preview
        border: 1px solid $bdcolor-g
        color: #333
        background: linear-gradient(to bottom, $bgc-gradient-white1, $bgc-gradient-white2)
        margin-right: 15px
</style>

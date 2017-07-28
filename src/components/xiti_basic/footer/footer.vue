<template>
  <div class="footer">
    <div class="footer_wrapper">
      <Button type="ghost"
              shape="circle"
              class="preview"
              :disabled="$store.state.isPass"
      >预览</Button>
      <Button type="primary"
              shape="circle"
              class="save"
              :disabled="$store.state.isPass"
              @click="$store.dispatch('save','/static/')"
      >保存</Button>
    </div>
  </div>
</template>

<script>
  import Checkbox from 'iview/src/components/checkbox';

  export default {
    methods: {
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
        font-size: 20px

</style>

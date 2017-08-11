<template>
  <div class="footer">
    <div class="footer_wrapper">
      <i-button type="ghost"
              shape="circle"
              class="preview"
              :disabled="!$store.state.isPass"
      >预览</i-button>
      <i-button type="primary"
              shape="circle"
              class="save"
              :disabled="!$store.state.isPass"
              @click="save"
      >保存</i-button>
    </div>
  </div>
</template>

<script>
  import IButton from 'iview/src/components/button';

  export default {
    methods: {
      save(){
        console.log('footer');
        this.$emit('on-save');
      }
    },
    components:{
      IButton
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

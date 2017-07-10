<template>
  <div class="topic">
    <cnt-module name="题干" :isMandatory="true">
      <div class="div_input" contenteditable="true"></div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';
  export default {
    components: {
      CntModule
    }
  };
</script>

<style scoped lang="stylus">
  .topic
    .div_input
      min-height: 60px
</style>
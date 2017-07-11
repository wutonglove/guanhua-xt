<template>
  <div class="hint">
    <cnt-module name="提示">
      <div class="div_input" contenteditable="true" @keyup="setHit"></div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';
  export default {
    methods: {
      setHit() {
        this.$store.state.topic = this.$refs.topicDom.innerHTML;
      }
    },
    components: {
      CntModule
    }
  };
</script>

<style scoped lang="stylus">

</style>
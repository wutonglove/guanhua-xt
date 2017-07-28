<template>
  <div class="hint">
    <cnt-module name="提示">
      <div class="div_input"
           contenteditable="true"
           ref="hintDOM"
           @input.stop.prevent="setHint()"
           @blur="$store.dispatch('saveSelection')"
      ></div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';
  export default {
    methods: {
      setHint() {
        this.$store.state.hint = this.$refs.hintDOM.innerHTML;
      }
    },
    components: {
      CntModule
    }
  };
</script>

<style scoped lang="stylus">

</style>

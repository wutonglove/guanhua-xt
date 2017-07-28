<template>
  <div class="explanation">
    <cnt-module name="解析">
      <div class="div_input"
           contenteditable="true"
           ref="explanationDOM"
           @input.stop.prevent="setExplanation()"
           @blur="$store.dispatch('saveSelection')"
      ></div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';
  export default {
    methods:{
      setExplanation(){
        this.$store.state.explanation = this.$refs.explanationDOM.innerHTML;
      }
    },
    components: {
      CntModule
    }
  };
</script>

<style scoped lang="stylus">

</style>

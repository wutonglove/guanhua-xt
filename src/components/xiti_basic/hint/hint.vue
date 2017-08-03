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
    data(){
      return {
        questionType: this.$store.state.questionType,
        questionCode:this.$store.state.questionCode
      };
    },
    methods: {
      setHint() {
        this.$store.state[this.questionType].questionContent[this.questionCode].hint = this.$refs.hintDOM.innerHTML;
      }
    },
    components: {
      CntModule
    }
  };
</script>

<style scoped lang="stylus">

</style>

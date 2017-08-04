<template>
  <div class="hint">
    <cnt-module name="提示">
      <div class="div_input"
           contenteditable="true"
           ref="hintDOM"
           @blur="$store.dispatch('saveSelection')"
           @input="setHint"
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
        questionCode:this.$store.state.questionCode,
        hint:''
      };
    },
    methods: {
      setHint() {
        this.hint = this.$refs.hintDOM.innerHTML.trim();
      }
    },
    components: {
      CntModule
    }
  };
</script>

<style scoped lang="stylus">

</style>

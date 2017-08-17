<template>
  <div class="explanation">
    <cnt-module name="解析">
      <div class="div_input"
           contenteditable="true"
           ref="explanationDOM"
           @blur="$store.dispatch('saveSelection')"
           @input="setExplanation"
      ></div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';
  export default {
    data() {
      return {
        questionType: this.$store.state.questionType,
        questionCode: this.$store.state.questionCode,
        explanation: ''
      };
    },
    methods: {
      setExplanation() {
        this.explanation = this.$refs.explanationDOM.innerHTML.trim();
      }
    },
    components: {
      CntModule
    }
  };
</script>

<style scoped lang="stylus">

</style>

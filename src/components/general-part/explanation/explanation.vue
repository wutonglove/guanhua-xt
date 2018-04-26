<template>
  <div class="explanation">
    <cnt-module name="解析">
      <div class="div_input cl_rg_hook"
           contenteditable="true"
           ref="explanationDOM"
           @blur="blur"
           @input="setExplanation"
      ></div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/general-part/cnt-module/cnt-module';
  import {mapActions} from 'vuex';
  export default {
    data() {
      return {
        questionType: this.$store.state.questionType,
        questionCode: this.$store.state.questionCode,
        explanation: ''
      };
    },
    methods: {
      blur() {
        this.saveCurrentRange();
      },
      setExplanation() {
        this.explanation = this.$refs.explanationDOM.innerHTML.trim();
      },
      ...mapActions({
        saveCurrentRange: 'saveCurrentRange'
      })
    },
    components: {
      CntModule
    }
  };
</script>

<style scoped lang="stylus">
  .div_input
    line-height: 25px
</style>

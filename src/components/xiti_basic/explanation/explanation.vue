<template>
  <div class="explanation">
    <cnt-module name="解析">
      <div class="div_input"
           contenteditable="true"
           ref="explanationDOM"
           @blur="blur"
           @input="setExplanation"
      ></div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';
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

</style>

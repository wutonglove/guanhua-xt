<template>
  <div class="hint">
    <cnt-module name="提示">
      <div class="div_input"
           contenteditable="true"
           ref="hintDOM"
           @blur="blur"
           @input="setHint"
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
        hint: ''
      };
    },
    methods: {
      blur() {
        this.saveCurrentRange();
      },
      setHint() {
        this.hint = this.$refs.hintDOM.innerHTML.trim();
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

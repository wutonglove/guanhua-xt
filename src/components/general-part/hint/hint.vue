<template>
  <div class="hint">
    <cnt-module name="提示">
      <div-input v-model="_hint"></div-input>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/general-part/cnt-module/cnt-module';
  import DivInput from 'components/general-part/div-input/div-input';

  export default {
    props: {
      hint: String
    },
    computed: {
      _hint: {
        get() {
          return this.hint;
        },
        set(value) {
          this.$emit('change', value);
        }
      }
    },
    components: {
      CntModule,
      DivInput
    }
  };
</script>

<style scoped lang="stylus">
  .div_input
    line-height: 25px
</style>

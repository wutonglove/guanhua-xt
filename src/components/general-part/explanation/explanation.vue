<template>
  <div class="explanation">
    <cnt-module name="解析">
      <div-input v-model="_explanation"></div-input>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/general-part/cnt-module/cnt-module';
  import DivInput from 'components/general-part/div-input/div-input';

  export default {
    props: {
      explanation: String
    },
    computed: {
      _explanation: {
        get() {
          return this.explanation;
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

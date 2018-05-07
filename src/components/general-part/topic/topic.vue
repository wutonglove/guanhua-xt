<template>
  <div class="topic">
    <cnt-module name="题干" :isMandatory="true">
      <div-input class="topic_input" v-model="_topic" @input="input"></div-input>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/general-part/cnt-module/cnt-module';
  import DivInput from 'components/general-part/div-input/div-input';

  export default {
    props: {
      topic: String
    },
    computed: {
      _topic: {
        get() {
          return this.topic;
        },
        set(value) {
          this.$emit('change', value);
        }
      }
    },
    methods: {
      input() {
        this.$emit('input');
      }
    },
    components: {
      CntModule,
      DivInput
    }
  };
</script>

<style scoped lang="stylus">
  .topic
    .topic_input
      min-height: 60px
      line-height: 25px
</style>

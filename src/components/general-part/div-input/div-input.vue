<template>
  <div class="div_input cl_rg_hook"
       contenteditable="true"
       ref="input"
       @blur="blur"
       v-html="text"
  >
  </div>
</template>

<script>
  export default {
    model: {
      prop: 'text',
      event: 'change'
    },
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    methods: {
      blur() {
        this.$emit('blur');
        this.$emit('change', this.$refs.input.innerHTML);
      }
    }
  };
</script>

<style scoped lang="stylus">
  .div_input
    display: block;
    width: 100%;
    outline: none;
</style>

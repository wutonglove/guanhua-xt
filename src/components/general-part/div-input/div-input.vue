<template>
  <div class="div_input cl_rg_hook"
       contenteditable="true"
       spellcheck="false"
       ref="input"
       @blur="blur"
       @input="input"
       v-html="text"
  >
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters(['divChgAble'])
  },
  methods: {
    blur() {
      this.saveCurrentRange();
      this.$emit('blur');
      this.$nextTick(() => {
        if (this.divChgAble) {
          this.$emit('change', this.$refs.input.innerHTML);
        }
      });
    },
    input() {
      this.$emit('input');
    },
    ...mapActions({
      saveCurrentRange: 'saveCurrentRange'
    })
  }
};
</script>

<style scoped lang="stylus">
.div_input
  display: block
  width: 100%
  outline: none
  line-height: 25px
</style>

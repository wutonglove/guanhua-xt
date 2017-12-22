<template>
  <div class="btn_wrap" :class="{disable:disable}" @click="handleClick">
    <i-icon :type="icon" v-if="icon!==''"></i-icon>
    <slot></slot>
  </div>
</template>

<script>
  import IIcon from 'iview/src/components/icon';

  export default {
    props: {
      icon: {
        type: String,
        default: ''
      },
      disable: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleClick() {
        if (this.disable) return;
        this.$emit('click');
      }
    },
    components: {
      IIcon
    }
  };
</script>

<style scoped lang="stylus">
  .btn_wrap
    display: inline-block
    padding: 5px 8px
    border: 1px solid #F3C58C
    border-radius: 5px
    background: linear-gradient(to top, #DAA35C, #F3C181)
    font-size: 12px
    text-shadow: 0.5px 0.87px 0 hsla(0, 0%, 100%, .51)
    color: #825318;
    font-weight: 800
    cursor: pointer
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, .3)
    &:hover
      background: linear-gradient(to top, #E8B067, #FACB8F)
      text-shadow: none
    &:active
      background: linear-gradient(to top, #F3C181, #DAA35C)
    &.disable
      color: #9B7C50
      text-shadow: 0.5px 0.866px 0 rgba(255, 255, 255, 0.51);
      background: linear-gradient(to top, #DFAC68, #D39D58)
</style>

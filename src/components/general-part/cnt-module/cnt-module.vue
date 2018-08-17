<template>
  <div class="wrapper">
    <div class="name">
      <span class="text">{{name}}</span>
      <sign v-if="required"></sign>
    </div>
    <div class="desc" v-if="desc">{{desc}}</div>
    <div class="input_wrapper" :style="style" ref="wapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Sign from 'components/general-part/mandatory-sign/mandatory-sign';
export default {
  props: {
    name: {
      type: String
    },
    desc: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    mheight: {
      type: Number,
      default: 40
    }
  },
  computed: {
    style() {
      return {
        minHeight: this.mheight + 'px'
      };
    }
  },
  components: {
    Sign
  }
};
</script>

<style scoped lang="stylus">
@import '../../../common/stylus/variable.styl'

.wrapper
  width: 100%
  position: relative
  z-index: 0
  .name
    margin-top: 10px
    line-height: 38px
    height: 38px
    font-size: 18px
  .desc
    font-size: 14px
    color: #999
    line-height: 20px
    margin-bottom: 5px
  .input_wrapper
    width: 100%
    border: 1px solid #ccc
    background-color: $background-divinput
</style>

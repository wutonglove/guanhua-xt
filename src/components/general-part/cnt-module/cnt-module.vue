<template>
  <div class="wrapper">
    <div class="name">
      <span class="text">{{name}}</span>
      <sign v-if="isMandatory"></sign>
    </div>
    <div class="desc" v-if="desc">{{desc}}</div>
    <div class="input_wrapper">
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
      isMandatory: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      verify() {

      }
    },
    components: {
      Sign
    }
  };
</script>

<style scoped lang="stylus">
  @import "../../../common/stylus/variable.styl"

  .wrapper
    width: 100%
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
      padding: 10px
      border: 1px solid #ccc
      background-color:$background-divinput
</style>

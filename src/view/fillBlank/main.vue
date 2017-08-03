
<template>
  <div>
    <basic-frame>
      <fill-blank></fill-blank>
    </basic-frame>
  </div>
</template>

<script>
  import BasicFrame from 'components/xiti_basic/basic_frame/basic_frame';
  import FillBlank from './fillBlank';

  export default {
    created(){
      this.$store.state['questionContent'] = {
        topic: '',
        options: [],
        answer: [],
        hint: '',
        explanation: '',
      }
    },
    components: {
      BasicFrame,
      FillBlank
    }
  };
</script>
<style scoped lang="stylus">
  @import '../../common/stylus/mixin.styl'
  @import '../../common/stylus/variable.styl'

  .btn_insertBlank
    font-size: 16px
    position: absolute
    right: 0
    top: 110px
  .init_answer
    width: 100%
    .name
      margin-top: 10px
      line-height: 38px
      height: 38px
      font-size: 18px
      .sign
        display: inline-block
        vertical-align: top
        color: red
    .desc
      color: $font-color-grey
</style>


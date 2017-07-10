<template>
  <div class="answer">
    <cnt-module name="答案" :isMandatory="true">
      <div class="answer_wrapper">
        <label v-for="answer in data">
          <input :type="inputType" name="awser">
          <strong>{{answer.icon}}</strong>
        </label>
      </div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module'
  export default {
    props: {
      inputType: {
        type: String,
        default: 'radio'
      },
      data: {
        type: Array
      }
    },
    components: {
      CntModule
    }
  };
</script>

<style scoped lang="stylus">
  .answer_wrapper
    font-size: 0
    line-height: 20px
    label
      display: inline-block
      vertical-align: top
      font-size: 16px
</style>
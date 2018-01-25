<template>
  <div id="handwrite">
    <div class="left_box">
      <div class="top_box" v-html="topic"></div>
      <div class="bom_box"></div>
    </div>
    <div class="right_box"></div>
  </div>
</template>

<script>
  import {submitMixin} from 'common/js/mixin';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    computed: {
      topic() {
        return this.questionData.topic;
      }
    }
  };
</script>

<style scoped lang="stylus">
  #handwrite
    width: 100%
    height: 100%
    display: flex
    .left_box
      flex: 1
    .right_box
      flex: 0 0 100px
</style>

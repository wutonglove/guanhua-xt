<template>
  <div class="content_wrapper">
    <div class="box_outer">
      <div class="box_title">{{questionData.mboardTitle}}</div>
      <div class="box_content">
        <router-view :questionData="questionData" ref="content"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      questionData: {
        type: Object
      }
    },
    mounted() {
      this.$router.push({path: `/interest/${this.questionData.questionType}`});
    },
    methods: {
      submit() {
        this.$refs.content.submit();
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../common/stylus/mixin.styl'
  @import '../../../common/stylus/variable.styl'

  .content_wrapper
    $fixedWidth()
    height: 100%
    border: 8px solid #ECC281
    box-shadow: 0 0 60px 10px rgba(0, 0, 0, .6) inset
    border-radius: 14px
    .box_outer
      border: 1px solid #F2CC8E
      border-radius: 6px
      overflow: hidden
      position: relative
      height: 100%
      .box_title
        position: absolute
        z-index: 1
        box-shadow: 0 0 20px 1px rgba(0, 0, 0, .2)
        height: 40px
        width: 100%
        line-height: 40px
        text-align: center
        font-size: 24px
        background: url("/static/images/title_bg.jpg")
      .box_content
        height: 100%
        padding-top: 40px
        box-sizing :border-box
        background-color: #E3BB80
</style>

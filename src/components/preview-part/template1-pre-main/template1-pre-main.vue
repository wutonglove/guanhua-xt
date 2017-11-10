<template>
  <div class="content_wrapper">
    <div class="box_outer">
      <div class="box_title">{{questionData.mboardTitle}}</div>
      <div class="box_content">
        <router-view :questionData="questionData" ref="content"></router-view>
      </div>
    </div>
    <div class="hint_box" v-if="questionData.hints.length>0">
      <a class="hint_btn" @click="showHintDia"></a>
      <span class="num_icon">{{questionData.hints.length}}</span>
    </div>
    <hint-dia :hints="questionData.hints" ref="hintDia" :disabled="true"></hint-dia>
  </div>
</template>

<script>
  import HintDia from 'components/template1-part/hint-dialog/hint-dialog';

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
      },
      showHintDia() {
        this.$refs.hintDia.show();
      }
    },
    components: {
      HintDia
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
    position: relative
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
        box-sizing: border-box
        background-color: #E3BB80
        overflow: auto
    .hint_box
      position: absolute
      left: -15px
      top: -10px
      z-index: 20
      width: 40px
      height: 55px
      .hint_btn
        display: block
        width: 100%
        height: 100%
        background: url('/static/images/hint_btn.png') no-repeat
        background-size: 40px 130px
      .num_icon
        position: absolute
        right: 0
        top: 0
        width: 14px
        height: 14px
        background: #CE2420
        color: #fff
        font-size: 12px
        border-radius: 50%
        text-align: center
        line-height: 14px
</style>

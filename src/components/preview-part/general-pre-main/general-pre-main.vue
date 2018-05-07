<template>
  <div class="box_content">
    <div class="title">{{questionData.title}}</div>
    <div class="content" ref="contentWrap">
      <g-content :questionData="questionData" :isDisabled="isDisabled" ref="contextDOM"></g-content>
    </div>
  </div>
</template>

<script>
  import GContent from 'components/preview-part/general-content/general-content';

  export default {
    props: {
      questionData: {
        type: Object
      },
      isDisabled: {
        type: Boolean
      }
    },
    methods: {
      submit() {
        this.$refs.contextDOM.submit();
      }
    },
    components: {
      GContent
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../common/stylus/mixin.styl'
  @import '../../../common/stylus/variable.styl'

  .box_content
    $fixedWidth()
    padding: 18px
    height: 100%
    border: 1px solid #D1AF80
    box-shadow: 0 0 0 1px #E2CCAA
    border-radius: 10px
    background-color: $background-pre
    display: flex
    flex-direction: column
    .title
      flex: 0 0 56px
      height: 56px
      line-height: 56px
      padding-left: 43px
      font-size: 34px
      border-bottom: 1px solid #ABABAB
    .content
      flex: 1
      margin-top: 3px
      overflow: auto
      border-top: 1px solid #ababab
      padding: 20px 43px;
      position: relative
      box-sizing: border-box
      .topic
        width: 100%
        margin-bottom: 30px
        font-size: 22px
        line-height: 30px
    @media screen and (max-device-width: 425px)
      .content
        padding: 20px 0
</style>

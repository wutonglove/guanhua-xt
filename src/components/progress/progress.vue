<template>
  <div class="up_progress">
    <i-modal v-model="test" width="560" class="up_progress_wrap">
      <p slot="header"></p>
      <div class="content">
        <p class="text">
          <i-spin class="spin" size="large"></i-spin>
          正在保存习题数据...
        </p>
        <i-progress class="" :percent="25" status="normal"></i-progress>
      </div>
      <div slot="footer">
        <i-button type="error" size="large" @click="">取消</i-button>
      </div>
    </i-modal>
  </div>
</template>

<script>
  import IProgress from 'iview/src/components/progress';
  import IModal from 'iview/src/components/modal';
  import ISpin from 'iview/src/components/spin';
  import IButton from 'iview/src/components/button';

  export default {
    props: {},
    data() {
      return {
        test: true
      };
    },
    components: {
      IProgress,
      IModal,
      ISpin,
      IButton
    }
  };
</script>

<style scoped lang="stylus">
  .up_progress_wrap
    .content
      text-align: center
      line-height: 50px
      .text
        font-size: 18px
        .spin
          display: inline-block
</style>

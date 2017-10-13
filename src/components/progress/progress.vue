<template>
  <div class="up_progress">
    <i-modal v-model="showDia"
             width="560"
             class="up_progress_wrap"
             @on-ok="$store.state.startUpload=false"
             @on-cancel="cancel">
      <p slot="header"></p>
      <div class="content">
        <p class="text">
          <i-spin class="spin" size="large"></i-spin>
          正在保存习题数据...
        </p>
        <i-progress class="" :percent="progress" status="normal"></i-progress>
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
    props: {
      isShow: Boolean
    },
    data() {
      return {
        showDia: false
      };
    },
    computed: {
      progress() {
        return this.$store.state.progress;
      }
    },
    watch: {
      isShow(curVal, oldVal) {
        this.showDia = curVal;
      }
    },
    methods: {
      cancel: function () {
        this.$store.state.startUpload = false;
      }
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

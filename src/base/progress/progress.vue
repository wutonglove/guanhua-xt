<template>
  <div class="up_progress">
    <i-modal v-model="isShow"
             width="560"
             class="up_progress_wrap"
             :mask-closable="false"

    >
      <p slot="header"></p>
      <div class="content">
        <div class="content_wrap" v-if="progress<100">
          <i-spin class="spin" size="large"></i-spin>
          <p class="text">
            正在保存习题数据...
          </p>
        </div>
        <div class="content_wrap" v-else>
          <i-icon type="checkmark-circled" color="green" size="35px"></i-icon>
          <p class="text">
            习题数据保存成功！
          </p>
        </div>
        <i-progress class="" :percent="progress" status="normal"></i-progress>
      </div>
      <div slot="footer">
        <i-button type="error" @click="cancel" :disabled="!isComplete">取消</i-button>
        <i-button type="primary" @click="reload" :disabled="isComplete">确定</i-button>
      </div>
    </i-modal>
  </div>
</template>

<script>
  import IProgress from 'iview/src/components/progress';
  import IModal from 'iview/src/components/modal';
  import ISpin from 'iview/src/components/spin';
  import IButton from 'iview/src/components/button';
  import IIcon from 'iview/src/components/icon';

  import ConfirmDia from 'base/confirm/confirm';

  import {mapGetters, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        isShow: null,
        cancelDia: false
      };
    },
    computed: {
      status() {
        return this.progressDia.isShow;
      },
      progress() {
        return this.progressDia.progress;
      },
      isComplete() {
        return this.progress !== 100;
      },
      ...mapGetters([
        'progressDia'
      ])
    },
    watch: {
      isShow(newVal) {
        if (newVal !== this.status) this.setProgressDia({isShow: newVal});
      },
      status(newVal) {
        if (newVal !== this.isShow) this.isShow = newVal;
      }
    },
    methods: {
      cancel() {
        IModal.confirm({
          title: '',
          content: '<p class="text">确认取消本次保存试题的操作么？</p>',
          onOk: () => {
            this.$emit('interrupt');
          }
        });
      },
      close() {
        this.setProgressDia({isShow: false});
      },
      reload() {
        location.reload();
      },
      ...mapMutations({
        setProgressDia: 'SET_PROGRESSDIA'
      })
    },
    components: {
      ConfirmDia,
      IProgress,
      IModal,
      ISpin,
      IButton,
      IIcon
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/variable.styl'

  .up_progress_wrap
    .content
      text-align: center
      line-height: 50px
      .content_wrap
        .text
          font-size: 18px
        .spin
          display: inline-block
</style>

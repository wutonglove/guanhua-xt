<template>
  <div class="view_wrapper">
    <div class="timer">
      <span class="text">答题时间</span>
      <span class="time">
        {{filterDoubleDigit(times.minute)}} 分 {{filterDoubleDigit(times.second)}} 秒
      </span>
    </div>
    <div class="content_wrapper" ref="contentWrap">
      <router-view
        v-if="questionData"
        ref="content"
        :questionData="questionData"
        :isDisabled="isDisabled"
      >
      </router-view>
      <i-spin size="large" fix v-else></i-spin>
    </div>
    <i-button v-if="isSubmited" class="refresh" type="primary" shape="circle" @click="refresh">重新作答</i-button>
    <i-button v-else type="primary" class="submit" shape="circle" @click="submit">提交</i-button>
    <unfold-model></unfold-model>
  </div>
</template>

<script>
  import UnfoldModel from 'base/unfoldDialog/unfoldDialog';
  import IButton from 'iview/src/components/button';
  import ISpin from 'iview/src/components/spin';
  import Modal from 'iview/src/components/modal';

  import {mapMutations} from 'vuex';
  import {getQuestionData} from 'api/getQuestionData';
  import {urlSearch} from 'utils/utilities';
  import $ from 'expose-loader?$!jquery';
  import {timerMixin} from 'common/js/mixin';

  export default {
    mixins: [timerMixin],
    data() {
      return {
        isSubmited: false,
        isDisabled: false,
        questionData: null
      };
    },
    mounted() {
      this._init();
    },
    methods: {
      getQuestion() {
        let questionId = urlSearch().id;
        return new Promise((resolve, reject) => {
          getQuestionData(questionId)
            .then((data) => {
              this.questionData = data;
              console.log(this.questionData);
              resolve();
            })
            .catch((code) => {
              alert('错误编码：' + code);
            });
        });
      },
      bindUnfoldEvent() {
        let _self = this;
        $('.img_wrap').on('click', function () {
          let src = $(this).children('img')[0].src;
          _self.unfold(src);
        });
      },
      unfold(src) {
        let isShow = true;
        let content = `<img src="${src}" class="unfold_file"/>`;
        this.setUnfold({isShow, content});
      },
      submit () {
        Modal.confirm({
          title: '',
          content: '<p class="text">确认提交答案么？</p>',
          onOk: () => {
            clearInterval(this.timer);
            this.isDisabled = true;
            this.isSubmited = true;
            // 为了保证上一个对话框完全消失（对话框和遮罩的延迟动画）
            setTimeout(() => {
              this.$refs.content.submit();
            }, 500);
          }
        });
      },
      refresh() {
        window.location.reload();
      },
      _initContentHeight() {
        this.$refs.contentWrap.style = `height:${window.innerHeight - 130}px`;
      },
      _init() {
        this.getQuestion()
          .then(() => {
            this.$nextTick(() => {
              this._initContentHeight();
              this.bindUnfoldEvent();
              this.clock();
            });
          });
      },
      ...mapMutations({
        setUnfold: 'SET_UNFOLD'
      })
    },
    components: {
      UnfoldModel,
      IButton,
      ISpin,
      Modal
    }
  };
</script>

<style lang="stylus">
  @import '../../common/stylus/mixin.styl'
  @import '../../common/stylus/variable.styl'

  .view_wrapper
    width: 100%
    height: 100%
    background: url('/static/images/pre_bg.jpg') repeat
    padding: 0 10px
    .timer
      $fixedWidth()
      margin: 0 auto
      text-align: center
      padding-top: 10px
      line-height: 50px
      font-size: 20px
    .submit, .refresh
      position: relative
      left: 50%
      top: 10px
      transform: translateX(-50%)
      font-size: 16px
      line-height: 1

  .v-transfer-dom
    .ivu-modal-body
      padding: 16px
      .text
        font-size: 18px
</style>

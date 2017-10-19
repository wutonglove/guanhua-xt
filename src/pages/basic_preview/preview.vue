<template>
  <div class="view_wrapper">
    <div class="timer">
      <span class="text">答题时间</span>
      <span class="time">
        {{timesFilter(times.minute)}} 分 {{timesFilter(times.second)}} 秒
      </span>
    </div>
    <div class="content_wrapper" v-if="questionData">
      <div class="title">{{questionData.title}}</div>
      <div class="content" ref="contentWrap">
        <i-content :questionData="questionData" :isDisabled="isDisabled" ref="contextDOM"></i-content>
      </div>
    </div>
    <i-spin size="large" fix v-else></i-spin>
    <i-button v-if="isSubmited" class="refresh" type="primary" shape="circle" @click="refresh">重新作答</i-button>
    <i-button v-else type="primary" class="submit" shape="circle" @click="submit">提交</i-button>
    <unfold-model></unfold-model>
  </div>
</template>

<script>
  import UnfoldModel from 'components/unfoldDialog/unfoldDialog';
  import IContent from './content/content';
  import IButton from 'iview/src/components/button';
  import ISpin from 'iview/src/components/spin';
  import Modal from 'iview/src/components/modal';

  import {mapGetters, mapMutations} from 'vuex';
  import {getQuestionData} from 'api/getQuestionData';
  import {urlSearch} from 'utils/utilities';
  import $ from 'expose-loader?$!jquery';

  export default {
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
    computed: {
      ...mapGetters([
        'times'
      ])
    },
    methods: {
      timesFilter(num) {
        let l = num.toString().length;
        return l < 2 ? '0' + num : num;
      },
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
        $(this.$refs.contentWrap).find('.img_wrap').on('click', function () {
          let src = $(this).children('img')[0].src;
          _self.unfold(src);
        });
      },
      unfold(src) {
        let isShow = true;
        let content = `<img src="${src}" class="unfold_file"/>`;
        this.setUnfold({isShow, content});
      },
      clock() {
        this.timer = setInterval(() => {
          let second = this.times.second + 1;
          let minute = this.times.minute;
          if (this.times.second > 58) {
            minute++;
            second = 0;
          }
          this.setTimes({second, minute});
        }, 1000);
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
              this.$refs.contextDOM.submit();
            }, 500);
          }
        });
      },
      refresh() {
        window.location.reload();
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
      _initContentHeight() {
        this.$refs.contentWrap.style = `height:${window.innerHeight - 210}px`;
      },
      ...mapMutations({
        setTimes: 'SET_TIMES',
        setUnfold: 'SET_UNFOLD'
      })
    },
    components: {
      UnfoldModel,
      IContent,
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
    .content_wrapper
      $fixedWidth()
      padding: 18px
      border: 1px solid #D1AF80
      box-shadow: 0 0 0 1px #E2CCAA
      border-radius: 10px
      background-color: $background-pre
      .title
        height: 56px
        line-height: 56px
        padding-left: 43px
        font-size: 34px
        border-bottom: 1px solid #ABABAB
      .content
        margin-top: 3px
        overflow: auto
        border-top: 1px solid #ababab
        padding: 20px 43px;
        position: relative
        box-sizing: border-box
        .img_wrap
          position: relative
          display: inline-block
          .shade
            position: absolute
            left: 4px
            bottom: 10px
            width: calc(100% - 8px)
            line-height: 36px
            font-size: 16px
            text-align: center
            background-color: rgba(0, 0, 0, .5)
            color: #fff
        .topic
          width: 100%
          margin-bottom: 30px
          font-size: 22px
          line-height: 30px
      @media screen and (max-device-width: 425px)
        .content
          padding: 20px 0
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

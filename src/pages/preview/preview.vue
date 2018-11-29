<template>
  <div class='view_wrapper' id='preview_box'>
    <div id='timer'>
      <span class='text'>答题时间</span>
      <span class='time'>
        {{filterDoubleDigit(times.minute)}} 分 {{filterDoubleDigit(times.second)}} 秒
      </span>
    </div>
    <div class='content_wrapper' ref='contentWrap'>
      <router-view
        v-if='questionData'
        ref='content'
        :questionData='questionData'
        :isDisabled='isDisabled'
      >
      </router-view>
      <i-spin size='large' fix v-else></i-spin>
    </div>
    <div class='submit_wrap'>
      <i-button v-if='isSubmited' class='refresh' type='primary' shape='circle' @click='refresh'>重新作答</i-button>
      <i-button
        v-show='!nosubmit'
        v-else type='primary'
        class='submit'
        shape='circle'
        @click='submit'
      >
        提交
      </i-button>
    </div>
    <unfold-model></unfold-model>
  </div>
</template>

<script>
import UnfoldModel from 'base/unfoldDialog/unfoldDialog';
import IButton from 'iview/src/components/button';
import ISpin from 'iview/src/components/spin';
import Modal from 'iview/src/components/modal';

import qulist from 'map/question-list.json';

import { mapMutations, mapGetters } from 'vuex';
import { getQuestionData } from 'api/getQuestionData';

import $ from 'jquery';

export default {
  data() {
    return {
      isSubmited: false,
      isDisabled: false,
      questionData: null,
      nosubmit: true,
      questionId: ''
    };
  },
  computed: {
    ...mapGetters(['times'])
  },
  mounted() {
    this.getQuestion().then(() => {
      this.init();
    });
  },
  methods: {
    clockRun() {
      this.initClock(this.questionData && this.questionData.times)
      this.removeClockRunEvent();
    },
    removeClockRunEvent() {
      let box = document.getElementById('preview_box');
      box.onclick = box.onkeydown = box.ontouchstart = null;
    },
    bindClockRunEvent() {
      let box = document.getElementById('preview_box');
      box.onclick = box.onkeydown = box.ontouchstart = this.clockRun;
    },
    getQuestion() {
      const paramsId =
        this.$route.params.questionId ||
        this.$route.path.split('/')[1] ||
        window.location.href.split('#')[1].split('/')[1];
      if (/^[0-9]{19}$/.test(paramsId)) {
        this.questionId = paramsId;
      } else {
        this.questionId = 0;
      }
      return new Promise((resolve, reject) => {
        getQuestionData(this.questionId)
          .then(data => {
            this.questionData = data;
            resolve();
          })
          .catch(code => {
            alert('错误编码：' + code);
          });
      });
    },
    bindUnfoldEvent() {
      let _self = this;
      $(document).on('click', '.img_wrap', function() {
        let src = $(this).children('img')[0].src;
        _self.unfold(src);
      });
    },
    unfold(src) {
      let isShow = true;
      let content = `<img src='${src}' class='unfold_file'/>`;
      this.setUnfold({ isShow, content });
    },
    submitDia() {
      Modal.confirm({
        title: '',
        content: '<p class="text">确认提交答案么？</p>',
        onOk: () => {
          this.submit();
        }
      });
    },
    submit() {
      if (this.jsTimer) clearInterval(this.jsTimer);
      this.isDisabled = true;
      this.isSubmited = true;
      // 为了保证上一个对话框完全消失（对话框和遮罩的延迟动画时间）
      setTimeout(() => {
        this.$refs.content.submit();
      }, 500);
    },
    refresh() {
      window.location.reload();
    },
    initContentHeight() {
      if (this.$refs.contentWrap)
        this.$refs.contentWrap.style = `height:${window.innerHeight - 130}px`;
    },
    initRoute() {
      let type = this.questionData.questionType;
      let _type = this.$route.path.trim().split('/')[3];
      let item = qulist[type];
      if (type !== _type) {
        this.$router.push(`/${this.questionId + item.show}`);
      }
      this.isSubmited = false;
      this.isDisabled = false;
      this.nosubmit = item.config.show.nosubmit;
    },
    init() {
      this.$nextTick(() => {
        this.initRoute();
        this.initContentHeight();
        this.bindUnfoldEvent();
        this.bindClockRunEvent();
        $('td').attr('contenteditable', 'false');
        this.$forceUpdate();
      });
    },
    // 时间
    initClock(times) {
      if (this.jsTimer) clearInterval(this.jsTimer);
      if (times && times.second * 1 + times.minute * 1 > 0) {
        this.setTimes(times);
        this.counterclockwise();
        return;
      }
      this.clockwise();
    },
    filterDoubleDigit(num) {
      return num.toString().length < 2 ? '0' + num : num;
    },
    clockwise() {
      if (this.jsTimer) {
        clearInterval(this.jsTimer);
      }
      this.jsTimer = setInterval(() => {
        let second = this.times.second + 1;
        let minute = this.times.minute;
        if (this.times.second > 58) {
          minute++;
          second = 0;
        }
        this.setTimes({ second, minute });
      }, 1000);
    },
    counterclockwise() {
      if (this.jsTimer) {
        clearInterval(this.jsTimer);
      }
      this.jsTimer = setInterval(() => {
        let second = this.times.second - 1;
        let minute = this.times.minute;
        if (this.times.second < 1) {
          minute--;
          second = 59;
        }
        if (second * 1 + minute * 1 < 1) {
          if (this.jsTimer) clearInterval(this.jsTimer);
          Modal.warning({
            title: '',
            content: '答题时间结束，点击【确定】查看结果',
            onOk: () => {
              this.submit();
            }
          });
        }
        this.setTimes({ second, minute });
      }, 1000);
    },
    clockEnd() {
      this.submit();
    },
    ...mapMutations({
      setUnfold: 'SET_UNFOLD',
      setTimes: 'SET_TIMES'
    })
  },
  watch: {
    '$route.params.questionId': {
      deep: true,
      handler(val, oldVal) {
        if (val && val !== oldVal) {
          this.getQuestion().then(() => {
            this.init();
          });
        }
      }
    },
    $route: {
      deep: true,
      handler(val, oldVal) {
        let oldPath = oldVal.path;
        let path = val.path;
        if (path && path !== oldPath) {
          this.getQuestion().then(() => {
            this.init();
          });
        }
      }
    }
  },
  components: {
    UnfoldModel,
    IButton,
    ISpin,
    Modal
  }
};
</script>

<style lang='stylus'>
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/variable.styl'

.view_wrapper
  width: 100%
  height: 100%
  background: url('/static/images/pre_bg.jpg') repeat
  padding: 0 10px
  #timer
    $fixedWidth()
    margin: 0 auto
    text-align: center
    padding-top: 10px
    line-height: 50px
    font-size: 20px
  .submit_wrap
    text-align: center
    margin-top: 10px
    .submit, .refresh
      height: 35px
      line-height: 20px
      font-size: 16px
.v-transfer-dom
  .ivu-modal-body
    padding: 16px
    .text
      font-size: 18px
</style>

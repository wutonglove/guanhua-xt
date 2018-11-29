<template>
  <div class="wrapper_bg">
    <div class="main_layout">
      <div class="top_lay">
        <div class="box_header">
          <div class="time_box">
            <div class="time_panel">
              <span class="time_nmb">{{filterDoubleDigit(times.minute)}}</span>
            </div>
            <div class="time_panel">
              <span class="time_nmb">{{filterDoubleDigit(times.second)}}</span>
            </div>
          </div>
          <a class="example_btn">
            <i-icon type="document-text" color="#80B85E" :size="32"></i-icon>
            <span class="text">范例</span>
          </a>
        </div>
        <div class="content_wrapper">
          <router-view ref="questionDOM" v-if="Object.keys(this.mboard).length>0"></router-view>
        </div>
        <div class="hint_box">
          <a class="hint_btn" @click="showHintDia"></a>
          <span class="num_icon" v-if="hints.length>0">{{hints.length}}</span>
        </div>
      </div>
      <div class="bottom_lay">
        <div class="btns_foot_wrapper">
          <footer-btns
            v-if="footBtns"
            :btns="footBtns"
            :desc="desc"
            :questionName="preTitle"
            @on-save="save"
            @on-preview="preview"
            @set-times="setTimeHandle"
            ref="footbtn"
          ></footer-btns>
        </div>
      </div>
    </div>
    <hint-dia :hints="hints" @setHint="setHint" ref="hintDia"></hint-dia>
  </div>
</template>

<script>
import FooterBtns from 'components/template1-part/footer-btns/footer-btns';
import IIcon from 'iview/src/components/icon';
import Modal from 'iview/src/components/modal';

import HintDia from 'components/template1-part/hint-dialog/hint-dialog';

import { mapMutations, mapGetters } from 'vuex';
import qulist from 'map/question-list.json';

export default {
  data() {
    return {
      hints: [],
      preTitle: document.title,
      desc: null,
      footBtns: null
    };
  },
  mounted() {
    const type = this.$route.path.split('/')[3];
    this.init(type);
  },
  computed: {
    type() {
      return this.$router.path;
    },
    ...mapGetters(['times', 'mboard'])
  },
  methods: {
    init(type) {
      this.setMBoard(qulist[type].config.edit.mboard);
      this.footBtns = qulist[type].config.edit.footBtns;
      this.desc = qulist[type].config.edit.desc;
    },
    save() {
      if (!this.verify()) return;
      this.$emit('save');
    },
    preview() {
      if (!this.verify()) return;
      this.$emit('preview');
    },
    filterDoubleDigit(num) {
      return num.toString().length < 2 ? '0' + num : num;
    },
    getdata(url) {
      let data = this.$refs.questionDOM.getQuestionData(url);
      for (let key in data) {
        data[key] = Object.assign({}, data[key], {
          mboardTitle: this.mboard.title,
          hints: this.hints,
          times: this.times
        });
      }
      return data;
    },
    setTimeHandle(times) {
      let minute = 0;
      let second = 0;
      if (times) {
        minute = times.minute;
        second = times.second;
      }
      this.setTimes({ minute, second });
    },
    showHintDia() {
      this.$refs.hintDia.show();
    },
    setHint(hints) {
      this.hints = hints;
    },
    verify() {
      let question = this.$refs.questionDOM;
      return question.showMessage();
    },
    ...mapMutations({
      setTimes: 'SET_TIMES',
      setMBoard: 'SET_MBOARD'
    })
  },
  components: {
    FooterBtns,
    IIcon,
    Modal,
    HintDia
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/variable.styl'

.wrapper_bg
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: url($bigBG) repeat
  .main_layout
    min-width: 1000px
    height: 680px
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    .top_lay
      position: relative
      width: 900px
      height: 560px
      border: 2px solid #CBA770
      margin: 0 auto
      box-shadow: 0 0 9.82px 0 rgba(86, 63, 0, 0.6)
      background: url($boxBG) repeat
      &:after, &:before
        content: ''
        display: block
        width: 28px
        height: 58px
        background-size: contain
        position: absolute
        top: 50%
      &:after
        left: -28px
        background-image: url('/static/images/nail_left.png')
      &:before
        right: -28px
        background-image: url('/static/images/nail_right.png')
      .hint_box
        position: absolute
        left: -45px
        top: 0
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
      .box_header
        .time_box
          margin-left: 20px
          padding: 10px 0
          .time_panel
            position: relative
            display: inline-block
            width: 54px
            height: 48px
            margin-right: 5px
            background-color: #000
            box-shadow: 0 0 9.82px 0 rgba(86, 63, 0, 0.9)
            border-radius: 2px
            text-align: center
            &:after
              content: ''
              display: block
              width: 100%
              height: 2px
              background: #000
              position: absolute
              top: 50%
              left: 0
            .time_nmb
              color: #fff
              font-size: 40px
              line-height: 48px
      .content_wrapper
        width: 100%
        height: 485px
        padding: 0 10px
      .example_btn
        width: 76px
        height: 32px
        position: absolute
        top: 40px
        right: 20px
        .text
          color: #7e684a
          font-size: 16px
          line-height: 32px
          position: relative
          top: -5px
    .bottom_lay
      width: 100%
      height: 120px
      background: url('/static/images/bg_foottool.png') no-repeat bottom left
      background-size: contain
      .btns_foot_wrapper
        width: 100%
        height: 100%
  ::-webkit-scrollbar-thumb
    background-color: #B6834B
</style>

<template>
  <div class="wrapper_bg">
    <div class="main_layout">

      <div class="top_lay">
        <div class="box_header">
          <div class="time_box">
            <div class="time_panel">
              <span class="time_nmb">00</span>
            </div>
            <div class="time_panel">
              <span class="time_nmb">00</span>
            </div>
          </div>
          <a class="example_btn">
            <i-icon type="document-text" color="#80B85E" :size="32"></i-icon>
            <span class="text">范例</span>
          </a>
        </div>
        <div class="box_content">
          <mboard :titleLength="70" ref="mboard"></mboard>
        </div>
        <a class="hint_btn"></a>
      </div>
      <div class="bottom_lay">
        <div class="btns_foot_wrapper">
          <footer-btns
            :btns="footBtns"
            :desc="desc"
            @on-save="showDia"
            @on-preview="preview"
          ></footer-btns>
        </div>
      </div>
    </div>
    <pre-dia :pageSrc="'./preview.html#/interest'"></pre-dia>
  </div>
</template>

<script>
  import FooterBtns from 'components/template1-part/footer-btns/footer-btns';
  import Mboard from 'components/template1-part/mboard/mboard';
  import IIcon from 'iview/src/components/icon';
  import Modal from 'iview/src/components/modal';

  import PreDia from 'components/pre-dialog/pre-dialog';

  import {LOCALSTORAGEKEY} from 'common/js/config';
  import {mapMutations} from 'vuex';
  import exercises from 'map/exercises.json';

  export default {
    created() {
      this.type = this.$route.path.trim().split('/')[2];
      exercises['数学题型'].forEach((item, index) => {
        if (item.type === this.type) {
          document.title = item.name;
          this.preTitle = item.name;
          this.desc = item.desc;
        }
      });
    },
    data() {
      return {
        footBtns: [
          'disprtion',
          'timeset',
          'preview',
          'save'
        ],
        preTitle: '',
        desc: ''
      };
    },
    methods: {
      showDia() {
        Modal.confirm({
          title: '',
          content: '<p class="text">确认保存该试题么？</p>',
          onOk: () => {
            this.save();
          }
        });
      },
      preview() {
        let data = this.$refs.mboard.getQuestionData().localData;
        data['mboardTitle'] = this.$refs.mboard.title;
        console.log(data);
        localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(data));
        this.setPreDialog({isShow: true, title: this.preTitle});
      },
      save() {

      },
      ...mapMutations({
        setPreDialog: 'SET_PREDIALOG'
      })
    },
    components: {
      FooterBtns,
      Mboard,
      IIcon,
      Modal,
      PreDia
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
        box-shadow: 0 0 9.82px 0 rgba(86, 63, 0, .6)
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
        .hint_btn
          position: absolute
          left: -45px
          top: 0
          width: 40px
          height: 55px
          background: url('/static/images/hint_btn.png') no-repeat
          background-size: 40px 130px
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
              box-shadow: 0 0 9.82px 0 rgba(86, 63, 0, .9)
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
        .box_content
          width: 100%
          height: 485px
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
</style>

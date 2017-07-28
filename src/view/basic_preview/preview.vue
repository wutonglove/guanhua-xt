<template>
  <div class="view_wrapper" v-if="questionData">
    <div class="timer">
      <span class="text">答题时间</span>
      <span class="time">
        {{showTimes.minute}} 分 {{showTimes.second}} 秒
      </span>
    </div>
    <div class="content_wrapper">
      <div class="title">{{questionData.title}}</div>
      <div class="content" ref="content">
        <div class="topic" v-html="questionData.topic"></div>
        <Radio-group v-model="answer" vertical class="options">
          <Radio :label="option.icon"
                 v-for="(option,index) in questionData.options"
                 :key="index"
          >
            <span class="icon"><span>{{option.icon}}.</span></span>
            <span class="text" v-html="option.text"></span>
          </Radio>
        </Radio-group>
      </div>
    </div>
    <Button class="submit" type="primary" shape="circle">提 交</Button>
    <unfold-model></unfold-model>

  </div>
</template>

<script>
  import Checkbox from 'iview/src/components/checkbox';
  import UnfoldModel from 'components/unfoldDialog/unfoldDialog';
  export default {
    data(){
      return {
        answer: '0',
        times: {
          minute: 0,
          second: 0
        }
      }
    },
    created(){
      this.$store.dispatch('getdata')
    },
    mounted(){
      this.attachEventToInsertFile();
      this.timer();
    },
    computed: {
      questionData(){
        return this.$store.state.questionData;
      },
      showTimes(){
        let times = {
          minute: 0,
          second: 0
        };
        times.minute = this.times.minute.toString().length < 2 ?
          '0' + this.times.minute :
          this.times.minute;
        times.second = this.times.second.toString().length < 2 ?
          '0' + this.times.second :
          this.times.second;

        return times;
      }
    },
    methods: {
      unfold(src) {
        this.$store.state.unfold.isShow = true;
        this.$store.state.unfold.content = `<img src="${src}" class="unfold_file"/>`;
      },
      attachEventToInsertFile(){
        setTimeout(() => {
          if (!this.$refs.content) return;
          let _self = this;
          let insertFiles = this.$refs.content.getElementsByClassName("insertFile_hook");
          for (let i = 0; i < insertFiles.length; i++) {
            insertFiles[i].onclick = function () {
              _self.unfold(this.src);
            }
          }
        }, 20)
      },
      timer(){
        setInterval(() => {
          this.times.second++;
          if (this.times.second > 59) {
            this.times.minute++;
            this.times.second = 0
          }
        }, 1000)
      },
      submit(){

      }
    },
    watch: {
      questionData: {
        deep: true,
        handler(){
          this.attachEventToInsertFile();
        }
      }
    },
    components: {
      UnfoldModel
    }
  };
</script>

<style lang="stylus">
  @import '../../common/stylus/mixin.styl'

  .view_wrapper
    width: 100%
    height: 100%
    background: url('/images/pre_bg.jpg') repeat
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
      background-color: #fff
      .title
        height: 56px
        line-height: 56px
        padding-left: 43px
        font-size: 34px
        border-bottom: 1px solid #ABABAB
      .content
        margin-top: 3px
        height: 500px
        overflow: auto
        border-top: 1px solid #ababab
        padding: 20px 43px;
        .img_wrap
          position: relative
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
        .options
          line-height: 30px
          width: 100%
          .ivu-radio-wrapper
            display: flex
            white-space: normal
            height: auto
            font-size: 22px;
            margin: 15px 0;
            width: 100%;
            .ivu-radio
              .ivu-radio-inner
                width: 20px
                height: 20px
                top: 50%
                transform: translateY(-50%)
                &:after
                  width: 14px
                  height: 14px
            .icon
              flex: 0 0 35px
              span
                display: inline-block
                position: relative
                top: 50%
                transform: translateY(-50%)
            .text
              flex: 1
              word-break: break-all
      @media screen and (max-device-width: 425px)
        .content
          padding: 20px 0
    .submit
      position: relative
      left: 50%
      top: 20px
      transform: translateX(-50%)
      font-size: 16px
</style>

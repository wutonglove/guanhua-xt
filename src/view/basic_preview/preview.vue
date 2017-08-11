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
        <i-content :questionData="questionData" :isDisabled="isDisabled" ref="contextDOM"></i-content>
      </div>
    </div>
    <Button v-if="isSubmited"  class="refresh" type="primary" shape="circle" @click="refresh">重新作答</Button>
    <Button v-else class="submit" type="primary" shape="circle" @click="submit">提交</Button>
    <unfold-model></unfold-model>

  </div>
</template>

<script>
  import Checkbox from 'iview/src/components/checkbox';
  import UnfoldModel from 'components/unfoldDialog/unfoldDialog';
  import IContent from './content/content';

  import Lib from 'lib/Lib';

  export default {
    data(){
      return {
        times: {
          minute: 0,
          second: 0
        },
        isSubmited: false,
        indexes:[],
        isDisabled:false
      }
    },
    created(){
      this.$store.dispatch('getdata');
      this.$store.commit('INITRESULT');
      this.$store.commit('ATTCHEVENTTOFILE');
    },
    mounted(){
      setTimeout(() => {
        this.clock();
        this.$refs.content.style = `height:${ window.innerHeight - 210}px`;
      }, 20);
    },
    computed: {
      questionData(){
        return this.$store.state.questionData;
      },
      options() {
        if(this.indexes.length<1) return
        let newOptions = [];
        let oldOptions = this.$store.state.questionData.options;
        for(let i=0;i<oldOptions.length;i++){
          newOptions[i] = {
            icon:oldOptions[i].icon,
            text:oldOptions[this.indexes[i]].text,
            id:oldOptions[this.indexes[i]].id
          };
        }
        return newOptions;
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
      clock(){
        this.timer = setInterval(() => {
          this.times.second++;
          if (this.times.second > 59) {
            this.times.minute++;
            this.times.second = 0
          }
        }, 1000)
      },
      submit () {
        this.$Modal.confirm({
          title: '',
          content: '<p class="text">确认提交答案么？</p>',
          onOk: () => {
            this.$store.state[this.questionData.questionType].IAnswer = this.$refs.contextDOM.answer;
            this.$store.dispatch('submit',this);

            clearInterval(this.timer);
            this.isDisabled = true;
            this.isSubmited = true;
          }
        });
      },
      refresh() {
        window.location.reload();
      }
    },
    components: {
      UnfoldModel,
      IContent
    }
  };
</script>

<style lang="stylus">
  @import '../../common/stylus/mixin.styl'
  @import '../../common/stylus/variable.styl'

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
        box-sizing:border-box
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
      @media screen and (max-device-width: 425px)
        .content
          padding: 20px 0
    .submit,.refresh
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

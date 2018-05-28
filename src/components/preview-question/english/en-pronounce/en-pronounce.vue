<template>
  <div id="en_pronounce">
    <div class="article">
      <h2 class="article_tt">请朗读下面这段英文</h2>
      <div class="article_cnt">{{questionData.article}}</div>
    </div>
    <div class="audio_wrap">
      <div class="btn_wrap">
        <a href="javascript:void(0)" class="btn_icon loud" :class="{active:audioState}" ref="loud" @click="audition">
        </a>
        <span class="btn_desc">示范朗读</span>
      </div>
      <div class="btn_wrap">
        <a href="javascript:void(0)" class="btn_icon micro" :class="{active:recordState}">
        </a>
        <span class="btn_desc">开始录音</span>
      </div>
    </div>
    <div class="resource" style="display:none">
      <audio :src="source" ref="resource"></audio>
      <audio src="" ref="recording"></audio>
    </div>
  </div>
</template>

<script>
import IIcon from 'iview/src/components/icon';

export default {
  props: {
    questionData: {
      type: Object
    }
  },
  data() {
    return {
      recordState: false,
      audioState: false
    };
  },
  computed: {
    source() {
      return this.questionData.resource && this.questionData.resource.source;
    }
  },
  methods: {
    audition() {
      if (!this.questionData.resource) return;
      if (this.$refs.resource.paused) {
        this.$refs.resource.play();
        this.audioState = true;
      } else {
        this.$refs.resource.pause();
        this.audioState = false;
      }
    },
    record() {
      let _src = null;
      if (!this.recordState) {
        // 开始录音
        this.recordState = true;
        alert('start');

        let vendorUrl = window.URL || window.webkitURL;
        navigator.getMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;

        navigator.getMedia(
          {
            audio: true
          },
          strem => {
            console.log('strem', strem);
            _src = vendorUrl.createObjectURL(strem);
          },
          function(error) {
            // error.code
            console.log('err', error);
          }
        );
      } else {
        // 结束录音
        this.$refs.recording.src = _src;
        this.recordState = false;
      }
    }
  },
  components: {
    IIcon
  }
};
</script>

<style lang="stylus">
#en_pronounce
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  .article
    flex: 3
    overflow: auto
    background-color: rgba(255, 255, 255, 0.4)
    margin: 10px
    border-radius: 6px
    padding: 10px
    color: #5D390D
    display: flex
    flex-direction: column
    .article_tt
      flex: 0 0 30px
      height: 30px
      line-height: 30px
      margin-bottom: 15px
      font-size: 16px
    .article_cnt
      flex: 1
      padding: 0 10px
      font-size: 20px
      line-height: 30px
      overflow: auto
  .audio_wrap
    flex: 1
    background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba(218, 181, 124, 0.2), rgba(255, 255, 255, 0.4))
    margin: 10px
    border-radius: 6px
    border: 1px solid #E0B777
    text-align: center
    padding: 10px 0
    display: flex
    justify-content: space-around
    align-items: center
    .btn_wrap
      display: inline-block
      .btn_icon
        display: block
        width: 50px
        height: 50px
        background-size: 100%
        background-repeat: no-repeat
        &.loud
          background-image: url('/static/images/audio_btn.png')
          &.active
            background-image: url('/static/images/audio_btn_active.png')
        &.micro
          background-image: url('/static/images/record_btn.png')
          &.active
            background-image: url('/static/images/record_btn_active.png')
      .btn_desc
        font-size: 12px
        color: #745021
</style>

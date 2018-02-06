<template>
  <notepad class="wrap">
    <div class="desc_box">
      <lucency-board class="desc_text">
        <div class="text_box">
          <div class="text_wrap">
            <span class="text" v-text="desc"></span>
          </div>
        </div>
      </lucency-board>
      <div class="desc_resource">
        <div class="resource_wrap">
          <div class="resource" v-if="!resource">
            <img :src="defaultImg" alt="">
          </div>
          <div class="resource" v-else-if="resource.type === 'image'">
            <img :src="resource.src" :style="{transform:resource.cssStyle}" alt="">
          </div>
          <div class="resource" v-else-if="resource.type === 'video'">
            <video :src="resource.src" ref="video" @click="showVdCtrl" @touch="showVdCtrl"></video>
          </div>
          <lucency-board class="resource" v-else-if="resource.type === 'audio'">
            <i-icon type="mic-a" class="icon"></i-icon>
            <audio :src="resource.src" controls>
              您的浏览器不支持 audio 标签。
            </audio>
          </lucency-board>
        </div>
      </div>
    </div>
  </notepad>
</template>

<script>
  import Notepad from 'components/template1-part/notepad/notepad';
  import LucencyBoard from 'components/template1-part/lucency-board/lucency-board';

  import defaultImg from './default_img.png';

  export default {
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        defaultImg: defaultImg
      };
    },
    computed: {
      desc() {
        return this.data.text;
      },
      resource() {
        return this.data.resource;
      }
    },
    methods: {
      showVdCtrl() {
        if (this.$refs.video) {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.$refs.video.controls = true;
          this.timer = setTimeout(() => {
            this.$refs.video.controls = false;
          }, 3000);
        }
      }
    },
    components: {
      Notepad,
      LucencyBoard
    }
  };
</script>

<style scoped lang="stylus">
  .wrap
    .desc_box
      width: 100%
      height: 100%
      display: flex
      flex-direction: column
      padding: 10px
      overflow: auto
      .desc_text
        flex: 0 0 110px
        margin-bottom: 10px
        max-height: 110px
        .text_box
          width: 100%
          height: 100%
          overflow: auto
        .text_wrap
          width: 100%
          height: 100%
          display: table
          .text
            line-height: 26px
            padding: 0 5px
            display: table-cell
            vertical-align: middle
            font-size: 20px
      .desc_resource
        flex: 1
        padding: 1px
        overflow: hidden
        .resource_wrap
          width: 100%
          height: 100%
          position: relative
          .resource
            width: 100%
            height: 100%
            text-align: center
            vertical-align: middle
            .icon
              font-size: 100px
              color: #979799
              padding-top: 5px
            video, img
              max-width: 100%
              max-height: 100%
</style>

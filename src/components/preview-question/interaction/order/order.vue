<template>
  <div id="order">
    <notepad class="topic_wrap">
      <div class="desc_box">
        <lucency-board class="desc_text">
          <div class="text_box">
            <div class="text_wrap">
              <span class="text" v-text="orderDes"></span>
            </div>
          </div>
        </lucency-board>
        <div class="desc_resource">
          <div class="resource_wrap">
            <div class="resource" v-if="!resource">
              <img src="" alt="" ref="defaultImg">
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
    <draggable v-model="options" class="options_wrap" :options="dragOption" element="ul" @end="draggableEnd">
      <transition-group class="options_list" type="transition" name="list-move">
        <li class="option_wrap" v-for="(option,index) in options" :key="index">
          <span class="option_icon">{{index + 1}}</span>
          <span class="option_text" v-text="option.text"></span>
        </li>
      </transition-group>
    </draggable>

  </div>
</template>

<script>
  import Notepad from 'components/template1-part/notepad/notepad';
  import LucencyBoard from 'components/template1-part/lucency-board/lucency-board';
  import {submitMixin} from 'common/js/mixin';
  import {createRandomArr} from 'utils/utilities';
  import draggable from 'vuedraggable';

  import IIcon from 'iview/src/components/icon';

  import defaultImg from './bg.jpg';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    mounted() {
      this.initOpt();
      console.log(this.options);
      this.$nextTick(() => {
        if (!this.resource) this.$refs.defaultImg.src = defaultImg;
      });
    },
    data() {
      return {
        options: [],
        timer: null,
        dragOption: {
          animation: 300,
          ghostClass: 'drag-ghost'
        }
      };
    },
    computed: {
      orderDes() {
        return this.questionData.orderDes;
      },
      resource() {
        return this.questionData.resource;
      }
    },
    methods: {
      initOpt() {
        let l = this.questionData.options.length;
        let arr = createRandomArr(l, 0, l - 1);
        this.options = arr.map((item, index) => {
          return {text: this.questionData.options[item]};
        });
      },
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
      },
      draggableEnd() {
        console.log(this.options);
      },
      getResult() {
        for (let i = 0; i < this.options.length; i++) {
          if (this.questionData.options[i] !== this.options[i].text) return 0;
        }
        return 1;
      }
    },
    components: {
      Notepad,
      LucencyBoard,
      IIcon,
      draggable
    }
  };
</script>

<style scoped lang="stylus">
  #order
    width: 100%
    height: 100%
    display: flex
    padding: 20px 10px 15px
    .topic_wrap
      flex: 1
      margin-right: 20px
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
    .options_wrap
      flex: 1
      background-color: #D3A969
      border-radius: 10px
      .options_list
        width: 100%
        min-height: 100%
        display: flex
        flex-direction: column
        justify-content: center
        padding: 10px 20px
        .option_wrap
          flex: 0 0 39px
          margin: 10px
          border: 1px solid #F1D8B4
          border-top-width: 2px
          border-top-left-radius: 10px
          border-top-right-radius: 10px
          border-bottom-right-radius: 8px
          border-bottom-left-radius: 8px
          box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, .3)
          position: relative
          &.drag-ghost
            opacity: .5
          .option_icon
            position: absolute
            left: -20px
            top: 0
            line-height: 34px
          .option_text
            display: block
            width: 100%
            line-height: 34px
            border: 1px solid #7C5B30
            padding: 0 15px
            border-radius: 8px
            box-sizing: border-box
            background-color: #fff
</style>

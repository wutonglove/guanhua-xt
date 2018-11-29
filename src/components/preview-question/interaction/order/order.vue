<template>
  <div id="order">
    <show-side class="topic_wrap" :data="desc"></show-side>
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
  import ShowSide from 'components/template1-part/show-side-bd/show-side-bd';
  import {submitMixin} from 'common/js/mixin';
  import {createRandomArr} from 'utils/utilities';
  import draggable from 'vuedraggable';

  import IIcon from 'iview/src/components/icon';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    mounted() {
      this.initOpt();
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
      desc() {
        return {
          text: this.questionData.orderDes,
          resource: this.questionData.resource
        };
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
      },
      getResult() {
        for (let i = 0; i < this.options.length; i++) {
          if (this.questionData.options[i] !== this.options[i].text) return 0;
        }
        return 1;
      }
    },
    components: {
      IIcon,
      draggable,
      ShowSide
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

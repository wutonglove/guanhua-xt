<template>
  <div class="jigsaw">
    <topic ref="topicDOM" @verify="verify"></topic>

    <cnt-module name="拼图素材设置" :isMandatory="true">
      <div class="fodder_wrapper">
        <div class="insertImg" @click="showFileDialog()">
          <div class="insertImgBox insert_hook" ref="insertImgBOX" :style="{'height':imgBoxHeight}">
          </div>
          <div class="icon">
            <i-icon class="img" type="image"></i-icon>
            <i-icon class="add" type="android-add-circle"></i-icon>
          </div>
          <div class="tab">
            <div class="tr" v-for="tr in itable">
              <div class="td" v-for="td in tr">
                {{td}}
              </div>
            </div>
          </div>
        </div>
        <div class="setCtrl">
          行：
          <i-input v-model="tr" placeholder="请输入..." style="width: 100px" @on-change="initTab"></i-input>
          列：
          <i-input v-model="td" placeholder="请输入..." style="width: 100px" @on-change="initTab"></i-input>
        </div>
      </div>
    </cnt-module>

    <hint ref="hintDOM"></hint>
    <explanation ref="explanationDOM"></explanation>
  </div>
</template>

<script>
  import Topic from 'components/xiti_basic/topic/topic';
  import Hint from 'components/xiti_basic/hint/hint';
  import Explanation from 'components/xiti_basic/explanation/explanation';
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';

  import IInput from 'iview/src/components/input';
  import IIcon from 'iview/src/components/icon';

  import $ from 'expose-loader?$!jquery';
  import {replaceSrc} from 'utils/utilities';
  import {verifyMixin} from 'common/js/mixin';
  import {mapMutations} from 'vuex';

  export default {
    mixins: [verifyMixin],
    data() {
      return {
        answer: '-1',
        isPass: false,
        tr: 3,
        td: 2,
        itable: [],
        imgBoxHeight: '300px'
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.initTab();
        $(document).on('mouseup', () => {
          setTimeout(() => {
            this.init();
            this.verify();
          }, 100);
        });
      });
    },
    methods: {
      initTab: function () {
        this.itable = [];
        for (let r = 0; r < this.tr; r++) {
          this.itable.push([]);
          for (let d = 0; d < this.td; d++) {
            this.itable[r].push('');
          }
        }
      },
      showFileDialog: function () {
        this.setTargetDom(this.$refs.insertImgBOX);
        this.showFileDia({
          status: true,
          name: '插入图片',
          type: 'image'
        });
      },
      init() {
        this.imgBoxHeight = $(this.$refs.insertImgBOX).children().length > 0 ? 'auto' : '300px';
      },
      getQuestionData: function (urlSnippet) {
        let _topic = this.$refs.topicDOM.topic;
        let _hint = this.$refs.hintDOM.hint;
        let _explanation = this.$refs.explanationDOM.explanation;
        let imgDom = $('.insert_hook').html().trim();

        let questionData = {
          title: document.title,
          topic: replaceSrc(_topic, urlSnippet),
          jigsawImg: replaceSrc(imgDom, urlSnippet),
          itable: {r: this.tr * 1, d: this.td * 1},
          hint: replaceSrc(_hint, urlSnippet),
          explanation: replaceSrc(_explanation, urlSnippet),
          questionType: 'jigsaw'
        };
        let localData = {
          title: document.title,
          topic: replaceSrc(_topic),
          jigsawImg: replaceSrc(imgDom),
          itable: {r: this.tr * 1, d: this.td * 1},
          hint: replaceSrc(_hint),
          explanation: replaceSrc(_explanation),
          questionType: 'jigsaw'
        };
        return {
          questionData,
          localData
        };
      },
      getIsPass() {
        if ($('.insertImgBox').find('.insertFile_hook').length < 1) {
          return [false];
        }
        return [
          this.$refs.topicDOM.isPass
        ];
      },
      ...mapMutations({
        showFileDia: 'SET_FILEDIALOGINFO',
        setTargetDom: 'SET_TARGETDOM'
      })
    },
    components: {
      Topic,
      Hint,
      Explanation,
      CntModule,
      IInput,
      IIcon
    }
  };
</script>

<style lang="stylus">
  @import '../../../common/stylus/variable.styl'
  .jigsaw
    .fodder_wrapper
      .insertImg
        display: inline-block
        width: 400px
        border: 1px solid $bdcolor-g
        background-color: #fff
        position: relative
        &:hover
          border-color: $bdcolor-blue
          outline: $bdcolor-blue solid 1px
        .icon
          position: absolute
          top: 50%
          left: 50%
          transform: translate(-50%, -50%)
          color: $font-color-o-grey
          z-index: 1
          .img
            font-size: 80px
          .add
            position: absolute
            top: 40px
            left: 50px
            background-color: #fff
            font-size: 40px
            border: 1px solid #fff
            padding: 0 3px
            border-radius: 50%
        .insertImgBox
          position: relative
          top: 0
          left: 0
          z-index: 2
          width: 100%
          img.insertFile
            width: 100%
            max-width: none
            max-height: none
        .tab
          width: 100%
          height: 100%
          position: absolute
          left: 0
          top: 0
          z-index: 3
          display: flex
          flex-direction: column
          .tr
            flex: 1
            display: flex
            border-style: solid
            border-color: $bdcolor-g
            border-left-width: 1px
            border-bottom-width: 1px
            .td
              flex: 1
              border-style: solid
              border-color: $bdcolor-g
              border-right-width: 1px
              border-top-width: 1px

      .setCtrl
        margin: 20px 0 10px 20px
</style>

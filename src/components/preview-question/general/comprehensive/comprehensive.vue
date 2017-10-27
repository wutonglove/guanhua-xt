<template>
  <div class="comprehensive">
    <transition-group tag="div" name="slide" class="question_content">
      <div is="i-content"
           v-for="(question,index) in questionData.context"
           :key="'question'+index"
           v-show="index === curr-1"
           :questionData="questionData.context[index]"
           ref="contentDOM"
           :isDisabled="isDisabled"
      ></div>
    </transition-group>

    <page v-if="results.length===0" class="page_ctrl" :total="questionData.context.length" :page-size="1"
          @on-change="linkPage"></page>
    <ul v-else class="show_box">
      <li class="item"
          :class="{'correct':result === 1,'error':result === 0,'empty':result ===-1}"
          v-for="(result,index) in results"
          @click="linkPage(index+1)"
      >{{index + 1}}
      </li>
    </ul>
  </div>
</template>

<script>
  import Page from 'iview/src/components/page';
  import {submitMixin} from 'common/js/mixin';

  export default {
    mixins: [submitMixin],
    // 组件循环引用 debug
    beforeCreate: function () {
      this.$options.components.IContent = require('../../../preview-part/general-content/general-content');
    },
    data() {
      return {
        curr: 1,
        answer: [],
        results: [],
        isDisabled: false
      };
    },
    methods: {
      linkPage(current) {
        this.curr = current;
      },
      getResult() {
        console.log(this.$refs.contentDOM);
        for (let i = 0; i < this.$refs.contentDOM.length; i++) {
          let res = this.$refs.contentDOM[i].getResult();
          if (res === -1) {
            return -1;
          }
          if (res === 0) {
            return 0;
          }
        }
        return 1;
      }
    },
    watch: {
      isDisabled() {
        this.isDisabled = true;
      }
    },
    components: {
      Page
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../../common/stylus/variable.styl'
  .comprehensive
    width: 100%
    position: absolute
    top: 52px
    bottom: 0
    left: 0
    box-sizing: border-box
    padding: 0 34px 35px
    .question_content
      width: 100%
      height: 100%
      box-sizing: border-box
      padding: 20px
      background-color: $bgc-gradient-white1
      overflow: auto
    .page_ctrl
      position: absolute
      bottom: 0
      left: 43px
    .show_box
      width: 100%
      height: 32px
      position: absolute
      bottom: 0
      left: 0
      text-align: center
      .item
        display: inline-block
        width: 64px
        height: 32px
        line-height: 32px
        margin: 3px 3px
        border: 1px solid $bdcolor-g
        font-size: 18px
        color: #000
        border-radius: 3px
        &.correct
          background-color: $background-green
        &.error
          background-color: $background-red
        &.empty
          background-color: $background-grey
    .slide-enter-active, .slide-leave-active
      transition: all .3s;
    .slide-enter, .slide-leave-to
      transform: translate3d(0, 100%, 0)
      opacity: .1
</style>

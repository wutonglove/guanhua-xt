<template>
  <div class="comprehensive">
    <div class="question_content">
      <div is="i-content"
           v-for="(question,index) in questionData.context"
           v-show="index === curr-1"
           :questionData="questionData.context[index]"
           ref="contentDOM"
           :isDisabled="isDisabled"
      ></div>
    </div>

    <page v-if="results.length===0" class="page_ctrl" :total="questionData.context.length" :page-size="1" @on-change="linkPage"></page>
    <ul v-else class="show_box">
      <li class="item"
          :class="{'correct':result === 1,'error':result === 0,'empty':result ===-1}"
          v-for="(result,index) in results"
          @click="linkPage(index+1)"
      >{{index+1}}</li>
    </ul>
  </div>
</template>

<script>
  import Page from 'iview/src/components/page';

  export default {
    // 组件循环引用 debug
    beforeCreate: function () {
      this.$options.components.IContent = require('../content/content');
    },
    props: {
      questionData: {
        type: Object
      }
    },
    data(){
      return {
        curr: 1,
        answer: [],
        isDisabled: false,
        results:[]
      };
    },
    methods: {
      linkPage: function (current) {
        this.curr = current;
      },
      getAnswer: function () {
        this.answer = [];
        this.$refs.contentDOM.forEach((item, index) => {
          this.answer.push(item.answer);
        })
      }
    },
    watch: {
      isDisabled(){
        this.results = this.$store.state.comprehensive.result;
      }
    },
    components: {
      Page
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../common/stylus/variable.styl'
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
      width:100%
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
        margin:3px 3px
        border:1px solid $bdcolor-g
        font-size: 18px
        color: #000
        border-radius: 3px
        &.correct
          background-color:$background-green
        &.error
          background-color:$background-red
        &.empty
          background-color:$background-grey
</style>

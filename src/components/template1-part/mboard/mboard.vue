<template>
  <div class="box-outer-bd" :style="{height}">
    <div class="mboard-box">
      <div class="box-header" v-if="hasHeader">
        <input v-model="title" type="text" class="title" :maxLength="mboard.titleLength" v-if="hasTitle">
        <div class="desc">
          <span class="count" v-if="mboard.titleLength">
            <span class="curn">{{filterDoubleDigit(title.length)}}</span>/<span
            class="total">{{mboard.titleLength}}</span>
          </span>
        </div>
      </div>
      <div class="box-content">
        <div class="box-inner" :style="{'margin-top':this.hasHeader?'40px':'0px'}">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.title = this.mboard.title || '';
    },
    props: {
      mboard: {
        type: Object
      }
    },
    computed: {
      hasHeader() {
        if (typeof this.mboard.hasHeader === 'undefined') return true;
        return this.mboard.hasHeader;
      },
      hasTitle() {
        if (typeof this.mboard.hasTitle === 'undefined') return true;
        return this.mboard.hasTitle;
      },
      height() {
        return this.mboard.height || '480px';
      }
    },
    data() {
      return {
        title: ''
      };
    },
    methods: {
      filterDoubleDigit(num) {
        return num.toString().length < 2 ? '0' + num : num;
      },
      getQuestionData(url) {
        return this.$refs.mainDOM.getQuestionData(url);
      }
    }
  };
</script>

<style scoped lang="stylus">
  .box-outer-bd
    border: 2px solid #E49941
    box-shadow: 0 0 24px 4px #e49941 inset;
    border-radius: 12px
    box-sizing: border-box
    padding: 6px
    .mboard-box
      width: 100%
      height: 100%
      border: 1px solid #D8AD6C
      border-radius: 12px
      overflow: hidden
      background-color: #AF7320
      position: relative
      .box-header
        width: 100%
        height: 40px
        background: url('/static/images/title_bg.jpg')
        box-shadow: 0 0 100px 8px rgba(0, 0, 0, 0.5)
        position: absolute
        z-index: 1
        .title
          display: block
          width: 690px
          height: 30px
          line-height: 30px
          margin: 0 auto
          margin-top: 5px
          border: 1px solid #BA8A51
          border-radius: 4px
          text-align: center
          background: linear-gradient(to bottom, #E5A962, #B37F44)
          font-size: 24px
          &::-webkit-input-placeholder
            color: #333
        .desc
          position: absolute
          right: 8px
          top: 20px
          display: flex
          width: 74px
          .count
            color: #646464
      .box-content
        height: 100%
        display: flex
        .box-inner
          position: relative
          flex: 1
          margin: 0 8px
          background: url('/static/images/box_inner_bg.jpg')
          border: 1px solid #B58748
          border-radius: 12px
          box-shadow: 0 0 350px 2px rgba(0, 0, 0, 0.3) inset
</style>

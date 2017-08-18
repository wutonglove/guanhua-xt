<template>
  <div class="vote">
    <p class="vote_type">【{{voteType}}】</p>
    <div class="options_wrapper">
      <div class="option" :class="{'active':option.selected}" v-for="option in options" @click="selected(option)">
        <span class="text" v-html="option.text"></span>
        <span class="icon">{{option.icon}}</span>
        <Icon class="selected_icon" type="checkmark-circled" :size="25"></Icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      questionData: {
        type: Object
      }
    },
    computed: {
      voteType() {
        return this.questionData.voteType === 'multiple' ? '不定项投票' : '单项投票';
      }
    },
    data() {
      return {
        options: this.questionData.options,
        isDisabled: false,
        answer: this.$store.state[this.questionData.questionType].IAnswer
      };
    },
    mounted() {
      this.options.forEach((item, index) => {
        this.$set(item, 'selected', false);
      });
    },
    methods: {
      selected: function (option) {
        if (this.questionData.voteType === 'multiple') {
          option.selected = !option.selected;
        } else {
          this.options.forEach((item, index) => {
            item.selected = false;
          });
          option.selected = true;
        }
      }
    },
    watch: {
      options: {
        deep: true,
        handler() {
          this.answer = [];
          this.options.forEach((item, index) => {
            if (item.selected) {
              this.answer.push(item.icon);
            }
          });
        }
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../common/stylus/variable.styl'

  .vote
    .vote_type
      font-size: 18px
    .options_wrapper
      margin-top: 15px
      font-size: 0
      vertical-align: middle
      :after
        content: '.'
        display: block
        width: 0
        height: 0
        clear: both
      .option
        display: table
        table-layout: fixed
        width: 120px
        height: 120px
        margin: 10px 10px 30px
        border: 2px solid $bdcolor-g
        background-color: #fff
        font-size: 16px
        text-align: center
        position: relative
        float: left
        .text
          display: table-cell
          width: 100%
          height: 100%
          vertical-align: middle
        .icon
          position: absolute
          bottom: -30px
          left: 0
          width: 100%
          text-align: center
          font-size: 20px
        .selected_icon
          position: absolute
          top: 2px
          right: 2px
          color: $font-color-green
          display: none
        &.active
          background-color: $background-o-blue
          .selected_icon
            display: block
</style>

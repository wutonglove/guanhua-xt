<template>
  <div class="sort">

    <draggable v-model="options" class="options_wrapper" @end="setAnswer">
      <transition-group>
        <div class="div option" v-for="(option,index) in options" :key="index">
          <span class="text">{{option.text}}</span>
        </div>
      </transition-group>
    </draggable>

  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import {createRandomArr} from 'utils/utilities';
  import {submitMixin} from 'common/js/mixin';

  export default {
    mixins: [submitMixin],
    data() {
      return {
        isDisabled: false,
        options: [],
        answer: []
      };
    },
    mounted() {
      this.$nextTick(() => {
        this._initOptions();
        this.setAnswer();
      });
    },
    methods: {
      _initOptions: function () {
        console.log(this.questionData);
        let l = this.questionData.options.length;
        let indexes = createRandomArr(l, 0, l - 1);
        for (let i = 0; i < indexes.length; i++) {
          let option = this.questionData.options[indexes[i]];
          this.options.push(option);
        }
      },
      setAnswer: function () {
        this.answer = [];
        this.options.forEach((item, index) => {
          this.answer.push(item.id);
        });
      },
      getResult() {
        for (let i = 0; i < this.answer.length; i++) {
          if (this.answer[i] !== i) {
            return 0;
          }
        }
        return 1;
      }
    },
    components: {
      draggable
    }
  };
</script>

<style lang="stylus">
  @import '../../../../common/stylus/variable.styl'

  .sort
    .options_wrapper
      margin-top: 15px
      font-size: 0
      vertical-align: middle
      min-height: 160px
      &:after
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
</style>

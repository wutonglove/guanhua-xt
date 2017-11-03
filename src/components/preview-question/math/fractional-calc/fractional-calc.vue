<template>
  <div class="fractional-calc">
    <div class="title">请在空格中填写正确的数字使等式成立</div>
    <div class="equation_wrap">
      <div class="equation_item" v-for="item in questionData.equation">
        <div class="fractional" v-if="typeof item !== 'string'">
          <div :class="{equation_md:Array.isArray(half)}" v-for="half in item">
            <div class="line" v-if="half === '-'"></div>
            <div class="half" v-else>
              <div class="num_box" v-if="Array.isArray(half)">
                <div style="display: inline-block;"
                     v-for="num in half"
                >
                  <span class="symbol" v-if="num.text === 'x'">{{num.text}}</span>
                  <input type="number" class="num_input" v-else-if="num.text !== 'x' && num.active" :maxlength="6">
                  <span class="num" v-else>{{num.text}}</span>
                </div>
              </div>
              <input type="number" class="num_input" v-else-if="half.active" :maxlength="6">
              <div class="num" v-else>
                {{half.text}}
              </div>
            </div>
          </div>
        </div>
        <div class="symbol" v-else>{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {submitMixin} from 'common/js/mixin';
  import $ from 'expose-loader?$!jquery';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    methods: {
      getResult() {
        let $inputs = $('input.num_input');
        for (let i = 0; i < $inputs.length; i++) {
          if ($inputs.eq(i).val().trim() !== this.questionData.answer[i]) {
            return 0;
          }
        }
        return 1;
      }
    }
  };
</script>

<style scoped lang="stylus">
  .fractional-calc
    .title
      font-size: 20px
      text-align: center
      margin: 50px 0 30px
    .equation_wrap
      text-align: center
      .equation_item
        display: inline-block
        vertical-align: top
        .fractional
          .equation_md
            display: inline-block
          .num
            display: inline-block
            text-align: center
            min-width: 60px
            height: 48px
            margin: 10px 5px
            line-height: 48px
            font-size: 18px
            color: #8a5d1b
            font-weight: 800
            cursor: pointer
            border-radius: 4px
            box-shadow: inset 0 4px 13px rgba(255, 226, 181, .4), 1px 1px 8px rgba(68, 49, 19, .34)
            background: linear-gradient(to top, #b7935a, #F6DEB5)
          .num_input
            text-align: center
            width: 60px
            height: 48px
            margin: 10px 5px
            line-height: 48px
            font-size: 18px
            color: #8a5d1b
            font-weight: 800
            border-radius: 4px
            background-color: #c69856
            box-shadow: 1px 1px 8px rgba(68, 49, 19, .34)
            border: none
          .num_box
            .symbol
              line-height: 68px
          .line
            display: block
            height: 2px
            background: #8d5d11
            box-shadow: 0.31px 0.53px 0 0 rgba(255, 255, 255, .294)
        .symbol
          display: inline-block
          width: 20px
          text-align: center
          margin: 0 5px
          font-size: 22px
          line-height: 138px

</style>

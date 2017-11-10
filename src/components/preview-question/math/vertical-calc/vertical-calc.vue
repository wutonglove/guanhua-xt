<template>
  <div class="vertical-calc">
    <div class="vertical_box">
      <!-- 加减计算 -->
      <div class="add_sub_box" v-if="/[+\-]/.test(symbol)">
        <div class="clac_num_x2">
          <div class="num_wrap">
            <div class="num_out_box" v-for="(num,index) in numArr1">
              <div class="dot_btn_box">
                <a href="javascript:void(0)" class="num_btn"
                   v-if="num.hasDot">.</a>
              </div>
              <div class="num_btn_box" v-if="!num.numActive">
                <a href="javascript:void(0)" class="num_btn"
                   v-if="num.key">{{num.key}}</a>
              </div>
              <div class="num_input_box" v-else>
                <input type="text" class="num_input">
              </div>
            </div>
          </div>
          <div class="num_wrap">
            <div class="num_out_box" v-for="(num,index) in numArr2">
              <div class="dot_btn_box">
                <a href="javascript:void(0)" class="num_btn"
                   v-if="num.hasDot">.</a>
              </div>
              <div class="num_btn_box" v-if="!num.numActive">
                <a href="javascript:void(0)" class="num_btn"
                   v-if="num.key">{{num.key}}</a>
              </div>
              <div class="num_input_box" v-else>
                <input type="text" class="num_input">
              </div>
            </div>
          </div>
          <div class="symbol">{{symbol}}</div>
        </div>
        <span class="line"></span>
        <div class="clac_result">
          <div class="num_wrap">
            <div class="num_out_box" v-for="(num,index) in resultArr">
              <div class="dot_btn_box">
                <a href="javascript:void(0)" class="num_btn"
                   v-if="num.hasDot">.</a>
              </div>
              <div class="num_btn_box" v-if="!num.numActive">
                <a href="javascript:void(0)" class="num_btn"
                   v-if="num.key">{{num.key}}</a>
              </div>
              <div class="num_input_box" v-else>
                <input type="text" class="num_input">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 乘法计算 -->
      <div class="multiply_box" v-else-if="symbol==='x'">
        <div class="clac_num_x2">
          <div class="num_wrap">
            <div class="num_out_box" v-for="num in numToArr(this.num1)">
              <div class="dot_btn_box">
                <a href="javascript:void(0)" class="num_btn" v-if="num.hasDot">.</a>
              </div>
              <div class="num_btn_box">
                <a href="javascript:void(0)" class="num_btn" v-if="num.key">{{num.key}}</a>
              </div>
            </div>
          </div>
          <div class="num_wrap">
            <div class="num_out_box" v-for="num in numToArr(this.num2)">
              <div class="dot_btn_box">
                <a href="javascript:void(0)" class="num_btn" v-if="num.hasDot">.</a>
              </div>
              <div class="num_btn_box">
                <a href="javascript:void(0)" class="num_btn" v-if="num.key">{{num.key}}</a>
              </div>
            </div>
          </div>
          <div class="symbol">{{symbol}}</div>
        </div>
        <span class="line"></span>
        <div class="num_wrap" v-for="(numWrap,r) in mulCalcStep">
          <div class="num_out_box" v-for="(num,c) in numWrap">
            <div class="dot_btn_box">
              <a href="javascript:void(0)" class="num_btn" v-if="num.hasDot">.</a>
            </div>
            <div class="num_btn_box" v-if="!num.numActive">
              <a href="javascript:void(0)" class="num_btn"
                 v-if="num.key">{{num.key}}</a>
            </div>
            <div class="num_input_box" v-else>
              <input type="text" class="num_input">
            </div>
          </div>
        </div>
        <span class="line"></span>
        <div class="clac_result">
          <div class="num_wrap">
            <div class="num_out_box" v-for="num in resultArr">
              <div class="dot_btn_box">
                <a href="javascript:void(0)" class="num_btn"
                   v-if="num.hasDot">.</a>
              </div>
              <div class="num_btn_box" v-if="!num.numActive">
                <a href="javascript:void(0)" class="num_btn"
                   v-if="num.key">{{num.key}}</a>
              </div>
              <div class="num_input_box" v-else>
                <input type="text" class="num_input">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 除法 -->
      <div class="division_box" v-else>

        <div class="dividend_box">
          <div class="num_wrap">
            <div class="num_out_box" v-for="num in numArr2">

              <div class="dot_btn_box" :class="{'del':num.hasDot}">
                <a href="javascript:void(0)" class="num_btn" v-if="num.hasDot">.</a>
              </div>
              <div class="num_btn_box">
                <a href="javascript:void(0)" class="num_btn" v-if="num.key">{{num.key}}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="division_right">
          <div class="clac_result">
            <div class="num_wrap">
              <div class="num_out_box" v-for="num in resultArr">
                <div class="dot_btn_box">
                  <a href="javascript:void(0)" class="num_btn"
                     v-if="num.hasDot">.</a>
                </div>
                <div class="num_btn_box" v-if="!num.numActive">
                  <a href="javascript:void(0)" class="num_btn"
                     v-if="num.key">{{num.key}}</a>
                </div>
                <div class="num_input_box" v-else>
                  <input type="text" class="num_input">
                </div>
              </div>
            </div>
          </div>
          <div class="division_clac_box" ref="divisionBox">
            <div class="division_step_box" v-for="(numWrap,index) in divCalcStep">
              <div class="num_wrap">
                <div class="num_out_box" v-for="num in numWrap[0]">
                  <div class="dot_btn_box" :class="{'del':num.dotIsShow}">
                    <a href="javascript:void(0)" class="num_btn"
                       v-if="num.hasDot">.</a>
                  </div>
                  <div class="num_btn_box" :class="{'virtual':num.virtual}">
                    <a href="javascript:void(0)" class="num_btn"
                       v-if="num.key">{{num.key}}</a>
                  </div>
                </div>
              </div>
              <div class="num_wrap">
                <div class="num_out_box" v-for="num in numWrap[1]" v-if="numWrap[1]">
                  <div class="dot_btn_box">
                    <a href="javascript:void(0)" class="num_btn"
                       v-if="num.hasDot">.</a>
                  </div>
                  <div class="num_btn_box" v-if="!num.numActive">
                    <a href="javascript:void(0)" class="num_btn"
                       v-if="num.key">{{num.key}}</a>
                  </div>
                  <div class="num_input_box" v-else>
                    <input type="text" class="num_input">
                  </div>
                </div>
              </div>
              <span class="line" v-if="index<divCalcStep.length-1"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import divisionSign from './division_sign.png';
  import {submitMixin} from 'common/js/mixin';
  import $ from 'expose-loader?$!jquery';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    data() {
      return {
        numArr1: [],
        numArr2: [],
        resultArr: [],
        mulCalcStep: [],
        divCalcStep: [],
        symbol: ''
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.numArr1 = this.questionData.vertical.numArr1;
        this.numArr2 = this.questionData.vertical.numArr2;
        this.resultArr = this.questionData.vertical.resultArr;
        this.mulCalcStep = this.questionData.vertical.mulCalcStep;
        this.divCalcStep = this.questionData.vertical.divCalcStep;
        this.symbol = this.questionData.vertical.symbol;
        if (this.symbol === '÷') {
          this.$refs.divisionBox.style.backgroundImage = `url(${divisionSign})`;
        }
      });
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
  .vertical-calc
    padding-top:20px
    text-align: center
    .vertical_box
      display: block
      max-width: 100%
      .symbol
        font-size: 30px;
        font-weight: bolder;
        color: #824f06;
        text-shadow: 0 1px 2px #e3d3be;
        position: absolute
        top: 65px
        left: 5px
      .num_wrap
        display: flex
        justify-content: flex-end
        margin: 6px 0
        .num_out_box
          display: flex
          .num_btn_box
            flex: 0 0 60px
            width: 60px
            height: 45px
            line-height: 45px
            &.virtual
              .num_btn
                position: relative
                &:before
                  content: ""
                  display: block
                  position: absolute
                  top: 0
                  left: 0
                  width: 100%
                  height: 100%
                  border: 2px dashed #CE5F5A
                  border-radius: 4px
                  background-color: rgba(205, 96, 62, .3)
          .num_input_box
            flex: 0 0 60px
            width: 60px
            height: 45px
            line-height: 45px
            .num_input
              width: 100%
              height: 100%
              border: 2px solid #1F6EA6
              background: linear-gradient(to top, #6BABD3, #559ACE)
              font-size: 36px
              text-align: center
          .dot_btn_box
            flex: 0 0 20px
            width: 20px
            height: 24px
            margin: 20px 1px 0 3px
            line-height: 5px
            font-weight: 800
            &.del
              .num_btn
                position: relative
                &:before
                  content: "\\"
                  position: absolute
                  top: 0
                  left: 0
                  width: 100%
                  height: 100%
                  font-size: 30px
                  line-height: 20px
                  transform: rotate(-16deg);
                  font-weight: normal
                  color: #CB5250
                  text-shadow: none
          .num_btn
            display: block
            width: 100%
            height: 100%
            color: #824f06
            font-size: 36px
            text-align: center
            text-shadow: 0.5px 0.87px 0 hsla(0, 0%, 100%, .75);
            box-shadow: inset 0 4px 13px #ffe2b5, 1px 2px 10px rgba(68, 49, 19, .4);
            border-radius: 3px
            background: linear-gradient(to top, #ad8549, #FAE1B9);
            &:active
              box-shadow: 1px 2px 10px rgba(68, 49, 19, .4)
            &.active
              text-shadow: none
              color: #fff
              background: linear-gradient(to top, #3E8ABE, #2571B8)
              box-shadow: 1px 2px 10px rgba(68, 49, 19, .4);

      .clac_num_x2
        padding-left: 60px
        position: relative
      .line
        display: block
        width: 100%;
        height: 5.52px;
        border-top: 1px solid #9b6e29;
        background: #9b6e29;
        border-bottom: 1px solid #e5d4bf;
        margin: 3.07px 0;
      .add_sub_box
        display: inline-block
      .multiply_box
        display: inline-block
      .division_box
        white-space: nowrap
        .num_wrap
          justify-content: flex-start
        .dividend_box
          display: inline-block
          vertical-align: top
          margin-top: 65px
        .division_right
          display: inline-block
          .clac_result
            .num_wrap
              justify-content: flex-end
          .division_clac_box
            background-size: auto 70px
            background-repeat: no-repeat
            padding: 20px 0 0 30px
          .clac_result
            padding-left: 30px
</style>


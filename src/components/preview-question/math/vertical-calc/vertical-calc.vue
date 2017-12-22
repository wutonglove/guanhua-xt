<template>
  <div class="vertical-calc">
    <div class="vertical_box">
      <!-- 加减计算 -->
      <div class="add_sub_box" v-if="/[+\-]/.test(symbol)">
        <div class="clac_num_x2">
          <div class="num_wrap">
            <num-btn
              v-for="(num,index) in numArr1"
              :key="index"
              :text="num.key"
              :dotActive="num.dotActive"
              :numActive="num.numActive"
              :hasDot="num.hasDot"
              :mode="mode"
              :dotDisabled="num.dotDisabled"
              @dot-click="dotClickHandle(num, index)"
            ></num-btn>
          </div>
          <div class="num_wrap">
            <num-btn
              v-for="(num,index) in numArr2"
              :key="index"
              :text="num.key"
              :dotActive="num.dotActive"
              :numActive="num.numActive"
              :hasDot="num.hasDot"
              :mode="mode"
              :dotDisabled="num.dotDisabled"
              @dot-click="dotClickHandle(num, index)"
            ></num-btn>
          </div>
          <div class="symbol">{{symbol}}</div>
        </div>
        <span class="line"></span>
        <div class="clac_result">
          <div class="num_wrap">
            <num-btn
              v-for="(num,index) in resultArr"
              :key="index"
              :text="num.key"
              :dotActive="num.dotActive"
              :numActive="num.numActive"
              :hasDot="num.hasDot"
              :mode="mode"
              :dotDisabled="num.dotDisabled"
              @dot-click="dotClickHandle(num, index)"
            ></num-btn>
          </div>
        </div>
      </div>
      <!-- 乘法计算 -->
      <div class="multiply_box" v-else-if="symbol==='x'">
        <div class="clac_num_x2">
          <div class="num_wrap">
            <num-btn
              v-for="(num,index) in numArr1"
              :key="index"
              :text="num.key"
              :hasDot="num.hasDot"
              :mode="mode"
            ></num-btn>
          </div>
          <div class="num_wrap">
            <num-btn
              v-for="(num,index) in numArr2"
              :key="index"
              :text="num.key"
              :hasDot="num.hasDot"
              :mode="mode"
            ></num-btn>
          </div>
          <div class="symbol">{{symbol}}</div>
        </div>
        <span class="line"></span>
        <div class="num_wrap" v-for="(numWrap,r) in mulCalcStep">
          <num-btn
            v-for="(num,index) in numWrap"
            :key="index"
            :text="num.key"
            :numActive="num.numActive"
            :hasDot="num.hasDot"
            :mode="mode"
          ></num-btn>
        </div>
        <span class="line"></span>
        <div class="clac_result">
          <div class="num_wrap">
            <num-btn
              v-for="(num,index) in resultArr"
              :key="index"
              :text="num.key"
              :dotActive="num.dotActive"
              :numActive="num.numActive"
              :hasDot="num.hasDot"
              :mode="mode"
              :dotDisabled="num.dotDisabled"
              @dot-click="dotClickHandle(num, index)"
            ></num-btn>
          </div>
        </div>
      </div>
      <!-- 除法 -->
      <div class="division_box" v-else>

        <div class="dividend_box">
          <div class="num_wrap">
            <num-btn
              v-for="(num,index) in numArr2"
              :key="index"
              :text="num.key"
              :hasDot="num.hasDot"
              :dotIsDel="true"
              :mode="mode"
            ></num-btn>
          </div>
        </div>
        <div class="division_right">
          <div class="clac_result">
            <div class="num_wrap">
              <num-btn
                v-for="(num,index) in resultArr"
                :key="index"
                :text="num.key"
                :dotActive="num.dotActive"
                :numActive="num.numActive"
                :hasDot="num.hasDot"
                :mode="mode"
                :dotDisabled="num.dotDisabled"
                @dot-click="dotClickHandle(num, index)"
              ></num-btn>
            </div>
          </div>
          <div class="division_clac_box" ref="divisionBox">
            <div class="division_step_box" v-for="(numWrap,index) in divCalcStep">
              <div class="num_wrap">
                <num-btn
                  v-for="(num,index) in numWrap[0]"
                  :key="index"
                  :text="num.key"
                  :numActive="num.numActive"
                  :isVirtual="num.isVirtual"
                  :dotIsDel="true"
                  :mode="mode"
                ></num-btn>
              </div>
              <div class="num_wrap">
                <num-btn
                  v-for="(num,index) in numWrap[1]"
                  :key="index"
                  :text="num.key"
                  :numActive="num.numActive"
                  @num-click="numClickHandle({num, index})"
                  :mode="mode"
                ></num-btn>
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
  import NumBtn from 'components/template1-part/num-btn/num-btn';
  import divisionSign from './division_sign.png';
  import {submitMixin} from 'common/js/mixin';
//  import $ from 'expose-loader?$!jquery';
  const $ = window.$;

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
        symbol: '',
        mode: ['edit'],
        dotIndex: -1
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.numArr1 = this.setDot(this.questionData.vertical.numArr1);
        this.numArr2 = this.setDot(this.questionData.vertical.numArr2);
        this.resultArr = this.setDot(this.questionData.vertical.resultArr);
        this.mulCalcStep = this.questionData.vertical.mulCalcStep;
        this.divCalcStep = this.questionData.vertical.divCalcStep;
        this.symbol = this.questionData.vertical.symbol;
        if (this.symbol === '÷') {
          this.$refs.divisionBox.style.backgroundImage = `url(${divisionSign})`;
        }
      });
    },
    methods: {
      setDot(arr) {
        let res = false;

        let _arr = arr.concat();
        for (let i = 0; i < _arr.length; i++) {
          arr[i] = Object.assign({}, _arr[i]);
        }

        for (let i = 0; i < _arr.length; i++) {
          if (_arr[i].dotActive) {
            res = _arr[i].dotActive;
            break;
          }
        }
        if (res) {
          for (let i = 0; i < _arr.length; i++) {
            if (_arr[i].key !== '') {
              _arr[i].dotActive = true;
              _arr[i].hasDot = true;
              _arr[i].dotDisabled = false;
            }
          }
        }
        return _arr;
      },
      dotClickHandle(num, index) {
        num.dotActive = !num.dotActive;
        if (!num.dotActive) this.dotIndex = index;
      },
      findDotBlank() {
        let n = 0;
        for (let i = 0; i < this.numArr1.length; i++) {
          if (this.numArr1[i].hasDot) n++;
        }
        if (n > 1) return 'numArr1';
        for (let i = 0; i < this.numArr2.length; i++) {
          if (this.numArr2[i].hasDot) n++;
        }
        if (n > 1) return 'numArr2';
        for (let i = 0; i < this.resultArr.length; i++) {
          if (this.resultArr[i].hasDot) n++;
        }
        if (n > 1) return 'resultArr';
        return '';
      },
      getResult() {
        let key = this.findDotBlank();
        if (key !== '') {
          let num = this.questionData.vertical[key][this.dotIndex];
          if (!num.dotActive) return 0;
        }
        let $inputs = $('input.num_input');
        for (let i = 0; i < $inputs.length; i++) {
          if ($inputs.eq(i).val().trim() !== this.questionData.answer[i]) {
            return 0;
          }
        }
        return 1;
      }
    },
    components: {
      NumBtn
    }
  };
</script>

<style scoped lang="stylus">
  .vertical-calc
    padding-top: 20px
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
          padding-left: 20px
        .division_right
          display: inline-block
          padding-right: 20px
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


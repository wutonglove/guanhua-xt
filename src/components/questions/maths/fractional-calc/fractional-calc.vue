<template>
  <mboard :mboard="mboard">
    <transition-group tag="ul" class="fractional_calc" name="slide">
      <li class="calc_step calc_step_1" key="step1" v-show="curIndex === 0">
        <div class="fractional_input_box">
          <div class="title">请输入完整的算式</div>
          <input type="text" class="fractional_input" v-model="inputStr" maxlength="15" ref="equationInput"/>
          <ul class="num_btn_box">
            <li class="num_btn btn" v-for="num in numBtns" @click="inputNum(num)">{{num}}</li>
          </ul>
          <ul class="calc_symbol_box">
            <li class="calc_btn btn" @click="inputSymbol('+')">+</li>
            <li class="calc_btn btn" @click="inputSymbol('-')">-</li>
            <li class="calc_btn btn" @click="inputLine">/</li>
            <li class="calc_btn btn" @click="deleteWord">
              <i-icon type="ios-arrow-thin-left" :size="20" style="transform:scaleX(3);font-weight:800"></i-icon>
            </li>
          </ul>
        </div>
        <a class="step_btn" @click="next">下一步</a>
      </li>
      <li class="calc_step calc_step_2" key="step2" v-show="curIndex === 1">
        <div class="equation_box" v-if="curIndex ===1">
          <div class="title">点击数字选项设置“待填空项”</div>
          <div class="equation_wrap">
            <div class="equation_item" v-for="item in equation">
              <div class="fractional" v-if="typeof item !== 'string'">
                <div :class="{equation_md:Array.isArray(half)}" v-for="half in item">
                  <div class="line" v-if="half === '-'"></div>
                  <div class="half" v-else>
                    <div class="num_box" v-if="Array.isArray(half)">
                      <div style="display: inline-block;"
                           v-for="num in half"
                      >
                        <span class="symbol" v-if="num.text === 'x'">{{num.text}}</span>
                        <span class="num" :class="{active:num.active}" @click="selected(num)" v-else>{{num.text}}</span>
                      </div>
                    </div>
                    <div class="num" :class="{active:half.active}" @click="selected(half)" v-else>
                      {{half.text}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="symbol" v-else>{{item}}</div>
            </div>
          </div>
        </div>
        <a class="step_btn" @click="prev">上一步</a>
        <div class="calc_config">
          <i-checkbox v-model="isMinMultiple" style="font-size: 15px;">只允许最小公倍数通分</i-checkbox>
          <i-checkbox v-model="isReduction" style="font-size: 15px;">计算结果自动约分</i-checkbox>
        </div>
      </li>
    </transition-group>
  </mboard>
</template>

<script>
  import Mboard from 'components/template1-part/mboard/mboard';

  import IIcon from 'iview/src/components/icon';
  import ICheckbox from 'iview/src/components/checkbox';
  import Notice from 'iview/src/components/notice';
  import {gcd} from 'utils/utilities';
  import $ from 'expose-loader?$!jquery';

  export default {
    props: {
      mboard: {
        type: Object
      }
    },
    data() {
      return {
        curIndex: 0,
        numBtns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        inputStr: '',
        isMinMultiple: false,
        isReduction: false,
        equation: []
      };
    },
    computed: {
      fractional1() {
        return this.inputStr.split(/[+-]/)[0];
      },
      fractional2() {
        return this.inputStr.split(/[+-]/)[1];
      },
      multiple1() {
        if (!this.fractional1 || !this.fractional2) return 0;
        let num1 = this.fractional1.split('/')[1];
        let num2 = this.fractional2.split('/')[1];
        return this.isMinMultiple ? num1 / gcd(num1, num2) : num1;
      },
      multiple2() {
        if (!this.fractional1 || !this.fractional2) return 0;
        let num1 = this.fractional1.split('/')[1];
        let num2 = this.fractional2.split('/')[1];
        return this.isMinMultiple ? num2 / gcd(num1, num2) : num2;
      },
      symbol() {
        return this.inputStr.match(/[+-]/) ? this.inputStr.match(/[+-]/)[0] : '';
      },
      clacResult() {
        let numerator = this.fractional1.split('/')[0] * this.multiple2 + this.fractional2.split('/')[0] * this.multiple1;
        let denominator = this.fractional1.split('/')[1] * this.multiple2;
        let divisor = gcd(numerator, denominator);

        numerator = this.isReduction ? numerator / divisor : numerator;
        denominator = this.isReduction ? denominator / divisor : denominator;

        return {
          numerator,
          denominator
        };
      }
    },
    methods: {
      initEquation() {
        this.equation = [
          [
            {
              text: this.fractional1.split('/')[0],
              click: false
            },
            '-',
            {
              text: this.fractional1.split('/')[1],
              click: false
            }
          ],
          this.symbol,
          [
            {
              text: this.fractional2.split('/')[0],
              click: false
            },
            '-',
            {
              text: this.fractional2.split('/')[1],
              click: false
            }
          ],
          '=',
          [
            [
              {
                text: this.fractional1.split('/')[0],
                click: true,
                active: false
              },
              {text: 'x'},
              {
                text: this.multiple2,
                click: true,
                active: false
              }
            ],
            '-',
            [
              {
                text: this.fractional1.split('/')[1],
                click: true,
                active: false
              },
              {text: 'x'},
              {
                text: this.multiple2,
                click: true,
                active: false
              }
            ]
          ],
          this.symbol,
          [
            [
              {
                text: this.fractional2.split('/')[0],
                click: true,
                active: false
              },
              {text: 'x'},
              {
                text: this.multiple1,
                click: true,
                active: false
              }
            ],
            '-',
            [
              {
                text: this.fractional2.split('/')[1],
                click: true,
                active: false
              },
              {text: 'x'},
              {
                text: this.multiple1,
                click: true,
                active: false
              }
            ]
          ],
          '=',
          [
            {
              text: this.clacResult.numerator,
              click: true,
              active: false
            },
            '-',
            {
              text: this.clacResult.denominator,
              click: true,
              active: false
            }
          ]
        ];
      },
      next() {
        let reg2 = /\//g;
        let line = !this.inputStr.match(reg2) || this.inputStr.match(reg2).length < 2;
        if (line || !this.fractional1 || !this.fractional2) {
          Notice.destroy();
          Notice.error({
            desc: '输入的分式加减不正确，正确的格式如下：1/2+1/3'
          });
          return;
        }
        this.curIndex = 1;
      },
      prev() {
        this.curIndex = 0;
      },
      inputNum(num) {
        document.execCommand('insertText', false, num);
      },
      inputSymbol(symbol) {
        let reg = new RegExp('[+-]');
        if (reg.test(this.inputStr)) return 1;
        document.execCommand('insertText', false, symbol);
      },
      inputLine() {
        let index = this.$refs.equationInput.selectionStart;
        let reg1 = new RegExp(/\d/);
        let reg2 = /\//g;

        let indexN1 = !(!this.inputStr[index - 1] || reg1.test(this.inputStr[index - 1]));

        let l = !(!this.inputStr.match(reg2) || this.inputStr.match(reg2).length < 2);

        if (indexN1 || l) return;

        document.execCommand('insertText', false, '/');
      },
      deleteWord() {
        document.execCommand('delete', true);
      },
      selected(num) {
        if (num.click) num.active = !num.active;
      },
      getAnswer() {
        let ret = [];
        $('.active').each((index, item) => {
          ret.push($(item).html().trim());
        });
        return ret;
      },
      getQuestionData() {
        let questionData = {
          title: document.title,
          equation: this.equation,
          answer: this.getAnswer(),
          times: '',
          questionType: 'fractional-calc'
        };
        let localData = questionData;
        return {
          questionData,
          localData
        };
      },
      verifyHandle() {
        return $('.active').length > 0 ? 1 : 0;
      },
      showMessage() {
        if (this.verifyHandle()) {
          return 1;
        } else {
          Notice.destroy();
          Notice.warning({
            desc: '编辑内容不能为空'
          });
          return 0;
        }
      }
    },
    watch: {
      curIndex(newIndex) {
        if (newIndex === 1) {
          this.initEquation();
        }
      },
      isMinMultiple() {
        this.initEquation();
      },
      isReduction() {
        this.initEquation();
      }
    },
    components: {
      Mboard,
      IIcon,
      ICheckbox
    }
  }
  ;
</script>

<style scoped lang="stylus">
  .fractional_calc
    width: 100%
    height: 100%
    color: #4D310B
    .calc_step
      width: 100%
      height: 100%
      .step_btn
        position: absolute
        bottom: 20px
        text-align: center
        width: 100px
        height: 30px
        line-height: 30px
        border-radius: 3px
        color: #825318
        font-size: 14px
        background: linear-gradient(to top, #DAA35C, #F3C384)
        box-shadow: 0 1px 3.07px 0 rgba(164, 115, 38, .75), inset 0.5px 0.87px 0 0 rgba(255, 243, 228, .5)
        &:hover
          background: linear-gradient(to top, #E9B46E, #FACF96)
      .title
        width: 100%
        margin-bottom: 25px
        text-align: center
      &.calc_step_1
        .fractional_input_box
          width: 335px
          margin: 0 auto
          padding-top: 35px
          .fractional_input
            width: 329px
            margin: 0 3px
            padding: 0 10px
            height: 48px
            line-height: 48px
            font-size: 25px
            border: 1px solid #CF8E31
            border-radius: 3px
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, .3) inset
            background-color: #dedbd4
            color: #59390b
            text-shadow: 0.5px 0.87px 0 hsla(0, 0%, 100%, .9)
          .btn
            height: 48px
            line-height: 48px
            margin: 3px
            text-align: center
            font-size: 18px
            font-weight: 800
            border: 1px solid #C0842B
            border-radius: 3px
            box-shadow: inset 0 4px 13px #ffe2b5, 1px 2px 10px rgba(68, 49, 19, .4)
            cursor: pointer
            text-shadow: 0.5px 0.87px 0 hsla(0, 0%, 100%, .75)
          .num_btn_box
            display: flex
            justify-content: space-between
            flex-wrap: wrap
            .num_btn
              flex: 0 0 60px
              color: #8A5F23
              background: linear-gradient(to top, #b7935a, #FCE3BA)
          .calc_symbol_box
            display: flex
            justify-content: space-between
            .calc_btn
              &:not(:last-child)
                flex: 0 0 60px
                width: 60px
                color: #657688
                background: linear-gradient(to top, #BBC2B9, #ECF0EA)
                border-color: #A9CCD1
              &:last-child
                flex: 0 0 126px
                color: #CB5150
                background: linear-gradient(to top, #cab7a4, #FAD7CE)
                border-color: #F6C0BB
        .step_btn
          right: 30px
      &.calc_step_2
        .step_btn
          left: 30px
        .equation_box
          padding-top: 35px
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
                  &:active
                    background: linear-gradient(to top, #F6DEB5, #b7935a)
                  &.active
                    cursor: default
                    background: linear-gradient(to top, #3E8ABE, #2570B8)
                    color: #fff
                    box-shadow: none
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

        .calc_config
          position: absolute
          bottom: 20px
          right: 10px
          color: #4d2f06

  .slide-enter-active, .slide-leave-active
    transition: all 1s

  .slide-enter, .slide-leave-to
    transform: translateX(-100%)
</style>

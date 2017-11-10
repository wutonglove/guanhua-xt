<template>
  <transition-group tag="ul" class="vertical_calc" name="slide">
    <li class="calc_step_1" key="step1" v-show="curIndex === 0">
      <div class="vertical_input_box">
        <div class="title">1、请输入完整的版式</div>
        <input type="text" class="equation_input" v-model="inputStr" ref="equationInput"/>
        <ul class="num_btn_box">
          <li class="calc_btn" v-for="key in calcBtns">
            <a href="javascript:void(0)" class="num_btn" v-if="/[\d\.]/.test(key)" @click="setInputStr(key)">{{key}}</a>
            <a href="javascript:void(0)" class="del_btn" v-else-if="key === '←'" @click="backspace">{{key}}</a>
            <a href="javascript:void(0)" class="symbol_btn" v-else @click="setInputStr(key)">{{key}}</a>
          </li>
        </ul>
      </div>
      <a class="step_btn" @click="next">下一步</a>
    </li>
    <li class="calc_step_2" key="step2" v-show="curIndex === 1">
      <div class="vertical_show_box" v-if="curIndex ===1">
        <div class="title">2、点击数字选项设置“待填空项”</div>
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
                  @num-click="numClickHandle({num, index, nums:numArr1})"
                  @dot-click="dotClickHandle({num})"
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
                  @num-click="numClickHandle({num, index, nums:numArr1})"
                  @dot-click="dotClickHandle({num})"
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
                  @num-click="numClickHandle({num, index, nums:numArr1})"
                  @dot-click="dotClickHandle({num})"
                ></num-btn>
              </div>
            </div>
          </div>
          <!-- 乘法计算 -->
          <div class="multiply_box" v-else-if="symbol==='x'">
            <div class="clac_num_x2">
              <div class="num_wrap">
                <!--
                <div class="num_out_box" v-for="num in numArr1">
                  <div class="dot_btn_box">
                    <a href="javascript:void(0)" class="num_btn" v-if="num.hasDot">.</a>
                  </div>
                  <div class="num_btn_box">
                    <a href="javascript:void(0)" class="num_btn" v-if="num.key">{{num.key}}</a>
                  </div>
                </div>
                -->
                <num-btn
                  v-for="(num,index) in numArr1"
                  :key="index"
                  :text="num.key"
                  :hasDot="num.hasDot"
                ></num-btn>
              </div>
              <div class="num_wrap">
                <!--
                <div class="num_out_box" v-for="num in numToArr(this.num2)">
                  <div class="dot_btn_box">
                    <a href="javascript:void(0)" class="num_btn" v-if="num.hasDot">.</a>
                  </div>
                  <div class="num_btn_box">
                    <a href="javascript:void(0)" class="num_btn" v-if="num.key">{{num.key}}</a>
                  </div>
                </div>
                -->
                <num-btn
                  v-for="(num,index) in numArr2"
                  :key="index"
                  :text="num.key"
                  :hasDot="num.hasDot"
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
                @num-click="numClickHandle({num})"
              ></num-btn>
              <!--
              <div class="num_out_box" v-for="(num,c) in numWrap">
                <div class="dot_btn_box">
                  <a href="javascript:void(0)" class="num_btn" v-if="num.hasDot">.</a>
                </div>
                <div class="num_btn_box" @click="numClickHandle({num})">
                  <a href="javascript:void(0)" class="num_btn" :class="{'active':num.numActive}"
                     v-if="num.key">{{num.key}}</a>
                </div>
              </div>
              -->
            </div>
            <span class="line"></span>
            <div class="clac_result">
              <div class="num_wrap">
                <!--
                <div class="num_out_box" v-for="num in resultArr">
                  <div class="dot_btn_box" @click="dotClickHandle({num})">
                    <a href="javascript:void(0)" class="num_btn" :class="{'active':num.dotActive}"
                       v-if="num.hasDot">.</a>
                  </div>
                  <div class="num_btn_box" @click="numClickHandle({num})">
                    <a href="javascript:void(0)" class="num_btn" :class="{'active':num.numActive}"
                       v-if="num.key">{{num.key}}</a>
                  </div>
                </div>
                -->
                <num-btn
                  v-for="(num,index) in resultArr"
                  :key="index"
                  :text="num.key"
                  :dotActive="num.dotActive"
                  :numActive="num.numActive"
                  :hasDot="num.hasDot"
                  @num-click="numClickHandle({num})"
                  @dot-click="dotClickHandle({num})"
                ></num-btn>
              </div>
            </div>
          </div>
          <!-- 除法 -->
          <div class="division_box" v-else>

            <div class="dividend_box">
              <div class="num_wrap">
                <!--
                <div class="num_out_box" v-for="num in numArr2">
                  <div class="dot_btn_box" :class="{'del':num.dotIsShow}">
                    <a href="javascript:void(0)" class="num_btn" v-if="num.hasDot">.</a>
                  </div>
                  <div class="num_btn_box">
                    <a href="javascript:void(0)" class="num_btn" v-if="num.key">{{num.key}}</a>
                  </div>
                </div>
                -->
                <num-btn
                  v-for="(num,index) in numArr2"
                  :key="index"
                  :text="num.key"
                  :hasDot="num.hasDot"
                  :dotIsDel="num.dotIsDel"
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
                    @num-click="numClickHandle({num})"
                    @dot-click="dotClickHandle({num})"
                  ></num-btn>
                </div>
              </div>
              <div class="division_clac_box" ref="divisionBox">
                <div class="division_step_box" v-for="(numWrap,r) in divCalcStep">
                  <div class="num_wrap">
                    <num-btn
                      v-for="(num,index) in numWrap[0]"
                      :key="index"
                      :text="num.key"
                      :numActive="num.numActive"
                      :isVirtual="num.isVirtual"
                      @num-click="numClickHandle({num,index:r})"
                    ></num-btn>
                  </div>
                  <div class="num_wrap">
                    <num-btn
                      v-for="(num,index) in numWrap[1]"
                      :key="index"
                      :text="num.key"
                      :numActive="num.numActive"
                      @num-click="numClickHandle({num})"
                    ></num-btn>
                  </div>
                  <span class="line" v-if="r<divCalcStep.length-1"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a class="step_btn" @click="prev">上一步</a>
    </li>
  </transition-group>
</template>

<script>
  import Notice from 'iview/src/components/notice';
  import divisionSign from './division_sign.png';
  import $ from 'expose-loader?$!jquery';
  import NumBtn from 'base/num-btn/num-btn';

  class NumKey {
    constructor({key, hasDot, isVirtual, dotIsShow}) {
      this.key = key;
      this.hasDot = Boolean(hasDot);
      this.dotIsShow = Boolean(dotIsShow);
      this.numActive = false;
      this.dotActive = false;
      this.isVirtual = Boolean(isVirtual);
    }
  }
  // _ ： 虚位 0
  // / ：划掉的小数点
  export default {
    data() {
      return {
        curIndex: 0,
        inputStr: '',
        calcBtns: [1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, 'x', 0, '.', '←', '÷'],
        symbolReg: /[+\-x÷]/,
        numArr1: [],
        numArr2: [],
        resultArr: [],
        mulCalcStep: [],
        divCalcStep: []
      };
    },
    mounted() {
      this.fillEmpty(this.num1, this.num2);
    },
    computed: {
      num1() {
        return this.inputStr.split(this.symbolReg)[0] * 1 + '' || '';
      },
      num2() {
        return this.inputStr.split(this.symbolReg)[1] * 1 + '' || '';
      },
      symbol() {
        return this.inputStr.match(this.symbolReg)[0] || '';
      },
      resultNum() {
        let symbol;
        switch (this.symbol) {
          case '+':
            symbol = '+';
            break;
          case '-':
            symbol = '+';
            break;
          case 'x':
            symbol = '*';
            break;
          case '÷':
            symbol = '/';
            break;
        }
        let dot1 = this.num1.indexOf('.') !== -1 ? this.num1.length - this.num1.indexOf('.') - 1 : 0;
        let dot2 = this.num2.indexOf('.') !== -1 ? this.num2.length - this.num2.indexOf('.') - 1 : 0;
        let maxl = dot1 + dot2;
        /* eslint-disable no-eval */
        let res = window.eval(`${this.num1 * 1}${symbol}${this.num2 * 1}`);
        if (/[+-]/.test(this.symbol)) {
          maxl = Math.max(dot1, dot2);
          res = this.numToFixed(res, maxl);
        }
        if (this.symbol === 'x') res.toFixed(maxl);
        if (this.symbol === '÷') {
          res = this.numToFixed(res, 4);
          // 补空
          let num1 = this.num1.toString().replace('.', '');
          let num2 = this.num2.toString().replace('.', '');

          let i = 0;
          let _num = num1[i];
          while (num2 * 1 > _num * 1) {
            i++;
            _num += num1[i];
            res = ' ' + res;
          }
        }
        return res + '';
      },
      divClacNum1() {
        let num = this.num1;
        if (this.num2.indexOf('.') === -1) {
        } else {
          let dotIndex1 = this.num1.indexOf('.');
          let dotIndex2 = this.num2.indexOf('.');
          let dot2 = this.num2.length - dotIndex2 - 1;
          let dot1 = dotIndex1 === -1 ? 0 : this.num1.length - dotIndex1 - 1;
          let l = dot2 - dot1;
          if (l < 0) {
            num = num.replace('.', '/');
            let partIndex = dotIndex1 + 1 + dot2;
            num = num.slice(0, partIndex) + '.' + num.slice(partIndex, num.length);
          } else {
            num = num.replace('.', '/');
            for (let i = 0; i < l; i++) {
              num += '_';
            }
          }
        }
        console.log(num);
        return this.numToArr(num);
      },
      // 规则
      nextRule() {
        return this.num1 !== '' && this.num2 !== '' ? 1 : 0;
      }
    },
    methods: {
      next() {
        if (!this.nextRule) {
          Notice.destroy();
          Notice.error({
            desc: '输入的算式不正确哦，正确格式如：21+24 ，最多支持五位数的加减乘除运算'
          });
          return;
        }
        this.curIndex = 1;
        this._initVertical();
      },
      prev() {
        this.curIndex = 0;
      },
      setInputStr(key) {
        // 保证等式中只有一个运算符
        if (this.symbolReg.test(key) && this.symbolReg.test(this.inputStr)) {
          return;
        }
        // 保证 . 的唯一规则
        // ...
        document.execCommand('insertText', false, key);
        this.$refs.equationInput.focus();
      },
      backspace() {
        let pos = this.$refs.equationInput.selectionStart;
        document.execCommand('delete', true);
        this.$refs.equationInput.focus();
        this.$refs.equationInput.setSelectionRange(pos - 1, pos - 1);
      },
      numToArr(num) {
        let arr = [];
        num = num.toString();
        for (let i = 0; i < num.length; i++) {
          if (num[i] === '.') continue;
          let hasDot = num[i - 1] && (num[i - 1] === '.' || num[i - 1] === '/') ? 1 : 0;
          let dotIsShow = num[i - 1] && num[i - 1] === '/' ? 1 : 0;
          if (num[i] === ' ') {
            arr.push(new NumKey({
              key: ''
            }));
          } else if (num[i] === '_') {
            arr.push(new NumKey({
              key: '0',
              isVirtual: true,
              dotIsShow
            }));
          } else if (num[i] === '/') {
            continue;
          } else {
            arr.push(new NumKey({
              key: num[i],
              hasDot,
              dotIsShow
            }));
          }
        }
        return arr;
      },
      fillEmpty() {
        let index1 = this.num1.indexOf('.');
        let index2 = this.num2.indexOf('.');
        if (Math.max(index1, index2) !== -1) {
          if (index1 !== -1 && index2 !== -1) {
            // 俩个小数
            let deciL1 = this.num1.length - index1 - 1;
            let deciL2 = this.num2.length - index2 - 1;
            let maxL = Math.max.apply({}, [deciL1, deciL2]);
            for (let i = 0; i < Math.abs(deciL1 - deciL2); i++) {
              if (deciL1 < maxL) {
                this.numArr1.push(new NumKey({
                  key: ''
                }));
              } else if (deciL2 < maxL) {
                this.numArr2.push(new NumKey({
                  key: ''
                }));
              }
            }
          } else if (Math.min(index1, index2) === -1) {
            // 有且只有一个小数
            if (index1 === -1) {
              // num2 是小数
              let deciL = this.num2.length - index2 - 1;
              for (let i = 0; i < deciL; i++) {
                this.numArr1.push(new NumKey({
                  key: ''
                }));
              }
            } else {
              let deciL = this.num1.length - index1 - 1;
              for (let i = 0; i < deciL; i++) {
                this.numArr2.push(new NumKey({
                  key: ''
                }));
              }
            }
          }
        }
        // 没有小数 不需要补
      },
      judgeDivisor(m, n) {
        let num = {};
        let i = 0;
        m = m % n;
        while (m !== 0 && !(m in num)) {
          num[m] = i++;
          m = m * 10 % n;
        }
        return m === 0;
      },
      numToFixed(num, n) {
        let numStr = num.toString();
        let dot = numStr.indexOf('.');
        if (dot === -1) {
          return num;
        } else {
          if (numStr.length - 1 - dot > n) {
            numStr = num.toFixed(n + 1).toString();
            return numStr.slice(0, numStr.length - 1) * 1;
          } else {
            return num;
          }
        }
      },
      _initVertical(index) {
        this.$nextTick(() => {
          if (this.symbol === '÷') {
            this.$refs.divisionBox.style.backgroundImage = `url(${divisionSign})`;
            this.setDivCalcStep();
          } else if (this.symbol === 'x') {
            this.setMulCalcStep();
          }
          this.setResultArr();
        });
      },
      _divisionClac(num1, num2) {
        let arr = [];
        let numStr2 = num2.toString();
        // 先判断 num2 是否是小数
        let dotNum = numStr2.indexOf('.') === -1 ? 0 : numStr2.length - numStr2.indexOf('.') - 1;

        let numStr1 = num1 * Math.pow(10, dotNum) + ''; // 1234 ,123
        numStr1 = numStr1.replace('.', '');
        console.log(typeof numStr1, numStr1);

        numStr2 = numStr2.replace('.', '');

        let res = '';
        let index = 0;
        let subtrahend = numStr1[index];
//        let n = 0; // 精确位数
        let diff = ' ';
        let r = 0; // 步骤数
        // 结束条件
        // index 为最后
        // 并且
        // subtrahend 为零
        while (!(index >= numStr1.length - 1 && subtrahend * 1 === 0)) {
          let jumpIndex = 0; // 上一步得出的结果位数 判断第几位才得商

          while (numStr2 * 1 > subtrahend * 1) {
            index++;// 1
            if (numStr1[index]) {
              subtrahend += numStr1[index];
            } else {
              subtrahend += '0';
//              n++;
            }
            // 上一步得出的结果位数 判断第几位才得商
            if (jumpIndex < (diff * 1).toString().length) {
              jumpIndex++;
              continue;
            }
            res += (/\d/.test(res)) ? '0' : ' ';
          }
          // subtrahend 123 减数
          let curRes = Math.floor(subtrahend / numStr2); //  当前商
          res += curRes;
          let curMinuend = curRes * numStr2 + ''; // 被减数
          // 补位被减数
          let blankNum = subtrahend.length - curMinuend.length;
          for (let i = 0; i < blankNum; i++) {
            curMinuend = ' ' + curMinuend;// _9
          }
          diff = (subtrahend * 1 - curMinuend * 1) > 0 ? subtrahend * 1 - curMinuend * 1 + '' : ' ';
          // 补位
          let l = subtrahend.length - (diff === ' ' ? 1 : diff.length);
          for (let i = 0; i < l; i++) {
            diff = ' ' + diff;
          }
          console.log('步：' + r);
          console.log('减数：' + subtrahend);
          console.log('被减数：' + curMinuend);

          arr.push([[]]);
          arr[r][0] = this.numToArr(subtrahend);
          arr[r][1] = this.numToArr(curMinuend);

          if (res.replace('.', '') * 1 === this.resultNum.toString().replace('.', '') * 1) break;
          subtrahend = diff;
          r++;
        }
        console.log('商:' + res, res.length);
        diff = diff * 1 === 0 ? diff.slice(0, diff.length - 1) + '0' : diff;

        arr.push([this.numToArr(diff), []]); // 余数
        arr[0][0] = this.divClacNum1;
        console.log('calc:');
        console.log(arr);
        return arr;
      },
      setMulCalcStep() {
        let ret = [];
        let num1 = this.num1.replace('.', '');
        let num2 = this.num2.replace('.', '');
        for (let i = 0; i < num2.length; i++) {
          ret.push([]);
          let res = num1 * num2[num2.length - i - 1] + '';
          for (let m = 0; m < res.length + i; m++) {
            let key = '';
            if (res[m]) key = res[m];
            ret[i].push(new NumKey({
              key
            }));
          }
        }
        this.mulCalcStep = ret;
      },
      setDivCalcStep() {
        this.divCalcStep = this._divisionClac(this.num1, this.num2);
      },
      setResultArr() {
        this.resultArr = this.numToArr(this.resultNum);
      },
      numClickHandle({num, index, nums}) {
        if (!num.numActive) {
          if (/[+-]/.test(this.symbol) && this.addSubNumRule(index, nums)) return;
        }
        if (this.symbol === '÷' && index === 0) return;
        num.numActive = !num.numActive;
      },
      dotClickHandle({num, index}) {
        if (!num.dotActive) {
          if (this.addSubDotRule()) return;
        }
        if (this.symbol === '÷' && index === 0) return;
        num.dotActive = !num.dotActive;
      },
      // 设置选项规则
      addSubNumRule(index, nums) {
        let _index = nums.length - index;
        let index1 = this.numArr1.length - _index;
        let bool1 = index1 > -1 ? this.numArr1[index1].numActive : false;
        let index2 = this.numArr2.length - _index;
        let bool2 = index2 > -1 ? this.numArr2[index2].numActive : false;
        let index3 = this.resultArr.length - _index;
        let bool3 = index3 > -1 ? this.resultArr[index3].numActive : false;

        return bool1 || bool2 || bool3;
      },
      addSubDotRule() {
        let index1 = this.num1.indexOf('.');
        let index2 = this.num2.indexOf('.');
        let index3 = this.resultNum.indexOf('.');
        if (index1 !== -1) {
          if (this.numArr1[index1].dotActive) return 1;
        }
        if (index2 !== -1) {
          if (this.numArr2[index2].dotActive) return 1;
        }
        if (index3 !== -1) {
          if (this.resultArr[index3].dotActive) return 1;
        }
        return 0;
      },

      getQuestionData() {
        let questionData = {
          title: document.title,
          vertical: {
            symbol: this.symbol,
            num1: this.num1,
            num2: this.num2,
            numArr1: this.numArr1,
            numArr2: this.numArr2,
            resultArr: this.resultArr,
            mulCalcStep: this.mulCalcStep,
            divCalcStep: this.divCalcStep
          },
          answer: this.getAnswer(),
          times: '',
          questionType: 'vertical-calc'
        };
        let localData = questionData;
        return {
          questionData,
          localData
        };
      },
      getAnswer() {
        let ret = [];
        $('a.active').each((index, item) => {
          ret.push($(item).html().trim());
        });
        return ret;
      },
      verifyHandle() {
        return $('a.active').length > 0 ? 1 : 0;
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
      inputStr(newVal) {
        try {
          this.numArr1 = this.numToArr(this.num1);
          this.numArr2 = this.numToArr(this.num2);
          this.fillEmpty();
        } catch (e) {

        }
      }
    },
    components: {
      NumBtn
    }
  }
  ;
</script>

<style scoped lang="stylus">
  .vertical_calc
    width: 100%
    height: 100%
    color: #4D310B
    > li
      width: 100%
      height: 100%
      .step_btn
        position: absolute
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
        font-size: 20px
      &.calc_step_1
        .vertical_input_box
          width: 310px
          margin: 0 auto
          padding-top: 35px
          .equation_input
            width: 303px
            display: block
            margin: 10px auto
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
            box-sizing: border-box
          .num_btn_box
            display: flex
            justify-content: space-around
            flex-wrap: wrap
            .calc_btn
              flex: 0 0 70px
              height: 54px
              line-height: 54px
              margin: 3px
              font-size: 36px
              > a
                display: inline-block
                width: 100%
                height: 100%
                text-shadow: 0.5px 0.87px 0 hsla(0, 0%, 100%, .75)
                border: 1px solid #C0842B
                border-radius: 3px
                box-shadow: inset 0 4px 13px #ffe2b5, 1px 2px 10px rgba(68, 49, 19, .4)
                text-align: center
                &:active
                  box-shadow: 1px 2px 10px rgba(68, 49, 19, .4)
                &.num_btn
                  background: linear-gradient(to top, #b7935a, #FCE3BA)
                  color: #8A5F23
                &.symbol_btn
                  background: linear-gradient(to top, #BBC2B9, #ECF0EA)
                  border-color: #A9CCD1
                  color: #657688
                &.del_btn
                  background: linear-gradient(to top, #cab7a4, #FAD7CE)
                  border-color: #F6C0BB
                  font-weight: 800
                  color: #CB5150
        .step_btn
          right: 60px
          bottom: 20px
      &.calc_step_2
        .vertical_show_box
          width: 100%
          height: 100%
          padding-top: 25px
          text-align: center
          .vertical_box
            display: block
            max-width: 100%
            height: 350px
            overflow: auto
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
        .step_btn
          left: 20px
          top: 20px

  .slide-enter-active, .slide-leave-active
    transition: all 1s

  .slide-enter, .slide-leave-to
    transform: translateX(-100%)
</style>

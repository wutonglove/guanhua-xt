<template>
  <mboard :mboard="mboard">
    <transition-group tag="ul" class="vertical_calc" name="slide">
      <li class="calc_step_1" key="step1" v-show="curIndex === 0">
        <div class="vertical_input_box">
          <div class="title">1、请输入完整的算式</div>
          <input type="text" class="equation_input" v-model="inputStr" ref="equationInput"/>
          <ul class="num_btn_box">
            <li class="calc_btn" v-for="(key,index) in calcBtns" :key="index">
              <a href="javascript:void(0)" class="num_btn" v-if="/[\d\.]/.test(key)"
                 @click="setInputStr(key)">{{key}}</a>
              <a href="javascript:void(0)" class="del_btn" v-else-if="key === '←'" @click="backspace">{{key}}</a>
              <a href="javascript:void(0)" class="symbol_btn" v-else @click="setInputStr(key)">{{key}}</a>
            </li>
          </ul>
        </div>
        <tem1-btn class="step_btn" @click="next">下一步</tem1-btn>
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
                    @num-click="numClickHandle({num, index, nums:numArr2})"
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
                    @num-click="numClickHandle({num, index, nums:resultArr})"
                    @dot-click="dotClickHandle({num})"
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
                  ></num-btn>
                </div>
                <div class="num_wrap">
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
              <div class="num_wrap" v-for="(numWrap,r) in mulCalcStep" :key="r">
                <num-btn
                  v-for="(num,index) in numWrap"
                  :key="index"
                  :text="num.key"
                  :numActive="num.numActive"
                  :hasDot="num.hasDot"
                  @num-click="numClickHandle({num})"
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
                  <num-btn
                    v-for="(num,index) in numArr2"
                    :key="index"
                    :text="num.key"
                    :hasDot="num.hasDot"
                    :dotIsDel="true"
                  ></num-btn>
                </div>
              </div>
              <div class="division_right">
                <div class="clac_result">
                  <div class="num_wrap">
                    <num-btn
                      v-for="(num,index) in divisionRes"
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
                  <div class="division_step_box" v-for="(numWrap,r) in divCalcStep" :key="r">
                    <div class="num_wrap">
                      <num-btn
                        v-for="(num,index) in numWrap[0]"
                        :key="index"
                        :text="num.key"
                        :numActive="num.numActive"
                        :isVirtual="num.isVirtual"
                        :hasDot="num.hasDot"
                        :dotIsDel="num.dotIsDel"
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
        <tem1-btn class="step_btn" @click="prev">上一步</tem1-btn>
      </li>
    </transition-group>
  </mboard>
</template>

<script>
import Tem1Btn from 'components/template1-part/template1-btn/template1-btn';

import Notice from 'iview/src/components/notice';
import divisionSign from './division_sign.png';
import NumBtn from 'components/template1-part/num-btn/num-btn';
import $ from 'jquery';
import { tem1ComMixin } from 'common/js/mixin';

class NumKey {
  constructor({ key, hasDot, isVirtual, dotIsShow }) {
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
  mixins: [tem1ComMixin],
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
      divCalcStep: [],
      divisionRes: []
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
      let dot1 =
        this.num1.indexOf('.') !== -1
          ? this.num1.length - this.num1.indexOf('.') - 1
          : 0;
      let dot2 =
        this.num2.indexOf('.') !== -1
          ? this.num2.length - this.num2.indexOf('.') - 1
          : 0;
      let maxl = dot1 + dot2;
      /* eslint-disable no-eval */
      let res = window.eval(`${this.num1 * 1}${symbol}${this.num2 * 1}`);
      if (/[+-]/.test(this.symbol)) {
        maxl = Math.max(dot1, dot2);
        res = this.numToFixed(res, maxl);
      }
      if (this.symbol === 'x') res.toFixed(maxl);
      if (this.symbol === '÷') {
        // res = this.numToFixed(res, 4);
        // // 补空
        // let num1 = this.num1.toString().replace('.', '');
        // let num2 = this.num2.toString().replace('.', '');
        // let i = 0;
        // let _num = num1[i];
        // while (num2 * 1 > _num * 1) {
        //   i++;
        //   _num += num1[i];
        //   res = ' ' + res;
        // }
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
          num =
            num.slice(0, partIndex) + '.' + num.slice(partIndex, num.length);
        } else {
          num = num.replace('.', '/');
          for (let i = 0; i < l; i++) {
            num += '_';
          }
        }
      }
      return this.numToArr(num);
    },
    // 规则
    nextRule() {
      if (this.inputStr.trim() === '') return -2;
      if (/[^0-9x÷+-/.]/g.test(this.inputStr)) return -1;
      if (!this.num1 || !this.num2 || !this.symbol) return -1;
      if (this.symbol === '÷' && this.num2 * 1 === 0) return -3;
      let res =
        /\+/g.test(this.inputStr) +
        /-/g.test(this.inputStr) +
        /x/g.test(this.inputStr) +
        /÷/g.test(this.inputStr);
      if (res !== 1) return -2;
      if (this.inputStr.match(/\+/g) && this.inputStr.match(/\+/g).length > 1) {
        return -4;
      }
      if (this.inputStr.match(/-/g) && this.inputStr.match(/-/g).length > 1) {
        return -4;
      }
      if (this.inputStr.match(/x/g) && this.inputStr.match(/x/g).length > 1) {
        return -4;
      }
      if (this.inputStr.match(/÷/g) && this.inputStr.match(/÷/g).length > 1) {
        return -4;
      }
      return 1;
    }
  },
  methods: {
    next() {
      let desc = '';
      if (this.nextRule === 1) {
        this.curIndex = 1;
        this.initVertical();
        return;
      } else if (this.nextRule === -1) {
        desc = '只能输入数字0-9以及+-x÷';
      } else if (this.nextRule === -2) {
        desc =
          '输入的算式不正确哦，正确格式如：21+24 ，最多支持五位数的加减乘除运算';
      } else if (this.nextRule === -3) {
        desc = '除数不能为零';
      } else if (this.nextRule === -4) {
        desc = '计算式中只能有一个计算符号';
      }
      Notice.destroy();
      Notice.error({
        desc
      });
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
      num = num.toString().replace(/^0{1,}/g, str => {
        let len = str.length;
        let zero = '';
        if (str === num || num[len] === '.') {
          len = len - 1;
          zero = '0';
        }
        return new Array(len).fill(' ').join('') + zero;
      });
      for (let i = 0; i < num.length; i++) {
        if (num[i] === '.') continue;
        let hasDot =
          num[i - 1] && (num[i - 1] === '.' || num[i - 1] === '/') ? 1 : 0;
        let dotIsShow = num[i - 1] && num[i - 1] === '/' ? 1 : 0;
        if (num[i] === ' ') {
          arr.push(
            new NumKey({
              key: ''
            })
          );
        } else if (num[i] === '_') {
          arr.push(
            new NumKey({
              key: '0',
              isVirtual: true,
              dotIsShow
            })
          );
        } else if (num[i] === '/') {
          continue;
        } else {
          arr.push(
            new NumKey({
              key: num[i],
              hasDot,
              dotIsShow
            })
          );
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
              this.numArr1.push(
                new NumKey({
                  key: ''
                })
              );
            } else if (deciL2 < maxL) {
              this.numArr2.push(
                new NumKey({
                  key: ''
                })
              );
            }
          }
        } else if (Math.min(index1, index2) === -1) {
          // 有且只有一个小数
          if (index1 === -1) {
            // num2 是小数
            let deciL = this.num2.length - index2 - 1;
            for (let i = 0; i < deciL; i++) {
              this.numArr1.push(
                new NumKey({
                  key: ''
                })
              );
            }
          } else {
            let deciL = this.num1.length - index1 - 1;
            for (let i = 0; i < deciL; i++) {
              this.numArr2.push(
                new NumKey({
                  key: ''
                })
              );
            }
          }
        }
      }
      // 没有小数 不需要补
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
    initVertical(index) {
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
    divisionClac(num1, num2) {
      num2 = num2 + '';
      if (num2.indexOf('.') !== -1) {
        let muli = Math.pow(10, num2.split('.')[1].length);
        num1 = num1 * muli + '';
        num2 = num2 * muli + '';
      }
      let arr = [];
      let curQuotient = '';
      let diff = '';
      let curMinuend = '';
      let curSubtrahend = '';
      let result = '';
      let index = 0;
      let step = 0;
      while (true) {
        let _str = num1[index]; // _str = num1[index]
        if (_str === '.') {
          // 判断是不是小数点
          result += '.';
          index++;
          continue;
        }
        if (!_str) {
          // 判断 _str 是否为undefined  是 _str = 0
          _str = '0';
          // 判断result有没有小数点
          if (result.indexOf('.') === -1) {
            result += '.';
          }
        }
        if (diff * 1 > num2 * 1) {
          index--;
          step--;
          curMinuend = diff;
        } else {
          curMinuend = diff + _str; // 确定被减数 = 上一次的差 + _str
        }
        curQuotient = Math.floor(curMinuend / num2); // 确定当前商 = 被减数/num2 的整数
        result += curQuotient; // result+=当前商
        curSubtrahend = curQuotient * num2; // 确定减数 = 当前商*num2

        diff = curMinuend - curSubtrahend; // 当前差 = 被减数 - 减数
        if (curSubtrahend * 1 === 0) {
          if (num1.slice(index + 1).length === 0) {
            arr.push([this.numToArr(this.coverStart(diff, step + 1))]);
            break;
          }
          diff = curMinuend; // 差 = 被减数
          index++;
          step++;
          continue; // 进入下一轮
        }
        arr.push([
          this.numToArr(this.coverStart(curMinuend, step + 1)),
          this.numToArr(this.coverStart(curSubtrahend, step + 1))
        ]);
        if (num1.slice(index + 1).length === 0) {
          // 判断 num1.slice（index+1）长度是否为0
          if (diff * 1 === 0) {
            // 判断 当前差 ===0
            arr.push([this.numToArr(this.coverStart(diff, step + 1))]);
            break; // 结束
          } else {
            if (result.split('.')[1] && result.split('.')[1].length > 3) {
              // 判断 result的小数位数 > 4
              arr.push([this.numToArr(this.coverStart(diff, step + 1))]);
              break;
            }
            index++;
            step++;
            continue;
          }
        }
        index++;
        step++;
        continue;
      }
      // 处理被除数、除数和商
      let dividend = [];
      let _num1 = this.num1;
      let _num2 = this.num2;
      if (_num2.indexOf('.') !== -1) {
        // 除数是否是浮点数
        let len = _num2.split('.')[1].length;
        let idx = _num1.indexOf('.');
        if (idx === -1) {
          dividend = this.numToArr(_num1 + new Array(len).fill('_').join(''));
        } else {
          let len1 = _num1.split('.')[1].length;
          let lenDiff = len1 - len; // 获取被除数和除数的小数部分长度的差值
          if (lenDiff < 0) {
            // 被除数的小数部分长度小于除数部分长度
            _num1 = _num1 + new Array(lenDiff * -1).fill('_').join('');
          } else {
            _num1 = _num1 * Math.pow(10, len);
          }
          // 判断 >0
          // 是  不补位 移动小数点
          // 否  差值
          dividend = this.numToArr(_num1);
          dividend[this.num1.indexOf('.')].hasDot = true;
          dividend[this.num1.indexOf('.')].dotIsShow = true;
          dividend[this.num1.indexOf('.')].dotIsDel = true;
        }
      } else {
        dividend = this.numToArr(_num1);
      }
      arr[0][0] = dividend;
      // 处理除数
      this.numArr2 = this.numToArr(this.num2);
      this.divisionRes = this.numToArr(result);
      return arr;
    },
    coverStart(num, len) {
      num = num + '';
      let _len = len - num.length;
      let _str = '';
      for (let i = 0; i < _len; i++) {
        _str += '0';
      }
      return _str + num;
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
          ret[i].push(
            new NumKey({
              key
            })
          );
        }
      }
      this.mulCalcStep = ret;
    },
    setDivCalcStep() {
      this.divCalcStep = this.divisionClac(this.num1, this.num2);
    },
    setResultArr() {
      if (this.symbol === '÷') {
        this.resultArr = this.divisionRes;
      } else {
        this.resultArr = this.numToArr(this.resultNum);
      }
    },
    numClickHandle({ num, index, nums }) {
      if (!num.numActive) {
        if (/[+-]/.test(this.symbol) && this.addSubNumRule(index, nums)) return;
      }
      if (this.symbol === '÷' && index === 0) return;
      num.numActive = !num.numActive;
    },
    dotClickHandle({ num, index }) {
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
        if (
          $(item)
            .html()
            .trim() !== ''
        ) {
          ret.push(
            $(item)
              .html()
              .trim()
          );
        }
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
        if (this.symbol !== 'x') {
          this.fillEmpty();
        }
      } catch (e) {}
    }
  },
  components: {
    NumBtn,
    Tem1Btn
  }
};
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
      z-index: 1
      text-align: center
      width: 100px
      height: 30px
      padding: 0
      line-height: 30px
      font-size: 14px
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
          box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3) inset
          background-color: #dedbd4
          color: #59390b
          text-shadow: 0.5px 0.87px 0 hsla(0, 0%, 100%, 0.9)
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
              text-shadow: 0.5px 0.87px 0 hsla(0, 0%, 100%, 0.75)
              border: 1px solid #C0842B
              border-radius: 3px
              box-shadow: inset 0 4px 13px #ffe2b5, 1px 2px 10px rgba(68, 49, 19, 0.4)
              text-align: center
              &:active
                box-shadow: 1px 2px 10px rgba(68, 49, 19, 0.4)
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
            font-size: 30px
            font-weight: bolder
            color: #824f06
            text-shadow: 0 1px 2px #e3d3be
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
                      content: ''
                      display: block
                      position: absolute
                      top: 0
                      left: 0
                      width: 100%
                      height: 100%
                      border: 2px dashed #CE5F5A
                      border-radius: 4px
                      background-color: rgba(205, 96, 62, 0.3)
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
                      content: '\\'
                      position: absolute
                      top: 0
                      left: 0
                      width: 100%
                      height: 100%
                      font-size: 30px
                      line-height: 20px
                      transform: rotate(-16deg)
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
                text-shadow: 0.5px 0.87px 0 hsla(0, 0%, 100%, 0.75)
                box-shadow: inset 0 4px 13px #ffe2b5, 1px 2px 10px rgba(68, 49, 19, 0.4)
                border-radius: 3px
                background: linear-gradient(to top, #ad8549, #FAE1B9)
                &:active
                  box-shadow: 1px 2px 10px rgba(68, 49, 19, 0.4)
                &.active
                  text-shadow: none
                  color: #fff
                  background: linear-gradient(to top, #3E8ABE, #2571B8)
                  box-shadow: 1px 2px 10px rgba(68, 49, 19, 0.4)
          .clac_num_x2
            padding-left: 60px
            position: relative
          .line
            display: block
            width: 100%
            height: 5.52px
            border-top: 1px solid #9b6e29
            background: #9b6e29
            border-bottom: 1px solid #e5d4bf
            margin: 3.07px 0
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
      .step_btn
        left: 20px
        top: 20px
.slide-enter-active, .slide-leave-active
  transition: all 1s
.slide-enter, .slide-leave-to
  transform: translateX(-100%)
</style>

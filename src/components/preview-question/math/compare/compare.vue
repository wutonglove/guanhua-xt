<template>
  <div class="compare">
    <ul class="compare_list">
      <li class="compare_item" v-for="(item,index) in options">
        <span class="num">{{item.num1}}</span>
        <span class="symbol" @click="addSymbol(index)">{{item.symbol}}</span>
        <span class="num">{{item.num2}}</span>
      </li>
    </ul>
    <ul class="symbol_btns">
      <li class="symbol_btn" :class="{active: currSymbolIndex===index}" v-for="(btn,index) in symbolBtns"
          @click="selectSymbol(index)" ref="symbol">{{btn}}
      </li>
    </ul>
  </div>
</template>

<script>
  import {compareSymbolList} from 'common/js/config';
  import {submitMixin} from 'common/js/mixin';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    mounted() {
      this.questionData.options.forEach((item, index) => {
        this.options.push({
          num1: item.num1,
          num2: item.num2,
          symbol: ''
        });
      });
    },
    data() {
      return {
        symbolBtns: compareSymbolList,
        options: [],
        currSymbolIndex: -1
      };
    },
    computed: {
      currSymbol() {
        return this.symbolBtns[this.currSymbolIndex] || '';
      }
    },
    methods: {
      selectSymbol(index) {
        this.currSymbolIndex = index;
      },
      addSymbol(index) {
        this.options[index].symbol = this.currSymbol;
        this.currSymbolIndex = -1;
      },
      getResult() {
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].symbol !== this.questionData.options[i].symbol) return 0;
        }
        return 1;
      }
    }
  };
</script>

<style scoped lang="stylus">
  .compare
    width: 630px
    height: 100%
    display: flex
    margin: 0 auto
    position: relative
    .compare_list
      width: 100%
      margin: 15px 0 120px 0
      flex: 1
      flex-direction: column
      line-height: 40px
      overflow-y: auto
      .compare_item
        flex: 1
        display: flex
        text-align: center
        font-size: 24px
        margin: 10px 0
        .num
          flex: 1
          height: 40px
          border: 1px solid #C3A373
          box-shadow: 0 0 5px 0 rgba(0, 0, 0, .4) inset
          color: #59390B
          border-radius: 4px
          background-color: #fff
        .symbol
          flex: 0 0 80px
          height: 40px
          background-color: #62A2CD
          border-radius: 4px
          margin: 0 10px
    .symbol_btns
      width: 100%
      height: 120px
      text-align: center
      position: absolute
      bottom: 0
      .symbol_btn
        display: inline-block
        width: 80px
        height: 60px
        margin-right: 30px
        border: 1px solid #D2A45E
        box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, .2)
        border-radius: 6px
        background: linear-gradient(to top, #CDAB78, #F4E0BF)
        font-size: 32px
        color: #834F06
        line-height: 60px
        &:last-child
          margin-right: 0
        &.active
          border-color: #BC823F
          background: linear-gradient(to top, #DEA748, #EECF95)
</style>

<template>
  <mboard :mboard="mboard">
    <ul class="compare_list">
      <li class="compare_item" v-for="(item,index) in options">
        <div class="num_box">
          <div class="num">
            <input v-model="item.num1" type="text" placeholder="请输入文字" :maxLength="10">
            <span class="text">{{item.num1.length}}/10</span>
          </div>
          <a class="symbol">
            <i-poptip placement="top" trigger="hover">
              <tem1-btn class="symbol_nul" v-if="!item.symbol">
                <i-icon type="android-add" size="20"></i-icon>
                <span class="text">添加关系符号</span>
              </tem1-btn>

              <tem1-btn class="symbol_res" v-else>
                <span class="text">{{item.symbol}}</span>
              </tem1-btn>

              <ul class="symbol_list" slot="content">
                <li class="symbol_item" v-for="symbol in symbolList" @click="selectSymbol(index, symbol)">{{symbol}}
                </li>
              </ul>
            </i-poptip>
          </a>
          <div class="num">
            <input v-model="item.num2" type="text" placeholder="请输入文字" :maxLength="10">
            <span class="text">{{item.num2.length}}/10</span>
          </div>
        </div>
        <tem1-btn class="add_btn" icon="plus-round" @click="addItem"
                  v-if="index === options.length-1 && options.length<5">
          增加题目
        </tem1-btn>
        <tem1-btn class="del_btn" icon="trash-a" @click="deleteItem"
                  v-else>
          删除题目
        </tem1-btn>
      </li>
    </ul>
  </mboard>
</template>

<script>
  import Mboard from 'components/template1-part/mboard/mboard';
  import Tem1Btn from 'components/template1-part/template1-btn/template1-btn';

  import IIcon from 'iview/src/components/icon';
  import IPoptip from 'iview/src/components/poptip';
  import Notice from 'iview/src/components/notice';

  import {compareSymbolList} from 'common/js/config';

  export default {
    props: {
      mboard: {
        type: Object
      }
    },
    data() {
      return {
        symbolList: compareSymbolList,
        options: [
          {
            num1: '',
            num2: '',
            symbol: ''
          }
        ]
      };
    },
    methods: {
      selectSymbol(index, symbol) {
        this.options[index].symbol = symbol;
      },
      addItem() {
        if (this.options.length > 4) return;
        this.options.push(
          {
            num1: '',
            num2: '',
            symbol: ''
          }
        );
      },
      deleteItem(index) {
        this.options.splice(index, 1);
      },
      getQuestionData() {
        let questionData = {
          title: document.title,
          options: this.options,
          times: '',
          questionType: 'compare'
        };
        let localData = questionData;
        return {
          questionData,
          localData
        };
      },
      verifyHandle() {
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].num1.trim() === '') return 0;
          if (this.options[i].num2.trim() === '') return 0;
          if (this.options[i].symbol.trim() === '') return 0;
        }
        return 1;
      },
      showMessage() {
        if (this.verifyHandle()) {
          return 1;
        } else {
          Notice.destroy();
          Notice.warning({
            desc: '有“比较大小选项”未填写'
          });
          return 0;
        }
      }
    },
    components: {
      Mboard,
      IIcon,
      IPoptip,
      Tem1Btn
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../../common/stylus/variable.styl'

  .compare_list
    width: 100%
    position: absolute
    top: 50%
    left: 0
    transform: translate(0, -50%);
    .compare_item
      position: relative
      text-align: center
      .num_box
        color: #ccc
        display: flex
        justify-content: center
        .num
          flex: 0 0 270px
          text-align: center
          color: #6C4C28
          display: inline-block
          input
            width: 100%
            height: 43px
            line-height: 43px
            font-size: 24px
            text-align: center
            border: 1px solid $template1-botton-bd
            border-radius: 4px
            box-shadow: 1px 0 0 0 #F1D9AE
          .text
            font-size: 12px
        .symbol
          position: relative
          flex: 0 0 78px
          height: 42px
          margin: 0 10px
          color: #825112
          .symbol_nul
            height: 100%
            padding: 5px 2px
            .text
              display: block
          .symbol_res
            width: 78px
            height: 42px
            padding: 0
            line-height: 40px
            font-size: 20px
          .symbol_list
            display: flex
            width: 260px
            height: 50px
            line-height: 50px
            border-radius: 4px
            background: linear-gradient(to bottom, #FCE3BA, #D2B281)
            font-size: 18px
            .symbol_item
              flex: 1
              &:hover
                box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3)

  .add_btn, .del_btn
    position: absolute
    right: 14px
    top: 10px
    &.del_btn
      color: #FA805B
</style>

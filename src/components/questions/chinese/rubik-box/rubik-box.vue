<template>
  <mboard :mboard="mboard">
    <transition-group tag="ul" class="vertical_calc" name="slide">
      <li class="calc_step_1" key="step1" v-show="curIndex === 0">
        <div class="setting_box">
          <div class="title">选择题目的语言</div>
          <ul class="options_box">
            <li class="cn_box" @click="setLan('cn')">
              <span class="text">中文</span>
            </li>
            <li class="en_box" @click="setLan('en')">
              <span class="text">英语</span>
            </li>
          </ul>
        </div>
      </li>
      <li class="calc_step_2" key="step2" v-show="curIndex === 1">
        <div class="grid_box">
          <grid @op-change="setOptions" ref="grid" :language="zh"></grid>
        </div>

        <notepad class="side_box" title="提示" color="#fff" align="center">
          <ul class="guidance_list">
            <li class="guidance_item" v-for="(item,index) in guidList">
              <div class="answer_wrap">{{`${index + 1}. ${item.answer}`}}</div>
              <div class="input_wrap">
                <input type="text" class="input" v-model="item.desc" placeholder="请输入提示内容">
              </div>
              <div class="btn_wrap">
                <span class="del_btn" @click="delGuid(index)"></span>
              </div>
            </li>
          </ul>
        </notepad>
      </li>
    </transition-group>
  </mboard>
</template>

<script>
  import Notepad from 'components/template1-part/notepad/notepad';

  import Grid from 'components/template1-part/grid/grid';
  import Notice from 'iview/src/components/notice';
  import { tem1ComMixin } from 'common/js/mixin';

  export default {
    mixins: [tem1ComMixin],
    data() {
      return {
        curIndex: 0,
        guidList: [],
        zh: ''
      };
    },
    methods: {
      setLan(val) {
        this.zh = val;
        this.curIndex = 1;
      },
      setOptions(optionsObj) {
      //        let oriList = this.guidList;
        let oriDescList = [];
        this.guidList.forEach((item) => {
          oriDescList.push(item);
        });
        this.guidList = [];
        optionsObj.forEach((gridsRow) => {
          let text = '';
          gridsRow.forEach((word) => {
            text += word.text;
          });
          let index = oriDescList.findIndex((item) => {
            if (item.answer === text) {
              return true;
            }
            return false;
          });
          this.guidList.push({
            answer: text,
            desc: index === -1 ? '' : oriDescList[index].desc
          });
        });
      },
      delGuid(index) {
        this.$refs.grid.delItem(index);
      },
      getQuestionData() {
        let questionData = {
          title: document.title,
          grids: this.$refs.grid.table,
          answer: this.guidList,
          times: '',
          questionType: 'rubik-box'
        };
        let localData = questionData;
        return {
          questionData,
          localData
        };
      },
      verifyHandle() {
        if (this.guidList.length > 2) {
          for (let i = 0; i < this.guidList.length; i++) {
            if (this.guidList[i].desc.trim() === '') return -1;
          }
          return 1;
        }
        return 0;
      },
      showMessage() {
        let res = this.verifyHandle();
        let desc = '';
        if (res === 1) {
          this.$refs.grid.fillRandom();
          return 1;
        } else if (res === 0) {
          desc = '请至少编辑三条答案及解析';
        } else if (res === -1) {
          desc = '请输入解析';
        }
        Notice.destroy();
        Notice.warning({
          desc
        });
        return 0;
      }
    },
    components: {
      Grid,
      Notepad
    }
  };
</script>

<style scoped lang="stylus">
  .vertical_calc
    width: 100%
    height: 100%
    overflow: auto
    > li
      width: 100%
      height: 100%
      &.calc_step_1
        .setting_box
          width: 500px
          margin: 0 auto
          padding-top: 60px
          color: #222
          .title
            width: 100%
            font-size: 20px
            line-height: 50px
          .options_box
            width: 100%
            border-top: 1px solid #fff
            padding-top: 15px
            display: flex
            > li
              flex: 1
              height: 205px
              margin-right: 25px
              background-color: #F0EFEF
              text-align: center
              border-radius: 10px
              display: flex
              align-items: center
              justify-content: center
              border: 1px solid transparent
              cursor: pointer
              &:hover
                border: 1px solid #1D8AC8
              .text
                flex: 0 0 120px
                width: 120px
                height: 100px
                line-height: 100px
                font-size: 15px
                background: url('/static/images/langlist.png') no-repeat center center
                background-size: 100% 100%

      &.calc_step_2
        display: flex
        .grid_box
          flex: 1
          position: relative
        .side_box
          flex: 1
          margin: 16px
          box-shadow: 1.5px 2.6px 19px 0 rgba(75, 40, 0, .75);
          .guidance_list
            padding: 12px
          .guidance_item
            margin: 6px 0
            display: flex
            height: 24px
            font-size: 12px
            padding: 0 5px
            &:hover
              background-color: #F1E3C7
              .input_wrap
                .input
                  border: 1px solid #BDAC96
                  background-color: #fff
            .answer_wrap
              flex: 0 0 135px
              line-height: 24px
            .input_wrap
              flex: 1
              padding: 2px 5px
              .input
                height: 100%
                width: 100%
                border-radius: 3px
                border: none
                background: none
                padding: 0 5px
                &:focus
                  border: 1px solid #BDAC96
                  background-color: #fff
                  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, .2) inset
            .btn_wrap
              flex: 0 0 24px
              padding-top: 2px
              .del_btn
                display: block
                width: 20px
                height: 20px
                background: url("/static/images/hint_del.png")
                background-size: contain

  .slide-enter-active, .slide-leave-active
    transition: all 1s

  .slide-enter, .slide-leave-to
    transform: translateX(-100%)
</style>

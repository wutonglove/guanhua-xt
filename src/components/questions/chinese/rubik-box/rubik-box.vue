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
        <div class="side_box">
          <div class="guidance">
            <div class="header">
              <div class="title">提示</div>
            </div>
            <div class="content">
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
            </div>
          </div>
        </div>
      </li>
    </transition-group>
  </mboard>
</template>

<script>
  import Mboard from 'components/template1-part/mboard/mboard';

  import Grid from 'components/template1-part/grid/grid';
  import Notice from 'iview/src/components/notice';

  export default {
    props: {
      mboard: {
        type: Object
      }
    },
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
        this.guidList = [];
        optionsObj.forEach((options, i) => {
          let text = '';
          options.forEach((item, index) => {
            text += item.text;
          });
          this.guidList.push({
            answer: text,
            desc: ''
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
      Mboard
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
          display: flex
          .guidance
            flex: 1
            margin: 15px
            border-radius: 5px
            box-shadow: 1.5px 2.6px 19px 0 rgba(75, 40, 0, .75);
            overflow: hidden
            position: relative
            z-index: 1
            display: flex
            flex-direction: column
            .header
              flex: 0 0 30px
              height: 30px
              line-height: 30px
              background: linear-gradient(to top, #BE8844, #DCAF6C)
              border-bottom: 1px solid #75604C
              box-shadow: 0 1px 0 0 rgba(0, 0, 0, .2)
              .title
                height: 100%
                border-bottom: 1px dashed rgba(255, 255, 255, .5)
                color: #fff
                text-align: center
            .content
              flex: 1
              background: url("/static/images/graphPaper.jpg")
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

<template>
  <mboard :mboard="mboard">
    <div id="word_guess">
      <div class="left_box">
        <div class="btn_ctrl_list">
          <div class="btn_wrap">
            <a href="javascript:void(0)"
               class="ctrl_btn"
               :class="{active:curIndex === index}"
               v-for="(item,index) in guesslist"
               @click="changeIndex(index)"
            >
              <span class="num_code">{{index + 1}}</span>
              <img class="icon" :src="item.resource.objURL"
                   v-if="item.resource&&item.resource.type.split('/')[0] === 'image'">
              <i-icon class="icon" type="videocamera" :size="42"
                      v-else-if="item.resource&&item.resource.type.split('/')[0] === 'video'"></i-icon>
              <i-icon class="icon" type="volume-medium" :size="53"
                      v-else-if="item.resource&&item.resource.type.split('/')[0] === 'audio'"></i-icon>
            </a>
            <a href="javascript:void(0)" class="add_ctrl_btn" @click="addInfoItem">
              <i-icon type="ios-plus-outline" :size="22"></i-icon>
              <span class="text">添加</span>
            </a>
          </div>
        </div>
        <div class="info_list_box" :style="BGCss">
          <div class="default" v-if="guesslist.length === 0">
            <lucency-board class="empty_bd">
              <div class="empty_box" :style="BGCss"></div>
            </lucency-board>
          </div>
          <div class="info_list" v-else>
            <div class="info_item" v-for="(item,index) in guesslist" v-show="index === curIndex">
              <div class="del_wrap">
                <btn1 class="del_btn" @click="delInfoItem(index)">删除</btn1>
              </div>
              <res-btns class="res_wrap"
                        :resource="item.resource"
                        ref="descRes"
                        :name="index"
                        @on-insert="insert"
                        @on-del="delResource(index)"
                        @on-changecss="changeResource"
              >
              </res-btns>
            </div>
          </div>
        </div>
      </div>
      <div class="right_box">
        <div class="answer_item" v-for="(item,index) in guesslist" v-show="index === curIndex">
          <div class="answer_wrap">
            <div class="title_wrap">
              <span class="text">答案：</span>
              <btn1 class="btn" :disable="item.lan==='cn'" @click="changeLan(index,'cn')">汉字</btn1>
              <btn1 class="btn" :disable="item.lan==='en'" @click="changeLan(index,'en')">字母</btn1>
            </div>
            <textarea :placeholder="placeholder(index,item.lan)" maxlength="15"
                      v-model="item.answer" @input="input(index)" ref="textarea"></textarea>
          </div>
          <div class="hint_wrap">
            <div class="title_wrap">
              <span class="text">提示：</span>
            </div>
            <textarea placeholder="请在此输入30个字以内提示信息(选填)" maxlength="30" v-model="item.hint"></textarea>
          </div>
        </div>
        <!-- list的长度为零是 显示 -->
        <div class="answer_item" v-show="guesslist.length<1">
          <div class="answer_wrap">
            <div class="title_wrap">
              <span class="text">答案：</span>
              <btn1 class="btn" :active="true">汉字</btn1>
              <btn1 class="btn" :active="false">字母</btn1>
            </div>
            <textarea placeholder="请在此输入不超过15个的字母" readonly></textarea>
          </div>
          <div class="hint_wrap">
            <div class="title_wrap">
              <span class="text">提示：</span>
            </div>
            <textarea placeholder="请在此输入30个字以内提示信息(选填)" readonly></textarea>
          </div>
        </div>
        <!-- end -->
      </div>
    </div>
    <insert-file-dialog @on-insert="insert"></insert-file-dialog>
  </mboard>
</template>

<script>
import { tem1ComMixin } from 'common/js/mixin';
import LucencyBoard from 'components/template1-part/lucency-board/lucency-board';
import Btn1 from 'components/template1-part/template1-btn/template1-btn';
import ResBtns from 'components/template1-part/resource-btns/resource-btns';
import InsertFileDialog from 'base/insertFile/insertFile';

import IIcon from 'iview/src/components/icon';
import Notice from 'iview/src/components/notice';
import { REGEXPS } from 'common/js/config';

import bg from './graphPaper.jpg';
const BG = bg;
const CN = REGEXPS.cn;
const EN = REGEXPS.en;

class Guess {
  constructor() {
    this.resource = null;
    this.answer = '';
    this.hint = '';
    this.lan = 'en';
  }
}

export default {
  mixins: [tem1ComMixin],
  data() {
    return {
      BGCss: `background-image: url(${BG})`,
      guesslist: [],
      curIndex: 0
    };
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    input(index) {
      let reg = this.guesslist[index].lan === 'en' ? CN : EN;
      this.guesslist[index].answer = this.guesslist[index].answer.replace(
        reg,
        () => {
          Notice.destroy();
          Notice.warning({
            desc:
              this.guesslist[index].lan === 'cn'
                ? '请输入汉字'
                : '请输入英文字母'
          });
          return '';
        }
      );
    },
    changeIndex(index) {
      this.curIndex = index;
    },
    addInfoItem() {
      this.guesslist.push(new Guess());
      this.curIndex = this.guesslist.length - 1;
    },
    delInfoItem(index) {
      this.guesslist.splice(index, 1);
      this.curIndex = this.curIndex > 0 ? this.curIndex - 1 : 0;
    },
    delResource(index) {
      this.guesslist[index].resource = null;
    },
    insert(file) {
      this.guesslist[this.curIndex].resource = file;
    },
    changeLan(index, val) {
      this.guesslist[index].lan = val;
      this.guesslist[index].answer = '';
    },
    placeholder(index, lan) {
      return this.guesslist[index].lan === 'en'
        ? '请在此输入不超过15个的字母'
        : '请在此输入不超过15个的汉字';
    },
    changeResource(resource) {
      this.guesslist[this.curIndex].resource;
      Object.assign(this.guesslist[this.curIndex].resource, resource);
    },
    // 保存
    getQuestionData(urlSnippet) {
      let guesslist = [];
      let _gursslist = [];
      this.guesslist.forEach((item, index) => {
        let res = item.resource;
        let obj = {
          resource: {
            type: res.type.split('/')[0],
            cssStyle: res.cssStyle,
            src: urlSnippet + res.name
          },
          len: item.lan,
          answer: item.answer,
          hint: item.hint
        };
        guesslist.push(obj);
        _gursslist.push(
          Object.assign({}, obj, {
            resource: {
              type: res.type.split('/')[0],
              cssStyle: res.cssStyle,
              src: res.objURL
            }
          })
        );
      });
      let questionData = {
        title: document.title,
        guesslist,
        questionType: 'word-guess'
      };
      let localData = Object.assign({}, questionData, {
        guesslist: _gursslist
      });
      return {
        questionData,
        localData
      };
    },
    verifyHandle() {
      let list = this.guesslist;
      for (let i = 0; i < list.length; i++) {
        if (!list[i].resource) return -1;
        if (!list[i].answer) return -2;
      }
      return 1;
    },
    showMessage() {
      let res = this.verifyHandle();
      let desc = '';
      if (res === 1) {
        return 1;
      } else if (res === -1) {
        desc = '请选择素材';
      } else if (res === -2) {
        desc = '请设置答案';
      }
      Notice.destroy();
      Notice.warning({
        desc
      });
      return 0;
    }
  },
  components: {
    IIcon,
    LucencyBoard,
    Btn1,
    ResBtns,
    InsertFileDialog,
    Notice
  }
};
</script>

<style scoped lang="stylus">
#word_guess
  width: 100%
  height: 100%
  padding-top: 30px
  display: flex
  .left_box
    flex: 1
    margin: 0 10px
    display: flex
    flex-direction: column
    .btn_ctrl_list
      flex: 0 0 68px
      .btn_wrap
        height: 100%
        display: inline-block
        border-radius: 10px
        text-align: center
        line-height: 68px
        background-color: rgba(0, 0, 0, 0.1)
        padding: 0 10px
        & > a
          vertical-align: middle
          display: inline-block
          width: 46px
          height: 46px
          border-radius: 8px
          &.ctrl_btn
            background-color: rgba(0, 0, 0, 0.2)
            line-height: 46px
            margin: 0 2px
            position: relative
            .icon
              width: 100%
              height: 100%
              line-height: 46px
              text-align: center
              border-radius: 8px
              color: #673905
              text-shadow: 0 1px 1px rgba(255, 255, 255, 0.4)
            .num_code
              position: absolute
              top: 50%
              left: 50%
              transform: translate(-50%, -50%)
              width: 22px
              height: 22px
              line-height: 22px
              font-size: 12px
              color: #fff
              background-color: #5E4C32
              border-radius: 50%
          &.active
            background: none
            position: relative
            .num_code
              background-color: #f39925
            &:after
              content: ''
              display: block
              position: absolute
              bottom: -12px
              left: 50%
              transform: translateX(-50%)
              width: 0
              height: 0
              border: 5px solid transparent
              border-top-color: #fff
          &.add_ctrl_btn
            background-color: #fff
            color: #895D26
            line-height: 18px
            position: relative
            &:after
              content: ''
              display: block
              position: absolute
              bottom: -12px
              left: 50%
              transform: translateX(-50%)
              width: 0
              height: 0
              border: 5px solid transparent
              border-top-color: #fff
            .text
              display: block
    .info_list_box
      flex: 1
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.3)
      border: 1px solid #A98455
      border-radius: 10px
      margin: 10px 0
      .default
        display: flex
        width: 100%
        height: 100%
        background-color: rgba(0, 0, 0, 0.015)
        .empty_bd
          flex: 1
          margin: 30px
          .empty_box
            width: 100%
            height: 100%
            border: 7px solid #ddd
      .info_list
        height: 100%
        .info_item
          padding: 10px 20px
          width: 100%
          height: 100%
          display: flex
          flex-direction: column
          .del_wrap
            flex: 0 0 22px
            .del_btn
              float: right
              font-size: 15px
              padding: 5px 12px
          .res_wrap
            flex: 1
            margin-top: 8px
            max-height: 243px
            overflow: hidden
            padding: 1px
  .right_box
    flex: 1
    margin-left: 20px
    .answer_item
      width: 100%
      height: 100%
      display: flex
      flex-direction: column
      textarea
        width: 90%
        height: 60px
        border-radius: 6px
        border: 1px solid #A9A9A9
        box-shadow: 0 0 5px 0 #D6CCC0 inset
        line-height: 18px
        resize: none
        margin-top: 10px
        padding: 3px 6px
        font-size: 12px
      .answer_wrap, .hint_wrap
        flex: 1
        .btn
          margin-left: 10px
        .text
          font-weight: 800
          color: #333
        &.answer_wrap
          margin-top: 100px
</style>

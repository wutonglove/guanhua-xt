<template>
  <mboard :mboard="mboard">
    <div id="link-game">
      <ul class="nav" v-show="curIndex === 0">
        <li class="nav_item" v-for="(btn,index) in choice" @click="changeType(index)" :key="index">
          <span class="icon_wrap">
            <img class="icon" :src="btn.icon" alt="">
          </span>
          <a href="javascript:void(0)" class="text">{{btn.name}}</a>
        </li>
      </ul>
      <div class="page_list" v-show="curIndex === 1">
        <notepad class="left_box" :title="'0/3'" align="center"></notepad>
        <div class="right_box">
          <ul class="options_wrap">
            <li class="option_wrap" v-for="(op,index) in empty" :class="{full:options[index]}" :key="index">
              <div class="inner_box" v-if="options[index] && options[index] !=='add'">
                <a href="javascript:void(0)" class="icon_btn" v-for="(half,i) in options[index]"
                   @click="clickHandler(index,i)" :key="i">
                  <div class="icon" :class="{img_icon:half.type==='image',text_icon:half.type==='text'}"
                       v-if="!half.active && !half.cnt"></div>
                  <div class="img_wrap" v-if="half.type==='image'">
                    <img class="insertFile_hook" v-if="half.cnt" :data-name="half.cnt.name" :src="half.cnt.src" alt="">
                  </div>
                  <div class="text_wrap" v-else-if="half.type==='text'">
                    <textarea ref="textarea" v-model="half.cnt" maxlength="15" @blur="toNoActive(index,i)"></textarea>
                  </div>
                </a>
                <span class="line"></span>
                <div class="del_btn_wrap" v-show="options.length>4" @click="delOption(index)">
                  <i-icon type="trash-a"></i-icon>
                </div>
              </div>
              <div class="add_wrap" v-else-if="options[index] === 'add'" @click="addOption">
                <i-icon class="add_icon" type="plus-round" size="60"></i-icon>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <insert-file-dialog @on-insert="insert"></insert-file-dialog>
    <unfold></unfold>
  </mboard>
</template>

<script>
  import Notepad from 'components/template1-part/notepad/notepad';
  import IIcon from 'iview/src/components/icon';
  import InsertFileDialog from 'base/insertFile/insertFile';
  import Notice from 'iview/src/components/notice';
  import Unfold from 'base/unfoldDialog/unfoldDialog';

  import {tem1ComMixin} from 'common/js/mixin';
  import {mapMutations} from 'vuex';

  import II from './ii_icon.png';
  import IT from './it_icon.png';
  import TT from './tt_icon.png';

  class OImage {
    constructor() {
      this.type = 'image';
      this.cnt = null;
      this.active = false;
    }
  }
  class OText {
    constructor() {
      this.type = 'text';
      this.cnt = '';
      this.active = false;
    }
  }

  export default {
    mixins: [tem1ComMixin],
    data() {
      return {
        curIndex: 0,
        curType: '',
        choice: [
          {
            icon: II,
            name: '图片--图片'
          },
          {
            icon: IT,
            name: '图片--文字'
          },
          {
            icon: TT,
            name: '文字--文字'
          }
        ],
        empty: new Array(12),
        options: ['add']
      };
    },
    methods: {
      changeType(index) {
        switch (index) {
          case 0:
            this.curType = 'i-i';
            break;
          case 1:
            this.curType = 'i-t';
            break;
          case 2:
            this.curType = 't-t';
            break;
        }
        this.curIndex = 1;
        this.options = ['add'];
        this.initOptions();
      },
      initOptions() {
        for (let i = 0; i < 3; i++) {
          this.addOption();
        }
      },
      addOption() {
        let option = [];
        switch (this.curType) {
          case 'i-i':
            option = [new OImage(), new OImage()];
            break;
          case 'i-t':
            option = [new OImage(), new OText()];
            break;
          case 't-t':
            option = [new OText(), new OText()];
            break;
        }
        if (!this.options) this.options = [];
        if (this.options.length === 0) {
          this.options.push('add');
        } else if (this.options.length === 1) {
          this.options.unshift(option);
        } else {
          this.options.splice(this.options.length - 1, 0, option);
        }
      },
      delOption(index) {
        this.options.splice(index, 1);
      },
      toActive(i, subi) {
        this.options[i][subi].active = true;
      },
      toNoActive(i, subi) {
        this.options[i][subi].active = false;
      },
      clickHandler(i, subi) {
        if (this.options[i][subi].type === 'text') {
          this.toActive(i, subi);
          this.$nextTick(() => {
            let n = this.curType.match(/t/g).length === 1
              ? i + subi - 1
              : i * 2 + subi;
            this.$refs.textarea[n].focus();
          });
        } else {
          this.showInDlog(i, subi);
        }
      },
      showInDlog(i, subi) {
        this.setFileDia({
          name: '插入图片',
          type: 'image',
          status: true
        });
        this.curI = i;
        this.cursubI = subi;
      },
      insert(file) {
        let cnt = this.options[this.curI][this.cursubI].cnt;
        this.options[this.curI][this.cursubI].cnt = Object.assign({}, cnt, {
          src: file.objURL,
          name: file.name
        });
      },
      getQuestionData(urlSnippet) {
        let pairs = [];
        this.options.forEach((item) => {
          if (item !== 'add') {
            pairs.push(item);
          }
        });
        let localData = {
          title: document.title,
          pairs,
          questionType: this.$route.path.split('/')[3]
        };
        let _pairs = [];
        pairs.forEach((item, index) => {
          _pairs.push([]);
          for (let i = 0; i < item.length; i++) {
            if (item[i] && typeof item[i].cnt !== 'string') {
              _pairs[i] = {
                type: 'image',
                cnt: {
                  src: urlSnippet + item[i].cnt.name,
                  name: item[i].cnt.name
                },
                active: false
              };
            } else {
              _pairs[i] = item[i];
            }
          }
        });
        let questionData = Object.assign({}, localData, {pairs: _pairs});
        console.log(localData, questionData);
        return {
          questionData,
          localData
        };
      },
      verifyHandle() {
        let cnts = [];
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i] === 'add') break;
          let cnt1 = this.options[i][0].cnt;
          let cnt2 = this.options[i][1].cnt;
          if (typeof cnt1 === 'string') {
            cnts.push(cnt1);
          } else {
            cnts.push(cnt1 ? cnt1.name : '');
          }
          if (typeof cnt2 === 'string') {
            cnts.push(cnt2);
          } else {
            cnts.push(cnt2 ? cnt2.name : '');
          }
        }
        let arr = Array.from(new Set(cnts));
        for (let i = 0; i < cnts.length; i++) {
          if (!cnts[i]) return -1;
        }
        if (arr.length !== cnts.length) return -2;
        return 1;
      },
      showMessage() {
        let res = this.verifyHandle();
        let desc = '';
        if (res === 1) {
          return 1;
        } else if (res === -1) {
          desc = '配对内容未填写';
        } else if (res === -2) {
          desc = '配对内容不能有重复项';
        }
        Notice.destroy();
        Notice.warning({
          desc
        });
        return 0;
      },
      ...mapMutations({
        setFileDia: 'SET_FILEDIALOGINFO'
      })
    },
    components: {
      Notepad,
      IIcon,
      InsertFileDialog,
      Unfold
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../../common/stylus/mixin';

  #link-game
    width: 100%
    height: 100%
    overflow: hidden
    .nav
      height: 100%
      width: 100%
      display: flex
      justify-content: center
      align-items: center
      text-align: center
      .nav_item
        flex: 1
        display: inline-block
        max-width: 160px
        margin: 0 30px
        .icon_wrap
          display: block
          width: 100%
          height: 150px
          background: url('/static/images/bq_box.png') no-repeat center top
          background-size: contain
          margin-bottom: 10px
          .icon
            width: 80%
            margin: 10%
          &:hover
            background-image: url('/static/images/bq_box_on.png')
        .text
          background-color: #e8ae67
          border-radius: 15px
          text-align: center
          color: #5D3B12
          padding: 6px 20px
          &:hover
            background-color: #f5b86d
    .page_list
      width: 100%
      height: 100%
      display: flex
      padding: 10px
      .left_box
        flex: 1
      .right_box
        flex: 3
        padding: 10px
        .options_wrap
          width: 100%
          height: 100%
          position: relative
          .option_wrap
            float: left
            width: 32%
            padding-top: 15%
            border: 1px solid #C99558
            margin-left: 1%
            margin-bottom: 1%
            border-radius: 12px
            font-size: 0
            overflow: hidden
            position: relative
            &.full
              border-color: #83551C
            .inner_box, .add_wrap
              position: absolute
              width: 100%
              height: 100%
              top: 0
              left: 0
              .icon_btn
                position: relative
                float: left
                width: 45%
                height: 100%
                background: url('/static/images/bq_box.png') no-repeat center center
                background-size: cover
                &:nth-child(2)
                  float: right
                &:hover
                  .icon
                    background-color: rgba(0, 0, 0, .1)
                .icon, .img_wrap, .text_wrap
                  center()
                  width: 70px
                  height: 70px
                  border-radius: 8px
                  background-repeat: no-repeat
                  background-position: center
                  background-size: 30px
                  overflow: hidden
                  &.img_icon
                    bg-image('./i_i_icon.png')
                  &.text_icon
                    bg-image('./i_t_icon.png')
                  img
                    width: 100%
                    height: 100%
                  textarea
                    width: 100%
                    height: 100%
                    font-size: 12px
                    text-align: center
                    line-height: 18px
                    resize: none
                    background: none
                    border: none
                    outline: none
              .line
                width: 10%
                position: absolute
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)
                height: 5px
                border: 1px solid #fff
                background-color: #D7D7D7
                border-radius: 2px
              &.add_wrap
                text-align: center
                color: #7A521A
                cursor: pointer
                &:hover
                  color: #6B4818
                .add_icon
                  position: absolute
                  top: 50%
                  left: 50%
                  transform: translate(-50%, -50%);
                  text-shadow: -2px 3px 3px rgba(0, 0, 0, .3)
              .del_btn_wrap
                position: absolute
                width: 30px
                height: 30px
                background-color: #FFA633
                right: 0
                top: 0
                border-bottom-left-radius: 10px
                color: #fff
                font-size: 24px
                line-height: 30px
                text-align: center
                display: none
              &:hover
                .del_btn_wrap
                  display: block
</style>

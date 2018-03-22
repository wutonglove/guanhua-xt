<template>
  <mboard :mboard="mboard">
    <div id="classify-tab">
      <div class="top_box">
        <side-bd class="left_box"
                 :resource="file"
                 :desc="desc"
                 @change-desc="changeDesc"
                 @change-resource="changeResource"
                 @del-resource="delResource"
        ></side-bd>
        <div class="right_box">
          <ul class="tds_title">
            <li class="td_title" v-for="(td,index) in tdsTitle">
              <input type="text" maxlength="10" v-model="td.content">
              <i-icon class="del" type="trash-a" v-show="tdsTitle.length>minC" @click.native="delTd(index)"></i-icon>
            </li>
            <li class="add_td" v-show="tdsTitle.length<4">
              <btn class="btn" icon="plus-round" @click="addTd"></btn>
            </li>
          </ul>
          <div class="content">
            <ul class="trs_title">
              <li class="tr_title" v-for="(tr,index) in trsTitle">
                <textarea maxlength="5" v-model="tr.content"></textarea>
                <i-icon class="del" type="trash-a" v-show="trsTitle.length>minR"
                        @click.native="delTr(index)"></i-icon>
              </li>
              <li class="add_tr" v-show="trsTitle.length<4">
                <btn class="btn" icon="plus-round" @click="addTr"></btn>
              </li>
            </ul>
            <ul class="table">
              <li class="tr" v-for="tr in table">
                <ul class="td" v-for="td in tr">
                  <draggable element="li" class="options" v-model="td.options" :options="dragOptions">
                    <transition-group tag="div" class="options_wrap">
                      <div class="option" v-for="(option,index) in td.options" :key="'1op'+index">
                        <div class="img_option" v-if="option.type==='image'">
                          <img :src="option.src" alt="" class="insertFile_hook" :data-name="option.name">
                        </div>
                        <div class="text_option" v-else-if="option.type='text'">
                          <div>{{option.text}}</div>
                        </div>
                      </div>
                    </transition-group>
                  </draggable>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer">
        <draggable element="div" v-model="options" :options="dragOptions" class="options">
          <transition-group class="options_wrap" tag="ul">
            <li v-for="(option,index) in options" :key="'op'+ index">
              <div class="option empty" v-if="option.type===''">
                <input type="text" v-model="option.text" @change="changeText(index)">
                <a href="javascript:void(0)" @click="showInsert(index)">
                  <i-icon class="icon" type="images"></i-icon>
                </a>
              </div>
              <div class="option img_option" v-else-if="option.type==='image'">
                <img :src="option.src" alt="" class="insertFile_hook" :data-name="option.name">
              </div>
              <div class="option text_option" v-else-if="option.type='text'">
                <textarea v-model="option.text"></textarea>
              </div>
              <i-icon class="del" type="trash-a" @click.native="delOption(index)"></i-icon>
            </li>
          </transition-group>
        </draggable>
        <i-icon class="add_icon" type="plus-round" @click.native="addOption"></i-icon>
      </div>
    </div>
    <unfold></unfold>
    <insert-file-dialog @on-insert="insert"></insert-file-dialog>
  </mboard>
</template>

<script>
  import InsertFileDialog from 'base/insertFile/insertFile';
  import Unfold from 'base/unfoldDialog/unfoldDialog';
  import SideBd from 'components/template1-part/side-bd/side-bd';
  import Btn from 'components/template1-part/template1-btn/template1-btn';
  import IIcon from 'iview/src/components/icon';
  import draggable from 'vuedraggable';
  import Notice from 'iview/src/components/notice';

  import {mapMutations, mapGetters} from 'vuex';
  import {tem1ComMixin} from 'common/js/mixin';

  // 初始 行 列
  const R = 2;
  const C = 1;

  class Option {
    constructor() {
      this.type = '';
      this.text = '';
      this.src = '';
      this.name = '';
    }
  }

  export default {
    mixins: [tem1ComMixin],
    data() {
      return {
        desc: '请将下列选项拖入相应的表格内',
        file: null,
        resource: null,
        table: [],
        trsTitle: [],
        tdsTitle: [],
        options: [],
        curIndex: -1,
        minR: R,
        minC: C,
        dragOptions: {
          animation: 0,
          group: 'description',
          disabled: false,
          ghostClass: 'ghost',
          dragClass: 'drag',
          fallbackClass: 'fallbackClass',
          selectedClass: 'chosen'
        }
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.init();
      });
    },
    computed: {
      ...mapGetters([
        'fileDialogInfo'
      ])
    },
    methods: {
      init() {
        for (let r = 0; r < R; r++) {
          this.table.push([]);
          this.trsTitle.push({
            content: ''
          });
        }
        for (let c = 0; c < C; c++) {
          this.addTd();
        }
      },
      addTd() {
        this.table.forEach((item, index) => {
          item.push({options: []});
          if (index === 0) {
            this.tdsTitle.push({
              content: ''
            });
          }
        });
      },
      addTr() {
        let tdlen = C;
        if (this.table[0]) {
          tdlen = this.table[0].length;
        }
        this.table.push([]);
        this.trsTitle.push({
          content: ''
        });
        for (let i = 0; i < tdlen; i++) {
          this.table[this.table.length - 1].push({options: []});
        }
      },
      delTd(index) {
        for (let r = 0; r < this.table.length; r++) {
          this.table[r].splice(index, 1);
        }
        this.tdsTitle.splice(index, 1);
      },
      delTr(index) {
        this.table.splice(index, 1);
        this.trsTitle.splice(index, 1);
      },
      changeResource(val) {
        this.resource = val;
      },
      changeDesc(val) {
        this.desc = val;
      },
      insert(file) {
        if (this.curIndex !== -1) {
          this.options[this.curIndex] = Object.assign({}, this.options[this.curIndex], {
            src: file.objURL,
            name: file.name,
            type: 'image'
          });
          this.$forceUpdate();
          return;
        }
        this.file = file;
      },
      delResource() {
        this.file = null;
      },
      addOption() {
        this.options.push(new Option());
      },
      delOption(index) {
        this.options.splice(index, 1);
      },
      changeText(index) {
        this.options[index].type = 'text';
      },
      showInsert(index) {
        this.setFileDia({
          name: '插入图片',
          type: 'image',
          status: true
        });
        this.curIndex = index;
      },
      getQuestionData(urlSnippet) {
        let r = this.table.length;
        let c = this.table[0].length;
        let options = [];
        let _options = [];
        let resource = null;
        let _resource = null;
        if (this.resource) {
          resource = {
            type: this.resource.type,
            cssStyle: this.resource.cssStyle,
            src: urlSnippet + this.resource.name
          };
          _resource = {
            type: this.resource.type,
            cssStyle: this.resource.cssStyle,
            src: this.resource.src
          };
        }
        this.table.forEach((tr, trn) => {
          tr.forEach((td, tdn) => {
            td.options.forEach((option, index) => {
              if (option.type === 'image') {
                options.push({
                  type: 'image',
                  src: option.src,
                  pos: {
                    r: trn,
                    c: tdn
                  }
                });
                _options.push({
                  type: 'image',
                  src: urlSnippet + option.name,
                  pos: {
                    r: trn,
                    c: tdn
                  }
                });
              } else {
                options.push({
                  type: 'text',
                  text: option.text,
                  pos: {
                    r: trn,
                    c: tdn
                  }
                });
                _options.push({
                  type: 'text',
                  text: option.text,
                  pos: {
                    r: trn,
                    c: tdn
                  }
                });
              }
            });
          });
        });
        let questionData = {
          title: document.title,
          desc: {
            text: this.desc,
            resource
          },
          table: {r, c},
          trsTitle: this.trsTitle,
          tdsTitle: this.tdsTitle,
          options: _options,
          questionType: this.$route.path.split('/')[2]
        };
        let localData = Object.assign({}, questionData, {
          options,
          desc: {
            text: this.desc,
            resource: _resource
          }
        });
        return {
          questionData,
          localData
        };
      },
      verifyHandle() {
        for (let i = 0; i < this.tdsTitle.length; i++) {
          if (this.tdsTitle[i].content.trim() === '') return -1;
        }
        for (let i = 0; i < this.trsTitle.length; i++) {
          if (this.trsTitle[i].content.trim() === '') return -1;
        }
        if (this.options.length > 0) return -2;
        let n = 0;
        for (let r = 0; r < this.table.length; r++) {
          for (let c = 0; c < this.table[r].length; c++) {
            n += this.table[r][c].options.length;
          }
        }
        if (n === 0) return -3;
        return 1;
      },
      showMessage() {
        let res = this.verifyHandle();
        let desc = '';
        if (res === 1) {
          return 1;
        } else if (res === -1) {
          desc = '表头不能为空！';
        } else if (res === -2) {
          desc = '需将所有选项进行分类';
        } else if (res === -3) {
          desc = '表格内容不能为空';
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
    watch: {
      'fileDialogInfo.status'(val) {
        if (!val) this.curIndex = -1;
      }
    },
    components: {
      InsertFileDialog,
      Unfold,
      SideBd,
      Btn,
      IIcon,
      draggable
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../../common/stylus/mixin.styl'
  #classify-tab
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    .top_box
      flex: 1
      display: flex
      margin: 10px
      .left_box
        flex: 1
      .right_box
        flex: 2
        border: 5px solid #E4B772
        margin-left: 10px
        border-radius: 8px
        display: flex
        flex-direction: column
        font-size: 12px
        color: #5D3B12
        .tds_title
          flex: 0 0 36px
          height: 36px
          bg-image('./table_lie_bg.png')
          background-size: 100% 100%
          padding-left: 65px
          position: relative
          display: flex
          .td_title
            flex: 1
            position: relative
            input
              width: 75px
              height: 30px
              line-height: 30px
              box-shadow: 0 3px 10px 0 rgba(0, 0, 0, .4) inset
              background-color: #E6A962
              border: none
              border-radius: 4px
            .del
              position: absolute
              top: 0
              left: 0
              width: 16px
              height: 16px
              text-align: center
              line-height: 16px
              color: #fff
              border-bottom-right-radius: 8px
              background-color: rgba(0, 0, 0, .4)
              cursor: pointer
              display: none
            &:hover
              .del
                display: block
          .add_td
            position: absolute
            right: 5px
            top: 3px
            width: 28px
            height: 28px
            .btn
              width: 100%
              height: 100%
              font-size: 24px
              padding: 0
              line-height: 28px
              text-align: center
              border: 1px solid #8F541A
        .content
          flex: 1
          display: flex
          .trs_title
            flex: 0 0 65px
            width: 65px
            bg-image('./table_lie_bg.png')
            background-size: 100% 100%
            position: relative
            display: flex
            flex-direction: column
            .tr_title
              flex: 1
              width: 100%
              padding: 0 5px
              position: relative
              &:first-child
                margin-top: 10px
              textarea
                width: 100%
                height: 35px
                box-shadow: 0 3px 10px 0 rgba(0, 0, 0, .4) inset
                background-color: #E6A962
                border: none
                border-radius: 4px
                padding: 4px
                resize: none
                outline: none
              .del
                position: absolute
                top: 0
                left: 5px
                width: 16px
                height: 16px
                text-align: center
                line-height: 16px
                color: #fff
                border-bottom-right-radius: 8px
                background-color: rgba(0, 0, 0, .4)
                cursor: pointer
                display: none
              &:hover
                .del
                  display: block
            .add_tr
              position: absolute
              left: 5px
              bottom: 0
              width: 55px
              height: 28px
              .btn
                width: 100%
                height: 100%
                font-size: 24px
                padding: 0
                line-height: 28px
                text-align: center
                border: 1px solid #8F541A
          .table
            flex: 1
            display: flex
            flex-direction: column
            .tr
              flex: 1
              display: flex
              &:not(:last-child)
                border-bottom: 5px solid #D5A464
              .td
                flex: 1
                box-shadow: -3px -3px 15px 0 rgba(0, 0, 0, .2) inset
                padding: 5px
                &:not(:last-child)
                  border-right: 5px solid #D5A464
                .options
                  display: flex
                  width: 100%
                  height: 100%
                  .options_wrap
                    width: 100%
                    height: 100%
                    overflow: auto
                    .option, .ghost, .drag, .fallbackClass, .chosen
                      width: 70px
                      height: 55px
                      display: inline-block
                      background-color: #ffedd0
                      border: 1px solid #A98560
                      border-radius: 3px
                      vertical-align: middle
                      .del
                        display: none
                      .img_option
                        width: 100%
                        height: 100%
                        overflow: hidden
                        img
                          width: 100%
                          height: 100%
                      .text_option
                        width: 100%
                        height: 100%
                        textarea
                          width: 100%
                          height: 100%
                          background: none
                          resize: none
                          border: none
                          padding: 3px
                          font-size: 13px
                          line-height: 16px
    .footer
      flex: 0 0 70px
      height: 70px
      margin: 0 20px 10px
      background-color: #93662B
      position: relative
      .options
        position: absolute
        top: 0
        left: 0
        right: 50px
        height: 100%
        overflow-x: auto
        overflow-y: hidden
        padding: 8px
        white-space: nowrap
        .options_wrap
          width: 100%
          height: 100%
          li
            display: inline-block
            height: 100%
            margin: 0 3px
            position: relative
            .del
              position: absolute
              top: 0
              right: 0
              width: 18px
              height: 18px
              text-align: center
              line-height: 16px
              color: #fff
              border-bottom-left-radius: 8px
              background-color: rgba(0, 0, 0, .4)
              cursor: pointer
              display: none
            &:hover
              .del
                display: block
            &.drag, &.fallbackClass, &.chosen
              .del
                display: none
            .option
              height: 100%
              display: inline-block
              background-color: #ffedd0
              border: 1px solid #A98560
              border-radius: 3px
              vertical-align: middle
              position: relative
              &.empty
                width: 115px
                height: 34px
                input
                  width: 70px
                  margin: 0 5px 0 10px
                  border: none
                  padding: 0 3px
                  background: none
                  border: 1px solid transparent
                  font-size: 12px
                  line-height: 25px
                  &:focus
                    border-color: #6A9DCD
                    border-radius: 3px
                .icon
                  vertical-align: middle
                  font-size: 20px
                  line-height: 34px
              &.img_option
                width: 70px
                height: 100%
                overflow: hidden
                img
                  width: 100%
                  height: 100%
              &.text_option
                width: 125px
                height: 100%
                textarea
                  width: 100%
                  height: 100%
                  background: none
                  resize: none
                  border: none
                  padding: 3px
                  font-size: 13px
                  line-height: 16px
      .add_icon
        position: absolute
        right: 0
        top: 0
        width: 50px
        height: 100%
        line-height: 70px
        font-size: 45px
        color: #C5AD8E
        text-align: center
        cursor: pointer
        &:hover
          color: #fff
</style>

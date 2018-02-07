<template>
  <div id="classify-tab">
    <div class="top_box">
      <show-side class="left_box" :data="desc"></show-side>
      <div class="right_box">
        <ul class="tds_title">
          <li class="td_title" v-for="(td,index) in tdsTitle">
            <div class="text">{{td.content}}</div>
          </li>
        </ul>
        <div class="content">
          <ul class="trs_title">
            <li class="tr_title" v-for="(tr,index) in trsTitle">
              <div class="text">{{tr.content}}</div>
            </li>
          </ul>
          <ul class="table">
            <li class="tr" v-for="tr in table">
              <ul class="td" v-for="td in tr">
                <draggable element="li" class="options" v-model="td.options" :options="dragOptions">
                  <transition-group tag="div" class="options_wrap">
                    <div class="option" v-for="(option,index) in td.options" :key="'1op'+index">
                      <div class="img_option" v-if="option.type==='image'">
                        <img :src="option.src" alt="">
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
            <div class="option img_option" v-if="option.type==='image'">
              <img :src="option.src" alt="">
            </div>
            <div class="option text_option" v-else-if="option.type='text'">
              <textarea v-model="option.text"></textarea>
            </div>
          </li>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
  import ShowSide from 'components/template1-part/show-side-bd/show-side-bd';
  import draggable from 'vuedraggable';
  import IIcon from 'iview/src/components/icon';

  import {submitMixin} from 'common/js/mixin';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    computed: {
      desc() {
        return {
          text: this.questionData.desc.text,
          resource: this.questionData.desc.resource
        };
      },
      tdsTitle() {
        return this.questionData.tdsTitle;
      },
      trsTitle() {
        return this.questionData.trsTitle;
      },
      r() {
        return this.questionData.table.r;
      },
      c() {
        return this.questionData.table.c;
      },
      chgOptions: {
        get() {
          return this.options;
        },
        set(val) {
          this.options = val;
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initTable();
        this.chgOptions = this.questionData.options.slice();
      });
    },
    data() {
      return {
        table: [],
        options: [],
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
    methods: {
      initTable() {
        for (let r = 0; r < this.r; r++) {
          this.table.push([]);
          for (let c = 0; c < this.c; c++) {
            this.table[r].push({
              options: []
            });
          }
        }
      },
      getResult() {
        let len = this.options.length;
        if (len === this.questionData.options.length) return -1;
        else if (len > 0) return 0;
        for (let r = 0; r < this.table.length; r++) {
          for (let c = 0; c < this.table[r].length; c++) {
            let options = this.table[r][c].options;
            for (let index = 0; index < options.length; index++) {
              let item = options[index];
              if (item.pos.r !== r || item.pos.c !== c) return 0;
            }
          }
        }
        return 1;
      }
    },
    components: {
      draggable,
      ShowSide,
      IIcon
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
        border-radius: 8px
        overflow: hidden
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
            .text
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
              .text
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

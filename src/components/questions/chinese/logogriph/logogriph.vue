<template>
  <mboard :mboard="mboard">
    <div class="logogriph_wrap">
      <div class="grid_box">
        <grid ref="grid" @op-change="setOptions"></grid>
      </div>
      <div class="side_box">
        <div class="cro_guidance">
          <notepad class="content" title="横向提示" align="center" color="#fff">
            <ul class="guidance_list">
              <li class="guidance_item"
                  v-for="(item,index) in croGuidList"
                  @mouseover="mouseOver(item.index)"
                  @mouseout="mouseOut"
              >
                <div class="answer_wrap">{{index + 1}}</div>
                <div class="input_wrap">
                  <input type="text" class="input" v-model="item.desc" placeholder="请输入提示内容">
                </div>
                <div class="btn_wrap">
                  <span class="del_btn" @click="delGuid(item.index)"></span>
                </div>
              </li>
            </ul>
          </notepad>
        </div>
        <div class="len_guidance">
          <notepad class="content" title="纵向提示" align="center" color="#fff">
            <ul class="guidance_list">
              <li class="guidance_item"
                  v-for="(item,index) in lenGuidList"
                  @mouseover="mouseOver(item.index)"
                  @mouseout="mouseOut"
              >
                <div class="answer_wrap">{{index + 1}}</div>
                <div class="input_wrap">
                  <input type="text" class="input" v-model="item.desc" placeholder="请输入提示内容">
                </div>
                <div class="btn_wrap">
                  <span class="del_btn" @click="delGuid(item.index)"></span>
                </div>
              </li>
            </ul>
          </notepad>
        </div>
      </div>
    </div>
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
      croGuidList: [],
      lenGuidList: []
    };
  },
  computed: {
    guidList() {
      return this.$refs.grid.optionsObj;
    }
  },
  methods: {
    delGuid(index) {
      this.$refs.grid.delItem(index);
    },
    setOptions(optionsObj) {
      this.croGuidList = [];
      this.lenGuidList = [];
      optionsObj.forEach((item, index) => {
        let text = '';
        let ori = this.getOri(item);
        item.forEach((grid, i) => {
          text += grid.text;
        });
        let obj = {
          index,
          text,
          desc: ''
        };
        if (ori === 'x') {
          this.croGuidList.push(obj);
        } else if (ori === 'y') {
          this.lenGuidList.push(obj);
        }
      });
    },
    mouseOver(index) {
      let grid;
      let grids = this.guidList[index];
      for (let i = 0; i < grids.length; i++) {
        if (grids[i].code.length < 2) {
          grid = grids[i];
          break;
        }
      }
      if (!grid) grid = grids[0];
      this.$refs.grid.mouseOver(grid);
    },
    mouseOut() {
      this.$refs.grid.mouseOut();
    },
    getOri(arr) {
      let table = this.$refs.grid.table;
      for (let r = 0; r < table.length; r++) {
        for (let c = 0; c < table[r].length; c++) {
          if (table[r][c] === arr[0]) {
            if (table[r][c + 1] && table[r][c + 1] === arr[1]) {
              return 'x';
            } else if (table[r + 1] && table[r + 1][c] === arr[1]) {
              return 'y';
            }
          }
        }
      }
    },
    getTable() {
      let table = [];
      this.$refs.grid.table.forEach((item, index) => {
        table.push([]);
        item.forEach((grid, i) => {
          table[index].push({
            text: grid.text,
            tags: grid.tags,
            codes: grid.code
          });
        });
      });
      return table;
    },
    getQuestionData() {
      let grids = this.getTable();
      let synops = {
        cro: this.croGuidList,
        len: this.lenGuidList
      };
      let questionData = {
        title: document.title,
        grids,
        synops,
        times: '',
        questionType: 'logogriph'
      };
      let localData = questionData;
      return {
        questionData,
        localData
      };
    },
    verifyHandle() {
      if (this.croGuidList.length < 1) return -1;
      if (this.lenGuidList.length < 1) return -2;

      for (let i = 0; i < this.croGuidList.length; i++) {
        if (this.croGuidList[i].desc.trim() === '') return -4;
      }
      for (let i = 0; i < this.lenGuidList.length; i++) {
        if (this.lenGuidList[i].desc.trim() === '') return -4;
      }
      // 判断是否有没有设置的方格
      let table = this.$refs.grid.table;
      for (let r = 0; r < table.length; r++) {
        for (let c = 0; c < table.length; c++) {
          let grid = table[r][c];
          if (grid.code.length < 1 && grid.text !== '') return -3;
        }
      }
      return 1;
    },
    showMessage() {
      let res = this.verifyHandle();
      let desc = '';
      if (res === 1) {
        return 1;
      } else if (res === -1) {
        desc = '请至少编辑一条横向提示';
      } else if (res === -2) {
        desc = '请至少编辑一条纵向提示';
      } else if (res === -3) {
        desc = '提示数量和题干不符，请检查';
      } else if (res === -4) {
        desc = '请输入提示';
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
.logogriph_wrap
  display: flex
  width: 100%
  height: 100%
  .grid_box
    flex: 1
    position: relative
  .side_box
    flex: 1
    display: flex
    .cro_guidance, .len_guidance
      flex: 1
      margin: 15px
      border-radius: 8px
      box-shadow: 1.5px 2.6px 19px 0 rgba(75, 40, 0, 0.75)
      overflow: hidden
      .content
        width: 100%
        height: 100%
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
              flex: 0 0 10px
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
                  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2) inset
            .btn_wrap
              flex: 0 0 24px
              padding-top: 2px
              .del_btn
                display: block
                width: 20px
                height: 20px
                background: url('/static/images/hint_del.png')
                background-size: contain
</style>

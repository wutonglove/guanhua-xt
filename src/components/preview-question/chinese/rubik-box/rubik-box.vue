<template>
  <div class="rubik_wrap">
    <div class="grid_box">
      <v-grid ref="grid" :tableData="tableData" mode="show"></v-grid>
    </div>
    <notepad class="side_box" title="提示" color="#fff" align="center">
      <ul class="guidance_list">
        <li class="guidance_item" v-for="(item,index) in answerDescs">
          <div class="text">{{`${index + 1}. ${item}`}}</div>
        </li>
      </ul>
    </notepad>
  </div>
</template>

<script>
  import VGrid from 'components/template1-part/grid/grid';
  import Notepad from 'components/template1-part/notepad/notepad';

  import {submitMixin} from 'common/js/mixin';
  import {Grid} from 'common/js/class';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    data() {
      return {
        tableData: [],
        answerDescs: []
      };
    },
    mounted() {
      this.v_initTableData();
      this.v_initAnswer();
    },
    methods: {
      getResult() {
        let answer = [];
        this.$refs.grid.optionsObj.forEach((item, index) => {
          let text = '';
          item.forEach((grid, i) => {
            text += grid.text;
          });
          answer.push(text.trim());
        });
        if (answer.length === 0) {
          return -1;
        } else if (answer.length !== this.questionData.answer.length) {
          return 0;
        } else {
          for (let i = 0; i < answer.length; i++) {
            if (answer[i] !== this.questionData.answer[i].answer) return 0;
          }
          return 1;
        }
      },
      v_initAnswer() {
        /* eslint-disable no-unused-vars */
        for (let [index, item] of this.questionData.answer.entries()) {
          this.answerDescs.push(item.desc);
        }
      },
      v_initTableData() {
        this.questionData.grids.forEach((item, r) => {
          this.tableData.push([]);
          item.forEach((grid, c) => {
            let text = grid.text;
            this.tableData[r].push(new Grid(text));
          });
        });
      }
    },
    components: {
      VGrid,
      Notepad
    }
  };
</script>

<style scoped lang="stylus">
  .rubik_wrap
    width: 100%
    height: 100%
    display: flex
    .grid_box
      flex: 1
      position: relative
    .side_box
      flex: 1
      .guidance_list
        padding: 12px
      .guidance_item
        margin: 6px 0
        display: flex
        height: 30px
        line-height: 30px
        padding: 0 5px
        &:hover
          background-color: #F1E3C7
        .text
          font-size: 18px
</style>

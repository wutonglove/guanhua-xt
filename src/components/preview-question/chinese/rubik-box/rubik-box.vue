<template>
  <div class="rubik_wrap">
    <div class="grid_box">
      <grid ref="grid" :tableData="tableData" mode="show"></grid>
    </div>
    <div class="side_box">
      <div class="guidance">
        <div class="header">
          <div class="title">提示</div>
        </div>
        <div class="content">
          <ul class="guidance_list">
            <li class="guidance_item" v-for="(item,index) in answerDescs">
              <div class="text">{{`${index + 1}. ${item}`}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Grid from 'components/template1-part/grid/grid';
  import {submitMixin} from 'common/js/mixin';
  import {createGrid} from 'common/js/class';

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
      this._initTableData();
      this._initAnswer();
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
      _initAnswer() {
        /* eslint-disable no-unused-vars */
        for (let [index, item] of this.questionData.answer.entries()) {
          this.answerDescs.push(item.desc);
        }
      },
      _initTableData() {
        this.questionData.grids.forEach((item, r) => {
          this.tableData.push([]);
          item.forEach((grid, c) => {
            let text = grid.text;
            this.tableData[r].push(createGrid(text));
          });
        });
      }
    },
    components: {
      Grid
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
            height: 30px
            line-height: 30px
            padding: 0 5px
            &:hover
              background-color: #F1E3C7
            .text
              font-size: 18px


</style>

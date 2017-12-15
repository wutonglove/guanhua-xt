<template>
  <div class="logogriph_wrap">
    <div class="grid_wrap">
      <div class="grid_bd">
        <div class="grid_tr" v-for="(tr,r) in table">
          <div class="grid_box" v-for="(td,c) in tr">
            <div class="tag"
                 :class="{tag_x:tag.ori==='right',tag_y:tag.ori === 'down'}"
                 v-for="(tag,index) in td.tags"
                 v-show="td.focus && tag.show"
            >
              {{tag.code + ''}}
            </div>
            <input type="text"
                   class="text"
                   :class="{grid_active:td.focus}"
                   @focus="inputFocus(td)"
                   @blur="inputBlur"
                   maxlength="1"
                   v-if="td.text!==''"
                   v-model="td.inputText"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="side_box">
      <div class="cro_guidance guidance">
        <div class="title">横向提示</div>
        <ul class="guidance_list">
          <li class="guidance_item"
              v-for="(item,index) in croGuidList"
          >
            <span class="text">{{`${item.index + 1}. ${item.desc}`}}</span>
          </li>
        </ul>
      </div>
      <div class="len_guidance guidance">
        <div class="title">纵向提示</div>
        <ul class="guidance_list">
          <li class="guidance_item"
              v-for="(item,index) in lenGuidList"
          >
            <span class="text">{{`${item.index + 1}. ${item.desc}`}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {submitMixin} from 'common/js/mixin';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    data() {
      return {
        table: []
      };
    },
    mounted() {
      this.$nextTick(() => {
        this._initTable();
      });
    },
    computed: {
      croGuidList() {
        return this.questionData.synops.cro;
      },
      lenGuidList() {
        return this.questionData.synops.len;
      }
    },
    methods: {
      inputFocus(item) {
        let codes = item.codes;
        codes.forEach((code) => {
          let arr = this.table.slice();
          arr.forEach((item) => {
            item.forEach((grid) => {
              if (grid.codes.indexOf(code) !== -1) {
                grid.focus = true;
                // 判断是否有tag，根据code 改变相应的show
                if (grid.tags.length > 0) {
                  grid.tags.forEach((tag) => {
                    if (tag.code === code + 1) {
                      tag.show = true;
                    }
                  });
                }
              }
            });
          });
          this.table = arr;
        });
      },
      inputBlur() {
        this.table.forEach((item) => {
          item.forEach((grid) => {
            grid.focus = false;
            grid.tags.forEach((tag) => {
              tag.show = false;
            });
          });
        });
      },
      getResult() {
        for (let r = 0; r < this.table.length; r++) {
          for (let c = 0; c < this.table[r].length; c++) {
            let grid = this.table[r][c];
            if (grid.inputText.trim() !== grid.text) return 0;
          }
        }
        return 1;
      },
      _initTable() {
        this.questionData.grids.forEach((item, index) => {
          this.table.push([]);
          item.forEach((td, c) => {
            this.table[index].push(Object.assign({}, td, {inputText: ''}));
            let tags = this.table[index][c].tags;
            if (tags) {
              tags.forEach((tag, i) => {
                tag.show = false;
              });
            }
          });
        });
      }
    }
  };
</script>

<style scoped lang="stylus">
  .logogriph_wrap
    display: flex
    width: 100%
    height: 100%
    .grid_wrap
      flex: 1
      position: relative
      text-align: center
      .grid_bd
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%);
        padding: 10px
        border-radius: 10px
        background-color: #E1B578
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, .3)
        .grid_tr
          white-space: nowrap
          .grid_box
            display: inline-block
            vertical-align: top
            width: 40px
            height: 40px
            margin: 3px
            border-radius: 6px
            background-color: #D9AB6C
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, .2) inset
            overflow: hidden
            position: relative
            .tag
              position: absolute
              top: 0
              color: #fff
              &.tag_x
                left: 0
                background-color: #73B108
              &.tag_y
                right: 0
                background-color: #D2723F
            .text
              font-size: 18px
              line-height: 40px
              width: 100%
              height: 100%
              background-color: #C39351
              border: none
              text-align: center
              &.grid_active
                background-color: #27B1EA
                color: #fff
    .side_box
      flex: 1
      display: flex
      .guidance
        flex: 1
        margin: 8px
        border-radius: 5px
        box-shadow: 1.5px 2.6px 19px 0 rgba(75, 40, 0, .75);
        position: relative
        z-index: 1
        display: flex
        flex-direction: column
        .title
          flex: 0 0 40px
          line-height: 40px
          color: #824F06
          font-weight: 800
          font-size: 18px
          padding-left: 10px
        .guidance_list
          padding: 0 8px
          overflow-y: auto
          .guidance_item
            margin: 15px 0
            .text
              width: 100%
              line-height: 24px
              color: #333

</style>

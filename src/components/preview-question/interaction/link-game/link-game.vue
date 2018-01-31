<template>
  <div id="linkgame">
    <notepad class="left_box" :title="'0/3'" align="center">
      <ul class="result_list">
        <li class="result_item" v-for="item in anList">
          <i-icon type="checkmark-round" class="icon"></i-icon>
          <div class="pair_wrap">
            <div class="half" v-for="half in item">
              <img v-if="half.type === 'image'" :src="half.cnt" alt="">
              <div class="text" v-else-if="half.type === 'text'">{{half.cnt}}</div>
            </div>
            <span class="cable">---</span>
          </div>
        </li>
      </ul>
    </notepad>
    <div class="right_box">
      <gm-bd :pairs="pairs" @eliminate="eliminate"></gm-bd>
    </div>
  </div>
</template>

<script>
  import {submitMixin} from 'common/js/mixin';
  import Notepad from 'components/template1-part/notepad/notepad';
  import GmBd from 'components/template1-part/link-game-bd/link-game-bd';
  import IIcon from 'iview/src/components/icon';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    data() {
      return {
        anList: []
      };
    },
    computed: {
      pairs() {
        let arr = [];
        this.questionData.pairs.forEach((item, index) => {
          arr.push([]);
          for (let i = 0; i < item.length; i++) {
            let cnt = '';
            if (typeof item[i].cnt === 'string') {
              cnt = item[i].cnt;
            } else {
              cnt = item[i].cnt.src;
            }
            arr[index].push({
              type: item[i].type,
              cnt
            });
          }
        });
        return arr;
      }
    },
    methods: {
      eliminate(index) {
        this.anList.push(this.pairs[index]);
      },
      getResult() {
        if (this.anList.length === 0) return -1;
        if (this.anList.length !== this.pairs.length) return 0;
        return 1;
      }
    },
    components: {
      Notepad,
      GmBd,
      IIcon
    }
  };
</script>

<style scoped lang="stylus">
  #linkgame
    width: 100%
    height: 100%
    display: flex
    overflow: auto
    .left_box
      flex: 1
      margin: 10px
      z-index: 0
      .result_list
        width: 100%
        height: 100%
        overflow-y: auto
        .result_item
          margin: 10px 0
          display: flex
          .icon
            display: inline-block
            width: 24px
            height: 24px
            border-radius: 50%
            border: 1px solid #6C9219
            color: #6C9219
            font-size: 16px
            line-height: 24px
            text-align: center
            margin-top: 16px
          .pair_wrap
            flex: 1
            margin-left: 5px
            overflow: hidden
            position: relative
            padding-right: 3px
            .half
              float: left
              width: 60px
              height: 60px
              &:nth-child(2)
                float: right
              img, .text
                width: 100%
                height: 100%
                background-color: #ffffff
                text-align: center
                border: 1px solid #885E17
                border-radius: 5px
            .cable
              position: absolute
              top: 50%
              left: 50%
              transform: translate(-50%, -50%)
    .right_box
      flex: 3
</style>

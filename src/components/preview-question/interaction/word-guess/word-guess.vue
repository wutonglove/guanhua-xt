<template>
  <div id="word_guess">
    <div class="left_box">
      <div class="nav_wrap">
        <ul class="nav_list">
          <li class="nav_item" v-for="(item,index) in guesslist" @click="changeIndex(index)">
            <a href="javascript:void(0)" :class="{active:curIndex===index}">
              <img class="icon" :src="item.resource.src" v-if="item.resource.type==='image'" alt=""/>
              <i-icon class="icon" type="ios-pulse-strong" :size="40" v-else-if="item.resource.type==='audio'"></i-icon>
              <i-icon class="icon" type="ios-film" v-else-if="item.resource.type==='video'"></i-icon>
              <span class="code_icon">{{index + 1}}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="guess_cnt">
        <div class="guess_item" v-for="(item,index) in guesslist" v-show="curIndex === index">
          <div class="resource_box">
            <img :src="item.resource.src"
                 class="resource"
                 :style="{transform:item.resource.cssStyle}"
                 v-if="item.resource.type==='image'"
                 alt=""/>
            <div class="audio" v-else-if="item.resource.type==='audio'">
              <i-icon type="ios-mic" :size="120"></i-icon>
              <audio :src="item.resource.src" controls>您的浏览器不支持audio</audio>
            </div>

            <video :src="item.resource.src" controls v-else-if="item.resource.type==='video'">您的浏览器不支持video</video>
          </div>
          <div class="hint_wrap" v-if="item.hint">
            提示：{{item.hint}}
          </div>
        </div>
      </div>
    </div>
    <div class="right_box">
      <div class="solve_wrap" v-for="(words,index) in wordslist" v-if="curIndex === index">
        <ul class="solve_box">
          <li class="solve_word"
              :class="{active:curSlecetI === i}"
              v-for="(item,i) in answers[index]"
              @click="changeSelectIndex(i)"
          >
            <word-btn class="btn" :key="i" v-if="item">{{item}}</word-btn>
          </li>
        </ul>
        <div class="solve_options">
          <div class="btn_wrap" v-for="(word,i) in words" @click="fillIn(i)" @touchend="fillIn(i)">
            <word-btn class="btn" :key="i">{{word}}</word-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {submitMixin} from 'common/js/mixin';
  import IIcon from 'iview/src/components/icon';

  import WordBtn from 'components/template1-part/word-btn/word-btn';

  import {CHINESE_CODE} from 'common/js/config';
  import {createRandomArr} from 'utils/utilities';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    data() {
      let answers = [];
      this.$nextTick(() => {
        this.guesslist.forEach((item) => {
          answers.push(new Array(item.answer.length).fill(''));
        });
      });

      return {
        curIndex: 0,
        wordslist: [],
        curSlecetI: 0,
        answers
      };
    },
    computed: {
      guesslist() {
        return this.questionData.guesslist;
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initWordsList();
      });
    },
    methods: {
      initWordsList() {
        let l = 32;
        let len = this.guesslist.length;
        let list = [];

        for (let i = 0; i < len; i++) {
          let arr = new Array(l).fill('');

          let rdm = createRandomArr(this.guesslist[i].answer.length, 0, l);
          rdm.forEach((item, index) => {
            arr[item] = this.guesslist[i].answer[index];
          });

          for (let _index = 0; _index < l; _index++) {
            let word = this.createRdmWord(this.guesslist[i].len);
            if (arr[_index] === '') {
              arr[_index] = word;
            }
          }
          list.push(arr);
        }
        this.wordslist = list;
      },
      fillIn(index) {
        this.answers[this.curIndex][this.curSlecetI] = this.wordslist[this.curIndex][index];

        this.curSlecetI = this.curSlecetI >= this.answers[this.curIndex].length - 1
          ? 0
          : this.curSlecetI + 1;
        this.$forceUpdate();
      },
      changeSelectIndex(index) {
        this.curSlecetI = index;
      },
      changeIndex(index) {
        this.curIndex = index;
        this.curSlecetI = 0;
      },
      createRdmWord(lan) {
        return lan === 'cn'
          ? String.fromCharCode(Math.round(Math.random() * (CHINESE_CODE[1] - CHINESE_CODE[0])) + CHINESE_CODE[0])
          : String.fromCharCode(Math.round(Math.random() * (122 - 97)) + 97);
      },
      getResult() {
        let res = '';
        for (let i = 0; i < this.answers.length; i++) {
          let _answer = this.answers[i].join('');
          if (this.guesslist[i].answer !== _answer && _answer !== '') return 0;
          res += _answer;
        }
        if (res === '') return -1;
        return 1;
      }
    },
    components: {
      IIcon,
      WordBtn
    }
  };
</script>

<style scoped lang="stylus">
  #word_guess
    width: 100%
    height: 100%
    display: flex
    padding: 10px
    .left_box
      flex: 3
      display: flex
      flex-direction: column
      .nav_wrap
        width: 100%
        flex: 0 0 57px
        text-align: center
        .nav_list
          padding: 6px
          border-radius: 8px
          background-color: rgba(0, 0, 0, .1)
          font-size: 0
          text-align: center
          display: inline-block
          .nav_item
            display: inline-block
            width: 45px
            height: 45px
            border: 2px solid transparent
            vertical-align: top
            a
              display: block
              width: 100%
              height: 100%
              color: #fff
              font-size: 16px
              position: relative
              background: radial-gradient(#7DACCE, #224498)
              border-radius: 5px
              opacity: 0.6
              .icon
                width: 100%
                height: 100%
                border-radius: 5px
                color: #90BEDC
              .code_icon
                position: absolute
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)
                width: 25px
                height: 25px
                line-height: 24px
                border-radius: 50%
                background-color: rgba(0, 0, 0, .6)
              &.active
                opacity: 1
                .code_icon
                  background-color: #F39602
              &:after
                content: ''
                position: absolute
                bottom: -13px
                left: 50%
                transform: translateX(-50%)
                border: 5px solid transparent
                border-top-color: #fff
      .guess_cnt
        width: 100%
        flex: 1
        margin-top: 10px
        background-color: #fff
        padding: 15px
        border-radius: 10px
        overflow: hidden
        .guess_item
          width: 100%
          height: 100%
          overflow-y: auto
        .resource_box
          .resource
            max-width: 100%
          .audio
            position: relative
            text-align: center
            height: 150px
            audio
              position: absolute
              bottom: 5px
              left: 50%
              transform: translateX(-50%)
          video
            width: 100%
        .hint_wrap
          margin-top: 10px
          font-size: 16px
          line-height: 20px
    .right_box
      flex: 4
      background-color: rgba(0, 0, 0, .1)
      border-radius: 10px
      margin-left: 10px
      padding: 15px 10px
      .solve_wrap
        width: 100%
        height: 100%
        .solve_box
          width: 100%
          text-align: center
          display: flex
          justify-content: center
          .solve_word
            flex: 1
            display: inline-block
            max-width: 40px
            border: 2px solid #D4A360
            border-radius: 10px
            background-color: #A9742E
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, .4) inset
            position: relative
            .btn
              position: absolute
              top: 0
              left: 0
              width: 100%
            &:after
              content: ''
              display: block
              padding-top: 100%
            &.active
              border-color: #FFD43E
        .solve_options
          margin-top: 20px
          .btn_wrap
            display: inline-block
            margin: 3px
</style>

<template>
  <div class="spelling_wrap">
    <div class="poem_title">
      <span class="text" ref="poemTitle">{{poemTitle}}</span>
    </div>
    <div class="poem_content">
      <div class="poem_wrap" ref="poemWrap">
        <ul class="poem_list" ref="poemList">
          <li class="poem_word_box"
              @click="clickHandle(index)"
              ref="poem"
              v-for="(word,index) in poem">
            <span class="poem_start" v-if="index===0">开始</span>
            <span class="poem_word">{{word.text}}</span>
            <transition-group name="fade" class="word_annulus ">
              <span key="anls1" class="annulus_g" v-show="word.anlsState === 'g'"></span>
              <span key="anls2" class="annulus_r" v-show="word.anlsState === 'r'"></span>
            </transition-group>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {submitMixin} from 'common/js/mixin';
  import titleBG from './poem_title_bg.png';

  class PoemWord {
    constructor(text = '') {
      this.text = text;
      this.anlsState = 'n'; // n 没有环，g 灰，r 红
    }
  }

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    },
    data() {
      return {
        poemR: 0,
        poemC: 0,
        oriPoem: [],
        poem: [],
        curIndex: 0
      };
    },
    mounted() {
      this.initOriPoem();
      this.initRC();
//      console.log(this.poemR, this.poemC);
      this.regroupPoem();
      this.$nextTick(() => {
        this.$refs.poemTitle.style.backgroundImage = `url(${titleBG})`;
//        this.initPoemWrap();
      });
      /*
       *  测试
       * */
      this.createMatrix();
    },
    computed: {
      poemTitle() {
        return this.questionData.poem.title;
      }
    },
    methods: {
      clickHandle(index) {
        this.changeAnlsState(index);
      },
      changeAnlsState(index) {
        let state = 'n';
        state = this.curIndex === index ? 'r' : 'g';
        this.poem[index].anlsState = state;
        setTimeout(() => {
          this.poem[index].anlsState = 'n';
        }, 500);
      },
      createMatrix() {
        let matrix = [];
        let maxR = 7;
        let maxC = 7;
        for (let r = 0; r < maxR; r++) {
          matrix.push([]);
          for (let c = 0; c < maxC; c++) {
            matrix[r].push(-1);
          }
        }

        let curR = 0;
        let curC = 4;
        let l = maxR * maxC;
        for (let num = 0; num < l; num++) {
          matrix[curR][curC] = num;
//          let nextR;
//          let nextC;
          let obj;

//          // 上
//          nextR = curR - 1;
//          nextC = curC;
//          if (matrix[nextR] && matrix[nextR][nextC] === -1) {
//            if (matrix[nextR - 1] && matrix[nextR - 1][nextC] === -1) {
//              curR = nextR;
//              curC = nextC;
//              continue;
//            } else {
//              // || (!matrix[nextR - 1] || (matrix[nextR - 1][nextC + 1] < 0 || matrix[nextR - 1][nextC - 1] < 0))
//              if (((matrix[nextR][nextC - 1] !== -1) || (matrix[nextR][nextC + 1] !== -1))) {
//                curR = nextR;
//                curC = nextC;
//                continue;
//              }
//            }
//          }
//
//          // you
//          nextR = curR;
//          nextC = curC + 1;
//          if (matrix[nextR] && matrix[nextR][nextC] === -1) {
//            if (matrix[nextR][nextC + 1] === -1) {
//              curR = nextR;
//              curC = nextC;
//              continue;
//            } else {
//              if ((!matrix[nextR - 1] || matrix[nextR - 1][nextC] !== -1) || (!matrix[nextR + 1] || matrix[nextR + 1][nextC] !== -1)) {
//                curR = nextR;
//                curC = nextC;
//                continue;
//              }
//            }
//          }
//
//          // zuo
//          nextR = curR;
//          nextC = curC - 1;
//          if (matrix[nextR][nextC] === -1) {
//            if (matrix[nextR][nextC - 1] === -1) {
//              curR = nextR;
//              curC = nextC;
//              continue;
//            } else {
//              if ((!matrix[nextR - 1] || matrix[nextR - 1][nextC] !== -1) || (!matrix[nextR + 1] || matrix[nextR + 1][nextC] !== -1)) {
//                curR = nextR;
//                curC = nextC;
//                continue;
//              }
//            }
//          }
//
//          // xia
//          nextR = curR + 1;
//          nextC = curC;
//          if (matrix[nextR] && matrix[nextR][nextC] === -1) {
//            if (matrix[nextR + 1] && matrix[nextR + 1][nextC] === -1) {
//              curR = nextR;
//              curC = nextC;
//              continue;
//            } else {
//              if ((!matrix[nextR][nextC - 1] !== -1) || (matrix[nextR][nextC + 1] !== -1)) {
//                curR = nextR;
//                curC = nextC;
//                continue;
//              }
//            }
//          }
          // 随机
          let rn = parseInt(Math.random() * 4, 10);
          switch (rn) {
            case 0: // shang
              break;
          }
          obj = this.toBottom(matrix, curR, curC);
          let ori = '';
          if (obj) {
            // 随机左右
            if (obj === 'lr') {
              ori = Math.random() < 0.5 ? 'r' : 'l';
            } else {
              curC = obj.curC;
              curR = obj.curR;
              continue;
            }
          }
          if (ori === '' || ori === 'r') {
            obj = this.toRight(matrix, curR, curC);
            if (obj) {
              curC = obj.curC;
              curR = obj.curR;
              continue;
            }
          }
          if (ori === '' || ori === 'l') {
            obj = this.toLeft(matrix, curR, curC);
            if (obj) {
              curC = obj.curC;
              curR = obj.curR;
              continue;
            }
          }
          obj = this.toTop(matrix, curR, curC);
          if (obj) {
            if (obj === 'lr') {
              ori = Math.random() < 0.5 ? 'r' : 'l';
            } else {
              curC = obj.curC;
              curR = obj.curR;
              continue;
            }
          }
        }
//        console.log(matrix);
      },
      toTop(matrix, curR, curC) {
        let nextR = curR - 1;
        let nextC = curC;
        if (matrix[nextR] && matrix[nextR][nextC] === -1) {
          if (matrix[nextR - 1] && matrix[nextR - 1][nextC] === -1) {
            return {
              curR: nextR,
              curC: nextC
            };
          } else {
            if ((matrix[nextR][nextC - 1] !== -1) || (matrix[nextR][nextC + 1] !== -1)) {
              curR = nextR;
              curC = nextC;
              return {
                curR: nextR,
                curC: nextC
              };
            } else {
              return 'lr';
            }
          }
        }
        return null;
      },
      toRight(matrix, curR, curC) {
        let nextR = curR;
        let nextC = curC + 1;
        if (matrix[nextR] && matrix[nextR][nextC] === -1) {
          if (matrix[nextR][nextC + 1] === -1) {
            return {
              curR: nextR,
              curC: nextC
            };
          } else {
            if ((!matrix[nextR - 1] || matrix[nextR - 1][nextC] !== -1) || (!matrix[nextR + 1] || matrix[nextR + 1][nextC] !== -1)) {
              return {
                curR: nextR,
                curC: nextC
              };
            }
          }
        }
        return null;
      },
      toLeft(matrix, curR, curC) {
        let nextR = curR;
        let nextC = curC - 1;
        if (matrix[nextR][nextC] === -1) {
          if (matrix[nextR][nextC - 1] === -1) {
            return {
              curR: nextR,
              curC: nextC
            };
          } else {
            if ((!matrix[nextR - 1] || matrix[nextR - 1][nextC] !== -1) || (!matrix[nextR + 1] || matrix[nextR + 1][nextC] !== -1)) {
              return {
                curR: nextR,
                curC: nextC
              };
            }
          }
        }
        return null;
      },
      toBottom(matrix, curR, curC) {
        let nextR = curR + 1;
        let nextC = curC;
        if (matrix[nextR] && matrix[nextR][nextC] === -1) {
          if (matrix[nextR + 1] && matrix[nextR + 1][nextC] === -1) {
            return {
              curR: nextR,
              curC: nextC
            };
          } else {
            if ((matrix[nextR][nextC - 1] !== -1) || (matrix[nextR][nextC + 1] !== -1)) {
              return {
                curR: nextR,
                curC: nextC
              };
            } else {
              return 'lr';
            }
          }
        }
        return null;
      },
      regroupPoem() {

      },
      matrixRule(arr) {
        let oriArr = [];
        for (let i = 0; i < 20; i++) {
          oriArr.push(i);
        }
//        console.log(arr);
//        console.log(oriArr);
        let curR, curC;
        let index = 0;
        for (let r = 0; r < arr.length; r++) {
          for (let c = 0; c < arr[r].length; c++) {
            if (arr[r][c] === oriArr[0]) {
              curR = r;
              curC = c;
            }
          }
        }
//        console.log('r', curR, 'c', curC);
        while (arr[curR][curC] !== oriArr[oriArr.length - 1]) {
          console.log('rc', arr[curR][curC]);
          if (arr[curR][curC - 1] === oriArr[index + 1]) {
            index++;
            curC--;
          } else if (arr[curR][curC + 1] === oriArr[index + 1]) {
            index++;
            curC++;
          } else if (curR - 1 >= 0 && arr[curR - 1][curC] === oriArr[index + 1]) {
            index++;
            curR--;
          } else if (curR + 1 < 4 && arr[curR + 1][curC] === oriArr[index + 1]) {
            index++;
            curR++;
          } else {
            return false;
          }
        }
        return true;
      },
      initOriPoem() {
        let arr = [];
        let poem = '';
        this.questionData.poem.verses.forEach((item) => {
          poem += item.text;
        });
        poem.split('').forEach((item) => {
          arr.push(new PoemWord(item));
        });
        this.oriPoem = arr;
      },
      initRC() {
        let l = this.oriPoem.length;
        for (let r = 4; r <= 10; r++) {
          for (let c = 5; c <= 10; c++) {
            if (l <= r * c) {
              this.poemR = r;
              this.poemC = c;
              return;
            }
          }
        }
      },
      initPoemWrap() {
        let ht = Math.max(this.poemR * 28.7, 196);
        let wt = Math.max(this.poemC * 60, 456);
        this.$refs.poemList.style.height = `${ht}px`;
        this.$refs.poemList.style.width = `${wt}px`;
        let h = ht / this.poemR;
        let w = wt / this.poemC;
        this.$refs.poem.forEach((item) => {
          item.style.width = `${w}px`;
          item.style.height = `${h}px`;
          item.style.lineHeight = `${h}px`;
        });
      }
    }
  };

</script>

<style scoped lang="stylus">
  .spelling_wrap
    width: 100%
    height: 100%
    background: url('/static/images/poem_bg.jpg')
    background-size: 100% 100%
    text-align: center
    .poem_title
      width: 100%
      padding-top: 10px
      .text
        display: inline-block
        min-width: 200px
        padding: 0 20px
        height: 36px
        line-height: 36px
        font-size: 18px
        color: #F0CDB1
        font-weight: 800
        border: 1px solid #B8624B
        box-shadow: 0 0 0 1px #F7EDEB
        background-size: 90% 98%
        background-repeat: no-repeat
        background-position: center
        background-color: #F7EDEB
    .poem_content
      width: 670px
      height: 329px
      margin: 20px auto
      background-color: rgba(255, 255, 255, .5)
      border: 1px solid #D0C0A9
      padding: 20px
      display: flex
      .poem_wrap
        flex: 1
        border: 1px solid #D0C0A9
        position: relative
        .poem_list
          position: absolute
          left: 50%
          top: 50%
          transform: translate(-50%, -50%)
          margin: 0 auto
          .poem_word_box
            display: inline-block
            text-align: center
            position: relative
            .poem_start
              position: absolute
              left: -22px
              top: 50%
              transform: translateY(-50%)
              font-size: 12px
              background: url('/static/images/poem_start_bg.png') no-repeat
              background-size: 100% 100%
              width: 42px
              height: 20px
              line-height: 18px
              color: #C6B296
            .poem_word
              font-size: 20px
              color: #424345
            .word_annulus
              position: absolute
              left: 50%
              top: 50%
              transform: translate(-50%, -50%)
              width: 100%
              height: 100%
              .annulus_g, .annulus_r
                display: block
                width: 100%
                height: 100%
                background-size: contain
                background-repeat: no-repeat
                background-position: center
                &.annulus_g
                  background-image: url('/static/images/poem_word_bd_g.png')
                &.annulus_r
                  background-image: url('/static/images/poem_word_bd_r.png')
    .fade-enter-active, .fade-leave-active
      transition: opacity .5s
    .fade-enter, .fade-leave-active
      opacity: 0
</style>

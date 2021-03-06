<template>
  <div class="linkgame_bd">
    <table class="game" cellspacing="5px">
      <tr :key="row" v-for="(cols, row) in cellData">
        <cell :key="col"
              v-for="(cell, col) in cols"
              :isSelected="cell.isSelected"
              :isLine="cell.isLine"
              :lineClass="cell.lineClass"
              :isBlank="cell.isBlank"
              :className="cell.className"
              :desc="cell.desc"
              :isShow="isShow"
              @click="cellClick(row, col)"
        >
        </cell>
      </tr>
    </table>
  </div>
</template>
<script>
  import cell from 'components/template1-part/link-game-cell/link-game-cell';
  import {dyadicArrayWrap, arrayToDyadic} from 'utils/utilities';

  export default {
    components: {
      cell
    },
    props: {
      pairs: {
        type: Array
      },
      isShow: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        cellData: [], //  地图数据数组
        currentSelect: null, // 当前选中的方块
        // 配置信息
        config: {
          col: 6,
          row: 4,
          lineDelay: 500
        }
      };
    },
    mounted() {
      this.init();
    },
    computed: {
      data() {
        let arr = [];
        this.pairs.forEach((item, index) => {
          let name = String.fromCharCode(97 + index);
          item.forEach((half, i) => {
            arr.push({
              name,
              desc: half
            });
          });
        });
        return arr;
      }
    },
    methods: {
      init() {
        console.time('initData');
        this.cellData = this.initData();
        this.$forceUpdate();
        console.timeEnd('initData');
      },
      // 初始化数据
      initData() {
        // classNames => ['a','b','c','d'] 每个元素代表一个方块的className
        // 生成一个方块的数组，将className放到其中
        let cellGroup = this.data.map(e => {
          return {
            isBlank: false, // 是否空白方块
            className: e.name, // 方块的className
            desc: e.desc,
            lineClass: '', // 连接线的className
            isLine: false, // 是否显示连接线
            isSelected: false
          };
        });

        // 空白方块
        let blankCell = {
          isBlank: true,
          className: '',
          lineClass: '',
          isLine: false,
          isSelected: false
        };

        // 再根据配置中的行和列随机填充一个地图数据
        let l = this.config.row * this.config.col;
        let cellData = new Array(l);
        for (let i = 0; i < l; i++) {
          cellData[i] = Object.assign({}, blankCell);
        }

        for (let n = 0; n < cellGroup.length; n++) {
          let rn = ~~(Math.random() * l);
          if (cellData[rn].isBlank) {
            cellData[rn] = Object.assign({}, cellGroup[n]);
          } else {
            n--;
          }
        }

        // 将数据根据行的大小转为二维数组，然后外部包裹一层空白节点
        let result = dyadicArrayWrap(arrayToDyadic(cellData, this.config.col), blankCell);

        // 最后把行和列的坐标设置到节点上
        result.forEach((cols, row) => {
          cols.forEach((cell, col) => {
            cell.row = row;
            cell.col = col;
          });
        });
        return result;
      },
      // 点击事件代理
      cellClick (r, c) {
        let currentCell = this.cellData[r][c];
        if (currentCell.isBlank === true) return;

        this.selectCell(currentCell);
        this.$forceUpdate();
      },
      // 选择方块
      selectCell (currCell) {
        currCell.isSelected = true;
        if (!this.currentSelect) {
          // 如果没有选中任何方块那么就直接设置选中
          currCell.isSelected = true;
          this.currentSelect = currCell;
          return;
        }
        if (this.currentSelect === currCell) {
          // 如果点击的方块和已选中方块是同一个，那么就取消这个方块的选中状态
          currCell.isSelected = false;
          this.currentSelect = null;
          return;
        }

        let prevCell = this.currentSelect;
        // 通过className来判断前后两个方块的图片是否相同
        if (prevCell.className !== currCell.className) {
          // 如果两个方块的className不同，那么将点击的方块设置为选中状态
          prevCell.isSelected = false;
          currCell.isSelected = true;
          this.currentSelect = currCell;
          return;
        }

        // 获取两个方块的连接线路径数组
        console.time('getLine');
        let result = this.getLine(prevCell, currCell);
        console.timeEnd('getLine');

        if (result.length === 0) {
          // 如果没有获取到连接线，说明两个方块无法连接，那么将点击的方块设置为选中状态
          prevCell.isSelected = false;
          currCell.isSelected = true;
          this.currentSelect = currCell;
        } else {
          // 如果获取到连接线
          // 先绘制连接线
          currCell.isSelected = true;
          this.drawLine(result)
            .then(() => {
              // 再那么将两个方块设置为空白方块
              let index = prevCell.className.charCodeAt(0) - 97;
              this.$emit('eliminate', index); // 消除事件
              prevCell.isBlank = true;
              currCell.isBlank = true;
              prevCell.className = '';
              currCell.className = '';
              prevCell.isSelected = false;
              currCell.isSelected = false;

              this.currentSelect = null;
            });
        }
      },
      drawLine (line) {
        // 遍历线上的节点
        line.forEach((e, i) => {
          e.isLine = true;
          // 通过节点的上一个与下一个节点来计算lineClass
          e.lineClass = this.addLineClass(line[i - 1], e, line[i + 1]);
        });

        // 根据设置中的延迟来隐藏连接线
        return new Promise((resolve) => {
          setTimeout(() => {
            this.hideLine(line);
            resolve();
          }, this.config.lineDelay);
        });
      },
      // 清空线上的所有连接线
      hideLine (line) {
        line.forEach((e, i) => {
          e.isLine = false;
          e.lineClass = '';
        });
      },
      addLineClass (prev, curr, next) {
        let result;
        if (!prev) {
          // 开始节点
          result = 'line-start line-' + this.getDirection(curr, next);
        } else if (!next) {
          // 结束节点
          result = 'line-end line-' + this.getDirection(curr, prev);
        } else {
          result = 'line-' + this.getDirection(curr, prev) + ' line-' + this.getDirection(curr, next);
        }
        return 'line ' + result;
      },
      // 判断两个相邻节点的方向
      getDirection (curr, next) {
        return curr.row === next.row ? (curr.col > next.col ? 'l' : 'r') : (curr.row > next.row ? 't' : 'b');
      },
      getLine (prev, curr) {
        // 连接线数组
        let result = [];

        // 一条直线连通的情况
        // 分别获取上一个选中方块的X轴与Y轴上的可连接线，这里getHorizontalLine与getVerticalLine返回的均为一个Set对象，使用has来快速高效地判断在可连接线上是否包含某个方块
        let prevH = this.getHorizontalLine(prev);
        if (prevH.has(curr)) return this.getBeeline(prev, curr);
        let prevV = this.getVerticalLine(prev);
        if (prevV.has(curr)) return this.getBeeline(prev, curr);

        // 如果直线连通失败了，那么获取另一个方块的可连接线
        let currH = this.getHorizontalLine(curr);
        let currV = this.getVerticalLine(curr);

        // 做一个快速判断，如果其中一个方块在X轴和Y轴上的可连接线长度都为0，那么返回空数组
        if ((!prevH.size && !prevV.size) || (!currH.size && !currV.size)) return result;

        // 一个拐角可以连通的情况
        // 分别对X轴和Y轴上的可连接线做一个交点判断
        let intersection = this.getIntersection(prevH, currV) || this.getIntersection(prevV, currH);
        // 如果获取到交点，那么返回连接路径
        // 上一个选中 => 第一个拐角 => 当前选中
        if (intersection) return this.getBeeline(prev, intersection).concat(this.getBeeline(intersection, curr).slice(1));

        // 最后处理两个拐角的情况
        let intersectionArr = this.getIntersectionArr(prevH, currH, prev.row, curr.row, true);
        if (intersectionArr.length === 0) {
          intersectionArr = this.getIntersectionArr(prevV, currV, prev.col, curr.col, false);
        }

        // 如果getIntersectionArr成功，返回一个包含两个拐角方块的数组
        // 依次根据 上一个选中 => 第一个拐角 => 第二个拐角 => 当前选中 绘制连接线
        if (intersectionArr.length > 0) {
          result = this.getBeeline(prev, intersectionArr[0]).concat(this.getBeeline(intersectionArr[0], intersectionArr[1]).slice(1)).concat(this.getBeeline(intersectionArr[1], curr).slice(1));
        }

        return result;
      },
      // 处理一个拐角的情况，传入两条相垂直的可连接线，然后查找其中一条线是否包含另一条线上的某个空节点
      getIntersection (prevLine, currLine) {
        let intersection = null;
        for (let cell of prevLine) {
          if (currLine.has(cell) && cell.isBlank) {
            intersection = cell;
            break;
          }
        }
        return intersection;
      },
      // 处理两个拐角的情况，将两个方块同一方向的可连接线传入，然后查找是否存在一条垂直线能够连通
      getIntersectionArr (prev, curr, prevIndex, currIndex, isRow) {
        let result = [];
        if (!prev.size || !curr.size) {
          return result;
        }
        // 判断方向并从地图数据中获取完整的线
        let rowKey = isRow ? 'col' : 'row';
        let prevFullLine = isRow ? this.cellData[prevIndex] : this.cellData.map(e => e[prevIndex]);
        let currFullLine = isRow ? this.cellData[currIndex] : this.cellData.map(e => e[currIndex]);

        // 遍历其中一条线
        for (let prevCell of prev) {
          if (!prevCell.isBlank) continue;

          /*
           *  target 和 prevCell 是两条平行线上的一条垂线的两个端点
           *         prevCell
           *  ----------•------------ prevFullLine
           *            ┊
           *            ┊
           *  ----------•------------ currFullLine
           *          target
           */
          let target = currFullLine[prevCell[rowKey]];

          // 判断target是否在可连接线中
          if (curr.has(target)) {
            let index = target[rowKey];
            // 然后检查这条垂线是否是连通的
            let isBeeline = this.checkBeeline(prevFullLine[index], currFullLine[index]);
            if (isBeeline) {
              // 返回两个端点
              result = [prevFullLine[index], currFullLine[index]];
              break;
            }
          }
        }
        return result;
      },
      // 检查两个点是否连通的
      checkBeeline (start, end) {
        let result = true;
        // 先获取这两个点的连线
        let beeline = this.getBeeline(start, end);
        for (let lineCell of beeline) {
          // 然后检查线上是否存在非空节点，如果存在非空节点说明这两点之间是无法连通的
          if (!lineCell.isBlank) {
            result = false;
            break;
          }
        }
        return result;
      },
      // 获得从 start 到 end 的直线路径数组
      getBeeline (start, end) {
        let startIndex;
        let endIndex;
        let arr;
        if (start.row === end.row) {
          startIndex = start.col;
          endIndex = end.col;
          arr = this.cellData[start.row];
        } else {
          startIndex = start.row;
          endIndex = end.row;
          arr = this.cellData.map(e => e[start.col]);
        }

        // 判断一下直线的方向，如果是反方向那么将数组reverse
        return startIndex < endIndex ? arr.slice(startIndex, endIndex + 1) : arr.slice(endIndex, startIndex + 1).reverse();
      },
      // X轴
      getHorizontalLine (curr) {
        return this.checkCell(this.cellData[curr.row], curr.col);
      },
      // Y轴
      getVerticalLine (curr) {
        return this.checkCell(this.cellData.map(e => e[curr.col]), curr.row);
      },
      // 查找，通过一个数组与需要要查找的数组下标来计算
      checkCell (arr, index) {
        let set = new Set();
        // 向后查找
        for (let i = index - 1; i >= 0; i--) {
          let cell = arr[i];
          // 判断className相同或者是空白方块
          if (cell.className === arr[index].className || cell.isBlank) {
            set.add(cell);
          }
          // 如果不是空白方块那么终止查找
          if (!cell.isBlank) {
            break;
          }
        }
        // 向前查找
        for (let i = index + 1, l = arr.length; i < l; i++) {
          let cell = arr[i];
          if (cell.className === arr[index].className || cell.isBlank) {
            set.add(cell);
          }
          if (!cell.isBlank) {
            break;
          }
        }
        return set;
      }
    }
  };
</script>

<style>
  .linkgame_bd {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .game {
    margin: 0 auto;
    border-spacing: 0;
    border-collapse: separate;
    user-select: none;
    text-align: center;
    border-spacing: 2px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }

  /* theme linkgame_bd line */
  .linkgame_bd .line {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .linkgame_bd .line:before, .linkgame_bd .line:after {
    content: '';
    display: block;
    position: absolute;
    background-color: red;
  }

  .linkgame_bd .line.line-l:before, .linkgame_bd .line.line-r:before {
    width: calc(50% + 4px);
    height: 4px;
    top: 50%;
    right: 50%;
    margin-top: -2px;
  }

  .linkgame_bd .line.line-r:before {
    right: -4px;
  }

  .linkgame_bd .line.line-l.line-r:before {
    width: calc(100% + 8px);
    left: -4px;
    right: -4px;
  }

  .linkgame_bd .line.line-t:after, .linkgame_bd .line.line-b:after {
    width: 4px;
    height: calc(50% + 4px);
    left: 50%;
    bottom: 50%;
    margin-left: -2px;
  }

  .linkgame_bd .line.line-b:after {
    bottom: -4px;
  }

  .linkgame_bd .line.line-t.line-b:after {
    height: calc(100% + 8px);
    top: -4px;
    bottom: -4px;
  }

  .linkgame_bd .line.line-t.line-r:before, .linkgame_bd .line.line-b.line-r:before {
    width: calc(50% + 6px);
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .linkgame_bd .line.line-t.line-l:before, .linkgame_bd .line.line-b.line-l:before {
    width: calc(50% + 6px);
    margin-right: -2px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .linkgame_bd .line.line-start.line-l:before, .linkgame_bd .line.line-start.line-r:before, .linkgame_bd .line.line-end.line-l:before, .linkgame_bd .line.line-end.line-r:before {
    width: calc(20% + 4px);
    right: 80%;
  }

  .linkgame_bd .line.line-start.line-r:before, .linkgame_bd .line.line-end.line-r:before {
    left: 80%;
  }

  .linkgame_bd .line.line-start.line-l:after, .linkgame_bd .line.line-start.line-r:after, .linkgame_bd .line.line-end.line-l:after, .linkgame_bd .line.line-end.line-r:after {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    right: 80%;
    top: 50%;
    margin-top: -5px;
    margin-right: -5px;
  }

  .linkgame_bd .line.line-start.line-r:after, .linkgame_bd .line.line-end.line-r:after {
    margin-left: -5px;
    left: 80%;
  }

  .linkgame_bd .line.line-start.line-t:after, .linkgame_bd .line.line-start.line-b:after, .linkgame_bd .line.line-end.line-t:after, .linkgame_bd .line.line-end.line-b:after {
    height: calc(20% + 4px);
    bottom: 80%;
  }

  .linkgame_bd .line.line-start.line-b:after, .linkgame_bd .line.line-end.line-b:after {
    top: 80%;
  }

  .linkgame_bd .line.line-start.line-t:before, .linkgame_bd .line.line-start.line-b:before, .linkgame_bd .line.line-end.line-t:before, .linkgame_bd .line.line-end.line-b:before {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    bottom: 80%;
    left: 50%;
    margin-left: -5px;
    margin-bottom: -5px;
  }

  .linkgame_bd .line.line-start.line-b:before, .linkgame_bd .line.line-end.line-b:before {
    margin-top: -5px;
    top: 80%;
  }
</style>

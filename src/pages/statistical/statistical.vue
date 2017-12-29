<template>
  <div class="statistical">
    <i-menu theme="dark" active-name="1" class="menu_list">
      <i-menuItem name="1">学生统计系统</i-menuItem>
    </i-menu>
    <div class="content">
      <div class="seat_wrap">
        <div class="seat_row" v-for="row in seats">
          <div class="seat_alone"
               :class="{
                  off: !stu.status,
                  on: stu.status,
                  err: stu.result===0,
                  correct: stu.result===1
                }"
               v-for="stu in row"
          >
            <div class="avatar"></div>
            <div class="name">{{stu.name === '' && !stu.status ? '未登录' : stu.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="v_line"></div>
    <div class="chart_wrap">
      <stat-chart v-show="pieStatus" :data="staRes" ref="chart"></stat-chart>
    </div>
  </div>
</template>

<script>
  import IIcon from 'iview/src/components/icon';
  import IMenu from 'iview/src/components/menu';
  import IMenuItem from 'iview/src/components/menu/menu-item';
  import {urlSearch} from 'utils/utilities';

  // 导入chart组件
  import StatChart from 'components/stat-chart/stat-chart';

  window.data = [];

  export default {
    data() {
      return {
        students: []
      };
    },
    mounted() {
      let params = urlSearch();
      this.tr = params.tr || 5;
      this.td = params.td || 6;
      this.init();
      window.refresh = this.upData;
    },
    computed: {
      seats() {
        let arr = [];
        if (!this.students) return [];
        this.students.forEach((item, index) => {
          if (index % this.td === 0) {
            arr.push([item]);
          } else {
            let td = parseInt(index / this.td);
            arr[td].push(item);
          }
        });
        return arr;
      },
      staRes() {
        let arr = [
          {
            name: '正确',
            y: 0,
            color: '#86F087',
            sliced: true,
            selected: true
          },
          {
            name: '错误',
            y: 0,
            color: '#FF4744'
          },
          {
            name: '未作答',
            y: 0,
            color: '#999'
          }
        ];
        this.students.forEach((item, index) => {
          switch (item.result) {
            case 1:
              arr[0].y++;
              break;
            case 0:
              arr[1].y++;
              break;
            case -1:
              arr[2].y++;
              break;
          }
        });
        return arr;
      },
      pieStatus() {
        let n = 0;
        for (let i = 0; i < this.staRes.length; i++) {
          n += this.staRes[i].y;
        }
        return Boolean(n);
      }
    },
    methods: {
      init() {
        this.initData();
      },
      initData() {
        this.students = new Array(this.tr * this.td).fill({});
        this.students.forEach((item, index) => {
          this.students[index] = {
            code: index,
            name: '',
            status: 0
          };
        });
      },
      upData() {
        let data = window.data;
        data.forEach((item, index) => {
          let code = this.students.findIndex((stu) => {
            return stu.code === item.code;
          });
          this.$set(this.students, code, item);
        });
      }
    },
    components: {
      IIcon,
      IMenu,
      IMenuItem,
      StatChart
    }
  };
</script>

<style lang="stylus">
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px
  }

  ::-webkit-scrollbar-track {
    background-color: #bee1eb;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #00aff0;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #9c3
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: #00aff0
  }

  .statistical
    width: 100%
    height: 100%
    border-top: 3px solid #494F5F
    display: flex
    .menu_list
      flex: 0 0 140px
      height: 100%
      padding-top: 30px
    .content
      flex: 1
      padding: 0 10px
      margin-top: 15px
      overflow: auto
      .seat_wrap
        display: inline-block
        min-width: 100%
        .seat_row
          display: flex
          justify-content: center
          margin-bottom: 5px
          .seat_alone
            flex: 1
            max-width: 120px
            min-width: 40px
            margin: 0 10px
            .avatar
              width: 100%
              padding-top: 100%
              background-repeat: no-repeat
              background-position: center
              background-size: 100%
              position: relative
              &:after
                content: ''
                width: 100%
                height: 100%
                display: block
                position: absolute
                top: 0
                left: 0
                border: 3px solid transparent
                border-radius: 50%
                z-index: 1
            &.off
              .avatar
                background-image: url('/static/images/off-line.png')
            &.on
              .avatar
                background-image: url('/static/images/on-line.png')
            &.err
              .avatar
                &:after
                  border-color: #FF4744
            &.correct
              .avatar
                &:after
                  border-color: #0FBC7D
            .name
              width: 100%
              font-size: 13px
              height: 30px
              line-height: 30px
              text-align: center
    .v_line
      flex: 0 0 4px
      height: 200px
      border-radius: 2px
      background-color: #C5C3C3
      margin-top: 13px
    .chart_wrap
      flex: 0 0 250px
      min-width: 230px
      margin-top: 15px
</style>

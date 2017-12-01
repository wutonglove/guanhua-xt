<template>
  <div class='outer_net'>
    <div class="content">
      <div class="search_wrap">
        <i-input v-model="keyword" placeholder="请输入搜索关键字" style="width: 260px;margin-right:20px"
                 icon="search" @on-keyup.enter="search"></i-input>
        <i-button type="primary" shape="circle" icon="ios-search" @click="search">搜索</i-button>
      </div>
      <div class="content_wrap">
        <div class="load_wrap" v-show="!imgList[curPage - 1] || imgList[curPage - 1].length === 0">
          <div class="loading">
            <i-spin size="large" class="spin"></i-spin>
            <span class="text">正在加载...</span>
          </div>
        </div>
        <div class="img_list_wrap">
          <div class="img_wrap"
               :class="{'selected':img.selected}"
               v-for="img in imgList[curPage-1]"
               @click="selectFile(img)"
          >
            <div class="thumbnail">
              <img :src="img.thumbURL" :title="img.name">
            </div>
            <div class="name" v-html="img.name"></div>
            <div class="size">{{img.size}}</div>
            <i-icon type="checkmark-circled" class="check_icon"></i-icon>
            <i-icon class="unfold" type="arrow-expand" @click.native="unfold(img)"></i-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <i-page class-name="page_ctrl" :total="reqData.listNum*1" :pageSize="24" @on-change="linkPage"
              :current="curPage"></i-page>
      <button type="button" class="btn_insert" @click="ok">插入</button>
    </div>
  </div>
</template>

<script>
  import ISpin from 'iview/src/components/spin';
  import IIcon from 'iview/src/components/icon';
  import IPage from 'iview/src/components/page';
  import IInput from 'iview/src/components/input';
  import IButton from 'iview/src/components/button';

  import {IAmage} from 'common/js/fileObject';

  import {mapMutations} from 'vuex';

  import searchBD from 'api/getBaiduSearch';

  export default {
    mounted() {
      this.$nextTick(() => {
        this._search(0, 48);
        this.curPage = 1;
      });
    },
    data() {
      return {
        reqData: {},
        imgList: [],
        curPage: 1,
        keyword: '数学'
      };
    },
    methods: {
      addImgList: function () {
        this.reqData.data.forEach((item, index) => {
          if (index === this.reqData.data.length - 1) return;
          let OutIndex = Math.floor((index / 24)) + this.curPage - 1;
          if (index % 24 === 0) {
            this.$set(this.imgList, OutIndex, []);
          }
          this.imgList[OutIndex].push({
            thumbURL: item.thumbURL,
            objURL: item.middleURL,
            suffix: item.type,
            type: 'image',
            name: item.fromPageTitleEnc,
            size: `${item.width} * ${item.height}`,
            selected: false
          });
        });
      },
      selectFile: function (file) {
        this.clearSelectFile();
        file.selected = true;
        this.setSlctFile(file);
      },
      clearSelectFile() {
        this.imgList.forEach((item, index) => {
          item.forEach((img, i) => {
            img.selected = false;
          });
        });
      },
      linkPage: function (current) {
        this.curPage = current;
      },
      _search: function (pn, rn) {
        searchBD(this.keyword, pn, rn)
          .then((res) => {
            this.reqData = res;
            this.addImgList();
          });
      },
      search() {
        this._search(0, 48);
        this.curPage = 1;
      },
      ok() {
        this.$emit('ok');
      },
      unfold: function (file) {
        this.$emit('unfold', file);
      },
      ...mapMutations({
        setSlctFile: 'SET_SELECTEDFILE'
      })
    },
    watch: {
      curPage(newPage) {
        if (this.imgList[this.newPage - 1] && this.imgList[this.newPage - 1].length > 0) return;
        this._search((newPage - 1) * 24, 24);
      }
    },
    components: {
      ISpin,
      IIcon,
      IPage,
      IInput,
      IButton,
      IAmage
    }
  };
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
  .outer_net
    height: 100%
    width: 100%
    background-color: $background-fileDialog-ctx
    position: relative
    .content
      position: absolute
      top: 0
      bottom: 80px
      width: 100%
      .search_wrap
        position: absolute
        right: 40px
        top: 5px
      .content_wrap
        position: absolute
        top: 40px
        bottom: 0
        width: 100%
        overflow: auto
        .load_wrap
          width: 100%
          height: 100%
          position: relative
          text-align: center
          .loading
            position: absolute
            left: 0
            top: 0
            bottom: 0
            right: 0
            margin: auto
            width: 120px
            height: 32px
            line-height: 32px
            overflow: hidden
            .spin
              float: left
            .text
              margin-left: 10px
              float: left
              font-size: 14px
              color: $font-color-blue
        .img_list_wrap
          padding-left: 15px
          .img_wrap
            display: inline-block
            position: relative
            margin: 15px
            width: 180px
            font-size: 0
            .thumbnail
              width: 100%
              height: 135px
              padding: 5px
              overflow: hidden
              box-sizing: border-box
              border: 2px solid #fff
              background-color: #cccccc
              position: relative
              img
                max-width: 100%
                max-height: 100%
                position: absolute
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)
                font-size: 12px
            &.selected
              .thumbnail
                border-color: $bdcolor-blue-d
              .check_icon
                font-size: 25px
                color: $font-color-green
                position: absolute
                right: 3px
                top: 2px
            .size
              font-size: 12px
              background-color: #fff
              padding: 0 2px
              position: absolute
              top: 4px
              left: 4px
            .name
              font-size: 14px
              text-align: center
              line-height: 32px
              width: 100%
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
            .unfold
              font-size: 24px
              position: absolute
              right: 5px
              bottom: 32px
              color: $font-color-file
              opacity: 0
              padding: 0 5px
            &:hover
              .unfold
                opacity: 1
    .footer
      height: 80px
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      overflow: hidden
      .page_ctrl
        float: left
        margin: 10px 0 0 40px
      .btn_insert
        width: 100px
        height: 36px
        background: linear-gradient(to bottom, $bgc-gradient-blue1, $bgc-gradient-blue2)
        color: #fff
        float: right
        margin: 23px 40px 0 0
        line-height: 36px
        font-size: 18px
        border-radius: 18px
        box-shadow: 0 3px 5px 0 #ccc
        cursor: default
        &:hover
          background: linear-gradient(to bottom, #93D8FC, $bgc-gradient-blue1)

</style>

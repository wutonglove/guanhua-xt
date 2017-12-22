<template>
  <div class="local_wrapper">
    <div class="content">
      <div class="files_wrapper" v-show="list.length>0">
        <div class="file_box"
             v-for="file in list"
             :class="{'selected': file.selected}"
             @click="selectFile(file)"
        >
          <div class="thumbnail">
            <img :src="file.icon" alt="">
          </div>
          <div class="size" v-if="file.size">{{file.size}}</div>
          <div class="name" :title="file.name">{{file.name}}</div>
          <i-icon type="checkmark-circled" class="check_icon"></i-icon>
          <i-icon class="unfold" type="arrow-expand" @click.native.stop="unfold(file)"
                  v-if="dialogType==='image'"></i-icon>
          <i-icon class="pre_play" type="ios-play" @click.native.stop="unfold(file)" v-else></i-icon>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btn_seek">
        <span class="btn_name">本地浏览</span>
        <input type="file" @change="browseFile($event)">
      </div>
      <button type="button" class="btn_insert" @click="ok">插入</button>
    </div>
  </div>
</template>

<script>
  import types from 'common/json/file-type.json';

  import IIcon from 'iview/src/components/icon';
  import IMessage from 'iview/src/components/message';
  import {IAmage, IVideo, IAudio} from 'common/js/fileObject';
  import {mapGetters, mapMutations} from 'vuex';

  const FileType = types.fileType;
  const FileSize = types.fileSize;

  export default {
    data() {
      return {
        list: []
      };
    },
    mounted() {
      this.list = this.filterFilelist(this.fileList);
    },
    computed: {
      dialogType() {
        return this.fileDialogInfo.type;
      },
      fileList() {
        return this.fileList;
      },
      ...mapGetters([
        'fileDialogInfo',
        'fileList'
      ])
    },
    methods: {
      _normalizeList(list) {
        let ret = [];
        list.forEach((item, index) => {
          ret.push(item);
          ret[index].selected = false;
        });
        return ret;
      },
      filterFilelist(list) {
        let ret = [];
        list.forEach((item, index) => {
          if (item.type.split('/')[0] === this.dialogType) {
            ret.push(item);
            ret[ret.length - 1].selected = false;
          }
        });
        return ret;
      },
      browseFile: function (e) {
        let file = e.srcElement.files[0];

        if (this.discernFile(file)) return;

        new Promise((resolve) => {
          switch (this.dialogType) {
            case 'image':
              this.imgOriginalSize(file, (w, h) => {
                this.setFileList(new IAmage({file, w, h}));
                resolve();
              });
              break;
            case 'video':
              this.setFileList(new IVideo({file}));
              resolve();
              break;
            case 'audio':
              this.setFileList(new IAudio({file}));
              resolve();
              break;
          }
        }).then(() => {
          // 默认选中filelist最后一个file
//          console.log(this.list);
          this.selectFile(this.list[this.list.length - 1]);
        });
      },
      selectFile: function (file) {
        this.setSelectedFile(file);
        let list = this.list.slice();
        list.forEach((item) => {
          if (item.name === file.name) {
            item.selected = true;
          } else {
            item.selected = false;
          }
        });
        this.list = list;
      },
      clearSelectFile() {
        let list = this.list.slice();
        list.forEach((item) => {
          item.selected = false;
        });
        this.list = list;
      },
      imgOriginalSize: function (file, cbk) {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
          let data = e.target.result;

          let img = new Image();
          img.src = data;
          img.onload = () => {
            cbk(img.width, img.height);
          };
        };
      },
      // 识别文件类型
      discernFile: function (file) {
        if (!file) return true;
        let typeKey = this.dialogType;
        let typeVal = file.type.split('/')[1];
        if (FileType[typeKey].indexOf(typeVal) === -1) {
          IMessage.error({
            content: `不支持该文件类型,请选择 ${FileType[typeKey].join('，')}`,
            duration: 3
          });
          return true;// 不通过
        }
        if (file.size > FileSize) {
          IMessage.error({
            content: '插入文件不能大于15M！',
            duration: 3
          });
          return true;// 不通过
        }
        return false;
      },
      ok() {
        this.$emit('ok');
      },
      unfold: function (file) {
        this.$emit('unfold', file);
      },
      ...mapMutations({
        setFileList: 'SET_FILELIST',
        setSelectedFile: 'SET_SELECTEDFILE'
      })
    },
    watch: {
      fileList: {
        deep: true,
        handler(newVal) {
          this.list = this.filterFilelist(newVal);
        }
      },
      dialogType(newVal) {
        this.list = this.filterFilelist(this.fileList);
      }
    },
    components: {
      IIcon,
      IMessage
    }
  };
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
  .local_wrapper
    width: 100%
    background-color: $background-fileDialog-ctx
    .content
      width: 100%
      height: 500px
      padding: 20px
      box-sizing: border-box
      overflow-y: auto
      font-size: 0
      vertical-align: top
      .file_box
        display: inline-block
        position: relative
        margin: 15px
        width: 180px
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
        .check_icon
          font-size: 25px
          color: $font-color-green
          position: absolute
          right: 3px
          top: 2px
          display: none
        &.selected
          .thumbnail
            border-color: $bdcolor-blue-d
          .check_icon
            display: block
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
        .pre_play
          font-size: 60px
          position: absolute
          left: 50%
          top: 35px
          transform: translateX(-50%)
          opacity: 0
        &:hover
          .unfold
            opacity: 1
          .pre_play
            opacity: 1
    .footer
      height: 80px
      text-align: center
      .btn_seek, .btn_insert
        width: 100px
        height: 36px
        line-height: 36px
        font-size: 18px
        border-radius: 18px
        box-shadow: 0 3px 5px 0 #ccc
        cursor: default
      .btn_seek
        float: left
        margin: 23px 0 0 20px
        color: #666
        background: linear-gradient(to bottom, $bgc-gradient-white1, $bgc-gradient-white2)
        position: relative
        input[type="file"]
          opacity: 0
          position: absolute
          left: 0
          top: 0
          z-index: 1
          width: 100%
          height: 100%
        &:hover
          color: #df6a19
          margin: 22px 0 0 19px
          border: 1px solid #FFD6B5
      .btn_insert
        background: linear-gradient(to bottom, $bgc-gradient-blue1, $bgc-gradient-blue2)
        color: #fff
        float: right
        margin: 23px 40px 0 0
        &:hover
          background: linear-gradient(to bottom, #93D8FC, $bgc-gradient-blue1)

</style>

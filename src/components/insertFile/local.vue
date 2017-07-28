<template>
  <div class="local_wrapper">
    <div class="content">
      <div class="files_wrapper" v-show="showFilelist.length>0">
        <div class="file_box"
             v-for="file in showFilelist"
             :class="{'selected':file.selected}"
             @click="selectFile(file)"
        >
          <div class="thumbnail">
            <img  :src="file.icon" alt="">
          </div>
          <div class="size" v-if="file.size">{{file.size}}</div>
          <div class="name" :title="file.name">{{file.name}}</div>
          <span class="icon-check-circle-o"></span>
          <Icon class="unfold" type="arrow-expand" @click.native="$store.dispatch('unfold',file)" v-if="dialogType==='image'"></Icon>
          <Icon class="pre_play" type="ios-play" @click.native="$store.dispatch('unfold',file)" v-else></Icon>
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
  import FileConfig from 'common/json/config.json';
  import Checkbox from 'iview/src/components/checkbox';

  const FileType = FileConfig.file.fileType;
  const FileSize = FileConfig.file.fileSize;

  export default {
    computed: {
      dialogType() {
        return this.$store.state.fileDialog.type
      },
      showFilelist() {
        return this.filterFilelist(this.dialogType);
      }
    },
    methods: {
      filterFilelist(type){
        let list = [];
        this.$store.state.filelist.forEach((item, index) => {
          if(item.file.type.split('/')[0] === this.dialogType){
            list.push(item);
          }
        });
        return list;
      },
      browseFile(e) {
        let file = e.srcElement.files[0];
        let filelist = this.$store.state.filelist;

        if(this.discernFile(file)) return;

        switch(this.dialogType){
          case 'image':
            this.imgOriginalSize(file, (w, h) => {
              this.$store.state.filelist.push({
                name: file.name,
                icon: window.URL.createObjectURL(file),
                src: window.URL.createObjectURL(file),
                resource:window.URL.createObjectURL(file),
                size: `${w} * ${h}`,
                file: file,
                type: file.type,
                selected: false
              });
            });
            break;
          case 'video':
            this.$store.state.filelist.push({
              name: file.name,
              icon: '/images/media.jpg',
              src: '/images/video.jpg',
              resource:window.URL.createObjectURL(file),
              file: file,
              type: file.type,
              selected: false
            });
            break;
          case 'audio':
            this.$store.state.filelist.push({
              name: file.name,
              icon: '/images/media.jpg',
              src: '/images/audio.jpg',
              resource:window.URL.createObjectURL(file),
              file: file,
              type: file.type,
              selected: false
            });
            break;
        }
        // 默认选中filelist最后一个file
        setTimeout(()=>{
          this.selectFile(filelist[filelist.length-1]);
        },20)
      },
      selectFile(file) {
        this.$store.state.filelist.forEach((item, index) => {
          item.selected = false;
        });
        file.selected = true;
        this.$store.state.selectedFile = file;
      },
      imgOriginalSize(file, cbk) {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
          let data = e.target.result;

          let img = new Image();
          img.src = data;
          img.onload = () => {
            cbk(img.width, img.height);
          }
        }
      },
      // 识别文件类型
      discernFile(file) {
        if(!file) return true;
        let size = file.size || -1;
        let typeKey = this.dialogType;
        let typeVal = file.type.split('/')[1];
        console.log(typeKey);
        if(FileType[typeKey].indexOf(typeVal) === -1){
          this.$Message.error({
            content: `不支持该文件类型,请选择 ${FileType[typeKey].join('，')}`,
            duration: 3
          });
          return true;// 不通过
        }
        if(file.size > FileSize){
          this.$Message.error({
            content: '插入文件不能大于15M！',
            duration: 3
          });
          return true;// 不通过
        }
        return  false;
      },
      ok() {
        this.$parent.ok();
      },
      unfold(file) {
        this.$store.state.unfold.isShow = true;
        switch(file.type.split('/')[0]){
          case 'image':
            this.$store.state.unfold.content = `<img src="${file.src}" class="unfold_file"/>`;
            break;
          case 'video':
            this.$store.state.unfold.content = `<video src="${file.src}" class="unfold_file" controls>您的浏览器不支持video</video>`;
            break;
          case 'audio':
            this.$store.state.unfold.content = `<audio src="${file.src}" class="unfold_file" controls>您的浏览器不支持audio</audio>`;
            break;
        }
      }
    },
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
        &.selected
          .thumbnail
            border-color: $bdcolor-blue-d
          .icon-check-circle-o
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
          opacity:0
          padding:0 5px
        .pre_play
          font-size: 60px
          position: absolute
          left: 50%
          top: 35px
          transform:translateX(-50%)
          opacity: 0
        &:hover
          .unfold
            opacity:1
          .pre_play
            opacity:1
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

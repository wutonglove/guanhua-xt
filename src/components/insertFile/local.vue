<template>
  <div class="local_wrapper">
    <div class="content">
      <div class="files_wrapper" v-show="filelist.length>0">
        <div class="file_box" v-for="file in filelist" :class="{'selected':file.selected}" @click="selectFile(file)">
          <div class="thumbnail">
            <img :src="file.src" alt="">
          </div>
          <div class="size">{{file.size}}</div>
          <div class="name" :title="file.name">{{file.name}}</div>
          <span class="icon-check-circle-o"></span>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btn_seek">
        <span class="btn_name">本地浏览</span>
        <input type="file" @change="showFile($event)">
      </div>
      <button type="button" class="btn_insert" @click="ok">插入</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        filelist: []
      };
    },
    methods: {
      showFile(e) {
        var file = e.srcElement.files[0];

        this.imgOriginalSize(file,(w,h)=>{
          this.filelist.push({
            name: file.name,
            src: window.URL.createObjectURL(file),
            size: `${w} * ${h}`,
            file: file,
            selected: false
          });
        });
      },
      selectFile(file) {
        this.filelist.forEach((item, index) => {
          item.selected = false;
        });
        file.selected = true;
        this.$store.state.selectedFile = file;
      },
      imgOriginalSize(file,cbk) {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
          var data = e.target.result;

          var img = new Image();
          img.src = data;
          img.onload = () => {
            cbk(img.width, img.height);
          }
        }
      },
      ok() {
        this.$parent.ok();
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

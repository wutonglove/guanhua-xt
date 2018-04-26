<template>
  <div @dblclick="imgUnfold" @paste="paste">
    <router-view :info="info"></router-view>
    <textarea class="clipboard" ref="clipboard"></textarea>
  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  import qulist from 'map/question-list.json';

  export default {
    mounted() {
      this.init();
    },
    computed: {
      ...mapGetters([
        'fileList'
      ])
    },
    data() {
      return {
        info: {}
      };
    },
    methods: {
      init() {
        let type = this.$route.path.trim().split('/')[3];
        if (!type) return;
        let item = qulist[type];
        document.title = item.name;
        this.info.preTitle = item.name;
        this.info.desc = item.config.edit.desc;
        this.info.footBtns = item.config.edit.footBtns;
        this.info.mboard = item.config.edit.mboard;
        this.info.type = type;
        this.info.all = item;
      },
      unfold(file) {
        let isShow = true;
        let content = '';
        switch (file.type.split('/')[0]) {
          case 'image':
            content = `<img src="${file.objURL}" class="unfold_file"/>`;
            break;
          case 'video':
            content = `<video src="${file.resource}" class="unfold_file" controls>您的浏览器不支持video</video>`;
            break;
          case 'audio':
            content = `<audio src="${file.resource}" class="unfold_file" controls>您的浏览器不支持audio</audio>`;
            break;
        }
        this.setUnfold({isShow, content});
      },
      imgUnfold(e) {
        if (/\binsertFile_hook\b/.test(e.target.className)) {
          let name = e.target.getAttribute('data-name');
          for (let i = 0; i < this.fileList.length; i++) {
            let file = this.fileList[i];
            if (file.name === name) {
              this.unfold(file);
            }
          }
        }
      },
      paste() {
        let clipboard = this.$refs.clipboard;
        this.saveRange();
        clipboard.focus();
        setTimeout(() => {
          let text = clipboard.value;
          this.resetRange()
            .then(() => {
              document.execCommand('insertText', false, text);
              clipboard.value = '';
            });
        }, 20);
      },
      ...mapMutations({
        setUnfold: 'SET_UNFOLD'
      }),
      ...mapActions({
        saveRange: 'saveCurrentRange',
        resetRange: 'resetSelection'
      })
    },
    watch: {
      '$route.path': {
        deep: true,
        handler() {
          this.init();
        }
      }
    }
  };
</script>

<style scoped lang="stylus">
  .clipboard
    width: 0
    height: 0
    opacity: 0
    border: none
</style>

<template>
  <div>
    <router-view :info="info"></router-view>
    <textarea class="clipboard" ref="clipboard"></textarea>
  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex';
  import exercises from 'map/exercises.json';

  import $ from 'jquery';

  export default {
    mounted() {
      $(document).on('dblclick', '.insertFile_hook', (e) => {
        let name = $(e.target).attr('data-name');
        for (let i = 0; i < this.fileList.length; i++) {
          let file = this.fileList[i];
          if (file.name === name) {
            this.unfold(file);
          }
        }
      })
      // 粘贴 纯文本
        .on('paste', () => {
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
        });
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
          let info = null;
          let type = this.$route.path.trim().split('/')[2];

          for (let key in exercises) {
            if (info) break;
            for (let i = 0; i < exercises[key].length; i++) {
              let item = exercises[key][i];
              if (item.type === type) {
                info = {};
                document.title = item.name;
                info.preTitle = item.name;
                info.desc = item.desc;
                info.footBtns = item.config && item.config.footBtns;
                info.mboard = item.config && item.config.mboard;
                info.type = type;
                break;
              }
            }
          }
          this.info = info;
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

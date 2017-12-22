<template>
  <div class="">
    <router-view></router-view>
    <textarea class="clipboard" ref="clipboard"></textarea>
  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  const $ = window.$;

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
            this.resetRange();
            document.execCommand('insertText', false, text);
            clipboard.value = '';
          }, 20);
        });
    },
    computed: {
      ...mapGetters([
        'fileList'
      ])
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
    }
  };
</script>

<style scoped lang="stylus">
  .clipboard
    width: 0
    height: 0
    opacity: 0
</style>

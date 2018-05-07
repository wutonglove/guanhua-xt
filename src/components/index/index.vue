<template>
  <div @dblclick="imgUnfold" @paste="paste">
    <router-view @save="showDia" @preview="preview" ref="qus"></router-view>
    <textarea class="clipboard" ref="clipboard"></textarea>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { actionMixin } from 'common/js/mixin';

import qulist from 'map/question-list.json';

export default {
  mixins: [actionMixin],
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters(['fileList'])
  },
  methods: {
    init() {
      let type = this.$route.path.trim().split('/')[3];
      if (!type) return;
      let item = qulist[type];
      if (!item) return;
      document.title = item.name;
      this.xttype = qulist[type].code;
      this.xtclass = qulist[type].parent.code;
    },
    getdata(url) {
      return this.$refs.qus.getdata(url);
    },
    unfold(file) {
      let isShow = true;
      let content = '';
      switch (file.type.split('/')[0]) {
        case 'image':
          content = `<img src="${file.objURL}" class="unfold_file"/>`;
          break;
        case 'video':
          content = `<video src="${
            file.resource
          }" class="unfold_file" controls>您的浏览器不支持video</video>`;
          break;
        case 'audio':
          content = `<audio src="${
            file.resource
          }" class="unfold_file" controls>您的浏览器不支持audio</audio>`;
          break;
      }
      this.setUnfold({ isShow, content });
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
        this.resetRange().then(() => {
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

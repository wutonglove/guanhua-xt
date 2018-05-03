<template>
  <div @dblclick="imgUnfold" @paste="paste">
    <router-view :qusData="qusData"></router-view>
    <textarea class="clipboard" ref="clipboard"></textarea>
  </div>
</template>

<script>
  // 0120180503143346601
  import {mapMutations, mapGetters, mapActions} from 'vuex';
  import {getQuestionData} from 'api/getQuestionData';

  import qulist from 'map/question-list.json';

  export default {
    mounted() {
      this.getQuestion();
      this.init();
    },
    computed: {
      ...mapGetters([
        'fileList'
      ])
    },
    data() {
      return {
        qusData: {}
      };
    },
    methods: {
      init() {
        let type = this.$route.path.trim().split('/')[3];
        if (!type) return;
        let item = qulist[type];
        if (!item) return;
        document.title = item.name;
      },
      getQuestion() {
        const id = this.$route.params.id;
        if (/^[0-9]{19}$/.test(id)) {
          this.questionId = id;
        } else {
          alert(`没有id为${id}的习题`);
          return;
        }
        getQuestionData(this.questionId)
          .then(data => {
            let qusType = data.questionType;
            let qusClass = qulist[data.questionType].parent.ename;
            this.$router.push(`/${id}/${qusClass}/${qusType}`);
            console.log(data);
          })
          .catch((code) => {
            alert(`没有id为${id}的习题`);
          });
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

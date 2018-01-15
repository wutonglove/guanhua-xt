<template>
  <div class="content">
    <router-view ref="questionDOM" @on-save="showDia" @on-preview="preview"></router-view>
    <pre-dia :pageSrc="'./preview.html#/other/'" ref="previewDOM"></pre-dia>
    <up-progress @interrupt="interrupt"></up-progress>
  </div>
</template>

<script>
  import PreDia from 'base/pre-dialog/pre-dialog';
  import UpProgress from 'base/progress/progress';

  import exercises from 'map/exercises.json';
  import {actionMixin} from 'common/js/mixin';

  export default {
    mixins: [actionMixin],
    created() {
      this.type = this.$route.path.trim().split('/')[2];
      for (let key in exercises) {
        exercises[key].forEach((item, index) => {
          if (item.type === this.type) {
            document.title = item.name;
            this.preTitle = item.name;
          }
        });
      }
    },
    methods: {
      getdata(url) {
        return this.$refs.questionDOM.getQuestionData(url);
      }
    },
    components: {
      PreDia,
      UpProgress
    }
  };
</script>

<style scoped lang="stylus">
  .content
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
</style>

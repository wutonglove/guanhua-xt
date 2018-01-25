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

  import {actionMixin} from 'common/js/mixin';

  export default {
    mixins: [actionMixin],
    props: {
      info: {
        type: Object
      }
    },
    computed: {
      preTitle() {
        return this.info.preTitle;
      },
      type() {
        return this.info.type;
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

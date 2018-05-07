<template>
  <div class="content">
    <router-view ref="questionDOM" @on-save="save" @on-preview="preview"></router-view>
  </div>
</template>

<script>
  export default {
    methods: {
      save() {
        this.$emit('save');
      },
      preview() {
        this.$emit('preview');
      },
      getdata(url) {
        return this.$refs.questionDOM.getQuestionData(url);
      }
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

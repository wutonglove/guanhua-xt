<template>
  <router-view :questionData="questionData"></router-view>
</template>

<script>
  export default {
    props: {
      questionData: {
        type: Object
      }
    },
    mounted() {
      this.$router.push({path: `/other/${this.questionData.questionType}`});
    }
  };
</script>

<style scoped lang="stylus">

</style>

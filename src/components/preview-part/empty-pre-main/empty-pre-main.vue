<template>
  <router-view :questionData="questionData"></router-view>
</template>

<script>
  export default {
    props: {
      questionData: {
        type: Object
      }
    }
  };
</script>

<style scoped lang="stylus">

</style>

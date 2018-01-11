<template>
  <div class="content">
    <router-view ref="questionDOM"></router-view>
  </div>
</template>

<script>
  import exercises from 'map/exercises.json';

  export default {
    created() {
      this.type = this.$route.path.trim().split('/')[2];
      for (let key in exercises) {
        exercises[key].forEach((item, index) => {
          if (item.type === this.type) {
            document.title = item.name;
          }
        });
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

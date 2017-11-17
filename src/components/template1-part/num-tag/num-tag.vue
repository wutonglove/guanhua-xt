<template>
  <div class="tag_wrap" ref="tagWrap">
    <span class="text">{{text}}</span>
    <span class="corner_r" v-if="ori === 'right'"></span>
    <span class="corner_d" v-else-if="ori === 'down'"></span>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String
      },
      ori: {
        type: String
      }
    },
    mounted() {
      this.changeOri(this.ori);
    },
    updated() {
      this.changeOri(this.ori);
    },
    watch: {
      ori(newVal) {
        this.changeOri(newVal);
      }
    },
    methods: {
      changeOri(ori) {
        if (ori === 'down' || ori === 'top') {
          this.$refs.tagWrap.style.flexDirection = 'column';
        }
      }
    }
  };
</script>

<style scoped lang="stylus">
  .tag_wrap
    display: flex
    .text
      font-size: 12px
      color: #fff
      background-color: #51A6FB
      padding: 0 2px
      line-height: 16px
    .corner_r
      border: 8px solid transparent
      border-left-color: #51A6FB

  .corner_d
    border: 8px solid transparent
    border-top-color: #51A6FB
</style>

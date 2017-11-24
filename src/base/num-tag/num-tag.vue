<template>
  <div class="tag_wrap" ref="tagWrap">
    <span class="text" :style="{'background-color': color }">{{text}}</span>
    <span class="corner_r" v-if="ori === 'right'" :style="{'border-left-color': color }"></span>
    <span class="corner_d" v-else-if="ori === 'down'" :style="{'border-top-color': color }"></span>
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
      },
      color: {
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
      padding: 0 2px
      line-height: 16px
    .corner_r
      border: 8px solid transparent
    .corner_d
      border: 8px solid transparent
</style>

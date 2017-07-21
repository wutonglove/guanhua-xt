<template>
  <Modal class="wrapper"
         v-model="$store.state.unfold.isShow"
         width="0"
         @on-cancel="closeRes"
         @on-ok="closeRes"
  >
    <div class="unfold_dialog" v-show="$store.state.unfold.isShow">
      <div class="content" v-html="$store.state.unfold.content"></div>
      <Icon class="close" size="24" color="#fff" type="close" @click.native="close" @keyup.esc="colse"></Icon>
    </div>
    <p slot="header"></p>
    <p slot="close"></p>
    <p slot="footer"></p>
  </Modal>
</template>

<script>
  import Checkbox from 'iview/src/components/checkbox';
  export default {
    methods: {
      close() {
        this.$store.state.unfold.isShow = false;
      },
      closeRes() {

      }
    },
    computed: {
      width() {
        return this.$store.state.unfold.width;
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
  .mask
    width: 100%
    height: 100%
    background-color: $background-opacity
  .unfold_dialog
    position: fixed
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    border: 10px solid #fff;
    z-index: 1200
    .close
      position: absolute
      right: -35px
      top: -10px
</style>

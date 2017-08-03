<template>
  <Modal class="unfold_wrapper"
         v-model="$store.state.unfold.isShow"
         @on-cancel="close"
  >
    <div class="unfold_dialog" v-show="isShow">
      <div class="content" v-html="$store.state.unfold.content" ref="content"></div>
      <Icon class="close" size="24" color="#fff" type="close" @click.native="close" @keyup.esc="close"></Icon>
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
        this.$store.dispatch('closeUnfold');
      }
    },
    computed: {
      width() {
        return this.$store.state.unfold.width;
      },
      isShow() {
        return this.$store.state.unfold.isShow
      }
    },
    watch: {
      isShow(){
        setTimeout(()=>{
          if(window.screen.width <= 768){
            let unfold = this.$refs.content.getElementsByClassName('unfold_file')[0];
            unfold.setAttribute('style',`max-height:${window.screen.height-20}px;max-width:${window.screen.width-20}px`)
            console.log(window.screen.width );
            console.log(window.screen.height);
          }
        },20)
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
  .unfold_wrapper
    .unfold_dialog
      position: fixed
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
      border: 10px solid #fff;
      z-index: 1200
      .close
        position: absolute
        right: 0
        top: 0
        padding:10px;
        background-color: rgba(0,0,0,.5)
</style>

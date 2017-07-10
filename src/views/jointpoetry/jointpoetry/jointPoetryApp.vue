<template>
  <div>
    <div class="">

    </div>
    <sub-footer :foot-btns="footBtns"></sub-footer>

  </div>
</template>

<script>
  import Footer from 'components/footer/footer';
  import footBtns from 'assets/json/foot_btns.json';

  export default {
    data() {
      return {
        footBtns: footBtns.jointPoetry,
        poetry: {
          title: '登鹳雀楼',
          author: '王之涣',
          content: [
            '白日依山尽',
            '黄河入海流',
            '欲穷千里目',
            '更上一层楼'
          ]
        }
      };
    },
    components: {
      'sub-footer': Footer
    }
  };
</script>

<style scoped lang="less">

</style>
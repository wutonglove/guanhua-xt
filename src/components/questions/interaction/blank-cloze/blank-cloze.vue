<template>
  <mboard :mboard="mboard" class="blankcloze">
    <div class="article_wrap">
      <div class="header"></div>
      <div class="content"></div>
    </div>
    <div class="options_wrap"></div>
  </mboard>
</template>

<script>
  import Mboard from 'components/template1-part/mboard/mboard';

  export default {
    props: {
      mboard: {
        type: Object
      }
    },
    components: {
      Mboard
    }
  };
</script>

<style scoped lang="stylus">

</style>

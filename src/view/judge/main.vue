<template>
  <div>
    <basic-frame>
      <judge></judge>
    </basic-frame>
  </div>
</template>

<script>
  import BasicFrame from 'components/xiti_basic/basic_frame/basic_frame';
  import Judge from './judge';

  export default {
    components: {
      Judge,
      BasicFrame
    }
  };
</script>

<style scoped lang="stylus">
</style>

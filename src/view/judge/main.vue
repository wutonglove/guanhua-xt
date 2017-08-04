<template>
  <div>
    <basic-frame @on-save="save">
      <judge ref="judgeDOM"></judge>
    </basic-frame>
  </div>
</template>

<script>
  import BasicFrame from 'components/xiti_basic/basic_frame/basic_frame';
  import Judge from './judge';

  export default {
    methods:{
      save(){
        this.$refs.judgeDOM.save();
      }
    },
    components: {
      Judge,
      BasicFrame
    }
  };
</script>

<style scoped lang="stylus">
</style>

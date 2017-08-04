<template>
  <div>
    <basic-frame @on-save="save">
      <radio ref="radioDOM"></radio>
    </basic-frame>
  </div>
</template>

<script>
  import BasicFrame from 'components/xiti_basic/basic_frame/basic_frame';
  import Radio from './radio';
  export default {
    methods:{
      save(){
        this.$refs.radioDOM.save();
      }
    },
    components: {
      Radio,
      BasicFrame
    }
  };
</script>

<style scoped lang="stylus">
</style>

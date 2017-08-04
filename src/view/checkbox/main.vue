<template>
  <div>
    <basic-frame @on-save="save">
      <check-box  ref="checkboxDOM"></check-box>
    </basic-frame>
  </div>
</template>

<script>
  import BasicFrame from 'components/xiti_basic/basic_frame/basic_frame';
  import CheckBox from './checkbox';

  export default {
    methods:{
      save(){
        this.$refs.checkboxDOM.save();
      }
    },
    components: {
      BasicFrame,
      CheckBox
    }
  };
</script>

<style scoped lang="stylus">
</style>

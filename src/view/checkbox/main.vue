<template>
  <div>
    <basic-frame>
      <check-box></check-box>
    </basic-frame>
  </div>
</template>

<script>
  import BasicFrame from 'components/xiti_basic/basic_frame/basic_frame';
  import CheckBox from './checkbox';

  export default {
    created(){
      this.$store.state.questionContent = {
        topic: '',
          options: [
          {
            icon: 'A',
            text: '',
            id: 0
          },
          {
            icon: 'B',
            text: '',
            id: 1
          }
        ],
          answer: [],
          hint: '',
          explanation: '',
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

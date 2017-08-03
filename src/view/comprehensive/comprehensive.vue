<template>
  <div class="">
    <ul>
      <li :is="item" v-for="item in list"></li>
    </ul>
    <button type="add" @click="add">+++</button>
  </div>
</template>

<script>
  import Radio from '../radio/radio';

  export default {
    data(){
      return {
        list:[
          'radio'
        ]
      };
    },
    methods:{
      add(){
        this.$store.state.questionCode++;
        let initData = this.$store.state.radio.questionContent[0];
        this.$store.state.radio.questionContent.push(initData);
        this.list.push('radio');
      }
    },
    components: {
      Radio
    }
  };
</script>

<style scoped lang="stylus">

</style>

<template>
  <div class="q_main">
    <div class="q_list" v-for="list in questionList">
      <div class="title"></div>
      <div class="q_item" v-for="item in list">
        <div class="thumb">
          <img src="./7e3e6c1e-02fe-43c3-a689-c1bc2bbe22e1.png" alt="">
        </div>
        <div class="name"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Exe from 'map/exercises.json';
  export default {
    computed:{
      questionList(){
        let list = [];
        for(let key in Exe){
          list.push(Exe[key]);
        }
        return list;
      }
    }
  };
</script>

<style scoped lang="stylus">

</style>

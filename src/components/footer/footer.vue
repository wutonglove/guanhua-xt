<template>
  <div class="footer">
    <ul class="footer_wrapper">
      <li class="btn_wrapper" v-for="btn in footBtns">
        <div class="content">
          <div class="icon">{{btn.icon}}</div>
          <div class="text">{{btn.text}}</div>
        </div>
        <div class="desc" v-if="btn.desc"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      footBtns: {
        type: Array
      }
    }
  };
</script>

<style scoped lang="less">

</style>
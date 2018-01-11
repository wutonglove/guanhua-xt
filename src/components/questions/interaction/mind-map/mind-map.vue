<template>
  <div id="mind-map">
    <div id="map_cnt" ref="mindCnt"></div>
    <div class="map_ctrl"></div>
  </div>
</template>

<script>
  import JsMind from 'jsmind';

  export default {
    mounted() {
      this.initMind();
    },
    methods: {
      initMind() {
        let options = {
          container: 'map_cnt',
          editable: true,
          theme: 'orange'
        };
        this.jm = new JsMind(options);
      }
    }
  };
</script>

<style scoped lang="stylus">
  #mind-map
    width: 100%
    height: 100%
    background-color: #F8EFDE
    position: relative
    display: flex
    flex-direction: column
    #map_cnt
      flex: 1
      bottom: 60px
    .map_ctrl
      flex: 0 0 60px
      height: 60px
      line-height: 50px
      background-color: #F0F0F0
      border-top: 1px solid #CFCFCF
</style>

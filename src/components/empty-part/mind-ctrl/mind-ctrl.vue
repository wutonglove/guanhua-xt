<template>
  <ul class="mind_ctrl_box">
    <li class="btn_item" @click="zoomIn">
      <a href="javascript:void(0)">
        <i-icon type="plus-circled"></i-icon>
      </a>
    </li>
    <li class="btn_item">
      <i-slider v-model="zoom" :step="1" :min="0" :max="100"></i-slider>
    </li>
    <li class="btn_item" @click="zoomOut">
      <a href="javascript:void(0)">
        <i-icon type="minus-circled"></i-icon>
      </a>
    </li>
    <li class="btn_item" @click="showRoot">
      <a href="javascript:void(0)" title="定位根节点">
        <i-icon type="android-radio-button-on"></i-icon>
      </a>
    </li>
  </ul>
</template>

<script>
  import ISlider from 'iview/src/components/slider';
  import IIcon from 'iview/src/components/icon';
  import $ from 'jquery';

  export default {
    props: {
      mindId: {
        type: String
      }
    },
    data() {
      return {
        zoom: 50
      };
    },
    methods: {
      zoomIn() {
        if (this.zoom > 90) return;
        this.zoom += 10;
      },
      zoomOut() {
        if (this.zoom < 10) return;
        this.zoom -= 10;
      },
      showRoot() {
        $('#' + this.mindId).find('canvas').css('transform', '');
        $('#' + this.mindId).find('.theme-orange').css('transform', '');
      }
    },
    watch: {
      zoom(newVal) {
        this.$emit('on-zoom', newVal);
      }
    },
    components: {
      IIcon,
      ISlider
    }
  };
</script>

<style scoped lang="stylus">
  .mind_ctrl_box
    width: 280px
    height: 40px
    line-height: 40px
    background-color: #fe8483
    text-align: center
    border-radius: 8px
    font-size: 24px
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .4)
    .btn_item
      float: left
      width: 40px
      height: 40px
      &:nth-child(2)
        width: 150px
        font-size: 12px
      a
        color: #fff
</style>

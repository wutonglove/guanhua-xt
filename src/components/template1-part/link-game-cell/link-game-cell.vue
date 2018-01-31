<template>
  <td class="cell_wrap" :class="classNames" @click="clickHandler">
    <div v-if="isLine" :class="lineClass"></div>
    <div class="desc_wrap" v-show="!isBlank">
      <img v-if="desc&&desc.type==='image'" :src="desc.cnt" alt="">
      <div v-else-if="desc&&desc.type==='text'" class="text_wrap">
        {{desc.cnt}}
      </div>
    </div>
  </td>
</template>
<script>
  export default {
    name: 'cell',
    props: ['isSelected', 'isBlank', 'className', 'lineClass', 'isLine', 'desc'],
    computed: {
      classNames () {
        return {
          'selected': this.isSelected, // 选中
          'blank': this.isBlank // 空白
        };
      }
    },
    methods: {
      clickHandler () {
        this.$emit('click');
      }
    }
  };
</script>

<style scoped lang="stylus">
  .cell_wrap
    width: 60px;
    height: 52px;
    border: 2px solid transparent;
    background-color: #fff;
    cursor: pointer;
    border-radius: 4px;
    font-size: 20px;
    color: #333;
    position: relative;
    &.blank
      background-color: transparent;
      cursor: default;
    &.selected
      border-color: red;
    .desc_wrap
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      padding: 0
      margin: 0
      border: 2px solid #8C6733
      border-radius: 3px
      img
        width: 100%
        height: 100%
      .text_wrap
        width: 100%
        height: 100%
        text-align: center
        font-size: 12px
        overflow: hidden
        text-overflow: ellipsis
        word-break: break-all
</style>

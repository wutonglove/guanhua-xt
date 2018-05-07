<template>
  <notepad class="wrap">
    <div class="desc_box">
      <lucency-board class="desc_text">
        <textarea class="text_input" v-model="orderDes"></textarea>       
      </lucency-board>
      <res-btns class="desc_resource"
                ref="descRes"
                :resource="resource"
                @on-del="delResource()"
                @on-changecss="change"
      ></res-btns>
    </div>
  </notepad>
</template>

<script>
import Notepad from 'components/template1-part/notepad/notepad';
import LucencyBoard from 'components/template1-part/lucency-board/lucency-board';
import ResBtns from 'components/template1-part/resource-btns/resource-btns';

export default {
  props: {
    resource: {
      type: Object
    },
    desc: {
      type: String
    }
  },
  data() {
    return {
      orderDes: null
    };
  },
  mounted() {
    this.orderDes = this.desc;
  },
  methods: {
    delResource() {
      this.$emit('del-resource');
    },
    change(val) {
      this.$emit('change-resource', val);
    }
  },
  watch: {
    orderDes(val) {
      this.$emit('change-desc', val);
    }
  },
  components: {
    Notepad,
    LucencyBoard,
    ResBtns
  }
};
</script>

<style scoped lang="stylus">
.wrap
  .desc_box
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    padding: 10px
    .desc_text
      flex: 0 0 110px
      margin-bottom: 10px
      max-height: 110px
      .text_input
        background: none
        border: none
        outline: none
        width: 100%
        height: 100%
        padding: 25px 15px
        resize: none
    .desc_resource
      flex: 1
      overflow: hidden
      padding: 1px
</style>

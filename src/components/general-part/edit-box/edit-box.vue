<template>
  <div class="edit_box">
    <cnt-module :name="name" :required="required" :mheight="mheight">
      <ue class="edit_input" :config="config" v-model="temp" ref="ue" @change="change"></ue>
    </cnt-module>
  </div>
</template>

<script>
import CntModule from 'components/general-part/cnt-module/cnt-module';
import Ue from 'base/ueditor/ueditor';

export default {
  props: {
    config: {
      type: Object,
      default: null
    },
    name: String,
    required: {
      type: Boolean,
      default: false
    },
    mheight: {
      type: Number,
      default: 40
    },
    text: String
  },
  model: {
    prop: 'text',
    event: 'change'
  },
  data() {
    return {
      temp: ''
    };
  },
  methods: {
    getEditor() {
      return this.$refs.ue.getEditor();
    },
    change() {
      this.$emit('change', this.temp);
    }
  },
  components: {
    CntModule,
    Ue
  }
};
</script>

<style scoped lang="stylus">
</style>

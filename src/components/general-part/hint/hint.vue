<template>
  <div class="hint">
    <cnt-module name="提示">
      <ue class="hint_input" v-model="temp" @change="change"></ue>
    </cnt-module>
  </div>
</template>

<script>
import CntModule from 'components/general-part/cnt-module/cnt-module';
import Ue from 'base/ueditor/ueditor';

export default {
  props: {
    hint: String
  },
  model: {
    prop: 'hint',
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

<template>
  <div class="explanation">
    <cnt-module name="解析">
      <ue class="explanation_input"  v-model="temp" @change="change"></ue>
    </cnt-module>
  </div>
</template>

<script>
import CntModule from 'components/general-part/cnt-module/cnt-module';
import Ue from 'base/ueditor/ueditor';

export default {
  props: {
    explanation: String
  },
  model: {
    prop: 'explanation',
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

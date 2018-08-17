<template>
  <div class="topic">
    <cnt-module name="题干" :required="true" :mheight="90">
      <ue class="topic_input" :config="{initialFrameHeight: 60}" v-model="temp" ref="ue" @change="change"></ue>
    </cnt-module>
  </div>
</template>

<script>
import CntModule from 'components/general-part/cnt-module/cnt-module';
import Ue from 'base/ueditor/ueditor';

export default {
  props: {
    topic: String
  },
  model: {
    prop: 'topic',
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

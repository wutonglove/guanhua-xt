<template>
  <div class="topic">
    <cnt-module name="题干" :isMandatory="true">
      <div class="div_input"
           contenteditable="true"
           spellcheck="false" ref="topicDom"
           @input.stop.prevent="setTopic($event)"
           @blur="$store.dispatch('saveSelection')"
      ></div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';
  export default {
    mounted() {
      setTimeout(() => {
        if (this.$refs.topicDom) {
          this.$refs.topicDom.innerHTML = this.$store.state.topic;
        }
      }, 20);
    },
    methods: {
      setTopic(event) {
        let oldStr = this.$store.state.topic;
        let newStr = this.$refs.topicDom.innerHTML;
        if (oldStr.length !== newStr) {
          this.$store.state.topic = newStr;
        }
        this.$store.dispatch('test');
      }
    },
    components: {
      CntModule
    }
  };
</script>

<style scoped lang="stylus">
  .topic
    .div_input
      min-height: 60px
</style>

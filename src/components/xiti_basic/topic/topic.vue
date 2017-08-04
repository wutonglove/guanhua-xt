<template>
  <div class="topic">
    <cnt-module name="题干" :isMandatory="true">
      <div class="div_input"
           data-duty="topic"
           contenteditable="true"
           spellcheck="false" ref="topicDom"
           @blur="$store.dispatch('saveSelection')"
           @input="setTopic"
           @keyup.delete="keydelete"
      ></div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';

  export default {
    data(){
      return {
        topic:''
      };
    },
    computed: {
      isPass(){
        if (this.$refs.topicDOM.innerHTML.trim() === '') {
          return false;
        } else {
          return true;
        }
      }
    },
    methods: {
      keydelete() {
        this.$emit('key-delete');
      },
      setTopic(){
        this.topic = this.$refs.topicDom.innerHTML.trim();
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

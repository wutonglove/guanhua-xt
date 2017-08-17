<template>
  <div class="topic">
    <cnt-module name="题干" :isMandatory="true">
      <div class="div_input"
           data-duty="topic"
           contenteditable="true"
           spellcheck="false" ref="topicDom"
           @blur="test"
           @input="setTopic"
           @keyup.delete="keydelete"
      ></div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';

  export default {
    data() {
      return {
        topic: '',
        isPass: false
      };
    },
    methods: {
      keydelete: function () {
        this.$emit('key-delete');
      },
      setTopic: function () {
        this.topic = this.$refs.topicDom.innerHTML.trim();
        this.test();
      },
      test: function () {
        if (this.$refs.topicDom.innerHTML.trim() === '') {
          this.isPass = false;
        } else {
          this.isPass = true;
        }
        this.$emit('on-test');
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

<template>
  <div class="topic">
    <cnt-module name="题干" :isMandatory="true">
      <div class="div_input"
           data-duty="topic"
           contenteditable="true"
           spellcheck="false" ref="topicDom"
           @input.stop.prevent="setTopic($event)"
           @blur="$store.dispatch('saveSelection')"
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
        questionType:this.$store.state.questionType,
        questionCode:this.$store.state.questionCode
      };
    },
    mounted() {
      setTimeout(() => {
        if (this.$refs.topicDom) {
          this.$refs.topicDom.innerHTML = this.$store.state[this.questionType].questionContent[this.questionCode].topic;
        }
      }, 20);
    },
    methods: {
      setTopic(event) {
        let oldStr = this.$store.state[this.questionType].questionContent[this.questionCode].topic;
        let newStr = this.$refs.topicDom.innerHTML;
        if (oldStr.length !== newStr) {
          this.$store.state[this.questionType].questionContent[this.questionCode].topic = newStr;
        }
        this.$store.dispatch('test');
      },
      keydelete() {
        this.$emit('key-delete');
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

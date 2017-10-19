<template>
  <div class="topic">
    <cnt-module name="题干" :isMandatory="true">
      <div class="div_input"
           data-duty="topic"
           contenteditable="true"
           spellcheck="false" ref="topicDom"
           @blur="blur"
           @input="setTopic"
           @keyup.delete="keydelete"
           @click="changeRange"
           @keyup="changeRange($event)"
      ></div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';
  import {mapActions} from 'vuex';
  import {UNFINISHED, FINISHED} from 'common/js/config';

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
      changeRange(e) {
        if ((e.keyCode > 36 && e.keyCode < 41) || (e.type === 'click')) {
          this.saveCurrentRange();
        }
      },
      setTopic: function () {
        this.topic = this.$refs.topicDom.innerHTML.trim();
        this.verify();
      },
      blur() {
        this.saveCurrentRange();
        this.verify();
      },
      verify: function () {
        if (this.$refs.topicDom.innerHTML.trim() === '') {
          this.isPass = UNFINISHED;
        } else {
          this.isPass = FINISHED;
        }
        this.$emit('verify');
      },
      ...mapActions({
        saveCurrentRange: 'saveCurrentRange'
      })
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

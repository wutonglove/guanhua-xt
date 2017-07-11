<template>
  <div class="answer">
    <cnt-module name="答案" :isMandatory="true">
      <div class="answer_wrapper" ref="AnWrap">
        <label v-for="(answer,index) in data">
          <input :type="inputType" name="awser" @change="editAnswer(index,$event)"/>
          <strong>{{answer.icon}}</strong>
        </label>
      </div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';
  export default {
    props: {
      inputType: {
        type: String,
        default: 'radio'
      }
    },
    computed: {
      data() {
        return this.$store.state.options;
      }
    },
    methods: {
      editAnswer(index, event) {
        let inputs = this.$refs.AnWrap.getElementsByTagName('input');
        this.$store.state.answer = [];
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i].checked) {
            this.$store.state.answer.push(i);
          }
        }
      }
    },
    components: {
      CntModule
    }
  };
</script>

<style scoped lang="stylus">
  .answer_wrapper
    font-size: 0
    line-height: 20px
    label
      display: inline-block
      vertical-align: top
      font-size: 16px
</style>
<template>
  <div class="answer">
    <cnt-module name="答案" :isMandatory="true">
      <div class="answer_wrapper" ref="AnWrap" >
        <Radio-group v-model="$store.state.answer" v-if="inputType==='radio'" @on-change="$store.dispatch('test')">
          <Radio
            :label="answer.icon"
            v-for="(answer,index) in data"
            :key="index"
          ></Radio>
        </Radio-group>
        <Checkbox-group v-model="$store.state.answer" v-else>
          <Checkbox :label="answer.icon" v-for="(answer,index) in data" :key="index"></Checkbox>
        </Checkbox-group>
      </div>
    </cnt-module>
  </div>
</template>

<script>
  import CntModule from 'components/xiti_basic/cnt_module/cnt_module';
  import Checkbox from 'iview/src/components/checkbox';
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
      margin-left:10px;
      font-size: 16px
</style>

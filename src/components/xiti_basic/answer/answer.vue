<template>
  <div class="answer">
    <cnt-module name="答案" :isMandatory="true">
      <div class="answer_wrapper">
        <Radio-group v-model="answer" v-if="inputType === 'radio'">
          <Radio
            :label="answer.icon"
            v-for="(answer,index) in options"
            :key="index"
          ></Radio>
        </Radio-group>
        <Checkbox-group v-model="answers" v-else>
          <Checkbox :label="answer.icon" v-for="(answer,index) in options" :key="index"></Checkbox>
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
      },
      options: {
        type: Array
      }
    },
    data(){
      return {
        answer: '',
        answers:[]
      };
    },
    computed:{
      isPass(){
        if(this.answer !== '') {
          if(typeof '' !== 'string'){
            if(this.answer.length !==0){
              return true;
            }
          }
          return true
        }
        return false
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
      margin-left: 10px;
      font-size: 16px
</style>

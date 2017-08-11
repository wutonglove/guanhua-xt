<template>
  <div class="answer">
    <cnt-module name="答案" :isMandatory="true">
      <div class="answer_wrapper">
        <Radio-group v-model="ianswer" v-if="inputType === 'radio'" @on-change="test">
          <Radio
            :label="answer.icon"
            v-for="(answer,index) in options"
            :key="index"
          ></Radio>
        </Radio-group>
        <Checkbox-group v-model="ianswers" v-else @on-change="test">
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
        ianswer: '',
        ianswers: [],
        isPass: false
      };
    },
    computed: {
      answer(){
        let _answer = this.ianswer.charCodeAt(0);
        if (_answer > 64 && _answer < 91) {
          return _answer - 65;
        } else {
          return this.ianswer;
        }
      },
      answers(){
        let arr = [];
        this.ianswers.forEach((item, index) => {
          arr.push(item.charCodeAt(0) - 65);
        });
        return arr;
      }
    },
    methods: {
      test: function () {
        if (this.inputType === 'radio' && this.answer === '') {
          this.isPass = false
        } else if (this.inputType === 'checkbox' && this.answers.length === 0) {
          this.isPass = false
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
  .answer_wrapper
    font-size: 0
    line-height: 20px
    label
      margin-left: 10px;
      font-size: 16px
</style>

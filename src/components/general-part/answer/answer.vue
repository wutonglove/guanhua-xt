<template>
  <div class="answer">
    <cnt-module name="答案" :isMandatory="true">
      <div class="answer_wrapper">
        <i-radio-group v-model="_answer" v-if="inputType === 'radio'">
          <i-radio
            :label="answer.icon"
            v-for="(answer,index) in options"
            :key="index"
          ></i-radio>
        </i-radio-group>
        <i-checkbox-group v-model="_answer" v-else>
          <i-checkbox :label="answer.icon" v-for="(answer,index) in options" :key="index"></i-checkbox>
        </i-checkbox-group>
      </div>
    </cnt-module>
  </div>
</template>

<script>
import CntModule from 'components/general-part/cnt-module/cnt-module';

import IRadio from 'iview/src/components/radio';
import IRadioGroup from 'iview/src/components/radio/radio-group';
import ICheckbox from 'iview/src/components/checkbox';
import ICheckboxGroup from 'iview/src/components/checkbox/checkbox-group';

export default {
  props: {
    options: {
      type: Array
    },
    answer: {
      type: [String, Array]
    }
  },
  computed: {
    _answer: {
      get() {
        return this.answer;
      },
      set(value) {
        this.$emit('change', value);
      }
    },
    inputType() {
      return typeof this.answer === 'string' ? 'radio' : 'checkbox';
    }
  },
  components: {
    CntModule,
    IRadio,
    IRadioGroup,
    ICheckbox,
    ICheckboxGroup
  }
};
</script>

<style scoped lang="stylus">
.answer_wrapper
  font-size: 0
  line-height: 20px
  label
    margin-left: 10px
    font-size: 16px
</style>

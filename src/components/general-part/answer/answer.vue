<template>
  <div class="answer">
    <cnt-module name="答案" :required="true">
      <div class="answer_wrapper">
        <i-radio-group v-model="temp" v-if="type === 'radio'" @on-change="change">
          <i-radio
            v-for="(item,index) in options"
            :label="item.icon"
            :key="index"
          ></i-radio>
        </i-radio-group>
        <i-checkbox-group v-model="temp" v-else @on-change="change">
          <i-checkbox :label="item.icon" v-for="(item,index) in options" :key="index"></i-checkbox>
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
    type: {
      type: String,
      default: 'radio'
    },
    answer: String | Array,
    options: Array
  },
  model: {
    prop: 'answer',
    event: 'change'
  },
  data() {
    let temp = this.type === 'radio' ? '-1' : [];
    return {
      temp: temp
    };
  },
  methods: {
    change() {
      this.$emit('change', this.temp);
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
  padding: 10px 10px
  font-size: 0
  line-height: 20px
  label
    margin-left: 10px
    font-size: 16px
</style>

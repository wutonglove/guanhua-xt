<template>
  <div>
    <basic-frame @on-save="save" @on-preview="preview">
      <keep-alive>
        <div :is="questionType" ref="mainDOM"></div>
      </keep-alive>
    </basic-frame>
  </div>
</template>

<script>
  import BasicFrame from 'components/xiti_basic/basic_frame/basic_frame';

  import Radio from 'components/questions/basic/radio';
  import Judge from 'components/questions/basic/judge';
  import Checkbox from 'components/questions/basic/checkbox';
  import Fillblank from 'components/questions/basic/fillblank';
  import Vote from 'components/questions/basic/vote';
  import Sort from 'components/questions/basic/sort';
  import Jigsaw from 'components/questions/basic/jigsaw';
  import Comprehensive from 'components/questions/basic/comprehensive';

  export default {
    data() {
      return {
        questionType: this.$store.state.questionType
      };
    },
    methods: {
      save() {
        let data = this.$refs.mainDOM.getQuestionData();
        console.log(data);
        this.$store.dispatch('save', data.questionData);
      },
      preview() {
        let data = this.$refs.mainDOM.getQuestionData();
        console.log(data);
        this.$store.dispatch('preview', data.localData);
      }
    },
    components: {
      BasicFrame,
      Radio,
      Judge,
      Checkbox,
      Fillblank,
      Vote,
      Sort,
      Jigsaw,
      Comprehensive
    }
  };
</script>

<style scoped lang="stylus">
</style>

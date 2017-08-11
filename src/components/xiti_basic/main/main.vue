<template>
  <div>
    <basic-frame @on-save="save">

      <div :is="questionType" ref="mainDOM"></div>

    </basic-frame>
  </div>
</template>

<script>
  import BasicFrame from 'components/xiti_basic/basic_frame/basic_frame';

  import Radio from 'components/questions/basic/radio';
  import Judge from 'components/questions/basic/judge';
  import Checkbox from 'components/questions/basic/checkbox';
  import FillBlank from 'components/questions/basic/fillBlank';
  import Vote from 'components/questions/basic/vote';
  import Sort from 'components/questions/basic/sort';
  import Jigsaw from 'components/questions/basic/jigsaw';
  import Comprehensive from 'components/questions/basic/comprehensive';

  export default {
    data(){
      return{
        questionType:this.$store.state.questionType
      };
    },
    methods:{
      save(){
        let data = this.$refs.mainDOM.getQuestionData();
        console.log(data);
        this.$store.dispatch('save',data);
      }
    },
    components: {
      BasicFrame,
      Radio,
      Judge,
      Checkbox,
      FillBlank,
      Vote,
      Sort,
      Jigsaw,
      Comprehensive
    }
  };
</script>

<style scoped lang="stylus">
</style>

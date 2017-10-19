<template>
  <div class="question_context">
    <div class="topic" v-html="questionData.topic"></div>

    <div :is="componentsName" :questionData="questionData" ref="contentModule"></div>

  </div>
</template>

<script>
  import Choice from 'components/basic_preview/choice/choice';
  import Fillblank from 'components/basic_preview/fillBlank/fillBlank';
  import Judge from 'components/basic_preview/judge/judge';
  import Vote from 'components/basic_preview/vote/vote';
  import Sort from 'components/basic_preview/sort/sort';
  import Jigsaw from 'components/basic_preview/jigsaw/jigsaw';
  import Comprehensive from 'components/basic_preview/comprehensive/comprehensive';
  import Subjective from 'components/basic_preview/subjective/subjective';

  export default {
    props: {
      questionData: {
        type: Object
      },
      isDisabled: {
        type: Boolean
      }
    },
    computed: {
      componentsName() {
        return this.questionData.questionType === 'radio' || this.questionData.questionType === 'checkbox' ? 'choice' : this.questionData.questionType;
      }
    },
    methods: {
      submit() {
        this.$refs.contentModule.submit();
      },
      getResult() {
        return this.$refs.contentModule.getResult();
      }
    },
    watch: {
      isDisabled() {
        this.$refs.contentModule.isDisabled = this.isDisabled;
      }
    },
    components: {
      Choice,
      Fillblank,
      Judge,
      Vote,
      Sort,
      Jigsaw,
      Comprehensive,
      Subjective
    }
  };
</script>

<style scoped lang="stylus">
  .question_context
    min-height: 100%
</style>

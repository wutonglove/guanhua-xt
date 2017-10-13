<template>
  <div class="question_context">
    <div class="topic" v-html="questionData.topic"></div>

    <div :is="componentsName" :questionData="questionData" ref="contentModule" :isDisabled="isDisabled"></div>

  </div>
</template>

<script>
  import Choice from '../choice/choice';
  import Fillblank from '../fillBlank/fillBlank';
  import Judge from '../judge/judge';
  import Vote from '../vote/vote';
  import Sort from '../sort/sort';
  import Jigsaw from '../jigsaw/jigsaw';
  import Comprehensive from '../comprehensive/comprehensive';
  import Subjective from '../subjective/subjective';

  export default {
    name: 'content',
    props: {
      questionData: {
        type: Object
      },
      isDisabled: {
        type: Boolean
      }
    },
    computed: {
      answer() {
        if (this.questionData.questionType === 'comprehensive') {
          this.$refs.contentModule.getAnswer();
        }
        return this.$refs.contentModule.answer;
      },
      componentsName() {
        return this.questionData.questionType === 'radio' || this.questionData.questionType === 'checkbox' ? 'choice' : this.questionData.questionType;
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

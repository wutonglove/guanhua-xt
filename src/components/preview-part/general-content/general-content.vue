<template>
  <div class="question_context">
    <div class="topic" v-html="questionData.topic" v-if="questionData.topic"></div>

    <div v-if="componentsName" :is="componentsName" :questionData="questionData" ref="contentModule"></div>

  </div>
</template>

<script>
  import Choice from 'components/preview-question/general/choice/choice';
  import Fillblank from 'components/preview-question/general/fillBlank/fillBlank';
  import Judge from 'components/preview-question/general/judge/judge';
  import Vote from 'components/preview-question/general/vote/vote';
  import Sort from 'components/preview-question/general/sort/sort';
  import Jigsaw from 'components/preview-question/general/jigsaw/jigsaw';
  import Comprehensive from 'components/preview-question/general/comprehensive/comprehensive';
  import Subjective from 'components/preview-question/general/subjective/subjective';

  import Composition from 'components/preview-question/chinese/composition/composition';

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
        let name = '';
        switch (this.questionData.questionType) {
          case 'radio':
          case 'checkbox':
            name = 'choice';
            break;
          default :
            name = this.questionData.questionType;
        }
        if (this.quslist.indexOf(name) === -1) return '';
        return name;
      }
    },
    data() {
      return {
        quslist: ['choice', 'fillblank', 'judge', 'vote', 'sort', 'jigsaw', 'subjective', 'comprehensive', 'composition']
      };
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
      Subjective,
      Composition
    }
  };
</script>

<style scoped lang="stylus">
  .question_context
    min-height: 100%
</style>

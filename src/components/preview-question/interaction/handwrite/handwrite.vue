<template>
  <div class="handwrite">

  </div>
</template>

<script>
  import {submitMixin} from 'common/js/mixin';

  export default {
    mixins: [submitMixin],
    props: {
      questionData: {
        type: Object
      }
    }
  };
</script>

<style scoped lang="stylus">

</style>

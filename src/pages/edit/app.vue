<template>
  <div>
    <router-view ref="main"></router-view>
    <unfold></unfold>
    <pre-dia :pageSrc="'./preview.html#/0'" ref="previewDOM"></pre-dia>
    <up-progress @interrupt="interrupt"></up-progress>
  </div>
</template>

<script>
import Unfold from 'base/unfoldDialog/unfoldDialog';
import PreDia from 'base/pre-dialog/pre-dialog';
import UpProgress from 'base/progress/progress';

export default {
  methods: {
    interrupt() {
      this.$refs.main.interrupt();
    }
  },
  components: {
    Unfold,
    PreDia,
    UpProgress
  }
};
</script>

<style scoped lang="stylus">
</style>

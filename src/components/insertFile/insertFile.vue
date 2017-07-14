<template>
  <div class="file_dialog_wrapper">
    <p-dialog v-show="dialogStatus">

    </p-dialog>
  </div>
</template>

<script>
  import PDialog from 'components/dialog/dialog';

  export default {
    computed:{
      dialogStatus() {
        return this.$store.state.fileDialog
      }
    },
    components: {
      PDialog
    }
  };
</script>

<style scoped lang="stylus">

</style>

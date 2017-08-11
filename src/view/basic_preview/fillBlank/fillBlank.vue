<template>
  <div class="fillblank" ref="fillblankDOM">
    <span class="fidden_span" ref="fidden">{{blankVal}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      questionData: {
        type: Object
      }
    },
    data() {
      return {
        blankVal: '',
        isDisabled: false,
        answer:[]
      };
    },
    mounted(){
      setTimeout(() => {
        let _self = this;
        $(document).on('input', 'input.blank', function () {
          _self.blankVal = $(this).val().trim();
          setTimeout(() => {
            let width = $(_self.$refs.fidden).width();
            if (width < 100) width = 100;
            $(this).width(width);
          }, 20);
        })
          .on('change', 'input.blank', function () {
            let arr = [];

            $(_self.$refs.fillblankDOM).parent().find('input.blank').each((index, item) => {
              arr.push(item.value.trim());
            });
            _self.answer = arr;
          });
        $('.topic').find('img.blankDOM_hook').each((index, item) => {
          $(item).replaceWith('<input class="blank" type="text" />');
        });
      }, 20);
    },
    watch: {
      isDisabled(curVal, oldVal){
        $('input.blank').attr('disabled', curVal);
//        console.log(this.$store.state.result);
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../common/stylus/variable.styl'

  .topic
    .blank
      border-top: none
      border-left: none
      border-right: none
      border-color: #888
      outline: none
      text-align: center
      width: 100px
      padding: 0 10px

  .fidden_span
    display: inline-block
    font-size: 22px
    opacity: 0

</style>


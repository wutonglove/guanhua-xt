<template>
  <div class="fillblank" ref="fillblankDOM">
    <span class="fidden_span" ref="fidden">{{blankVal}}</span>
  </div>
</template>

<script>
  import {submitMixin} from 'common/js/mixin';
  import $ from 'jquery';

  export default {
    mixins: [submitMixin],
    data() {
      return {
        blankVal: '',
        isDisabled: false,
        answer: []
      };
    },
    mounted() {
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
        // 将空格图片换成input元素

        $('.topic').find('blank').each((index, item) => {
          $(item).replaceWith('<input class="blank" type="text"/>');
        });
        $('.topic').find('.blankDOM_hook').each((index, item) => {
          $(item).replaceWith('<input class="blank" type="text"/>');
        });
      }, 20);
    },
    methods: {
      getResult() {
        if (this.questionData.answer.length !== this.answer.length) {
          return 0;
        } else {
          for (let i = 0; i < this.answer.length; i++) {
            if (this.answer[i] !== this.questionData.answer[i]) return 0;
          }
          return 1;
        }
      }
    },
    watch: {
      isDisabled(curVal, oldVal) {
        $('input.blank').attr('disabled', curVal);
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../../../common/stylus/variable.styl'

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

<template>
  <div id="classify">
    <ul class="category_list">
      <li class="category_item" v-for="(category,index) in categories" :key="''+index">
        <div class="title_wrap">
          <span class="title">{{category.title}}</span>
        </div>
        <draggable class="content" element="div" v-model="category.cnt" :options="dragOptions" @end="end">
          <transition-group tag="div" class="content_wrap">
            <div class="option_wrap" v-for="(item,i) in category.cnt" :key="index+'item'+i">
              <img v-if="item.type === 'image'" :src="item.cnt" alt="">
              <div class="text" v-else-if="item.type === 'text'">{{item.cnt}}</div>
            </div>
          </transition-group>
        </draggable>
      </li>
    </ul>
    <draggable class="footer" element="div" v-model="options" :options="dragOptions">
      <transition-group tag="ul" class="options_wrap">
        <li class="option" v-for="(option,index) in options" :key="'op'+index">
          <img v-if="option.type === 'image'" :src="option.cnt" alt="">
          <div class="text" v-else-if="option.type === 'text'">{{option.cnt}}</div>
        </li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
  import {submitMixin} from 'common/js/mixin';
  import draggable from 'vuedraggable';

  export default {
    mixins: [submitMixin],
    computed: {
      categories() {
        let categories = [];
        this.questionData.categories.forEach((category, index) => {
          categories.push({
            title: category.title,
            cnt: []
          });
        });
        return categories;
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initOptions();
      });
    },
    data() {
      return {
        dragOptions: {
          animation: 0,
          group: 'description',
          disabled: false,
          ghostClass: 'ghost'
        },
        options: []
      };
    },
    methods: {
      initOptions() {
        let arr = [];
        this.questionData.categories.forEach((category, index) => {
          category.cnt.forEach((option, i) => {
            arr.push({
              type: option.type,
              cnt: typeof option.desc === 'string' ? option.desc : option.desc.src,
              pos: index
            });
          });
        });
        this.options = arr;
      },
      end() {
        this.$forceUpdate();
      },
      getResult() {
        if (this.options.length > 0) return 0;
        for (let c = 0; c < this.categories.length; c++) {
          for (let index = 0; index < this.categories[c].cnt.length; index++) {
            let option = this.categories[c].cnt[index];
            if (option.pos !== c) return 0;
          }
        }
        return 1;
      }
    },
    components: {
      draggable
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../../common/stylus/mixin.styl'

  #classify
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    .category_list
      flex: 1
      display: flex
      .category_item
        flex: 1
        display: flex
        flex-direction: column
        &:not(:last-child)
          border-right: 6px solid #D1A768
        .title_wrap
          padding-top: 10px
          text-align: center
          display: table
          margin: 0 auto
          table-layout: fixed
          .title
            width: 100px
            height: 40px
            overflow: hidden
            font-size: 12px
            display: table-cell
            margin: 0 auto
            background: linear-gradient(to top, #DAA055, #F4BF7B)
            border: 1px solid #8E5C1F
            border-radius: 8px
            padding: 3px
            color: #5d390d
            vertical-align: middle
        .content
          flex: 1
          padding-top: 10px
          position: relative
          .content_wrap
            center()
            width: 100%
            max-width: 210px
            display: flex
            flex-wrap: wrap
            align-items: center
            min-width: 175px
            min-height: 170px
            .option_wrap
              flex: 0 0 78px
              height: 50px
              border-radius: 3px
              margin: 3px
              border: 1px solid #8B581B
              font-size: 12px
              position: relative
              overflow: hidden
              img, textarea
                width: 100%
                height: 100%
              .text
                width: 100%
                height: 100%
                padding: 4px
                text-align: center
                background-color: #fff
    .footer
      flex: 0 0 80px
      margin: 6px
      background-color: #AE7D48
      line-height: 86px
      padding: 0 10px
      overflow-x: auto
      .options_wrap
        height: 100%
        .option
          vertical-align: middle
          display: inline-block
          width: 90px
          height: 60px
          border: 1px solid #8B581B
          border-radius: 5px
          overflow: hidden
          margin: 0 5px
          img, .text
            width: 100%
            height: 100%
            &.text
              background-color: #fff
              line-height: 60px
              padding: 4px
              line-height: 1

  .ghost
    img
      width: 88px
      height: 58px
</style>

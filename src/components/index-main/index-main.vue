<template>
  <div class="q_main">
    <div class="q_list" v-for="list in questionList">
      <div class="title">
        <Icon :type="list.icon" size="20" style="margin:0 3px"></Icon>
        <span class="text">{{list.title}}</span>
      </div>
      <div class="q_item_wrap">
        <a class="q_item" v-for="item in list.content" :href="`${item.href}?${params}`">
          <div class="thumb" :style="`background-image:url(/static/images/${item.thumbUrl})`"></div>
          <div class="name">{{item.name}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import Exe from 'map/exercises.json';
  import Icon from 'iview/src/components/icon';

  export default {
    computed: {
      questionList() {
        let list = [];
        for (let key in Exe) {
          let icon = this.listIcon(key);
          list.push({
            title: key,
            icon: icon,
            content: Exe[key]
          });
        }
        return list;
      },
      params() {
        let href = window.location.href;
        let index = href.indexOf('?');
        return index === -1 ? '' : href.slice(index);
      }
    },
    methods: {
      listIcon: function (name) {
        switch (name) {
          case '基础题型':
            return 'document-text';
        }
      }
    },
    components: {
      Icon
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/mixin.styl'
  @import '../../common/stylus/variable.styl'

  .q_main
    $fixedWidth()
    position: relative
    .q_list
      width: 100%
      border: 1px solid $bdcolor-blue
      margin-top: 20px
      .title
        font-size: 16px
        background-color: $background-blue
        line-height: 32px
        padding-left: 5px
        vertical-align: top
        color: $font-color-blue
      .q_item_wrap
        overflow: hidden
        padding: 10px
        box-sizing: border-box
        .q_item
          float: left
          width: 140px
          margin: 10px
          text-align: center
          .thumb
            width: 100%
            height: 140px
            background-repeat: no-repeat
            background-position: 0 0
            box-shadow: 0 0 10px 0 $background-grey-sh
          .name
            line-height: 28px
            font-size: 16px
            margin-top: 5px
            color: $font-color-normal
          &:hover
            .name
              color: $font-color-blue-d
            .thumb
              background-position-y: -140px
</style>

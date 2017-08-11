<template>
  <div class="jigsaw">
    <div class="jigsaw_wrapper">
      <div class="show" ref="showRegion">
        <draggable v-model="showList"
                   class="show_wrapper"
                   :options="{group:'list',handle:'.debris',draggable:'.debris'}"
                   @start="dragStart"
        >
          <transition-group style="display: block;width: 100%;height: 100%;">
            <div class="debris"
                 v-for="(li,index) in showList"
                 :key="index"
                 :style="{'width':jigsawImg._width/questionData.itable.d-8+'px',height:jigsawImg._height/questionData.itable.r-8+'px'}">
            </div>
          </transition-group>
        </draggable>
      </div>

      <div class="resource" ref="resourceRegion">
        <draggable v-model="resourceList" class="resource_wrapper" :options="{group:'list',handle:'.debris',draggable:'.debris'}">
          <transition-group>
            <div class="debris" v-for="(li,index) in resourceList" :key="index" :style="{'width':250/questionData.itable.d-15+'px',height:jigsawImg._height*.8/questionData.itable.r-12+'px'}">
              {{li.text}}
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
    <div class="buffer" ref="bufferRegion">

    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';

  export default {
    props: {
      questionData: {
        type: Object
      }
    },
    mounted(){
      let _self = this;
      let $buffer = $(this.$refs.bufferRegion);
      $buffer.html(this.questionData.jigsawImg);
      $buffer.children('.insertFile_hook')[0].onload = function () {
        _self.jigsawImg._src = this.src;
        _self.jigsawImg._width = this.width;
        _self.jigsawImg._height = this.height;

        _self.initList();
        _self.initShowRegion();
        _self.initResourceRegion();

        setTimeout(() => {
          $buffer.html('');
        }, 20)
      };
    },
    data(){
      return {
        jigsawImg: {
          _src: '',
          _width: 0,
          _height: 0
        },
        imgMaxWidth: window.innerWidth > 425 ? 490 : window.innerWidth,
        resourceList: [],
        showList: [],
        isDisabled: false,
        answer: this.$store.state[this.questionData.questionType].IAnswer
      };
    },
    methods: {
      initShowRegion: function () {
        $(this.$refs.showRegion)
          .width(this.jigsawImg._width)
          .height(this.jigsawImg._height);
      },
      initResourceRegion: function () {
        $(this.$refs.resourceRegion)
          .height(this.jigsawImg._height);
      },
      initList: function () {
        for (let i = 0; i < this.questionData.itable.r * this.questionData.itable.d; i++) {
          this.resourceList.push({
            code:i,
            text:Math.random()
          });
          this.showList.push({});
        }
      },
      dragStart:function(evt){
        console.log(evt.oldIndex);
      }
    },
    components: {
      draggable
    }
  };
</script>

<style lang="stylus">
  @import '../../../common/stylus/variable.styl'

  .jigsaw
    .jigsaw_wrapper
      display: inline-block
      &:after
        content: ''
        display: block
        width: 0
        height: 0
        clear: both
      .show
        float: left;
        .show_wrapper
          width: 100%
          height: 100%
          border: 1px solid $bdcolor-g
          padding:1px
          &:after
            content: ''
            display: block
            width: 0
            height: 0
            clear: both
          .debris
            border:1px solid $bdcolor-g
            margin: 3px
            float:left
      .resource
        float: left
        width: 255px
        .resource_wrapper
          width: 100%
          height: 100%
          border: 1px solid $bdcolor-g
          overflow: auto
          &:after
            content: ''
            display: block
            width: 0
            height: 0
            clear: both
          .debris
            border:1px solid $bdcolor-g
            margin: 6px
            float:left
    .buffer
      .insertFile
        max-width: 430px
        max-height: none
</style>

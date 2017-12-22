<template>
  <div class="notepad">
    <div class="title_wrap"
         :style="titleStyle">
      <span class="text" v-if="title !== ''">{{title}}</span>
      <i-icon type="close-round" class="close" v-if="closeable" @click.native="close"></i-icon>
    </div>
    <div class="content_wrap" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BG from './graphPaper.jpg';
  import IIcon from 'iview/src/components/icon';

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      align: {
        type: String,
        default: 'left'
      },
      color: {
        type: String,
        default: '#4F310C'
      },
      width: {
        type: [Number, String],
        default: '100%'
      },
      closeable: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      titleStyle() {
        return {
          'text-align': this.align,
          width: typeof this.width === 'string' ? this.width : `${this.width}px`,
          color: this.color
        };
      }
    },
    mounted() {
      this.$refs.content.style.backgroundImage = `url(${BG})`;
    },
    methods: {
      close() {
        this.$emit('on-close');
      }
    },
    components: {
      IIcon
    }
  };
</script>

<style scoped lang="stylus">
  .notepad
    width: 100%
    background-repeat: repeat
    border-radius: 8px
    position: relative
    z-index: 10
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, .5)
    .title_wrap
      height: 32px
      line-height: 32px
      width: 100%
      background: linear-gradient(to top, #A87A42, #E0B67A)
      color: #4F310C
      position: relative
      border-bottom: 1px solid #76624E
      border-top-left-radius: 8px
      border-top-right-radius: 8px
      box-shadow: 0 1 1px 0 rgba(0, 0, 0, .3)
      overflow: hidden
      padding: 0 15px
      &:after
        content: ''
        display: block
        width: 100%
        height: 0
        border-bottom: 1px dashed #bbb
        position: absolute
        bottom: 1px
        left: 1px
      .close
        font-size: 15px
        position: absolute
        right: 15px
        top: 50%
        transform: translateY(-50%)
        cursor: pointer
        &:hover
          color: #8a683c
    .content_wrap
      width: 100%
      position: absolute
      top: 32px
      left: 0
      bottom: 0
      border-bottom-left-radius: 8px
      border-bottom-right-radius: 8px
</style>

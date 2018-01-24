<template>
  <lucency-board class="in_desc_resource">
    <div class="btns_wrap" v-show="isEmpty">
      <a href="javascript:void(0)"
         class="insert_btn"
         v-for="btn in btns"
         @click="showInsert(btn.role)"
      >
        <i-icon :type="btn.icon"></i-icon>
      </a>
    </div>
    <div class="resource_wrap" v-show="!isEmpty">
      <div class="resource" ref="resTgt" v-if="resource" @mousewheel="scaleImg">
        <img :src="resource.objURL"
             :class="{active:active}"
             class="insertFile_hook"
             :data-name="resource.name"
             @click="selectRes"
             ref="resourceImg"
             v-if="resource.type.split('/')[0] === 'image'"
        />
        <video :src="resource.resource"
               class="insertFile_hook"
               :data-name="resource.name"
               controls
               v-else-if="resource.type.split('/')[0] === 'video'"
               @click="selectRes"
        >
          您的浏览器不支持video
        </video>
        <div class="audio" v-else-if="resource.type.split('/')[0] === 'audio'" @click="selectRes">
          <i-icon type="volume-medium" :size="200" color="#979799"></i-icon>
          <audio :src="resource.resource"
                 class="insertFile_hook"
                 :data-name="resource.name"
                 controls
          >
            您的浏览器不支持video
          </audio>
        </div>

      </div>
      <div class="res_ctrl"
           v-show="active"
           v-if="resource && resource.type.split('/')[0]==='image'"
      >
        <a href="javascript:void(0)" @click="rotateImg">
          <i-icon type="forward"></i-icon>
        </a>
        <a href="javascript:void(0)" @click="refreshImg">
          <i-icon type="android-refresh"></i-icon>
        </a>
        <a href="javascript:void(0)">
          <i-icon type="qr-scanner"></i-icon>
        </a>
        <a href="javascript:void(0)">
          <i-icon type="qr-scanner">|</i-icon>
        </a>
        <a href="javascript:void(0)" @click="delImg">
          <i-icon type="ios-trash"></i-icon>
        </a>
      </div>
      <div class="res_ctrl" v-show="active" v-else-if="resource">
        <a href="javascript:void(0)" @click="delImg">
          <i-icon type="ios-trash"></i-icon>
        </a>
      </div>
    </div>

  </lucency-board>
</template>

<script>
  import {mapMutations} from 'vuex';
  import LucencyBoard from 'components/template1-part/lucency-board/lucency-board';
  import IIcon from 'iview/src/components/icon';

  import $ from 'jquery';

  export default {
    props: {
      resource: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        btns: [
          {
            role: 'image',
            icon: 'images'
          },
          {
            role: 'video',
            icon: 'android-film'
          },
          {
            role: 'audio',
            icon: 'ios-mic'
          }
        ],
        active: false
      };
    },
    computed: {
      isEmpty() {
        return !this.resource;
      }
    },
    methods: {
      showInsert(role) {
        let name;
        switch (role) {
          case 'image':
            name = '插入图片';
            break;
          case 'video':
            name = '插入视频';
            break;
          case 'audio':
            name = '插入音频';
            break;
        }
        this.setFileDia({
          name,
          type: role,
          status: true
        });
      },
      rotateImg() {
        let $img = $(this.$refs.resTgt).find('img').eq(0);
        let _style = $img.css('transform') === 'none' ? '' : $img.css('transform');
        $img.css({transform: `${_style} rotate(90deg)`});
        this.$emit('on-changecss');
      },
      refreshImg() {
        let $img = $(this.$refs.resTgt).find('img').eq(0);
        $img.css('transform', 'none');
        this.$emit('on-changecss');
      },
      delImg() {
        this.$emit('on-del');
      },
      selectRes() {
        this.active = !this.active;
      },
      scaleImg(e) {
        if (!this.active) return;
        let $this = $(this.$refs.resourceImg);
        if ($this.length < 1) return;
        let _transform = $this.css('transform') === 'none' ? '' : $this.css('transform');
        if (e.wheelDelta > 0) {
          $this.css({
            transform: `${_transform} scale(1.1)`
          });
        } else {
          $this.css({
            transform: `${_transform} scale(0.9)`
          });
        }
      },
      getResource() {
        if (this.resource) {
          return {
            type: this.resource.type.split('/')[0],
            cssStyle: $(this.$refs.resourceImg).css('transform') || '',
            src: this.resource.resource,
            name: this.resource.name
          };
        }
      },
      ...mapMutations({
        setFileDia: 'SET_FILEDIALOGINFO'
      })
    },
    components: {
      LucencyBoard,
      IIcon
    }
  };
</script>

<style scoped lang="stylus">
  .in_desc_resource
    .btns_wrap
      width: 100%
      display: flex
      text-align: center
      justify-content: center
      padding-top: 110px
      .insert_btn
        flex: 0 0 100px
        font-size: 50px
        color: #979799
        &:hover
          color: #898989
    .resource_wrap
      width: 100%
      height: 100%
      position: relative
      .resource
        width: 100%
        height: 100%
        text-align: center
        vertical-align: middle
        overflow: hidden
        padding: 4px
        position: relative
        img
          max-width: 100%
          max-height: 100%
          border: 2px solid transparent
          &.active
            border-color: #FF6F3E
        video
          position: absolute
          top: 50%
          left: 50%
          transform: translate(-50%, -50%)
          max-width: 100%
          max-height: 100%
        .audio
          width: 100%
          height: 100%
          position: relative
          audio
            width: 100%
            position: absolute
            bottom: 0
            left: 50%
            transform: translateX(-50%)
      .res_ctrl
        position: absolute
        right: 10px
        top: 10px
        font-size: 25px
        text-align: center
        width: 35px
        border-radius: 10px
        background-color: #fff
        padding: 2px 0
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, .3)
        a
          display: block
          color: #979799
          &:hover
            color: #BCBCBC
</style>

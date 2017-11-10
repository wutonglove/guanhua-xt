<template>
  <div class="num_btn_box">
    <div class="dot_btn_box" v-if="!isNotdot">
      <div class="dot_inner_box" @click="dotClick">
        <a href="javascript:void(0)"
           class="num_btn"
           v-if="hasDot"
           :class="{'active':dotActive}"
        >
          {{dotActive ? '' : '.'}}
        </a>
        <span class="del_line" v-if="hasDot && dotIsDel">|</span>
      </div>
    </div>
    <div class="num_btn_box" @click="numClick" :class="{'active':numActive}">
      <div class="num_input_box" v-if="isEdit">
        <input type="text" class="num_input" maxlength="1">
      </div>

      <div class="num_inner_box" v-else>
        <a href="javascript:void(0)"
           class="num_btn"
           :class="{'active':numActive}"
           v-if="text!==''"
        >
          {{text}}
        </a>
        <span class="virtual" v-if="isVirtual"></span>
      </div>
    </div>
  </div>
</template>

<script>
  const SHOW_MODE = 'show';
  const EDIT_MODE = 'edit';
  const NOTDOT_MODE = 'notdot';

  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      hasDot: {
        type: Boolean,
        default: false
      },
      dotIsDel: {
        type: Boolean,
        default: false
      },
      isVirtual: {
        type: Boolean,
        default: false
      },
      numActive: {
        type: Boolean,
        default: false
      },
      dotActive: {
        type: Boolean,
        default: false
      },
      mode: {
        type: Array,
        default() {
          return [SHOW_MODE];
        }
      }
    },
    computed: {
      isEdit() {
        return EDIT_MODE in this.mode && this.numActive;
      },
      isNotdot() {
        return NOTDOT_MODE in this.mode;
      }
    },
    data() {
      return {};
    },
    methods: {
      numClick() {
        this.$emit('num-click');
      },
      dotClick() {
        this.$emit('dot-click');
      }
    }
  };
</script>

<style scoped lang="stylus">
  .num_btn_box
    display: flex
    .num_btn_box
      flex: 0 0 60px
      width: 60px
      height: 45px
      line-height: 45px
      position: relative
      .num_inner_box
        width: 100%
        height: 100%
        .virtual
          display: block
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          border: 2px dashed #CE5F5A
          border-radius: 4px
          background-color: rgba(205, 96, 62, .3)
    .dot_btn_box
      flex: 0 0 20px
      width: 20px
      height: 24px
      margin: 20px 1px 0 3px
      line-height: 5px
      font-weight: 800
      position: relative
      .dot_inner_box
        width: 100%
        height: 100%
        .del_line
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 120%
          font-size: 30px
          line-height: 20px
          font-weight: normal
          color: #CB5250
          text-align: center
          transform: rotate(-36deg);
          text-shadow: none
    .num_input_box
      flex: 0 0 60px
      width: 60px
      height: 45px
      line-height: 45px
      .num_input
        width: 100%
        height: 100%
        border: 2px solid #1F6EA6
        background: linear-gradient(to top, #6BABD3, #559ACE)
        font-size: 36px
        text-align: center
        border-radius: 4px
    .num_btn
      display: block
      width: 100%
      height: 100%
      color: #824f06
      font-size: 36px
      text-align: center
      text-shadow: 0.5px 0.87px 0 hsla(0, 0%, 100%, .75);
      box-shadow: inset 0 4px 13px #ffe2b5, 1px 2px 10px rgba(68, 49, 19, .4);
      border-radius: 3px
      background: linear-gradient(to top, #ad8549, #FAE1B9);
      &:active
        box-shadow: 1px 2px 10px rgba(68, 49, 19, .4)
      &.active
        text-shadow: none
        color: #fff
        background: linear-gradient(to top, #3E8ABE, #2571B8)
        box-shadow: 1px 2px 10px rgba(68, 49, 19, .4);
</style>

<template>
  <ul class="box_wrapper">
    <li class="btn_box" v-if="btnIsShow('disprtion')">
      <i-poptip trigger="click" placement="top" ref="desc">
        <div class="btn_icon">
          <span class="icon">
            <img src="/static/images/icon_tool2.png" alt="">
          </span>
          <span class="text">题型描述</span>
        </div>
        <div slot="content" class="desc_box pop_box">
          <div class="pop_title">{{questionName}}题型描述</div>
          <div class="pop_content">
            <div class="desc_pic">
              <i-carousel v-model="picIndex" style="width:360px">
                <i-carousel-item v-for="(item,index) in desc.descPic" class="carousel_item" :key="'item'+index">
                  <div class="tag_wrapper">
                    <tag :color="tags[index].color" :text="tags[index].text"></tag>
                  </div>
                  <img :src="item" alt="">
                </i-carousel-item>
              </i-carousel>
            </div>
            <ul class="desc_text">
              <li v-for="(item,index) in desc.descText">{{index + 1}}. {{item}}</li>
            </ul>
          </div>
          <div class="pop_foot">
            <button class="close_btn btn" @click="hideDesc">我知道了</button>
          </div>
        </div>
      </i-poptip>
    </li>
    <li class="btn_box" v-if="btnIsShow('timeset')">
      <i-poptip trigger="click" placement="top">
        <div class="btn_icon">
          <span class="icon">
            <img src="/static/images/icon_tool3.png" alt="">
          </span>
          <span class="text">时间设置</span>
        </div>
        <div slot="content" class="set_time_box pop_box">
          <div class="pop_title">计时方式选择</div>
          <div class="pop_content">
            <i-radio-group v-model="timing" vertical>
              <i-radio label="clockwise" class="timing_item">
                <span class="text" :class="{active:timing === 'clockwise'}">顺计时</span>
              </i-radio>
              <i-radio label="counterclockwise" class="timing_item">
                <span class="text" :class="{active:timing === 'counterclockwise'}">倒计时</span>
                <span class="set_time_wrap" @click="clickAgent">
                  <i-input v-model="minute" :maxlength="2" class="input"
                           :disabled="timing !== 'counterclockwise'"></i-input>
                  分
                  <i-input v-model="second" :maxlength="2" class="input"
                           :disabled="timing !== 'counterclockwise'"></i-input>
                  秒
                </span>
              </i-radio>
            </i-radio-group>
          </div>
          <div class="pop_foot">
            <button class="ok_btn btn" @click="setTime">确定</button>
            <button class="cl_btn btn">取消</button>
          </div>
        </div>
      </i-poptip>
    </li>
    <li class="btn_box" @click="preview" v-if="btnIsShow('preview')">
      <div class="btn_icon">
        <span class="icon">
          <img src="/static/images/icon_tool4.png" alt="">
        </span>
        <span class="text">预览</span>
      </div>
    </li>
    <li class="btn_box" @click="save" v-if="btnIsShow('save')">
      <div class="btn_icon">
        <span class="icon">
          <img src="/static/images/icon_tool5.png" alt="">
        </span>
        <span class="text">保存</span>
      </div>
    </li>
  </ul>
</template>

<script>
  import IPoptip from 'iview/src/components/poptip';
  import ICarousel from 'iview/src/components/carousel';
  import ICarouselItem from 'iview/src/components/carousel/carousel-item';

  import IRadioGroup from 'iview/src/components/radio/radio-group';
  import IRadio from 'iview/src/components/radio';
  import IInput from 'iview/src/components/input';

  import Tag from 'components/tag/tag';

  export default {
    props: {
      btns: {
        type: Array
      },
      desc: {
        type: Object
      },
      questionName: {
        type: String
      }
    },
    mounted() {
      this.$refs.desc.handleClick();
    },
    data() {
      return {
        picIndex: 1,
        tags: [
          {
            color: 'blue',
            text: '题型预览'
          },
          {
            color: 'green',
            text: '编辑导引'
          }
        ],
        timing: 'clockwise',
        minute: 0,
        second: 0
      };
    },
    methods: {
      preview() {
        this.$emit('on-preview');
      },
      save() {
        this.$emit('on-save');
      },
      hideDesc() {
        this.$refs.desc.handleClose();
      },
      clickAgent() {
        this.timing = 'counterclockwise';
      },
      setTime() {
        if (this.timing === 'counterclockwise') {
          let minute = this.minute;
          let second = this.second;
          this.$emit('set-times', {minute, second});
        } else {
          this.$emit('set-times');
        }
      },
      btnIsShow(type) {
        let index = this.btns.findIndex((item) => {
          return type === item;
        });
        return index !== -1;
      }
    },
    components: {
      IPoptip,
      ICarousel,
      ICarouselItem,
      Tag,
      IRadioGroup,
      IRadio,
      IInput
    }
  };
</script>

<style scoped lang="stylus">
  .box_wrapper
    width: 100%
    display: flex
    justify-content: center
    padding-top: 10px
    .btn_box
      display: inline-block
      flex: 0 0 70px
      margin: 0 25px
      &:hover
        cursor: pointer
        .icon
          transform-origin: 50% 50%;
          transform: scale(1.15);
      .btn_icon
        position: relative
        text-align: center
        .icon
          position: absolute
          img
            width: 60px
            height: 60px
            transform: translate(18px, 0);
        .text
          display: inline-block
          width: 100%
          margin-top: 60px
          padding: 2px 6px
          color: #6b4421
          font-size: 12px
          border: 2px solid #D39D54
          border-radius: 10px
          background: #F7F1E5
      .pop_box
        border: 2px solid #fff
        border-radius: 5px
        padding: 0 10px
        background-color: #EADFCF
        color: #222
        .pop_title
          height: 46px
          line-height: 46px
          font-size: 15px
          border-bottom: 1px dashed #888
          text-align: center
        .pop_foot
          text-align: center
          margin-top: 15px
          .btn
            height: 30px
            color: #fff
            font-size: 15px
            border-radius: 6px
            cursor: pointer
        &.desc_box
          width: 385px
          height: 485px
          .pop_content
            .desc_pic
              width: 100%
              height: 260px
              margin: 10px 0
              .carousel_item
                text-align: center
                position: relative
                .tag_wrapper
                  position: absolute
                  top: 0
                  left: 0
                  z-index: 10
            .desc_text
              height: 96px
              line-height: 16px
              font-size: 14px
              white-space: normal
              overflow-y: auto
          .pop_foot
            .close_btn
              width: 100px
              background: linear-gradient(to top, #DCA55E, #F3CB97)
        &.set_time_box
          width: 335px
          height: 225px
          .pop_content
            height: 115px
            padding: 0 15px
            .timing_item
              margin: 10px 0
              font-size: 15px
              line-height: 34px
              color: #777
              .active
                color: #342B2B
              .set_time_wrap
                .input
                  position: relative
                  top: -10px
                  width: 66px
                  height: 34px
          .pop_foot
            .btn
              width: 80px
              &.ok_btn
                background: linear-gradient(to top, #DCA55E, #F3CB97)
                margin-right: 20px
              &.cl_btn
                color: #777
                background: linear-gradient(to top, #AFAFAF, #E9E9E8)
</style>

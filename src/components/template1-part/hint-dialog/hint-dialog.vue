<template>
  <i-modal v-model="isShow" class="hint_dia_wrapper" :width="width">
    <div slot="header" class="header">
      <div class="text">提示</div>
    </div>
    <div slot="close" class="close" @click="hide">
      <i-icon type="close-round"></i-icon>
    </div>
    <div class="content" :style="{height:'310px'}">
      <ul class="hint_list">
        <li class="hint_item" v-for="(item,index) in hintsTem">
          <div class="icon_box">
            <span class="icon">{{index + 1}}</span>
          </div>
          <textarea
            :value="item.text"
            :class="{'active':item.active}"
            :placeholder="item.placeholder"
            :disabled="disabled"
            maxlength="100"
            ref="textarea"
            wrap="hard"
            @focus="focus(index)"
            @input="changeText(index)"
            @blur="blur(index)"
            @keyup="isMaxLength(index)"
            v-if="!disabled"
          ></textarea>
          <pre class="textarea" v-html="item.text" v-else></pre>
          <div class="del_box" v-if="!disabled">
            <a class="del_btn" @click="deleteItem(index)"></a>
          </div>
        </li>
      </ul>
      <div class="action_btn_box" v-if="!disabled">
        <a class="add_item_btn" @click="addItem">
          <i-icon type="android-add"></i-icon>
          <span class="text">增加提示</span>
        </a>
      </div>
    </div>
    <div slot="footer" class="footer">
      <a class="foot_btn" @click="save">保存</a>
      <a class="foot_btn" @click="hide">取消</a>
    </div>
  </i-modal>
</template>

<script>
  import IModal from 'iview/src/components/modal';
  import IIcon from 'iview/src/components/icon';
  import Message from 'iview/src/components/message';
  import $ from 'expose-loader?$!jquery';

  export default {
    props: {
      hints: {
        type: Array,
        default: []
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      width() {
        return window.innerWidth * 0.8;
      }
    },
    data() {
      return {
        hintsTem: [],
        isShow: false
      };
    },
    mounted() {
      let index = 0;
      do {
        let item = this.hints[index] || '';
        let placeholder = index > 0 ? '请输入100字以内的文本内容' : '可以使用【+增加提示】按钮增加下一个提示，最多9条';
        this.hintsTem.push({
          active: false,
          text: item,
          placeholder
        });
        index++;
      } while (index < this.hints.length);
    },
    methods: {
      show() {
        this.isShow = true;
      },
      hide() {
        this.isShow = false;
      },
      focus(index) {
        this.hintsTem[index].active = true;
      },
      changeText(index) {
        this.hintsTem[index].text = this.$refs.textarea[index].value;
      },
      blur(index) {
        this.hintsTem[index].active = false;
      },
      keyupEnter(index) {
        this.$refs.textarea[index].rows++;
      },
      isMaxLength(index) {
        if (this.hintsTem[index].text.length > 99) {
          $(this.$refs.textarea[index]).addClass('error');
          if (this.timer) clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            $(this.$refs.textarea[index]).removeClass('error');
          }, 3000);
        }
      },
      addItem() {
        if (this.hintsTem.length > 8) return;
        let placeholder = this.hintsTem.length < 1 ? '可以使用【+增加提示】按钮增加下一个提示，最多9条' : '请输入100字以内的文本内容';
        this.hintsTem.push({
          active: false,
          text: '',
          placeholder
        });
      },
      deleteItem(index) {
        this.hintsTem.splice(index, 1);
      },
      verify() {
        for (let i = 0; i < this.hintsTem.length; i++) {
          if (this.hintsTem[i].text.trim() === '') return 0;
        }
        return 1;
      },
      save() {
        if (this.verify()) {
          let ret = [];
          this.hintsTem.forEach((item, index) => {
            console.log(item.text);
            ret.push(item.text.trim());
          });
          this.$emit('setHint', ret);
          this.hide();
        } else {
          Message.error('提示信息不能为空！');
        }
      }
    },
    watch: {
      isShow(newVal) {
        if (!newVal) {
        }
      }
    },
    components: {
      IModal,
      IIcon,
      Message
    }
  };
</script>

<style scoped lang="stylus">
  .hint_dia_wrapper
    .header
      height: 40px
      line-height: 40px
      background: linear-gradient(to top, #B5803F, #DDAF6D);
      border-top-left-radius: 8px
      border-top-right-radius: 8px
      color: #4F310C
      padding-bottom: 1px
      border-bottom: 1px solid #524437
      .text
        height: 100%
        padding-left: 15px
        border-bottom: 1px dashed rgba(255, 255, 255, .3)
    .close
      color: #4F310C
      font-size: 18px
      line-height: 25px
      &:hover
        color: #ccc
    .content
      height: 430px
      background: url('/static/images/graphPaper.jpg')
      padding: 16px
      .hint_list
        max-height: 353px
        overflow-y: auto
        .hint_item
          display: flex
          padding: 5px 10px
          box-sizing: border-box
          &:hover
            background-color: #F1E3C7
          .icon_box
            height: 100%
            flex: 0 0 40px
            .icon
              display: block
              width: 20px
              height: 20px
              margin: 10px 10px
              line-height: 20px
              background: linear-gradient(to top, #DDA660, #F2C081)
              border-radius: 50%
              color: #000
              text-align: center
          textarea
            flex: 1
            font-size: 12px
            line-height: 23px
            border-radius: 5px
            border: 1px solid transparent
            padding: 0 10px
            background: none
            resize: none
            outline: none
            &.active
              border-color: #BFAA88
              box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .3) inset
              background: #fff
              resize: auto
            &.error
              animation: light 1s linear 0s 3
          .textarea
            flex: 1
            font-size: 12px
            line-height: 23px
            padding: 0 10px
          .del_box
            flex: 0 0 40px
            height: 100%
            .del_btn
              display: block
              width: 21px
              height: 21px
              background: url('/static/images/hint_del.png')
              background-size: contain
              margin-left: 10px

      .action_btn_box
        margin: 20px 0 0 40px
        .add_item_btn
          display: block
          width: 75px
          height: 25px
          line-height: 25px
          text-align: center
          border-radius: 3px
          background: linear-gradient(to top, #B5803F, #F1BF7D)
          color: #82553C
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, .3)
    .footer
      text-align: center
      .foot_btn
        display: inline-block
        margin: 0 60px
        width: 70px
        height: 25px
        line-height: 25px
        border-radius: 3px
        color: #82553C
        background: linear-gradient(to top, #B5803F, #F1BF7D)
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, .3)
        font-size: 12px
        &:hover
          background: linear-gradient(to top, #E9B46F, #F9CC91)

  @-webkit-keyframes light
    from
      box-shadow: 0 0 30px 0 #F75A46
    50%
      box-shadow: 0 0 0 0 #F75A46
    to
      box-shadow: 0 0 20px 0 #F75A46

</style>

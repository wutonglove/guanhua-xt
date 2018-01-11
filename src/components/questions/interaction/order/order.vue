<template>
  <mboard :mboard="mboard">
    <div id="order">
      <notepad class="topic_wrap">
        <div class="desc_box">
          <lucency-board class="desc_text">
            <input type="text" class="text_input" v-model="orderDes">
          </lucency-board>
          <lucency-board class="desc_resource">
            <div class="btns_wrap" v-show="isEmpty">
              <a href="javascript:void(0)"
                 class="insert_btn"
                 v-for="btn in insertBtns"
                 @click="showInsert(btn.role)"
              >
                <i-icon :type="btn.icon"></i-icon>
              </a>
            </div>
            <div class="resource_wrap" v-show="!isEmpty">
              <div class="resource" ref="resTgt"></div>
              <div class="res_ctrl" v-show="resCtrlShow" v-if="resourceType==='image'">
                <a href="javascript:void(0)" @click="rotateImg">
                  <i-icon type="forward"></i-icon>
                </a>
                <a href="javascript:void(0)" @click="refreshImg">
                  <i-icon type="android-refresh"></i-icon>
                </a>
                <a href="javascript:void(0)">
                  <i-icon type="qr-scanner">
                    <i-icon type="android-share"></i-icon>
                  </i-icon>
                </a>
                <a href="javascript:void(0)">
                  <i-icon type="qr-scanner">|</i-icon>
                </a>
                <a href="javascript:void(0)" @click="delImg">
                  <i-icon type="ios-trash"></i-icon>
                </a>
              </div>
              <div class="res_ctrl" v-show="resCtrlShow" v-else>
                <a href="javascript:void(0)" @click="delImg">
                  <i-icon type="ios-trash"></i-icon>
                </a>
              </div>
            </div>
          </lucency-board>
        </div>
      </notepad>
      <div class="options_wrap">
        <div class="btn_wrap">
          <tem-btn icon="plus" class="add" @click="addOption" v-show="options.length<8">添加一行</tem-btn>
        </div>
        <div class="list_wrap" ref="listWrap">
          <ul class="options_list">
            <li class="option_wrap" v-for="(option,index) in options">
              <input type="text" class="option_text" placeholder="请输入选项内容" v-model="option.text">
              <a href="javascript:void(0)" @click="delOption(index)">
                <i-icon class="del" type="trash-a" v-show="options.length>3"></i-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <insert-file-dialog></insert-file-dialog>
    <unfold></unfold>
  </mboard>
</template>

<script>
  import {tem1ComMixin} from 'common/js/mixin';
  import Notepad from 'components/template1-part/notepad/notepad';
  import LucencyBoard from 'components/template1-part/lucency-board/lucency-board';
  import TemBtn from 'components/template1-part/template1-btn/template1-btn';
  import InsertFileDialog from 'base/insertFile/insertFile';
  import Unfold from 'base/unfoldDialog/unfoldDialog';

  import IIcon from 'iview/src/components/icon';
  import Notice from 'iview/src/components/notice';

  import {mapMutations, mapGetters} from 'vuex';
  import $ from 'jquery';

  export default {
    mixins: [tem1ComMixin],
    mounted() {
      let _self = this;
      $(document)
        .on('click', '.resource>img', function () {
          if ($(this).data('type') !== 'image') return;
          if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            _self.resCtrlShow = false;
            _self.showCtrl = false;
          } else {
            $(this).addClass('active');
            _self.resCtrlShow = true;
            _self.showCtrl = true;
          }
        })
        .on('mousewheel', '.resource', function (e) {
          let $this = $('.resource>img.active').eq(0);
          if ($this.length < 1) return;
          let _transform = $this.css('transform') === 'none' ? '' : $this.css('transform');
          if (e.originalEvent.wheelDelta > 0) {
            $this.css({
              transform: `${_transform} scale(1.1)`
            });
          } else {
            $this.css({
              transform: `${_transform} scale(0.9)`
            });
          }
        });
    },
    data() {
      return {
        orderDes: '请根据所给的信息对下列选项进行排序',
        insertBtns: [
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
        options: [
          {
            text: ''
          },
          {
            text: ''
          },
          {
            text: ''
          }
        ],
        isEmpty: true,
        resCtrlShow: false,
        resourceType: 'image'
      };
    },
    computed: {
      ...mapGetters([
        'fileDialogInfo'
      ])
    },
    methods: {
      showInsert(role) {
        this.setTargetDom(this.$refs.resTgt);
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
      addOption() {
        this.options.push({
          text: ''
        });
        this.$nextTick(() => {
          let list = this.$refs.listWrap;
          list.scrollTop = list.scrollHeight;
        });
      },
      delOption(index) {
        this.options.splice(index, 1);
      },
      rotateImg() {
        let $img = $('.resource>img');
        let _style = $img.css('transform') === 'none' ? '' : $img.css('transform');
        $img.css({transform: `${_style} rotate(90deg)`});
      },
      refreshImg() {
        let $img = $('.resource>img');
        $img.css('transform', 'none');
      },
      delImg() {
        let $img = $('.resource>img');
        $img.remove();
        this.isEmpty = true;
      },
      getQuestionData(urlSnippet) {
        let options = [];

        this.options.forEach((item) => {
          options.push(item.text);
        });
        let $resourceDOM = $(this.$refs.resTgt).find('img');
        let resource = null;
        let _resource = null;
        if ($resourceDOM.length > 0) {
          resource = {
            type: $resourceDOM.data('type'),
            cssStyle: $resourceDOM.css('transform') || '',
            src: urlSnippet + $resourceDOM.data('name')
          };
          _resource = Object.assign({}, resource, {
            src: $resourceDOM.data('src')
          });
        }

        let questionData = {
          title: document.title,
          orderDes: this.orderDes,
          options,
          resource,
          questionType: 'order'
        };
        let localData = Object.assign({}, questionData, {
          resource: _resource
        });
        return {
          questionData,
          localData
        };
      },
      verifyHandle() {
        if (this.options.length < 3 || this.options.length > 8) return -1;
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].text === '') return -2;
        }
        return 1;
      },
      showMessage() {
        let res = this.verifyHandle();
        let desc = '';
        if (res === 1) {
          return 1;
        } else if (res === -1) {
          desc = '排序想最少3个，最多8个';
        } else if (res === -2) {
          desc = '选项不能为空';
        }
        Notice.destroy();
        Notice.warning({
          desc
        });
        return 0;
      },
      ...mapMutations({
        setFileDia: 'SET_FILEDIALOGINFO',
        setTargetDom: 'SET_TARGETDOM'
      })
    },
    watch: {
      fileDialogInfo: {
        deep: true,
        handler(newVal) {
          this.isEmpty = $(this.$refs.resTgt).children().length === 0;
          if (!this.isEmpty) {
            this.resourceType = $(this.$refs.resTgt).children('img').data('type');
          }
        }
      },
      orderDes(newVal) {
        if (newVal === '') {
          this.orderDes = '请根据所给的信息对下列选项进行排序';
        }
      }
    },
    components: {
      Notepad,
      LucencyBoard,
      IIcon,
      TemBtn,
      InsertFileDialog,
      Unfold
    }
  };
</script>

<style lang="stylus">
  #order
    width: 100%
    height: 100%
    display: flex
    padding: 20px 10px 15px
    .topic_wrap
      flex: 1
      margin-right: 20px
      .desc_box
        width: 100%
        height: 100%
        display: flex
        flex-direction: column
        padding: 10px
        .desc_text
          flex: 0 0 110px
          margin-bottom: 10px
          max-height: 110px
          .text_input
            background: none
            border: none
            outline: none
            line-height: 110px
            width: 100%
            padding: 0 15px
        .desc_resource
          flex: 1
          overflow: hidden
          padding: 1px
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
              img
                max-width: 100%
                max-height: 100%
                border: 2px solid transparent
                &.active
                  border-color: #FF6F3E
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
    .options_wrap
      flex: 1
      background-color: rgba(255, 255, 255, .15)
      border-radius: 10px
      display: flex
      flex-direction: column
      .btn_wrap
        flex: 0 0 45px
        .add
          margin: 15px 0 0 20px
      .list_wrap
        flex: 1
        overflow-y: auto
        .options_list
          width: 100%
          min-height: 100%
          display: flex
          flex-direction: column
          justify-content: center
          padding: 10px 20px
          .option_wrap
            flex: 0 0 54px
            margin: 10px
            border: 2px solid #CDBA9B
            border-top-width: 4px
            border-top-color: #D7AF71
            border-top-left-radius: 12px
            border-top-right-radius: 12px
            border-bottom-right-radius: 8px
            border-bottom-left-radius: 8px
            box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, .3)
            position: relative
            .del
              position: absolute
              top: 2px
              right: 2px
              font-size: 20px
              width: 26px
              height: 26px
              line-height: 24px
              text-align: center
              background-color: rgba(0, 0, 0, .65)
              color: #D1D1D1
              border-radius: 3px
              border-top-right-radius: 7px
              display: none
            &:hover
              .del
                display: block
            input
              width: 100%
              line-height: 44px
              border: 2px solid #7C5B30
              padding: 0 15px
              border-radius: 8px
              box-sizing: border-box
              &:focus
                border-color: #F14410
</style>

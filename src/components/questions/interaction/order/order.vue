<template>
  <mboard :mboard="mboard">
    <div id="order">
      <side-bd class="topic_wrap"
               :resource="file"
               :desc="orderDes"
               @change-desc="changeDesc"
               @change-resource="changeResource"
               @del-resource="delResource"
      ></side-bd>
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
    <unfold></unfold>
    <insert-file-dialog @on-insert="insert"></insert-file-dialog>
  </mboard>
</template>

<script>
  import {tem1ComMixin} from 'common/js/mixin';
  import TemBtn from 'components/template1-part/template1-btn/template1-btn';
  import InsertFileDialog from 'base/insertFile/insertFile';
  import Unfold from 'base/unfoldDialog/unfoldDialog';

  import SideBd from 'components/template1-part/side-bd/side-bd';

  import IIcon from 'iview/src/components/icon';
  import Notice from 'iview/src/components/notice';

  export default {
    mixins: [tem1ComMixin],
    data() {
      return {
        orderDes: '请根据所给的信息对下列选项进行排序',
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
        file: null,
        resource: null
      };
    },
    methods: {
      changeResource(val) {
        this.resource = val;
      },
      changeDesc(val) {
        this.orderDes = val;
      },
      insert(file) {
        this.file = file;
      },
      delResource() {
        this.file = null;
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
      getQuestionData(urlSnippet) {
        let options = [];

        this.options.forEach((item) => {
          options.push(item.text);
        });

        let resource, _resource;
        if (this.resource) {
          resource = {
            type: this.resource.type,
            cssStyle: this.resource.cssStyle,
            src: urlSnippet + this.resource.name
          };
          _resource = {
            type: this.resource.type,
            cssStyle: this.resource.cssStyle,
            src: this.resource.src
          };
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
      }
    },
    watch: {
      orderDes(newVal) {
        if (newVal === '') {
          this.orderDes = '请根据所给的信息对下列选项进行排序';
        }
      }
    },
    components: {
      IIcon,
      TemBtn,
      InsertFileDialog,
      Unfold,
      SideBd
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
    /*
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
        */
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

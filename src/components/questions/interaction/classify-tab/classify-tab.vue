<template>
  <mboard :mboard="mboard">
    <div id="classify-tab">
      <div class="top_box">
        <side-bd class="left_box"
                 :resource="file"
                 :desc="desc"
                 @change-desc="changeDesc"
                 @change-resource="changeResource"
                 @del-resource="delResource"
        ></side-bd>
        <div class="right_box">
          <ul class="tds_title">
            <li class="td_title">
              <input type="text" maxlength="10">
            </li>
            <li class="add_td">
              <btn class="btn" icon="plus-round"></btn>
            </li>
          </ul>
          <div class="content">
            <ul class="trs_title">
              <li class="tr_title">
                <textarea maxlength="5"></textarea>
              </li>
              <li class="add_tr">
                <btn class="btn" icon="plus-round"></btn>
              </li>
            </ul>
            <ul class="table">
              <li class="tr">
                <div class="td"></div>
                <div class="td"></div>
              </li>
              <li class="tr">
                <div class="td"></div>
                <div class="td"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="options_wrap"></div>
        <i-icon class="add_icon" type="plus-round"></i-icon>
      </div>
    </div>
    <unfold></unfold>
    <insert-file-dialog @on-insert="insert"></insert-file-dialog>
  </mboard>
</template>

<script>
  import InsertFileDialog from 'base/insertFile/insertFile';
  import Unfold from 'base/unfoldDialog/unfoldDialog';
  import SideBd from 'components/template1-part/side-bd/side-bd';
  import Btn from 'components/template1-part/template1-btn/template1-btn';
  import IIcon from 'iview/src/components/icon';

  import {tem1ComMixin} from 'common/js/mixin';

  export default {
    mixins: [tem1ComMixin],
    data() {
      return {
        desc: '请将下列选项拖入相应的表格内',
        file: null,
        resource: null,
        table: []
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
      }
    },
    components: {
      InsertFileDialog,
      Unfold,
      SideBd,
      Btn,
      IIcon
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../../common/stylus/mixin.styl'
  #classify-tab
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    .top_box
      flex: 1
      display: flex
      margin: 10px
      .left_box
        flex: 1
      .right_box
        flex: 2
        border: 5px solid #E4B772
        margin-left: 10px
        border-radius: 8px
        display: flex
        flex-direction: column
        font-size: 12px
        color: #5D3B12
        .tds_title
          flex: 0 0 36px
          height: 36px
          bg-image('./table_lie_bg.png')
          background-size: 100% 100%
          padding-left: 65px
          position: relative
          .td_title
            input
              width: 75px
              height: 30px
              line-height: 30px
              box-shadow: 0 3px 10px 0 rgba(0, 0, 0, .4) inset
              background-color: #E6A962
              border: none
              border-radius: 4px
          .add_td
            position: absolute
            right: 5px
            top: 3px
            width: 28px
            height: 28px
            .btn
              width: 100%
              height: 100%
              font-size: 24px
              padding: 0
              line-height: 28px
              text-align: center
              border: 1px solid #8F541A
        .content
          flex: 1
          display: flex
          .trs_title
            flex: 0 0 65px
            width: 65px
            bg-image('./table_lie_bg.png')
            background-size: 100% 100%
            position: relative
            .tr_title
              width: 100%
              padding: 0 5px
              &:first-child
                margin-top: 10px
              textarea
                width: 100%
                height: 35px
                box-shadow: 0 3px 10px 0 rgba(0, 0, 0, .4) inset
                background-color: #E6A962
                border: none
                border-radius: 4px
                padding: 4px
                resize: none
                outline: none
            .add_tr
              position: absolute
              left: 5px
              bottom: 0
              width: 55px
              height: 28px
              .btn
                width: 100%
                height: 100%
                font-size: 24px
                padding: 0
                line-height: 28px
                text-align: center
                border: 1px solid #8F541A
          .table
            flex: 1
            display: flex
            flex-direction: column
            .tr
              flex: 1
              display: flex
              &:not(:last-child)
                border-bottom: 5px solid #D5A464
              .td
                flex: 1
                box-shadow: -3px -3px 15px 0 rgba(0, 0, 0, .2) inset
                &:not(:last-child)
                  border-right: 5px solid #D5A464
    .footer
      flex: 0 0 70px
      height: 70px
      margin: 0 20px 10px
      background-color: #93662B
      display: flex
      .options_wrap
        flex: 1
      .add_icon
        width: 50px
        height: 100%
        line-height: 70px
        font-size: 45px
        color: #C5AD8E
        text-align: center
        cursor: pointer
</style>

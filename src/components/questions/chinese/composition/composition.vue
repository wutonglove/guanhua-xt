<template>
  <div class="composition_wrap">
    <Cnt :isMandatory="true" name="作文题目" v-show="titleType==='proposition'">
      <div class="div_input"
           data-duty="compositionTitle"
           contenteditable="true"
           spellcheck="false"
      ></div>
    </Cnt>

    <Cnt :isMandatory="true" name="要求" class="com_desc_wrap">
      <i-radio-group v-model="titleType" class="title_type">
        <i-radio label="proposition" class="fsz">命题作文</i-radio>
        <i-radio label="self" class="fsz">自拟标题</i-radio>
      </i-radio-group>
      <div class="div_input com_desc"
           data-duty="com_desc"
           contenteditable="true"
           placeholder="11"
           spellcheck="false"
      ></div>
    </Cnt>

    <Cnt :isMandatory="true" name="作文纸选择" class="page_type_wrap">
      <i-radio-group v-model="pageType" class="page_type">
        <i-radio :label="item.code" v-for="(item,index) in pages" :key="'item'+index" class="type_item">
          <div class="item_thum"><img :src="item.thum" alt=""></div>
          <div class="item_tt">{{item.title}}</div>
        </i-radio>
      </i-radio-group>
    </Cnt>

    <Cnt name="参考素材" class="asset_wrap">
      <i-tabs type="card" @on-tab-remove="delAsset" @on-click="addAsset">
        <i-tab-pane :label="renderTab(asset)"
                    v-for="(asset,index) in assets"
                    :key="'asset' + index"
        >
          <div class="asset_content div_input" contenteditable="true" spellcheck="false">test</div>
        </i-tab-pane>
        <i-tab-pane label="+"></i-tab-pane>
      </i-tabs>
    </Cnt>
  </div>
</template>

<script>
  import IRadio from 'iview/src/components/radio';
  import IRadioGroup from 'iview/src/components/radio/radio-group';
  import ITabs from 'iview/src/components/tabs';
  import ITabPane from 'iview/src/components/tabs/pane';
  import IIcon from 'iview/src/components/icon';

  import Cnt from 'components/general-part/cnt-module/cnt-module';

  import page1 from './page01.png';
  import page2 from './page02.png';
  import page3 from './page03.png';
  import page4 from './page04.png';
  import {verifyMixin} from 'common/js/mixin';

  export default {
    mixins: [verifyMixin],
    data() {
      return {
        titleType: 'proposition',
        pages: [
          {
            thum: page1,
            code: 0,
            title: '米字格'
          },
          {
            thum: page2,
            code: 1,
            title: '方格本'
          },
          {
            thum: page3,
            code: 2,
            title: '田字格'
          },
          {
            thum: page4,
            code: 3,
            title: '横线本'
          }
        ],
        pageType: 0,
        tab0: true,
        assets: [
          {
            title: '素材1',
            active: true,
            titleEdit: false,
            content: ''
          },
          {
            title: '素材2',
            titleEdit: false,
            content: ''
          }
        ]
      };
    },
    methods: {
      addAsset() {
        console.log(1);
      },
      delAsset() {
      },
      editAssetName() {
        console.log('eidt-tile');
      },
      renderTab(tab) {
        let h = this.$createElement;
        let titleDom = h('span', {
          style: {
            display: 'inline-block',
            width: '180px',
            textAlign: 'center'
          },
          domProps: {
            innerHTML: tab.title
          }
        });

        h('input', {
          style: {
            border: '1px solid #3B84EC',
            width: '180px'
          }
        });

        return () => {
          return h(
            'span',
            [
              h(IIcon, {
                props: {
                  type: 'edit'
                },
                nativeOn: {
                  click: this.editAssetName
                }
              }),
              titleDom,
              h(IIcon, {
                props: {
                  type: 'close',
                  color: '#ccc'
                },
                nativeOn: {
                  click: this.delAsset
                }
              })
            ]);
        };
      }
    },
    components: {
      IRadio,
      IRadioGroup,
      ITabs,
      ITabPane,
      Cnt
    }
  };
</script>

<style scoped lang="stylus">
  .composition_wrap
    margin-top: 50px
    .com_desc_wrap
      position: relative
      .com_desc
        min-height: 150px
      .title_type
        position: absolute
        top: 10px
        left: 80px
        .fsz
          font-size: 16px
    .page_type_wrap
      .page_type
        .type_item
          position: relative
          height: 140px
          width: 180px
          margin: 10px 0
          text-align: center
          font-size: 15px
          .item_tt
            height: 36px
            line-height: 36px
    .asset_wrap
      .asset_content
        width: 100%
        min-height: 180px
        padding: 10px
        border: 1px solid #dddee1
        border-top-color: transparent
        outline: none
        &:focus
          border-color: #DF8B52
</style>

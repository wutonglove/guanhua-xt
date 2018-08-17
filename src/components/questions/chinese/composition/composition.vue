<template>
  <div class="composition_wrap">
    <Cnt :required="true" name="作文题目" v-show="titleType==='proposition'">
      <ue class="input_box" v-model="qsData.comTitle"></ue>
    </Cnt>

    <Cnt :required="true" name="要求" class="com_desc_wrap" :mheight="140">
      <i-radio-group v-model="titleType" class="title_type" @on-change="change">
        <i-radio label="proposition" class="fsz">命题作文</i-radio>
        <i-radio label="self" class="fsz">自拟标题</i-radio>
      </i-radio-group>
      <ue class="input_box" v-model="qsData.description" :config="{initialFrameHeight: 140}"></ue>
    </Cnt>

    <Cnt :required="true" name="作文纸选择" class="page_type_wrap">
      <i-radio-group v-model="qsData.pageType" class="page_type">
        <i-radio :label="item.title" v-for="(item,index) in pages" :key="'item'+index" class="type_item">
          <div class="item_thum"><img :src="item.thum" alt=""></div>
          <div class="item_tt">{{item.title}}</div>
        </i-radio>
      </i-radio-group>
    </Cnt>

    <Cnt name="参考素材" class="asset_wrap" :mheight="180">
      <i-tabs type="card" ref="assetTab">
        <i-tab-pane :label="renderTab(asset)"
                    v-for="(asset,index) in qsData.assets"
                    :key="'asset' + index"
        >
          <ue class="input_box" ref="asset" v-model="asset.content" :config="{initialFrameHeight: 140}"></ue>          
        </i-tab-pane>
        <i-button class="tab_add_btn" slot="extra" size="small" @click="addAsset">+</i-button>
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
import IButton from 'iview/src/components/button';
import ITooltip from 'iview/src/components/tooltip';

import Cnt from 'components/general-part/cnt-module/cnt-module';
import Ue from 'base/ueditor/ueditor';

import page1 from './page01.png';
import page2 from './page02.png';
import page3 from './page03.png';
import page4 from './page04.png';
import { generalMixin } from 'common/js/mixin';
import { replaceSrc } from 'utils/utilities';

class Asset {
  constructor(tabTitle = '素材') {
    this.id = Symbol();
    this.tabTitle = tabTitle;
    this.active = true;
    this.titleEdit = false;
    this.content = `<br/>点击【${String.fromCharCode(
      9998
    )}】编辑标题，点击【${String.fromCharCode(
      10005
    )}】删除素材，点击【+】添加素材`;
  }
}

export default {
  mixins: [generalMixin],
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
      ]
    };
  },
  mounted() {
    // this.initAssetContent();
  },
  computed: {},
  methods: {
    initQsData() {
      return (this.qsData = {
        comTitle: '',
        description: '',
        pageType: '米字格',
        assets: [new Asset('素材1'), new Asset('素材2')]
      });
    },
    addAsset() {
      let code = this.createCode();
      this.qsData.assets.push(new Asset('素材' + code));
      this.$nextTick(() => {
        this.$refs.assetTab.handleChange(code - 1);
      });
    },
    delAsset(index) {
      this.qsData.assets.splice(index, 1);
      this.upDateTab();
    },
    renderTab(tab) {
      let h = this.$createElement;
      /* eslint-disable indent */
      let titleDom = tab.titleEdit
        ? h('input', {
            class: {
              cl_rg_hook: true
            },
            style: {
              width: '180px',
              padding: '0 3px',
              border: '1px solid #7CADF2',
              borderRadius: '2px'
            },
            attrs: {
              value: tab.tabTitle
            },
            on: {
              blur: () => {
                tab.titleEdit = false;
              },
              change: e => {
                if (e.target.value.trim() !== '') {
                  tab.tabTitle = e.target.value;
                }
              }
            }
          })
        : h('span', {
            style: {
              display: 'inline-block',
              width: '180px',
              textAlign: 'center'
            },
            domProps: {
              innerHTML: tab.tabTitle
            }
          });
      return () => {
        return h('span', [
          h(IIcon, {
            props: {
              type: 'edit'
            },
            nativeOn: {
              click: () => {
                tab.titleEdit = true;
              }
            }
          }),
          titleDom,
          h(IIcon, {
            props: {
              type: 'close',
              color: '#ccc'
            },
            nativeOn: {
              click: () => {
                let index = this.qsData.assets.indexOf(tab);
                this.delAsset(index);
              },
              mouseover: e => {
                e.target.style.color = '#000';
              },
              mouseout: e => {
                e.target.style.color = '#ccc';
              }
            }
          })
        ]);
      };
    },
    upDateTab() {
      this.qsData.assets.forEach((item, index) => {
        this.$refs.asset[index].setContent(item.content);
      });
    },
    createCode() {
      let list = this.qsData.assets;
      let codeList = [];
      /* eslint-disable no-unused-vars */
      for (let [key, value] of list.entries()) {
        let code = value.tabTitle.match(/^素材(\d+?)$/);
        code = code ? code[1] : '';
        if (code !== '') {
          codeList.push(code * 1);
        }
      }
      codeList = codeList.sort((a, b) => {
        return a - b;
      });
      for (let [key, value] of codeList.entries()) {
        if (key + 1 < value) {
          return key + 1;
        }
      }
      return codeList.length + 1;
    },
    change() {
      this.$emit('validate', Boolean(Math.min.apply(Math, this.validate())));
    },
    getQuestionData(urlSnippet) {
      let _comTitle = '';
      if (this.titleType === 'proposition') {
        _comTitle = this.qsData.comTitle.trim();
      }
      let _description = this.qsData.description.trim();

      let _assets = this.qsData.assets.map(item => {
        return Object.assign({}, item, {
          content: replaceSrc(item.content, urlSnippet)
        });
      });

      let questionData = {
        title: document.title,
        comTitle: replaceSrc(_comTitle, urlSnippet),
        description: replaceSrc(_description, urlSnippet),
        pageType: this.qsData.pageType,
        assets: _assets,
        questionType: 'composition'
      };
      let localData = {
        title: document.title,
        comTitle: replaceSrc(_comTitle),
        description: replaceSrc(_description),
        pageType: this.qsData.pageType,
        assets: this.qsData.assets,
        questionType: 'composition'
      };
      return {
        questionData,
        localData
      };
    },
    validate() {
      if (this.titleType === 'proposition') {
        if (this.qsData.comTitle.trim() === '') {
          return [false];
        }
      }
      if (this.qsData.description.trim() === '') {
        return [false];
      }
      if (!this.qsData.pageType) {
        return [false];
      }
      return [true];
    }
  },
  components: {
    IRadio,
    IRadioGroup,
    ITabs,
    ITabPane,
    IButton,
    Cnt,
    ITooltip,
    Ue
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
      min-height: 180px
      padding: 10px
      border: 1px solid #dddee1
      border-top-color: transparent
      outline: none
      &:focus
        border-color: #DF8B52
    .tab_add_btn
      font-size: 20px
      padding: 0 20px
      border-bottom-color: #fff
</style>

<template>
  <mboard :mboard="mboard">
    <ul id="classify">
      <li class="category_wrap" v-for="(category, index) in categories" :key="index">
        <div class="title_wrap">
          <input class="title" type="text" :style="{width: category.title.length*13+20+'px'}" maxlength="30"
                 v-model="category.title" placeholder="请输入分类名称"/>
          <span class="title_len">{{category.title.length}}/30</span>
        </div>
        <div class="content">
          <ul class="content_wrap" :style="{'justify-content': category.cnt.length<1?'center':'flex-start'}">
            <li class="option_wrap" v-for="(item,subi) in category.cnt" :key="subi">
              <img class="insertFile_hook" :data-name="item.desc.name" v-if="item.desc && item.type==='image'" :src="item.desc&&item.desc.src" alt=""
                   @click="showInDlog(index, subi)">
              <textarea v-else-if="item.type==='text'" maxlength="15" v-model="item.desc"></textarea>
              <a href="javascript:void(0)" class="del_btn" @click="delOption(index, subi)">
                <i-icon type="trash-a"></i-icon>
              </a>
            </li>
            <li class="add_wrap" v-show="category.cnt.length<6">
              <span class="add_icon">
                <btn class="icon" icon="images" @click="addImg(index)"></btn>
              </span>
              <span class="add_icon">
                <btn class="icon" icon="document-text" @click="addText(index)"></btn>
              </span>
            </li>
          </ul>
        </div>
        <div class="footer">
          <btn v-show="categories.length>2" @click="delCategory(index)">删除本栏</btn>
        </div>
      </li>
    </ul>
    <!-- 添加大类 -->
    <btn class="add_category" :style="{'border-color':'#8f541a'}" icon="plus-round" v-show="categories.length<4"
         @click="addCategory"></btn>
    <insert-file-dialog @on-insert="insert"></insert-file-dialog>
    <unfold></unfold>
  </mboard>
</template>

<script>
  import IIcon from 'iview/src/components/icon';
  import Btn from 'components/template1-part/template1-btn/template1-btn';
  import InsertFileDialog from 'base/insertFile/insertFile';
  import Notice from 'iview/src/components/notice';
  import Unfold from 'base/unfoldDialog/unfoldDialog';

  import {mapMutations} from 'vuex';
  import {tem1ComMixin} from 'common/js/mixin';

  class Category {
    constructor() {
      this.title = '';
      this.cnt = [];
    }
  }

  class Option {
    constructor(type) {
      this.type = type;
      this.desc = null;
    }
  }

  export default {
    mixins: [tem1ComMixin],
    data() {
      return {
        categories: [new Category(), new Category()]
      };
    },
    methods: {
      addImg(index) {
        this.categories[index].cnt.push(new Option('image'));
        this.showInDlog(index);
      },
      addText(index) {
        this.categories[index].cnt.push(new Option('text'));
      },
      addCategory() {
        this.categories.push(new Category());
      },
      delOption(index, subi) {
        this.categories[index].cnt.splice(subi, 1);
      },
      delCategory(index) {
        this.categories.splice(index, 1);
      },
      showInDlog(i, subi) {
        this.setFileDia({
          name: '插入图片',
          type: 'image',
          status: true
        });
        this.curI = i;
        this.cursubI = subi;
      },
      insert(file) {
        if (!this.cursubI) {
          this.cursubI = this.categories[this.curI].cnt.length - 1;
        }
        let desc = this.categories[this.curI].cnt[this.cursubI].desc;
        this.categories[this.curI].cnt[this.cursubI].desc = Object.assign({}, desc, {
          src: file.objURL,
          name: file.name
        });
        this.cursubI = null;
      },
      getQuestionData(urlSnippet) {
        let localData = {
          title: document.title,
          categories: this.categories,
          questionType: this.$route.path.split('/')[3]
        };
        let _categories = [];
        this.categories.forEach((category, index) => {
          _categories.push({
            title: category.title,
            cnt: category.cnt.slice()
          });
          category.cnt.forEach((item, subi) => {
            if (item.type === 'image') {
              _categories[index].cnt[subi] = Object.assign({}, item, {
                type: 'image',
                desc: {
                  src: urlSnippet + item.desc.name,
                  name: item.desc.name
                }
              });
            }
          });
        });
        let questionData = Object.assign({}, localData, {categories: _categories});
        return {
          questionData,
          localData
        };
      },
      verifyHandle() {
        let titles = [];
        let arr = this.categories;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].cnt.length < 1) return -1;
          if (arr[i].title === '') return -2;
          if (titles.indexOf(arr[i].title) === -1) {
            titles.push(arr[i].title);
          } else {
            return -3;
          }
        }
        return 1;
      },
      showMessage() {
        let res = this.verifyHandle();
        let desc = '';
        if (res === 1) {
          return 1;
        } else if (res === -1) {
          desc = '每一个分类至少添加一个分类选项';
        } else if (res === -2) {
          desc = '分类项名称不能为空';
        } else if (res === -3) {
          desc = '分类项名称不能重复';
        }
        Notice.destroy();
        Notice.warning({
          desc
        });
        return 0;
      },
      ...mapMutations({
        setFileDia: 'SET_FILEDIALOGINFO'
      })
    },
    components: {
      IIcon,
      Btn,
      InsertFileDialog,
      Unfold
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../../common/stylus/mixin.styl'

  #classify
    width: 100%
    height: 100%
    display: flex
    position: relative
    .category_wrap
      flex: 1
      height: 100%
      position: relative
      &:not(:last-child)
        border-right: 10px solid #EFBC7C
      .title_wrap
        padding-top: 50px
        width: 100%
        text-align: center
        .title
          display: inline-block
          min-width: 120px
          max-width: 100%
          background: linear-gradient(to top, #DDA966, #F5C78B)
          border: 1px solid #8C5D25
          padding: 10px
          border-radius: 10px
          text-align: center
          font-size: 12px
        .title_len
          font-size: 12px
          position: relative
          top: 10px
      .content
        position: absolute
        top: 95px
        bottom: 30px
        left: 0
        width: 100%
        .content_wrap
          center()
          width: 100%
          max-width: 210px
          display: flex
          flex-wrap: wrap
          align-items: center
          li
            flex: 0 0 90px
            height: 50px
            border-radius: 3px
            margin: 5px
            border: 1px solid #8B581B
            &.add_wrap
              color: #8B581B
              text-align: center
              padding-top: 8px
              .icon
                width: 30px
                height: 30px
                font-size: 20px
                padding: 0
                line-height: 30px
                background-color: #efbc7a
            &.option_wrap
              background-color: rgba(0, 0, 0, .3)
              font-size: 12px
              position: relative
              img, textarea
                width: 100%
                height: 100%
              textarea
                resize: none
                padding: 4px
                text-align: center
                outline: none
              .del_btn
                display: none
                position: absolute
                top: 1px
                right: 1px
                width: 20px
                height: 20px
                line-height: 20px
                border-bottom-left-radius: 5px
                color: #fff
                text-align: center
                background-color: rgba(0, 0, 0, .6)
              &:hover
                .del_btn
                  display: block

      .footer
        width: 100%
        position: absolute
        bottom: 0
        left: 0
        text-align: center
        padding-bottom: 5px

  .add_category
    position: absolute
    top: -30px
    right: -3px
    font-size: 16px
    z-index: 1000
    color: #8f541a
</style>

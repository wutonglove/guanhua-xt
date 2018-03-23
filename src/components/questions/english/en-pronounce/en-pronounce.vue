<template>
  <mboard :mboard="mboard">
    <div id="en_pronounce">
      <div contenteditable class="textarea" ref="textarea"></div>
      <div class="resource_wrap">
        <tem1-btn v-show="!resource" @click="showInsert">添加标准读音</tem1-btn>
        <div class="resource_desc" v-show="resource">
          <span class="name">{{resource ? resource.original.name : ''}}</span>
          <tem1-btn class="btn" @click="paly">试听</tem1-btn>
          <tem1-btn class="btn" @click="showInsert">重新添加</tem1-btn>
          <tem1-btn class="btn" @click="delResource">删除</tem1-btn>
        </div>
        <div class="resource" style="display:none">
          <audio :src="resource?resource.resource:''" class="insertFile_hook" :data-name="resource?resource.name:''" ref="resource">您的浏览器不支持audio</audio>
        </div>
      </div>
    </div>
    <insert-file-dialog @on-insert="insert"></insert-file-dialog>
    <unfold></unfold>
  </mboard>
</template>

<script>
  import IInput from 'iview/src/components/input';

  import Tem1Btn from 'components/template1-part/template1-btn/template1-btn';
  import InsertFileDialog from 'base/insertFile/insertFile';
  import Unfold from 'base/unfoldDialog/unfoldDialog';

  import Notice from 'iview/src/components/notice';

  import {tem1ComMixin} from 'common/js/mixin';
  import {mapMutations} from 'vuex';

  export default {
    mixins: [tem1ComMixin],
    data() {
      return {
        resource: null,
        article: ''
      };
    },
    methods: {
      showInsert() {
        if (!this.$refs.resource.paused) {
          this.$refs.resource.pause();
        }
        this.setFileDia({
          name: '插入音频',
          type: 'audio',
          status: true
        });
      },
      insert(file) {
        this.resource = file;
      },
      delResource() {
        this.resource = null;
      },
      paly() {
        if (this.$refs.resource.paused) {
          this.$refs.resource.play();
        } else {
          this.$refs.resource.pause();
        }
      },
      getQuestionData(urlSnippet) {
        let resource, _resource;
        if (this.resource) {
          resource = {
            name: this.resource.original.name,
            source: urlSnippet + this.resource.name
          };
          _resource = {
            name: this.resource.original.name,
            source: this.resource.resource
          };
        }
        let questionData = {
          title: document.title,
          resource,
          article: this.article,
          questionType: 'en-pronounce'
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
        this.article = this.$refs.textarea.innerText.trim();
        if (this.article.trim().length < 1) return -1;
        if (/[\u4E00-\u9FA5]/g.test(this.article)) return -4;
        if (this.article.split(' ').length < 15) return -2;
        if (/[^!?.]$/.test(this.article)) return -3;
        return 1;
      },
      showMessage() {
        let res = this.verifyHandle();
        let desc = '';
        if (res === 1) {
          return 1;
        } else if (res === -1) {
          desc = '篇章内容不能为空';
        } else if (res === -2) {
          desc = '为了保证评测效果，请输入至少15个单词的篇章';
        } else if (res === -3) {
          desc = '英语篇章缺少结束的标点符号';
        } else if (res === -4) {
          desc = '请输入正确的英文格式';
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
      IInput,
      Tem1Btn,
      InsertFileDialog,
      Unfold
    }
  };
</script>

<style lang="stylus">
  #en_pronounce
    width: 770px
    height: 100%
    margin: 0 auto
    .textarea
      margin: 30px 0 10px
      height: 210px
      width: 100%
      padding: 10px 15px
      border-radius: 6px
      line-height: 24px
      overflow-y: auto
      position: relative
      z-index: 10
      background-color: #fff
    .resource_wrap
      padding-left: 20px
      .resource_desc
        color: #5D3B12
        .btn
          margin: 0 15px
</style>

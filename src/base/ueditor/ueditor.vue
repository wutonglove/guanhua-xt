<template>
  <div>
    <script :id="id" ref="UEditor" type="text/plain">{{text}}</script>
  </div>
</template>

<script>
import '../../../static/plugs/UE/umeditor.config.js';
import '../../../static/plugs/UE/umeditor.min.js';
import '../../../static/plugs/UE/lang/zh-cn/zh-cn.js';
// import '../../../static/plugs/UE/ueditor.parse.min.js';

import { mapMutations } from 'vuex';

export default {
  name: 'editor',
  props: {
    config: {
      type: Object,
      default: null
    },
    text: String
  },
  model: {
    prop: 'text',
    event: 'change'
  },
  data() {
    return {
      id: ''
    };
  },
  computed: {
    _config() {
      let config = {
        toolbar: [],
        imageScaleEnabled: false, // 图片缩放
        pasteplain: true, // 粘贴纯文本
        elementPathEnabled: false, // 元素路径
        wordCount: false, // 数字统计
        minFrameHeight: 40, // 最小高度
        initialFrameWidth: 878,
        initialFrameHeight: 40, // 初始化高度
        allowDivTransToP: false, // 外部进入的div换成p
        enableAutoSave: false
      };
      if (this.config) {
        Object.assign(config, this.config);
      }
      return config;
    }
  },
  mounted() {
    /* eslint-disable no-undef */
    this.id =
      Math.random()
        .toString()
        .replace('.', '') + Date.now();
    this.$nextTick(() => {
      this.editor = UM.getEditor(this.id, this._config);

      this.editor.addListener('focus', () => {
        this.setEditor(this.id);
        this.$emit('focus', this.editor);
      });
      this.editor.addListener('blur', () => {
        this.$emit('blur');
      });
      this.editor.addListener('contentChange', () => {
        let value = this.editor.getContent();
        this.$emit('change', value);
      });
      // this.editor.addListener('afterExecCommand', () => {
      //   this.editor.selection.clearRange();
      // });
    });
  },
  methods: {
    getEditor() {
      return this.editor;
    },
    setContent(value) {
      if (!this.editor) return;
      this.editor.setContent(value);
    },
    ...mapMutations({
      setEditor: 'SET_EDITORID'
    })
  }
};
</script>

<style scoped>
</style>

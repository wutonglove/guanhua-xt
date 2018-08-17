<template>
  <div>
    <script :id="id" ref="UEditor" type="text/plain">{{text}}</script>
  </div>
</template>

<script>
import '../../../static/plugs/UE/ueditor.config.js';
import '../../../static/plugs/UE/ueditor.all.js';
import '../../../static/plugs/UE/lang/zh-cn/zh-cn.js';
import '../../../static/plugs/UE/ueditor.parse.min.js';

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
        toolbars: [],
        imageScaleEnabled: true, // 图片缩放
        pasteplain: true, // 粘贴纯文本
        elementPathEnabled: false, // 元素路径
        wordCount: false, // 数字统计
        minFrameHeight: 40, // 最小高度
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
      this.editor = UE.getEditor(this.id, this._config);
      this.$refs.UEditor.style.display = 'none';

      this.editor.addListener('ready', () => {
        this.editor.container.style.border = 'none';
        document.getElementById(this.id).removeAttribute('style');
      });
      this.editor.addListener('focus', () => {
        this.$emit('focus', this.editor);
      });
      this.editor.addListener('blur', () => {
        this.$emit('blur');
      });
      this.editor.addListener('contentChange', () => {
        let value = this.editor.getContent();
        this.$emit('change', value);
      });
    });
  },
  methods: {
    getEditor() {
      return this.editor;
    },
    setContent(value) {
      if (!this.editor) return;
      this.editor.setContent(value);
    }
  }
};
</script>

<style scoped>
</style>

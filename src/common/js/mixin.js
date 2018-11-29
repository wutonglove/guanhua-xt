/**
 * Created by ww on 2017/9/28.
 */
import Modal from 'iview/src/components/modal';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { LOCALSTORAGEKEY } from 'common/js/config';
import { createQuestionId } from 'utils/utilities';
import upScreenshot from 'api/upScreenshot';
import $ from 'jquery';

import Mboard from 'components/template1-part/mboard/mboard';
export const submitMixin = {
  props: {
    questionData: {
      type: Object
    }
  },
  methods: {
    submit() {
      let result = this.getResult();
      switch (result) {
        case -1:
          Modal.warning({
            title: '',
            content: `<p>这道题没有作答！</p>`
          });
          break;
        case 0:
          Modal.error({
            title: '',
            content: `<p>这道题没有答对，下次加油哦！</p>`
          });
          break;
        case 1:
          Modal.success({
            title: '',
            content: `<p>太棒了，您答对了！</p>`
          });
          break;
      }
      if (window.androidjs) {
        window.androidjs.showInfoFromJs(result);
      } else {
        // alert('no androidjs');
      }
    },
    getResult() {
      throw new Error('component must implement handleGetResult method');
    }
  }
};

export const actionMixin = {
  computed: {},
  methods: {
    /**
     * 截图
     * @returns {Promise}
     */
    screenshot() {
      let _self = this;
      return new Promise((resolve, reject) => {
        this.preview();
        this.$nextTick(() => {
          $('.dialog_wrapper').css('opacity', '0');
          try {
            window.frames['previewDialog'].onload = function() {
              this.screenshot().then(dataURL => {
                $('.dialog_wrapper').css('opacity', '1');
                _self.setPreDialog({ isShow: false });
                resolve(dataURL);
              });
            };
          } catch (err) {
            reject(6000);
          }
        });
      });
    },
    /**
     * 保存提示
     */
    showDia() {
      Modal.confirm({
        title: '',
        content: '<p class="text">确认保存该试题么？</p>',
        onOk: () => {
          this.save();
        }
      });
    },
    save() {
      if (!this.questionId) {
        this.questionId = createQuestionId();
      }
      this.setProgressDia({ isShow: true, progress: 0 });
      let _dataURL = '';
      this.screenshot()
        .then(dataURL => {
          // console.log(dataURL);
          _dataURL = dataURL.trim().replace('data:image/jpeg;base64,', '');
          return this.upload(this.questionId);
        })
        .then(_url => {
          let data = this.getdata(_url).questionData;
          data = Object.assign({}, data, {
            xttype: this.xttype,
            xtclass: this.xtclass
          });
          console.log('save:', data);
          return this.saveToRemote({ data, questionId: this.questionId });
        })
        .then(() => {
          // 保存截图
          return upScreenshot(this.questionId, _dataURL);
        })
        .then(() => {
          this.setProgressDia({ progress: 100 });
        })
        .catch(code => {
          alert('错误编码：' + code);
        });
    },
    preview() {
      let data = this.getdata().localData;
      localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(data));
      this.setPreDialog({ isShow: true, title: document.title });
    },
    interrupt() {
      this.setPreDialog({ isShow: false });
      this.interruptSave();
      this.setProgressDia({ isShow: false });
    },
    ...mapMutations({
      setPreDialog: 'SET_PREDIALOG',
      setProgressDia: 'SET_PROGRESSDIA'
    }),
    ...mapActions({
      saveToRemote: 'saveToRemote',
      upload: 'uploadToRemote',
      interruptSave: 'interruptSave'
    })
  }
};

export const tem1ComMixin = {
  computed: {
    ...mapGetters(['mboard'])
  },
  ...mapMutations({
    setMBoard: 'SET_MBOARD'
  }),
  components: { Mboard }
};

export const generalMixin = {
  data() {
    return {
      explanation: '',
      hint: '',
      topic: '',
      answer: '',
      isPass: false
    };
  },
  computed: {
    ...mapGetters(['editQusData'])
  },
  methods: {
    initImgDOM() {
      $('span.img_wrap').replaceWith(function() {
        return $(this).children('.insertFile');
      });
    },
    hintChange(value) {
      this.hint = value;
      this.verify();
    },
    expChange(value) {
      this.explanation = value;
      this.verify();
    },
    tpChange(value) {
      this.topic = value;
      this.verify();
    },
    anwChange(value) {
      this.answer = value;
      this.verify();
    },
    verify() {
      this.isPass = Boolean(Math.min.apply(Math, this.complete()));
      this.$emit('verify', this.isPass);
    },
    complete() {
      console.log('Error: complete is undefined');
    },
    initOriData() {
      console.log('Error: initOriData is undefined');
    }
  },
  watch: {
    editQusData(newVal) {
      this.initOriData(newVal);
      this.$nextTick(() => {
        this.initImgDOM();
      });
    }
  }
};

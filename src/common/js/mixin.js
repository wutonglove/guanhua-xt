/**
 * Created by ww on 2017/9/28.
 */
import Modal from 'iview/src/components/modal';
import {mapActions} from 'vuex';

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
    },
    getResult() {
      throw new Error('component must implement handleGetResult method');
    }
  }
};

export const verifyMixin = {
  data() {
    return {
      type: ''
    };
  },
  methods: {
    getIsPass() {
      throw new Error('component must implement handleGetIsPass method');
    },
    verify: function () {
      this.verifyIsPass(this.getIsPass());
    },
    ...mapActions({
      verifyIsPass: 'verifyIsPass'
    })
  }
};

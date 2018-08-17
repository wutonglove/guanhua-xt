<template>
  <div class="comprehensive_wrap">
    <div class="question_num">
      当前已插入 <span class="num">{{questions.length}}</span> 个小题
    </div>
    <i-dropdown class="btn_add_question" trigger="click" @on-click="addQuestion">
      <i-button type="primary" shape="circle">
        添加题目
        <i-icon type="arrow-down-b"></i-icon>
      </i-button>
      <i-dropdown-menu slot="list">
        <i-dropdown-item :name="item.type" v-for="(item,index) in questionMap" :key="index">{{item.name}}
        </i-dropdown-item>
        <!-- divided -->
      </i-dropdown-menu>
    </i-dropdown>

    <topic @change="validate" v-model="qsData.topic"></topic>  

    <div class="sub_content" v-if="questions.length>0">
      <i-tabs ref="tabs">
        <i-tab-pane :label="(index+1).toString()" v-for="(question,index) in questions" :key="index">
          <i-button type="primary" size="small" style="float:right;" @click="removeQuestion(index)">删除本题</i-button>
          <div class="question_wrap">
            <h3 class="title">{{ typeKeyVal[question.quesType] }}</h3>
            <div class="content" :style="`height:${subContentH}px`">
              <div :is="question.quesType" ref="questionsDOM" v-model="question.desc" @change="validate"></div>
            </div>
          </div>
        </i-tab-pane>
      </i-tabs>
    </div>
  </div>
</template>

<script>
import IDropdown from 'iview/src/components/dropdown/dropdown';
import IDropdownMenu from 'iview/src/components/dropdown/dropdown-menu';
import IDropdownItem from 'iview/src/components/dropdown/dropdown-item';
import IButton from 'iview/src/components/button/button';
import IIcon from 'iview/src/components/icon/icon';
import ITabs from 'iview/src/components/tabs/tabs';
import ITabPane from 'iview/src/components/tabs/pane';
import Message from 'iview/src/components/message';

import questionMap from 'map/comprehensive-menu.json';
import { replaceSrc } from 'utils/utilities';
import { generalMixin } from 'common/js/mixin';
import Topic from 'components/general-part/topic/topic';

import Radio from 'components/questions/general/radio';
import Checkbox from 'components/questions/general/checkbox';
import Judge from 'components/questions/general/judge';
import Fillblank from 'components/questions/general/fillblank';
import Vote from 'components/questions/general/vote';
import Jigsaw from 'components/questions/general/jigsaw';
import Sort from 'components/questions/general/sort';
import $ from 'jquery';

export default {
  mixins: [generalMixin],
  data() {
    return {
      topoic: '',
      questions: [],
      subContentH: 0,
      questionMap: questionMap
    };
  },
  mounted() {
    setTimeout(() => {
      $('.content_wrapper').css('padding-bottom', '20px');
      this.subContentH =
        $('body').height() -
        (91 +
          76 +
          $('.comprehensive_wrap>.topic').height() +
          20 +
          16 +
          37 +
          16 +
          20 +
          51 +
          24);
    }, 20);
  },
  methods: {
    initQsData() {
      this.qsData = {
        topic: '',
        questions: this.questions
      };
    },
    addQuestion: function(name) {
      if (this.questions.length > 14) {
        Message.warning('最多添加15道题');
        return;
      }
      this.questions.push({
        id: this.questions.length,
        quesType: name,
        desc: {
          type: 'compre'
        }
      });
      this.$nextTick(() => {
        this.$refs.tabs.handleChange(this.questions.length - 1);
      });
    },
    removeQuestion: function(index) {
      this.questions.splice(index, 1);
      this.$refs.tabs.handleRemove(this.questions.length);
    },
    getQuestionData: function(urlSnippet) {
      let _topic = this.qsData.topic;

      let questionData = {
        title: document.title,
        topic: replaceSrc(_topic, urlSnippet),
        context: [],
        questionType: 'comprehensive'
      };
      let localData = {
        title: document.title,
        topic: replaceSrc(_topic),
        context: [],
        questionType: 'comprehensive'
      };

      this.$refs.questionsDOM.forEach((item, index) => {
        let data = item.getQuestionData();
        questionData.context.push(data.questionData);
        localData.context.push(data.localData);
      });
      return {
        questionData,
        localData
      };
    },
    validate() {
      if (!this.qsData) return [false];
      let qusDOM = this.$refs.questionsDOM;
      let res = true;
      if (!qusDOM || qusDOM.length < 1) {
        res = false;
      } else {
        for (let i = 0; i < qusDOM.length; i++) {
          if (!Math.min.apply(Math, qusDOM[i].validate())) {
            res = false;
          }
        }
      }
      return [this.qsData.topic !== '', res];
    }
  },
  computed: {
    typeKeyVal() {
      let obj = {};
      this.questionMap.forEach((item, index) => {
        obj[item.type] = item.name;
      });
      return obj;
    }
  },
  components: {
    IDropdown,
    IDropdownMenu,
    IDropdownItem,
    IButton,
    IIcon,
    ITabs,
    ITabPane,
    Topic,
    Radio,
    Checkbox,
    Judge,
    Fillblank,
    Vote,
    Jigsaw,
    Sort
  }
};
</script>

<style scoped lang="stylus">
@import '../../../common/stylus/variable.styl'

.comprehensive_wrap
  .btn_add_question
    float: right
    position: relative
    z-index: 1
  .question_num
    margin-top: 10px
    .num
      color: red
  .sub_content
    margin-top: 10px
    .question_wrap
      border: 1px solid $bdcolor-blue-d
      overflow-y: auto
      clear: both
      .title
        padding-left: 12px
        line-height: 30px
        background-color: $background-blue
      .content
        padding: 0 12px 20px 12px
</style>

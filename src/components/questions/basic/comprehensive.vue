<template>
  <div class="comprehensive_wrap">
    <div class="question_num">
      当前已插入 <span class="num">{{questions.length}}</span> 个小题
    </div>
    <Dropdown class="btn_add_question" trigger="click" @on-click="addQuestion">
      <Button type="primary" shape="circle">
        添加题目
        <Icon type="arrow-down-b"></Icon>
      </Button>
      <Dropdown-menu slot="list">
        <Dropdown-item :name="item.type" v-for="(item,index) in questionMap" :key="index">{{item.name}}</Dropdown-item>
        <!-- divided -->
      </Dropdown-menu>
    </Dropdown>

    <topic ref="topicDOM" @on-test="test"></topic>

    <div class="sub_content" v-if="questions.length>0">
      <Tabs ref="tabs">
        <Tab-pane :label="(index+1).toString()" v-for="(question,index) in questions" :key="index">
          <i-button type="primary" size="small" style="float:right;" @click="removeQuestion(index)">删除本题</i-button>
          <div class="question_wrap">
            <h3 class="title">{{ typeKeyVal[question.quesType] }}</h3>
            <div class="content" :style="`height:${subContentH}px`">
              <div :is="question.quesType" ref="questionsDOM"></div>
            </div>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import Dropdown from 'iview/src/components/dropdown/dropdown';
  import DropdownMenu from 'iview/src/components/dropdown/dropdown-menu';
  import iButton from 'iview/src/components/button/button';

  import questionMap from 'map/questiontype.json';
  import {replaceSrc} from 'utils/utilities';

  import Topic from 'components/xiti_basic/topic/topic';
  import Radio from 'components/questions/basic/radio';
  import Checkbox from 'components/questions/basic/checkbox';
  import Judge from 'components/questions/basic/judge';
  import FillBlank from 'components/questions/basic/fillBlank';
  import Vote from 'components/questions/basic/vote';
  import Jigsaw from 'components/questions/basic/jigsaw';

  export default {
    data(){
      return {
        questions: [],
        subContentH: 0,
        questionMap: questionMap,
        questionData:'',
        localData:''
      };
    },
    mounted(){
      setTimeout(() => {
        $('.content_wrapper').css('padding-bottom', '20px');
        this.subContentH = $('body').height() - (91 + 76 + $('.comprehensive_wrap>.topic').height() + 20 + 16 + 37 + 16 + 20 + 51 + 24)
      }, 20);
    },
    methods: {
      addQuestion:function(name){
        if(this.questions.length>14){
          this.$Message.warning('最多添加15道题');
          return;
        }
        this.questions.push({
          id: this.questions.length,
          quesType: name,
          desc: {}
        });
      },
      removeQuestion:function(index){
        this.questions.splice(index, 1);
      },
      getQuestionData:function(){
        let _topic = this.$refs.topicDOM.topic;
        let _url = this.$store.state.urlSnippet;

        this.questionData = {
          title: document.title,
          topic: replaceSrc(_topic, _url, true),
          context: [],
          questionType: 'comprehensive'
        };
        this.localData = {
          title: document.title,
          topic: _topic,
          context: [],
          questionType: 'comprehensive'
        };

        this.$refs.questionsDOM.forEach((item, index) => {
          console.log(item);
          item.getQuestionData();
          this.questionData.context.push(item.questionData);
          this.localData.context.push(item.localData);
        });
        return {
          questionData: this.questionData,
          localData: this.localData
        };
      },
      test:function(){
        if(!this.$refs.topicDOM.isPass){
          this.$store.state.isPass = false;
        }
      }
    },
    computed: {
      typeKeyVal(){
        let obj = {};
        this.questionMap.forEach((item, index) => {
          obj[item.type] = item.name;
        });
        return obj;
      }
    },
    components: {
      Dropdown,
      DropdownMenu,
      iButton,
      Topic,
      Radio,
      Checkbox,
      Judge,
      FillBlank,
      Vote,
      Jigsaw
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../../common/stylus/variable.styl'

  .comprehensive_wrap
    .btn_add_question
      float: right
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

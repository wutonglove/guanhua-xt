<template>
  <div class='outer_net'>
    <div class="content">
      <div class="search_wrap">
        <i-input v-model="word" placeholder="请输入搜索关键字" style="width: 260px;margin-right:20px" icon="search"></i-input>
        <i-button type="primary" shape="circle" icon="ios-search">搜索</i-button>
      </div>
      <div class="content_wrap">
        <div class="load_wrap" v-show="imgList.slice((curPage-1)*24,(curPage-1)*24+24).length===0">
          <div class="loading">
            <i-spin size="large" class="spin"></i-spin>
            <span class="text">正在加载...</span>
          </div>
        </div>
        <div class="img_list_wrap">
          <div class="img_wrap"
               :class="{'selected':img.selected}"
               v-for="img in imgList.slice((curPage-1)*24,(curPage-1)*24+24)"
               @click="selectFile(img)"
          >
            <div class="thumbnail">
              <img :src="img.icon" :title="img.name">
            </div>
            <div class="name" v-html="img.name"></div>
            <div class="size">{{img.size}}</div>
            <i-icon type="checkmark-circled" class="check_icon"></i-icon>
            <!--<i-icon class="unfold" type="arrow-expand" @click.native="$store.dispatch('unfold',file)"></i-icon>-->
          </div>
        </div>
      </div>

    </div>
    <div class="footer">
      <i-page class-name="page_ctrl" :total="data.imgtotal*1" :pageSize="24" @on-change="linkPage"></i-page>
      <button type="button" class="btn_insert">插入</button>
    </div>
  </div>
</template>

<script>
  import ISpin from 'iview/src/components/spin';
  import IIcon from 'iview/src/components/icon';
  import IPage from 'iview/src/components/page';
  import IInput from 'iview/src/components/input';
  import IButton from 'iview/src/components/button';

  export default {
    mounted() {
      // https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&word=%E8%8B%B1%E8%AF%AD&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&pn=0&rn=10&gsm=21c&1503997584698=

      this.$nextTick(() => {
//        this.data = {
//          imgtotal: '50',
//          imgs: [
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            },
//            {
//              DecorateCompanyGrade: '',
//              DecorateCompanyId: '',
//              DecorateCompanyLocation: '',
//              DecorateCompanyName: '',
//              DecorateWantuUrl: '',
//              adType: '0',
//              bdFromPageTitlePrefix: '',
//              bdImgnewsDate: '1970-01-01 08:00',
//              bdSetImgNum: 0,
//              bdSourceName: '',
//              bdSrcType: '0',
//              cs: '3717794139,2668047016',
//              currentIndex: '',
//              di: '35664177670',
//              filesize: '',
//              fromPageTitle: '<strong>数学广角——推理</strong>',
//              fromURL: 'http://www.abcjiaoyu.com/ziyuan/Show.aspx?ziyuanID=7300',
//              fromURLHost: 'www.abcjiaoyu.com',
//              hasLarge: true,
//              height: 540,
//              hoverURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              is: '0,0',
//              isAspDianjing: false,
//              largeTnImageUrl: '',
//              middleURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              objURL: '//yun2.abcjiaoyu.com/abctupian/7300/17.jpg',
//              os: '3977775525,2489377562',
//              pageNum: 0,
//              personalized: '0',
//              pi: '0',
//              setDowloadURL: '',
//              setTittle: '',
//              simid: '4197772993,832529861',
//              source_type: '',
//              tagTwo: '',
//              thumbURL: 'http://img3.imgtn.bdimg.com/it/u=3717794139,2668047016&fm=26&gp=0.jpg',
//              token: '',
//              type: 'jpg',
//              width: 720
//            }
//          ]
//        };
        this.initImgList();
      });
    },
    data() {
      return {
        data: '',
        imgList: [],
        curPage: 1,
        word: ''
      };
    },
    methods: {
      initImgList: function () {
        if (this.data.imgs) {
          this.data.imgs.forEach((item, index) => {
            this.imgList.push({
              icon: item.objURL,
              name: item.fromPageTitle,
              resource: item.objURL,
              size: item.width + '*' + item.height,
              src: item.objURL,
              type: 'image/' + item.type,
              selected: false
            });
          });
        }
      },
      selectFile: function (file) {
        this.imgList.forEach((item, index) => {
          item.selected = false;
        });
        file.selected = true;
        this.$store.state.selectedFile = file;
      },
      linkPage: function (current) {
        this.curPage = current;
      },
      acjson: function (pn) {
        this.$axios.get('', {
          params: {
            word: this.word,
            pn: 0,
            rn: 48
          }
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    },
    components: {
      ISpin,
      IIcon,
      IPage,
      IInput,
      IButton
    }
  };
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
  .outer_net
    height: 100%
    width: 100%
    background-color: $background-fileDialog-ctx
    position: relative
    .content
      position: absolute
      top: 0
      bottom: 80px
      width: 100%
      .search_wrap
        position: absolute
        right: 40px
        top: 5px
      .content_wrap
        position: absolute
        top: 40px
        bottom: 0
        width: 100%
        overflow: auto
        .load_wrap
          width: 100%
          height: 100%
          position: relative
          text-align: center
          .loading
            position: absolute
            left: 0
            top: 0
            bottom: 0
            right: 0
            margin: auto
            width: 120px
            height: 32px
            line-height: 32px
            overflow: hidden
            .spin
              float: left
            .text
              margin-left: 10px
              float: left
              font-size: 14px
              color: $font-color-blue
        .img_list_wrap
          .img_wrap
            display: inline-block
            position: relative
            margin: 15px
            min-width: 180px
            font-size: 0
            .thumbnail
              width: 100%
              height: 135px
              padding: 5px
              overflow: hidden
              box-sizing: border-box
              border: 2px solid #fff
              background-color: #cccccc
              position: relative
              img
                max-width: 100%
                max-height: 100%
                position: absolute
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)
                font-size: 12px
            &.selected
              .thumbnail
                border-color: $bdcolor-blue-d
              .check_icon
                font-size: 25px
                color: $font-color-green
                position: absolute
                right: 3px
                top: 2px
            .size
              font-size: 12px
              background-color: #fff
              padding: 0 2px
              position: absolute
              top: 4px
              left: 4px
            .name
              font-size: 14px
              text-align: center
              line-height: 32px
              width: 100%
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
            .unfold
              font-size: 24px
              position: absolute
              right: 5px
              bottom: 32px
              color: $font-color-file
              opacity: 0
              padding: 0 5px
    .footer
      height: 80px
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      overflow: hidden
      .page_ctrl
        float: left
        margin: 10px 0 0 40px
      .btn_insert
        width: 100px
        height: 36px
        background: linear-gradient(to bottom, $bgc-gradient-blue1, $bgc-gradient-blue2)
        color: #fff
        float: right
        margin: 23px 40px 0 0
        line-height: 36px
        font-size: 18px
        border-radius: 18px
        box-shadow: 0 3px 5px 0 #ccc
        cursor: default
        &:hover
          background: linear-gradient(to bottom, #93D8FC, $bgc-gradient-blue1)

</style>

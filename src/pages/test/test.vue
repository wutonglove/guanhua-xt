<template>
  <div class="">
    这是一个测试页面
    <div class="booth">
      <audio id="audio" width="400" height="300" controls></audio>
      <button id='tack'> snap shot</button>
      <canvas id='canvas' width='400' height='300'></canvas>
      <img id='img' src=''>
    </div>
  </div>
</template>

<script>
  import VConsole from 'vconsole';
  /* eslint-disable no-new */
  new VConsole();
  import exercises from 'map/exercises.json';
  import xtclass from 'map/xtclass-list.json';

  export default {
    mounted() {
      this.questionlist();
    },
    methods: {
      record() {
        let audio = document.getElementById('audio');
        let canvas = document.getElementById('canvas');
        let snap = document.getElementById('tack');
        let img = document.getElementById('img');
        let vendorUrl = window.URL || window.webkitURL;
        console.log(navigator.getUserMedia, navigator.webkitGetUserMedia, navigator.mozGetUserMedia, navigator.msGetUserMedia);
        // 媒体对象
        navigator.getMedia = navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;

        navigator.getMedia({
//        video: true, // 使用摄像头对象
          audio: true  // 不适用音频
        }, function (strem) {
          console.log('strem', strem);
          audio.src = vendorUrl.createObjectURL(strem);
//        audio.play();
        }, function (error) {
          // error.code
          console.log('err', error);
        });
        snap.addEventListener('click', function () {
          // 绘制canvas图形
//        canvas.getContext('2d').drawImage(video, 0, 0, 400, 300);

          // 把canvas图像转为img图片
          img.src = canvas.toDataURL('image/png');
        });
      },
      questionlist() {
        let obj = {};
        let code = 0;

        for (let key in exercises) {
          for (let i = 0; i < exercises[key].length; i++) {
            let item = exercises[key][i];
            let index = xtclass.findIndex((a) => {
              return a.cn_name === key;
            });
            obj[item.type] = {
              'code': code,
              'name': item.name,
              'edit': item.href.replace('edit.html#', ''),
              'show': xtclass[index].en_name === 'general' ? '/general' : '/interaction/' + item.type,
              'icon': item.type + '-icon.jpg',
              'parent': {
                'code': index,
                'ename': xtclass[index].en_name,
                'cname': xtclass[index].cn_name
              },
              'config': {
                'edit': {
                  desc: item.desc,
                  footBtns: item.config && item.config.footBtns,
                  mboard: item.config && item.config.mboard
                },
                'show': {
                  'nosubmit': (item.config && item.config.nosubmit) || false
                }
              }
            };
            code++;
          }
        }
        console.log(obj, JSON.stringify(obj));
      }
    }
  };
</script>

<style scoped lang='stylus'>

</style>

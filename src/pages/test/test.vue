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

  export default {
    mounted() {
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
    }
  };
</script>

<style scoped lang='stylus'>

</style>

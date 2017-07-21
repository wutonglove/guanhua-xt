## 需求
#### 12-7-12
- 选取
  + 点击空白清空选取
- 编辑工具
  + 选区为空 工具恢复初始化
  + 选区建立 根据选区更新工具状态 ***
  + 字号工具默认值

## bug
- 预览视频和音频
  + 关闭窗口后视频和视频和音频没有关闭
- 插入公式 内容显示
  + 猜想：可能是本地服务器状态下字体请求问题

#### 12-7-12
- color 选择面板
  + 单击空白 后渲染的能隐藏
  + 原因：document.onclick 覆盖

#### 12-7-18 插入文件对话框
- 获取图片原始大小
  + 异步

#### 12-7-19 UI框架 iView
#### 12-7-20 iframe 跨域 && formula插件
- Uncaught DOMException: Blocked a frame with origin "http://gongshi.baidu.com" from accessing a cross-origin frame.
- [formula插件](http://gongshi.baidu.com/ed.html)
- 改变 formula 生成的图片padding
  + 修改文件：kityformula-plugin/kityformula/jskityformula-editor.all.min.js
  + 查找 g=20 和padding:[20,50]
  + 现将g=20改为g=2 将padding:[20,50]改为pading:[2,5]

#### 12-7-21
- zoom
- [HTML5的 input:file上传类型控制](http://www.haorooms.com/post/input_file_leixing)


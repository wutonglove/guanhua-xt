## 需求
#### 17-7-12
- 选取
  + 点击空白清空选取
- 编辑工具
  + 选区为空 工具恢复初始化
  + 选区建立 根据选区更新工具状态 ***
  + 字号工具默认值

## bug
- ~~插入公式 内容显示~~
  + ~~猜想：可能是本地服务器状态下字体请求问题~~
- 填空题
  + 插入空格,选区的父元素可能为div_input，此时插入的空格编号不正确
    * margin 为- ，用&nbsp做间距（暂时）
  + ~~最后一个空格预览 不显示~~
  + ~~推个删除的时候一次只能删除一个空格~~
- vuex 主模块调用子模块
- 综合题验证

#### 17-7-12
- color 选择面板
  + 单击空白 后渲染的能隐藏
  + 原因：document.onclick 覆盖

#### 17-7-18 插入文件对话框
- 获取图片原始大小
  + 异步

#### 17-7-19 UI框架 iView
#### 17-7-20 iframe 跨域 && formula插件
- Uncaught DOMException: Blocked a frame with origin "http://gongshi.baidu.com" from accessing a cross-origin frame.
- [formula插件](http://gongshi.baidu.com/ed.html)
- 改变 formula 生成的图片padding
  + 修改文件：kityformula-plugin/kityformula/jskityformula-editor.all.min.js
  + 查找 g=20 和padding:[20,50]
  + 现将g=20改为g=2 将padding:[20,50]改为pading:[2,5]

#### 17-7-21
- zoom
- [HTML5的 input:file上传类型控制](http://www.haorooms.com/post/input_file_leixing)

#### 17-8-3
- 为了测试综合体，很多组件没有改，主要用radio测试，所以radio模块改了很多
- 修改options 使其依赖的数据私有化

#### 17-8-4
- 修改基本完成
- 验证未完成

#### 17-8-9
- 单选/多选/判断/天空   的 vuex-modules中的getResult函数没有复用getResult.js
- 待修改
- 天空编辑页面，选项输入框需要换成input

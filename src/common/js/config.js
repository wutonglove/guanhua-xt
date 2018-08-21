export const UNFINISHED = false;

export const FINISHED = true;

export const LOCALSTORAGEKEY = '__guanhua-question__';
export const LOCALUSERKEY = '__guanhua-user__';

export const FILE_CONFIG = {
  fileType: {
    image: ['png', 'jpeg', 'jpg', 'gif', 'bmp'],
    video: ['mp4', 'x-flv', 'avi'],
    audio: ['mp3', 'x-m4a', 'ogg', '*.*']
  },
  fileSize: 15
};

export const IN_FILE_BTNS = [
  {
    icon: 'images',
    name: '插入图片',
    role: 'image'
  },
  {
    icon: 'film-marker',
    name: '插入视频',
    role: 'video'
  },
  {
    icon: 'headphone',
    name: '插入音频',
    role: 'audio'
  },
  {
    icon: 'social-facebook',
    name: '插入公式',
    role: 'formula'
  }
];

export const EDIT_TEXT_BTNS = [
  {
    type: 'font-style',
    list: [
      {
        name: '加粗',
        icon: 'icon-bold',
        role: 'bold',
        state: 'off'
      },
      {
        name: '斜体',
        icon: 'icon-italic',
        role: 'italic',
        state: 'off'
      },
      {
        name: '下划线',
        icon: 'icon-underline',
        role: 'underline',
        state: 'off'
      },
      {
        name: '格式化',
        icon: 'icon-eraser',
        role: 'RemoveFormat',
        state: 'off'
      },
      {
        name: '上标',
        icon: 'icon-superscript',
        role: 'superscript',
        state: 'off'
      },
      {
        name: '下标',
        icon: 'icon-subscript',
        role: 'subscript',
        state: 'off'
      },
      {
        name: '前景色',
        icon: 'icon-pencil',
        role: 'forecolor',
        type: 'second'
      },
      {
        name: '背景色',
        icon: 'icon-pencil-square',
        role: 'backcolor',
        type: 'second'
      },
      {
        name: '字号',
        icon: 'font',
        role: 'fontsize',
        type: 'second',
        content: ['12px', '13px', '16px', '18px', '24px', '32px', '48px']
      }
    ]
  },
  {
    type: 'align',
    list: [
      {
        name: '左对齐',
        icon: 'icon-align-left',
        role: 'JustifyLeft',
        state: 'off'
      },
      {
        name: '居中',
        icon: 'icon-align-center',
        role: 'JustifyCenter',
        state: 'off'
      },
      {
        name: '右对齐',
        icon: 'icon-align-right',
        role: 'JustifyRight',
        state: 'off'
      }
    ]
  },
  {
    type: 'paragraph',
    list: [
      {
        name: '插入表格',
        icon: 'icon-table',
        role: 'insertTable',
        type: 'advanced'
      },
      {
        name: '插入横线',
        icon: 'icon-minus',
        role: 'horizontal'
      }
    ]
  },
  {
    type: '',
    list: [
      {
        name: '撤销',
        icon: 'icon-undo',
        role: 'undo'
      },
      {
        name: '重做',
        icon: 'icon-redo',
        role: 'redo'
      }
    ]
  }
];
// 汉字编码范围
export const CHINESE_CODE = [19968, 40869];
// regexp
export const REGEXPS = {
  // 匹配汉字之外
  no_cn: /[^\u4E00-\u9FA5]/g,
  // 匹配字母之外
  no_en: /[^A-Za-z]/g,
  // 匹配字母和汉字之外
  no_symbol: /[^\u4E00-\u9FA5^A-Za-z]/g,
  // 匹配中文
  cn: /[\u4E00-\u9FA5]/g,
  // 匹配字母
  en: /[A-Za-z]/g
};

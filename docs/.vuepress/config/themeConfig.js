const links = require('./links')

module.exports = {
  lang: 'zh-CN', // en zh-CN
  site: 'https://gleehub.com',
  // logo: '/20171231/logo.png',
  // banner: '/20171231/YgorwbJUDpcQHV5h.png',
  author: 'cnguu',
  authorLink: 'https://github.com/cnguu/',
  avatar: 'https://static.xmt.cn/cc50c217cbe342ce951324583f2c6139.png',
  social: {
    github: 'https://github.com/cnguu/',
    facebook: 'https://www.facebook.com/profile.php?id=100031941487870',
    twitter: 'https://twitter.com/cnguu_cn',
    dribbble: 'https://dribbble.com/cnguu',
    weibo: 'https://weibo.com/gu642779596',
    zhihu: 'https://www.zhihu.com/people/gleehub',
    qq: 'tencent://message/?uin=642779596',
  },
  // ityped: {
  //   typeSpeed: 300,           // 正常速度
  //   backSpeed: 100,           // 反向速度
  //   startDelay: 300,          // 开始延迟（毫秒）
  //   backDelay: 1300,          // 反向延迟（毫秒）
  //   loop: true,               // 循环
  //   showCursor: true,         // 显示指针
  //   placeholder: false,       // 占位
  //   disableBackTyping: false, // 禁用反向输入
  //   cursorChar: '丨',         // 指针字符
  // },
  post: {
    // cover: [
    //   '/20171231/favicon.ico',
    //   'https://static.xmt.cn/cc50c217cbe342ce951324583f2c6139.png',
    // ],
    // pageSize: 12,
    // pageSizeOptions: ['12', '24', '48', '96'],
  },
  reward: [
    'https://static.xmt.cn/ca717dde8ae14ea7ab3c8c74b8711414.png',
    'https://static.xmt.cn/acc7d3d02b0c4a35a3735268cbb2cce0.png',
  ],
  timeline: true,
  links,
  about: true,
  discuss: 'valine',
  valine: {
    appId: '9gFBq4SdRCiabSFFN0IQai6o-9Nh9j0Va',
    appKey: 'NzKKjaHWL8l8Ywk5rI5LIw3B',
    placeholder: '在这里写下你的留言丨支持 MarkDown 语法',
    notify: false,
    verify: true,
    avatar: 'mp',
    pageSize: 8,
    recordIP: true,
    lang: 'zh-cn',
  },
  search: {
    type: 'default', // default algolia
    size: 10,
    apiKey: '<API_KEY>',
    indexName: '<INDEX_NAME>'
  },
  // tagSize: 100,
  en: {
    locales: {
      title: 'Stars so bright',
      description: 'Writing life with you',
    },
    navs: [
      {
        text: 'One',
        link: '/one/',
      },
      {
        text: 'Two',
        link: '/two/',
      },
    ],
    nameplate: {
      title: 'Yur'
    },
    buttons: [
      {text: 'Read', link: '/posts/', type: 'primary'},
      {text: 'About', link: '/about.html', type: 'default'},
    ],
    footer: {
      // icon: '/20171231/footer.png',
      one: [
        {
          title: 'Yur',
          subtitle: 'VuePress Theme',
          link: 'https://github.com/cnguu/vuepress-theme-yur',
        },
      ],
      two: [
        {
          title: 'Hosted On GitHub',
          link: 'https://github.com/',
          type: 'cloud',
          theme: 'filled',
        },
      ],
      three: [
        {
          title: 'Gitter',
          link: 'https://gitter.im/vuepress-theme/yur?utm_source=share-link&utm_medium=link&utm_campaign=share-link',
          type: 'message',
          theme: 'outlined',
        },
      ],
    }
  },
  'zh-CN': {
    locales: {
      title: '星汉灿烂',
      description: '书写生活与你',
    },
    navs: [
      {text: '编程技术', link: '/program/'},
      {text: '生活兴趣', link: '/life/'},
      {text: '软件工具', link: '/tool/'},
      {text: '其它', link: '/other/'},
    ],
    nameplate: {
      title: 'Yur',
    },
    buttons: [
      {text: '阅读列表', link: '/posts/', type: 'primary'},
      {text: '了解作者', link: '/about.html', type: 'default'},
    ],
    footer: {
      one: [
        {
          title: 'Yur',
          subtitle: 'VuePress 主题',
          link: 'https://github.com/cnguu/vuepress-theme-yur',
        },
        {
          title: 'Yur Tool',
          subtitle: '主题快速搭建工具',
          link: 'https://github.com/ioim/vuepress-theme-yur-cli',
        },
      ],
      two: [
        {
          title: '本站托管于 GitHub',
          link: 'https://gleehub.com/',
          type: 'cloud',
          theme: 'filled',
        },
        {
          title: '备用站托管于 Coding',
          link: 'https://www.gleehub.com/',
          type: 'cloud',
          theme: 'filled',
        },
        {
          title: '粤 ICP 备 17075980 号 - 4',
          link: 'http://beian.miit.gov.cn',
          type: 'flag',
          theme: 'filled',
        },
      ],
      three: [
        {
          title: '吐个槽',
          link: 'https://support.qq.com/product/106316',
          type: 'message',
          theme: 'outlined',
        },
        {
          title: '社区交流扣群：686025154',
          link: '//shang.qq.com/wpa/qunwpa?idkey=c6afb0610ede557ae6920fc4cb31d652fde73d703203b261c6d2366544371776',
          type: 'qq',
          theme: 'outlined',
        },
      ],
    }
  },
}

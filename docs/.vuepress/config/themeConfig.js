module.exports = {
  layout: 'default',
  lang: 'zh-CN', // en zh-CN
  site: 'https://gleehub.com',
  // logo: '/20171231/logo.png',
  // banner: '/20171231/YgorwbJUDpcQHV5h.png',
  author: 'cnguu',
  authorLink: 'https://github.com/cnguu/',
  avatar: 'https://static.xmt.cn/cc50c217cbe342ce951324583f2c6139.png',
  reward: [
    'https://static.xmt.cn/ca717dde8ae14ea7ab3c8c74b8711414.png',
    'https://static.xmt.cn/acc7d3d02b0c4a35a3735268cbb2cce0.png',
  ],
  timeline: true,
  search: {
    type: 'default',
    size: 10,
  },
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
      {
        text: '分类一',
        link: '/one/',
      },
      {
        text: '分类二',
        link: '/two/',
      },
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
          title: '本站托管于 CODING',
          link: 'https://coding.net/',
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

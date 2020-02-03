import store from '@theme/store'
import routes from '@theme/utils/route'
import Mixin from '@theme/utils/mixin'
import Translation from '@theme/plugins/Translation'
import Blog from '@theme/plugins/Blog'
import customer from '@theme/plugins/PartyC/customer'
import baiDu from '@theme/plugins/PartyC/baiDu'
import curtain from '@theme/plugins/PartyC/curtain'
import Ant from 'ant-design-vue/es'
import 'ant-design-vue/dist/antd.less'
import '@theme/styles/index.less'

export default ({ Vue, options, router, siteData }) => {
  Vue.mixin({ store })
  Vue.use(routes, { router })
  Vue.use(Mixin)
  Vue.use(Translation)
  Vue.use(Blog)
  customer(router, siteData)
  baiDu(router, siteData)
  curtain(store, siteData)
  Vue.use(Ant)
}

if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
  console.log('\n%c(づ￣ ³￣)づヾ Author：cnguu%c VuePress Theme - Yur \n', 'color: #fadfa3; background: #030307; padding:5px;', 'background: #fadfa3; padding:5px 0;')
}

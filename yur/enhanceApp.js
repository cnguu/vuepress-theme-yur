import routes from '@theme/utils/route'
import Mixin from '@theme/utils/mixin'
import Translation from '@theme/plugins/Translation'
import Blog from '@theme/plugins/Blog'
import customer from '@theme/plugins/PartyC/customer'
import baiDu from '@theme/plugins/PartyC/baiDu'
import Ant from 'ant-design-vue/es'
import Mermaid from '@theme/components/Mermaid'
import 'ant-design-vue/dist/antd.less'
import '@theme/styles/index.less'

export default ({ Vue, options, router, siteData }) => {
  Vue.use(routes, { router })
  Vue.use(Mixin)
  Vue.use(Translation)
  Vue.use(Blog)
  customer(router, siteData)
  baiDu(router, siteData)
  Vue.use(Ant)
  Vue.component('mermaid', Mermaid)
}

if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
  console.log('\n%c(づ￣ ³￣)づヾ Author：cnguu%c VuePress Theme - Yur \n', 'color: #fadfa3; background: #030307; padding:5px;', 'background: #fadfa3; padding:5px 0;')
}

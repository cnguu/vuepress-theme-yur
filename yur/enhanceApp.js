import store from '@theme/store'
import Translation from '@theme/plugins/Translation'
import { getTags } from '@theme/utils'
import Mixin from '@theme/utils/mixin'
import routes from '@theme/utils/route'
import Ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import '@theme/styles/index.less'

export default ({ Vue, options, router, siteData }) => {
  Vue.mixin({ store })
  Vue.use(Translation)
  Vue.use(Mixin)
  Vue.use(routes, { router })
  Vue.use(Ant)

  Vue.prototype.$tags || (Vue.prototype.$tags = getTags(siteData))
}

if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
  console.log('\n%c(づ￣ ³￣)づヾ Author：cnguu%c VuePress Theme - Yur \n', 'color: #fadfa3; background: #030307; padding:5px;', 'background: #fadfa3; padding:5px 0;')
}

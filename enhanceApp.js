import store from './store';
import axios from 'axios';
import Ant from 'ant-design-vue';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import { isPro, isBuild, withBase } from './util';
import 'moment/locale/zh-cn';
import 'ant-design-vue/dist/antd.less';
import './styles/index.less';

moment.locale('zh-cn');

export default ({ Vue, options, router, siteData }) => {
    Vue.config.devtools = false;
    Vue.config.productionTip = false;
    Vue.use(Ant);
    Vue.mixin({ store });
    Vue.prototype.$zh_CN = zh_CN;
    Vue.prototype.$moment = moment;
    Vue.prototype.$posts = getPosts(siteData);
    Vue.prototype.$tags = getTags(siteData);
    Vue.prototype.$categories = getCategories(siteData);
    Vue.prototype.$withBase = path => withBase(path, siteData);
    baiDuPush(Vue, siteData);
    crisp(siteData);
};

export function crisp(siteData) {
    const { crisp } = siteData.themeConfig;
    if (crisp && isPro()) {
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = crisp;
        (function () {
            let newChild = document.createElement('script');
            newChild.src = 'https://client.crisp.chat/l.js';
            newChild.async = 1;
            document.getElementsByTagName('head')[0].appendChild(newChild);
        })();
    }
}

export function baiDuPush(Vue, siteData) {
    const { site, baiDuActivePush, baiDuAuthPush } = siteData.themeConfig;
    if (isPro() && baiDuAuthPush) {
        (function () {
            let newChild = document.createElement('script'),
                refChild = document.getElementsByTagName('script')[0];
            newChild.src = 'https://zz.bdstatic.com/linksubmit/push.js';
            refChild.parentNode.insertBefore(newChild, refChild);
        })();
    }
    if (isBuild() && site && baiDuActivePush && Vue.prototype.$posts.length) {
        let urls = [];
        Vue.prototype.$posts.forEach(post => {
            const { regularPath } = post;
            urls.push(site + regularPath);
        });
        axios.post(`http://data.zz.baidu.com/urls?site=${ site }&token=${ baiDuActivePush }`, urls.join('\n'), {
            headers: {
                'Content-Type': 'text/plain',
            },
        }).then(response => {
            if (response.data) {
                console.log('百度主动推送成功数量：' + response.data.success);
            } else {
                console.log('百度主动推送失败');
            }
        });
    }
}

export function getCategories(siteData) {
    const { nav } = siteData.themeConfig;
    let categories = [];
    if (nav && nav.length) {
        for (let item of nav) {
            let link = item.link,
                linkLen = link.length;
            categories.push(link.substring(1, linkLen - 1));
        }
    }
    return categories;
}

export function getTags(siteData) {
    let posts = getPosts(siteData),
        _tags = {};
    if (posts && posts.length) {
        for (let post of posts) {
            const { tags } = post.frontmatter;
            for (let tag of tags) {
                if (!_tags.hasOwnProperty(tag)) {
                    _tags[tag] = [];
                }
                _tags[tag].push(post);
            }
        }
    }
    return _tags;
}

export function getPosts(siteData) {
    const { pages } = siteData;
    let posts = {};
    if (pages && pages.length) {
        posts = pages.filter(page => {
            const { date } = page.frontmatter;
            return !(date === undefined);
        });
        posts.sort((a, b) => {
            return str2time(b.frontmatter.date) - str2time(a.frontmatter.date);
        });
    }
    return posts;
}

export function str2time(date) {
    return new Date(date).getTime();
}

console.log(`\n%c(づ￣ ³￣)づヾ 作者：cnguu%c VuePress 博客主题 - Yur \n`, 'color: #fadfa3; background: #030307; padding:5px;', 'background: #fadfa3; padding:5px 0;');
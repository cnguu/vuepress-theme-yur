import store from './store';
import Ant from 'ant-design-vue';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import {isPro} from './util';
import 'moment/locale/zh-cn';
import 'ant-design-vue/dist/antd.less';
import './styles/index.less';

moment.locale('zh-cn');

export default ({Vue, options, router, siteData}) => {
    Vue.config.devtools = false;
    Vue.config.productionTip = false;
    Vue.use(Ant);
    Vue.mixin({store});
    Vue.prototype.$zh_CN = zh_CN;
    Vue.prototype.$moment = moment;
    Vue.prototype.$posts = getPosts(siteData);
    Vue.prototype.$tags = getTags(siteData);
    Vue.prototype.$categories = getCategories(siteData);
    curtain(siteData);
    baiDuAuthPush(siteData);
    baiDuTongJi(router, siteData);
    customer(router, siteData);
};

export function customer(router, siteData) {
    const {crisp, daoVoice} = siteData.themeConfig;
    if (isPro()) {
        if (crisp) {
            window.$crisp = [];
            window.CRISP_WEBSITE_ID = crisp;
            (function () {
                let newChild = document.createElement('script');
                newChild.src = 'https://client.crisp.chat/l.js';
                newChild.async = 1;
                document.getElementsByTagName('head')[0].appendChild(newChild);
            })();
        } else if (daoVoice) {
            // (function (i, s, o, g, r, a, m) {
            //     i['DaoVoiceObject'] = r;
            //     i[r] = i[r] || function () {
            //         (i[r].q = i[r].q || []).push(arguments);
            //     };
            //     i[r].l = 1 * new Date();
            //     a = s.createElement(o);
            //     m = s.getElementsByTagName(o)[0];
            //     a.async = 1;
            //     a.src = g;
            //     m.parentNode.insertBefore(a, m);
            // })(window, document, 'script', `https://widget.daovoice.io/widget/${ daoVoice }.js`, 'daovoice');
            // daovoice('init', { app_id: daoVoice });
            // daovoice('update');
            // router.afterEach((to, from) => {
            //     daovoice('update', to.fullPath);
            // });
        }
    }
}

export function baiDuTongJi(router, siteData) {
    const {baiDuTongJi} = siteData.themeConfig;
    if (isPro() && baiDuTongJi) {
        window._hmt = window._hmt || [];
        (function () {
            let newChild = document.createElement('script'),
                refChild = document.getElementsByTagName('script')[0];
            newChild.src = `https://hm.baidu.com/hm.js?${baiDuTongJi}`;
            refChild.parentNode.insertBefore(newChild, refChild);
        })();
        router.afterEach(to => {
            _hmt.push(['_trackPageview', to.fullPath]);
        });
    }
}

export function baiDuAuthPush(siteData) {
    const {baiDuAuthPush} = siteData.themeConfig;
    if (isPro() && baiDuAuthPush) {
        (function () {
            let newChild = document.createElement('script'),
                refChild = document.getElementsByTagName('script')[0];
            newChild.src = 'https://zz.bdstatic.com/linksubmit/push.js';
            refChild.parentNode.insertBefore(newChild, refChild);
        })();
    }
}

export function curtain(siteData) {
    const {curtain} = siteData.themeConfig;
    if (curtain) {
        store.dispatch('changeSetting', {
            key: 'curtain',
            value: true,
        });
    }
}

export function getCategories(siteData) {
    const {nav} = siteData.themeConfig;
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
            const {tags} = post.frontmatter;
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
    const {pages} = siteData;
    let posts = {};
    if (pages && pages.length) {
        posts = pages.filter(page => {
            const {date} = page.frontmatter;
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

if (isPro()) {
    console.log(`\n%c(づ￣ ³￣)づヾ 作者：cnguu%c VuePress 博客主题 - Yur \n`, 'color: #fadfa3; background: #030307; padding:5px;', 'background: #fadfa3; padding:5px 0;');
}
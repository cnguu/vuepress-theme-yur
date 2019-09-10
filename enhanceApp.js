import Ant from 'ant-design-vue';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './styles/index.less';

export default ({ Vue, options, router, siteData }) => {
    Vue.config.devtools = false;
    Vue.config.productionTip = false;
    Vue.use(Ant);
    moment.locale('zh-cn');
    Vue.prototype.$zh_CN = zh_CN;
    Vue.prototype.$moment = moment;
    Vue.prototype.$posts = getPosts(siteData);
    Vue.prototype.$tags = getTags(siteData);
    Vue.prototype.$categories = getCategories(siteData);
    Vue.prototype.$withBase = path => {
        if (path) {
            if (path.charAt(0) === '/') {
                return siteData.base + path.slice(1);
            }
        }
        return path;
    };
    console.log(`\n%c(づ￣ ³￣)づヾ 作者：cnguu%c VuePress 博客主题 - Yur \n`, 'color: #fadfa3; background: #030307; padding:5px;', 'background: #fadfa3; padding:5px 0;');
};

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
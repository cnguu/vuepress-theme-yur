const path = require('path');
module.exports = (options, ctx) => ({
    name: 'vuepress-theme-yur',
    chainWebpack(config, isServer) {
        config.module
            .rule('less')
            .oneOf('normal')
            .use('less-loader')
            .options({ javascriptEnabled: true })
            .end()
            .end()
            .oneOf('modules')
            .use('less-loader')
            .options({ javascriptEnabled: true });
    },
    alias() {
        const { themeConfig, siteConfig, sourceDir } = ctx;
        const { sep } = path;
        // resolve algolia
        const isAlgoliaSearch = (themeConfig.algolia || Object.keys(siteConfig.locales && themeConfig.locales || {}).some(base => themeConfig.locales[base].algolia));
        return {
            '@AlgoliaSearchBox': isAlgoliaSearch
                ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
                : path.resolve(__dirname, 'noopModule.js'),
            '@us': `${ sourceDir }${ sep }.vuepress${ sep }styles`,
        };
    },
    plugins: [
        ['@vuepress/medium-zoom', {
            selector: '.content__default img',
        }],
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: {
                message: '发现新版本',
                buttonText: '更新',
            },
        }],
        '@vuepress/register-components',
        ['@vuepress/search', {
            searchMaxSuggestions: 10,
        }],
        ['container', {
            type: 'tip',
            defaultTitle: '',
        }],
        ['container', {
            type: 'warning',
            defaultTitle: '',
        }],
        ['container', {
            type: 'danger',
            defaultTitle: '',
        }],
        ['permalink-pinyin', {
            lowercase: true,
            separator: '-',
        }],
    ],
    additionalPages: [
        {
            path: '/',
        },
        {
            path: '/posts/',
            frontmatter: {
                title: '全部博文',
                meta: [
                    {
                        name: 'description',
                        content: '全部博文',
                    },
                    {
                        name: 'keywords',
                        content: '全部博文',
                    },
                ],
            },
        },
        {
            path: '/tags/',
            frontmatter: {
                title: '全部标签',
                meta: [
                    {
                        name: 'description',
                        content: '全部标签',
                    },
                    {
                        name: 'keywords',
                        content: '全部标签',
                    },
                ],
            },
        },
        {
            path: '/timeline.html',
            frontmatter: {
                title: '时间线',
                meta: [
                    {
                        name: 'description',
                        content: '时间线',
                    },
                    {
                        name: 'keywords',
                        content: '时间线',
                    },
                ],
            },
        },
        {
            path: '/link.html',
            frontmatter: {
                title: '友人帐',
                meta: [
                    {
                        name: 'description',
                        content: '友人帐',
                    },
                    {
                        name: 'keywords',
                        content: '友人帐',
                    },
                ],
            },
        },
    ],
});
const path = require('path');
const SHA256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');

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
    extendMarkdown: md => {
        md.use(require('markdown-it-image-lazy-loading'));
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
            type: 'success',
            defaultTitle: '',
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
    extendPageData($page) {
        const { themeConfig } = ctx;
        const { _filePath, _computed, _content, _strippedContent, key, frontmatter, regularPath, path, } = $page;
        let pwd = '52yur';
        if (themeConfig) {
            const { password } = themeConfig;
            if (password) {
                pwd = password;
            }
        }
        if (frontmatter) {
            const { password } = frontmatter;
            if (password) {
                if (typeof password !== 'boolean') {
                    pwd = password;
                }
                delete frontmatter.password;
                $page.password = Base64.stringify(SHA256(pwd));
            }
        }
        // if (_content) {
        //     const imageReg = /!\[[\s\S]*?]\([\s\S]*?\)/g;
        //     const srcReg = /\((.+)\)/;
        //     const images = _content.match(imageReg);
        //     if (images && themeConfig.hasOwnProperty('cdn') && themeConfig.cdn.hasOwnProperty('github')) {
        //         images.forEach(image => {
        //             const [substring, path, index, input, groups] = image.match(srcReg);
        //             if (path && path.charAt(0) === '/') {
        //                 $page._content = _content.replace(path, themeConfig.cdn.github + path);
        //             }
        //         });
        //     }
        // }
    }
});
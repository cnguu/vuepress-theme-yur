module.exports = [
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
];
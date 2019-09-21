const path = require('path');
const plugins = require('./config/plugins');
const additionalPages = require('./config/page');
module.exports = (options, ctx) => ({
    name: 'vuepress-theme-yur',
    alias() {
        const { themeConfig, siteConfig } = ctx;
        // resolve algolia
        const isAlgoliaSearch = (themeConfig.algolia || Object.keys(siteConfig.locales && themeConfig.locales || {}).some(base => themeConfig.locales[base].algolia));
        return {
            '@AlgoliaSearchBox': isAlgoliaSearch
                ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
                : path.resolve(__dirname, 'noopModule.js')
        };
    },
    plugins,
    additionalPages,
});
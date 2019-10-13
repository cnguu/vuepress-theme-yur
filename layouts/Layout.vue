<template>
    <a-locale-provider :locale="zh_CN">
        <div id="VuePress-theme-yur">
            <YurCurtain v-show="getCurtain"/>
            <YurHeader :current-page="currentPage"/>
            <YurContent :current-page="currentPage" :current-post="currentPost"/>
            <YurFooter/>
        </div>
    </a-locale-provider>
</template>

<script>
    import YurCurtain from '@theme/components/YurCurtain';
    import YurHeader from '@theme/components/YurHeader';
    import YurContent from '@theme/components/YurContent';
    import YurFooter from '@theme/components/YurFooter';

    export default {
        components: { YurCurtain, YurHeader, YurContent, YurFooter },
        props: {},
        data() {
            return {
                zh_CN: this.$zh_CN,
                currentPage: '/',
                currentPost: '',
            };
        },
        beforeCreate() {
            for (let post of this.$posts) {
                if (!post.frontmatter.hasOwnProperty('banner')) {
                    post.frontmatter.banner = require('../images/default.jpg');
                }
            }
            for (let tag in this.$tags) {
                for (let post of this.$tags[tag]) {
                    if (!post.frontmatter.hasOwnProperty('banner')) {
                        post.frontmatter.banner = require('../images/default.jpg');
                    }
                }
            }
        },
        created() {
            this.handleRoute();
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        watch: {
            '$route': 'handleRoute',
        },
        computed: {
            getCurtain() {
                return this.$store.state.settings.curtain;
            },
        },
        methods: {
            handleRoute() {
                let path = this.$route.path.split('/'),
                    pathPop = path.pop(),
                    pathPopPop = path.pop();
                this.currentPage = '/';
                this.currentPost = '';
                if (pathPop.length > 0) {
                    if (pathPopPop.length > 0) {
                        this.currentPage = pathPopPop;
                        this.currentPost = pathPop.split('.').shift();
                    } else {
                        this.currentPage = pathPop.split('.').shift();
                    }
                } else if (pathPopPop.length > 0) {
                    this.currentPage = pathPopPop;
                }
            },
        },
    };
</script>

<style lang="less" scoped>
</style>
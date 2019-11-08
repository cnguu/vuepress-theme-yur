<template>
    <div id="yur-link">
        <a-skeleton active :loading="loading">
            <div class="banner">
                <a-skeleton active :loading="loading">
                    <img :src="$withBase(link.banner)" :alt="title">
                </a-skeleton>
            </div>
        </a-skeleton>
        <Content/>
        <div class="content">
            <a-row>
                <a-col v-for="blog in link.blog"
                       :xs="24"
                       :sm="12"
                       :md="8"
                       :lg="6"
                >
                    <a-skeleton active :loading="loading">
                        <div class="card"
                             :style="{
                                borderTop: '3px solid ' + blog.color,
                             }"
                        >
                            <a :href="blog.link"
                               class="title"
                               target="_blank"
                               rel="noopener noreferrer"
                            >
                                {{ blog.title }}
                            </a>
                            <div class="subtitle">{{ blog.subtitle }}</div>
                            <a :href="blog.link"
                               class="logo"
                               target="_blank"
                               rel="noopener noreferrer"
                               :style="{
                                   backgroundImage: `url(${ blog.logo })`,
                                   backgroundColor: blog.color,
                               }"
                            />
                        </div>
                    </a-skeleton>
                </a-col>
            </a-row>
        </div>
        <YurComment/>
    </div>
</template>

<script>
    import YurComment from '@theme/components/YurComment';
    import {isPro, getTimeOut} from '../util';

    export default {
        components: {YurComment},
        props: {},
        data() {
            return {
                loading: true,
                title: '凉风有信',
                link: {
                    banner: require('../media/images/summer-solstice-strawberry-moon.gif'),
                    blog: [
                        {
                            title: '凉风有信',
                            subtitle: '责难无以成事',
                            link: 'https://gleehub.com/',
                            logo: 'https://static.xmt.cn/cc50c217cbe342ce951324583f2c6139.png',
                            color: '#3c67bd',
                        },
                    ],
                },
                isPro,
            };
        },
        beforeCreate() {
        },
        created() {
            this.initConfig();
            this.$nextTick(() => {
                setTimeout(() => {
                    this.$store.dispatch('changeSetting', {
                        key: 'curtain',
                        value: false,
                    });
                    document.getElementsByTagName('body')[0].style.overflow = 'unset';
                }, getTimeOut(this.$store.state.settings.consoleTime));
            });
        },
        beforeMount() {
        },
        mounted() {
            this.loading = false;
        },
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        watch: {},
        computed: {},
        methods: {
            initConfig() {
                const {title} = this.$site;
                const {link} = this.$themeConfig;
                if (title) {
                    this.title = title;
                }
                if (link) {
                    const {banner, blog} = link;
                    if (banner) {
                        this.link.banner = this.$withBase(banner);
                    }
                    if (blog.length) {
                        this.link.blog = blog;
                    }
                }
            },
        },
    };
</script>

<style lang="less" scoped>
</style>
<template>
    <div id="yur-banner">
        <div class="banner-page">
            <div class="img-wrapper">
                <a-skeleton active :loading="loading">
                    <img :src="banner" :alt="title">
                </a-skeleton>
            </div>
            <div class="text-wrapper">
                <div class="title-line-wrapper">
                    <div class="title-line"></div>
                </div>
                <h1>{{ title }}</h1>
                <p>
                    <span class="subtitle">{{ subtitle }}</span>
                </p>
                <div class="banner-btn-group">
                    <router-link to="/posts/?page=1&pageSize=12">
                        <a-button type="primary">阅读博客</a-button>
                    </router-link>
                    <router-link to="/about">
                        <a-button>了解博主</a-button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="page-1">
            <div class="page">
                <h2>
                    <span>最近更新</span>
                </h2>
                <a-row v-if="updatedPosts.length">
                    <a-col v-for="post in updatedPosts"
                           :key="post.path"
                           :xs="24"
                           :md="8"
                    >
                        <router-link :to="post.path">
                            <div class="banner">
                                <a-skeleton active :loading="loading">
                                    <img :src="$withBase(post.frontmatter.banner)" :alt="post.title">
                                </a-skeleton>
                            </div>
                            <h3>
                                <span>{{ post.title }}</span>
                            </h3>
                        </router-link>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="page-2">
            <div class="page">
                <YurTagCloud/>
            </div>
        </div>
    </div>
</template>

<script>
    import { init } from 'ityped';
    import YurTagCloud from '@theme/components/YurTagCloud';
    import { getTimeOut } from '../util';

    export default {
        components: { YurTagCloud },
        props: {},
        data() {
            return {
                loading: true,
                title: '凉风有信',
                description: '责难无以成事',
                subtitle: '责难无以成事',
                banner: require('../images/banner.png'),
                ityped: null,
                updatedPosts: [],
            };
        },
        beforeCreate() {
        },
        created() {
            this.initConfig();
            setTimeout(() => {
                this.$store.dispatch('changeSetting', {
                    key: 'curtain',
                    value: false,
                });
                document.getElementsByTagName('body')[0].style.overflow = 'unset';
            }, getTimeOut(this.$store.state.settings.consoleTime));
        },
        beforeMount() {
        },
        mounted() {
            if (this.ityped) {
                this.subtitle = '';
                init('span.subtitle', Object.assign({}, {
                    strings: [this.description],
                }, this.ityped));
            }
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
                const { title, description } = this.$site;
                const { banner, ityped } = this.$themeConfig;
                if (title) {
                    this.title = title;
                }
                if (description) {
                    this.description = description;
                }
                if (banner) {
                    this.banner = this.$withBase(banner);
                }
                if (ityped) {
                    this.ityped = ityped;
                }
                this.updatedPosts = Array.from(this.$posts);
                if (this.updatedPosts.length) {
                    this.updatedPosts.sort((a, b) => {
                        let a_update_date = a.frontmatter.hasOwnProperty('update_date') ? new Date(a.frontmatter.update_date).getTime() : 0;
                        let b_update_date = b.frontmatter.hasOwnProperty('update_date') ? new Date(b.frontmatter.update_date).getTime() : 0;
                        return b_update_date - a_update_date;
                    });
                    this.updatedPosts = this.updatedPosts.slice(0, 3);
                }
            },
        },
    };
</script>

<style lang="less" scoped>
</style>
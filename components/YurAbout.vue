<template>
    <div id="yur-about">
        <a-skeleton active :loading="loading">
            <div class="widget"
                 :style="{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(' + about.banner + ')',
                 }"
            >
                <img class="avatar"
                     :src="about.avatar"
                     :alt="about.name"
                >
                <p class="name">{{ about.name }}</p>
                <p class="introduction">{{ about.introduction }}</p>
                <div class="total">
                    <router-link to="/posts/?page=1&pageSize=12">
                        <a-badge status="processing" :text="'文章：' + $posts.length || 0"/>
                    </router-link>
                    <a-badge status="processing" :text="'分类：' + $categories.length || 0"/>
                    <a-badge status="processing" :text="'标签：' + Object.keys($tags).length || 0"/>
                </div>
            </div>
        </a-skeleton>
        <Content/>
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
                about: {
                    banner: require('../media/images/first-day-of-spring-2016-northern-hemisphere.gif'),
                    avatar: 'https://static.xmt.cn/cc50c217cbe342ce951324583f2c6139.png',
                    name: 'cnguu',
                    introduction: '责难无以成事',
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
                    this.changeImageSrc();
                }, 300);
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
                const {about} = this.$themeConfig;
                if (about) {
                    const {banner, avatar, name, introduction} = about;
                    if (banner) {
                        this.about.banner = this.$withBase(banner);
                    }
                    if (avatar) {
                        this.about.avatar = this.$withBase(avatar);
                    }
                    if (name) {
                        this.about.name = name;
                    }
                    if (introduction) {
                        this.about.introduction = introduction;
                    }
                }
            },
            changeImageSrc() {
                const {cdn} = this.$themeConfig;
                if (cdn) {
                    const {github} = cdn;
                    const images = document.getElementsByClassName('content__default')[0].getElementsByTagName('img');
                    if (github && images.length) {
                        for (let i = 0; i < images.length; i++) {
                            const src = images[i].getAttribute('src');
                            if (src.charAt(0) === '/') {
                                images[i].src = github + src;
                            }
                        }
                    }
                }
            },
        },
    };
</script>

<style lang="less" scoped>
</style>
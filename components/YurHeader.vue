<template>
    <header id="yur-header">
        <a-popover trigger="click" v-model="visible" placement="rightBottom">
            <template slot="content">
                <div id="yur-mobile-menu">
                    <a-menu v-model="current" mode="inline" class="menu">
                        <a-sub-menu v-if="userLinks.length" key="category">
                            <span slot="title">分类</span>
                            <a-menu-item-group>
                                <a-menu-item v-for="userLink in userLinks"
                                             :key="userLink.key"
                                             @click="changeVisible"
                                >
                                    <router-link :to="userLink.link">{{ userLink.text }}</router-link>
                                </a-menu-item>
                            </a-menu-item-group>
                        </a-sub-menu>
                        <a-menu-item v-if="timeline" key="timeline" @click="changeVisible">
                            <router-link to="/timeline">时间轴</router-link>
                        </a-menu-item>
                        <a-menu-item v-if="link" key="link" @click="changeVisible">
                            <router-link to="/link">友人帐</router-link>
                        </a-menu-item>
                        <a-menu-item v-if="about" key="about" @click="changeVisible">
                            <router-link to="/about">关于我</router-link>
                        </a-menu-item>
                    </a-menu>
                </div>
            </template>
            <a-icon type="align-right" class="menu-icon"/>
        </a-popover>
        <a-row>
            <a-col :xxl="4" :xl="5" :lg="5" :md="5" :sm="24" :xs="24">
                <router-link to="/" id="yur-logo">
                    <a-skeleton active :loading="loading">
                        <img :src="logo" :alt="title">
                    </a-skeleton>
                    <svg :width="nameplate.width" :height="nameplate.height" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <text v-for="item in nameplate.text"
                                  :font-size="item.fontSize"
                                  :text-anchor="item.textAnchor"
                                  :x="item.x"
                                  :y="item.y"
                                  :text-transform="item.textTransform"
                                  :fill="item.fill"
                                  :stroke="item.stroke"
                                  :text-shadow="item.textShadow"
                                  :stroke-width="item.strokeWidth"
                                  :stroke-dasharray="item.strokeDasharray"
                            >
                                {{ title }}
                                <animate :attributeName="item.animate.attributeName"
                                         :begin="item.animate.begin"
                                         :dur="item.animate.dur"
                                         :from="item.animate.from"
                                         :to="item.animate.to"
                                         :repeatCount="item.animate.repeatCount"
                                />
                            </text>
                        </g>
                    </svg>
                </router-link>
            </a-col>
            <a-col :xxl="20" :xl="19" :lg="19" :md="19" :sm="0" :xs="0">
                <YurSearch v-if="$themeConfig.search !== false && $page.frontmatter.search !== false"/>
                <YurMenu :current-page="currentPage"
                         :user-links="userLinks"
                />
            </a-col>
        </a-row>
    </header>
</template>

<script>
    import YurSearch from '@theme/components/YurSearch';
    import YurMenu from '@theme/components/YurMenu';
    import { resolveNavLinkItem } from '../util';

    export default {
        components: { YurSearch, YurMenu },
        props: {
            currentPage: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                loading: true,
                current: ['/'],
                visible: false,
                userLinks: [],
                title: '凉风有信',
                logo: require('../media/images/logo.png'),
                nameplate: {
                    width: '86px',
                    height: '36px',
                    text: [
                        {
                            fontSize: '20',
                            textAnchor: 'middle',
                            x: '50%',
                            y: '50%',
                            textTransform: 'uppercase',
                            fill: 'none',
                            stroke: '#3498db',
                            textShadow: '0 0 1px #3498db',
                            strokeWidth: '1px',
                            strokeDasharray: '90 310',
                            animate: {
                                attributeName: 'stroke-dashoffset',
                                begin: '-1.5s',
                                dur: '6s',
                                from: '0',
                                to: '-400',
                                repeatCount: 'indefinite',
                            },
                        },
                        {
                            fontSize: '20',
                            textAnchor: 'middle',
                            x: '50%',
                            y: '50%',
                            textTransform: 'uppercase',
                            fill: 'none',
                            stroke: '#f39c12',
                            textShadow: '0 0 1px #f39c12',
                            strokeWidth: '1px',
                            strokeDasharray: '90 310',
                            animate: {
                                attributeName: 'stroke-dashoffset',
                                begin: '-3s',
                                dur: '6s',
                                from: '0',
                                to: '-400',
                                repeatCount: 'indefinite',
                            },
                        },
                        {
                            fontSize: '20',
                            textAnchor: 'middle',
                            x: '50%',
                            y: '50%',
                            textTransform: 'uppercase',
                            fill: 'none',
                            stroke: '#e74c3c',
                            textShadow: '0 0 1px #e74c3c',
                            strokeWidth: '1px',
                            strokeDasharray: '90 310',
                            animate: {
                                attributeName: 'stroke-dashoffset',
                                begin: '-4.5s',
                                dur: '6s',
                                from: '0',
                                to: '-400',
                                repeatCount: 'indefinite',
                            },
                        },
                        {
                            fontSize: '20',
                            textAnchor: 'middle',
                            x: '50%',
                            y: '50%',
                            textTransform: 'uppercase',
                            fill: 'none',
                            stroke: '#9b59b6',
                            textShadow: '0 0 1px #9b59b6',
                            strokeWidth: '1px',
                            strokeDasharray: '90 310',
                            animate: {
                                attributeName: 'stroke-dashoffset',
                                begin: '-6s',
                                dur: '6s',
                                from: '0',
                                to: '-400',
                                repeatCount: 'indefinite',
                            },
                        },
                    ],
                },
                timeline: false,
                link: false,
                about: false,
            };
        },
        beforeCreate() {
        },
        created() {
            this.initConfig();
            this.handleRoute();
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
        watch: {
            '$route': 'handleRoute',
        },
        computed: {},
        methods: {
            initConfig() {
                const { title } = this.$site;
                const { nav, logo, nameplate, timeline, link, about } = this.$themeConfig;
                if (nav) {
                    nav.forEach(item => {
                        const { link, key } = item;
                        if (link && !key) {
                            if (link.charAt(0) === '/') {
                                item.key = link.split('/')[1];
                                item.link = `${ link }?page=1&pageSize=12`;
                            }
                        }
                    });
                    this.userLinks = nav;
                }
                if (title) {
                    this.title = title;
                }
                if (logo) {
                    this.logo = this.$withBase(logo);
                }
                if (nameplate) {
                    const { width, height, text } = nameplate;
                    if (width) {
                        this.nameplate.width = width;
                    }
                    if (height) {
                        this.nameplate.height = height;
                    }
                    if (text) {
                        this.nameplate.text = text;
                    }
                }
                if (timeline) {
                    this.timeline = true;
                }
                if (link) {
                    this.link = true;
                }
                if (about) {
                    this.about = true;
                }
            },
            handleRoute() {
                this.current = [this.currentPage];
            },
            changeVisible() {
                this.visible = false;
            },
        },
    };
</script>

<style lang="less" scoped>
</style>
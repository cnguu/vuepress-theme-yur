<template>
    <header id="yur-header">
        <a-popover trigger="click" v-model="visible" placement="rightBottom">
            <template slot="content">
                <YurMobileMenu :current-page="currentPage" :user-links="userLinks"/>
            </template>
            <a-icon type="align-right" class="menu-icon"/>
        </a-popover>
        <a-row>
            <a-col :xxl="4" :xl="5" :lg="5" :md="5" :sm="24" :xs="24">
                <router-link to="/" id="yur-logo">
                    <img :src="$withBase($themeConfig.logo) || require('../images/logo.png')"
                         :alt="$site.title || '凉风有信'">
                    <svg width="86px" height="36px" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <text font-size="20" text-anchor="middle" x="50%" y="50%" text-transform="uppercase"
                                  fill="none" stroke="#3498db" text-shadow="0 0 1px #3498db" stroke-width="1px"
                                  stroke-dasharray="90 310">{{ $site.title || '凉风有信' }}
                                <animate attributeName="stroke-dashoffset" begin="-1.5s" dur="6s" from="0" to="-400"
                                         repeatCount="indefinite"/>
                            </text>
                            <text font-size="20" text-anchor="middle" x="50%" y="50%" text-transform="uppercase"
                                  fill="none" stroke="#f39c12" text-shadow="0 0 1px #f39c12" stroke-width="1px"
                                  stroke-dasharray="90 310">{{ $site.title || '凉风有信' }}
                                <animate attributeName="stroke-dashoffset" begin="-3s" dur="6s" from="0" to="-400"
                                         repeatCount="indefinite"/>
                            </text>
                            <text font-size="20" text-anchor="middle" x="50%" y="50%" text-transform="uppercase"
                                  fill="none" stroke="#e74c3c" text-shadow="0 0 1px #e74c3c" stroke-width="1px"
                                  stroke-dasharray="90 310">{{ $site.title || '凉风有信' }}
                                <animate attributeName="stroke-dashoffset" begin="-4.5s" dur="6s" from="0" to="-400"
                                         repeatCount="indefinite"/>
                            </text>
                            <text font-size="20" text-anchor="middle" x="50%" y="50%" text-transform="uppercase"
                                  fill="none" stroke="#9b59b6" text-shadow="0 0 1px #9b59b6" stroke-width="1px"
                                  stroke-dasharray="90 310">{{ $site.title || '凉风有信' }}
                                <animate attributeName="stroke-dashoffset" begin="-6s" dur="6s" from="0" to="-400"
                                         repeatCount="indefinite"/>
                            </text>
                        </g>
                    </svg>
                </router-link>
            </a-col>
            <a-col :xxl="20" :xl="19" :lg="19" :md="19" :sm="0" :xs="0">
                <YurSearch v-if="$themeConfig.search !== false && $page.frontmatter.search !== false"/>
                <YurMenu :current-page="currentPage" :user-links="userLinks"/>
            </a-col>
        </a-row>
    </header>
</template>

<script>
    import YurSearch from '@theme/components/YurSearch';
    import YurMenu from '@theme/components/YurMenu';
    import YurMobileMenu from '@theme/components/YurMobileMenu';
    import { resolveNavLinkItem } from '../util';

    export default {
        components: { YurSearch, YurMenu, YurMobileMenu },
        props: {
            currentPage: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                visible: false,
            };
        },
        beforeCreate() {
        },
        created() {
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
        watch: {},
        computed: {
            userNav() {
                return this.$themeLocaleConfig.nav || this.$themeConfig.nav || [];
            },
            nav() {
                const { locales } = this.$site;
                if (locales && Object.keys(locales).length > 1) {
                    return [...this.userNav];
                }
                return this.userNav;
            },
            userLinks() {
                return (this.nav || []).map(link => {
                    return Object.assign(resolveNavLinkItem(link), {
                        items: (link.items || []).map(resolveNavLinkItem),
                    });
                });
            },
        },
        methods: {},
    };
</script>

<style lang="less">
    @import "../styles/variable.less";

    #yur-header {
        position: relative;
        margin: 20px auto 0;
        padding: 0 24px;
        width: 100%;
        max-width: 1200px;

        .menu-icon {
            display: none;
            position: absolute;
            top: 25px;
            right: 30px;
            cursor: pointer;
            z-index: 1;
        }

        #yur-logo {
            float: left;
            height: 64px;
            line-height: 64px;
            white-space: nowrap;
            text-decoration: none;
            overflow: hidden;

            img {
                height: 32px;
                margin-right: 16px;

                & + svg {
                    position: relative;
                    top: 20px;
                }
            }
        }
    }

    @media only screen and (max-width: 767.99px) {
        #yur-header {
            text-align: center;

            .menu-icon {
                display: block;
            }

            #yur-logo {
                float: initial;
            }
        }
    }
</style>
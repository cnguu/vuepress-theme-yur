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
                    <span class="subtitle"></span>
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
                banner: require('../images/banner.png'),
                updatedPosts: [],
            };
        },
        beforeCreate() {
        },
        created() {
            this.initConfig();
        },
        beforeMount() {
        },
        mounted() {
            init('span.subtitle', {
                strings: [this.description],
                typeSpeed: 300,
                backSpeed: 100,
                startDelay: 300,
                backDelay: 300,
                loop: true,
                showCursor: true,
                placeholder: false,
                disableBackTyping: false,
                cursorChar: '丨',
            });
            this.loading = false;
            setTimeout(() => {
                this.$store.dispatch('changeSetting', {
                    key: 'curtain',
                    value: false,
                });
                document.getElementsByTagName('body')[0].style.overflow = 'unset';
            }, getTimeOut(this.$store.state.settings.consoleTime));
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
                const { banner } = this.$themeConfig;
                if (title) {
                    this.title = title;
                }
                if (description) {
                    this.description = description;
                }
                if (banner) {
                    this.banner = this.$withBase(banner);
                }
                this.updatedPosts = this.$posts;
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

<style lang="less">
    @import "../styles/variable.less";

    #yur-banner {
        position: relative;

        .ityped-cursor {
            font-size: 20px;
            opacity: 1;
            animation: ityped 0.3s infinite;
            animation-direction: alternate;
        }

        .banner-page {
            position: relative;
            width: 100%;
            max-width: 1200px;
            height: 576px;
            margin: auto;
            padding: 0 24px;
            overflow: hidden;
            display: flex;
            align-items: center;
            -webkit-box-align: center;

            .img-wrapper {
                position: absolute;
                right: 0;
                bottom: 26px;
                width: 46%;
                max-width: 482px;

                img {
                    width: 100%;
                    height: 500px;
                }
            }

            .text-wrapper {
                width: 54%;
                min-width: 420px;
                max-width: 560px;
                min-height: 336px;
                color: #0d1a26;

                .title-line-wrapper {
                    width: 80%;
                    height: 2px;
                    overflow: hidden;

                    .title-line {
                        width: 64px;
                        height: 100%;
                        background: linear-gradient(90deg, fade(@primary-color, 0) 0, @primary-color);
                        transform: translateX(-64px);
                        animation: bannerTitleLine 3s ease-in-out 0s infinite;
                    }
                }

                h1 {
                    margin: 8px 0 28px;
                    font-weight: 600;
                    font-size: 68px;
                    line-height: 76px;
                    letter-spacing: 0;
                }

                p {
                    color: @text-color-secondary;
                    font-size: 20px;
                    line-height: 40px;
                }

                .banner-btn-group {
                    a {
                        button {
                            height: 40px;
                            padding: 0 24px;
                            font-size: 16px;
                            line-height: 38px;
                            border-radius: 100px;
                        }

                        &:last-child {
                            margin-left: 16px;
                        }
                    }
                }
            }
        }

        .page-1 {
            background: linear-gradient(to bottom, @primary-color 0%, lighten(@primary-color, 20%) 100%);

            .page {
                width: 100%;
                max-width: 1200px;
                margin: auto;
                padding: 0 24px;

                h2 {
                    margin-top: 50px;
                    padding: 60px 0;
                    color: #ffffff;
                    font-weight: 400;
                    font-size: 38px;
                    line-height: 46px;
                    text-align: center;
                }

                .ant-row {
                    & > div {
                        margin-bottom: 60px;
                        text-align: center;

                        .banner {
                            width: 200px;
                            margin: auto;
                            line-height: 1.5;

                            img {
                                width: 100%;
                                max-height: 200px;
                                box-shadow: @box-shadow-base;
                                border-radius: @border-radius-base;
                            }
                        }

                        h3 {
                            margin-top: 30px;
                            padding: 0 24px;
                            color: #ffffff;
                            font-weight: 400;
                            font-size: 20px;
                        }
                    }
                }
            }
        }

        .page-2 {
            .page {
                width: 100%;
                max-width: 1200px;
                margin: auto;
                padding: 36px 60px 60px 60px;
                text-align: center;
            }
        }
    }

    @media only screen and (max-width: 767.99px) {
        #yur-banner {
            .banner-page {
                display: block;
                height: auto;

                .img-wrapper {
                    position: initial;
                    display: inline-block;
                    width: 100%;
                    min-width: unset;
                    max-width: unset;
                    text-align: center;

                    img {
                        width: 100%;
                        max-width: 360px;
                        height: auto;
                        margin: 0 auto;
                    }
                }

                .text-wrapper {
                    display: inline-block;
                    width: 100%;
                    min-width: unset;
                    max-width: unset;
                    min-height: auto;
                    margin-top: 20px;
                    padding: 0 16px;
                    text-align: center;

                    .title-line-wrapper {
                        margin-left: 10%;
                    }

                    h1 {
                        display: none;
                    }

                    p {
                        font-size: 14px;
                        line-height: 28px;

                        span {
                            display: none;
                        }
                    }

                    .banner-btn-group {
                        display: block;
                        min-width: 100%;
                        white-space: nowrap;
                        text-align: center;
                    }
                }
            }

            .page-2 {
                .page {
                    padding: 36px 20px 60px 20px;
                }
            }
        }
    }
</style>
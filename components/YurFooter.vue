<template>
    <div id="yur-footer">
        <div class="footer-wrap">
            <a-row>
                <a-col :xs="24" :sm="24" :md="8">
                    <div class="footer-center">
                        <h2>
                            <a-skeleton active :loading="loading">
                                <img :src="require('../images/footer-title-icon-1.png')"
                                     :alt="title"
                                >
                            </a-skeleton>
                            <span>推荐资源</span>
                        </h2>
                        <div v-for="item in footer[0]">
                            <a :href="item.link"
                               target="_blank"
                               rel="noopener noreferrer"
                            >
                                <span>{{ item.title }}</span>
                            </a>
                            <span>&nbsp;-&nbsp;</span>
                            <span>{{ item.subtitle }}</span>
                        </div>
                    </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="8">
                    <div class="footer-center">
                        <h2>
                            <span>相关信息</span>
                        </h2>
                        <template v-if="footer[1].length">
                            <div v-for="item in footer[1]">
                                <a :href="item.link"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                >
                                    <a-icon :type="item.type" :theme="item.theme"/>
                                    <span>{{ item.title }}</span>
                                </a>
                            </div>
                        </template>
                    </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="8">
                    <div class="footer-center">
                        <h2>
                            <span>其它</span>
                        </h2>
                        <template v-if="footer[2].length">
                            <div v-for="item in footer[2]">
                                <a :href="item.link"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                >
                                    <a-icon :type="item.type" :theme="item.theme"/>
                                    <span>{{ item.title }}</span>
                                </a>
                            </div>
                        </template>
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="bottom-bar">
            Made&nbsp;with
            <span class="heart"></span>
            by&nbsp;
            <a :href="authorLink"
               target="_blank"
               rel="noopener noreferrer">
                <span>{{ author }}</span>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {},
        data() {
            return {
                loading: true,
                title: '凉风有信',
                author: 'cnguu',
                authorLink: 'https://github.com/cnguu/',
                footer: [
                    [
                        {
                            title: 'Yur',
                            subtitle: 'VuePress 主题',
                            link: 'https://github.com/cnguu/vuepress-theme-yur',
                        },
                    ],
                    [],
                    [],
                ],
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
                const { title, author, authorLink } = this.$site;
                const { footer } = this.$themeConfig;
                if (title) {
                    this.title = title;
                }
                if (author) {
                    this.author = author;
                }
                if (authorLink) {
                    this.authorLink = authorLink;
                }
                if (footer) {
                    let [one, two, three] = footer;
                    if (one) {
                        one.forEach(item => {
                            this.footer[0].push(item);
                        });
                    }
                    if (two) {
                        two.forEach(item => {
                            this.footer[1].push(item);
                        });
                    }
                    if (three) {
                        three.forEach(item => {
                            this.footer[2].push(item);
                        });
                    }
                }
            },
        },
    };
</script>

<style lang="less">
    @import "../styles/variable.less";

    #yur-footer {
        position: relative;
        clear: both;
        color: rgba(255, 255, 255, .4);
        font-size: 14px;
        background: #000000;

        a {
            color: rgba(255, 255, 255, .9);

            &:hover {
                color: @primary-color;
            }
        }

        .footer-wrap {
            position: relative;
            margin: auto;
            padding: 60px 24px;
            width: 100%;
            max-width: 1200px;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, .25);

            .ant-row {
                margin-left: -8px;
                margin-right: -8px;

                & > div {
                    padding-left: 8px;
                    padding-right: 8px;
                }
            }

            .footer-center {
                display: inline-block;
                text-align: left;

                & > h2 {
                    position: relative;
                    margin: 0 auto 24px;
                    font-weight: 500;
                    font-size: 16px;

                    img {
                        width: 27px;
                        margin-right: 16px;
                    }

                    span {
                        color: #ffffff;
                    }
                }

                & > div {
                    margin: 12px 0;
                }
            }
        }

        .bottom-bar {
            margin: 0;
            padding: 16px 40px;
            overflow: hidden;
            font-size: 16px;
            line-height: 32px;
            text-align: center;

            .heart {
                position: relative;
                margin: 0 30px 0 5px;
                width: 20px;
                height: 20px;

                &::before,
                &::after {
                    position: absolute;
                    content: '';
                    left: 10px;
                    top: 0;
                    width: 10px;
                    height: 18px;
                    background: @primary-color;
                    border-radius: 50px 50px 0 0;
                    transform: rotate(-45deg);
                    transform-origin: 0 100%;
                }

                &::after {
                    left: 0;
                    transform: rotate(45deg);
                    transform-origin: 100% 100%;
                }
            }

            a {
                color: rgba(255, 255, 255, .65);

                &:hover {
                    color: #ffffff;
                }
            }
        }
    }

    @media only screen and (max-width: 767.99px) {
        #yur-footer {
            .footer-wrap {
                padding: 40px 24px;

                .footer-center {
                    text-align: center;

                    & > h2 {
                        margin-top: 16px;
                    }
                }
            }
        }
    }
</style>
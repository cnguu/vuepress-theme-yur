<template>
    <div id="yur-link">
        <a-skeleton active :loading="loading">
            <div class="banner">
                <a-skeleton active :loading="loading">
                    <img :src="$withBase(link.banner)" :alt="title">
                </a-skeleton>
            </div>
        </a-skeleton>
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
        <a-skeleton v-if="$themeConfig.vssue" active :loading="loading">
            <Vssue :title="$page.path"/>
        </a-skeleton>
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
                link: {
                    banner: require('../images/summer-solstice-strawberry-moon.gif'),
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
            setTimeout(() => {
                this.$store.dispatch('changeSetting', {
                    key: 'curtain',
                    value: false,
                });
                document.getElementsByTagName('body')[0].style.overflow = 'unset';
            }, 3300);
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
                const { title } = this.$site;
                const { link } = this.$themeConfig;
                if (title) {
                    this.title = title;
                }
                if (link) {
                    const { banner, blog } = link;
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

<style lang="less">
    @import "../styles/variable.less";

    #yur-link {
        width: 100%;
        max-width: 1200px;
        margin: auto;
        padding: 40px 24px;

        .banner {
            text-align: center;

            img {
                width: 100%;
                border-radius: @border-radius-base;
            }
        }

        .content {
            margin: 40px 0;

            .ant-row {
                & > div {
                    .card {
                        position: relative;
                        margin: 15px 15px 30px 15px;
                        padding: 20px 15px;
                        height: 130px;
                        background: linear-gradient(#ffffff, #fafbfc 88%, #eaeef5);
                        border-radius: 3px 3px 13px 13px;
                        box-shadow: 0 5px 5px rgba(215, 221, 230, .5), 1px 0 0 #d8e0ea inset, -1px 0 0 #d8e0ea inset, 0 -1px 0 #d8e0ea inset, 0 0 0 2px rgba(255, 255, 255, .75) inset;
                        text-align: center;
                        cursor: pointer;

                        .title {
                            color: #475669;
                            text-shadow: 0 1px #ffffff;
                        }

                        .subtitle {
                            font-size: 13px;
                            color: #8492a6;
                            text-shadow: 0 1px #ffffff;
                        }

                        .logo {
                            position: absolute;
                            left: 50%;
                            bottom: -20px;
                            margin-left: -33px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 65px;
                            height: 65px;
                            color: #ffffff;
                            text-shadow: 0 3px 5px rgba(0, 0, 0, .25);
                            font-size: 25px;
                            text-align: center;
                            border-radius: 33px;
                            box-shadow: @box-shadow-base;
                            background-repeat: no-repeat;
                            background-position: center;
                            background-size: cover;
                            overflow: hidden;
                            transition: left ease-out .3s, bottom cubic-bezier(.5, 3, .5, 1) .75s, width ease-out .3s, height ease-out .3s, border-radius ease-out .15s, margin-left ease-out .3s;

                            &::before {
                                content: "";
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                opacity: .66;
                                transition: .25s;
                                background: linear-gradient(-150deg, rgba(255, 255, 255, .3) 10%, rgba(255, 255, 255, 0) 90%);
                            }
                        }
                    }

                    &:hover {
                        .logo {
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            height: 100%;
                            margin-left: 0;
                            border-radius: 0 0 13px 13px;
                            transition: ease-out .3s;
                        }
                    }
                }
            }
        }
    }
</style>
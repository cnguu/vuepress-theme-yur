<template>
    <div id="yur-post">
        <div v-if="needPwd" class="password">
            <a-row type="flex"
                   justify="space-around"
                   align="middle"
                   :gutter="16"
            >
                <a-col :xs="16"
                       :sm="16"
                       :md="8"
                       :lg="8"
                >
                    <a-form :form="form"
                            @submit="handleSubmit"
                    >
                        <a-form-item>
                            <a-input v-decorator="['password', { rules: [{ required: true, message: '访问密码不能为空！' }] }]"
                                     type="password"
                                     placeholder="请输入访问密码"
                            >
                                <a-icon slot="prefix" type="lock"/>
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" html-type="submit">访问</a-button>
                        </a-form-item>
                    </a-form>
                </a-col>
            </a-row>
        </div>
        <div v-else class="post">
            <a-row :gutter="24">
                <a-col :xs="postContentCol.xs"
                       :sm="postContentCol.sm"
                       :md="postContentCol.md"
                       :lg="postContentCol.lg"
                >
                    <div class="post-content">
                        <div class="post-header">
                            <div class="post-header-blur"
                                 :style="{
                                     backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(' + $withBase($page.frontmatter.banner) + ')',
                                 }"
                            ></div>
                            <div class="post-header-content">
                                <router-link v-if="getCategory.length"
                                             :to="getCategoryLink"
                                             class="category"
                                >
                                    {{ getCategory }}
                                </router-link>
                                <p>{{ $page.title }}</p>
                            </div>
                        </div>
                        <Content/>
                        <div class="end">
                            <div class="copyright">
                                <a-tooltip placement="topRight" style="float: left">
                                    <template slot="title">
                                        <span>{{ copyright }}</span>
                                    </template>
                                    <a-button type="link">
                                        <a-icon type="copyright"/>
                                        转载说明
                                    </a-button>
                                </a-tooltip>
                                <a-tooltip v-if="$page.frontmatter.update_date"
                                           placement="topLeft"
                                           style="float: right"
                                >
                                    <template slot="title">
                                        <span>发布于：<br>{{ parseDate($page.frontmatter.date) }}<br>最后更新：<br>{{ parseDate($page.frontmatter.update_date) }}</span>
                                    </template>
                                    <a-button type="link">
                                        <a-icon type="calendar"/>
                                        {{ parseDate($page.frontmatter.update_date) }}
                                    </a-button>
                                </a-tooltip>
                            </div>
                            <YurTagCloud :tag-list="$page.frontmatter.tags"/>
                            <a-skeleton v-if="$themeConfig.vssue && isPro()"
                                        active
                                        :loading="loading"
                            >
                                <Vssue :title="$page.path"/>
                            </a-skeleton>
                        </div>
                    </div>
                </a-col>
                <a-col :xs="postCatalogCol.xs"
                       :sm="postCatalogCol.sm"
                       :md="postCatalogCol.md"
                       :lg="postCatalogCol.lg"
                >
                    <div v-if="getCatalogs.length" class="post-catalog">
                        <a-anchor>
                            <a-anchor-link v-for="catalog in getCatalogs"
                                           :href="'#'+catalog.slug"
                                           :title="catalog.title"
                            >
                                <template v-if="catalog.hasOwnProperty('children') && catalog.children.length">
                                    <a-anchor-link v-for="child in catalog.children"
                                                   :href="'#'+child.slug"
                                                   :title="child.title"
                                    />
                                </template>
                            </a-anchor-link>
                        </a-anchor>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
    import YurTagCloud from '@theme/components/YurTagCloud';
    import SHA256 from 'crypto-js/sha256';
    import Base64 from 'crypto-js/enc-base64';
    import { isPro, parseDate, getTimeOut } from '../util';

    export default {
        components: { YurTagCloud },
        props: {},
        data() {
            return {
                loading: true,
                needPwd: false,
                form: this.$form.createForm(this),
                postContentCol: {
                    xs: { span: 24 },
                    sm: { span: 24 },
                    md: { span: 18 },
                    lg: { span: 20 },
                },
                postCatalogCol: {
                    xs: { span: 0 },
                    sm: { span: 0 },
                    md: { span: 6 },
                    lg: { span: 4 },
                },
                copyright: '允许转载，需保留原文链接，著作权归博主所有',
                parseDate,
                isPro,
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
            if (this.needPwd) {
                this.$notification.warning({
                    message: '当前内容受密码保护',
                    description: '这是一篇私密的博文，如需访问，请提供正确的密码',
                    duration: 4.3,
                });
            } else {
                this.changeImageSrc();
            }
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
        computed: {
            getCatalogs() {
                let headers = this.$page.headers,
                    catalog = [];
                if (headers && headers.length > 0) {
                    headers.forEach(header => {
                        if (header.level === 2) {
                            catalog.push(header);
                        } else {
                            let catalogsLen = catalog.length;
                            if (catalogsLen > 0) {
                                if (!catalog[catalogsLen - 1].hasOwnProperty('children')) {
                                    catalog[catalogsLen - 1].children = [];
                                }
                                if (catalog[catalogsLen - 1].children.length > 0) {
                                    let canPush = true;
                                    catalog[catalogsLen - 1].children.forEach(e => {
                                        if (e.slug === header.slug) {
                                            canPush = false;
                                        }
                                    });
                                    if (canPush) {
                                        catalog[catalogsLen - 1].children.push(header);
                                    }
                                } else {
                                    catalog[catalogsLen - 1].children.push(header);
                                }
                            }
                        }
                    });
                } else {
                    this.postContentCol.md.span = 24;
                    this.postContentCol.lg.span = 24;
                    this.postCatalogCol.md.span = 0;
                    this.postCatalogCol.lg.span = 0;
                }
                return catalog;
            },
            getCategory() {
                let link = this.getCategoryLink,
                    navs = this.$themeConfig.nav,
                    category = '未知分类';
                if (this.$page.relativePath.split('/').shift().indexOf('.md') > -1) {
                    category = '';
                } else if (navs) {
                    for (let nav of navs) {
                        if (nav.hasOwnProperty('link') && nav.hasOwnProperty('text') && nav.link === link) {
                            category = nav.text;
                        }
                    }
                }
                return category;
            },
            getCategoryLink() {
                return `/${ this.$page.path.split('/')[1] }/?page=1&pageSize=12`;
            },
        },
        methods: {
            initConfig() {
                const { copyright, password } = this.$page;
                if (copyright) {
                    this.copyright = copyright;
                }
                if (password) {
                    this.needPwd = true;
                }
            },
            changeImageSrc() {
                const { cdn } = this.$themeConfig;
                if (cdn) {
                    const { github } = cdn;
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
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        const pwd = Base64.stringify(SHA256(values.password));
                        if (this.$page.password === pwd) {
                            this.needPwd = false;
                            this.$notification.success({
                                message: '欢迎访问',
                                description: this.$page.title,
                                duration: 4.3,
                            });
                        } else {
                            this.$notification.error({
                                message: '密码错误',
                                description: '请提供正确的密码',
                                duration: 4.3,
                            });
                        }
                    }
                });
            },
        },
    };
</script>

<style lang="less">
    @import "../styles/variable.less";

    #yur-post {
        .password {
            display: flex;
            width: 100%;
            max-width: 1200px;
            margin: auto;
            padding: 40px 24px;
            min-height: calc(~'100vh - 84px');
            text-align: center;

            .ant-row-flex {
                width: 100%;
            }
        }

        .post {
            width: 100%;
            max-width: 1200px;
            margin: auto;
            padding: 40px 24px;

            .post-content {
                color: #657487;

                .post-header {
                    position: relative;
                    margin-bottom: 40px;
                    height: 350px;

                    .post-header-blur {
                        width: 100%;
                        height: 100%;
                        border-radius: @border-radius-base;
                        box-shadow: @box-shadow-base;
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
                    }

                    .post-header-content {
                        position: absolute;
                        width: calc(100% - 350px);
                        margin-top: calc(-40px - 5%);
                        padding-left: 5%;
                        top: 50%;
                        right: 40px;
                        left: 40px;
                        color: #ffffff;

                        .category {
                            position: relative;
                            text-shadow: 0 2px 2px rgba(0, 0, 0, .3);
                            opacity: .75;
                            color: #ffffff;

                            &::after {
                                position: absolute;
                                content: "";
                                display: block;
                                left: 0;
                                bottom: -8px;
                                height: 1px;
                                width: 30px;
                                background: currentColor;
                                opacity: .3;
                            }
                        }

                        p {
                            margin-top: 20px;
                            font-weight: 400;
                            font-size: 28px;
                            text-shadow: 0 3px 5px rgba(0, 0, 0, .3);
                            color: inherit;
                        }
                    }
                }

                .end {
                    margin-top: 60px;

                    .copyright {
                        position: relative;
                        height: 40px;
                        line-height: 40px;
                        border-top: 1px solid #eff2f7;

                        .ant-btn {
                            padding: 0;
                            color: #a3aab1;
                        }
                    }

                    #yur-tag-cloud {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                }
            }

            .post-catalog {
                .ant-anchor-wrapper {
                    max-height: calc(~'100vh - 348px') !important;
                    -ms-overflow-style: none;
                    overflow: -moz-scrollbars-none;

                    &::-webkit-scrollbar {
                        width: 0;
                    }
                }
            }
        }
    }

    @media (max-width: 992px) {
        #yur-post {
            .post {
                .post-content {
                    .post-header {
                        height: 300px;

                        .post-header-content {
                            width: calc(100% - 260px);

                            p {
                                font-size: 26px;
                            }
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        #yur-post {
            .post {
                .post-content {
                    .post-header {
                        height: 240px;

                        .post-header-content {
                            padding: 0 10px;
                            width: calc(100% - 90px);
                            text-align: center;

                            .category {
                                &::after {
                                    width: 100%;
                                }
                            }

                            p {
                                font-size: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
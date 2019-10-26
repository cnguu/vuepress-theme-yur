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
                            <div v-if="reward.length" class="reward">
                                <a-popover placement="top" trigger="click" :overlayStyle="{'width':'auto'}">
                                    <template slot="content">
                                        <div id="reward">
                                            <img v-for="item in reward"
                                                 :src="$withBase(item)"
                                            >
                                        </div>
                                    </template>
                                    <a-button shape="circle"
                                              size="large"
                                    >赏
                                    </a-button>
                                </a-popover>
                            </div>
                            <div class="copyright">
                                <a-tooltip placement="topRight" style="float: left">
                                    <template slot="title">
                                        <span>{{ getCopyright }}</span>
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
                            <YurTagCloud :tag-list="$page.frontmatter.tags" ref="tagCloud"/>
                            <YurComment/>
                        </div>
                    </div>
                </a-col>
                <a-col :xs="postCatalogCol.xs"
                       :sm="postCatalogCol.sm"
                       :md="postCatalogCol.md"
                       :lg="postCatalogCol.lg"
                >
                    <div class="post-info">
                        <a-tooltip placement="top">
                            <template slot="title">
                                <span>博文字数：{{ this.$page.wordCount }}</span>
                            </template>
                            <a-icon type="clock-circle"/>
                            {{ getReadingTime }}
                        </a-tooltip>
                    </div>
                    <div v-if="getCatalogs.length" class="post-catalog">
                        <a-anchor :affix="true"
                                  :bounds="240"
                                  :offsetTop="20"
                                  :showInkInFixed="true"
                        >
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
    import YurComment from '@theme/components/YurComment';
    import YurTagCloud from '@theme/components/YurTagCloud';
    import SHA256 from 'crypto-js/sha256';
    import Base64 from 'crypto-js/enc-base64';
    import { isPro, parseDate, getTimeOut } from '../util';

    export default {
        components: { YurComment, YurTagCloud },
        props: {},
        data() {
            return {
                loading: true,
                reward: [],
                needPwd: true,
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
                parseDate,
                isPro,
            };
        },
        beforeCreate() {
        },
        created() {
            this.initConfig();
            this.$nextTick(() => {
                if (!this.needPwd) {
                    setTimeout(() => {
                        this.changeImageSrc();
                    }, 300);
                }
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
            if (this.needPwd) {
                this.$notification.warning({
                    message: '当前内容受密码保护',
                    description: '这是一篇私密的博文，如需访问，请提供正确的密码',
                    duration: 4.3,
                });
            }
        },
        beforeUpdate() {
        },
        updated() {
            if (!this.needPwd) {
                this.changeImageSrc();
            }
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        watch: {},
        computed: {
            getCopyright() {
                return this.$page.copyright || '允许转载，需保留原文链接，著作权归博主所有';
            },
            getReadingTime() {
                const wordCount = this.$page.wordCount;
                if (wordCount < 600) {
                    return `阅时小于 1 分钟`;
                } else {
                    return `阅时约 ${ Math.ceil(wordCount / 600) } 分钟`;
                }
            },
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
                } else if (navs.length) {
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
                const { reward } = this.$themeConfig;
                const { password } = this.$page;
                this.needPwd = !!password;
                if (reward) {
                    this.reward = reward;
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
                            this.$nextTick(() => {
                                setTimeout(() => {
                                    this.changeImageSrc();
                                }, 300);
                            });
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

<style lang="less" scoped>
</style>
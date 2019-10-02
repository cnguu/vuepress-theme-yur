<template>
    <div id="yur-post">
        <div class="post">
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
                                        <span>{{ $page.copyright || '允许转载，需保留原文链接，著作权归博主所有' }}</span>
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
                            <a-skeleton v-if="$themeConfig.vssue" active :loading="loading">
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
    import { parseDate } from '../util';

    export default {
        components: { YurTagCloud },
        props: {},
        data() {
            return {
                loading: true,
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
            };
        },
        beforeCreate() {
        },
        created() {
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
        methods: {},
    };
</script>

<style lang="less">
    @import "../styles/variable.less";

    #yur-post {
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
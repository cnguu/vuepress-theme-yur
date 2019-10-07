<template>
    <div id="yur-tags">
        <div class="tags">
            <a-tabs v-if="Object.keys($tags).length"
                    :activeKey="activeKey"
                    tabPosition="right"
                    @tabClick="tabClick"
            >
                <a-tab-pane v-for="(posts, tag) in $tags" :tab="tag" :key="tag">
                    <a-list class="post-list"
                            itemLayout="vertical"
                            :pagination="pagination"
                            :dataSource="posts"
                            :grid="postGrid"
                            :locale="locale"
                    >
                        <a-list-item slot="renderItem" slot-scope="item, index" key="item.path">
                            <template slot="actions">
                                {{ item.frontmatter.date ? fromNow(item.frontmatter.date) : '' }}
                            </template>
                            <img slot="extra"
                                 width="150"
                                 height="143"
                                 :alt="item.title"
                                 :src="$withBase(item.frontmatter.banner)"
                            />
                            <a-list-item-meta>
                                <router-link slot="title" :to="item.path">{{ item.title }}</router-link>
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script>
    import { parseDate, getTimeOut } from '../util';

    export default {
        components: {},
        props: {},
        data() {
            return {
                activeKey: Object.keys(this.$tags).shift(),
                loading: true,
                parseDate,
                pagination: {
                    onChange: (page, pageSize) => {
                        this.pageChange(page, pageSize);
                    },
                    onShowSizeChange: (current, size) => {
                        this.pageChange(1, size);
                    },
                    showTotal: (total, range) => {
                        return `总共 ${ total } 条博文`;
                    },
                    current: 1,
                    pageSize: 12,
                    pageSizeOptions: ['12', '24', '48', '96'],
                    showQuickJumper: true,
                    showSizeChanger: true,
                    size: 'small',
                    textAlign: 'center',
                },
                postGrid: {
                    gutter: 24,
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 2,
                    xl: 2,
                    xxl: 2,
                },
                locale: {
                    emptyText: '没有找到相关博文',
                },
            };
        },
        beforeCreate() {
        },
        created() {
            if (this.$route.query.type) {
                this.activeKey = this.$route.query.type;
            }
            if (this.$route.query.page) {
                this.pagination.current = Number(this.$route.query.page);
            }
            if (this.$route.query.pageSize) {
                this.pagination.pageSize = Number(this.$route.query.pageSize);
            }
            this.$nextTick(() => {
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
        watch: {
            $route(to, from) {
                this.activeKey = to.query.type;
                this.pagination.current = Number(to.query.page);
                this.pagination.pageSize = Number(to.query.pageSize);
            },
        },
        computed: {},
        methods: {
            fromNow(date) {
                return this.$moment(date).fromNow();
            },
            pageChange(page, pageSize) {
                if (Number(this.$route.query.page) !== page || Number(this.$route.query.pageSize) !== pageSize) {
                    this.pagination.current = page;
                    this.pagination.pageSize = pageSize;
                    this.$router.push(`/tags/?type=${ this.activeKey }&page=${ page }&pageSize=${ pageSize }`);
                }
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            },
            tabClick(val) {
                if (this.$route.query.type !== val) {
                    this.$router.push(`/tags/?type=${ val }&page=1&pageSize=${ this.pagination.pageSize }`);
                }
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            },
        },
    }
    ;
</script>

<style lang="less">
    @import "../styles/variable.less";

    #yur-tags {
        .tags {
            width: 100%;
            max-width: 1200px;
            margin: auto;
            padding: 40px 24px;

            .ant-tabs {
                .ant-tabs-bar {
                    height: 578px;
                }

                .ant-tabs-content {
                    .ant-tabs-tabpane {
                        .post-list {
                            width: 100%;
                            max-width: 1200px;
                            margin: auto;

                            .ant-spin-nested-loading {
                                .ant-spin-container {
                                    .ant-row {
                                        & > div {
                                            .ant-list-item {
                                                margin-bottom: 20px;
                                                padding: 15px;
                                                border-radius: @border-radius-base;
                                                box-shadow: 0 4px 10px rgba(0, 0, 0, .05), 0 0 1px rgba(0, 0, 0, .1);
                                                transition: all 0.6s;

                                                &:hover {
                                                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                                                }

                                                .ant-list-item-main {
                                                    .ant-list-item-meta-title {
                                                        font-size: 18px;
                                                        color: @text-color-secondary;

                                                        a {
                                                            overflow: hidden;
                                                            text-overflow: ellipsis;
                                                            display: -webkit-box;
                                                            -webkit-line-clamp: 2;
                                                            -webkit-box-orient: vertical;
                                                        }
                                                    }
                                                }

                                                .ant-list-item-extra {
                                                    margin-left: 10px;

                                                    img {
                                                        border-radius: 2*@border-radius-base;
                                                        box-shadow: @box-shadow-base;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            .ant-list-pagination {
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        #yur-tags {
            .tags {
                .ant-tabs-content {
                    .ant-tabs-tabpane {
                        .post-list {
                            .ant-spin-nested-loading {
                                .ant-spin-container {
                                    .ant-row {
                                        & > div {
                                            .ant-list-item {
                                                .ant-list-item-extra-wrap {
                                                    flex-wrap: wrap-reverse;

                                                    .ant-list-item-main {
                                                        margin-top: 30px;
                                                        text-align: center;
                                                    }

                                                    .ant-list-item-extra {
                                                        width: 100%;
                                                        text-align: center;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 480px) {
        #yur-tags {
            .tags {
                .ant-tabs-content {
                    .ant-tabs-tabpane {
                        .post-list {
                            .ant-spin-nested-loading {
                                .ant-spin-container {
                                    .ant-row {
                                        & > div {
                                            .ant-list-item {
                                                .ant-list-item-extra-wrap {
                                                    .ant-list-item-main {
                                                        min-width: 100%;
                                                    }

                                                    .ant-list-item-extra {
                                                        margin: auto;

                                                        img {
                                                            max-width: 100%;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
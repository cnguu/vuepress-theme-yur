<template>
    <div id="yur-posts">
        <a-list class="post-list"
                itemLayout="vertical"
                :pagination="pagination"
                :dataSource="dataSource"
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
                     :src="item.frontmatter.banner"
                />
                <a-list-item-meta>
                    <router-link slot="title" :to="item.path">{{ item.title }}</router-link>
                </a-list-item-meta>
                <div class="tag" v-if="item.frontmatter.tags">
                    <router-link :to="`/tags/?type=${ tag }`" v-for="tag in item.frontmatter.tags.slice(0, 1)">
                        <a-tag>{{ tag }}</a-tag>
                    </router-link>
                </div>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
            category: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
                pagination: {
                    onChange: (page, pageSize) => {
                        this.pageChange(page, pageSize);
                    },
                    onShowSizeChange: (current, size) => {
                        this.pageChange(current, size);
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
                    md: 2,
                    lg: 2,
                    xl: 3,
                    xxl: 3,
                },
                locale: {
                    emptyText: '这个博主真懒，一个博文也没写',
                },
            };
        },
        beforeCreate() {
        },
        created() {
            if (this.$route.query.page) {
                this.pagination.current = Number(this.$route.query.page);
            }
            if (this.$route.query.pageSize) {
                this.pagination.pageSize = Number(this.$route.query.pageSize);
            }
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
        watch: {
            $route(to, from) {
                this.pagination.current = Number(to.query.page);
                this.pagination.pageSize = Number(to.query.pageSize);
            },
        },
        computed: {
            dataSource() {
                if (this.category) {
                    let posts = [];
                    for (let post of this.$posts) {
                        if (post.relativePath.split('/').shift() === this.category) {
                            posts.push(post);
                        }
                    }
                    return posts;
                } else {
                    return this.$posts;
                }
            },
        },
        methods: {
            fromNow(date) {
                return this.$moment(date).fromNow();
            },
            pageChange(page, pageSize) {
                if (Number(this.$route.query.page) !== page || Number(this.$route.query.pageSize) !== pageSize) {
                    this.pagination.current = page;
                    this.pagination.pageSize = pageSize;
                    this.$router.push(`/posts/?page=${ page }&pageSize=${ pageSize }`);
                }
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            },
        },
    };
</script>

<style lang="less">
    @import "../styles/variable.less";

    #yur-posts {
        .post-list {
            width: 100%;
            max-width: 1200px;
            margin: auto;
            padding: 40px 24px;

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

    @media screen and (max-width: 480px) {
        #yur-posts {
            .post-list {
                .ant-spin-nested-loading {
                    .ant-spin-container {
                        .ant-row {
                            & > div {
                                .ant-list-item {
                                    .ant-list-item-main {
                                        margin-top: 30px;
                                        text-align: center;
                                    }

                                    .ant-list-item-extra {
                                        margin: auto;
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
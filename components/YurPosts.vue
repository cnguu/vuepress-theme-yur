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
                     :src="$withBase(item.frontmatter.banner)"
                />
                <a-list-item-meta>
                    <router-link slot="title" :to="item.path">{{ item.title }}</router-link>
                </a-list-item-meta>
                <div class="tag" v-if="item.frontmatter.tags">
                    <router-link v-for="tag in item.frontmatter.tags.slice(0, 1)"
                                 :to="`/tags/?type=${ tag }&page=1&pageSize=12`"
                    >
                        <a-tag>{{ tag }}</a-tag>
                    </router-link>
                </div>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    import {getTimeOut} from '../util';

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
                        this.pageChange(1, size);
                    },
                    showTotal: (total, range) => {
                        return `总共 ${total} 条博文`;
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
            setTimeout(() => {
                this.$store.dispatch('changeSetting', {
                    key: 'curtain',
                    value: false,
                });
                document.getElementsByTagName('body')[0].style.overflow = 'unset';
            }, getTimeOut(this.$store.state.settings.consoleTime));
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
                    this.$router.push(`/${this.category || 'posts'}/?page=${page}&pageSize=${pageSize}`);
                }
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            },
        },
    };
</script>

<style lang="less" scoped>
</style>
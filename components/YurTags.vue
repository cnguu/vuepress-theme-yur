<template>
    <div id="yur-tags">
        <div class="tags">
            <a-tabs v-if="Object.keys($tags).length"
                    :activeKey="activeKey"
                    tabPosition="right"
                    @tabClick="tabClick"
            >
                <a-tab-pane v-for="(posts, tag) in $tags" :tab="tag" :key="tag">
                    <a-row v-if="posts.length" :gutter="24">
                        <a-col v-for="post in posts"
                               :xs="{ span: 24 }"
                               :sm="{ span: 24 }"
                               :md="{ span: 12 }"
                               :lg="{ span: 8 }"
                        >
                            <router-link :to="post.path">
                                <a-card :loading="loading">
                                    <img slot="cover"
                                         :src="$withBase(post.frontmatter.banner)"
                                         :alt="post.title"
                                    />
                                    <a-card-meta :title="post.title">
                                        <template slot="description">
                                            {{ post.frontmatter.date ? parseDate(post.frontmatter.date) : '' }}
                                        </template>
                                    </a-card-meta>
                                </a-card>
                            </router-link>
                        </a-col>
                    </a-row>
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
            };
        },
        beforeCreate() {
        },
        created() {
            if (this.$route.query.type) {
                this.activeKey = this.$route.query.type;
            }
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
        watch: {
            $route(to, from) {
                this.activeKey = to.query.type;
            },
        },
        computed: {},
        methods: {
            tabClick(val) {
                if (this.$route.query.type !== val) {
                    this.$router.push('/tags/?type=' + val);
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
                        .ant-row {
                            & > div {
                                margin-bottom: 40px;

                                .ant-card-cover {
                                    width: 100%;
                                    height: 0;
                                    padding-bottom: 100%;
                                    overflow: hidden;
                                }
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
                        .ant-row {
                            & > div {
                                &:last-child {
                                    margin-bottom: 0;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
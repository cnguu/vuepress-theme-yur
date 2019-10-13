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

<style lang="less" scoped>
</style>
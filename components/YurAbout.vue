<template>
    <div id="yur-about">
        <div class="banner">
            <a-skeleton active :loading="loading">
                <img :src="$withBase($themeConfig.about.banner) || require('../images/first-day-of-spring-2016-northern-hemisphere.gif')"
                     :alt="$site.title || '凉风有信'"
                >
            </a-skeleton>
        </div>
        <div class="content">
            <h1>这个人真懒，什么都没写！</h1>
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
        methods: {},
    };
</script>

<style lang="less">
    @import "../styles/variable.less";

    #yur-about {
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
            margin-top: 40px;

            h1 {
                text-align: center;
            }
        }
    }
</style>
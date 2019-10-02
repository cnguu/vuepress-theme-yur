<template>
    <a-skeleton active :loading="loading">
        <div id="yur-not-found"
             :style="{
                 backgroundImage: `url(${backgroundImage})`,
             }">
            <section>
                <h1>404</h1>
                <p>
                    页面不翼而飞
                    <router-link to="/">回到主页</router-link>
                </p>
            </section>
        </div>
    </a-skeleton>
</template>

<script>
    export default {
        components: {},
        props: {},
        data() {
            return {
                loading: true,
                backgroundImage: require('../images/NotFound.jpg'),
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
                const { notFound } = this.$themeConfig;
                if (notFound) {
                    this.backgroundImage = this.$withBase(notFound);
                }
            },
        },
    }
</script>

<style lang="less">
    @import "../styles/variable.less";

    #yur-not-found {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        background-attachment: fixed;

        section {
            position: absolute;
            top: 48%;
            left: 55%;
            margin: -103px 0 0 -120px;
            text-align: center;

            h1 {
                margin-bottom: 0;
                color: @primary-color;
                font-weight: 500;
                font-size: 120px;
            }

            p {
                color: @text-color-secondary;
                font-size: 18px;
            }
        }
    }
</style>
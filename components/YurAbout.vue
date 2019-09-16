<template>
    <div id="yur-about">
        <div class="widget"
             :style="{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(' + ($withBase($themeConfig.about.banner) || require('../images/first-day-of-spring-2016-northern-hemisphere.gif')) + ')'}"
        >
            <img class="avatar"
                 :src="$themeConfig.about.avatar"
                 :alt="$site.title || '凉风有信'"
            >
            <p class="name">{{ $themeConfig.about.name || '凉风有信' }}</p>
            <p class="introduction">{{ $themeConfig.about.introduction || '责难无以成事' }}</p>
            <div class="total">
                <router-link to="/posts/?page=1&pageSize=12">
                    <a-badge status="processing" :text="'博文：' + $posts.length || 0"/>
                </router-link>
                <a-badge status="processing" :text="'分类：' + $categories.length || 0"/>
                <a-badge status="processing" :text="'标签：' + Object.keys($tags).length || 0"/>
            </div>
        </div>
        <Content/>
        <ClientOnly v-if="$themeConfig.vssue">
            <Vssue :title="$page.title"/>
        </ClientOnly>
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

        .widget {
            margin-bottom: 40px;
            padding: 40px 0;
            width: 100%;
            height: 100%;
            text-align: center;
            border-radius: @border-radius-base;
            box-shadow: @box-shadow-base;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            color: #ffffff;

            .avatar {
                width: 128px;
                height: auto;
                border-radius: 50%;
                box-shadow: @box-shadow-base;
            }

            .name {
                margin-bottom: 0;
                font-size: 32px;
            }

            .introduction {
                font-size: 16px;
                color: darken(#ffffff, 20%);
            }

            .total {
                margin: 0 auto;
                width: fit-content;

                a > span,
                & > span {
                    margin-right: 10px;

                    .ant-badge-status-processing {
                        background-color: @primary-color;

                        &::after {
                            border: 1px solid @primary-color;
                        }
                    }

                    .ant-badge-status-text {
                        color: darken(#ffffff, 10%);
                    }
                }
            }
        }
    }
</style>
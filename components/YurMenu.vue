<template>
    <div id="yur-menu">
        <a-menu v-model="current" mode="horizontal" class="menu">
            <a-sub-menu key="category" v-if="userLinks.length">
                <span slot="title" class="submenu-title-wrapper">分类<a-icon type="caret-down" class="category"/></span>
                <a-menu-item-group>
                    <a-menu-item v-for="userLink in userLinks" :key="userLink.link">
                        <router-link :to="userLink.link + '?page=1&pageSize=12'">{{ userLink.text }}</router-link>
                    </a-menu-item>
                </a-menu-item-group>
            </a-sub-menu>
            <a-menu-item key="timeline">
                <router-link to="/timeline">时间轴</router-link>
            </a-menu-item>
            <a-menu-item key="link">
                <router-link to="/link">友人帐</router-link>
            </a-menu-item>
            <a-menu-item key="about">
                <router-link to="/about">关于我</router-link>
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
            currentPage: {
                type: String,
                required: true,
            },
            userLinks: {
                type: Array,
                required: true,
            },
        },
        data() {
            return {
                current: ['/'],
            };
        },
        beforeCreate() {
        },
        created() {
            this.handleRoute();
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
            '$route': 'handleRoute',
        },
        computed: {},
        methods: {
            handleRoute() {
                this.current = [this.currentPage];
            }
        },
    };
</script>

<style lang="less">
    @import "../styles/variable.less";

    #yur-menu {
        float: right;
        margin: 11px auto 0;
        height: 11px;
        line-height: 11px;

        .menu {
            border-bottom: none;

            .category {
                margin-left: 10px;
            }
        }
    }
</style>
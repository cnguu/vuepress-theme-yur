<template>
    <a-skeleton active :loading="loading">
        <Vssue v-if="vssue" :title="$page.path"/>
        <div v-else-if="valine" id="yur-valine"/>
    </a-skeleton>
</template>

<script>
    import {isPro} from '../util';

    export default {
        components: {},
        props: {},
        data() {
            return {
                loading: true,
                vssue: false,
                valine: false,
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
                const {comment} = this.$themeConfig;
                if (comment && isPro() && this.handleComment()) {
                    if (comment === 'vssue') {
                        this.vssue = true;
                    }
                    if (comment === 'valine') {
                        this.valine = true;
                    }
                }
            },
            handleComment() {
                const {frontmatter} = this.$page;
                if (frontmatter) {
                    const {comment} = frontmatter;
                    if (comment === false) {
                        return false;
                    }
                }
                return true;
            },
        },
    }
</script>

<style lang="less" scoped>
</style>
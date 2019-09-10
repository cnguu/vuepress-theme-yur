<template>
    <div id="yur-categories">
        <YurPosts :category="category"/>
    </div>
</template>

<script>
    import YurPosts from '@theme/components/YurPosts';

    export default {
        components: { YurPosts },
        props: {
            category: {
                type: String,
                required: true,
            },
        },
        data() {
            return {};
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

    #yur-categories {
    }
</style>
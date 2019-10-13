<template>
    <div id="yur-tag-cloud">
        <section v-if="tags.length">
            <Router-link v-for="tag in tags" :to="`/tags/?type=${ tag }&page=1&pageSize=12`">
                <a-tag>{{ tag }}</a-tag>
            </Router-link>
        </section>
        <a-tag v-else>暂无标签</a-tag>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
            tagList: {
                type: Array,
                default: undefined,
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
        computed: {
            tags() {
                return this.tagList ? this.tagList : Object.keys(this.$tags);
            },
        },
        methods: {},
    }
</script>

<style lang="less" scoped>
</style>
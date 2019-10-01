<template>
    <div id="yur-tag-cloud">
        <section v-if="tags.length">
            <Router-link v-for="tag in tags" :to="`/tags/?type=${ tag }`">
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

<style lang="less">
    @import "../styles/variable.less";

    #yur-tag-cloud {
        div {
            position: relative;
            margin: 12px 18px 0 0;
            padding: 0 15px 0 12px;
            height: 38px;
            line-height: 38px;
            border: none;
            border-radius: 2*@border-radius-base;
            box-shadow: 0 13px 15px rgba(0, 0, 0, .1);
            color: #738192;
            background-color: #ffffff;
            transition: .25s;

            &:hover {
                transform: translateY(6px);
                box-shadow: 0 3px 3px rgba(0, 0, 0, .15);
            }
        }
    }
</style>
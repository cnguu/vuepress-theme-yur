<template>
    <div id="yur-timeline">
        <a-timeline class="timeline" v-if="this.$posts.length" mode="alternate">
            <a-timeline-item v-for="(post, index) in this.$posts">
                <router-link :to="post.path" :style="{color:'inherit'}">
                    <p v-if="index%2===0">
                        <a-tag color="blue">{{ format(post.frontmatter.date) }}</a-tag>
                        {{ post.title }}
                    </p>
                    <p v-else>
                        {{ post.title }}
                        <a-tag color="blue" :style="{marginLeft:'8px'}">{{ format(post.frontmatter.date) }}</a-tag>
                    </p>
                </router-link>
            </a-timeline-item>
        </a-timeline>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {},
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
        methods: {
            format(date) {
                return this.$moment(date).format('YYYY-MM-DD');
            },
        },
    };
</script>

<style lang="less">
    @import "../styles/variable.less";

    #yur-timeline {
        .timeline {
            width: 100%;
            max-width: 1200px;
            margin: auto;
            padding: 40px 24px;
        }
    }
</style>
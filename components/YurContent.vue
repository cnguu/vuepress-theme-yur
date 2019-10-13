<template>
    <div id="yur-content">
        <ClientOnly>
            <YurBanner v-if="isHome"/>
            <YurCategories v-else-if="isCategories" :category="currentPage"/>
            <YurPosts v-else-if="isPosts"/>
            <YurTags v-else-if="isTags"/>
            <YurTimeline v-else-if="isTimeline"/>
            <YurLink v-else-if="isLink"/>
            <YurAbout v-else-if="isAbout"/>
            <YurPost v-else-if="isPost"/>
        </ClientOnly>
        <a-back-top>
            <div class="ant-back-top-content">
                <div class="ant-back-top-icon"></div>
            </div>
        </a-back-top>
    </div>
</template>

<script>
    import YurBanner from '@theme/components/YurBanner';
    import YurCategories from '@theme/components/YurCategories';
    import YurPost from '@theme/components/YurPost';
    import YurPosts from '@theme/components/YurPosts';
    import YurTags from '@theme/components/YurTags';
    import YurTimeline from '@theme/components/YurTimeline';
    import YurLink from '@theme/components/YurLink';
    import YurAbout from '@theme/components/YurAbout';

    export default {
        components: { YurBanner, YurCategories, YurPost, YurPosts, YurTags, YurTimeline, YurLink, YurAbout },
        props: {
            currentPage: {
                type: String,
                required: true,
            },
            currentPost: {
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
        computed: {
            isHome() {
                return this.currentPage === '/';
            },
            isCategories() {
                return this.$categories.includes(this.currentPage) && !this.currentPost;
            },
            isPosts() {
                return this.currentPage === 'posts';
            },
            isTags() {
                return this.currentPage === 'tags';
            },
            isTimeline() {
                return this.currentPage === 'timeline';
            },
            isLink() {
                return this.currentPage === 'link';
            },
            isAbout() {
                return this.currentPage === 'about';
            },
            isPost() {
                return this.$categories.includes(this.currentPage) && this.currentPost;
            },
        },
        methods: {},
    };
</script>

<style lang="less" scoped>
</style>
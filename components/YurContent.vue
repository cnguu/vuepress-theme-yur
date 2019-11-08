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
    import {isBuild} from "../util";

    export default {
        components: {YurBanner, YurCategories, YurPost, YurPosts, YurTags, YurTimeline, YurLink, YurAbout},
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
            return {
                timeline: false,
                link: false,
                about: false,
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
                return this.currentPage === 'timeline' && this.timeline;
            },
            isLink() {
                return this.currentPage === 'link' && this.link;
            },
            isAbout() {
                return this.currentPage === 'about' && this.about;
            },
            isPost() {
                return this.$categories.includes(this.currentPage) && this.currentPost;
            },
        },
        methods: {
            initConfig() {
                const {timeline, link, about} = this.$themeConfig;
                if (timeline) {
                    this.timeline = true;
                }
                if (link) {
                    this.link = true;
                }
                if (about) {
                    this.about = true;
                }
                if (!isBuild() && !this.isHome && !this.isCategories && !this.isPosts && !this.isTags && !this.isTimeline && !this.isLink && !this.isAbout && !this.isPost) {
                    this.$router.push('/404');
                }
            },
        },
    };
</script>

<style lang="less" scoped>
</style>
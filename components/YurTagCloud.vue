<template>
    <div id="yur-tag-cloud">
        <section v-if="tags.length">
            <Router-link v-for="tag in tags" :to="`/tags/?type=${ tag }&page=1&pageSize=12`">
                <a-tag @mouseover="handleOver" @mouseout="handleOut">{{ tag }}</a-tag>
            </Router-link>
            <audio v-for="n in 9" :class="`piano-${n}`" preload>
                <source :src="require(`../media/piano/mp3/${n}.mp3`)" type="audio/mp3">
                <source :src="require(`../media/piano/ogg/${n}.ogg`)" type="audio/ogg">
            </audio>
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
            return {
                piano_num: 0,
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
        computed: {
            tags() {
                return this.tagList ? this.tagList : Object.keys(this.$tags);
            },
        },
        methods: {
            handleOver() {
                if (!this.piano_num) {
                    this.piano_num = Math.floor(Math.random() * 9 + 1);
                    const audio = document.getElementsByClassName(`piano-${ this.piano_num }`)[0];
                    if (audio) {
                        audio.play();
                    }
                }
            },
            handleOut() {
                if (this.piano_num) {
                    const audio = document.getElementsByClassName(`piano-${ this.piano_num }`)[0];
                    if (audio) {
                        // audio.pause();
                        // audio.currentTime  = 0;
                        this.piano_num = 0;
                    }
                }
            },
        },
    }
</script>

<style lang="less" scoped>
</style>
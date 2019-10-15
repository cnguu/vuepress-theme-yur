<template>
    <div id="yur-curtain">
        <p :style="{
            textShadow: `0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ffffff, 0 0 20px ${textShadow}, 0 0 35px ${textShadow}, 0 0 40px ${textShadow}, 0 0 50px ${textShadow}, 0 0 75px ${textShadow}`,
        }">{{ title }}</p>
        <a-spin class="spin" :tip="tip"/>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {},
        data() {
            return {
                title: '凉风有信',
                tip: '页面准备中...',
                textShadow: '#e91e63',
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
            this.$store.dispatch('changeSetting', {
                key: 'consoleTime',
                value: new Date().getTime(),
            });
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
                const { title } = this.$site;
                const { curtain } = this.$themeConfig;
                if (title) {
                    this.title = title;
                }
                if (curtain) {
                    const { tip, textShadow } = curtain;
                    if (tip) {
                        this.tip = tip;
                    }
                    if (textShadow) {
                        this.textShadow = textShadow;
                    }
                }
            },
        },
    }
</script>

<style lang="less" scoped>
</style>
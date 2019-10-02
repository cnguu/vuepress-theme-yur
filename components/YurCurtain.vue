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
                const { tip, textShadow } = this.$themeConfig;
                if (title) {
                    this.title = title;
                }
                if (tip) {
                    this.tip = tip;
                    this.textShadow = textShadow;
                }
            },
        },
    }
</script>

<style lang="less">
    @import "../styles/variable.less";

    #yur-curtain {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: #2d2d2d;
        text-align: center;
        z-index: 99990;

        & > p {
            font-size: 8vmin;
            color: #ffffff;
            cursor: pointer;
            filter: brightness(110%);
            animation: curtain 2.3s ease-in-out infinite alternate;
        }

        .spin {
            color: #687293;

            & > span {
                & > i {
                    background-color: #687293;
                }
            }
        }
    }

    @media only screen and (max-width: 767.99px) {
        #yur-curtain {
            & > p {
                font-size: 10vmin;
            }
        }
    }
</style>
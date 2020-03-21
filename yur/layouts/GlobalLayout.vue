<template>
  <a-locale-provider :locale="locale">
    <div id="yur">
      1
    </div>
  </a-locale-provider>
</template>

<script>
import enGB from "ant-design-vue/lib/locale-provider/en_GB";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  name: "Yur",
  computed: {
    locale() {
      if (this.$lang === "zh-CN") {
        return zhCN;
      } else {
        return enGB;
      }
    }
  }
};
</script>

<style lang="less"></style>

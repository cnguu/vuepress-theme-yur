<template>
  <a-locale-provider :locale="locale">
    <Scrollbar>
      <div id="yur">
        <header id="header">
          <div>header</div>
        </header>
        <main id="main">
          <transition name="fade-transform" mode="out-in">
            <component :is="layout" />
          </transition>
        </main>
        <footer id="footer">
          <div>footer</div>
        </footer>
      </div>
    </Scrollbar>
  </a-locale-provider>
</template>

<script>
import enGB from "ant-design-vue/lib/locale-provider/en_GB";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  name: "Collective",
  props: {
    component: {
      type: String,
      default: "Home"
    }
  },
  computed: {
    locale() {
      if (this.$lang === "zh-CN") {
        return zhCN;
      } else {
        return enGB;
      }
    },
    layout() {
      return () => import(`@theme/components/${this.component}`);
    }
  }
};
</script>

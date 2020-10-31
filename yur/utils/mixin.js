import Vue from "vue";

export default () => {
  Vue.mixin({
    computed: {
      $lang() {
        // ssr
        return this.$themeConfig.lang || "en";
      },
      $title() {
        // ssr
        return this.$l("title");
      },
      $description() {
        // ssr
        return this.$l("description");
      }
    },
    methods: {
      /**
       * Simplified hasOwnProperty()
       * @param obj
       * @param key
       * @returns {boolean}
       */
      hasOwn(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
      }
    }
  });
};

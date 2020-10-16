export default {
  mounted() {
    if (document) {
      this.backToHash();
    }
  },
  methods: {
    backToHash() {
      const { hash } = this.$route;
      if (hash && this.$parent.$refs.wrap) {
        const id = decodeURI(hash.substr(1));
        const dom = document.getElementById(id);
        if (dom) {
          this.$parent.$refs.wrap.scrollTo(0, dom.offsetTop);
        }
      }
    }
  }
};

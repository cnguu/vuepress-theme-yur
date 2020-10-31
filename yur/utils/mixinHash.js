export default {
  mounted() {
    if (document) {
      this.backToHash();
    }
  },
  methods: {
    backToHash() {
      const { hash } = this.$route;
      if (hash) {
        const id = decodeURI(hash.substr(1));
        const dom = document.getElementById(id);
        if (dom) {
          document.documentElement.scrollTop = dom.offsetTop;
        }
      }
    }
  }
};

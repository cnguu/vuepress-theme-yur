<template>
  <div id="home">
    <carousel />
  </div>
</template>

<script>
import Carousel from "./Carousel";

export default {
  components: { Carousel },
  data() {
    return {};
  },
  created() {
    this.handleInit();
    console.log(this._postsByUpdated);
  },
  methods: {
    handleInit() {}
  }
};
</script>

<template>
  <div id="home">
    <carousel />
    <Content />
  </div>
</template>

<script>
import Carousel from "./Carousel";

export default {
  components: { Carousel },
  created() {
    console.log(this._postsByUpdated);
  }
};
</script>

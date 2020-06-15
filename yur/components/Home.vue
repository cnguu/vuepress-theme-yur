<template>
  <div id="home">
    <carousel />
  </div>
</template>

<script>
import Carousel from "./Carousel";

export default {
  name: "Home",
  components: { Carousel },
  created() {
    console.log(this._postsByUpdated);
  }
};
</script>

<template>
  <collective :menu="[this.$route.path.split('/')[1]]" />
</template>

<script>
import Collective from "@theme/components/Collective";

export default {
  name: "Categories",
  components: { Collective }
};
</script>

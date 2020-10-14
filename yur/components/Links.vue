<template>
  <div id="links">
    <div id="markdown">
      <Content />
    </div>
    <a-row class="links" :gutter="[30, 30]">
      <a-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 8 }"
        :xl="{ span: 6 }"
        :xxl="{ span: 6 }"
      >
        //todo
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$page);
  }
};
</script>

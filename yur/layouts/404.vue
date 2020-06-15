<template>
  <div id="page-404">
    <section class="error-container">
      <span class="four"><span class="screen-reader-text">4</span></span>
      <span class="zero"><span class="screen-reader-text">0</span></span>
      <span class="four"><span class="screen-reader-text">4</span></span>
    </section>
    <div class="link-container">
      <router-link to="/">
        <a-button type="primary">
          {{ $l("backToHome") }}
        </a-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

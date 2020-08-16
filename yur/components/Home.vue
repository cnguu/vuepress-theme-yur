<template>
  <div id="home">
    <search />
    <div class="home-container">
      <template v-if="_menuCategories && _menuCategories.length">
        <div class="home-container-category">
          <div class="home-container-category-lists">
            <a-card :bordered="false" style="width: 300px">
              <img
                slot="cover"
                :alt="$l('title')"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
              <a-card-meta title="Card title" />
            </a-card>
          </div>
        </div>
      </template>
      <template v-else>
        <a-empty />
      </template>
    </div>
  </div>
</template>

<script>
import Search from "@theme/components/Search";

export default {
  components: { Search },
  data() {
    return {};
  },
  created() {
    this.handleInit();
    console.log(this._menuCategories);
    console.log(this._postsByUpdated);
  },
  methods: {
    handleInit() {}
  }
};
</script>

<template>
  <a-pagination
    :current="sCurrent"
    :total="sTotal"
    :show-total="showTotal"
    :page-size="pageSize"
    :show-quick-jumper="true"
    @change="onChange"
  />
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 24
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      sCurrent: this.current,
      sTotal: this.total,
      showTotal: total => `${this.$l("total")} ${total} ${this.$l("posts")}`
    };
  },
  watch: {
    current(nv) {
      this.sCurrent = nv;
      this.$page.current = nv;
    },
    total(nv) {
      this.sTotal = nv;
    }
  },
  created() {
    this.handleCurrent();
  },
  methods: {
    handleCurrent() {
      if (this.$page.current > 1) {
        this.onChange(this.$page.current);
      }
    },
    onChange(page) {
      page = Number(page);
      this.$emit("change", page);
    }
  }
};
</script>
